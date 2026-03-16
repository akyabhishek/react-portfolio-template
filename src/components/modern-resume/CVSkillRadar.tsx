import { motion } from "framer-motion";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";
import { skillsData } from "@/config/skillsData";

const levelScore: Record<string, number> = {
  Expert: 100,
  Advanced: 75,
  Intermediate: 50,
  Beginner: 25,
};

const radarData = skillsData.map((cat) => {
  const avg =
    cat.items.reduce((sum, s) => sum + (levelScore[s.level] || 0), 0) /
    cat.items.length;
  return {
    category: cat.category.replace(" / ", "/"),
    score: Math.round(avg),
    fullMark: 100,
  };
});

export default function CVSkillRadar() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -40,
        rotateY: -5,
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
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="relative p-6 rounded-2xl bg-white/80 dark:bg-white/[0.02] border border-gray-200/60 dark:border-white/[0.06] hover:border-emerald-300 dark:hover:border-emerald-500/20 hover:scale-[1.02] transition-all duration-500 group shadow-sm dark:shadow-none"
    >
      {/* Category glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <h3 className="text-base font-medium tracking-tight text-gray-900 dark:text-white mb-2 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-gradient-to-r from-emerald-500 to-cyan-500" />
          Proficiency Overview
        </h3>
        <p className="text-[12px] text-gray-400 dark:text-gray-500 font-light mb-4">
          Average proficiency across skill categories
        </p>

        <ResponsiveContainer width="100%" height={440}>
          <RadarChart cx="50%" cy="50%" outerRadius="85%" data={radarData}>
            <PolarGrid
              stroke="currentColor"
              className="text-gray-200 dark:text-white/[0.06]"
            />
            <PolarAngleAxis
              dataKey="category"
              tick={{
                fontSize: 11,
                fill: "currentColor",
                className: "text-gray-500 dark:text-gray-400",
              }}
            />
            <Radar
              name="Proficiency"
              dataKey="score"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.15}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
