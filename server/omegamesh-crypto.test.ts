import test from "node:test";
import assert from "node:assert/strict";
import crypto from "node:crypto";
import { getOmegameshSigningPayload, verifyOmegameshSignature, type SignedOmegameshEvent } from "./omegamesh-crypto";

test("accepts a valid Ed25519 signature", () => {
  const { privateKey, publicKey } = crypto.generateKeyPairSync("ed25519");
  const eventWithoutSignature = {
    eventId: "event-1",
    nodeId: "node-1",
    sequence: 1,
    eventType: "witness.created",
    payloadHash: "a".repeat(64),
    createdAt: "2026-08-18T12:00:00.000Z",
  };
  const signature = crypto.sign(
    null,
    Buffer.from(getOmegameshSigningPayload(eventWithoutSignature)),
    privateKey,
  ).toString("base64url");
  const event: SignedOmegameshEvent = { ...eventWithoutSignature, signature };

  assert.equal(verifyOmegameshSignature(event, publicKey.export({ type: "spki", format: "pem" }).toString()), true);
});

test("rejects a modified payload", () => {
  const { privateKey, publicKey } = crypto.generateKeyPairSync("ed25519");
  const eventWithoutSignature = {
    eventId: "event-2",
    nodeId: "node-1",
    sequence: 2,
    eventType: "witness.created",
    payloadHash: "b".repeat(64),
    createdAt: "2026-08-18T12:00:00.000Z",
  };
  const signature = crypto.sign(
    null,
    Buffer.from(getOmegameshSigningPayload(eventWithoutSignature)),
    privateKey,
  ).toString("base64url");
  const modifiedEvent: SignedOmegameshEvent = {
    ...eventWithoutSignature,
    eventType: "witness.deleted",
    signature,
  };

  assert.equal(verifyOmegameshSignature(modifiedEvent, publicKey.export({ type: "spki", format: "pem" }).toString()), false);
});
