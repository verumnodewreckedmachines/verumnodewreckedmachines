import { config } from 'dotenv';
import { resolve } from 'path';
import { cwd } from 'process';
config({ path: resolve(cwd(), '.env'), override: true });
import express, { type Request, Response, NextFunction } from "express";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { pool } from "./db";
import { recordRequest, requestFinished, requestStarted } from "./metrics";
import { attachAlertsWebSocket } from "./alerts-ws";
import { configureAIProviders } from "./ai";
import MemoryStore from "memorystore";

const app = express();

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error("SESSION_SECRET must be set");
}

// Use MemoryStore for desktop/local mode when no DATABASE_URL
const useMemoryStore = !process.env.DATABASE_URL || process.env.VERUM_NATIVE_APP === "true";
const MemorySessionStore = MemoryStore(session);

const sessionStore = useMemoryStore
  ? new MemorySessionStore({ checkPeriod: 1000 * 60 * 60 })
  : new (connectPgSimple(session))({
      pool,
      tableName: "user_sessions",
      createTableIfMissing: true,
    });

app.use(session({
  store: sessionStore,
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 1000 * 60 * 60 * 8,
  },
}));

// CORS configuration - Allow all for Render deployment
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5000',
  'https://verumnode.com',
  'https://www.verumnode.com',
  'https://verumnodewreckedmachines.onrender.com',
  process.env.REPLIT_DEV_DOMAIN,
  /\.repl\.co$/,
  /\.replit\.dev$/
].filter(Boolean);

// Allow all origins in production to fix CORS issues
app.use((req, res, next) => {
  const origin = req.headers.origin;
  
  // In production, allow all origins with credentials
  if (process.env.NODE_ENV === 'production') {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    return next();
  }
  
  // Development CORS
  if (!origin || allowedOrigins.some(allowed => {
    if (typeof allowed === 'string') return origin === allowed;
    if (allowed instanceof RegExp) return allowed.test(origin);
    return false;
  })) {
    res.header('Access-Control-Allow-Origin', origin || '*');
  }
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  requestStarted();
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    recordRequest(req.method, path, res.statusCode, duration);
    requestFinished();
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  // Configure AI providers with environment variables
  configureAIProviders();
  
  const server = await registerRoutes(app);
  attachAlertsWebSocket(server, sessionStore, sessionSecret);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    ...(process.platform !== "win32" ? { reusePort: true } : {}),
  }, () => {
    log(`serving on port ${port}`);
  });
})();
