import {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiMaximize2, FiMinimize2 } from "react-icons/fi";
import {
  personalInfo,
  educationData,
  experienceData,
  projectsData,
  achievementsData,
} from "@/config/data";
import { skillsData } from "@/config/skillsData";
import { useTheme } from "@/components/theme-provider";

type TerminalLine = { text: string; type: "error" | "info" | "success" };

export interface InteractiveTerminalHandle {
  openFullscreen: () => void;
}

interface InteractiveTerminalProps {
  hideInline?: boolean;
}

const InteractiveTerminal = forwardRef<
  InteractiveTerminalHandle,
  InteractiveTerminalProps
>(({ hideInline = false }, ref) => {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalActive, setTerminalActive] = useState(false);
  const [showCursor, setShowCursor] = useState(true);
  const [terminalOutput, setTerminalOutput] = useState<TerminalLine[]>([]);
  const [terminalFullscreen, setTerminalFullscreen] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const fullscreenInputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => ({
    openFullscreen: () => {
      setTerminalFullscreen(true);
      setTimeout(() => fullscreenInputRef.current?.focus(), 100);
    },
  }));

  // Blinking cursor
  useEffect(() => {
    const timer = setInterval(() => setShowCursor((c) => !c), 530);
    return () => clearInterval(timer);
  }, []);

  // Handle terminal commands
  const handleTerminalKeyDown = (e: React.KeyboardEvent) => {
    // Arrow up: previous command
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const newIndex =
        historyIndex < commandHistory.length - 1
          ? historyIndex + 1
          : historyIndex;
      setHistoryIndex(newIndex);
      setTerminalInput(commandHistory[commandHistory.length - 1 - newIndex]);
      return;
    }
    // Arrow down: next command
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex <= 0) {
        setHistoryIndex(-1);
        setTerminalInput("");
        return;
      }
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setTerminalInput(commandHistory[commandHistory.length - 1 - newIndex]);
      return;
    }

    if (e.key === "Enter") {
      const raw = terminalInput.trim();
      const cmd = raw.toLowerCase();
      if (cmd === "") return;

      // Push to history
      setCommandHistory((prev) => [...prev, raw]);
      setHistoryIndex(-1);

      // cd commands
      if (cmd === "cd portfolio" || cmd === "cd home") {
        setTerminalOutput([]);
        navigate("/home");
        return;
      }
      if (cmd === "cd cv" || cmd === "cd resume") {
        setTerminalOutput([]);
        navigate("/cv");
        return;
      }

      // clear
      if (cmd === "clear") {
        setTerminalOutput([]);
        setTerminalInput("");
        return;
      }

      // exit
      if (cmd === "exit" || cmd === "quit") {
        setTerminalFullscreen(false);
        setTerminalOutput([]);
        setTerminalInput("");
        return;
      }

      // fullscreen
      if (cmd === "fullscreen" || cmd === "fs") {
        setTerminalFullscreen(true);
        setTerminalInput("");
        setTimeout(() => fullscreenInputRef.current?.focus(), 100);
        return;
      }

      // version
      if (cmd === "version" || cmd === "--version" || cmd === "-v") {
        setTerminalOutput([
          { text: `${personalInfo.name} portfolio v2.0.0`, type: "info" },
          { text: "built with React + Vite + TailwindCSS", type: "info" },
        ]);
        setTerminalInput("");
        return;
      }

      // help
      if (cmd === "help" || cmd === "--help" || cmd === "-h") {
        setTerminalOutput([
          { text: "Available commands:", type: "info" },
          { text: "  cd portfolio  → open portfolio", type: "success" },
          { text: "  cd cv         → open résumé", type: "success" },
          { text: "  skills        → list all skills", type: "success" },
          { text: "  theme dark    → switch to dark mode", type: "success" },
          { text: "  theme light   → switch to light mode", type: "success" },
          { text: "  theme toggle  → toggle current mode", type: "success" },
          {
            text: "  joke          → tell a programming joke",
            type: "success",
          },
          { text: "  hi            → say hello", type: "success" },
          {
            text: "  time          → show current date & time",
            type: "success",
          },
          { text: "  socials       → list social links", type: "success" },
          { text: "  quote         → random dev quote", type: "success" },
          { text: "  matrix        → matrix rain animation", type: "success" },
          {
            text: "  education     → show education history",
            type: "success",
          },
          {
            text: "  experience    → show work experience",
            type: "success",
          },
          {
            text: "  projects      → list all projects",
            type: "success",
          },
          {
            text: "  achievements  → show achievements",
            type: "success",
          },
          { text: "  contact       → how to reach me", type: "success" },
          { text: "  ping          → ping the website", type: "success" },
          { text: "  ascii         → ASCII art name banner", type: "success" },
          { text: "  version       → show version", type: "info" },
          { text: "  fs            → open fullscreen terminal", type: "info" },
          { text: "  clear         → reset terminal", type: "info" },
          { text: "  exit          → close fullscreen", type: "info" },
          { text: "  help          → show this message", type: "info" },
        ]);
        setTerminalInput("");
        return;
      }

      // theme
      if (
        cmd === "theme dark" ||
        cmd === "theme light" ||
        cmd === "theme toggle"
      ) {
        let newTheme: "dark" | "light";
        if (cmd === "theme toggle") {
          newTheme = theme === "dark" ? "light" : "dark";
        } else {
          newTheme = cmd === "theme dark" ? "dark" : "light";
        }
        setTheme(newTheme);
        setTerminalOutput([
          { text: `✓ Theme switched to ${newTheme} mode`, type: "success" },
        ]);
        setTerminalInput("");
        return;
      }

      if (cmd === "theme") {
        setTerminalOutput([
          { text: `Current theme: ${theme}`, type: "info" },
          { text: "Usage:", type: "info" },
          { text: "  theme dark    → switch to dark mode", type: "success" },
          { text: "  theme light   → switch to light mode", type: "success" },
          { text: "  theme toggle  → toggle current mode", type: "success" },
        ]);
        setTerminalInput("");
        return;
      }

      // skills
      if (cmd === "skills" || cmd === "ls skills" || cmd === "skill") {
        const allLines: TerminalLine[] = [];
        skillsData.forEach((cat) => {
          allLines.push({ text: "", type: "info" });
          allLines.push({
            text: `  ${cat.category}`,
            type: "info",
          });
          cat.items.forEach((s) => {
            const badge =
              s.level === "Expert"
                ? "★"
                : s.level === "Advanced"
                  ? "●"
                  : s.level === "Intermediate"
                    ? "◐"
                    : "○";
            allLines.push({ text: `    ${badge} ${s.name}`, type: "success" });
          });
        });
        allLines.push({ text: "", type: "info" });
        allLines.push({
          text: "  ★ Expert  ● Advanced  ◐ Intermediate  ○ Beginner",
          type: "info",
        });

        // Animate lines one by one
        setTerminalOutput([]);
        setTerminalInput("");
        allLines.forEach((line, i) => {
          setTimeout(() => {
            setTerminalOutput((prev) => [...prev, line]);
          }, i * 40);
        });
        return;
      }

      // joke
      if (cmd === "joke") {
        setTerminalOutput([{ text: "Fetching joke...", type: "info" }]);
        setTerminalInput("");
        fetch(
          "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&format=txt",
        )
          .then((res) => res.text())
          .then((text) => {
            setTerminalOutput(
              text
                .trim()
                .split("\n")
                .map((line) => ({ text: line, type: "success" as const })),
            );
          })
          .catch(() => {
            setTerminalOutput([
              { text: "Failed to fetch joke. Try again!", type: "error" },
            ]);
          });
        return;
      }

      // hi / hello
      if (cmd === "hi" || cmd === "hello" || cmd === "hey") {
        const greetings = [
          `Hey there! 👋 I'm ${personalInfo.name}.`,
          `Hello, world! Welcome to my terminal.`,
          `Hi! Type 'help' to see what I can do.`,
          `Greetings, human! 🤖 Ready to explore?`,
          `Namaste! 🙏 Welcome aboard.`,
        ];
        setTerminalOutput([
          {
            text: greetings[Math.floor(Math.random() * greetings.length)],
            type: "success",
          },
        ]);
        setTerminalInput("");
        return;
      }

      // time
      if (
        cmd === "time" ||
        cmd === "date" ||
        cmd === "now" ||
        cmd === "datetime"
      ) {
        const now = new Date();
        setTerminalOutput([
          {
            text: `📅 ${now.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}`,
            type: "info",
          },
          {
            text: `🕐 ${now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}`,
            type: "info",
          },
          {
            text: `🌐 ${Intl.DateTimeFormat().resolvedOptions().timeZone}`,
            type: "info",
          },
        ]);
        setTerminalInput("");
        return;
      }

      // socials
      if (cmd === "socials" || cmd === "social" || cmd === "links") {
        setTerminalOutput([
          { text: "Connect with me:", type: "info" },
          { text: "", type: "info" },
          {
            text: `  🔗 LinkedIn  → ${personalInfo.linkedinUrl}`,
            type: "success",
          },
          {
            text: `  🐙 GitHub    → ${personalInfo.githubUrl}`,
            type: "success",
          },
          {
            text: `  📧 Email     → ${personalInfo.email}`,
            type: "success",
          },
          {
            text: `  🌐 Website   → ${personalInfo.website}`,
            type: "success",
          },
        ]);
        setTerminalInput("");
        return;
      }

      // quote
      if (cmd === "quote") {
        setTerminalOutput([{ text: "Fetching quote...", type: "info" }]);
        setTerminalInput("");
        fetch("https://api.quotable.io/quotes/random")
          .then((res) => res.json())
          .then((data) => {
            const q = Array.isArray(data) ? data[0] : data;
            setTerminalOutput([
              { text: `"${q.content}"`, type: "success" },
              { text: `  — ${q.author}`, type: "info" },
            ]);
          })
          .catch(() => {
            // Fallback quotes if API is down
            const fallbacks = [
              {
                text: '"First, solve the problem. Then, write the code."',
                author: "John Johnson",
              },
              {
                text: '"Code is like humor. When you have to explain it, it\'s bad."',
                author: "Cory House",
              },
              {
                text: '"Simplicity is the soul of efficiency."',
                author: "Austin Freeman",
              },
              {
                text: '"Make it work, make it right, make it fast."',
                author: "Kent Beck",
              },
              {
                text: '"Talk is cheap. Show me the code."',
                author: "Linus Torvalds",
              },
            ];
            const q = fallbacks[Math.floor(Math.random() * fallbacks.length)];
            setTerminalOutput([
              { text: q.text, type: "success" },
              { text: `  — ${q.author}`, type: "info" },
            ]);
          });
        return;
      }

      // matrix
      if (cmd === "matrix") {
        setTerminalInput("");
        const chars =
          "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEF";
        const cols = terminalFullscreen ? 80 : 30;
        const rows = terminalFullscreen ? 20 : 8;
        const drops = Array.from({ length: cols }, () =>
          Math.floor(Math.random() * rows),
        );
        let frame = 0;
        const maxFrames = 35;

        const interval = setInterval(() => {
          if (frame >= maxFrames) {
            clearInterval(interval);
            setTerminalOutput([
              { text: "Wake up, Neo...", type: "success" },
              { text: "The Matrix has you.", type: "success" },
              { text: "", type: "info" },
              { text: "Type 'help' to return to reality.", type: "info" },
            ]);
            return;
          }
          const grid = Array.from({ length: rows }, () =>
            Array(cols).fill(" "),
          );
          drops.forEach((drop, col) => {
            for (let r = 0; r <= drop && r < rows; r++) {
              grid[r][col] = chars[Math.floor(Math.random() * chars.length)];
            }
            if (Math.random() > 0.3) drops[col] = (drop + 1) % (rows + 5);
          });
          const lines: TerminalLine[] = grid.map((row) => ({
            text: row.join(""),
            type: "success" as const,
          }));
          setTerminalOutput(lines);
          frame++;
        }, 100);
        return;
      }

      // experience
      if (cmd === "experience" || cmd === "exp" || cmd === "work") {
        const lines: TerminalLine[] = [
          { text: "┌─────────────────────────────────────────┐", type: "info" },
          { text: "│  💼  Work Experience                    │", type: "info" },
          { text: "└─────────────────────────────────────────┘", type: "info" },
          { text: "", type: "info" },
        ];
        experienceData.forEach((exp, i) => {
          lines.push({ text: `  ┌── ${exp.title}`, type: "success" });
          lines.push({ text: `  │   🏢 ${exp.company}`, type: "info" });
          if (exp.location) {
            lines.push({ text: `  │   📍 ${exp.location}`, type: "info" });
          }
          lines.push({
            text: `  │   📅 ${exp.from} → ${exp.to}`,
            type: "info",
          });
          if (exp.description) {
            lines.push({ text: `  │`, type: "info" });
            lines.push({ text: `  │   ${exp.description}`, type: "info" });
          }
          if (exp.technologies && exp.technologies.length > 0) {
            lines.push({ text: `  │`, type: "info" });
            lines.push({
              text: `  │   🛠  ${exp.technologies.slice(0, 8).join(", ")}${exp.technologies.length > 8 ? " ..." : ""}`,
              type: "success",
            });
          }
          lines.push({ text: `  └──`, type: "info" });
          if (i < experienceData.length - 1) {
            lines.push({ text: "", type: "info" });
          }
        });
        // Animate lines one by one
        setTerminalOutput([]);
        setTerminalInput("");
        lines.forEach((line, i) => {
          setTimeout(() => {
            setTerminalOutput((prev) => [...prev, line]);
          }, i * 50);
        });
        return;
      }

      // education
      if (cmd === "education" || cmd === "edu") {
        const lines: TerminalLine[] = [
          { text: "┌─────────────────────────────────────────┐", type: "info" },
          { text: "│  🎓  Education                          │", type: "info" },
          { text: "└─────────────────────────────────────────┘", type: "info" },
          { text: "", type: "info" },
        ];
        educationData.forEach((edu, i) => {
          lines.push({ text: `  ┌── ${edu.degree}`, type: "success" });
          lines.push({ text: `  │   ${edu.institution}`, type: "info" });
          lines.push({ text: `  │   📊 ${edu.score}`, type: "info" });
          lines.push({ text: `  └── 📅 ${edu.year}`, type: "info" });
          if (i < educationData.length - 1) {
            lines.push({ text: "", type: "info" });
          }
        });
        // Animate lines one by one
        setTerminalOutput([]);
        setTerminalInput("");
        lines.forEach((line, i) => {
          setTimeout(() => {
            setTerminalOutput((prev) => [...prev, line]);
          }, i * 50);
        });
        return;
      }

      // projects
      if (cmd === "projects" || cmd === "project" || cmd === "ls projects") {
        const lines: TerminalLine[] = [
          { text: "┌─────────────────────────────────────────┐", type: "info" },
          { text: "│  🚀  Projects                           │", type: "info" },
          { text: "└─────────────────────────────────────────┘", type: "info" },
          { text: "", type: "info" },
        ];
        projectsData.forEach((proj, i) => {
          const status = proj.live ? "🟢 Live" : "📦 Archived";
          lines.push({ text: `  ┌── ${proj.title}`, type: "success" });
          lines.push({ text: `  │   ${proj.description}`, type: "info" });
          lines.push({
            text: `  │   🛠  ${proj.techStack.slice(0, 5).join(", ")}${proj.techStack.length > 5 ? " ..." : ""}`,
            type: "success",
          });
          const links: string[] = [];
          if (proj.liveUrl) links.push(`🔗 ${proj.liveUrl}`);
          if (proj.github) links.push(`🐙 ${proj.github}`);
          if (links.length > 0) {
            lines.push({ text: `  │   ${links[0]}`, type: "info" });
            if (links[1])
              lines.push({ text: `  │   ${links[1]}`, type: "info" });
          }
          lines.push({ text: `  └── ${status}`, type: "info" });
          if (i < projectsData.length - 1) {
            lines.push({ text: "", type: "info" });
          }
        });
        setTerminalOutput([]);
        setTerminalInput("");
        lines.forEach((line, i) => {
          setTimeout(() => {
            setTerminalOutput((prev) => [...prev, line]);
          }, i * 40);
        });
        return;
      }

      // achievements
      if (cmd === "achievements" || cmd === "achieve" || cmd === "awards") {
        const lines: TerminalLine[] = [
          { text: "┌─────────────────────────────────────────┐", type: "info" },
          { text: "│  🏆  Achievements                       │", type: "info" },
          { text: "└─────────────────────────────────────────┘", type: "info" },
          { text: "", type: "info" },
        ];
        achievementsData.forEach((ach, i) => {
          lines.push({ text: `  ┌── ${ach.title}`, type: "success" });
          lines.push({
            text: `  │   🏅 ${ach.platform}  •  📅 ${ach.year}`,
            type: "info",
          });
          if (ach.url) {
            lines.push({ text: `  │   🔗 ${ach.url}`, type: "info" });
          }
          lines.push({ text: `  └──`, type: "info" });
          if (i < achievementsData.length - 1) {
            lines.push({ text: "", type: "info" });
          }
        });
        setTerminalOutput([]);
        setTerminalInput("");
        lines.forEach((line, i) => {
          setTimeout(() => {
            setTerminalOutput((prev) => [...prev, line]);
          }, i * 50);
        });
        return;
      }

      // contact
      if (cmd === "contact" || cmd === "reach" || cmd === "phone") {
        setTerminalOutput([
          { text: "┌─────────────────────────────────────────┐", type: "info" },
          { text: "│  📨  Contact                            │", type: "info" },
          { text: "└─────────────────────────────────────────┘", type: "info" },
          { text: "", type: "info" },
          { text: `  📧 Email     ${personalInfo.email}`, type: "success" },
          { text: `  📱 Phone     ${personalInfo.phone}`, type: "success" },
          { text: `  📍 Location  ${personalInfo.location}`, type: "info" },
          {
            text: `  🔗 LinkedIn  ${personalInfo.linkedinUrl}`,
            type: "success",
          },
          { text: `  🐙 GitHub    ${personalInfo.githubUrl}`, type: "success" },
          { text: `  🌐 Website   ${personalInfo.website}`, type: "success" },
        ]);
        setTerminalInput("");
        return;
      }

      // ping
      if (cmd === "ping" || cmd.startsWith("ping ")) {
        const target = cmd === "ping" ? personalInfo.website : raw.slice(5);
        setTerminalOutput([{ text: `PING ${target}...`, type: "info" }]);
        setTerminalInput("");
        const pings: TerminalLine[] = [];
        let i = 0;
        const count = 5;
        const interval = setInterval(() => {
          if (i >= count) {
            clearInterval(interval);
            setTerminalOutput((prev) => [
              ...prev,
              { text: "", type: "info" },
              { text: `--- ${target} ping statistics ---`, type: "info" },
              {
                text: `${count} packets transmitted, ${count} received, 0% packet loss`,
                type: "success",
              },
              {
                text: `rtt avg = ${(pings.reduce((s, p) => s + parseFloat(p.text.match(/time=([\d.]+)/)?.[1] || "0"), 0) / count).toFixed(1)}ms`,
                type: "success",
              },
            ]);
            return;
          }
          const latency = (Math.random() * 40 + 5).toFixed(1);
          const line: TerminalLine = {
            text: `64 bytes from ${target}: icmp_seq=${i + 1} ttl=56 time=${latency}ms`,
            type: "success",
          };
          pings.push(line);
          setTerminalOutput((prev) => [...prev, line]);
          i++;
        }, 600);
        return;
      }

      // sudo
      if (cmd.startsWith("sudo")) {
        const responses = [
          "Nice try! 😏 You don't have root access here.",
          "🔒 Permission denied. This isn't your terminal... oh wait.",
          "⚠️  sudo: unauthorized. But I admire the ambition.",
          "🙅 Access denied. Not even sudo can save you here.",
          '"With great power comes great responsibility" — denied.',
        ];
        setTerminalOutput([
          {
            text: responses[Math.floor(Math.random() * responses.length)],
            type: "error",
          },
        ]);
        setTerminalInput("");
        return;
      }

      // ascii
      if (cmd === "ascii" || cmd === "banner") {
        const art = [
          " █████  ██████  ██  ██ ██ ███████ ██  ██ ███████ ██  ██",
          "██   ██ ██   ██ ██  ██ ██ ██      ██  ██ ██      ██ ██ ",
          "███████ ██████  ██████ ██ ███████ ██████ █████   ████  ",
          "██   ██ ██   ██ ██  ██ ██      ██ ██  ██ ██      ██ ██ ",
          "██   ██ ██████  ██  ██ ██ ███████ ██  ██ ███████ ██  ██",
          "",
          "██    ██  █████  ██████   █████  ██    ██",
          " ██  ██  ██   ██ ██   ██ ██   ██ ██    ██",
          "  ████   ███████ ██   ██ ███████ ██    ██",
          "   ██    ██   ██ ██   ██ ██   ██  ██  ██ ",
          "   ██    ██   ██ ██████  ██   ██   ████  ",
        ];
        const lines: TerminalLine[] = [
          { text: "", type: "info" },
          ...art.map((line) => ({ text: line, type: "success" as const })),
          { text: "", type: "info" },
          { text: `  ${personalInfo.title}`, type: "info" },
          { text: `  ${personalInfo.website}`, type: "info" },
          { text: "", type: "info" },
        ];
        setTerminalOutput([]);
        setTerminalInput("");
        lines.forEach((line, i) => {
          setTimeout(() => {
            setTerminalOutput((prev) => [...prev, line]);
          }, i * 60);
        });
        return;
      }

      // cd with invalid path
      if (cmd.startsWith("cd ")) {
        setTerminalOutput([
          {
            text: `bash: cd: ${raw.slice(3)}: No such directory`,
            type: "error",
          },
        ]);
        setTerminalInput("");
        return;
      }

      // unknown command
      setTerminalOutput([
        {
          text: `bash: ${raw.split(" ")[0]}: command not found`,
          type: "error",
        },
      ]);
      setTerminalInput("");
    }
  };

  const outputRenderer = (lines: TerminalLine[], size: "sm" | "lg") => (
    <AnimatePresence mode="wait">
      {lines.length > 0 && (
        <motion.div
          initial={size === "sm" ? { opacity: 0, y: -4 } : { opacity: 0 }}
          animate={size === "sm" ? { opacity: 1, y: 0 } : { opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={
            size === "sm"
              ? "mt-1.5 space-y-0.5 max-h-[150px] overflow-y-auto no-scrollbar"
              : "mb-3 space-y-0.5"
          }
        >
          {lines.map((line, i) => (
            <p
              key={i}
              className={`${size === "sm" ? "text-[10px]" : "text-xs"} font-mono select-none whitespace-pre-wrap ${size === "sm" ? "break-all" : "break-words"} ${
                line.type === "error"
                  ? "text-red-400"
                  : line.type === "success"
                    ? "text-emerald-400/70"
                    : "text-gray-400"
              }`}
            >
              {line.text}
            </p>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );

  const cursorBlock = (
    active: boolean,
    inputLength: number,
    small?: boolean,
  ) => (
    <span
      className="absolute top-0 h-full flex items-center pointer-events-none"
      style={{ left: `${inputLength * 0.55}em` }}
    >
      <span
        className={`inline-block w-[7px] h-[15px] ${
          active && showCursor ? "bg-emerald-400/80" : "bg-transparent"
        } transition-opacity duration-75`}
      />
    </span>
  );

  return (
    <>
      {/* Inline (mini) terminal */}
      {!hideInline && (
        <div
          className="w-full max-w-[260px] rounded-lg overflow-x-hidden border border-gray-300/50 dark:border-white/10 shadow-lg shadow-black/5 dark:shadow-black/30"
          onClick={(e) => {
            e.stopPropagation();
            setTerminalActive(true);
            inputRef.current?.focus();
          }}
        >
          {/* Title bar */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-200/80 dark:bg-white/[0.06] border-b border-gray-300/40 dark:border-white/[0.06]">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-400/80" />
            <span className="flex-1 text-center text-[9px] font-mono text-gray-400 dark:text-white/20 -ml-6">
              terminal
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setTerminalFullscreen(true);
                setTimeout(() => fullscreenInputRef.current?.focus(), 100);
              }}
              className="text-gray-400 dark:text-white/20 hover:text-gray-600 dark:hover:text-white/50 transition-colors"
            >
              <FiMaximize2 size={10} />
            </button>
          </div>
          {/* Terminal body */}
          <div className="bg-gray-900 dark:bg-[#0d1117] px-3 py-2.5 cursor-text">
            <div className="flex items-center gap-1.5 text-sm font-mono">
              <span className="text-emerald-400 select-none">❯</span>
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  onKeyDown={handleTerminalKeyDown}
                  onFocus={() => setTerminalActive(true)}
                  onBlur={() => setTerminalActive(false)}
                  placeholder="cd portfolio"
                  spellCheck={false}
                  autoComplete="off"
                  className="w-full bg-transparent text-emerald-300 font-mono text-sm outline-none placeholder:text-gray-600 caret-transparent"
                  onClick={(e) => e.stopPropagation()}
                />
                {cursorBlock(terminalActive, terminalInput.length)}
              </div>
            </div>
            <p className="text-[9px] font-mono text-gray-600 mt-1.5 select-none">
              type help for commands
            </p>
            {outputRenderer(terminalOutput, "sm")}
          </div>
        </div>
      )}

      {/* Fullscreen terminal overlay — portaled to body to escape parent transform/overflow */}
      {createPortal(
        <AnimatePresence>
          {terminalFullscreen && (
            <motion.div
              className="fixed inset-0 z-[100] flex flex-col bg-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                className="w-full h-full flex flex-col overflow-hidden"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                {/* Title bar */}
                <div className="flex items-center gap-1.5 px-4 py-2.5 bg-[#1a1a2e] border-b border-white/[0.06]">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setTerminalFullscreen(false);
                    }}
                    className="w-3 h-3 rounded-full bg-red-400/80 hover:bg-red-400 transition-colors"
                  />
                  <span className="w-3 h-3 rounded-full bg-yellow-400/80" />
                  <span className="w-3 h-3 rounded-full bg-green-400/80" />
                  <span className="flex-1 text-center text-[11px] font-mono text-white/25">
                    {personalInfo.name.toLowerCase().replace(/\s/g, "")} —
                    terminal
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setTerminalFullscreen(false);
                    }}
                    className="text-white/20 hover:text-white/50 transition-colors"
                  >
                    <FiMinimize2 size={12} />
                  </button>
                </div>
                {/* Terminal body */}
                <div
                  className="bg-[#0d1117] px-4 py-4 cursor-text flex-1 overflow-y-auto"
                  onClick={() => fullscreenInputRef.current?.focus()}
                >
                  {/* Welcome message */}
                  <p className="text-xs font-mono text-gray-500 mb-1">
                    Welcome to {personalInfo.name}'s terminal
                  </p>
                  <p className="text-xs font-mono text-gray-600 mb-4">
                    Type <span className="text-emerald-400/60">help</span> to
                    see available commands
                  </p>

                  {/* Output */}
                  {outputRenderer(terminalOutput, "lg")}

                  {/* Input line */}
                  <div className="flex items-center gap-2 text-sm font-mono">
                    <span className="text-emerald-400 select-none">❯</span>
                    <div className="relative flex-1">
                      <input
                        ref={fullscreenInputRef}
                        type="text"
                        value={terminalInput}
                        onChange={(e) => setTerminalInput(e.target.value)}
                        onKeyDown={handleTerminalKeyDown}
                        onFocus={() => setTerminalActive(true)}
                        onBlur={() => setTerminalActive(false)}
                        placeholder="type a command..."
                        spellCheck={false}
                        autoComplete="off"
                        className="w-full bg-transparent text-emerald-300 font-mono text-sm outline-none placeholder:text-gray-700 caret-transparent"
                      />
                      {cursorBlock(terminalActive, terminalInput.length)}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
});

InteractiveTerminal.displayName = "InteractiveTerminal";

export default InteractiveTerminal;
