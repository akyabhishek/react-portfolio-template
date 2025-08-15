import ProjectCard from "./ProjectCard";

const projects = [
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
  },
  {
    title: "edorbit mobile app",
    description:
      "An interactive 3D and AR-powered app that helps visualize complex theoretical diagrams.",
    techStack: [
      "Java",
      "Android Studio",
      "Fireabse",
      "Scene Viewer",
      "Firebase Authentication",
      "Firebase Realtime Database",
    ],
    imageUrl: "/assets/edorbit-m-preview.png",
    live: true,
    liveUrl: "https://edorbit.com/",
    playstore:
      "https://play.google.com/store/apps/details?id=com.nbytech.edorbit",
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

export default function ProjectsSection() {
  return (
    <div className="pt-5" id="projects">
      <h1 className="text-3xl font-bold mb-2">PROJECTS</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-2">
        A showcase of my work, highlighting the technologies I've used and the
        problems I've solved.
      </p>
      <section className="p-6 md:p-12 bg-gradient-to-b max-w-4xl mx-auto transition-colors duration-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              techStack={project.techStack}
              imageUrl={project.imageUrl}
              github={project.github}
              liveUrl={project.liveUrl}
              playstore={project.playstore}
              live={project.live}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
