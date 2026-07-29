const baseUrl = (process.env.API_BASE_URL ?? 'http://localhost:8080').replace(/\/$/, '');
const apiPrefix = process.env.API_PREFIX ?? '/api/v1.0';
const apiKey = process.env.INTERNAL_API_KEY?.trim();

const headers = {
  Accept: 'application/json',
  ...(apiKey ? { 'x-api-key': apiKey } : {}),
};

async function request(path, init = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);
  try {
    const response = await fetch(`${baseUrl}${path}`, {
      ...init,
      headers: { ...headers, ...init.headers },
      signal: controller.signal,
    });
    const contentType = response.headers.get('content-type') ?? '';
    if (!contentType.includes('json')) {
      throw new Error(`${path} returned ${response.status} with non-JSON content`);
    }
    return { response, body: await response.json() };
  } finally {
    clearTimeout(timeout);
  }
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const health = await request('/healthz');
assert(health.response.ok, `/healthz returned ${health.response.status}`);
assert(health.body.status === 'healthy', `/healthz reported ${health.body.status}`);

const media = await request(`${apiPrefix}/media?type=video`);
assert(media.response.ok, `media contract returned ${media.response.status}: ${JSON.stringify(media.body)}`);
assert(media.body.success === true, 'media response is not an ApiResponse success envelope');

for (const resource of ['bookings', 'contacts', 'subscribers', 'volunteers', 'prayer-requests', 'tickets']) {
  const invalid = await request(`${apiPrefix}/${resource}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '{}',
  });
  assert(
    invalid.response.status === 400 || invalid.response.status === 422,
    `${resource} validation returned ${invalid.response.status}: ${JSON.stringify(invalid.body)}`
  );
  assert(
    invalid.body.errors || invalid.body.fieldErrors,
    `${resource} validation did not return structured field errors`
  );
}

console.log(`Backend contract verified successfully at ${baseUrl}`);
