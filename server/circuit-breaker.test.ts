import test from "node:test";
import assert from "node:assert/strict";
import { CircuitBreaker } from "./circuit-breaker";

const wait = (milliseconds: number) => new Promise(resolve => setTimeout(resolve, milliseconds));

test("opens after five consecutive failures", async () => {
  const breaker = new CircuitBreaker("anthropic", 5, 30_000);

  for (let attempt = 0; attempt < 5; attempt += 1) {
    const result = await breaker.execute(async () => {
      throw new Error("upstream failure");
    });
    assert.equal(result.provider, "anthropic");
    assert.equal(result.code, "UPSTREAM");
  }

  assert.equal(breaker.getState(), "open");
  const fallback = await breaker.execute(async () => "unreachable");
  assert.deepEqual(fallback, {
    provider: "anthropic",
    code: "CIRCUIT_OPEN",
    retryable: false,
    message: "Provider circuit is open",
  });
});

test("enters half-open and closes after a successful probe", async () => {
  const breaker = new CircuitBreaker("mistral", 1, 10);
  await breaker.execute(async () => {
    throw new Error("temporary failure");
  });

  assert.equal(breaker.getState(), "open");
  await wait(15);
  assert.equal(breaker.getState(), "half-open");
  assert.equal(await breaker.execute(async () => "ok"), "ok");
  assert.equal(breaker.getState(), "closed");
});
