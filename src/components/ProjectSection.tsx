import ProjectCard from "./ProjectCard";
import { projectsData } from "@/config/data";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export default function ProjectsSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="pt-10 overflow-x-clip" id="projects">
      <section className="p-6 md:p-8 max-w-5xl mx-auto transition-colors duration-300">
        <h1 className="text-3xl font-bold mb-2">PROJECTS</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          A showcase of my work, highlighting the technologies I've used and the
          problems I've solved.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {projectsData.slice(0, 4).map((project, index) => (
            <motion.div
              key={index}
              className="h-full"
              initial={prefersReducedMotion ? false : "hidden"}
              animate={prefersReducedMotion ? "visible" : "hidden"}
              variants={{
                hidden: { opacity: 0, x: index % 2 === 0 ? -48 : 48 },
                visible: { opacity: 1, x: 0 },
              }}
              whileInView={prefersReducedMotion ? undefined : "visible"}
              viewport={{ once: false, amount: 0.1 }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.4,
                ease: "easeOut",
              }}
            >
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
            </motion.div>
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
