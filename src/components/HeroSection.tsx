import { FlipWords } from "@/components/ui/flip-words";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
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
          animateValue(0, 7500, 2000, (val) =>
            setAnimatedStats((prev) => ({ ...prev, followers: val })),
          );
          animateValue(0, 30, 1200, (val) =>
            setAnimatedStats((prev) => ({ ...prev, tools: val })),
          );
          animateValue(0, 250, 1800, (val) =>
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
      icon: <FiBriefcase size={18} />,
      href: "#experience",
    },
    {
      value: animatedStats.tools,
      suffix: "+",
      label: "Certifications",
      icon: <FiAward size={18} />,
      href: "https://linkedin.com/in/abhishekkumaryadav/details/certifications",
      external: true,
    },
    {
      value: animatedStats.leetcode,
      suffix: "+",
      label: "DSA Problems Solved",
      icon: <FiCode size={18} />,
      href: "https://leetcode.com/mrabk121",
      external: true,
    },
    {
      value: animatedStats.followers,
      suffix: "+",
      label: "LinkedIn Connections",
      icon: <FiUsers size={18} />,
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
    hidden: { opacity: 0, y: 24, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen flex flex-col lg:flex-row justify-center items-center px-6 md:px-20 lg:px-32 xl:px-40 pt-24 pb-16 overflow-hidden bg-gray-50 dark:bg-black"
    >
      {/* Engineering grid background */}
      <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.02] bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Radial glow gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,_rgba(204,255,0,0.06),_transparent_50%)] dark:bg-[radial-gradient(ellipse_at_30%_20%,_rgba(204,255,0,0.08),_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,_rgba(16,185,129,0.06),_transparent_50%)] dark:bg-[radial-gradient(ellipse_at_70%_80%,_rgba(16,185,129,0.08),_transparent_50%)]" />

      {/* Mouse-follow spotlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(204,255,0,0.04), transparent 60%)`,
        }}
      />

      {/* Floating orbs */}
      <motion.div
        className="absolute top-1/4 left-[10%] w-64 h-64 bg-lime-400/10 dark:bg-lime-400/5 rounded-full blur-3xl pointer-events-none"
        animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-[10%] w-80 h-80 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"
        animate={{ x: [0, -35, 0], y: [0, 40, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Image - Order first on mobile, second on lg */}
      <div className="relative lg:w-1/2 p-6 flex justify-center order-first lg:order-last mb-6 lg:mb-0">
        <FloatingImage mainImage={mainImage} altImage={altMainImage} />
      </div>

      {/* Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
        className="relative z-10 lg:w-1/2 lg:pl-3 order-last lg:order-first"
      >
        {/* Status Badge */}
        <motion.div variants={fadeUp}>
          {settings.showAvailableForOpportunities && (
            <div className="mb-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-[11px] font-medium tracking-wide uppercase backdrop-blur-sm">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
                </span>
                Available for opportunities
              </span>
            </div>
          )}
        </motion.div>

        {/* Greeting + Tagline */}
        <motion.div variants={fadeUp} className="mb-2">
          <span className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-[#ebebeb]">
            <FlipWords words={greetings} duration={3000} />
          </span>
          <div className="mt-3">
            <TextGenerateEffect
              words={"Welcome to my over-engineered portfolio site."}
              className="text-base md:text-lg font-light text-black/60 dark:text-[#ebebeb99] tracking-wide"
            />
          </div>
        </motion.div>

        {/* Java Builder Pattern — glass terminal block */}
        <motion.div variants={fadeUp} className="mt-5">
          <div className="inline-block px-3.5 py-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_4px_16px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.5)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.05)]">
            <code className="text-[10px] font-mono">
              <span className="text-lime-700 dark:text-[#ccff00]">
                Developer
              </span>
              <span className="text-black/40 dark:text-white/40">.</span>
              <span className="text-emerald-700 dark:text-emerald-400">
                builder
              </span>
              <span className="text-black/40 dark:text-white/40">().</span>
              <span className="text-emerald-700 dark:text-emerald-400">
                name
              </span>
              <span className="text-black/40 dark:text-white/40">(</span>
              <span className="text-orange-700 dark:text-orange-300">
                "Abhishek"
              </span>
              <span className="text-black/40 dark:text-white/40">).</span>
              <span className="text-emerald-700 dark:text-emerald-400">
                stack
              </span>
              <span className="text-black/40 dark:text-white/40">(</span>
              <span className="text-lime-700 dark:text-[#ccff00]">List</span>
              <span className="text-black/40 dark:text-white/40">.</span>
              <span className="text-emerald-700 dark:text-emerald-400">of</span>
              <span className="text-black/40 dark:text-white/40">(</span>
              <span className="text-orange-700 dark:text-orange-300">
                "Java"
              </span>
              <span className="text-black/40 dark:text-white/40">, </span>
              <span className="text-orange-700 dark:text-orange-300">
                "Spring Boot"
              </span>
              <span className="text-black/40 dark:text-white/40">)).</span>
              <span className="text-emerald-700 dark:text-emerald-400">
                build
              </span>
              <span className="text-black/40 dark:text-white/40">();</span>
            </code>
          </div>
        </motion.div>

        {/* Stats — glass cards */}
        <motion.div variants={fadeUp}>
          <div
            ref={statsRef}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-10 text-center"
          >
            {stats.map((stat, index) => (
              <a
                key={index}
                href={stat.href}
                target={stat.external ? "_blank" : "_self"}
                rel={stat.external ? "noopener noreferrer" : undefined}
                className="group relative p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] hover:border-black/15 dark:hover:border-white/15 transition-all duration-300 hover:-translate-y-1 shadow-[0_4px_16px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_32px_rgba(0,0,0,0.2)] block no-underline"
              >
                <div className="text-black/40 dark:text-[#ebebeb4d] mb-2 group-hover:text-lime-700 dark:group-hover:text-[#ccff00] transition-colors duration-300 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-xl font-semibold text-gray-900 dark:text-[#ebebeb] font-mono tracking-tight">
                  {isStatsVisible ? stat.value.toLocaleString() : "—"}
                  {isStatsVisible && (
                    <span className="text-lime-700 dark:text-[#ccff00]">
                      {stat.suffix}
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-black/40 dark:text-[#ebebeb4d] font-mono tracking-wider uppercase mt-1 group-hover:text-black/60 dark:group-hover:text-[#ebebeb99] transition-colors duration-300">
                  {stat.label}
                </div>
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
