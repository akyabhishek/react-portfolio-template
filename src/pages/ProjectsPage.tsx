import { projectsData } from "@/config/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SiGithub, SiGoogleplay } from "react-icons/si";
import { motion } from "motion/react";

export default function ProjectsPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 pt-20 pb-12">
      <h1 className="text-3xl font-bold tracking-tight mb-3">Projects</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 font-sans mb-12">
        Things I've designed, built, and shipped.
      </p>

      <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
        {projectsData.map((project, index) => {
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-8 py-10`}
            >
              <div className="w-full md:w-1/2 flex-shrink-0">
                <div className="rounded-xl overflow-hidden p-4">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-auto object-contain rounded-lg max-h-64"
                  />
                </div>
              </div>

              <div className="w-full md:w-1/2 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-5xl font-black text-neutral-200 dark:text-neutral-800 select-none">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-gray-100">
                    {project.title}
                  </h2>
                  {project.live && (
                    <span className="inline-block h-2 w-2 rounded-full bg-emerald-500"></span>
                  )}
                </div>

                <p className="text-base text-slate-600 dark:text-gray-400 leading-7">
                  {project.description}
                </p>

                {project.bullets && project.bullets.length > 0 && (
                  <ul className="space-y-1.5 pl-4">
                    {project.bullets.map((bullet, i) => (
                      <li
                        key={i}
                        className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed list-disc"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex flex-wrap gap-1.5 mt-1">
                  {project.techStack.map((tech, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="font-normal text-[11px] rounded-full border-0 bg-black/[0.05] text-slate-700 dark:bg-white/[0.08] dark:text-gray-300"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center gap-4 pt-2">
                  {project.github && (
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <SiGithub className="mr-1.5" />
                        GitHub
                      </a>
                    </Button>
                  )}
                  {project.playstore && (
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={project.playstore}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <SiGoogleplay className="mr-1.5" />
                        Play Store
                      </a>
                    </Button>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-emerald-600 hover:text-emerald-500 underline underline-offset-4 decoration-emerald-300 dark:decoration-emerald-800 hover:decoration-emerald-500 transition-colors"
                    >
                      Live ↗
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
