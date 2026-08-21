import { desc, eq, sql } from "drizzle-orm";
import { db } from "./db";
import { omegameshEvents, omegameshNodes } from "@shared/schema";
import { verifyOmegameshSignature, type SignedOmegameshEvent } from "./omegamesh-crypto";
import { publishAlert } from "./alerts";

export interface OmegameshNode {
  nodeId: string;
  publicKey: string;
  endpoint?: string | null;
  lastSeenAt: string;
}

export type OmegameshEvent = SignedOmegameshEvent;

export class OmegameshPilot {
  private readonly websocketPeers = new Map<string, { send(data: string): void }>();

  async registerNode(nodeId: string, publicKey: string, endpoint?: string): Promise<OmegameshNode> {
    if (!nodeId || !publicKey) {
      throw new Error("nodeId and publicKey are required");
    }

    const [node] = await db
      .insert(omegameshNodes)
      .values({ nodeId, publicKey, endpoint })
      .onConflictDoUpdate({
        target: omegameshNodes.nodeId,
        set: { publicKey, endpoint, lastSeenAt: new Date() },
      })
      .returning();

    return {
      nodeId: node.nodeId,
      publicKey: node.publicKey,
      endpoint: node.endpoint,
      lastSeenAt: node.lastSeenAt.toISOString(),
    };
  }

  async listNodes(): Promise<OmegameshNode[]> {
    const nodes = await db.select().from(omegameshNodes);
    return nodes.map(node => ({
      nodeId: node.nodeId,
      publicKey: node.publicKey,
      endpoint: node.endpoint,
      lastSeenAt: node.lastSeenAt.toISOString(),
    }));
  }

  async acceptEvent(event: OmegameshEvent): Promise<OmegameshEvent> {
    await db.transaction(async tx => {
      await tx.execute(sql`select pg_advisory_xact_lock(hashtext(${event.nodeId}))`);

      const [node] = await tx
        .select()
        .from(omegameshNodes)
        .where(eq(omegameshNodes.nodeId, event.nodeId));
      if (!node) {
        void publishAlert("critical", "omegamesh", `Unknown node attempted event: ${event.nodeId}`)
          .catch(error => console.error("Omegamesh alert audit failed:", error));
        throw new Error("Unknown node");
      }

      const [lastEvent] = await tx
        .select({ sequence: omegameshEvents.sequence })
        .from(omegameshEvents)
        .where(eq(omegameshEvents.nodeId, event.nodeId))
        .orderBy(desc(omegameshEvents.sequence))
        .limit(1);
      const expectedSequence = (lastEvent?.sequence || 0) + 1;
      if (event.sequence !== expectedSequence) {
        void publishAlert("critical", "omegamesh", `Invalid event sequence for node ${event.nodeId}: expected ${expectedSequence}, received ${event.sequence}`)
          .catch(error => console.error("Omegamesh alert audit failed:", error));
        throw new Error(`Invalid event sequence; expected ${expectedSequence}`);
      }

      if (!verifyOmegameshSignature(event, node.publicKey)) {
        void publishAlert("critical", "omegamesh", `Invalid event signature for node ${event.nodeId}`)
          .catch(error => console.error("Omegamesh alert audit failed:", error));
        throw new Error("Invalid event signature");
      }

      await tx.insert(omegameshEvents).values({
        eventId: event.eventId,
        nodeId: event.nodeId,
        sequence: event.sequence,
        eventType: event.eventType,
        payloadHash: event.payloadHash,
        createdAt: new Date(event.createdAt),
        signature: event.signature,
      });

      await tx
        .update(omegameshNodes)
        .set({ lastSeenAt: new Date() })
        .where(eq(omegameshNodes.nodeId, event.nodeId));
    });

    return event;
  }

  attachWebSocketPeer(nodeId: string, socket: { send(data: string): void; on?: (event: string, listener: () => void) => void }): void {
    this.websocketPeers.set(nodeId, socket);
    socket.on?.("close", () => this.websocketPeers.delete(nodeId));
  }

  async broadcastEvent(event: OmegameshEvent, originNodeId: string): Promise<Array<{ nodeId: string; transport: string; status: string }>> {
    const nodes = await this.listNodes();
    const results: Array<{ nodeId: string; transport: string; status: string }> = [];

    await Promise.all(nodes.filter(node => node.nodeId !== originNodeId).map(async node => {
      const socket = this.websocketPeers.get(node.nodeId);
      if (socket) {
        socket.send(JSON.stringify({ type: "omegamesh.event", event }));
        results.push({ nodeId: node.nodeId, transport: "websocket", status: "sent" });
        return;
      }

      if (!node.endpoint) {
        results.push({ nodeId: node.nodeId, transport: "http", status: "skipped_no_endpoint" });
        return;
      }

      try {
        const response = await fetch(`${node.endpoint.replace(/\/$/, "")}/api/omegamesh/events`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(event),
          signal: AbortSignal.timeout(10_000),
        });
        results.push({ nodeId: node.nodeId, transport: "http", status: String(response.status) });
      } catch {
        results.push({ nodeId: node.nodeId, transport: "http", status: "failed" });
      }
    }));

    return results;
  }
}

export const omegameshPilot = new OmegameshPilot();
