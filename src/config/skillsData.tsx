import {
  SiAndroidstudio,
  SiApachemaven,
  SiAxios,
  SiClaude,
  SiCss3,
  SiDocker,
  SiFigma,
  SiFirebase,
  SiGit,
  SiGithub,
  SiGithubactions,
  SiGooglecloud,
  SiGooglegemini,
  SiGradle,
  SiHibernate,
  SiHtml5,
  SiIntellijidea,
  SiJavascript,
  SiJunit5,
  SiLangchain,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenai,
  SiPostman,
  SiPython,
  SiReact,
  SiRedis,
  SiSelenium,
  SiSpring,
  SiSpringboot,
  SiSwagger,
  SiTailwindcss,
  SiTensorflow,
  SiTypescript,
  SiVercel,
  SiVite,
  SiYaml,
} from "react-icons/si";
import {
  FaJava,
  FaCode,
  FaRobot,
  FaDatabase,
  FaCloud,
  FaBookOpen,
  FaPalette,
  FaCog,
  FaTools,
  FaCogs,
  FaProjectDiagram,
  FaLayerGroup,
  FaBrain,
  FaChartBar,
  FaUsers,
  FaSync,
  FaStream,
  FaTheaterMasks,
} from "react-icons/fa";
import { VscAzure, VscVscode } from "react-icons/vsc";
import { BsFiletypeXml } from "react-icons/bs";
import { DiMsqlServer } from "react-icons/di";
import { GoCopilot } from "react-icons/go";
import { BiCodeBlock } from "react-icons/bi";
import { MdDesignServices, MdArchitecture } from "react-icons/md";
import { TbPrompt, TbServerBolt } from "react-icons/tb";
import { PiOpenAiLogo } from "react-icons/pi";

// Types for skills
export interface Skill {
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  experience?: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface SkillCategory {
  category: string;
  categoryIcon?: React.ReactNode;
  items: Skill[];
}

export const skillsData: SkillCategory[] = [
  {
    category: "Languages",
    categoryIcon: <FaCode />,
    items: [
      {
        name: "Java",
        icon: <FaJava />,
        level: "Expert",
        experience: "2+ years",
        description:
          "Primary language for backend development and enterprise applications",
      },
      {
        name: "TypeScript",
        icon: <SiTypescript />,
        level: "Advanced",
        experience: "2+ years",
        description: "Type-safe JavaScript for robust frontend applications",
      },
      {
        name: "JavaScript",
        icon: <SiJavascript />,
        level: "Intermediate",
        experience: "2+ years",
        description: "Core language for web development and scripting",
      },
      {
        name: "Python",
        icon: <SiPython />,
        level: "Beginner",
        experience: "6 months",
        description: "Used for automation, scripting, and data analysis",
      },
      {
        name: "HTML",
        icon: <SiHtml5 />,
        level: "Expert",
        experience: "2+ years",
        description: "Markup language for web structure",
      },
      {
        name: "CSS",
        icon: <SiCss3 />,
        level: "Advanced",
        experience: "2+ years",
        description: "Styling language for web presentation",
      },
      {
        name: "YAML",
        icon: <SiYaml />,
        level: "Advanced",
        experience: "1+ years",
        description: "Configuration files and CI/CD pipelines",
      },
      {
        name: "XML",
        icon: <BsFiletypeXml />,
        level: "Intermediate",
        experience: "1 year",
        description: "Data exchange and configuration format",
      },
    ],
  },
  {
    category: "Frameworks",
    categoryIcon: <SiReact />,
    items: [
      {
        name: "Spring Boot",
        icon: <SiSpringboot />,
        level: "Expert",
        experience: "2+ years",
        description:
          "Main framework for building RESTful APIs and microservices",
      },
      {
        name: "Spring Core",
        icon: <SiSpring />,
        level: "Expert",
        experience: "2+ years",
        description: "Core Spring framework for dependency injection and IoC",
      },
      {
        name: "Spring MVC",
        icon: <SiSpring />,
        level: "Expert",
        experience: "2+ years",
        description: "Web framework for building MVC applications",
      },
      {
        name: "Spring Data JPA",
        icon: <SiSpring />,
        level: "Advanced",
        experience: "2+ years",
        description: "Data access abstraction for JPA repositories",
      },
      {
        name: "Hibernate",
        icon: <SiHibernate />,
        level: "Advanced",
        experience: "2+ years",
        description: "ORM framework for database operations",
      },
      {
        name: "Spring",
        icon: <SiSpring />,
        level: "Expert",
        experience: "2+ years",
        description: "Enterprise Java framework ecosystem",
      },
      {
        name: "ReactJs",
        icon: <SiReact />,
        level: "Advanced",
        experience: "1+ years",
        description: "Frontend library for building dynamic user interfaces",
      },
      {
        name: "Node.js",
        icon: <SiNodedotjs />,
        level: "Advanced",
        experience: "2+ years",
        description: "JavaScript runtime for server-side development",
      },
    ],
  },
  {
    category: "AI (Artificial Intelligence)",
    categoryIcon: <FaRobot />,
    items: [
      {
        name: "ChatGPT",
        icon: <PiOpenAiLogo />,
        level: "Expert",
        experience: "2+ years",
        description: "AI-powered development assistance and problem solving",
      },
      {
        name: "GitHub Copilot",
        icon: <GoCopilot />,
        level: "Expert",
        experience: "2+ years",
        description: "AI pair programming for faster code development",
      },
      {
        name: "Cursor",
        icon: <BiCodeBlock />,
        level: "Advanced",
        experience: "1 Year",
        description: "AI-powered code completion and suggestions IDE",
      },
      {
        name: "Claude",
        icon: <SiClaude />,
        level: "Advanced",
        experience: "1+ year",
        description: "Anthropic's AI assistant for coding and reasoning",
      },
      {
        name: "Gemini",
        icon: <SiGooglegemini />,
        level: "Advanced",
        experience: "1 year",
        description: "Google's multimodal AI for development and analysis",
      },
      {
        name: "Prompt Engineering",
        icon: <TbPrompt />,
        level: "Expert",
        experience: "2+ years",
        description: "Crafting effective prompts for optimal AI model outputs",
      },
      {
        name: "Azure AI Foundry",
        icon: <SiOpenai />,
        level: "Intermediate",
        experience: "1 year",
        description: "Microsoft Azure's enterprise OpenAI service integration",
      },
      {
        name: "Spring AI",
        icon: <SiSpring />,
        level: "Intermediate",
        experience: "1 year",
        description: "Spring framework integration for AI/ML model serving",
      },
      {
        name: "MCP Servers",
        icon: <TbServerBolt />,
        level: "Advanced",
        experience: "1 year",
        description:
          "Building Model Context Protocol servers for AI-tool integrations",
      },
      {
        name: "Vertex AI Studio",
        icon: <SiGooglecloud />,
        level: "Intermediate",
        experience: "1 year",
        description:
          "Google Cloud's platform for building generative AI applications",
      },
    ],
  },
  {
    category: "Databases",
    categoryIcon: <FaDatabase />,
    items: [
      {
        name: "SQL Server",
        icon: <DiMsqlServer />,
        level: "Advanced",
        experience: "2+ year",
        description: "Microsoft's enterprise database solution",
      },
      {
        name: "MySQL",
        icon: <SiMysql />,
        level: "Advanced",
        experience: "2+ years",
        description: "Relational database for data storage and management",
      },
      {
        name: "Firebase Realtime Database",
        icon: <SiFirebase />,
        level: "Intermediate",
        experience: "6 months",
        description: "NoSQL cloud database for real-time applications",
      },
      {
        name: "Redis",
        icon: <SiRedis />,
        level: "Intermediate",
        experience: "1 year",
        description: "In-memory data structure store for caching and sessions",
      },
    ],
  },
  {
    category: "DevOps",
    categoryIcon: <FaCloud />,
    items: [
      {
        name: "GitHub Actions",
        icon: <SiGithubactions />,
        level: "Expert",
        experience: "2+ years",
        description: "CI/CD automation and workflow management",
      },
      {
        name: "Docker",
        icon: <SiDocker />,
        level: "Intermediate",
        experience: "2 year",
        description: "Containerization platform for application deployment",
      },
      {
        name: "Maven",
        icon: <SiApachemaven />,
        level: "Advanced",
        experience: "2+ years",
        description: "Java project management and build tool",
      },
      {
        name: "Azure",
        icon: <VscAzure />,
        level: "Intermediate",
        experience: "2+ year",
        description:
          "Microsoft's cloud platform for building and deploying applications",
      },
      {
        name: "GCP",
        icon: <SiGooglecloud />,
        level: "Intermediate",
        experience: "1 Year",
        description: "Google Cloud Platform for scalable applications",
      },
    ],
  },
  {
    category: "Libraries",
    categoryIcon: <FaBookOpen />,
    items: [
      {
        name: "Tailwind CSS",
        icon: <SiTailwindcss />,
        level: "Advanced",
        experience: "1+ years",
        description: "Utility-first CSS framework for rapid UI development",
      },
      {
        name: "Axios",
        icon: <SiAxios />,
        level: "Advanced",
        experience: "1+ years",
        description: "HTTP client for API communication",
      },
      {
        name: "Lombok",
        icon: <FaJava />,
        level: "Expert",
        experience: "2+ years",
        description: "Java library for reducing boilerplate code",
      },
      {
        name: "TensorFlow",
        icon: <SiTensorflow />,
        level: "Beginner",
        experience: "3 months",
        description: "Machine learning framework for AI applications",
      },
      {
        name: "HeroUI",
        icon: <SiReact />,
        level: "Intermediate",
        experience: "6 months",
        description: "Modern React component library",
      },
      {
        name: "Rest Assured",
        icon: <SiJunit5 />,
        level: "Intermediate",
        experience: "1 year",
        description: "Java library for API testing",
      },
      {
        name: "Playwright",
        icon: <FaTheaterMasks />,
        level: "Advanced",
        experience: "1 year",
        description: "Modern automation framework for E2E testing",
      },
      {
        name: "JUnit",
        icon: <SiJunit5 />,
        level: "Advanced",
        experience: "2+ years",
        description: "Unit testing framework for Java applications",
      },
      {
        name: "Kafka",
        icon: <FaStream />,
        level: "Beginner",
        experience: "6 months",
        description: "Distributed streaming platform for real-time data",
      },
    ],
  },
  {
    category: "Tools",
    categoryIcon: <FaTools />,
    items: [
      {
        name: "Git",
        icon: <SiGit />,
        level: "Expert",
        experience: "2+ years",
        description: "Version control for code management",
      },
      {
        name: "GitHub",
        icon: <SiGithub />,
        level: "Expert",
        experience: "2+ years",
        description: "Code hosting and collaboration platform",
      },
      {
        name: "Postman",
        icon: <SiPostman />,
        level: "Expert",
        experience: "2+ years",
        description: "API development and testing tool",
      },
      {
        name: "VSCode",
        icon: <VscVscode />,
        level: "Expert",
        experience: "2+ years",
        description: "Primary code editor with extensions",
      },
      {
        name: "IntelliJ",
        icon: <SiIntellijidea />,
        level: "Advanced",
        experience: "2+ years",
        description: "IDE for Java development",
      },
      {
        name: "Swagger",
        icon: <SiSwagger />,
        level: "Advanced",
        experience: "1+ years",
        description: "API documentation and testing",
      },
      {
        name: "Android Studio",
        icon: <SiAndroidstudio />,
        level: "Beginner",
        experience: "3 months",
        description: "Android app development IDE",
      },
      {
        name: "Playwright",
        icon: <FaTheaterMasks />,
        level: "Expert",
        experience: "2+ years",
        description: "Web browser automation for testing applications",
      },
    ],
  },
  {
    category: "Others",
    categoryIcon: <FaCogs />,
    items: [
      {
        name: "Multi-threading",
        icon: <FaSync />,
        level: "Intermediate",
        experience: "2+ years",
        description: "Concurrent programming and parallel processing",
      },
      {
        name: "Design Patterns",
        icon: <MdDesignServices />,
        level: "Advanced",
        experience: "2+ years",
        description: "Software design patterns and best practices",
      },
      {
        name: "Low Level Design",
        icon: <MdArchitecture />,
        level: "Advanced",
        experience: "2+ years",
        description: "Detailed system component design and architecture",
      },
      {
        name: "High Level Design",
        icon: <FaProjectDiagram />,
        level: "Intermediate",
        experience: "1+ years",
        description: "System architecture and scalability design",
      },
      {
        name: "Microservices",
        icon: <FaLayerGroup />,
        level: "Advanced",
        experience: "2+ years",
        description: "Distributed system architecture and implementation",
      },
      {
        name: "Agile",
        icon: <FaUsers />,
        level: "Advanced",
        experience: "2+ years",
        description: "Agile methodology and project management",
      },
    ],
  },
];
