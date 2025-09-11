import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Skill } from "../config/skillsData";
import { CircularIndicator } from "./SkillsSection";

interface SkillDetailsProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  category: string;
  skills: Skill[];
  icon: JSX.Element;
  iconMap: Record<string, JSX.Element>;
}

const SkillDetails: React.FC<SkillDetailsProps> = ({
  isOpen,
  onOpenChange,
  category,
  skills,
  icon,
  iconMap,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl p-4 md:p-6 max-h-[85vh] overflow-y-auto bg-background border border-neutral-200 dark:border-neutral-800">
        <DialogHeader className="mb-3 border-b pb-3 border-neutral-200 dark:border-neutral-800">
          <DialogTitle className="text-xl md:text-2xl font-bold flex items-center gap-2">
            <span className="text-emerald-600 text-xl md:text-2xl">{icon}</span>
            {category} Skills
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-slate-100 dark:bg-zinc-900 rounded-xl p-3 hover:shadow-md transition-shadow flex flex-col border border-neutral-200 dark:border-neutral-800"
            >
              <div className="flex items-center gap-2 mb-2 pb-1.5 border-b border-gray-200 dark:border-gray-800">
                {iconMap[skill.name] && (
                  <span className="text-lg md:text-xl text-emerald-600 flex-shrink-0">
                    {iconMap[skill.name]}
                  </span>
                )}
                <h3 className="text-base md:text-lg font-semibold tracking-tight truncate text-slate-900 dark:text-gray-100">
                  {skill.name}
                </h3>
              </div>

              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs text-slate-700 dark:text-gray-300 font-medium">
                  Proficiency:
                </span>
                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-500">
                  {skill.level}
                </span>
                <CircularIndicator level={skill.level} />
              </div>

              {skill.experience && (
                <div className="text-xs text-slate-700 dark:text-gray-300 mb-1.5">
                  <span className="font-medium">Experience:</span>{" "}
                  <span className="italic">{skill.experience}</span>
                </div>
              )}

              {skill.description && (
                <p className="text-xs text-slate-600 dark:text-gray-400 mt-auto line-clamp-2 hover:line-clamp-none leading-relaxed">
                  {skill.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SkillDetails;
