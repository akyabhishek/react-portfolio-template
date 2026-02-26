// ─── Centralized Resume / Portfolio Data ────────────────────────────────────
// All personal, experience, project, education, achievement, and certification
// data lives here so every page can import from a single source of truth.
// ─────────────────────────────────────────────────────────────────────────────

// ─── Types ──────────────────────────────────────────────────────────────────

export interface PersonalInfo {
  name: string;
  title: string;
  phone: string;
  email: string;
  linkedin: string;
  linkedinUrl: string;
  github: string;
  githubUrl: string;
  location: string;
  website: string;
  resumePdfUrl: string;
  aboutSummary: string;
  careerStartDate: string; // ISO date string e.g. "2023-09-14"
}

export interface ExperienceItem {
  title: string;
  company: string;
  description: string;
  from: string;
  to: string;
  location?: string;
  logoPath?: string;
  technologies?: string[];
  achievements?: string[];
  bullets?: string[];
  certificateUrl?: string;
}

export interface ProjectItem {
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  github?: string;
  liveUrl?: string;
  playstore?: string;
  live?: boolean;
  bullets?: string[];
}

export interface EducationItem {
  institution: string;
  degree: string;
  score: string;
  year: string;
}

export interface AchievementItem {
  title: string;
  platform: string;
  year: string;
  url?: string;
}

export interface CertificationItem {
  title: string;
  platform: string;
  year: string;
  url: string;
}

export interface SkillSummary {
  category: string;
  items: string[];
}

// ─── Personal Info ──────────────────────────────────────────────────────────

export const personalInfo: PersonalInfo = {
  name: "Abhishek Kumar Yadav",
  title: "Programmer Analyst",
  phone: "8299837402",
  email: "aky.abhishekkumaryadav@gmail.com",
  linkedin: "abhishekkumaryadav",
  linkedinUrl: "https://www.linkedin.com/in/abhishekkumaryadav/",
  github: "akyabhishek",
  githubUrl: "https://github.com/akyabhishek",
  location: "Noida, Uttar Pradesh",
  website: "https://akyabhishek.vercel.app/",
  resumePdfUrl: "/ABHISHEK_KUMAR_YADAV_RESUME.pdf",
  aboutSummary:
    "Software Developer at Cognizant with experience contributing to American Airlines projects using Java, Spring Boot, TypeScript, Playwright, Selenium, and more. Passionate about building scalable applications and solving real-world problems.",
  careerStartDate: "2023-09-14",
};

// ─── Experience ─────────────────────────────────────────────────────────────

export const experienceData: ExperienceItem[] = [
  {
    title: "Programmer Analyst - GN",
    company: "Cognizant Technology Solutions",
    logoPath: "/assets/CTSH.png",
    location: "Noida, Uttar Pradesh",
    description:
      "Developed and enhanced the ECS backend application for American Airlines, enabling communication between client applications and pilots",
    from: "09/2023",
    to: "Present",
    technologies: [
      "Java",
      "Spring Boot",
      "Spring Data",
      "Spring Framework",
      "REST APIs",
      "Microservices",
      "SQL Server",
      "JWT",
      "TypeScript",
      "JavaScript",
      "Git",
      "GitHub",
      "GitHub Actions",
      "CI/CD",
      "Playwright",
      "GitHub Copilot",
      "Cursor",
      "Gen AI",
    ],
    achievements: [],
    bullets: [
      "Developed and enhanced the ECS backend application for American Airlines, enabling communication between client applications and pilots.",
      "Implemented admin functionality, pilot lookup, and a two-way communication feature using Java, Spring Boot, Spring Security, Spring Data JPA, SQL Server.",
    ],
  },
  {
    title: "Intern",
    company: "Cognizant Technology Solutions",
    description:
      "Developed RESTful APIs using Java and Spring Boot, integrating MySQL for backend data management.",
    from: "03/2023",
    to: "08/2023",
    location: "Noida, Uttar Pradesh",
    logoPath: "/assets/CTSH.png",
    certificateUrl:
      "https://drive.google.com/file/d/1chx1EAJndKB7hpMLHfJhsF7MmpMw5_Fp/view?usp=drive_link",
    technologies: [
      "Java",
      "Spring Boot",
      "MySQL",
      "REST APIs",
      "Git",
      "ReactJS",
      "TypeScript",
    ],
    achievements: [
      "Successfully completed 3 major Projects",
      "Learned enterprise-level development practices",
      "Contributed to team codebase with 95% code review approval",
    ],
    bullets: [
      "Developed RESTful APIs using Java and Spring Boot, integrating MySQL for backend data management.",
      "Implemented microservices architecture to enhance modularity and scalability of the application.",
      "Gained proficiency in Java, Spring Boot, Spring Security, Spring Data JPA, MySQL, ReactJS, and microservices during the internship.",
      "Won the GenC Super Squad award.",
    ],
  },
];

// ─── Projects ───────────────────────────────────────────────────────────────

export const projectsData: ProjectItem[] = [
  {
    title: "edorbit webapp",
    description:
      "An educational platform that transforms complex concepts into clear, interactive 3D visual",
    techStack: [
      "Java",
      "Spring Boot",
      "Spring Security",
      "Maven",
      "GCP",
      "Google App Engine",
      "Lombok",
      "TypeScript",
      "React.Js",
      "ThreeJS",
      "Axios",
      "HeroUI",
      "TailwindCSS",
      "JWT",
      "MySQL",
      "GitHub Actions",
    ],
    imageUrl: "/assets/edorbit-thumb.png",
    liveUrl: "https://app.edorbit.com/",
    live: true,
  },
  {
    title: "Bhraman",
    description:
      "An immersive AR app showcasing Indian heritage through real-time interactive 3D models.",
    techStack: [
      "Java",
      "XML",
      "TensorFlow",
      "Python",
      "Firebase",
      "Android Studio",
      "CNN",
      "Machine Learning",
      "Mobile App Development",
      "Firebase Authentication",
      "Firebase Realtime Database",
    ],
    imageUrl: "/assets/bhraman-thumb.png",
    github: "https://github.com/akyabhishek/Bhraman",
    liveUrl:
      "https://github.com/akyabhishek/Bhraman/raw/refs/heads/main/bhraman.apk",
    bullets: [
      "Developed Java-based backend with Firebase for database management and authentication.",
      "Implemented TensorFlow-based CNN algorithm for image scanning in the machine learning model.",
    ],
  },
  {
    title: "edorbit mobile app",
    description:
      "An interactive 3D and AR-powered app that helps visualize complex theoretical diagrams.",
    techStack: [
      "Java",
      "Android Studio",
      "Firebase",
      "Scene Viewer",
      "Firebase Authentication",
      "Firebase Realtime Database",
    ],
    imageUrl: "/assets/edorbit-m-preview.png",
    live: true,
    liveUrl: "https://edorbit.com/",
    playstore:
      "https://play.google.com/store/apps/details?id=com.nbytech.edorbit",
    bullets: [
      "Created app's backend using Firebase as NoSQL Realtime DB for efficient data handling.",
      "Designed XML layouts with Material Design for enhanced UI.",
    ],
  },
  {
    title: "BS Visualizer",
    description:
      "An interactive tool I built to make learning binary search simple and intuitive through real-time visuals.",
    techStack: [
      "React.js",
      "Node.js",
      "Tailwind CSS",
      "Vercel",
      "Problem Solving",
      "Git",
      "GitHub",
    ],
    imageUrl: "/assets/bsvpreview.png",
    github: "https://github.com/akyabhishek/BinarySearchVisualizer",
    live: true,
    liveUrl: "https://binary-search-visualizer-mauve.vercel.app/",
  },
  {
    title: "FlowTrace",
    description: "Browser extension for tracing user flows and debugging.",
    techStack: [
      "JavaScript",
      "Chrome Extension API",
      "Manifest V3",
      "HTML",
      "CSS",
    ],
    imageUrl: "/assets/flowtrace-preview.jpg",
    github: "https://github.com/akyabhishek/FlowTrace",
    live: false,
  },
  {
    title: "Personal Portfolio",
    description: "A personal portfolio site portfolio site",
    techStack: [
      "React.js",
      "Tailwind CSS",
      "shadcn/ui",
      "TypeScript",
      "Acernity",
      "Vercel",
    ],
    imageUrl: "/assets/portfolio-thumb.png",
    github: "https://github.com/akyabhishek/react-portfolio-template",
    live: true,
    liveUrl: "https://akyabhishek.vercel.app/",
  },
  {
    title: "Stylish Analog Clock",
    description:
      "A sleek neumorphic analog clock with dark and light modes, built using HTML, CSS, and JavaScript.",
    techStack: ["HTML", "CSS", "JavaScript"],
    imageUrl: "/assets/clock-thumb.png",
    github: "https://github.com/akyabhishek/react-portfolio-template",
    live: true,
    liveUrl: "https://akyabhishek.github.io/Stylish-Clock-Dark-Light-Mode-/",
  },
];

// ─── Education ──────────────────────────────────────────────────────────────

export const educationData: EducationItem[] = [
  {
    institution:
      "Shri Ramswaroop Memorial College of Engineering and Management",
    degree: "Bachelor of Technology - CSE",
    score: "CGPA: 8.33/10",
    year: "2023",
  },
  {
    institution: "Hewett Polytechnic Lucknow",
    degree: "Diploma in Information Technology",
    score: "Percentage: 75%",
    year: "2019",
  },
];

// ─── Achievements ───────────────────────────────────────────────────────────

export const achievementsData: AchievementItem[] = [
  {
    title: "200+ Problems Solved",
    platform: "Leetcode",
    year: "2024",
    url: "https://leetcode.com/mrabk121/",
  },
  {
    title: "Best Academic Project Award (2019 - 2023)",
    platform: "SRMCEM",
    year: "2023",
    url: "https://drive.google.com/file/d/1QvwWHfBMd7lhCty6nPicp3VrSjPCE4nE/view?usp=drive_link",
  },
  {
    title: "Grand Finalist",
    platform: "Smart India Hackathon",
    year: "2022",
    url: "https://www.linkedin.com/posts/abhishekkumaryadav_sih2022-ministryofeducation-ministryofculture-activity-6971838432453046272-0L-h?utm_source=share&utm_medium=member_desktop",
  },
];

// ─── Certifications ─────────────────────────────────────────────────────────

export const certificationsData: CertificationItem[] = [
  {
    title: "Advanced Data Structures in Java",
    platform: "Udemy",
    year: "2024",
    url: "https://drive.google.com/file/d/1OhJbdhYn1LhzN6_tnD4ks6ZzCDVHrGjr/view?usp=drive_link",
  },
  {
    title: "Java Programming",
    platform: "Coursera",
    year: "2023",
    url: "https://drive.google.com/file/d/1yfZ7h8oYsfLhH5hOqZW8tr2tmr60h4sy/view?usp=drive_link",
  },
  {
    title: "Building Java Microservices with Spring Boot and Spring Cloud",
    platform: "Udemy",
    year: "2023",
    url: "https://www.udemy.com/certificate/UC-47c5ff68-0ed1-42d8-b501-902b503dc382/",
  },
];

// ─── Skill Summary (flat, for resume-style display) ─────────────────────────

export const skillSummaryData: SkillSummary[] = [
  {
    category: "Languages",
    items: ["Java", "TypeScript", "JavaScript", "Python", "HTML", "CSS"],
  },
  {
    category: "Frameworks",
    items: [
      "Spring Core",
      "Spring Boot",
      "Spring Security",
      "Spring Data JPA",
      "Node.js",
    ],
  },
  {
    category: "Libraries",
    items: ["ReactJS", "Tailwind", "Axios", "Lombok", "TensorFlow"],
  },
  {
    category: "Databases",
    items: ["MySQL", "SQL Server", "Firebase"],
  },
  {
    category: "Tools",
    items: [
      "Git",
      "GitHub",
      "GitHub Actions",
      "Swagger",
      "Maven",
      "Gradle",
      "Android Studio",
      "IntelliJ",
      "VS Code",
      "Vite",
    ],
  },
  {
    category: "Cloud Services",
    items: [
      "Google Cloud (Cloud SQL, Cloud Storage, App Engine)",
      "Vercel",
      "Azure",
    ],
  },
  {
    category: "Soft Skills",
    items: ["Problem-Solving", "Communication", "Team Player"],
  },
  {
    category: "Areas of Interest",
    items: ["Programming", "Web Development", "Machine Learning"],
  },
];

// ─── Utility ────────────────────────────────────────────────────────────────

/** Calculate human-readable duration between two MM/YYYY strings (or "Present") */
export const calculateDuration = (from: string, to: string): string => {
  const [fromMonth, fromYear] = from.split("/").map(Number);
  const [toMonth, toYear] =
    to.toLowerCase() === "present"
      ? [new Date().getMonth() + 1, new Date().getFullYear()]
      : to.split("/").map(Number);

  const totalMonths = (toYear - fromYear) * 12 + (toMonth - fromMonth) + 1;
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  const yearText = years > 0 ? `${years} year${years > 1 ? "s" : ""}` : "";
  const monthText = months > 0 ? `${months} month${months > 1 ? "s" : ""}` : "";
  return [yearText, monthText].filter(Boolean).join(" ");
};

/** Calculate experience string from career start date */
export const getExperienceString = (): string => {
  const start = new Date(personalInfo.careerStartDate);
  const now = new Date();
  let months =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth());
  if (now.getDate() < start.getDate()) months--;
  const years = Math.floor(months / 12);
  const remMonths = months % 12;
  if (years > 0 && remMonths > 0) {
    return `${years} year${years > 1 ? "s" : ""} ${remMonths} month${
      remMonths > 1 ? "s" : ""
    }`;
  } else if (years > 0) {
    return `${years} year${years > 1 ? "s" : ""}`;
  }
  return `${remMonths} month${remMonths > 1 ? "s" : ""}`;
};
