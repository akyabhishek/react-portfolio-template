import ProjectCard from "./ProjectCard";
import { projectsData } from "@/config/data";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function ProjectsSection() {
  return (
    <div className="pt-10" id="projects">
      <section className="p-6 md:p-8 max-w-5xl mx-auto transition-colors duration-300">
        <h1 className="text-3xl font-bold mb-2">PROJECTS</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          A showcase of my work, highlighting the technologies I've used and the
          problems I've solved.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {projectsData.slice(0, 4).map((project, index) => (
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
        <div className="text-center mt-8">
          <Button variant="link" asChild className="hover:text-emerald-600">
            <Link to="/projects" className="gap-1">
              View All Projects →
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
