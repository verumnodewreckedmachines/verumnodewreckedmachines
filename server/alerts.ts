import crypto from "node:crypto";
import { EventEmitter } from "node:events";
import { desc, eq, and, gt } from "drizzle-orm";
import { db } from "./db";
import { systemAlerts } from "@shared/schema";

export type AlertSeverity = "info" | "warning" | "critical";

export interface AlertEvent {
  eventId: string;
  severity: AlertSeverity;
  source: string;
  message: string;
  createdAt: string;
}

const cooldownMs = 30_000;
export const alertEvents = new EventEmitter();

export async function publishAlert(
  severity: AlertSeverity,
  source: string,
  message: string,
): Promise<AlertEvent | null> {
  const since = new Date(Date.now() - cooldownMs);
  const [recent] = await db
    .select({ eventId: systemAlerts.eventId })
    .from(systemAlerts)
    .where(and(eq(systemAlerts.source, source), eq(systemAlerts.message, message), gt(systemAlerts.createdAt, since)))
    .orderBy(desc(systemAlerts.createdAt))
    .limit(1);

  if (recent) return null;

  const event = {
    eventId: crypto.randomUUID(),
    severity,
    source,
    message,
    createdAt: new Date().toISOString(),
  };

  await db.insert(systemAlerts).values({
    eventId: event.eventId,
    severity: event.severity,
    source: event.source,
    message: event.message,
    createdAt: new Date(event.createdAt),
  });

  alertEvents.emit("created", event);

  return event;
}

export async function acknowledgeAlert(eventId: string): Promise<boolean> {
  const [updated] = await db
    .update(systemAlerts)
    .set({ deliveryStatus: "acknowledged", acknowledgedAt: new Date() })
    .where(eq(systemAlerts.eventId, eventId))
    .returning({ eventId: systemAlerts.eventId });

  return Boolean(updated);
}

export async function listAlerts(limit = 50) {
  return db
    .select()
    .from(systemAlerts)
    .orderBy(desc(systemAlerts.createdAt))
    .limit(limit);
}
