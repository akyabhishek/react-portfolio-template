import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";
import Stats from "@/pages/Stats";
import Contact from "@/pages/Contact";
import Resume from "@/pages/Resume";
import { NewNavbar } from "@/components/NewNavbar";
import JavaQA from "@/pages/JavaQA";
import Base64Page from "@/pages/devtools/Base64page";
import BitwiseVisualizerPage from "@/pages/devtools/BitwiseVisualizerPage";
import HashGeneratorPage from "@/pages/devtools/HashGeneratorPage";
import DevToolsPage from "@/pages/DevToolsPage";
import JSONFormatterPage from "@/pages/devtools/JSONFormmaterPage";
import JWTDecoderPage from "@/pages/devtools/JWTDecoderPage";
import QRCodeGeneratorPage from "@/pages/devtools/QRCodeGeneratorPage";
import QRScannerPage from "@/pages/devtools/QRScannerPage";
import ASTComplexityAnalyzerPage from "@/pages/devtools/ASTComplexityAnalyzerPage";
import Topup from "@/pages/Topup";
import ModernResume from "@/pages/ModernResume";
import LandingChooser from "@/pages/LandingChooser";
import TerminalPage from "@/pages/TerminalPage";
import RoadmapPage from "@/pages/RoadmapPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingChooser />,
  },
  {
    path: "/terminal",
    element: <TerminalPage />,
  },
  {
    path: "/t",
    element: <TerminalPage />,
  },
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
        path: "/home",
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
        element: <JSONFormatterPage />,
      },
      {
        path: "/jwt-decoder",
        element: <JWTDecoderPage />,
      },
      {
        path: "/qr-generator",
        element: <QRCodeGeneratorPage />,
      },
      {
        path: "/qr-scanner",
        element: <QRScannerPage />,
      },
      {
        path: "/code-complexity-analyzer",
        element: <ASTComplexityAnalyzerPage />,
      },
      {
        path: "/topup",
        element: <Topup />,
      },
    ],
  },
  {
    path: "/cv",
    element: <ModernResume />,
  },
  {
    path: "/roadmap-for-product-based-company",
    element: <RoadmapPage />,
  },
]);

function NotFoundPage(): JSX.Element {
  return <h1>404 - Page Not Found</h1>;
}

export default router;
