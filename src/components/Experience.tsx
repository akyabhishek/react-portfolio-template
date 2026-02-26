// Timeline.tsx
import React from "react";
import { TextAnimate } from "./magicui/text-animate";
import { GlowingEffect } from "./ui/glowing-effect";
import { settings } from "@/config/settings";
import { experienceData, calculateDuration } from "@/config/data";

// Define the type for each timeline entry
interface TimelineItemProps {
  title: string;
  company: string;
  description: string;
  from: string;
  to: string;
  logoPath?: string;
  technologies?: string[];
  achievements?: string[];
}

// Timeline item component
const TimelineItem: React.FC<TimelineItemProps> = ({
  title,
  company,
  description,
  from,
  to,
  logoPath,
  technologies,
  achievements,
}) => (
  <div className="relative w-full group">
    <div className="absolute -left-[1.95rem] top-10 transition-none">
      <span className="relative flex h-3 w-3">
        <span className="absolute inline-flex h-3 w-3 animate-ping rounded-2xl bg-gray-400 opacity-75 group-hover:bg-emerald-400"></span>
        <span className="relative inline-flex h-3 w-3 rounded-2xl bg-emerald-500 group-hover:bg-emerald-400 transition-colors duration-300"></span>
      </span>
    </div>
    <div className="relative h-full rounded-2xl border p-2 md:rounded-2xl md:p-3 group-hover:border-emerald-200 dark:group-hover:border-emerald-700 transition-colors duration-300">
      {settings.experience.showGlowingEffect && (
        <GlowingEffect
          spread={20}
          glow={true}
          disabled={false}
          proximity={50}
          inactiveZone={0.01}
        />
      )}
      <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6  transition-shadow duration-300">
        <div className="relative flex flex-1 flex-col justify-between gap-3">
          <div>
            <div className="flex items-center justify-between">
              <p className="text-xl text-gray-700 dark:text-gray-400 mb-1">
                {company}
              </p>
              {settings.experience.showCompanyLogos && logoPath && (
                <img
                  src={logoPath}
                  alt={`${company} logo`}
                  className="h-8 w-8 rounded object-contain"
                />
              )}
            </div>
            <h4 className="font-bold text-emerald-600">
              {settings.experience.showAnimations ? (
                <TextAnimate animation="blurInUp" by="character" once>
                  {title}
                </TextAnimate>
              ) : (
                title
              )}
            </h4>
            <p className="mt-1 max-w-screen-sm text-sm text-gray-500">
              {description}
            </p>
            <span className="mt-1 block text-sm text-gray-400">
              {from} — {to} · {calculateDuration(from, to)}
            </span>

            {/* Technologies used */}
            {technologies && technologies.length > 0 && (
              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-1">Technologies:</p>
                <div className="flex flex-wrap gap-1">
                  {technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 border border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 text-xs rounded-2xl transition-colors duration-200 hover:bg-emerald-100 dark:hover:bg-emerald-900/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Key achievements */}
            {achievements && achievements.length > 0 && (
              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-1">Key Achievements:</p>
                <ul className="text-xs text-gray-600 dark:text-gray-400">
                  {achievements.map((achievement, index) => (
                    <li key={index} className="flex items-center gap-1">
                      <span className="text-emerald-500">•</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Main Timeline component
const ExperienceSection: React.FC = () => (
  <div className="pt-5" id="experience">
    <h1 className="text-3xl font-bold mb-2">EXPERIENCE</h1>
    <p className="text-gray-600 dark:text-gray-400 mb-6">
      My professional journey and key accomplishments
    </p>
    <section className="p-3 md:p-6 bg-gradient-to-b max-w-4xl mx-auto transition-colors duration-300">
      <div className="space-y-6 border-l-2 border-dotted border-gray-300 dark:border-gray-600 pl-6 py-3 rounded-2xl">
        {experienceData.map((item, index) => (
          <TimelineItem key={index} {...item} />
        ))}
      </div>
    </section>
  </div>
);

export default ExperienceSection;
