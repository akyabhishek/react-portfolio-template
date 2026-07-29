import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import router from "./config/routes";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "./components/ui/toaster";
import ReactGA from "react-ga4";

const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
if (measurementId) {
  ReactGA.initialize(measurementId);

  // Track initial page load
  ReactGA.send({ hitType: "pageview", page: window.location.pathname + window.location.search });

  // Track SPA navigations
  let lastTrackedPath = window.location.pathname + window.location.search;
  router.subscribe((state) => {
    const path = state.location.pathname + state.location.search;
    if (path !== lastTrackedPath) {
      lastTrackedPath = path;
      ReactGA.send({ hitType: "pageview", page: path });
    }
  });
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
      <Analytics />
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
