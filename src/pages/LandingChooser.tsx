import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiCode, FiFileText, FiArrowRight, FiTerminal } from "react-icons/fi";
import { personalInfo } from "@/config/data";
import InteractiveTerminal, {
  type InteractiveTerminalHandle,
} from "@/components/InteractiveTerminal";

export default function LandingChooser() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<"left" | "right" | null>(null);
  const terminalRef = useRef<InteractiveTerminalHandle>(null);

  return (
    <div className="relative h-screen w-full overflow-hidden select-none bg-white dark:bg-gray-950">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,_rgba(16,185,129,0.08),_transparent_60%),radial-gradient(ellipse_at_80%_50%,_rgba(120,80,255,0.08),_transparent_60%)] dark:bg-[radial-gradient(ellipse_at_20%_50%,_rgba(16,185,129,0.15),_transparent_60%),radial-gradient(ellipse_at_80%_50%,_rgba(120,80,255,0.15),_transparent_60%)]" />

      {/* Floating animated orbs */}
      <motion.div
        className="absolute w-72 h-72 rounded-full bg-emerald-400/10 dark:bg-emerald-500/10 blur-3xl pointer-events-none"
        animate={{
          x: [0, 30, -20, 0],
          y: [0, -40, 20, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: "20%", left: "10%" }}
      />
      <motion.div
        className="absolute w-72 h-72 rounded-full bg-purple-400/10 dark:bg-purple-500/10 blur-3xl pointer-events-none"
        animate={{
          x: [0, -30, 20, 0],
          y: [0, 30, -30, 0],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        style={{ top: "30%", right: "10%" }}
      />
      <motion.div
        className="absolute w-48 h-48 rounded-full bg-teal-300/8 dark:bg-teal-400/8 blur-2xl pointer-events-none"
        animate={{
          x: [0, 20, -15, 0],
          y: [0, 15, -25, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        style={{ bottom: "15%", left: "25%" }}
      />
      <motion.div
        className="absolute w-48 h-48 rounded-full bg-indigo-300/8 dark:bg-indigo-400/8 blur-2xl pointer-events-none"
        animate={{
          x: [0, -25, 10, 0],
          y: [0, -20, 30, 0],
        }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        style={{ bottom: "20%", right: "20%" }}
      />

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-gray-400/30 dark:bg-white/20 pointer-events-none"
          initial={{
            x:
              Math.random() *
              (typeof window !== "undefined" ? window.innerWidth : 1000),
            y:
              Math.random() *
              (typeof window !== "undefined" ? window.innerHeight : 800),
          }}
          animate={{
            y: [null, Math.random() * -200 - 100],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 6 + Math.random() * 6,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Name / branding at top center */}
      <motion.div
        className="absolute top-8 inset-x-0 z-30 flex justify-center"
        initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <h1 className="text-sm font-light tracking-[0.3em] uppercase text-gray-500 dark:text-white/60 text-center">
          {personalInfo.name}
        </h1>
      </motion.div>

      <div className="relative h-full w-full flex">
        {/* ─── Left: Portfolio ─── */}
        <motion.div
          className="relative h-full flex-1 flex items-center justify-center cursor-pointer group"
          onMouseEnter={() => setHovered("left")}
          onMouseLeave={() => setHovered(null)}
          onClick={() => navigate("/home")}
          animate={{
            flex: hovered === "left" ? 1.3 : hovered === "right" ? 0.7 : 1,
          }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Subtle bg overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-emerald-200/40 to-teal-200/20 dark:from-emerald-600/10 dark:to-teal-600/5"
            animate={{ opacity: hovered === "left" ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />

          <motion.div
            className="relative z-10 flex flex-col items-center gap-6 px-8"
            initial={{ opacity: 0, x: -40, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {/* Icon */}
            <motion.div
              className="relative w-16 h-16 rounded-lg bg-gray-100 dark:bg-white/5 border border-emerald-300/40 dark:border-emerald-500/20 flex items-center justify-center backdrop-blur-sm font-mono"
              whileHover={{ scale: 1.1, borderColor: "rgba(16,185,129,0.4)" }}
              animate={{
                boxShadow:
                  hovered === "left"
                    ? "0 0 30px rgba(16,185,129,0.2)"
                    : "0 0 0px rgba(16,185,129,0)",
              }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                animate={{ rotate: hovered === "left" ? 360 : 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <FiCode className="text-emerald-400" size={28} />
              </motion.div>
            </motion.div>

            {/* Terminal-style title */}
            <div className="text-center">
              <motion.h2
                className="text-2xl md:text-3xl font-mono font-medium text-gray-900 dark:text-emerald-300 tracking-tight"
                animate={{
                  scale: hovered === "left" ? 1.05 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-emerald-500 dark:text-emerald-500">
                  ./
                </span>
                portfolio
              </motion.h2>
              <motion.p
                className="text-xs font-mono text-gray-400 dark:text-white/35 mt-3 max-w-[220px] leading-relaxed"
                animate={{ opacity: hovered === "left" ? 1 : 0.7 }}
                transition={{ duration: 0.3 }}
              >
                {"// explore projects, skills & code"}
              </motion.p>
            </div>

            {/* CTA - interactive terminal */}
            <InteractiveTerminal ref={terminalRef} />

            {/* Tags - code style */}
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {["<Projects />", "Skills[]", "Experience{}", "Tools"].map(
                (tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
                    whileHover={{
                      scale: 1.1,
                      borderColor: "rgba(16,185,129,0.3)",
                    }}
                    className="text-[10px] font-mono px-2.5 py-1 rounded bg-gray-100 dark:bg-white/5 text-emerald-600/60 dark:text-emerald-400/40 border border-emerald-200/40 dark:border-emerald-500/10"
                  >
                    {tag}
                  </motion.span>
                ),
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Center divider — lives in flex flow so it tracks the boundary */}
        <motion.div
          className="w-px pointer-events-none flex-shrink-0 my-16 relative"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          style={{ originY: 0.5, alignSelf: "stretch" }}
        >
          <div className="h-full w-full bg-gradient-to-b from-transparent via-gray-300 dark:via-white/20 to-transparent" />
          {/* Shimmer light traveling along divider */}
          <motion.div
            className="absolute left-0 w-full h-8 bg-gradient-to-b from-transparent via-emerald-400/40 dark:via-white/40 to-transparent"
            animate={{ top: ["-10%", "110%"] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 2,
            }}
          />
        </motion.div>

        {/* ─── Right: CV / Resume ─── */}
        <motion.div
          className="relative h-full flex-1 flex items-center justify-center cursor-pointer group"
          onMouseEnter={() => setHovered("right")}
          onMouseLeave={() => setHovered(null)}
          onClick={() => navigate("/cv")}
          animate={{
            flex: hovered === "right" ? 1.3 : hovered === "left" ? 0.7 : 1,
          }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Subtle bg overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-bl from-purple-200/40 to-indigo-200/20 dark:from-purple-600/10 dark:to-indigo-600/5"
            animate={{ opacity: hovered === "right" ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          />

          <motion.div
            className="relative z-10 flex flex-col items-center gap-6 px-8"
            initial={{ opacity: 0, x: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            {/* Icon */}
            <motion.div
              className="relative w-16 h-16 rounded-full bg-gray-50 dark:bg-white/5 border border-purple-200/50 dark:border-purple-400/15 flex items-center justify-center backdrop-blur-sm"
              whileHover={{ scale: 1.1, borderColor: "rgba(139,92,246,0.4)" }}
              animate={{
                boxShadow:
                  hovered === "right"
                    ? "0 0 30px rgba(139,92,246,0.15)"
                    : "0 0 0px rgba(139,92,246,0)",
              }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                animate={{ scale: hovered === "right" ? 1.1 : 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <FiFileText className="text-purple-400" size={26} />
              </motion.div>
            </motion.div>

            {/* Elegant title */}
            <div className="text-center">
              <motion.h2
                className="text-2xl md:text-3xl font-extralight text-gray-800 dark:text-white tracking-wide font-['Inter',_sans-serif]"
                animate={{
                  scale: hovered === "right" ? 1.05 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                Curriculum Vitae
              </motion.h2>
              <motion.div className="flex justify-center mt-2">
                <motion.div
                  className="h-px bg-purple-300/50 dark:bg-purple-400/20"
                  animate={{ width: hovered === "right" ? 80 : 40 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
              <motion.p
                className="text-sm font-light text-gray-400 dark:text-white/35 mt-3 max-w-[220px] leading-relaxed tracking-wide"
                animate={{ opacity: hovered === "right" ? 1 : 0.7 }}
                transition={{ duration: 0.3 }}
              >
                Clean, professional overview for recruiters
              </motion.p>
            </div>

            {/* CTA */}
            <motion.div
              className="flex items-center gap-2 text-sm text-purple-500/80 dark:text-purple-300/60 font-light tracking-wide"
              animate={{ opacity: hovered === "right" ? 1 : 0.5 }}
              transition={{ duration: 0.3 }}
            >
              <span>View</span>
              <motion.span
                animate={{ x: hovered === "right" ? 4 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <FiArrowRight size={14} />
              </motion.span>
            </motion.div>

            {/* Tags - clean pill style */}
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {["Experience", "Education", "Skills", "Download"].map(
                (tag, i) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
                    whileHover={{
                      scale: 1.05,
                      borderColor: "rgba(139,92,246,0.25)",
                    }}
                    className="text-[10px] font-light tracking-wider px-3 py-1 rounded-full bg-gray-50 dark:bg-white/[0.03] text-gray-400 dark:text-white/25 border border-purple-200/30 dark:border-purple-400/10"
                  >
                    {tag}
                  </motion.span>
                ),
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Keyboard hint */}
      <motion.div
        className="absolute inset-x-0 bottom-8 z-30 hidden md:flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            terminalRef.current?.openFullscreen();
          }}
          className="flex items-center gap-1.5 text-[10px] text-gray-400 dark:text-white/30 hover:text-emerald-500 dark:hover:text-emerald-400/60 tracking-wider transition-colors cursor-pointer"
        >
          <FiTerminal size={11} />
          Open Terminal
        </button>
        <motion.span
          className="text-[10px] text-gray-300 dark:text-white/20 tracking-wider"
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          Click a side to continue
        </motion.span>
      </motion.div>
    </div>
  );
}
