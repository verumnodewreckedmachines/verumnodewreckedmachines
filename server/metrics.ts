type MetricLabels = Record<string, string>;

const requestCounts = new Map<string, number>();
const requestDurations = new Map<string, number[]>();
let activeRequests = 0;

function key(labels: MetricLabels): string {
  return Object.entries(labels)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([name, value]) => `${name}="${value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`)
    .join(",");
}

export function recordRequest(method: string, route: string, status: number, durationMs: number): void {
  const labels = { method, route, status: String(status) };
  const metricKey = key(labels);
  requestCounts.set(metricKey, (requestCounts.get(metricKey) || 0) + 1);
  const durations = requestDurations.get(metricKey) || [];
  durations.push(durationMs);
  if (durations.length > 1000) durations.shift();
  requestDurations.set(metricKey, durations);
}

export function requestStarted(): void {
  activeRequests += 1;
}

export function requestFinished(): void {
  activeRequests = Math.max(0, activeRequests - 1);
}

export function renderPrometheusMetrics(): string {
  const lines = [
    "# HELP verum_http_requests_total Total HTTP requests.",
    "# TYPE verum_http_requests_total counter",
  ];

  for (const [labels, count] of Array.from(requestCounts.entries())) {
    lines.push(`verum_http_requests_total{${labels}} ${count}`);
  }

  lines.push(
    "# HELP verum_http_request_duration_ms Request duration in milliseconds.",
    "# TYPE verum_http_request_duration_ms summary",
  );

  for (const [labels, durations] of Array.from(requestDurations.entries())) {
    if (durations.length === 0) continue;
    const sorted = [...durations].sort((left, right) => left - right);
    const p95 = sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * 0.95))];
    lines.push(`verum_http_request_duration_ms{${labels},quantile="0.95"} ${p95}`);
  }

  lines.push(
    "# HELP verum_http_active_requests Current requests in progress.",
    "# TYPE verum_http_active_requests gauge",
    `verum_http_active_requests ${activeRequests}`,
  );

  return `${lines.join("\n")}\n`;
}
