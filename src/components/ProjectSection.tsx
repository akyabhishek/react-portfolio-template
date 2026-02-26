import ProjectCard from "./ProjectCard";
import { projectsData } from "@/config/data";

export default function ProjectsSection() {
  return (
    <div className="pt-5" id="projects">
      <h1 className="text-3xl font-bold mb-2">PROJECTS</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-2">
        A showcase of my work, highlighting the technologies I've used and the
        problems I've solved.
      </p>
      <section className="p-6 md:p-12 bg-gradient-to-b max-w-4xl mx-auto transition-colors duration-300">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {projectsData.map((project, index) => (
            <div key={index} className="h-full">
              <ProjectCard
                title={project.title}
                description={project.description}
                techStack={project.techStack}
                imageUrl={project.imageUrl}
                github={project.github}
                liveUrl={project.liveUrl}
                playstore={project.playstore}
                live={project.live}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
