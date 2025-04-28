import {RouterProvider} from "react-router-dom";
import {ThemeProvider} from "./components/theme-provider";
import router from "./config/routes";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
