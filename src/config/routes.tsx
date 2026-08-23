import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import Home from "@/pages/Home";
import { Navbar } from "@/components/Navbar";
import NotFound from "@/pages/NotFound";
import WellKnown from "@/pages/WellKnown";

const Stats = lazy(() => import("@/pages/MoreAboutMe"));
const JavaQA = lazy(() => import("@/pages/JavaQA"));
const Base64Page = lazy(() => import("@/pages/devtools/Base64page"));
const BitwiseVisualizerPage = lazy(
  () => import("@/pages/devtools/BitwiseVisualizerPage"),
);
const HashGeneratorPage = lazy(
  () => import("@/pages/devtools/HashGeneratorPage"),
);
const DevToolsPage = lazy(() => import("@/pages/DevToolsPage"));
const JSONFormatterPage = lazy(
  () => import("@/pages/devtools/JSONFormmaterPage"),
);
const JWTDecoderPage = lazy(() => import("@/pages/devtools/JWTDecoderPage"));
const QRCodeGeneratorPage = lazy(
  () => import("@/pages/devtools/QRCodeGeneratorPage"),
);
const QRScannerPage = lazy(() => import("@/pages/devtools/QRScannerPage"));
const ASTComplexityAnalyzerPage = lazy(
  () => import("@/pages/devtools/ASTComplexityAnalyzerPage"),
);
const JSONDiffPage = lazy(() => import("@/pages/devtools/JSONDiffPage"));
const RegexTesterPage = lazy(() => import("@/pages/devtools/RegexTesterPage"));
const Topup = lazy(() => import("@/pages/Topup"));
const ModernResume = lazy(() => import("@/pages/ModernResume"));
const LandingChooser = lazy(() => import("@/pages/LandingChooser"));
const TerminalPage = lazy(() => import("@/pages/TerminalPage"));
const RoadmapPage = lazy(() => import("@/pages/RoadmapPage"));
const GitCheatsheet = lazy(() => import("@/pages/GitCheatsheet"));
const LinksPage = lazy(() => import("@/pages/LinksPage"));
const ClockPage = lazy(() => import("@/pages/ClockPage"));
const SystemDesign = lazy(() => import("@/pages/SystemDesign"));
const ResourcesPage = lazy(() => import("@/pages/ResourcesPage"));
const SkillsPage = lazy(() => import("@/pages/SkillsPage"));
const BooksPage = lazy(() => import("@/pages/BooksPage"));
const ProjectsPage = lazy(() => import("@/pages/ProjectsPage"));
const HiddenPages = lazy(() => import("@/pages/HiddenPages"));

function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-screen">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-muted-foreground border-t-transparent" />
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

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
    element: (
      <SuspenseWrapper>
        <LandingChooser />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/terminal",
    element: (
      <SuspenseWrapper>
        <TerminalPage />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/t",
    element: (
      <SuspenseWrapper>
        <TerminalPage />
      </SuspenseWrapper>
    ),
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
        element: (
          <SuspenseWrapper>
            <Stats />
          </SuspenseWrapper>
        ),
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
        element: (
          <SuspenseWrapper>
            <JavaQA />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/base64-tool",
        element: (
          <SuspenseWrapper>
            <Base64Page />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/bitwise-visualizer",
        element: (
          <SuspenseWrapper>
            <BitwiseVisualizerPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/hash-generator",
        element: (
          <SuspenseWrapper>
            <HashGeneratorPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/devtools",
        element: (
          <SuspenseWrapper>
            <DevToolsPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/json-formatter",
        element: (
          <SuspenseWrapper>
            <JSONFormatterPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/jwt-decoder",
        element: (
          <SuspenseWrapper>
            <JWTDecoderPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/qr-generator",
        element: (
          <SuspenseWrapper>
            <QRCodeGeneratorPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/qr-scanner",
        element: (
          <SuspenseWrapper>
            <QRScannerPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/code-complexity-analyzer",
        element: (
          <SuspenseWrapper>
            <ASTComplexityAnalyzerPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/json-diff",
        element: (
          <SuspenseWrapper>
            <JSONDiffPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/regex-tester",
        element: (
          <SuspenseWrapper>
            <RegexTesterPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/topup",
        element: (
          <SuspenseWrapper>
            <Topup />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/git-cheatsheet",
        element: (
          <SuspenseWrapper>
            <GitCheatsheet />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/git",
        element: <Navigate to="/git-cheatsheet" replace />,
      },
      {
        path: "/system-design",
        element: (
          <SuspenseWrapper>
            <SystemDesign />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/resources",
        element: (
          <SuspenseWrapper>
            <ResourcesPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/skills",
        element: (
          <SuspenseWrapper>
            <SkillsPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/guides",
        element: <Navigate to="/resources" replace />,
      },
      {
        path: "/books",
        element: (
          <SuspenseWrapper>
            <BooksPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/book",
        element: <Navigate to="/books" replace />,
      },
      {
        path: "/projects",
        element: (
          <SuspenseWrapper>
            <ProjectsPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/x",
        element: (
          <SuspenseWrapper>
            <HiddenPages />
          </SuspenseWrapper>
        ),
      },
      {
        path: "/hidden",
        element: <Navigate to="/x" replace />,
      },
    ],
  },
  {
    path: "/cv",
    element: (
      <SuspenseWrapper>
        <ModernResume />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/links",
    element: (
      <SuspenseWrapper>
        <LinksPage />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/clock",
    element: (
      <SuspenseWrapper>
        <ClockPage />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/roadmap-for-product-based-company",
    element: (
      <SuspenseWrapper>
        <RoadmapPage />
      </SuspenseWrapper>
    ),
  },
]);

export default router;
