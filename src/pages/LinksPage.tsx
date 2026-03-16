import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import {
  FiGithub,
  FiLinkedin,
  FiMail,
  FiYoutube,
  FiInstagram,
  FiSun,
  FiMoon,
  FiExternalLink,
  FiArrowUp,
} from "react-icons/fi";
import {
  SiLeetcode,
  SiBehance,
  SiFacebook,
  SiSnapchat,
  SiGoogleplay,
  SiGeeksforgeeks,
  SiMedium,
} from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { personalInfo, socialLinksData } from "@/config/data";
import { useTheme } from "@/components/theme-provider";
import { Switch } from "@/components/ui/switch";
import { ScrollProgress } from "@/components/magicui/scroll-progress";

// ─── Icon mapping ───────────────────────────────────────────────────────────

const socialIconMap: Record<string, React.ReactNode> = {
  LinkedIn: <FiLinkedin size={18} />,
  GitHub: <FiGithub size={18} />,
  LeetCode: <SiLeetcode size={18} />,
  GeeksforGeeks: <SiGeeksforgeeks size={18} />,
  Medium: <SiMedium size={18} />,
  Instagram: <FiInstagram size={18} />,
  YouTube: <FiYoutube size={18} />,
  Twitter: <FaXTwitter size={18} />,
  Facebook: <SiFacebook size={18} />,
  Snapchat: <SiSnapchat size={18} />,
  Behance: <SiBehance size={18} />,
  "Play Store": <SiGoogleplay size={18} />,
};

// ─── Link Data ──────────────────────────────────────────────────────────────

interface LinkItem {
  label: string;
  url: string;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  description?: string;
}

interface LinkSection {
  title: string;
  gradient: string;
  glowColor: string;
  links: LinkItem[];
}

const socialIcons = socialLinksData
  .filter((l) => l.title in socialIconMap)
  .map((l) => ({
    icon: socialIconMap[l.title],
    url: l.url,
    label: l.title,
  }));

// Add email separately (not from socialLinksData)
socialIcons.push({
  icon: <FiMail size={18} />,
  url: `mailto:${personalInfo.email}`,
  label: "Email",
});

// Helper to look up URL from socialLinksData by title
const getUrl = (title: string) =>
  socialLinksData.find((l) => l.title === title)?.url ?? "#";

const linkSections: LinkSection[] = [
  {
    title: "Portfolio",
    gradient: "from-purple-500 via-violet-500 to-indigo-500",
    glowColor: "purple",
    links: [
      {
        label: "GitHub",
        url: getUrl("GitHub"),
        icon: <FiGithub size={20} />,
        color: "group-hover:text-purple-500",
        bgColor:
          "group-hover:bg-purple-500/10 dark:group-hover:bg-purple-500/15",
        description: "Open source projects & contributions",
      },
      {
        label: "LeetCode",
        url: getUrl("LeetCode"),
        icon: <SiLeetcode size={20} />,
        color: "group-hover:text-amber-500",
        bgColor: "group-hover:bg-amber-500/10 dark:group-hover:bg-amber-500/15",
        description: "Problem solving & competitive programming",
      },
      {
        label: "Graphic Designing",
        url: getUrl("Behance"),
        icon: <SiBehance size={20} />,
        color: "group-hover:text-blue-500",
        bgColor: "group-hover:bg-blue-500/10 dark:group-hover:bg-blue-500/15",
        description: "Creative designs on Behance",
      },
      {
        label: "Video Editing",
        url: "https://www.youtube.com/playlist?list=PLBegnvRmQm8RDdUwVKuV9kEYLqr0jOdeg",
        icon: <FiYoutube size={20} />,
        color: "group-hover:text-red-500",
        bgColor: "group-hover:bg-red-500/10 dark:group-hover:bg-red-500/15",
        description: "Video editing showcase playlist",
      },
    ],
  },
  {
    title: "Contributions",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    glowColor: "emerald",
    links: [
      {
        label: "edorbit",
        url: "https://edorbit.in/",
        icon: <FiExternalLink size={20} />,
        color: "group-hover:text-emerald-500",
        bgColor:
          "group-hover:bg-emerald-500/10 dark:group-hover:bg-emerald-500/15",
        description: "Educational platform",
      },
      {
        label: "Devil Gang Production",
        url: "https://linktr.ee/devilgang",
        icon: <FiExternalLink size={20} />,
        color: "group-hover:text-rose-500",
        bgColor: "group-hover:bg-rose-500/10 dark:group-hover:bg-rose-500/15",
        description: "Creative production house",
      },
      {
        label: "CYBiRD",
        url: "https://www.youtube.com/channel/UChis_4lb35J6cYNfIGzfr2g",
        icon: <FiYoutube size={20} />,
        color: "group-hover:text-red-500",
        bgColor: "group-hover:bg-red-500/10 dark:group-hover:bg-red-500/15",
        description: "YouTube channel",
      },
    ],
  },
];

// ─── Component ──────────────────────────────────────────────────────────────

export default function LinksPage() {
  const { theme, setTheme } = useTheme();
  const isDark =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  useEffect(() => {
    document.title = `Links | ${personalInfo.name}`;
    return () => {
      document.title = "Abhishek Kumar Yadav";
    };
  }, []);

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 text-gray-900 dark:text-white selection:bg-purple-500/30 selection:text-white font-['Inter',_sans-serif] antialiased">
      <ScrollProgress className="h-[3px] bg-gradient-to-r from-purple-500 via-emerald-500 to-blue-500" />

      {/* Fixed theme toggle */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-1 px-3 py-2 rounded-full bg-white/80 dark:bg-slate-950/80 border border-gray-200/60 dark:border-white/[0.06] backdrop-blur-xl shadow-sm">
        <FiSun size={11} className="text-gray-500 dark:text-gray-400" />
        <Switch
          checked={isDark}
          onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
          className="h-4 w-7 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input [&_span]:h-3 [&_span]:w-3 [&_span]:data-[state=checked]:translate-x-3"
        />
        <FiMoon size={11} className="text-gray-500 dark:text-gray-400" />
      </div>

      {/* Background noise texture */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.015]">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIj48ZmVUdXJidWxlbmNlIHR5cGU9ImZyYWN0YWxOb2lzZSIgYmFzZUZyZXF1ZW5jeT0iLjc1Ii8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsdGVyPSJ1cmwoI2EpIi8+PC9zdmc+')] " />
      </div>

      {/* Hero Section */}
      <div ref={heroRef} className="relative pt-14 pb-10 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-purple-50 to-gray-50 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-purple-200/40 dark:from-purple-800/20 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-emerald-200/40 dark:from-emerald-800/20 via-transparent to-transparent" />
          <motion.div
            className="absolute top-10 left-10 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl"
            animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-10 right-10 w-56 h-56 bg-emerald-500/10 rounded-full blur-3xl"
            animate={{ x: [0, -25, 0], y: [0, -30, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 max-w-xl mx-auto px-6"
        >
          {/* Pill badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-4"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-[11px] font-medium tracking-wide uppercase backdrop-blur-sm">
              Connect with me
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-1.5"
          >
            <span className="relative inline-block overflow-hidden">
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 dark:from-white dark:via-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
                {personalInfo.name}
              </span>
              {/* Soft shimmer wave */}
              <span
                className="absolute inset-0 pointer-events-none animate-[shimmer_4s_ease-in-out_infinite]"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, transparent 35%, rgba(255,255,255,0.12) 45%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.12) 55%, transparent 65%, transparent 100%)",
                  backgroundSize: "300% 100%",
                }}
                aria-hidden
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-500 dark:text-gray-400 text-[13px] font-light text-center"
          >
            {personalInfo.title} • {personalInfo.location}
          </motion.p>

          {/* Gradient divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className="flex justify-center mt-5"
          >
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
          </motion.div>
        </motion.div>
      </div>

      {/* Link Sections */}
      <div className="relative max-w-xl mx-auto px-6 pb-24 space-y-16">
        {linkSections.map((section, sectionIdx) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-50px" }}
            transition={{ duration: 0.6, delay: sectionIdx * 0.1 }}
          >
            {/* Section header */}
            <div className="flex items-center gap-3 mb-6">
              <div
                className={`h-px flex-1 bg-gradient-to-r ${section.gradient} opacity-20`}
              />
              <h2 className="text-xs font-medium tracking-[0.2em] uppercase text-gray-400 dark:text-gray-500">
                {section.title}
              </h2>
              <div
                className={`h-px flex-1 bg-gradient-to-l ${section.gradient} opacity-20`}
              />
            </div>

            {/* Link cards */}
            <div className="space-y-3">
              {section.links.map((link, linkIdx) => (
                <motion.a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ margin: "-30px" }}
                  transition={{
                    duration: 0.4,
                    delay: linkIdx * 0.08,
                  }}
                  whileHover={{ x: 4, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="group relative flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-white/[0.03] border border-gray-200/60 dark:border-white/[0.06] hover:border-gray-300 dark:hover:border-white/[0.12] transition-all duration-300 hover:shadow-lg hover:shadow-black/[0.03] dark:hover:shadow-none overflow-hidden"
                >
                  {/* Subtle hover glow */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${section.gradient} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-300`}
                  />

                  {/* Icon */}
                  <div
                    className={`relative flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center bg-gray-100 dark:bg-white/[0.05] text-gray-500 dark:text-gray-400 ${link.color} ${link.bgColor} transition-all duration-300`}
                  >
                    {link.icon}
                  </div>

                  {/* Text */}
                  <div className="relative flex-1 min-w-0">
                    <div className="text-[15px] font-medium text-gray-900 dark:text-white tracking-tight">
                      {link.label}
                    </div>
                    {link.description && (
                      <div className="text-[12px] text-gray-400 dark:text-gray-500 font-light mt-0.5 truncate">
                        {link.description}
                      </div>
                    )}
                  </div>

                  {/* Arrow */}
                  <FiExternalLink
                    size={14}
                    className="relative flex-shrink-0 text-gray-300 dark:text-gray-600 group-hover:text-gray-500 dark:group-hover:text-gray-400 transition-colors"
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex justify-center"
        >
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-8"
        >
          {/* Social icons */}
          <div className="flex justify-center flex-wrap gap-2">
            {socialIcons.map((social, i) => (
              <motion.a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ margin: "-30px" }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: i * 0.04,
                }}
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white dark:bg-white/[0.05] border border-gray-200/60 dark:border-white/[0.08] text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-white/20 transition-colors shadow-sm hover:shadow-md"
                title={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>

          <p className="text-[13px] text-gray-400 dark:text-gray-500 font-light">
            Built with{" "}
            <span className="bg-gradient-to-r from-purple-500 to-emerald-500 bg-clip-text text-transparent font-medium">
              React + Tailwind
            </span>
          </p>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200/60 dark:border-white/[0.06] text-gray-400 dark:text-gray-500 text-[12px] font-light hover:text-gray-600 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-white/[0.12] transition-all"
          >
            <FiArrowUp size={12} />
            Back to top
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
