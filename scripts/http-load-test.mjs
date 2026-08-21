const target = process.env.LOAD_URL || "http://127.0.0.1:5000/api/health";
const totalRequests = Number.parseInt(process.env.LOAD_REQUESTS || "100", 10);
const concurrency = Number.parseInt(process.env.LOAD_CONCURRENCY || "10", 10);

if (!Number.isFinite(totalRequests) || totalRequests < 1 || !Number.isFinite(concurrency) || concurrency < 1) {
  throw new Error("LOAD_REQUESTS and LOAD_CONCURRENCY must be positive integers");
}

const durations = [];
let completed = 0;
let failed = 0;
let nextRequest = 0;

async function worker() {
  while (true) {
    const requestNumber = nextRequest++;
    if (requestNumber >= totalRequests) return;

    const startedAt = performance.now();
    try {
      const response = await fetch(target);
      durations.push(performance.now() - startedAt);
      if (!response.ok) failed += 1;
      else completed += 1;
    } catch {
      durations.push(performance.now() - startedAt);
      failed += 1;
    }
  }
}

const startedAt = performance.now();
await Promise.all(Array.from({ length: Math.min(concurrency, totalRequests) }, worker));
const elapsedMs = performance.now() - startedAt;
const sorted = durations.toSorted((left, right) => left - right);
const percentile = fraction => sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * fraction))];

console.log(JSON.stringify({
  target,
  requests: totalRequests,
  concurrency,
  completed,
  failed,
  elapsedMs: Number(elapsedMs.toFixed(2)),
  throughputPerSecond: Number((totalRequests / (elapsedMs / 1000)).toFixed(2)),
  latencyMs: {
    p50: Number(percentile(0.5).toFixed(2)),
    p95: Number(percentile(0.95).toFixed(2)),
    p99: Number(percentile(0.99).toFixed(2)),
  },
}, null, 2));

if (failed > 0) process.exitCode = 1;
