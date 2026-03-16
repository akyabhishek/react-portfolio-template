import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Maximize,
  Minimize,
  Clock,
  Settings,
  X,
  Moon,
  Sun,
} from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import createGlobe from "cobe";

/* ─── 3D globe background ─── */
const BackgroundGlobe = ({ isDark }: { isDark: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const phiRef = useRef(0);

  useEffect(() => {
    let width = 0;
    const onResize = () => {
      if (canvasRef.current) {
        width = canvasRef.current.offsetWidth;
      }
    };
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvasRef.current!, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.25,
      dark: isDark ? 1 : 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: isDark ? 1.8 : 6,
      baseColor: isDark ? [0.15, 0.2, 0.35] : [0.85, 0.9, 1],
      markerColor: [0.22, 0.74, 0.97],
      glowColor: isDark ? [0.08, 0.12, 0.25] : [0.75, 0.85, 1],
      markers: [],
      onRender: (state) => {
        if (pointerInteracting.current === null) {
          phiRef.current += 0.003;
        }
        state.phi = phiRef.current;
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[700px] sm:h-[700px] md:w-[800px] md:h-[800px]"
      style={{ opacity: isDark ? 0.12 : 0.08, contain: "layout paint size" }}
    />
  );
};

/* ─── single animated digit ─── */
const ClockDigit = ({
  value,
  index,
  neon,
  isDark,
}: {
  value: string;
  index: number;
  neon: boolean;
  isDark: boolean;
}) => (
  <div className="relative w-[72px] h-[110px] sm:w-[96px] sm:h-[140px] md:w-[120px] md:h-[170px] flex items-center justify-center">
    {/* glass card behind digit */}
    <div
      className="absolute inset-0 rounded-2xl backdrop-blur-md transition-colors duration-500"
      style={{
        background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
        border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)"}`,
        boxShadow: isDark
          ? "0 0 40px rgba(56,189,248,0.08)"
          : "0 4px 24px rgba(0,0,0,0.06)",
      }}
    />

    <AnimatePresence mode="popLayout">
      <motion.span
        key={value}
        initial={{ y: 24, opacity: 0, filter: "blur(6px)" }}
        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        exit={{ y: -24, opacity: 0, filter: "blur(6px)" }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
        className="relative z-10 text-6xl sm:text-7xl md:text-8xl font-bold tabular-nums tracking-tight select-none transition-[text-shadow,color] duration-500"
        style={{
          color: neon
            ? isDark
              ? "#e0f2fe"
              : "#0284c7"
            : isDark
              ? "#94a3b8"
              : "#475569",
          textShadow: neon
            ? isDark
              ? "0 0 10px rgba(56,189,248,0.7), 0 0 30px rgba(56,189,248,0.45), 0 0 60px rgba(56,189,248,0.25), 0 0 100px rgba(56,189,248,0.12)"
              : "0 0 12px rgba(2,132,199,0.35), 0 0 30px rgba(2,132,199,0.18)"
            : "none",
          animationDelay: `${index * 0.05}s`,
        }}
      >
        {value}
      </motion.span>
    </AnimatePresence>
  </div>
);

/* ─── pulsing colon separator ─── */
const ColonSeparator = ({
  neon,
  isDark,
}: {
  neon: boolean;
  isDark: boolean;
}) => (
  <motion.div
    animate={{ opacity: [1, 0.25, 1] }}
    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
    className="flex flex-col gap-3 sm:gap-4 mx-1 sm:mx-2 md:mx-3 justify-center"
  >
    {[0, 1].map((i) => (
      <span
        key={i}
        className="block w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-500"
        style={{
          background: neon
            ? isDark
              ? "rgba(56,189,248,0.9)"
              : "rgba(2,132,199,0.8)"
            : isDark
              ? "rgba(148,163,184,0.6)"
              : "rgba(100,116,139,0.5)",
          boxShadow: neon
            ? isDark
              ? "0 0 8px rgba(56,189,248,0.8), 0 0 24px rgba(56,189,248,0.5), 0 0 48px rgba(56,189,248,0.2)"
              : "0 0 8px rgba(2,132,199,0.5), 0 0 20px rgba(2,132,199,0.25)"
            : "none",
        }}
      />
    ))}
  </motion.div>
);

/* ─── floating particle (background ambience) ─── */
const Particle = ({ i, isDark }: { i: number; isDark: boolean }) => {
  const size = 2 + (i % 3);
  const x = (i * 37) % 100;
  const y = (i * 53) % 100;
  const dur = 6 + (i % 8);
  const alpha = 0.15 + (i % 5) * 0.05;

  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
        background: isDark
          ? `rgba(56,189,248,${alpha})`
          : `rgba(2,132,199,${alpha * 0.7})`,
        boxShadow: isDark
          ? `0 0 ${size * 3}px rgba(56,189,248,0.3)`
          : `0 0 ${size * 3}px rgba(2,132,199,0.15)`,
      }}
      animate={{
        y: [0, -30 - (i % 20), 0],
        x: [0, 15 - (i % 30), 0],
        opacity: [0.2, 0.6, 0.2],
      }}
      transition={{
        duration: dur,
        repeat: Infinity,
        ease: "easeInOut",
        delay: (i * 0.4) % dur,
      }}
    />
  );
};

/* ─── main clock ─── */
const DigitalClock = () => {
  const [time, setTime] = useState(new Date());
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [neon, setNeon] = useState(true);
  const [showBg, setShowBg] = useState(true);
  const [showGlobe, setShowGlobe] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [is12h, setIs12h] = useState(false);
  const [greetingName, setGreetingName] = useState(
    () => localStorage.getItem("clock-greeting-name") ?? "Abhishek",
  );

  useEffect(() => {
    localStorage.setItem("clock-greeting-name", greetingName);
  }, [greetingName]);
  const { theme, setTheme } = useTheme();
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark"),
  );

  useEffect(() => {
    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      setIsDark(root.classList.contains("dark"));
    });
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => setIsFullscreen(true));
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false));
    }
  }, []);

  useEffect(() => {
    const handler = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  const rawHour = time.getHours();
  const ampm = rawHour >= 12 ? "PM" : "AM";
  const displayHour = is12h
    ? rawHour % 12 === 0
      ? 12
      : rawHour % 12
    : rawHour;
  const h = displayHour.toString().padStart(2, "0");
  const m = time.getMinutes().toString().padStart(2, "0");
  const s = time.getSeconds().toString().padStart(2, "0");

  const hour = time.getHours();
  const greeting =
    hour < 5
      ? "Good Night"
      : hour < 12
        ? "Good Morning"
        : hour < 17
          ? "Good Afternoon"
          : hour < 21
            ? "Good Evening"
            : "Good Night";

  const dateStr = time.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const digits: { char: string; key: string }[] = [
    { char: h[0], key: `h0-${h[0]}` },
    { char: h[1], key: `h1-${h[1]}` },
    { char: ":", key: "c1" },
    { char: m[0], key: `m0-${m[0]}` },
    { char: m[1], key: `m1-${m[1]}` },
    { char: ":", key: "c2" },
    { char: s[0], key: `s0-${s[0]}` },
    { char: s[1], key: `s1-${s[1]}` },
  ];

  return (
    <div
      className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center transition-colors duration-500"
      style={{ background: isDark ? "#030712" : "#f0f6ff" }}
    >
      {/* ── 3D globe ── */}
      {showGlobe && <BackgroundGlobe isDark={isDark} />}

      {/* ── ambient gradient blobs ── */}
      {showBg && (
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] transition-colors duration-500"
            style={{
              background: isDark
                ? "rgba(56,189,248,0.04)"
                : "rgba(56,189,248,0.08)",
            }}
          />
          <div
            className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[100px] transition-colors duration-500"
            style={{
              background: isDark
                ? "rgba(99,102,241,0.04)"
                : "rgba(99,102,241,0.06)",
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[140px] transition-colors duration-500"
            style={{
              background: isDark
                ? "rgba(6,182,212,0.03)"
                : "rgba(6,182,212,0.06)",
            }}
          />
        </div>
      )}

      {/* ── particles ── */}
      {showBg && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {Array.from({ length: 40 }, (_, i) => (
            <Particle key={i} i={i} isDark={isDark} />
          ))}
        </div>
      )}

      {/* ── subtle grid overlay ── */}
      {showBg && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: isDark ? 0.03 : 0.045,
            backgroundImage: isDark
              ? "linear-gradient(rgba(56,189,248,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.3) 1px, transparent 1px)"
              : "linear-gradient(rgba(2,132,199,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(2,132,199,0.15) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      )}

      {/* ── top-right controls ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute top-5 right-5 z-20 flex items-center gap-2 transition-opacity duration-300"
        style={{ opacity: showControls ? 1 : 0 }}
        onMouseEnter={(e) => {
          if (!showControls)
            (e.currentTarget as HTMLDivElement).style.opacity = "1";
        }}
        onMouseLeave={(e) => {
          if (!showControls)
            (e.currentTarget as HTMLDivElement).style.opacity = "0";
        }}
      >
        <button
          onClick={() => setSettingsOpen((o) => !o)}
          className={`p-3 rounded-xl border transition-colors cursor-pointer ${
            isDark
              ? "bg-white/[0.04] border-white/[0.08] text-sky-300/60 hover:text-sky-300 hover:bg-white/[0.08]"
              : "bg-black/[0.03] border-black/[0.08] text-sky-700/60 hover:text-sky-700 hover:bg-black/[0.06]"
          }`}
          title="Settings"
        >
          {settingsOpen ? <X size={20} /> : <Settings size={20} />}
        </button>
        <button
          onClick={toggleFullscreen}
          className={`p-3 rounded-xl border transition-colors cursor-pointer ${
            isDark
              ? "bg-white/[0.04] border-white/[0.08] text-sky-300/60 hover:text-sky-300 hover:bg-white/[0.08]"
              : "bg-black/[0.03] border-black/[0.08] text-sky-700/60 hover:text-sky-700 hover:bg-black/[0.06]"
          }`}
          title={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
        >
          {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
        </button>
      </motion.div>

      {/* ── settings panel ── */}
      <AnimatePresence>
        {settingsOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className={`absolute top-20 right-5 z-30 w-64 rounded-2xl backdrop-blur-xl p-5 border transition-colors duration-500 ${
              isDark
                ? "bg-white/[0.04] border-white/[0.08] shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
                : "bg-white/80 border-black/[0.08] shadow-[0_8px_40px_rgba(0,0,0,0.08)]"
            }`}
          >
            <h3
              className={`text-sm font-semibold tracking-wider uppercase mb-4 ${
                isDark ? "text-sky-200/70" : "text-sky-800/70"
              }`}
            >
              Settings
            </h3>

            {/* neon toggle */}
            <div className="flex items-center justify-between">
              <span
                className={`text-sm ${isDark ? "text-sky-300/50" : "text-sky-800/50"}`}
              >
                Neon Glow
              </span>
              <button
                onClick={() => setNeon((n) => !n)}
                className={`relative w-11 h-6 rounded-full transition-colors duration-300 cursor-pointer ${
                  neon
                    ? "bg-sky-500/60 shadow-[0_0_12px_rgba(56,189,248,0.4)]"
                    : isDark
                      ? "bg-white/10"
                      : "bg-black/10"
                }`}
              >
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md ${
                    neon ? "left-[22px]" : "left-0.5"
                  }`}
                />
              </button>
            </div>

            {/* dark mode toggle */}
            <div className="flex items-center justify-between mt-3">
              <span
                className={`text-sm flex items-center gap-1.5 ${isDark ? "text-sky-300/50" : "text-sky-800/50"}`}
              >
                {isDark ? <Moon size={13} /> : <Sun size={13} />}
                {isDark ? "Dark Mode" : "Light Mode"}
              </span>
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className={`relative w-11 h-6 rounded-full transition-colors duration-300 cursor-pointer ${
                  isDark
                    ? "bg-sky-500/60 shadow-[0_0_12px_rgba(56,189,248,0.4)]"
                    : "bg-black/10"
                }`}
              >
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md ${
                    isDark ? "left-[22px]" : "left-0.5"
                  }`}
                />
              </button>
            </div>

            {/* 12h / 24h toggle */}
            <div className="flex items-center justify-between mt-3">
              <span
                className={`text-sm ${isDark ? "text-sky-300/50" : "text-sky-800/50"}`}
              >
                {is12h ? "12-hour" : "24-hour"}
              </span>
              <button
                onClick={() => setIs12h((v) => !v)}
                className={`relative w-11 h-6 rounded-full transition-colors duration-300 cursor-pointer ${
                  is12h
                    ? "bg-sky-500/60 shadow-[0_0_12px_rgba(56,189,248,0.4)]"
                    : isDark
                      ? "bg-white/10"
                      : "bg-black/10"
                }`}
              >
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md ${
                    is12h ? "left-[22px]" : "left-0.5"
                  }`}
                />
              </button>
            </div>

            {/* show controls toggle */}
            <div className="flex items-center justify-between mt-3">
              <span
                className={`text-sm ${isDark ? "text-sky-300/50" : "text-sky-800/50"}`}
              >
                Show Buttons
              </span>
              <button
                onClick={() => setShowControls((c) => !c)}
                className={`relative w-11 h-6 rounded-full transition-colors duration-300 cursor-pointer ${
                  showControls
                    ? "bg-sky-500/60 shadow-[0_0_12px_rgba(56,189,248,0.4)]"
                    : isDark
                      ? "bg-white/10"
                      : "bg-black/10"
                }`}
              >
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md ${
                    showControls ? "left-[22px]" : "left-0.5"
                  }`}
                />
              </button>
            </div>

            {/* globe toggle */}
            <div className="flex items-center justify-between mt-3">
              <span
                className={`text-sm ${isDark ? "text-sky-300/50" : "text-sky-800/50"}`}
              >
                Globe
              </span>
              <button
                onClick={() => setShowGlobe((g) => !g)}
                className={`relative w-11 h-6 rounded-full transition-colors duration-300 cursor-pointer ${
                  showGlobe
                    ? "bg-sky-500/60 shadow-[0_0_12px_rgba(56,189,248,0.4)]"
                    : isDark
                      ? "bg-white/10"
                      : "bg-black/10"
                }`}
              >
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md ${
                    showGlobe ? "left-[22px]" : "left-0.5"
                  }`}
                />
              </button>
            </div>

            {/* background effects toggle */}
            <div className="flex items-center justify-between mt-3">
              <span
                className={`text-sm ${isDark ? "text-sky-300/50" : "text-sky-800/50"}`}
              >
                Background FX
              </span>
              <button
                onClick={() => setShowBg((b) => !b)}
                className={`relative w-11 h-6 rounded-full transition-colors duration-300 cursor-pointer ${
                  showBg
                    ? "bg-sky-500/60 shadow-[0_0_12px_rgba(56,189,248,0.4)]"
                    : isDark
                      ? "bg-white/10"
                      : "bg-black/10"
                }`}
              >
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md ${
                    showBg ? "left-[22px]" : "left-0.5"
                  }`}
                />
              </button>
            </div>
            {/* greeting name */}
            <div
              className="mt-4 pt-4"
              style={{
                borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
              }}
            >
              <label
                className={`block text-xs tracking-wider uppercase mb-1.5 ${isDark ? "text-sky-300/40" : "text-sky-800/40"}`}
              >
                Your Name
              </label>
              <input
                type="text"
                value={greetingName}
                onChange={(e) => setGreetingName(e.target.value)}
                placeholder="Abhishek"
                maxLength={20}
                className={`w-full text-sm px-3 py-1.5 rounded-lg outline-none transition-colors duration-300 ${
                  isDark
                    ? "bg-white/[0.06] border border-white/[0.08] text-sky-200/70 placeholder:text-sky-300/20 focus:border-sky-500/40"
                    : "bg-black/[0.04] border border-black/[0.08] text-sky-800/70 placeholder:text-sky-700/20 focus:border-sky-500/40"
                }`}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── greeting ── */}
      <motion.span
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.7 }}
        className={`mb-3 text-xs sm:text-sm tracking-[0.2em] font-light transition-colors duration-500 ${
          isDark ? "text-sky-300/30" : "text-sky-700/30"
        }`}
      >
        {greeting}
        {greetingName ? `, ${greetingName}` : ""}
      </motion.span>

      {/* ── header badge ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className={`flex items-center gap-2 mb-8 sm:mb-10 px-4 py-2 rounded-full border transition-colors duration-500 ${
          isDark
            ? "bg-white/[0.04] border-white/[0.07]"
            : "bg-black/[0.03] border-black/[0.07]"
        }`}
      >
        <Clock
          size={14}
          className={isDark ? "text-sky-400/70" : "text-sky-600/70"}
        />
        <span
          className={`text-xs sm:text-sm font-medium tracking-widest uppercase ${
            isDark ? "text-sky-300/60" : "text-sky-700/60"
          }`}
        >
          Digital Clock
        </span>
      </motion.div>

      {/* ── digits + AM/PM ── */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 180,
          damping: 22,
          delay: 0.15,
        }}
        className="relative z-10 flex items-end gap-3"
      >
        <div className="flex items-center">
          {digits.map((d, idx) =>
            d.char === ":" ? (
              <ColonSeparator key={d.key} neon={neon} isDark={isDark} />
            ) : (
              <ClockDigit
                key={d.key}
                value={d.char}
                index={idx}
                neon={neon}
                isDark={isDark}
              />
            ),
          )}
        </div>

        {/* AM / PM badge */}
        <AnimatePresence>
          {is12h && (
            <motion.span
              key={ampm}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
              className="mb-3 sm:mb-4 text-base sm:text-lg md:text-xl font-semibold tracking-widest select-none"
              style={{
                color: neon
                  ? isDark
                    ? "rgba(56,189,248,0.7)"
                    : "rgba(2,132,199,0.6)"
                  : isDark
                    ? "rgba(148,163,184,0.5)"
                    : "rgba(100,116,139,0.5)",
                textShadow:
                  neon && isDark ? "0 0 12px rgba(56,189,248,0.5)" : "none",
              }}
            >
              {ampm}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── date line ── */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className={`mt-8 sm:mt-10 text-base sm:text-lg tracking-[0.25em] font-light transition-colors duration-500 ${
          isDark ? "text-sky-300/40" : "text-sky-800/40"
        }`}
      >
        {dateStr}
      </motion.p>

      {/* ── ambient reflection bar ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 1.2 }}
        className={`mt-14 w-[280px] sm:w-[360px] h-[1px] bg-gradient-to-r from-transparent to-transparent ${
          isDark ? "via-sky-500/20" : "via-sky-600/15"
        }`}
      />

      {/* ── timezone label ── */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className={`mt-4 text-xs tracking-[0.3em] uppercase transition-colors duration-500 ${
          isDark ? "text-sky-400/25" : "text-sky-700/25"
        }`}
      >
        {Intl.DateTimeFormat().resolvedOptions().timeZone.replace("_", " ")}
      </motion.span>
    </div>
  );
};

export default DigitalClock;
