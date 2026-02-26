import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { useMemo } from "react";
import { settings } from "@/config/settings";
import { FiMapPin, FiMail, FiCalendar, FiAward } from "react-icons/fi";
import { getExperienceString } from "@/config/data";

export default function AboutMe() {
  // Calculate experience dynamically
  const experience = useMemo(() => getExperienceString(), []);

  // Quick stats for visual appeal
  const quickStats = [
    { icon: <FiCalendar size={16} />, label: "Experience", value: experience },
    {
      icon: <FiMapPin size={16} />,
      label: "Location",
      value: "Noida, India",
    },
    { icon: <FiAward size={16} />, label: "Competitions", value: "5+ Won" },
  ];
  return (
    <div className="pt-10 mb-10" id="about">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">ABOUT ME</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Get to know me better - my journey, achievements, and passion for
          technology
        </p>

        {/* Quick Stats */}
        {settings.about.showStats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {quickStats.map((stat, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-700 transition-colors duration-300"
              >
                <div className="text-emerald-600 dark:text-emerald-400">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </p>
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {stat.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <HeroHighlight className="max-w-3xl mx-auto p-6 text-justify text-gray-800 dark:text-gray-200 leading-loose">
          <p className="mb-4">
            I'm a <Highlight>Software Developer at Cognizant</Highlight> with
            over <Highlight>{experience} of experience</Highlight>, having
            contributed to <Highlight>American Airlines</Highlight> projects
            using Java, Spring Boot, TypeScript, Playwright, Selenium, and more.
            I graduated from{" "}
            <Highlight>Shri Ramswaroop Memorial College</Highlight> (AKTU) and
            also hold a diploma from <Highlight>Hewett Polytechnic</Highlight>.
            Through personal projects, I’ve explored React, Tailwind, Axios, and
            Spring Security.
          </p>
          <p className="mb-4">
            I enjoy <Highlight>collaborating in agile teams</Highlight>, solving
            real-world problems, and always learning something new.
          </p>
          <p className="mb-4">
            My journey so far includes reaching the{" "}
            <Highlight>
              Grand Finale of the Smart India Hackathon 2022
            </Highlight>
            , winning{" "}
            <Highlight>
              India’s Biggest Entrepreneurship Conclave 2022
            </Highlight>
            , securing{" "}
            <Highlight>1st prize at Start UP Conclave 2k22</Highlight> and{" "}
            <Highlight>SRMU’s Awasar</Highlight>, and participating in the{" "}
            <Highlight>G20 platform</Highlight>.
          </p>
          <p>
            I'm always open to new opportunities that challenge me and help me
            grow.
          </p>
        </HeroHighlight>
      </div>
    </div>
  );
}
