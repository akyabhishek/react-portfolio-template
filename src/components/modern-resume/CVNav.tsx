import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiDownload } from "react-icons/fi";
import { personalInfo } from "@/config/data";

const navItems = [
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Education", href: "#education" },
];

export default function CVNav() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sections = ["experience", "skills", "projects", "education"];

    const onScroll = () => {
      setScrolled(window.scrollY > 100);

      // Scroll-spy: find which section is currently in view
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {scrolled && (
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 z-50 px-4 py-3"
        >
          <div className="max-w-4xl mx-auto flex items-center justify-between px-5 py-2.5 rounded-2xl bg-white/80 dark:bg-slate-950/80 border border-gray-200/60 dark:border-white/[0.06] backdrop-blur-xl shadow-sm dark:shadow-none">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="text-sm font-semibold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent"
            >
              {personalInfo.name.split(" ")[0]}
            </a>

            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={`relative text-[13px] font-light tracking-wide transition-colors ${
                    activeSection === item.href.slice(1)
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {item.label}
                  {activeSection === item.href.slice(1) && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-purple-500 to-emerald-500"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                </a>
              ))}
            </div>

            <a
              href={personalInfo.resumePdfUrl}
              download
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gray-900 text-white dark:bg-white dark:text-slate-950 text-[11px] font-medium tracking-wide hover:shadow-lg hover:shadow-gray-900/10 dark:hover:shadow-white/10 transition-all duration-300"
            >
              <FiDownload size={12} />
              Resume
            </a>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
