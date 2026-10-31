import assert from "node:assert/strict";
import { createServer } from "node:http";
import { after, afterEach, before, beforeEach, mock, test } from "node:test";
import { GoogleAuth } from "google-auth-library";
import handler, { readTotalPageViews } from "../api/page-views.ts";

const headers = [{ name: "screenPageViews" }];
const report = (value) => ({
  metricHeaders: headers,
  rows: [{ metricValues: [{ value }] }],
  rowCount: 1,
});
let server;
let baseUrl;
let logs;
const originalPropertyId = process.env.GA4_PROPERTY_ID;
const originalCredentials = process.env.GA4_CREDENTIALS_JSON;

before(async () => {
  server = createServer(handler);
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
});

beforeEach(() => {
  process.env.GA4_PROPERTY_ID = "123456";
  process.env.GA4_CREDENTIALS_JSON = JSON.stringify({
    type: "service_account",
    client_email: "test@example.invalid",
    private_key: "test-key",
  });
  logs = mock.method(console, "error", () => {});
});

afterEach(() => {
  mock.restoreAll();
  if (originalPropertyId === undefined) delete process.env.GA4_PROPERTY_ID;
  else process.env.GA4_PROPERTY_ID = originalPropertyId;
  if (originalCredentials === undefined) delete process.env.GA4_CREDENTIALS_JSON;
  else process.env.GA4_CREDENTIALS_JSON = originalCredentials;
});

test("reads an aggregate, including zero and safe integer boundary", () => {
  assert.equal(readTotalPageViews(report("12345")), 12345);
  assert.equal(readTotalPageViews(report("0")), 0);
  assert.equal(readTotalPageViews(report(String(Number.MAX_SAFE_INTEGER))), Number.MAX_SAFE_INTEGER);
  assert.equal(readTotalPageViews({ metricHeaders: headers }), 0);
  assert.equal(readTotalPageViews({ metricHeaders: headers, rows: [], rowCount: 0 }), 0);
});

test("rejects malformed reports rather than inventing a total", () => {
  for (const value of [null, {}, { metricHeaders: headers, rows: null },
    { metricHeaders: headers, rowCount: 1 }, { ...report("1"), rows: [report("1").rows[0], report("2").rows[0]] },
    ...["", "-1", "1.5", "NaN", "9007199254740992"].map(report)]) {
    assert.throws(() => readTotalPageViews(value));
  }
});

test("queries the exact date, metric and hostname and returns cacheable aggregate only", async () => {
  const request = mock.method(GoogleAuth.prototype, "request", async () => ({ data: report("12345") }));
  const response = await fetch(`${baseUrl}/api/page-views`);
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("cache-control"), "public, max-age=60");
  assert.equal(response.headers.get("vercel-cdn-cache-control"), "public, s-maxage=3600");
  assert.match(response.headers.get("content-type"), /application\/json/);
  const body = await response.json();
  assert.deepEqual(Object.keys(body).sort(), ["fetchedAt", "totalPageViews"]);
  assert.equal(body.totalPageViews, 12345);
  assert.ok(Number.isFinite(Date.parse(body.fetchedAt)));
  assert.equal(request.mock.callCount(), 1);
  assert.deepEqual(request.mock.calls[0].arguments[0], {
    url: "https://analyticsdata.googleapis.com/v1beta/properties/123456:runReport",
    method: "POST",
    timeout: 10000,
    data: {
      dateRanges: [{ startDate: "2024-11-11", endDate: "today" }],
      metrics: [{ name: "screenPageViews" }],
      dimensionFilter: {
        filter: {
          fieldName: "hostName",
          stringFilter: { matchType: "EXACT", value: "abhishekkumaryadav.in", caseSensitive: false },
        },
      },
    },
  });
  assert.equal(logs.mock.callCount(), 0);
});

test("returns a genuine empty result as zero", async () => {
  mock.method(GoogleAuth.prototype, "request", async () => ({ data: { metricHeaders: headers } }));
  const response = await fetch(`${baseUrl}/api/page-views`);
  assert.equal(response.status, 200);
  assert.equal((await response.json()).totalPageViews, 0);
});

test("rejects non-GET methods without contacting GA4", async () => {
  const request = mock.method(GoogleAuth.prototype, "request", () => { throw new Error("Unexpected request"); });
  const response = await fetch(`${baseUrl}/api/page-views`, { method: "POST" });
  assert.equal(response.status, 405);
  assert.equal(response.headers.get("allow"), "GET");
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.equal(request.mock.callCount(), 0);
});

test("reports missing or invalid configuration without exposing it", async () => {
  const request = mock.method(GoogleAuth.prototype, "request", () => { throw new Error("Unexpected request"); });
  for (const credentials of ["", "not-json-secret", "{}", '{"type":"authorized_user"}']) {
    process.env.GA4_CREDENTIALS_JSON = credentials;
    const response = await fetch(`${baseUrl}/api/page-views`);
    assert.equal(response.status, 503);
    assert.equal(response.headers.get("cache-control"), "no-store");
    assert.deepEqual(await response.json(), { error: "Page views unavailable" });
  }
  assert.equal(request.mock.callCount(), 0);
  assert.equal(logs.mock.callCount(), 4);
  assert.ok(!JSON.stringify(logs.mock.calls).includes("not-json-secret"));
});

test("returns uncached upstream errors and logs only safe diagnostics", async () => {
  mock.method(GoogleAuth.prototype, "request", async () => {
    const error = new Error("private-key-secret");
    error.response = { status: 403, data: "private-key-secret" };
    throw error;
  });
  const response = await fetch(`${baseUrl}/api/page-views`);
  assert.equal(response.status, 502);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.equal(response.headers.get("vercel-cdn-cache-control"), null);
  assert.deepEqual(await response.json(), { error: "Page views unavailable" });
  assert.equal(logs.mock.calls[0].arguments[1].upstreamStatus, 403);
  assert.ok(!JSON.stringify(logs.mock.calls).includes("private-key-secret"));
});

test("invalid GA4 responses produce errors, not cacheable zeroes", async () => {
  mock.method(GoogleAuth.prototype, "request", async () => ({ data: {} }));
  const response = await fetch(`${baseUrl}/api/page-views`);
  assert.equal(response.status, 502);
  assert.equal(response.headers.get("cache-control"), "no-store");
  assert.equal(logs.mock.callCount(), 1);
});
