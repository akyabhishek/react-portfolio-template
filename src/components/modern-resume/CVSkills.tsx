import { motion } from "framer-motion";
import { skillsData } from "@/config/skillsData";

const levelColors: Record<string, string> = {
  Expert: "from-emerald-500 to-emerald-400",
  Advanced: "from-purple-500 to-purple-400",
  Intermediate: "from-blue-500 to-blue-400",
  Beginner: "from-gray-500 to-gray-400",
};

const levelWidths: Record<string, string> = {
  Expert: "w-full",
  Advanced: "w-3/4",
  Intermediate: "w-1/2",
  Beginner: "w-1/4",
};

export default function CVSkills() {
  return (
    <section id="skills" className="relative py-28 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 font-medium mb-4">
            Toolkit
          </p>
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Technical Skills
          </h2>
        </motion.div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillsData.map((category, cIdx) => (
            <motion.div
              key={cIdx}
              initial={{
                opacity: 0,
                x: cIdx % 2 === 0 ? -40 : 40,
                rotateY: cIdx % 2 === 0 ? -5 : 5,
                filter: "blur(6px)",
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                rotateY: 0,
                filter: "blur(0px)",
              }}
              viewport={{ margin: "-50px" }}
              transition={{
                duration: 0.7,
                delay: cIdx * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="relative p-6 rounded-2xl bg-white/80 dark:bg-white/[0.02] border border-gray-200/60 dark:border-white/[0.06] hover:border-emerald-300 dark:hover:border-emerald-500/20 hover:scale-[1.02] transition-all duration-500 group shadow-sm dark:shadow-none"
            >
              {/* Category glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                <h3 className="text-base font-medium tracking-tight text-gray-900 dark:text-white mb-5 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500" />
                  {category.category}
                </h3>

                <div className="space-y-3">
                  {category.items.map((skill, sIdx) => (
                    <motion.div
                      key={sIdx}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ margin: "-30px" }}
                      transition={{
                        duration: 0.4,
                        delay: cIdx * 0.1 + sIdx * 0.07,
                      }}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[14px] text-gray-600 dark:text-gray-300 font-light">
                          {skill.name}
                        </span>
                        <span className="text-[11px] text-gray-400 dark:text-gray-500 font-light tracking-wide">
                          {skill.level}
                          {skill.experience && ` · ${skill.experience}`}
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full bg-black/5 dark:bg-white/5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{
                            width:
                              skill.level === "Expert"
                                ? "100%"
                                : skill.level === "Advanced"
                                  ? "75%"
                                  : skill.level === "Intermediate"
                                    ? "50%"
                                    : "25%",
                          }}
                          viewport={{ margin: "-30px" }}
                          transition={{
                            duration: 1.2,
                            delay: cIdx * 0.1 + sIdx * 0.07,
                            type: "spring",
                            stiffness: 50,
                            damping: 15,
                          }}
                          className={`h-full rounded-full bg-gradient-to-r ${
                            levelColors[skill.level] || levelColors.Beginner
                          }`}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
