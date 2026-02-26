import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { experienceData, calculateDuration } from "@/config/data";

export default function CVExperience() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: timelineProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.85", "end 0.5"],
  });
  const lineScaleY = useTransform(timelineProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="relative py-28 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-purple-500 dark:text-purple-400 font-medium mb-4">
            Career
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Experience
          </h2>
        </motion.div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Timeline track (background) */}
          <div className="absolute left-[19px] top-0 bottom-0 w-px bg-gray-200/50 dark:bg-white/[0.04]" />
          {/* Timeline line - grows as you scroll */}
          <motion.div
            style={{ scaleY: lineScaleY, transformOrigin: "top" }}
            className="absolute left-[19px] top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-emerald-500/50 to-transparent"
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ margin: "-100px" }}
            variants={{ visible: { transition: { staggerChildren: 0.25 } } }}
            className="space-y-12"
          >
            {experienceData.map((exp, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, x: -50, filter: "blur(8px)" },
                  visible: {
                    opacity: 1,
                    x: 0,
                    filter: "blur(0px)",
                    transition: {
                      duration: 0.7,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    },
                  },
                }}
                className="relative pl-14 group"
              >
                {/* Timeline dot */}
                <div className="absolute left-[12px] top-2">
                  <span className="relative flex h-4 w-4">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-30 group-hover:opacity-60 transition-opacity" />
                    <span className="relative inline-flex h-4 w-4 rounded-full bg-gradient-to-r from-purple-500 to-emerald-500 border-2 border-gray-50 dark:border-slate-950" />
                  </span>
                </div>

                {/* Card */}
                <div className="relative p-6 rounded-2xl bg-white/80 dark:bg-white/[0.03] border border-gray-200/60 dark:border-white/[0.06] hover:border-purple-300 dark:hover:border-purple-500/20 hover:scale-[1.02] transition-all duration-500 group-hover:bg-white dark:group-hover:bg-white/[0.05] backdrop-blur-sm shadow-sm dark:shadow-none">
                  {/* Subtle glow on hover */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
                      <div className="flex items-center gap-3">
                        {exp.logoPath && (
                          <img
                            src={exp.logoPath}
                            alt={exp.company}
                            className="h-8 w-8 rounded-lg object-contain bg-gray-100 dark:bg-white/10 p-1"
                          />
                        )}
                        <div>
                          <h3 className="text-lg font-medium tracking-tight text-gray-900 dark:text-white">
                            {exp.title}
                          </h3>
                          <p className="text-purple-600 dark:text-purple-400/90 text-sm font-light">
                            {exp.company}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                          {exp.from} — {exp.to}
                        </p>
                        <p className="text-xs text-emerald-600/70 dark:text-emerald-400/70">
                          {calculateDuration(exp.from, exp.to)}
                        </p>
                      </div>
                    </div>

                    {exp.location && (
                      <p className="text-xs text-gray-400 dark:text-gray-600 mb-3">
                        📍 {exp.location}
                      </p>
                    )}

                    <p className="text-gray-500 dark:text-gray-400 text-[15px] leading-[1.7] font-light mb-4">
                      {exp.description}
                    </p>

                    {/* Bullets */}
                    {exp.bullets && exp.bullets.length > 0 && (
                      <ul className="space-y-2 mb-4">
                        {exp.bullets.map((bullet, bIdx) => (
                          <li
                            key={bIdx}
                            className="flex items-start gap-2 text-[14px] text-gray-500 dark:text-gray-400 font-light leading-relaxed"
                          >
                            <span className="text-emerald-500 mt-1 shrink-0">
                              ▹
                            </span>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Tech tags */}
                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {exp.technologies.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 text-[11px] rounded-full bg-gray-100 dark:bg-white/[0.04] border border-gray-200/60 dark:border-white/[0.06] text-gray-500 font-light tracking-wide hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-white/10 transition-all duration-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Achievements */}
                    {exp.achievements && exp.achievements.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-gray-100 dark:border-white/5">
                        <p className="text-[11px] text-gray-400 dark:text-gray-600 uppercase tracking-wider font-medium mb-2">
                          Key Achievements
                        </p>
                        {exp.achievements.map((ach, aIdx) => (
                          <p
                            key={aIdx}
                            className="text-[13px] text-emerald-600/80 dark:text-emerald-400/80 font-light flex items-center gap-1.5"
                          >
                            <span>✦</span> {ach}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
