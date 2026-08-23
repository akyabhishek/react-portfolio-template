import { FlipWords } from "@/components/ui/flip-words";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { FiBriefcase, FiUsers, FiCode, FiAward } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import FloatingImage from "@/components/MyImage";
import mainImage from "../../public/assets/abhishek-cutout.png";
import { settings } from "@/config/settings";

export default function HeroSection(): JSX.Element {
  const [animatedStats, setAnimatedStats] = useState({
    experience: 0,
    followers: 0,
    tools: 0,
    leetcode: 0,
  });
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const isStatsVisibleRef = useRef(false);
  const prefersReducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  // Mouse tracking — writes directly to DOM to avoid React re-renders
  useEffect(() => {
    if (prefersReducedMotion) return;
    const el = heroRef.current;
    const spot = spotlightRef.current;
    if (!el || !spot) return;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      spot.style.background = `radial-gradient(600px circle at ${e.clientX - rect.left}px ${e.clientY - rect.top}px, rgba(204,255,0,0.04), transparent 60%)`;
    };
    el.addEventListener("mousemove", handleMouseMove);
    return () => el.removeEventListener("mousemove", handleMouseMove);
  }, [prefersReducedMotion]);

  // Trigger stats animation when scrolled into view — single RAF loop
  useEffect(() => {
    const targets = [
      { key: "experience" as const, end: 3, duration: 1500 },
      { key: "followers" as const, end: 8000, duration: 2000 },
      { key: "tools" as const, end: 40, duration: 1200 },
      { key: "leetcode" as const, end: 300, duration: 1800 },
    ];

    let rafId: number;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isStatsVisibleRef.current) {
          isStatsVisibleRef.current = true;
          setIsStatsVisible(true);
          const startTime = Date.now();
          const tick = () => {
            const elapsed = Date.now() - startTime;
            let anyRunning = false;
            const next = { experience: 0, followers: 0, tools: 0, leetcode: 0 };
            for (const t of targets) {
              const progress = Math.min(elapsed / t.duration, 1);
              next[t.key] = Math.floor(t.end * progress);
              if (progress < 1) anyRunning = true;
            }
            setAnimatedStats(next);
            if (anyRunning) rafId = requestAnimationFrame(tick);
          };
          rafId = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 },
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, []);

  const stats = [
    {
      value: animatedStats.experience,
      suffix: "+",
      label: "Years of Corporate Experience",
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

  const fadeUp = prefersReducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
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
      className="relative min-h-screen lg:h-screen flex flex-col lg:flex-row items-stretch px-4 sm:px-6 md:px-20 lg:px-32 xl:px-40 pb-0 overflow-hidden bg-gray-50 dark:bg-black"
    >
      {/* Engineering grid background */}
      <div className="absolute inset-0 opacity-[0.04] dark:opacity-[0.02] bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Radial glow gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,_rgba(204,255,0,0.06),_transparent_50%)] dark:bg-[radial-gradient(ellipse_at_30%_20%,_rgba(204,255,0,0.08),_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_80%,_rgba(16,185,129,0.06),_transparent_50%)] dark:bg-[radial-gradient(ellipse_at_70%_80%,_rgba(16,185,129,0.08),_transparent_50%)]" />

      {/* Mouse-follow spotlight */}
      <div
        ref={spotlightRef}
        className="absolute inset-0 pointer-events-none"
      />

      {/* Floating orbs */}
      <motion.div
        className="absolute top-1/4 left-[10%] w-64 h-64 bg-lime-400/10 dark:bg-lime-400/5 rounded-full blur-3xl pointer-events-none will-change-transform"
        animate={prefersReducedMotion ? {} : { x: [0, 40, 0], y: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-[10%] w-80 h-80 bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl pointer-events-none will-change-transform"
        animate={prefersReducedMotion ? {} : { x: [0, -35, 0], y: [0, 40, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Image */}
      <div className="relative lg:w-1/2 flex justify-center items-end order-last lg:order-last pt-0 lg:pt-0">
        <FloatingImage mainImage={mainImage} />
      </div>

      {/* Content */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
        className="relative z-10 lg:w-1/2 lg:pl-3 order-first lg:order-first flex flex-col justify-center pt-20 lg:pt-0 pb-4 lg:pb-0"
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
          <h2 className="text-2xl sm:text-3xl md:text-4xl tracking-tight text-gray-900 dark:text-[#ebebeb] greeetings-text">
            <FlipWords words={greetings} duration={3000} />
          </h2>
          <div className="mt-3">
            <TextGenerateEffect
              words={"Welcome to my over-engineered portfolio site."}
              className="text-sm md:text-base font-light text-black/60 dark:text-[#ebebeb99] tracking-wide"
            />
          </div>
        </motion.div>

        {/* Java Builder Pattern — glass terminal block */}
        <motion.div variants={fadeUp} className="mt-5">
          <div className="inline-block px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] shadow-[0_4px_16px_rgba(0,0,0,0.04),inset_0_1px_0_rgba(255,255,255,0.5)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.05)] max-w-full overflow-x-auto">
            <code className="text-[10px] font-mono">
              <span className="text-lime-700 dark:text-[#ccff00] ">
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
            className="grid grid-cols-2 gap-2 sm:gap-3 mt-6 sm:mt-10 md:grid-cols-4 text-center"
          >
            {stats.map((stat, index) => (
              <a
                key={index}
                href={stat.href}
                target={stat.external ? "_blank" : "_self"}
                rel={stat.external ? "noopener noreferrer" : undefined}
                className="group relative p-3 sm:p-4 rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] backdrop-blur-md border border-black/[0.08] dark:border-white/[0.08] hover:border-black/15 dark:hover:border-white/15 transition-all duration-300 hover:-translate-y-1 shadow-[0_4px_16px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:hover:shadow-[0_8px_32px_rgba(0,0,0,0.2)] block no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-black"
              >
                <div className="text-black/40 dark:text-[#ebebeb4d] mb-2 group-hover:text-lime-700 dark:group-hover:text-[#ccff00] transition-colors duration-300 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-[#ebebeb] tracking-tight">
                  {isStatsVisible ? stat.value.toLocaleString() : "—"}
                  {isStatsVisible && (
                    <span className="text-lime-700 dark:text-[#ccff00]">
                      {stat.suffix}
                    </span>
                  )}
                </div>
                <div className="text-[10px] text-black/40 dark:text-[#ebebeb4d]  tracking-wider uppercase mt-1 group-hover:text-black/60 dark:group-hover:text-[#ebebeb99] transition-colors duration-300">
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
