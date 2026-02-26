import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiGithub,
  FiLinkedin,
  FiDownload,
} from "react-icons/fi";
import { personalInfo, getExperienceString } from "@/config/data";
import { FlipWords } from "@/components/ui/flip-words";
import profileImage from "/assets/abhishekkumaryadav-new.jpg";

const roles = [
  "Software Developer",
  "Backend Engineer",
  "Spring Boot Developer",
  "Full Stack Developer",
  "Programmer Analyst",
];

export default function CVHero() {
  const experience = getExperienceString();

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
    >
      {/* Animated gradient background */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-200/40 dark:from-purple-800/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-emerald-200/40 dark:from-emerald-800/20 via-transparent to-transparent" />
        {/* Floating orbs */}
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"
          animate={{ x: [0, -40, 0], y: [0, -50, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <motion.div
        style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        className="relative z-10 text-center px-6 max-w-3xl mx-auto"
      >
        {/* Profile photo + Status badge inline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="mb-5 flex flex-col items-center gap-3"
        >
          <div className="relative">
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-500 via-emerald-500 to-purple-500 animate-spin-slow opacity-75 blur-sm" />
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-500 via-emerald-500 to-purple-500 animate-spin-slow" />
            <img
              src={profileImage}
              alt={personalInfo.name}
              className="relative w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border-2 border-white dark:border-slate-950"
            />
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-medium tracking-wide uppercase backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
            Available for opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight mb-3"
        >
          <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 dark:from-white dark:via-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
            {personalInfo.name}
          </span>
        </motion.h1>

        {/* FlipWords Title + Experience — single line */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center justify-center gap-2 mb-6 h-8"
        >
          <FlipWords
            words={roles}
            duration={3000}
            className="text-gray-500 dark:text-gray-400 font-light text-base md:text-lg"
          />
          <span className="text-gray-300 dark:text-gray-700">·</span>
          <span className="text-sm text-gray-400 dark:text-gray-500 font-light tracking-wide whitespace-nowrap">
            {experience}
          </span>
        </motion.div>

        {/* Compact contact row — icons with text, single line */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center justify-center gap-4 md:gap-5 mb-8 flex-wrap"
        >
          <a
            href={`mailto:${personalInfo.email}`}
            className="inline-flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-[13px] font-light hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <FiMail size={13} /> {personalInfo.email}
          </a>
          <span className="text-gray-200 dark:text-gray-800 hidden md:inline">
            |
          </span>
          <span className="inline-flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-[13px] font-light">
            <FiMapPin size={13} /> {personalInfo.location}
          </span>
          <span className="text-gray-200 dark:text-gray-800 hidden md:inline">
            |
          </span>
          <div className="flex items-center gap-3">
            <a
              href={personalInfo.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <FiLinkedin size={16} />
            </a>
            <a
              href={personalInfo.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <FiGithub size={16} />
            </a>
            <a
              href={`tel:+91${personalInfo.phone}`}
              className="text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <FiPhone size={15} />
            </a>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex justify-center gap-3"
        >
          <a
            href={personalInfo.resumePdfUrl}
            download
            className="group relative inline-flex items-center gap-2 px-7 py-2.5 rounded-full bg-gray-900 text-white dark:bg-white dark:text-slate-950 font-medium text-[13px] tracking-wide overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-gray-900/20 dark:hover:shadow-white/10"
          >
            <FiDownload size={14} />
            Download Resume
          </a>
          <a
            href="#experience"
            className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full border border-gray-300 dark:border-white/[0.12] text-gray-500 dark:text-gray-300 text-[13px] font-light tracking-wide hover:bg-black/5 dark:hover:bg-white/5 transition-all duration-300"
          >
            Explore Below ↓
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-gray-300 dark:border-white/20 flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-1 rounded-full bg-gray-400 dark:bg-white/40 mt-1.5"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
