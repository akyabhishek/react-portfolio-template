// Types for skills
export interface Skill {
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  experience?: string;
  description?: string;
}

export interface SkillCategory {
  category: string;
  items: Skill[];
}

export const skillsData: SkillCategory[] = [
  {
    category: "Languages",
    items: [
      {
        name: "Java",
        level: "Expert",
        experience: "2+ years",
        description:
          "Primary language for backend development and enterprise applications",
      },
      {
        name: "TypeScript",
        level: "Advanced",
        experience: "1+ years",
        description: "Type-safe JavaScript for robust frontend applications",
      },
      {
        name: "JavaScript",
        level: "Intermediate",
        experience: "1+ years",
        description: "Core language for web development and scripting",
      },
      {
        name: "Python",
        level: "Beginner",
        experience: "6 months",
        description: "Used for automation, scripting, and data analysis",
      },
    ],
  },
  {
    category: "Frameworks",
    items: [
      {
        name: "Spring Boot",
        level: "Expert",
        experience: "2+ years",
        description:
          "Main framework for building RESTful APIs and microservices",
      },
      {
        name: "ReactJs",
        level: "Advanced",
        experience: "1+ years",
        description: "Frontend library for building dynamic user interfaces",
      },
      {
        name: "Node.js",
        level: "Advanced",
        experience: "2+ years",
        description: "JavaScript runtime for server-side development",
      },
    ],
  },
  {
    category: "AI / Automation",
    items: [
      {
        name: "ChatGPT",
        level: "Advanced",
        experience: "1+ years",
        description: "AI-powered development assistance and problem solving",
      },
      {
        name: "GitHub Copilot",
        level: "Advanced",
        experience: "1+ years",
        description: "AI pair programming for faster code development",
      },
      {
        name: "Cursor",
        level: "Intermediate",
        experience: "6 months",
        description: "AI-powered code completion and suggestions IDE",
      },
      {
        name: "Playwright",
        level: "Advanced",
        experience: "1 year",
        description: "Modern automation framework for E2E testing",
      },
      {
        name: "Selenium",
        level: "Beginner",
        experience: "6 months",
        description: "Web browser automation for testing applications",
      },
    ],
  },
  {
    category: "Databases",
    items: [
      {
        name: "SQL Server",
        level: "Advanced",
        experience: "2+ year",
        description: "Microsoft's enterprise database solution",
      },
      {
        name: "MySQL",
        level: "Advanced",
        experience: "2+ years",
        description: "Relational database for data storage and management",
      },

      {
        name: "Firebase Realtime Database",
        level: "Intermediate",
        experience: "6 months",
        description: "NoSQL cloud database for real-time applications",
      },
    ],
  },
  {
    category: "DevOps",
    items: [
      {
        name: "GitHub Actions",
        level: "Advanced",
        experience: "2+ years",
        description: "CI/CD automation and workflow management",
      },
      {
        name: "Azure",
        level: "Intermediate",
        experience: "1 year",
        description:
          "Microsoft's cloud platform for building and deploying applications",
      },
      {
        name: "GCP",
        level: "Beginner",
        experience: "6 months",
        description: "Google Cloud Platform for scalable applications",
      },
      {
        name: "Vercel",
        level: "Intermediate",
        experience: "1 year",
        description: "Frontend deployment and hosting platform",
      },
    ],
  },
  {
    category: "Libraries",
    items: [
      {
        name: "Axios",
        level: "Advanced",
        experience: "1+ years",
        description: "HTTP client for API communication",
      },
      {
        name: "Lombok",
        level: "Expert",
        experience: "2+ years",
        description: "Java library for reducing boilerplate code",
      },
      {
        name: "TensorFlow",
        level: "Beginner",
        experience: "3 months",
        description: "Machine learning framework for AI applications",
      },
      {
        name: "HeroUI",
        level: "Intermediate",
        experience: "6 months",
        description: "Modern React component library",
      },
      {
        name: "Rest Assured",
        level: "Intermediate",
        experience: "1 year",
        description: "Java library for API testing",
      },
    ],
  },
  {
    category: "UI/UX",
    items: [
      {
        name: "HTML",
        level: "Expert",
        experience: "2+ years",
        description: "Markup language for web structure",
      },
      {
        name: "CSS",
        level: "Advanced",
        experience: "2+ years",
        description: "Styling language for web presentation",
      },
      {
        name: "Tailwind CSS",
        level: "Advanced",
        experience: "1+ years",
        description: "Utility-first CSS framework for rapid UI development",
      },
    ],
  },
  {
    category: "Markup & Config",
    items: [
      {
        name: "YAML",
        level: "Advanced",
        experience: "1+ years",
        description: "Configuration files and CI/CD pipelines",
      },
      {
        name: "XML",
        level: "Intermediate",
        experience: "1 year",
        description: "Data exchange and configuration format",
      },
    ],
  },
  {
    category: "Tools",
    items: [
      {
        name: "Git",
        level: "Expert",
        experience: "2+ years",
        description: "Version control for code management",
      },
      {
        name: "GitHub",
        level: "Expert",
        experience: "2+ years",
        description: "Code hosting and collaboration platform",
      },
      {
        name: "Postman",
        level: "Expert",
        experience: "2+ years",
        description: "API development and testing tool",
      },
      {
        name: "VSCode",
        level: "Expert",
        experience: "2+ years",
        description: "Primary code editor with extensions",
      },
      {
        name: "IntelliJ",
        level: "Advanced",
        experience: "2+ years",
        description: "IDE for Java development",
      },
      {
        name: "Swagger",
        level: "Advanced",
        experience: "1+ years",
        description: "API documentation and testing",
      },
      {
        name: "Maven",
        level: "Advanced",
        experience: "2+ years",
        description: "Java project management and build tool",
      },
      {
        name: "Gradle",
        level: "Intermediate",
        experience: "1 year",
        description: "Build automation tool",
      },
      {
        name: "Android Studio",
        level: "Beginner",
        experience: "3 months",
        description: "Android app development IDE",
      },
      {
        name: "Vite",
        level: "Advanced",
        experience: "1 year",
        description: "Fast build tool for modern web projects",
      },
    ],
  },
];
