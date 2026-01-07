import { FlipWords } from "@/components/ui/flip-words";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FiDownload,
  FiMail,
  FiGithub,
  FiLinkedin,
  FiChevronDown,
  FiBriefcase,
  FiUsers,
  FiTool,
  FiCode,
  FiAward,
} from "react-icons/fi";
import { useState, useEffect } from "react";
import FloatingImage from "@/components/MyImage";
import mainImage from "../../public/assets/abhishekkumaryadav-ghibli.png";
import altMainImage from "../../public/assets/abhishekkumaryadav-new.jpg";
import ResumeButton from "./DownloadResumeBtn";
import { settings } from "@/config/settings";

export default function HeroSection(): JSX.Element {
  const [animatedStats, setAnimatedStats] = useState({
    experience: 0,
    followers: 0,
    tools: 0,
    leetcode: 0,
  });
  const [isStatsVisible, setIsStatsVisible] = useState(false);

  // Animate numbers when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsStatsVisible(true);
      // Animate to target values
      const animateValue = (
        start: number,
        end: number,
        duration: number,
        setter: (value: number) => void
      ) => {
        const startTime = Date.now();
        const animate = () => {
          const now = Date.now();
          const progress = Math.min((now - startTime) / duration, 1);
          const current = Math.floor(start + (end - start) * progress);
          setter(current);
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        animate();
      };

      animateValue(0, 2, 1500, (val) =>
        setAnimatedStats((prev) => ({ ...prev, experience: val }))
      );
      animateValue(0, 7000, 2000, (val) =>
        setAnimatedStats((prev) => ({ ...prev, followers: val }))
      );
      animateValue(0, 30, 1200, (val) =>
        setAnimatedStats((prev) => ({ ...prev, tools: val }))
      );
      animateValue(0, 200, 1800, (val) =>
        setAnimatedStats((prev) => ({ ...prev, leetcode: val }))
      );
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const stats = [
    {
      value: animatedStats.experience,
      suffix: "+",
      label: "Years Experience",
      icon: <FiBriefcase size={20} />,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      href: "#experience",
    },
    {
      value: animatedStats.tools,
      suffix: "+",
      label: "Certifications",
      icon: <FiAward size={20} />,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
      href: "https://linkedin.com/in/abhishekkumaryadav/details/certifications",
      external: true,
    },

    {
      value: animatedStats.leetcode,
      suffix: "+",
      label: "DSA Problems Solved",
      icon: <FiCode size={20} />,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-900/20",
      href: "https://leetcode.com/mrabk121",
      external: true,
    },
    {
      value: animatedStats.followers,
      suffix: "+",
      label: "LinkedIn Connections",
      icon: <FiUsers size={20} />,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      href: "https://linkedin.com/in/abhishekkumaryadav",
      external: true,
    },
  ];

  const greetings: string[] = [
    "Hi,",
    "Hello,",
    "Namaste,",
    "Sat Sri Akal,",
    "Namaskar,",
    "Ram Ram,",
    "Kem Cho,",
    "Vaṇakkam,",
    "Namaskara,",
    "Vandanam,",
    "Pranam,",
    "Khurumjari,",
    "Salaam,",
    "Jai Shri Krishna,",
    "Khamma Ghani,",
    "Radhe Radhe,",
    "Ram Ram,",
    "Nômoshkar,",
    "Salaam Alaikum,",
    "Julley,",
    "Dhaal Karu,",
    "Namaskāra,",
    "Narmada Har,",
  ];

  return (
    <>
      <div className="min-h-screen h-auto flex flex-col lg:flex-row justify-center items-center px-5 md:px-40 lg:space-x-2 mt-10 relative">
        {/* Image - Order first on mobile, second on lg */}
        <div className="lg:w-1/2 p-10 flex justify-center order-first lg:order-last mb-4 lg:mb-0">
          <FloatingImage mainImage={mainImage} altImage={altMainImage} />
        </div>

        <div className="text-2xl mx-auto font-normal text-neutral-600 dark:text-neutral-400 lg:w-1/2 lg:pl-3 order-last lg:order-first">
          {/* Status Badge */}
          {settings.showAvailableForOpportunities && (
            <div className="mb-4">
              <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100 py-1 hover:bg-emerald-200 dark:hover:bg-emerald-800">
                🟢 Available for opportunities
              </Badge>
            </div>
          )}

          <FlipWords words={greetings} duration={3000} />
          <br />
          <span className="text-base">I am Abhishek. I am a </span>
          <FlipWords
            words={["<Developer/>", "Learner", "<Coder/>", "Programmer"]}
            duration={15000}
            className="dark:text-emerald-500 text-emerald-600 text-base"
          />
          <TextGenerateEffect
            words={"Welcome to my over-engineered portfolio site."}
            className="text-base"
          />

          {/* Call-to-Action Buttons */}
          <div className="flex flex-wrap gap-2 mt-8">
            <ResumeButton />
            <Button
              variant="link"
              className="flex items-center gap-2 rounded-2xl"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <FiMail size={16} />
              Get In Touch
            </Button>
          </div>

          {/* Interactive Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 text-center">
            {stats.map((stat, index) => (
              <a
                key={index}
                href={stat.href}
                target={stat.external ? "_blank" : "_self"}
                rel={stat.external ? "noopener noreferrer" : undefined}
                className={`${stat.bgColor} p-4 rounded-2xl cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-md group border border-transparent hover:border-opacity-20 block no-underline`}
              >
                <div
                  className={`${stat.color} mb-2 group-hover:scale-110 transition-transform duration-300 flex justify-center`}
                >
                  {stat.icon}
                </div>
                <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                  {isStatsVisible ? stat.value.toLocaleString() : 0}
                  {stat.suffix}
                </div>
                <div className="text-xs text-muted-foreground group-hover:text-opacity-80 transition-all duration-300">
                  {stat.label}
                </div>
              </a>
            ))}
          </div>
          <div></div>
        </div>
      </div>
    </>
  );
}
