import { useEffect, useState } from "react";

type CounterState =
  | { status: "loading" }
  | { status: "ready"; total: number }
  | { status: "error" };

export default function PageViewCounter() {
  const [state, setState] = useState<CounterState>({ status: "loading" });

  useEffect(() => {
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15_000);
    let active = true;

    async function load() {
      try {
        const response = await fetch("/api/page-views", { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Page-view request failed (${response.status})`);
        }
        const data: unknown = await response.json();
        if (
          typeof data !== "object" ||
          data === null ||
          !("totalPageViews" in data) ||
          typeof data.totalPageViews !== "number" ||
          !Number.isSafeInteger(data.totalPageViews) ||
          data.totalPageViews < 0
        ) {
          throw new Error("Invalid page-view response");
        }
        if (active) setState({ status: "ready", total: data.totalPageViews });
      } catch (error: unknown) {
        if (active) {
          console.error("[page-views] Could not load total", error);
          setState({ status: "error" });
        }
      } finally {
        window.clearTimeout(timeout);
      }
    }

    void load();
    return () => {
      active = false;
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  return (
    <div className="min-h-12 pt-4 text-center text-xs text-muted-foreground">
      <p role="status" aria-live="polite" aria-atomic="true">
        {state.status === "loading" && "Loading page views..."}
        {state.status === "error" && "Page views unavailable"}
        {state.status === "ready" && (
          <>
            <span className="font-medium tabular-nums text-foreground">
              {state.total.toLocaleString()}
            </span>{" "}
            total page views
          </>
        )}
      </p>
      <p className="mt-1">Since Nov 11, 2024 · Based on Google Analytics · Updates periodically</p>
    </div>
  );
}
