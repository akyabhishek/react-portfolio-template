import type { IncomingMessage, ServerResponse } from "node:http";
import { GoogleAuth } from "google-auth-library";

const START_DATE = "2024-11-11";
const HOSTNAME = "abhishekkumaryadav.in";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function readTotalPageViews(report: unknown): number {
  if (
    !isRecord(report) ||
    !Array.isArray(report.metricHeaders) ||
    report.metricHeaders.length !== 1 ||
    !isRecord(report.metricHeaders[0]) ||
    report.metricHeaders[0].name !== "screenPageViews"
  ) {
    throw new Error("Invalid GA4 metric headers");
  }

  // GA4 omits rows for a successful report with no matching data.
  if (report.rows === undefined || (Array.isArray(report.rows) && report.rows.length === 0)) {
    if (report.rowCount !== undefined && report.rowCount !== 0) {
      throw new Error("Invalid GA4 empty report");
    }
    return 0;
  }

  if (!Array.isArray(report.rows) || report.rows.length !== 1 || !isRecord(report.rows[0])) {
    throw new Error("Invalid GA4 aggregate report");
  }
  const values = report.rows[0].metricValues;
  if (
    !Array.isArray(values) ||
    values.length !== 1 ||
    !isRecord(values[0]) ||
    typeof values[0].value !== "string" ||
    !/^\d+$/.test(values[0].value)
  ) {
    throw new Error("Invalid GA4 page-view value");
  }
  const total = Number(values[0].value);
  if (!Number.isSafeInteger(total)) {
    throw new Error("GA4 page-view total exceeds the safe integer range");
  }
  return total;
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    res.statusCode = 405;
    res.end(JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  let phase = "configuration";
  try {
    const propertyId = process.env.GA4_PROPERTY_ID;
    const credentialsJson = process.env.GA4_CREDENTIALS_JSON;
    if (!propertyId || !/^\d+$/.test(propertyId) || !credentialsJson) {
      throw new Error("GA4_PROPERTY_ID and GA4_CREDENTIALS_JSON must be configured");
    }
    const credentials: unknown = JSON.parse(credentialsJson);
    if (
      !isRecord(credentials) ||
      credentials.type !== "service_account" ||
      typeof credentials.client_email !== "string" ||
      !credentials.client_email ||
      typeof credentials.private_key !== "string" ||
      !credentials.private_key
    ) {
      throw new Error("GA4 credentials must describe a service account");
    }
    const auth = new GoogleAuth({
      credentials: {
        type: "service_account",
        client_email: credentials.client_email,
        private_key: credentials.private_key.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/analytics.readonly"],
    });

    phase = "report";
    const response = await auth.request<unknown>({
      url: `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
      method: "POST",
      timeout: 10_000,
      data: {
        dateRanges: [{ startDate: START_DATE, endDate: "today" }],
        metrics: [{ name: "screenPageViews" }],
        dimensionFilter: {
          filter: {
            fieldName: "hostName",
            stringFilter: { matchType: "EXACT", value: HOSTNAME, caseSensitive: false },
          },
        },
      },
    });
    const totalPageViews = readTotalPageViews(response.data);
    res.setHeader("Cache-Control", "public, max-age=60");
    res.setHeader("Vercel-CDN-Cache-Control", "public, s-maxage=3600");
    res.statusCode = 200;
    res.end(JSON.stringify({ totalPageViews, fetchedAt: new Date().toISOString() }));
  } catch (error: unknown) {
    // Google auth errors can contain credentials; never log the error object.
    const status = isRecord(error) && isRecord(error.response) ? error.response.status : undefined;
    console.error("[page-views] Request failed", {
      phase,
      name: error instanceof Error ? error.name : "UnknownError",
      upstreamStatus: typeof status === "number" ? status : undefined,
    });
    res.statusCode = phase === "configuration" ? 503 : 502;
    res.end(JSON.stringify({ error: "Page views unavailable" }));
  }
}
