// Experience.tsx
import React from "react";
import {
  Briefcase,
  CalendarDays,
  MapPin,
} from "lucide-react";
import { settings } from "@/config/settings";
import { experienceData } from "@/config/data";
import { ScrollStack, ScrollStackItem } from "@/components/ui/scroll-stack";

// Define the type for each experience card
interface ExperienceCardProps {
  title: string;
  company: string;
  description?: string;
  from: string;
  to: string;
  location?: string;
  logoPath?: string;
  technologies?: string[];
  achievements?: string[];
}

// Experience card component
const ExperienceCard: React.FC<ExperienceCardProps> = ({
  title,
  company,
  description,
  from,
  to,
  location,
  logoPath,
  technologies,
  achievements,
}) => {
  const hasAchievements = !!achievements && achievements.length > 0;
  const hasTechnologies = !!technologies && technologies.length > 0;
  // Skills get the full card width when there's nothing to share columns with.
  const skillsFullWidth = !description && !hasAchievements && hasTechnologies;

  return (
    <div className="rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/40 p-4 md:p-6 transition-colors duration-300">
      <div
        className="flex w-full items-start justify-between gap-4 text-left"
      >
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white p-1.5 dark:bg-neutral-200">
            {settings.experience.showCompanyLogos && logoPath ? (
              <img
                src={logoPath}
                alt={`${company} logo`}
                loading="lazy"
                className="h-full w-full object-contain"
              />
            ) : (
              <Briefcase className="h-5 w-5 text-neutral-600 dark:text-neutral-300" />
            )}
          </span>
          <div>
            <h4 className="font-bold text-neutral-900 dark:text-neutral-100">
              {title}
            </h4>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              {company}
            </p>
            <span className="mt-1 flex items-center gap-1 text-xs text-neutral-500">
              <CalendarDays className="h-3 w-3" />
              {from} - {to}
            </span>
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1">
          <span className="flex items-center gap-1 text-xs text-neutral-500">
            <CalendarDays className="h-3 w-3" />
            {from} - {to}
          </span>
          {location && (
            <span className="flex items-center gap-1 text-xs text-neutral-500">
              <MapPin className="h-3 w-3" />
              {location}
            </span>
          )}
        </div>
      </div>

          <div>
            <hr className="my-4 border-neutral-200 dark:border-neutral-800" />
            {skillsFullWidth ? (
              <div>
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                  Skills &amp; Technologies
                </p>
                <div className="flex flex-wrap gap-2">
                  {technologies!.map((tech, index) => (
                    <span
                      key={index}
                      className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  {description && (
                    <>
                      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                        Description
                      </p>
                      <p className="text-sm text-neutral-700 dark:text-neutral-300">
                        {description}
                      </p>
                    </>
                  )}

                  {hasTechnologies && (
                    <div className="mt-4">
                      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                        Skills &amp; Technologies
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {technologies!.map((tech, index) => (
                          <span
                            key={index}
                            className="rounded-full bg-neutral-100 px-3 py-1 text-xs text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {hasAchievements && (
                  <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-neutral-500">
                      Key Achievements
                    </p>
                    <ul className="space-y-2">
                      {achievements!.map((achievement, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-xs font-medium text-neutral-700 dark:bg-neutral-700 dark:text-neutral-200">
                            {index + 1}
                          </span>
                          <span className="text-sm text-neutral-700 dark:text-neutral-300">
                            {achievement}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
    </div>
  );
};

// Main Experience section component
const ExperienceSection: React.FC = () => (
  <div className="pt-10" id="experience">
    <section className="p-6 md:p-8 max-w-5xl mx-auto transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-2">EXPERIENCE</h1>
      <p className="text-neutral-600 dark:text-neutral-400 mb-6">
        My professional journey and key accomplishments
      </p>
      <ScrollStack>
        {experienceData.map((item, index) => (
          <ScrollStackItem key={index}>
            <ExperienceCard {...item} />
          </ScrollStackItem>
        ))}
      </ScrollStack>
    </section>
  </div>
);

export default ExperienceSection;
