import { FlipWords } from "@/components/ui/flip-words";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Badge } from "@/components/ui/badge";
import { FiBriefcase, FiUsers, FiCode, FiAward } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import FloatingImage from "@/components/MyImage";
import mainImage from "../../public/assets/abhishekkumaryadav-ghibli.png";
import altMainImage from "../../public/assets/abhishekkumaryadav-new.jpg";
import { settings } from "@/config/settings";

export default function HeroSection(): JSX.Element {
  const [animatedStats, setAnimatedStats] = useState({
    experience: 0,
    followers: 0,
    tools: 0,
    leetcode: 0,
  });
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for interactive spotlight
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    el.addEventListener("mousemove", handleMouseMove);
    return () => el.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Trigger stats animation when scrolled into view
  useEffect(() => {
    const animateValue = (
      start: number,
      end: number,
      duration: number,
      setter: (value: number) => void,
    ) => {
      const startTime = Date.now();
      const animate = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        setter(Math.floor(start + (end - start) * progress));
        if (progress < 1) requestAnimationFrame(animate);
      };
      animate();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isStatsVisible) {
          setIsStatsVisible(true);
          animateValue(0, 2, 1500, (val) =>
            setAnimatedStats((prev) => ({ ...prev, experience: val })),
          );
          animateValue(0, 7000, 2000, (val) =>
            setAnimatedStats((prev) => ({ ...prev, followers: val })),
          );
          animateValue(0, 30, 1200, (val) =>
            setAnimatedStats((prev) => ({ ...prev, tools: val })),
          );
          animateValue(0, 200, 1800, (val) =>
            setAnimatedStats((prev) => ({ ...prev, leetcode: val })),
          );
        }
      },
      { threshold: 0.3 },
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [isStatsVisible]);

  const stats = [
    {
      value: animatedStats.experience,
      suffix: "+",
      label: "Years Experience",
      icon: <FiBriefcase size={20} />,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      hoverBorder: "hover:border-blue-500/40 hover:shadow-blue-500/10",
      href: "#experience",
    },
    {
      value: animatedStats.tools,
      suffix: "+",
      label: "Certifications",
      icon: <FiAward size={20} />,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
      hoverBorder: "hover:border-emerald-500/40 hover:shadow-emerald-500/10",
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
      hoverBorder: "hover:border-orange-500/40 hover:shadow-orange-500/10",
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
      hoverBorder: "hover:border-purple-500/40 hover:shadow-purple-500/10",
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

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <>
      <div
        ref={heroRef}
        className="min-h-screen h-auto flex flex-col lg:flex-row justify-center items-center px-5 md:px-40 lg:space-x-2 mt-10 relative overflow-hidden"
      >
        {/* Dot grid background */}
        <div
          className="absolute inset-0 -z-10 opacity-40 dark:opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle, #888 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        {/* Mouse spotlight */}
        <div
          className="absolute inset-0 -z-10 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(16,185,129,0.08), transparent 60%)`,
          }}
        />

        {/* Image - Order first on mobile, second on lg */}
        <div className="lg:w-1/2 p-10 flex justify-center order-first lg:order-last mb-4 lg:mb-0">
          <FloatingImage mainImage={mainImage} altImage={altMainImage} />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="text-2xl mx-auto font-normal text-neutral-600 dark:text-neutral-400 lg:w-1/2 lg:pl-3 order-last lg:order-first"
        >
          {/* Status Badge */}
          <motion.div variants={fadeUp}>
            {settings.showAvailableForOpportunities && (
              <div className="mb-4">
                <Badge className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100 py-1 hover:bg-emerald-200 dark:hover:bg-emerald-800">
                  🟢 Available for opportunities
                </Badge>
              </div>
            )}
          </motion.div>

          <motion.div variants={fadeUp}>
            <FlipWords words={greetings} duration={3000} />
            <br />
            <TextGenerateEffect
              words={"Welcome to my over-engineered portfolio site."}
              className="text-base"
            />
          </motion.div>

          {/* Java Builder Pattern */}
          <motion.div variants={fadeUp}>
            <code className="text-xs font-mono mt-3 inline-block">
              <span className="text-blue-600 dark:text-blue-400">
                Developer
              </span>
              <span className="text-gray-500">.</span>
              <span className="text-amber-600 dark:text-amber-400">
                builder
              </span>
              <span className="text-gray-500">().</span>
              <span className="text-amber-600 dark:text-amber-400">name</span>
              <span className="text-gray-500">(</span>
              <span className="text-emerald-600 dark:text-emerald-400">
                "Abhishek"
              </span>
              <span className="text-gray-500">).</span>
              <span className="text-amber-600 dark:text-amber-400">stack</span>
              <span className="text-gray-500">(</span>
              <span className="text-emerald-600 dark:text-emerald-400">
                "Java"
              </span>
              <span className="text-gray-500">, </span>
              <span className="text-emerald-600 dark:text-emerald-400">
                "Spring Boot"
              </span>
              <span className="text-gray-500">).</span>
              <span className="text-amber-600 dark:text-amber-400">build</span>
              <span className="text-gray-500">();</span>
            </code>
          </motion.div>

          {/* Interactive Stats */}
          <motion.div variants={fadeUp}>
            <div
              ref={statsRef}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 text-center"
            >
              {stats.map((stat, index) => (
                <a
                  key={index}
                  href={stat.href}
                  target={stat.external ? "_blank" : "_self"}
                  rel={stat.external ? "noopener noreferrer" : undefined}
                  className={`${stat.bgColor} ${stat.hoverBorder} p-4 rounded-2xl cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg group border border-transparent block no-underline`}
                >
                  <div
                    className={`${stat.color} mb-2 group-hover:scale-110 transition-transform duration-300 flex justify-center`}
                  >
                    {stat.icon}
                  </div>
                  <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                    {isStatsVisible ? stat.value.toLocaleString() : "—"}
                    {isStatsVisible && stat.suffix}
                  </div>
                  <div className="text-xs text-muted-foreground group-hover:text-opacity-80 transition-all duration-300">
                    {stat.label}
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
          <div></div>
        </motion.div>
      </div>
    </>
  );
}
