import test from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";
import { eq } from "drizzle-orm";
import { getOmegameshSigningPayload, type SignedOmegameshEvent } from "./omegamesh-crypto";

const configuredDatabaseUrl = process.env.DATABASE_URL || "";
const databaseConfigured = (() => {
  if (!configuredDatabaseUrl || /SUA_URL|usuario:senha|servidor:5432/i.test(configuredDatabaseUrl)) {
    return false;
  }

  try {
    const url = new URL(configuredDatabaseUrl);
    return url.protocol === "postgresql:" || url.protocol === "postgres:";
  } catch {
    return false;
  }
})();

if (databaseConfigured && process.env.PGPASSWORD) {
  const databaseUrl = new URL(configuredDatabaseUrl);
  if (!databaseUrl.password) {
    databaseUrl.password = process.env.PGPASSWORD;
    process.env.DATABASE_URL = databaseUrl.toString();
  }
}

test("persists signed events and rejects duplicate sequences", { skip: !databaseConfigured }, async () => {
  const [{ db }, { omegameshEvents, omegameshNodes }, { OmegameshPilot }] = await Promise.all([
    import("./db"),
    import("@shared/schema"),
    import("./omegamesh"),
  ]);
  const { privateKey, publicKey } = crypto.generateKeyPairSync("ed25519");
  const nodeId = `test-node-${crypto.randomUUID()}`;
  const publicKeyPem = publicKey.export({ type: "spki", format: "pem" }).toString();
  const pilot = new OmegameshPilot();

  try {
    await pilot.registerNode(nodeId, publicKeyPem);
    const unsignedEvent = {
      eventId: crypto.randomUUID(),
      nodeId,
      sequence: 1,
      eventType: "integration.test",
      payloadHash: crypto.createHash("sha256").update("integration").digest("hex"),
      createdAt: new Date().toISOString(),
    };
    const event: SignedOmegameshEvent = {
      ...unsignedEvent,
      signature: crypto.sign(null, Buffer.from(getOmegameshSigningPayload(unsignedEvent)), privateKey).toString("base64url"),
    };

    await pilot.acceptEvent(event);
    const stored = await db.select().from(omegameshEvents).where(eq(omegameshEvents.eventId, event.eventId));
    assert.equal(stored.length, 1);
    assert.equal(stored[0].sequence, 1);

    await assert.rejects(() => pilot.acceptEvent({ ...event, eventId: crypto.randomUUID() }), /Invalid event sequence/);
  } catch (error) {
    assert.fail(error instanceof Error ? error.stack || error.message : String(error));
  } finally {
    try {
      await db.delete(omegameshEvents).where(eq(omegameshEvents.nodeId, nodeId));
      await db.delete(omegameshNodes).where(eq(omegameshNodes.nodeId, nodeId));
    } catch (cleanupError) {
      console.error("Omegamesh integration cleanup failed:", cleanupError);
    }
  }
});

test("serializes concurrent events targeting the same sequence", { skip: !databaseConfigured }, async () => {
  const [{ db }, { omegameshEvents, omegameshNodes }, { OmegameshPilot }] = await Promise.all([
    import("./db"),
    import("@shared/schema"),
    import("./omegamesh"),
  ]);
  const { privateKey, publicKey } = crypto.generateKeyPairSync("ed25519");
  const nodeId = `concurrency-node-${crypto.randomUUID()}`;
  const publicKeyPem = publicKey.export({ type: "spki", format: "pem" }).toString();
  const pilot = new OmegameshPilot();

  const createEvent = (): SignedOmegameshEvent => {
    const unsignedEvent = {
      eventId: crypto.randomUUID(),
      nodeId,
      sequence: 1,
      eventType: "concurrency.test",
      payloadHash: crypto.createHash("sha256").update(crypto.randomUUID()).digest("hex"),
      createdAt: new Date().toISOString(),
    };
    return {
      ...unsignedEvent,
      signature: crypto.sign(null, Buffer.from(getOmegameshSigningPayload(unsignedEvent)), privateKey).toString("base64url"),
    };
  };

  try {
    await pilot.registerNode(nodeId, publicKeyPem);
    const results = await Promise.allSettled([
      pilot.acceptEvent(createEvent()),
      pilot.acceptEvent(createEvent()),
    ]);
    assert.equal(results.filter(result => result.status === "fulfilled").length, 1);
    assert.equal(results.filter(result => result.status === "rejected").length, 1);
  } finally {
    await db.delete(omegameshEvents).where(eq(omegameshEvents.nodeId, nodeId));
    await db.delete(omegameshNodes).where(eq(omegameshNodes.nodeId, nodeId));
  }
});
