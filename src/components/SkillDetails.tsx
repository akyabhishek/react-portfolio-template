import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Skill } from "../config/skillsData";

interface SkillDetailsProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  category: string;
  skills: Skill[];
  icon: JSX.Element;
}

const SkillDetails: React.FC<SkillDetailsProps> = ({
  isOpen,
  onOpenChange,
  category,
  skills,
  icon,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl p-5 md:p-8 max-h-[90vh] h-[100vh] sm:h-auto overflow-y-auto scrollbar-hide bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-md">
        <DialogHeader className="mb-5">
          <DialogTitle className="text-xl md:text-2xl font-bold flex items-center gap-3">
            <span className="text-emerald-600 text-2xl">{icon}</span>
            {category}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-900 transition-colors duration-200"
            >
              {skill.icon && (
                <span className="text-3xl text-black dark:text-gray-200 flex-shrink-0 mt-0.5">
                  {skill.icon}
                </span>
              )}
              <div className="flex flex-col gap-0.5 min-w-0">
                <span className="text-sm font-semibold text-slate-800 dark:text-gray-200">
                  {skill.name}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                    {skill.level}
                  </span>
                  {skill.experience && (
                    <span className="text-[11px] text-slate-500 dark:text-gray-500">
                      · {skill.experience}
                    </span>
                  )}
                </div>
                {skill.description && (
                  <p className="text-[11px] text-slate-600 dark:text-gray-400 leading-relaxed mt-1">
                    {skill.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SkillDetails;
