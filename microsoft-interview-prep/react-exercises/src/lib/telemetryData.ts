// Infrastructure for exercise 07 — static telemetry rows, observability-flavoured
// on purpose: the team you're interviewing with builds monitoring UX, and
// "translate data-rich scenarios into intuitive UX" is in the job posting.

export type ServiceHealthRow = {
  id: number;
  service: string;
  region: string;
  status: 'healthy' | 'degraded' | 'down';
  p95LatencyMs: number;
  errorRatePct: number;
  requestsPerMin: number;
};

const SERVICES = ['ingest-api', 'query-engine', 'alert-router', 'dashboard-bff', 'stream-processor', 'auth-gateway'];
const REGIONS = ['westus2', 'eastus', 'westeurope', 'southeastasia', 'canadacentral'];

// Deterministic pseudo-random so every run shows the same data (easier to
// verify your sorting by eye).
let seed = 42;
const rand = () => {
  seed = (seed * 16807) % 2147483647;
  return seed / 2147483647;
};

export const ROWS: ServiceHealthRow[] = Array.from({ length: 47 }, (_, i) => {
  const errorRate = rand() * (rand() > 0.85 ? 12 : 1.5);
  return {
    id: i + 1,
    service: SERVICES[Math.floor(rand() * SERVICES.length)],
    region: REGIONS[Math.floor(rand() * REGIONS.length)],
    status: errorRate > 5 ? 'down' : errorRate > 1 ? 'degraded' : 'healthy',
    p95LatencyMs: Math.round(40 + rand() * 900),
    errorRatePct: Math.round(errorRate * 100) / 100,
    requestsPerMin: Math.round(200 + rand() * 50000),
  };
});