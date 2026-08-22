import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { settings } from "@/config/settings";
import {
  FiMapPin,
  FiCalendar,
  FiAward,
  FiCode,
  FiUsers,
  FiTrendingUp,
  FiHeart,
  FiArrowRight,
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
      color: "text-slate-700 dark:text-gray-300",
    },
    {
      icon: <FiMapPin size={16} />,
      label: "Location",
      value: "Noida, India",
      color: "text-slate-700 dark:text-gray-300",
    },
    {
      icon: <FiAward size={16} />,
      label: "Competitions",
      value: "5+ Won",
      color: "text-slate-700 dark:text-gray-300",
    },
  ];
  return (
    <div className="pt-10" id="about">
      <div className="p-6 md:p-8 max-w-5xl mx-auto">
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
                className="flex items-center gap-3 p-4 rounded-xl border border-neutral-200/60 dark:border-neutral-800/60 hover:bg-gray-100 dark:hover:bg-white/10 hover:shadow-md transition-all duration-300"
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
            <span className="mt-1.5 shrink-0 text-slate-500 dark:text-gray-400">
              <FiCode size={16} />
            </span>
            <span>
              I'm a Software Engineer at Cognizant with over {experience} of
              experience, having contributed to a leading U.S. airline client on
              projects using Java, Spring Boot, TypeScript, Playwright,
              Selenium, and more. I graduated from Shri Ramswaroop Memorial
              College (AKTU) and also hold a diploma from Hewett Polytechnic.
              Through personal projects, I've explored React, Tailwind, Axios,
              and Spring Security.
            </span>
          </p>
          <p className="flex gap-3">
            <span className="mt-1.5 shrink-0 text-slate-500 dark:text-gray-400">
              <FiUsers size={16} />
            </span>
            <span>
              I enjoy collaborating in agile teams, solving real-world problems,
              and always learning something new.
            </span>
          </p>
          <p className="flex gap-3">
            <span className="mt-1.5 shrink-0 text-slate-500 dark:text-gray-400">
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
            <span className="mt-1.5 shrink-0 text-slate-500 dark:text-gray-400">
              <FiHeart size={16} />
            </span>
            <span>
              I'm always open to new opportunities that challenge me and help me
              grow.
            </span>
          </p>
        </motion.div>

        <div className="text-center mt-8">
          <Button variant="link" asChild className="hover:text-emerald-600">
            <Link to="/about" className="gap-2">
              More about me
              <FiArrowRight size={14} />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
