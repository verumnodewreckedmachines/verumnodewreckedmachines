import { parseCookie } from "cookie";
import signature from "cookie-signature";
import type { IncomingMessage, Server as HttpServer } from "node:http";
import { WebSocketServer, type WebSocket } from "ws";
import type session from "express-session";
import { alertEvents, type AlertEvent } from "./alerts";

interface SessionStore {
  get(sid: string, callback: (error: unknown, session?: session.SessionData | null) => void): void;
}

export function attachAlertsWebSocket(
  server: HttpServer,
  store: SessionStore,
  sessionSecret: string,
): void {
  const webSocketServer = new WebSocketServer({ noServer: true, maxPayload: 1024 });
  const clients = new Set<WebSocket>();

  const broadcast = (event: AlertEvent) => {
    const payload = JSON.stringify({ type: "alert.created", alert: event });
    for (const client of Array.from(clients)) {
      if (client.readyState === client.OPEN) client.send(payload);
    }
  };
  alertEvents.on("created", broadcast);

  server.on("upgrade", (request, socket, head) => {
    const requestUrl = new URL(request.url || "/", "http://localhost");
    if (requestUrl.pathname !== "/ws/alerts") return;

    const cookies = parseCookie(request.headers.cookie || "");
    const signed = cookies["connect.sid"];
    const rawSid = signed?.startsWith("s:") ? signature.unsign(signed.slice(2), sessionSecret) : false;

    if (!rawSid || typeof rawSid !== "string") {
      socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
      socket.destroy();
      return;
    }

    store.get(rawSid, (error, storedSession) => {
      if (error || !storedSession?.userId) {
        socket.write("HTTP/1.1 401 Unauthorized\r\n\r\n");
        socket.destroy();
        return;
      }

      webSocketServer.handleUpgrade(request, socket, head, client => {
        clients.add(client);
        client.send(JSON.stringify({ type: "alerts.ready" }));
        client.on("close", () => clients.delete(client));
        client.on("error", () => clients.delete(client));
      });
    });
  });
}
