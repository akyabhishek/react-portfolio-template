import { motion } from "framer-motion";
import { FiFileText } from "react-icons/fi";
import {
  educationData,
  achievementsData,
  certificationsData,
} from "@/config/data";

export default function CVEducation() {
  return (
    <section id="education" className="relative py-28 px-6">
      <div className="max-w-4xl mx-auto space-y-24">
        {/* ─── Education ─── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-14"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-orange-500 dark:text-orange-400 font-medium mb-4">
              Background
            </p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Education
            </h2>
          </motion.div>

          <div className="space-y-6">
            {educationData.map((edu, idx) => (
              <motion.div
                key={idx}
                initial={{
                  opacity: 0,
                  x: idx % 2 === 0 ? -40 : 40,
                  filter: "blur(6px)",
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  filter: "blur(0px)",
                }}
                viewport={{ margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="relative p-6 rounded-2xl bg-white/80 dark:bg-white/[0.02] border border-gray-200/60 dark:border-white/[0.06] hover:border-orange-300 dark:hover:border-orange-500/20 hover:scale-[1.02] transition-all duration-500 group shadow-sm dark:shadow-none"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 flex items-start justify-between flex-wrap gap-3">
                  <div>
                    <h3 className="text-lg font-medium tracking-tight text-gray-900 dark:text-white mb-1">
                      {edu.degree}
                    </h3>
                    <p className="text-orange-600/80 dark:text-orange-400/70 text-[14px] font-light">
                      {edu.institution}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-[11px] font-medium tracking-wide">
                      {edu.year}
                    </span>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                      {edu.score}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ─── Achievements ─── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-14"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-yellow-500 dark:text-yellow-400 font-medium mb-4">
              Recognition
            </p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Achievements
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {achievementsData.map((ach, idx) => (
              <motion.a
                key={idx}
                href={ach.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8, y: 30, filter: "blur(6px)" }}
                whileInView={{
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  filter: "blur(0px)",
                }}
                viewport={{ margin: "-50px" }}
                transition={{
                  duration: 0.6,
                  delay: idx * 0.15,
                  type: "spring",
                  stiffness: 150,
                  damping: 15,
                }}
                className="relative p-5 rounded-2xl bg-white/80 dark:bg-white/[0.02] border border-gray-200/60 dark:border-white/[0.06] hover:border-yellow-300 dark:hover:border-yellow-500/20 hover:scale-[1.03] transition-all duration-500 group cursor-pointer block shadow-sm dark:shadow-none"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-yellow-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10 text-center">
                  <div className="text-2xl mb-3">🏆</div>
                  <h3 className="text-[13px] font-medium text-gray-900 dark:text-white mb-1">
                    {ach.title}
                  </h3>
                  <p className="text-[11px] text-yellow-600/70 dark:text-yellow-400/60 font-light">
                    {ach.platform}
                  </p>
                  <p className="text-[11px] text-gray-400 dark:text-gray-600 mt-1 font-light">
                    {ach.year}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* ─── Certifications ─── */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="mb-14"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-500 dark:text-cyan-400 font-medium mb-4">
              Credentials
            </p>
            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 dark:text-white">
              Certifications
            </h2>
          </motion.div>

          <div className="space-y-3">
            {certificationsData.map((cert, idx) => (
              <motion.a
                key={idx}
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{
                  opacity: 0,
                  x: idx % 2 === 0 ? -30 : 30,
                  filter: "blur(4px)",
                }}
                whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                viewport={{ margin: "-30px" }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.08,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="flex items-center justify-between p-4 rounded-xl bg-white/80 dark:bg-white/[0.02] border border-gray-200/60 dark:border-white/[0.06] hover:border-cyan-300 dark:hover:border-cyan-500/20 hover:scale-[1.01] transition-all duration-500 group cursor-pointer shadow-sm dark:shadow-none"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400 text-sm font-bold">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="text-[14px] font-medium text-gray-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                      {cert.title}
                    </p>
                    <p className="text-[11px] text-gray-400 dark:text-gray-500 font-light tracking-wide">
                      {cert.platform} · {cert.year}
                    </p>
                  </div>
                </div>
                <FiFileText
                  className="text-gray-300 dark:text-gray-600 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors"
                  size={16}
                />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
