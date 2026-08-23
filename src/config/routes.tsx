import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "@/pages/Home";
import Stats from "@/pages/MoreAboutMe";
import { Navbar } from "@/components/Navbar";
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
import JSONDiffPage from "@/pages/devtools/JSONDiffPage";
import RegexTesterPage from "@/pages/devtools/RegexTesterPage";
import Topup from "@/pages/Topup";
import ModernResume from "@/pages/ModernResume";
import LandingChooser from "@/pages/LandingChooser";
import TerminalPage from "@/pages/TerminalPage";
import RoadmapPage from "@/pages/RoadmapPage";
import GitCheatsheet from "@/pages/GitCheatsheet";
import NotFound from "@/pages/NotFound";
import LinksPage from "@/pages/LinksPage";
import ClockPage from "@/pages/ClockPage";
import SystemDesign from "@/pages/SystemDesign";
import ResourcesPage from "@/pages/ResourcesPage";
import SkillsPage from "@/pages/SkillsPage";
import BooksPage from "@/pages/BooksPage";
import ProjectsPage from "@/pages/ProjectsPage";
import HiddenPages from "@/pages/HiddenPages";
import WellKnown from "@/pages/WellKnown";

const router = createBrowserRouter([
  {
    path: "/.well-known/*",
    element: <WellKnown />,
  },
  {
    path: "/.env",
    element: <WellKnown />,
  },
  {
    path: "/.git/config",
    element: <WellKnown />,
  },
  {
    path: "/wp-admin",
    element: <WellKnown />,
  },
  {
    path: "/phpinfo.php",
    element: <WellKnown />,
  },
  {
    path: "/server-status",
    element: <WellKnown />,
  },
  {
    path: "/.DS_Store",
    element: <WellKnown />,
  },
  {
    path: "/config.yml",
    element: <WellKnown />,
  },
  {
    path: "/debug",
    element: <WellKnown />,
  },
  {
    path: "/actuator",
    element: <WellKnown />,
  },
  {
    path: "/landing",
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
        <Navbar />
      </>
    ),
    children: [
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Navigate to="/" replace />,
      },
      {
        path: "/about",
        element: <Stats />,
      },
      {
        path: "/stats",
        element: <Navigate to="/about" replace />,
      },
      {
        path: "/resume",
        element: <Navigate to="/cv" replace />,
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
        path: "/json-diff",
        element: <JSONDiffPage />,
      },
      {
        path: "/regex-tester",
        element: <RegexTesterPage />,
      },
      {
        path: "/topup",
        element: <Topup />,
      },
      {
        path: "/git-cheatsheet",
        element: <GitCheatsheet />,
      },
      {
        path: "/git",
        element: <Navigate to="/git-cheatsheet" replace />,
      },
      {
        path: "/system-design",
        element: <SystemDesign />,
      },
      {
        path: "/resources",
        element: <ResourcesPage />,
      },
      {
        path: "/skills",
        element: <SkillsPage />,
      },
      {
        path: "/guides",
        element: <Navigate to="/resources" replace />,
      },
      {
        path: "/books",
        element: <BooksPage />,
      },
      {
        path: "/book",
        element: <Navigate to="/books" replace />,
      },
      {
        path: "/projects",
        element: <ProjectsPage />,
      },
      {
        path: "/x",
        element: <HiddenPages />,
      },
      {
        path: "/hidden",
        element: <Navigate to="/x" replace />,
      },
    ],
  },
  {
    path: "/cv",
    element: <ModernResume />,
  },
  {
    path: "/links",
    element: <LinksPage />,
  },
  {
    path: "/clock",
    element: <ClockPage />,
  },
  {
    path: "/roadmap-for-product-based-company",
    element: <RoadmapPage />,
  },
]);

export default router;
