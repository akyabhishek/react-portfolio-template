import Navbar from "@/components/navbar";
import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";
import Stats from "@/pages/Stats";
const router = createBrowserRouter([
  {
    element: (
      <>
        <Navbar />
      </>
    ),
    children: [
      {
        path: "*",
        element: <NotFoundPage />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/stats",
        element: <Stats />,
      },
    ],
  },
]);

function NotFoundPage(): JSX.Element {
  return <h1>404 - Page Not Found</h1>;
}

export default router;
