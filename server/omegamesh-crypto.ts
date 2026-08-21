import crypto from "node:crypto";

export interface SignedOmegameshEvent {
  eventId: string;
  nodeId: string;
  sequence: number;
  eventType: string;
  payloadHash: string;
  createdAt: string;
  signature: string;
}

export function getOmegameshSigningPayload(event: Omit<SignedOmegameshEvent, "signature">): string {
  return [
    event.eventId,
    event.nodeId,
    event.sequence,
    event.eventType,
    event.payloadHash,
    event.createdAt,
  ].join(".");
}

export function verifyOmegameshSignature(
  event: SignedOmegameshEvent,
  publicKey: string,
): boolean {
  return crypto.verify(
    null,
    Buffer.from(getOmegameshSigningPayload(event)),
    publicKey,
    Buffer.from(event.signature, "base64url"),
  );
}
