import axios from "axios";
import { useEffect, useState } from "react";
import { GitHubRepo } from "@/types/GitHubAPIProps";
import { formatDate } from "@/utils/utils";
import { motion } from "framer-motion";

export default function SiteStatsSection() {
  const [gitHubData, setGitHubData] = useState<GitHubRepo>();

  useEffect(() => {
    const fetchGithub = async () => {
      try {
        const response = await axios.get(
          "https://api.github.com/repos/akyabhishek/react-portfolio-template",
        );
        setGitHubData(response.data);
      } catch (error) {
        console.error("Error fetching repository data:", error);
      }
    };
    fetchGithub();
  }, []);

  if (!gitHubData) return null;

  const stats = [
    { label: "Lines of Code", value: "38,000+", sub: "approx." },
    { label: "Human Written", value: "70%", sub: "of codebase" },
    { label: "AI Assisted", value: "30%", sub: "of codebase" },
    {
      label: "Stars",
      value: String(gitHubData.stargazers_count),
      sub: "on GitHub",
    },
    { label: "Forks", value: String(gitHubData.network_count), sub: "total" },
    {
      label: "Open Issues",
      value: String(gitHubData.open_issues),
      sub: "active",
    },
    { label: "Language", value: gitHubData.language, sub: "primary" },
    { label: "Repo Size", value: `${gitHubData.size} KB`, sub: "on disk" },
    {
      label: "Started",
      value: formatDate(gitHubData.created_at ?? ""),
      sub: "first commit",
    },
    {
      label: "Last Updated",
      value: formatDate(gitHubData.updated_at ?? ""),
      sub: "latest push",
    },
  ];

  return (
    <motion.div
      className="mt-12"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ type: "spring", stiffness: 240, damping: 22 }}
    >
      <motion.h2
        className="text-lg mb-6 font-bold uppercase tracking-widest"
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false }}
        transition={{
          type: "spring",
          stiffness: 240,
          damping: 22,
          delay: 0.08,
        }}
      >
        This Site
      </motion.h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-px bg-border rounded-2xl overflow-hidden border border-border">
        {stats.map(({ label, value, sub }, i) => (
          <motion.div
            key={label}
            className="bg-background hover:bg-muted/50 hover:[box-shadow:inset_0_2px_0_hsl(var(--primary)/0.6)] flex flex-col justify-between p-5 gap-3 cursor-default transition-[background-color,box-shadow] duration-200"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.35, delay: 0.05 * i }}
          >
            <span className="text-[11px] text-muted-foreground uppercase tracking-widest font-medium">
              {label}
            </span>
            <div>
              <p className="text-xl font-semibold leading-tight tracking-tight">
                {value}
              </p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{sub}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
