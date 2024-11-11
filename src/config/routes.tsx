import Navbar from "@/components/navbar";
import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";
import Stats from "@/pages/Stats";
import Links from "@/pages/Links";
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
      {
        path: "/links",
        element: <Links />,
      },
    ],
  },
]);

function NotFoundPage(): JSX.Element {
  return <h1>404 - Page Not Found</h1>;
}

export default router;
