import {createBrowserRouter} from "react-router-dom";
import Home from "@/pages/Home";
import Stats from "@/pages/Stats";
import Contact from "@/pages/Contact";
import Resume from "@/pages/Resume";
import {NewNavbar} from "@/components/NewNavbar";
import JavaQA from "@/pages/JavaQA";

const router = createBrowserRouter([
  {
    element: (
      <>
        <NewNavbar />
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
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/resume",
        element: <Resume />,
      },
      {
        path: "/java-interview-question-answers",
        element: <JavaQA />,
      },
    ],
  },
]);

function NotFoundPage(): JSX.Element {
  return <h1>404 - Page Not Found</h1>;
}

export default router;
