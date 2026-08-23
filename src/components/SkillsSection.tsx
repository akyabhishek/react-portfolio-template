import { CardSpotlight } from "./ui/card-spotlight";
import { useNavigate } from "react-router-dom";
import { skillsData, type Skill } from "../config/skillsData";
import { slugify } from "@/utils/utils";

// Proficiency utility functions
const getProficiencyLevel = (level: Skill["level"]): number => {
  switch (level) {
    case "Expert":
      return 4;
    case "Advanced":
      return 3;
    case "Intermediate":
      return 2;
    case "Beginner":
      return 1;
    default:
      return 1;
  }
};

const getProficiencyColor = (level: Skill["level"]): string => {
  switch (level) {
    case "Expert":
      return "text-cyan-500 dark:text-cyan-400";
    case "Advanced":
      return "text-emerald-500 dark:text-emerald-400";
    case "Intermediate":
      return "text-amber-500 dark:text-amber-400";
    case "Beginner":
      return "text-slate-400 dark:text-slate-500";
    default:
      return "text-emerald-500 dark:text-emerald-400";
  }
};

// Circular Proficiency Indicator Component
export const CircularIndicator = ({ level }: { level: Skill["level"] }) => {
  const quarters = getProficiencyLevel(level);
  const colorClass = getProficiencyColor(level);

  return (
    <div className="w-4 h-4 relative">
      <svg className="w-4 h-4 transform -rotate-90" viewBox="0 0 16 16">
        {/* Background circle */}
        <circle
          cx="8"
          cy="8"
          r="6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-gray-300 dark:text-gray-600"
        />
        {/* Progress quarters */}
        {Array.from({ length: quarters }, (_, i) => (
          <circle
            key={i}
            cx="8"
            cy="8"
            r="6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeDasharray="9.42 37.68"
            strokeDashoffset={-i * 9.42}
            className={`${colorClass} transition-all duration-300`}
          />
        ))}
      </svg>
    </div>
  );
};

export default function SkillsSection() {
  const navigate = useNavigate();

  const handleCategoryClick = (category: string) => {
    navigate(`/skills#${slugify(category)}`);
  };

  return (
    <div className="pt-10" id="skills">
      <section className="p-6 md:p-8 max-w-5xl mx-auto transition-colors duration-300">
        <h1 className="text-3xl font-bold mb-2">SKILLS</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          My technical skills and expertise
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skillsData.map((skill) => (
            <CardSpotlight
              key={skill.category}
              className="p-4 cursor-pointer"
              onClick={() => handleCategoryClick(skill.category)}
            >
              <h3 className="text-sm mb-3 font-bold dark:text-gray-100 relative z-20 flex items-center gap-2">
                {skill.categoryIcon && (
                  <span className="text-emerald-600">{skill.categoryIcon}</span>
                )}
                {skill.category}
              </h3>

              <div className="relative z-20 grid grid-cols-4 sm:grid-cols-5 gap-2">
                {skill.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex flex-col items-center justify-center gap-1 p-2 rounded-lg hover:bg-white/30 hover:dark:bg-white/10 hover:backdrop-blur-md hover:shadow-lg transition-all duration-300"
                  >
                    {item.icon && (
                      <span className="text-3xl text-black dark:text-gray-200">
                        {item.icon}
                      </span>
                    )}
                    <span className="text-[10px] font-medium text-center text-slate-700 dark:text-gray-300 leading-tight break-words w-full">
                      {item.name}
                    </span>
                  </div>
                ))}
              </div>
            </CardSpotlight>
          ))}
        </div>
      </section>
    </div>
  );
}
