import { CardSpotlight } from "./ui/card-spotlight";
import { useState } from "react";
import { skillsData, type Skill } from "../config/skillsData";
import SkillDetails from "./SkillDetails";

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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [selectedIcon, setSelectedIcon] = useState<JSX.Element | null>(null);

  const handleCategoryClick = (
    category: string,
    skills: Skill[],
    icon: JSX.Element,
  ) => {
    setSelectedCategory(category);
    setSelectedSkills(skills);
    setSelectedIcon(icon);
    setIsDialogOpen(true);
  };

  return (
    <div className="pt-5" id="skills">
      <h1 className="text-3xl font-bold mb-2">SKILLS</h1>
      <p className="text-gray-600 dark:text-gray-400">
        My technical skills and expertise
      </p>

      <section className="p-6 md:p-12 bg-gradient-to-b max-w-4xl mx-auto transition-colors duration-300">
        {/* Proficiency Level Legend */}
        <div className="max-w-4xl mx-auto mb-4">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Proficiency Levels:
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(["Beginner", "Intermediate", "Advanced", "Expert"] as const).map(
              (level) => (
                <div
                  key={level}
                  className="flex items-center gap-3 px-3 py-2 bg-gray-100 dark:bg-neutral-800 rounded-2xl"
                >
                  <CircularIndicator level={level} />
                  <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                    {level}
                  </span>
                </div>
              ),
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          {skillsData.map((skill) => (
            <CardSpotlight
              key={skill.category}
              className="p-4 rounded-2xl shadow-sm hover:shadow-lg duration-500 ease-in-out transition-all cursor-pointer"
              onClick={() =>
                handleCategoryClick(
                  skill.category,
                  skill.items,
                  (skill.categoryIcon as JSX.Element) || <></>,
                )
              }
            >
              <h3 className="text-xl mb-3 text-grey-700 font-bold dark:text-gray-100 relative z-20 flex items-center gap-2">
                {skill.categoryIcon && (
                  <span className="text-emerald-600">{skill.categoryIcon}</span>
                )}
                {skill.category}
              </h3>

              <ul className="flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <li key={item.name}>
                    <span className="relative z-20 flex items-center gap-2 px-3 py-2 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-900 text-slate-900 dark:text-gray-200 hover:shadow-lg hover:translate-y-[-2px] transition-all duration-500 cursor-pointer">
                      {item.icon && (
                        <span className="text-xl">{item.icon}</span>
                      )}
                      <span className="font-medium">{item.name}</span>
                      <CircularIndicator level={item.level} />
                    </span>
                  </li>
                ))}
              </ul>
            </CardSpotlight>
          ))}
        </div>
      </section>

      {/* Skill Details Dialog */}
      <SkillDetails
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        category={selectedCategory}
        skills={selectedSkills}
        icon={selectedIcon || <></>}
      />
    </div>
  );
}
