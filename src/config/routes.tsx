import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";
import Stats from "@/pages/Stats";
import Contact from "@/pages/Contact";
import Resume from "@/pages/Resume";
import { NewNavbar } from "@/components/NewNavbar";
import JavaQA from "@/pages/JavaQA";
import Base64Page from "@/pages/Base64page";
import BitwiseVisualizerPage from "@/pages/BitwiseVisualizerPage";
import HashGeneratorPage from "@/pages/HashGeneratorPage";
import DevToolsPage from "@/pages/DevToolsPage";
import JSONFormatter from "@/components/devtools/JSONFormatter";

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
      {
        path: "/base64-tool",
        element: <Base64Page />,
      },
      {
        path: "/bitwise-visualizer",
        element: <BitwiseVisualizerPage />,
      },
      {
        path: "/hash-generator",
        element: <HashGeneratorPage />,
      },
      {
        path: "/devtools",
        element: <DevToolsPage />,
      },
      {
        path: "/json-formatter",
        element: <JSONFormatter />,
      },
    ],
  },
]);

function NotFoundPage(): JSX.Element {
  return <h1>404 - Page Not Found</h1>;
}

export default router;
