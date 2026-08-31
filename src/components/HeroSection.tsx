import { FlipWords } from "@/components/ui/flip-words";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { FiBriefcase, FiUsers, FiCode, FiAward } from "react-icons/fi";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useTheme } from "@/components/theme-provider";
import FloatingImage from "@/components/MyImage";
import mainImage from "../../public/assets/abhishek-cutout.png";
import { settings } from "@/config/settings";
import {
  heroStatsData,
  type HeroStatIcon,
  type HeroStatKey,
} from "@/config/data";
import ThreeTubesBackground from "@/components/ThreeTubesBackground";
import AetherFlowBackground from "@/components/AetherFlowBackground";

const initialAnimatedStats: Record<HeroStatKey, number> = {
  experience: 0,
  followers: 0,
  tools: 0,
  leetcode: 0,
};

const statIcons: Record<HeroStatIcon, JSX.Element> = {
  briefcase: <FiBriefcase size={18} />,
  users: <FiUsers size={18} />,
  code: <FiCode size={18} />,
  award: <FiAward size={18} />,
};

export default function HeroSection(): JSX.Element {
  const [animatedStats, setAnimatedStats] = useState(initialAnimatedStats);
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const isStatsVisibleRef = useRef(false);
  const prefersReducedMotion = useReducedMotion();
  const statsRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const bgType = settings.hero.backgroundType;
  const isDark =
    theme === "dark" ||
    (theme === "system" && document.documentElement.classList.contains("dark"));
  const resolvedBgType = isDark ? "tubes" : bgType;
  const bgEnabled = resolvedBgType !== "none" && !prefersReducedMotion;

  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    if (prefersReducedMotion) return;
    let rafId: number;
    const onScroll = () => {
      rafId = requestAnimationFrame(() => setScrollY(window.scrollY));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [prefersReducedMotion]);

  // Trigger stats animation when scrolled into view — single RAF loop
  useEffect(() => {
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
            const next = { ...initialAnimatedStats };
            for (const stat of heroStatsData) {
              const progress = Math.min(elapsed / stat.duration, 1);
              next[stat.key] = Math.floor(stat.end * progress);
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
  const greetings: string[] = [
    // Universal
    "Hey,", // English
    "Hello,", // English
    "Hi,", // English

    // India
    "नमस्ते,", // Hindi
    "नमस्कार,", // Marathi
    "ਸਤ ਸ੍ਰੀ ਅਕਾਲ,", // Punjabi
    "নমস্কার,", // Bengali
    "નમસ્તે,", // Gujarati
    "வணக்கம்,", // Tamil
    "ನಮಸ್ಕಾರ,", // Kannada
    "നമസ്കാരം,", // Malayalam
    "నమస్కారం,", // Telugu
    "ନମସ୍କାର,", // Odia
    "السلام علیکم،", // Urdu
    "राम राम,", // Hindi
    "जय श्री कृष्ण,", // Hindi
    "राधे राधे,", // Hindi
    "खम्मा घणी,", // Rajasthani
    "केम छो,", // Gujarati
    "जुले,", // Ladakhi
    "प्रणाम,", // Hindi / Sanskrit

    // International
    "Bonjour,", // French
    "Hola,", // Spanish
    "Ciao,", // Italian
    "Olá,", // Portuguese
    "Guten Tag,", // German
    "こんにちは,", // Japanese
    "안녕하세요,", // Korean
    "你好,", // Chinese
    "สวัสดี,", // Thai
    "Xin chào,", // Vietnamese
    "Merhaba,", // Turkish
    "שלום,", // Hebrew
    "Привет,", // Russian
    "Γεια σου,", // Greek
    "Jambo,", // Swahili
    "Aloha,", // Hawaiian
    "Kia ora,", // Māori
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

  // Opacity-only variant — no transform/filter so backdrop-filter on children can reach the canvas
  const fadeIn = prefersReducedMotion
    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
    : {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
        },
      };

  return (
    <div
      className="relative min-h-screen lg:h-screen flex flex-col lg:flex-row items-stretch px-4 sm:px-6 md:px-20 lg:px-32 xl:px-40 pb-0 overflow-hidden bg-background"
      style={{ isolation: "isolate" }}
    >
      <AnimatePresence mode="sync">
        {resolvedBgType === "tubes" && (
          <motion.div
            key="tubes"
            className="absolute inset-0"
            style={{ zIndex: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <ThreeTubesBackground enabled={bgEnabled} />
          </motion.div>
        )}
        {resolvedBgType === "aether" && (
          <motion.div
            key="aether"
            className="absolute inset-0"
            style={{ zIndex: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <AetherFlowBackground enabled={bgEnabled} />
          </motion.div>
        )}
      </AnimatePresence>
      {/* Image */}
      <div className="relative z-10 lg:w-1/2 flex justify-center items-end order-last lg:order-last pt-0 lg:pt-0">
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
        style={{
          transform: `translateY(${scrollY * -0.06}px)`,
          willChange: "transform",
        }}
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

        {/* Stats — glass cards */}
        <motion.div variants={fadeIn}>
          <div
            ref={statsRef}
            className="grid grid-cols-2 gap-2 sm:gap-3 mt-6 sm:mt-10 md:grid-cols-4 text-center"
          >
            {heroStatsData.map((stat) => (
              <div
                key={stat.key}
                className="group relative rounded-2xl backdrop-blur-lg bg-white/30 dark:bg-neutral-950/30 border border-white/20 dark:border-neutral-800/50 hover:border-white/40 dark:hover:border-white/20 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.5)]"
              >
                <a
                  href={stat.href}
                  target={stat.external ? "_blank" : "_self"}
                  rel={stat.external ? "noopener noreferrer" : undefined}
                  className="relative z-10 block p-3 sm:p-4 no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-black"
                >
                  <div className="text-black/40 dark:text-[#ebebeb4d] mb-2 group-hover:text-lime-700 dark:group-hover:text-[#ccff00] transition-colors duration-300 flex justify-center">
                    {statIcons[stat.icon]}
                  </div>
                  <div className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-[#ebebeb] tracking-tight">
                    {isStatsVisible
                      ? animatedStats[stat.key].toLocaleString()
                      : "—"}
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
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
