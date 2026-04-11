import axios from "axios";
import { useEffect, useState } from "react";
import { ChartConfig } from "@/components/ui/chart";
import ChartComponent from "@/components/LeetCodeChart";
import {
  ProfileResponse,
  SolvedProblemsResponse,
} from "@/types/LeetCodeAPIProps";
import { motion } from "framer-motion";

const leetcodeChartConfig = {
  total: { label: "Total Solved" },
  easy: { label: "Easy", color: "#34D399" },
  medium: { label: "Medium", color: "#6366F1" },
  hard: { label: "Hard", color: "#e2366f" },
} satisfies ChartConfig;

export default function LeetCodeStatsSection() {
  const [ranking, setRanking] = useState<number | null>(null);
  const [solvedProblems, setSolvedProblems] =
    useState<SolvedProblemsResponse | null>(null);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await axios.get<ProfileResponse>(
          "https://alfa-leetcode-api.onrender.com/mrabk121",
        );
        setRanking(response.data.ranking);
      } catch (error) {
        console.error("Error fetching ranking:", error);
      }
    };

    const fetchSolvedProblems = async () => {
      try {
        const response = await axios.get<SolvedProblemsResponse>(
          "https://alfa-leetcode-api.onrender.com/mrabk121/solved",
        );
        setSolvedProblems(response.data);
      } catch (error) {
        console.error("Error fetching solved problems:", error);
      }
    };

    fetchRanking();
    fetchSolvedProblems();
  }, []);

  if (!solvedProblems) return null;

  const stats = [
    { label: "Total Solved", value: String(solvedProblems.solvedProblem) },
    { label: "Global Rank", value: `#${ranking?.toLocaleString()}` },
    {
      label: "Easy",
      value: String(solvedProblems.easySolved),
      sub: "problems",
    },
    {
      label: "Medium",
      value: String(solvedProblems.mediumSolved),
      sub: "problems",
    },
    {
      label: "Hard",
      value: String(solvedProblems.hardSolved),
      sub: "problems",
    },
  ];

  return (
    <motion.div
      className="mt-8"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2
        className="text-lg mb-4 font-bold uppercase tracking-widest"
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        LeetCode Stats
      </motion.h2>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <ChartComponent
          description="Problems solved on LeetCode by difficulty."
          data={[
            { name: "Easy", value: solvedProblems.easySolved ?? 0 },
            { name: "Medium", value: solvedProblems.mediumSolved ?? 0 },
            { name: "Hard", value: solvedProblems.hardSolved ?? 0 },
          ]}
          config={leetcodeChartConfig}
        />
      </motion.div>

      {/* Stat cards — Apple minimal grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-px bg-border rounded-2xl overflow-hidden border border-border mt-6">
        {stats.map(({ label, value, sub }, i) => (
          <motion.div
            key={label}
            className="bg-background hover:bg-muted/50 hover:[box-shadow:inset_0_2px_0_hsl(var(--primary)/0.6)] flex flex-col justify-between p-5 gap-3 cursor-default transition-all duration-200"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.35, delay: 0.05 * i }}
          >
            <span className="text-[11px] text-muted-foreground uppercase tracking-widest font-medium">
              {label}
            </span>
            <div>
              <motion.p
                className="text-xl font-semibold leading-tight tracking-tight"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.3, delay: 0.15 + i * 0.05 }}
              >
                {value}
              </motion.p>
              {sub && (
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  {sub}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
