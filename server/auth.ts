import crypto from "node:crypto";
import type { NextFunction, Request, Response } from "express";
import type { Session } from "express-session";

const PASSWORD_PREFIX = "scrypt";
const SALT_BYTES = 16;
const KEY_LENGTH = 64;

export interface AuthenticatedSession extends Session {
  userId?: number;
}

declare module "express-session" {
  interface SessionData {
    userId?: number;
  }
}

export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(SALT_BYTES).toString("hex");
  const hash = crypto.scryptSync(password, salt, KEY_LENGTH).toString("hex");
  return `${PASSWORD_PREFIX}:${salt}:${hash}`;
}

export function verifyPassword(password: string, encoded: string): boolean {
  const [prefix, salt, expectedHash] = encoded.split(":");
  if (prefix !== PASSWORD_PREFIX || !salt || !expectedHash) {
    return false;
  }

  const actualHash = crypto.scryptSync(password, salt, KEY_LENGTH).toString("hex");
  const expected = Buffer.from(expectedHash, "hex");
  const actual = Buffer.from(actualHash, "hex");
  return expected.length === actual.length && crypto.timingSafeEqual(expected, actual);
}

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const publicPaths = new Set([
    "/api/auth/login",
    "/api/health",
    "/api/public-stats",
    "/api/public-verification",
    "/",
    "/ai-console",
    "/ai-operations",
    "/verum-ai",
    "/pqf",
    "/dashboard",
    "/dashboard-old",
    "/openai-chat",
    "/claude-chat",
    "/assets/*",
  ]);
  const apiPublicPaths = new Set([
    "/api/verum-ai/chat",
    "/api/verum-ai/config",
    "/api/deepseek/chat",
    "/api/deepseek/grounded",
    "/api/mistral/chat",
    "/api/gemini/chat",
    "/api/claude/chat",
    "/api/media/extract-pdf",
    "/api/media/text-to-speech",
    "/api/media/text-to-speech/audio",
    "/api/search/duck",
  ]);
  const requestPath = req.originalUrl.split("?", 1)[0];
  const localChatEnabled = (process.env.NODE_ENV === "development" || process.env.VERUM_NATIVE_APP === "true") &&
    (process.env.ALLOW_LOCAL_CHAT === "true" || process.env.ALLOW_LOCAL_CHAT === undefined);
  const localAddress = req.socket.remoteAddress;
  const isLocalRequest = localAddress === "127.0.0.1" || localAddress === "::1" || localAddress === "::ffff:127.0.0.1";
  const localFeaturePath = localChatEnabled && isLocalRequest &&
    /^\/api\/(verum-ai\/(chat|config)|deepseek\/(chat|grounded)|mistral\/chat|claude\/chat|gemini\/chat|media\/(extract-pdf|text-to-speech\/audio))$/.test(requestPath);

  if (publicPaths.has(requestPath) || apiPublicPaths.has(requestPath) || publicPaths.has(`/api${req.path}`) || localFeaturePath) {
    next();
    return;
  }

  if (!req.session.userId) {
    res.status(401).json({ message: "Authentication required" });
    return;
  }

  next();
}
