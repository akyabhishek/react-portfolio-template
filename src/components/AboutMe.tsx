import { useMemo } from "react";
import { settings } from "@/config/settings";
import {
  FiMapPin,
  FiCalendar,
  FiAward,
  FiCode,
  FiUsers,
  FiTrendingUp,
  FiHeart,
} from "react-icons/fi";
import { getExperienceString } from "@/config/data";
import { motion } from "motion/react";

export default function AboutMe() {
  // Calculate experience dynamically
  const experience = useMemo(() => getExperienceString(), []);

  // Quick stats for visual appeal
  const quickStats = [
    {
      icon: <FiCalendar size={16} />,
      label: "Experience",
      value: experience,
      color: "text-blue-500",
    },
    {
      icon: <FiMapPin size={16} />,
      label: "Location",
      value: "Noida, India",
      color: "text-emerald-500",
    },
    {
      icon: <FiAward size={16} />,
      label: "Competitions",
      value: "5+ Won",
      color: "text-orange-500",
    },
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
                <div className={stat.color}>{stat.icon}</div>
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

        <div className="relative my-6 flex items-center max-w-3xl mx-auto">
          <div className="flex-grow border-t border-gray-200 dark:border-gray-700" />
          <span className="mx-3 text-xs text-muted-foreground tracking-widest uppercase select-none">
            my story
          </span>
          <div className="flex-grow border-t border-gray-200 dark:border-gray-700" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-3xl mx-auto px-6 pb-6 text-gray-800 dark:text-gray-200 leading-loose space-y-5"
        >
          <p className="flex gap-3">
            <span className="mt-1.5 shrink-0 text-emerald-500">
              <FiCode size={16} />
            </span>
            <span>
              I'm a Software Developer at Cognizant with over {experience} of
              experience, having contributed to American Airlines projects using
              Java, Spring Boot, TypeScript, Playwright, Selenium, and more. I
              graduated from Shri Ramswaroop Memorial College (AKTU) and also
              hold a diploma from Hewett Polytechnic. Through personal projects,
              I've explored React, Tailwind, Axios, and Spring Security.
            </span>
          </p>
          <p className="flex gap-3">
            <span className="mt-1.5 shrink-0 text-blue-500">
              <FiUsers size={16} />
            </span>
            <span>
              I enjoy collaborating in agile teams, solving real-world problems,
              and always learning something new.
            </span>
          </p>
          <p className="flex gap-3">
            <span className="mt-1.5 shrink-0 text-orange-500">
              <FiTrendingUp size={16} />
            </span>
            <span>
              My journey so far includes reaching the Grand Finale of the Smart
              India Hackathon 2022, winning India's Biggest Entrepreneurship
              Conclave 2022, securing 1st prize at Start UP Conclave 2k22 and
              SRMU's Awasar, and participating in the G20 platform.
            </span>
          </p>
          <p className="flex gap-3">
            <span className="mt-1.5 shrink-0 text-pink-500">
              <FiHeart size={16} />
            </span>
            <span>
              I'm always open to new opportunities that challenge me and help me
              grow.
            </span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
