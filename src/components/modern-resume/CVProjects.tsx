import { motion } from "framer-motion";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import { SiGoogleplay } from "react-icons/si";
import { projectsData } from "@/config/data";

export default function CVProjects() {
  return (
    <section id="projects" className="relative py-28 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-blue-500 dark:text-blue-400 font-medium mb-4">
            Portfolio
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Projects
          </h2>
        </motion.div>

        {/* Projects grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ perspective: "1200px" }}
        >
          {projectsData.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{
                opacity: 0,
                y: 60,
                rotateX: 15,
                scale: 0.9,
                filter: "blur(6px)",
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                rotateX: 0,
                scale: 1,
                filter: "blur(0px)",
              }}
              viewport={{ margin: "-50px" }}
              transition={{
                duration: 0.7,
                delay: idx * 0.12,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="group relative"
            >
              <div className="relative h-full p-6 rounded-2xl bg-white/80 dark:bg-white/[0.02] border border-gray-200/60 dark:border-white/[0.06] hover:border-blue-300 dark:hover:border-blue-500/20 hover:scale-[1.02] transition-all duration-500 flex flex-col shadow-sm dark:shadow-none">
                {/* Glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative z-10 flex flex-col h-full">
                  {/* Image */}
                  <div className="relative overflow-hidden rounded-xl mb-4 aspect-video bg-gray-100 dark:bg-white/5">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {project.live && (
                      <div className="absolute top-2 right-2">
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-[10px] font-medium backdrop-blur-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                          Live
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-medium tracking-tight text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[14px] text-gray-500 dark:text-gray-400 mb-4 flex-grow leading-[1.7] font-light">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.techStack.slice(0, 5).map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 text-[10px] rounded-full bg-gray-100 dark:bg-white/[0.04] border border-gray-200/60 dark:border-white/[0.06] text-gray-500 font-light tracking-wide"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 5 && (
                      <span className="px-2 py-0.5 text-[10px] rounded-full bg-gray-100 dark:bg-white/[0.04] border border-gray-200/60 dark:border-white/[0.06] text-gray-500 font-light tracking-wide">
                        +{project.techStack.length - 5}
                      </span>
                    )}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-3 pt-3 border-t border-gray-100 dark:border-white/5">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                        title="Source Code"
                      >
                        <FiGithub size={16} />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 dark:text-gray-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                        title="Live Demo"
                      >
                        <FiExternalLink size={16} />
                      </a>
                    )}
                    {project.playstore && (
                      <a
                        href={project.playstore}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 dark:text-gray-500 hover:text-green-500 dark:hover:text-green-400 transition-colors"
                        title="Play Store"
                      >
                        <SiGoogleplay size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
