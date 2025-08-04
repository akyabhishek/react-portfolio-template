import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";
import Stats from "@/pages/Stats";
import Contact from "@/pages/Contact";
import Resume from "@/pages/Resume";
import { NewNavbar } from "@/components/NewNavbar";
import JavaQA from "@/pages/JavaQA";
import Base64Page from "@/pages/Base64page";
import BitwiseVisualizer from "@/components/BitwiseVisualizer";
import BitwiseVisualizerPage from "@/pages/BitwiseVisualizerPage";
import HashGenerator from "@/components/HashGenerator";
import HashGeneratorPage from "@/pages/HashGeneratorPage";

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
    ],
  },
]);

function NotFoundPage(): JSX.Element {
  return <h1>404 - Page Not Found</h1>;
}

export default router;
