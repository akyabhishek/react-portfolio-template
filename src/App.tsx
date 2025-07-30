import {RouterProvider} from "react-router-dom";
import {ThemeProvider} from "./components/theme-provider";
import router from "./config/routes";
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from "./components/ui/toaster";
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
