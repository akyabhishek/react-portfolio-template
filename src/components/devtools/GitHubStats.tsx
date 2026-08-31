"use client";

import React, { useState, useCallback, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Cell,
  Pie,
  PieChart,
  Label,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import GitHubCalendar from "react-github-calendar";
import { personalInfo } from "@/config/data";
import { useTheme } from "@/components/theme-provider";
import { toast } from "@/hooks/use-toast";
import {
  FiSearch,
  FiStar,
  FiGitPullRequest,
  FiGitCommit,
  FiUsers,
  FiBook,
  FiAlertCircle,
  FiExternalLink,
} from "react-icons/fi";
import { GoRepoForked, GoIssueOpened, GoCodeSquare } from "react-icons/go";

// ─── Types ──────────────────────────────────────────────────────────────────

interface GitHubUser {
  login: string;
  avatar_url: string;
  html_url: string;
  name: string | null;
  bio: string | null;
  company: string | null;
  location: string | null;
  blog: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
}

interface GitHubRepo {
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  fork: boolean;
  topics: string[];
}

interface AggregatedStats {
  totalStars: number;
  totalForks: number;
  totalPRs: number;
  totalIssues: number;
  totalCommits: number;
  languages: Record<string, number>;
  topRepos: GitHubRepo[];
  originalRepoCount: number;
  forkedRepoCount: number;
  topTopics: { name: string; count: number }[];
}

// ─── Language Colors ────────────────────────────────────────────────────────

const LANG_COLORS: Record<string, string> = {
  javascript: "#FACC15",
  typescript: "#38BDF8",
  python: "#22D3EE",
  java: "#F43F5E",
  go: "#06B6D4",
  rust: "#F97316",
  "c++": "#F472B6",
  c: "#94A3B8",
  "c#": "#A78BFA",
  ruby: "#FB7185",
  php: "#818CF8",
  swift: "#FF6B6B",
  kotlin: "#C084FC",
  dart: "#2DD4BF",
  html: "#F97316",
  css: "#A78BFA",
  shell: "#4ADE80",
  vue: "#34D399",
  scss: "#F472B6",
  lua: "#818CF8",
  "jupyter notebook": "#FB923C",
};

function getLangColor(lang: string): string {
  return LANG_COLORS[lang.toLowerCase()] || "#94A3B8";
}

// ─── API Helpers ────────────────────────────────────────────────────────────

const GH_API = "https://api.github.com";

async function fetchJSON<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: { Accept: "application/vnd.github+json" },
  });
  if (res.status === 403) {
    const reset = res.headers.get("X-RateLimit-Reset");
    const resetAt = reset
      ? new Date(Number(reset) * 1000).toLocaleTimeString()
      : "soon";
    throw new Error(`Rate limited by GitHub. Resets at ${resetAt}.`);
  }
  if (res.status === 404) throw new Error("User not found.");
  if (res.status === 422)
    throw new Error("User not found or cannot be searched.");
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  return res.json();
}

async function fetchAllRepos(username: string): Promise<GitHubRepo[]> {
  const repos: GitHubRepo[] = [];
  let page = 1;
  while (true) {
    const batch = await fetchJSON<GitHubRepo[]>(
      `${GH_API}/users/${encodeURIComponent(username)}/repos?per_page=100&sort=stars&direction=desc&page=${page}`,
    );
    repos.push(...batch);
    if (batch.length < 100) break;
    page++;
  }
  return repos;
}

async function fetchSearchCount(query: string): Promise<number> {
  try {
    const data = await fetchJSON<{ total_count: number }>(
      `${GH_API}/search/issues?q=${encodeURIComponent(query)}&per_page=1`,
    );
    return data.total_count;
  } catch {
    return 0;
  }
}

// ─── Animation Variants ─────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 220, damping: 22 },
  },
};

const headerSlideInitial = { opacity: 0, x: -12 };
const headerSlideAnimate = {
  opacity: 1,
  x: 0,
  transition: { type: "spring", stiffness: 220, damping: 22 },
};

// ─── Stat Cell (Apple-minimal grid style) ───────────────────────────────────

function StatCell({
  icon,
  label,
  value,
  delay = 0,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  delay?: number;
}) {
  return (
    <motion.div
      className="group relative bg-background hover:bg-muted/30 hover:[box-shadow:inset_0_2px_0_hsl(var(--primary)/0.6)] flex items-start gap-4 p-5 transition-colors"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 220, damping: 22, delay }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(ellipse_at_20%_50%,hsl(var(--primary)/0.08)_0%,transparent_65%)]" />
      <div className="relative p-2 rounded-xl bg-muted group-hover:bg-primary/10 text-muted-foreground group-hover:text-primary transition-colors">
        <span className="text-lg">{icon}</span>
      </div>
      <div className="relative">
        <p className="text-[11px] text-muted-foreground uppercase tracking-widest font-medium">
          {label}
        </p>
        <p className="text-xl font-semibold leading-tight tracking-tight">
          {typeof value === "number" ? value.toLocaleString() : value}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────

const GitHubStats: React.FC = () => {
  const { theme } = useTheme();
  const resolvedScheme =
    theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : theme;
  const [username, setUsername] = useState(personalInfo.github);
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [stats, setStats] = useState<AggregatedStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetched, setFetched] = useState(false);

  const fetchStats = useCallback(async () => {
    const trimmed = username.trim();
    if (!trimmed) {
      toast({ title: "Enter a username", variant: "destructive" });
      return;
    }
    setLoading(true);
    setError(null);
    setUser(null);
    setStats(null);
    setFetched(false);

    try {
      // User profile is the only required call
      const userData = await fetchJSON<GitHubUser>(
        `${GH_API}/users/${encodeURIComponent(trimmed)}`,
      );

      // All other calls are best-effort — partial failures still show results
      const [repos, prCount, issueCount] = await Promise.all([
        fetchAllRepos(trimmed).catch((): GitHubRepo[] => []),
        fetchSearchCount(`author:${trimmed} type:pr`),
        fetchSearchCount(`author:${trimmed} type:issue`),
      ]);

      let totalCommits = 0;
      try {
        const commitRes = await fetch(
          `${GH_API}/search/commits?q=author:${encodeURIComponent(trimmed)}&per_page=1`,
          { headers: { Accept: "application/vnd.github.cloak-preview+json" } },
        );
        if (commitRes.ok) {
          const commitData = await commitRes.json();
          totalCommits = commitData.total_count;
        }
      } catch {
        totalCommits = 0;
      }

      const languages: Record<string, number> = {};
      const topicCounts: Record<string, number> = {};
      let totalStars = 0;
      let totalForks = 0;
      let originalRepoCount = 0;
      let forkedRepoCount = 0;

      for (const repo of repos) {
        totalStars += repo.stargazers_count;
        totalForks += repo.forks_count;
        if (repo.fork) {
          forkedRepoCount++;
        } else {
          originalRepoCount++;
        }
        if (repo.language) {
          languages[repo.language] = (languages[repo.language] || 0) + 1;
        }
        for (const topic of repo.topics || []) {
          topicCounts[topic] = (topicCounts[topic] || 0) + 1;
        }
      }

      const topTopics = Object.entries(topicCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 20)
        .map(([name, count]) => ({ name, count }));

      const topRepos = [...repos]
        .filter((r) => !r.fork)
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 8);

      setUser(userData);
      setStats({
        totalStars,
        totalForks,
        totalPRs: prCount,
        totalIssues: issueCount,
        totalCommits,
        languages,
        topRepos,
        originalRepoCount,
        forkedRepoCount,
        topTopics,
      });
      setFetched(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setError(msg);
      toast({ title: "Error", description: msg, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  }, [username]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") fetchStats();
  };

  // Build language chart data
  const langData = useMemo(
    () =>
      stats
        ? Object.entries(stats.languages)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 8)
            .map(([name, value]) => ({ name, value }))
        : [],
    [stats],
  );

  const langConfig: ChartConfig = {};
  for (const item of langData) {
    langConfig[item.name.toLowerCase()] = {
      label: item.name,
      color: getLangColor(item.name),
    };
  }

  const langTotal = langData.reduce((s, d) => s + d.value, 0);

  const radarData = useMemo(() => {
    if (!stats || !user) return [];
    return [
      {
        dim: "Commits",
        value: Math.min(stats.totalCommits, 1000),
        fullMark: 1000,
      },
      { dim: "PRs", value: Math.min(stats.totalPRs, 500), fullMark: 500 },
      { dim: "Issues", value: Math.min(stats.totalIssues, 500), fullMark: 500 },
      { dim: "Stars", value: Math.min(stats.totalStars, 1000), fullMark: 1000 },
      { dim: "Repos", value: Math.min(user.public_repos, 200), fullMark: 200 },
      { dim: "Followers", value: Math.min(user.followers, 500), fullMark: 500 },
    ];
  }, [stats, user]);

  return (
    <section className="max-w-screen-xl mx-auto p-4 space-y-8">
      {/* Page Header */}
      <motion.div initial={headerSlideInitial} animate={headerSlideAnimate}>
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground/80 mb-2">
          Developer Tool
        </p>
        <h2 className="text-xl font-bold tracking-tight">GitHub Stats</h2>
      </motion.div>

      {/* Username Input */}
      <motion.div
        className="flex gap-2 max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
      >
        <Input
          placeholder="GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKeyDown}
          className="rounded-xl"
        />
        <Button onClick={fetchStats} disabled={loading} className="rounded-xl">
          {loading ? (
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
          ) : (
            <FiSearch className="mr-1" />
          )}
          {loading ? "Loading..." : "Fetch"}
        </Button>
      </motion.div>

      {/* Error */}
      {error && (
        <motion.div
          className="flex items-center gap-2 text-destructive text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <FiAlertCircle />
          {error}
        </motion.div>
      )}

      {/* Results */}
      {fetched && user && stats && (
        <motion.div
          className="space-y-10"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* ─── Profile Card ─── */}
          <motion.div
            variants={fadeUp}
            className="rounded-3xl border border-border/50 bg-transparent backdrop-blur-xl overflow-hidden"
          >
            <div className="relative">
              <div
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage: `url(${user.avatar_url})`,
                  backgroundSize: "cover",
                  filter: "blur(34px)",
                }}
              />
              <div className="relative bg-gradient-to-br from-background/60 via-background/50 to-background/75 p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                  <img
                    src={user.avatar_url}
                    alt={user.login}
                    className="w-20 h-20 rounded-2xl border border-border/50 shadow-lg"
                  />
                  <div className="flex-1 text-center sm:text-left space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <h3 className="text-xl font-bold tracking-tight">
                        {user.name || user.login}
                      </h3>
                      <a
                        href={user.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 justify-center sm:justify-start"
                      >
                        @{user.login} <FiExternalLink className="inline" />
                      </a>
                    </div>
                    {user.bio && (
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {user.bio}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground justify-center sm:justify-start pt-1">
                      {user.company && <span>🏢 {user.company}</span>}
                      {user.location && <span>📍 {user.location}</span>}
                      {user.blog && (
                        <a
                          href={
                            user.blog.startsWith("http")
                              ? user.blog
                              : `https://${user.blog}`
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-primary transition-colors"
                        >
                          🔗 {user.blog}
                        </a>
                      )}
                      <span>
                        📅 Joined{" "}
                        {new Date(user.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ─── Stats Grid (Apple-minimal gap-px) ─── */}
          <motion.div variants={fadeUp}>
            <motion.div
              initial={headerSlideInitial}
              animate={headerSlideAnimate}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary/55 mb-1">
                Numbers
              </p>
              <h3 className="text-xl font-bold tracking-tight mb-4">
                At a Glance
              </h3>
            </motion.div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-px bg-border rounded-2xl overflow-hidden border border-border">
              <StatCell
                icon={<FiBook />}
                label="Repos"
                value={user.public_repos}
                delay={0}
              />
              <StatCell
                icon={<FiStar />}
                label="Stars"
                value={stats.totalStars}
                delay={0.05}
              />
              <StatCell
                icon={<GoRepoForked />}
                label="Forks"
                value={stats.totalForks}
                delay={0.1}
              />
              <StatCell
                icon={<FiGitCommit />}
                label="Commits"
                value={stats.totalCommits}
                delay={0.15}
              />
              <StatCell
                icon={<FiGitPullRequest />}
                label="PRs"
                value={stats.totalPRs}
                delay={0.2}
              />
              <StatCell
                icon={<GoIssueOpened />}
                label="Issues"
                value={stats.totalIssues}
                delay={0.25}
              />
              <StatCell
                icon={<GoCodeSquare />}
                label="Gists"
                value={user.public_gists}
                delay={0.3}
              />
              <StatCell
                icon={<FiUsers />}
                label="Followers"
                value={user.followers}
                delay={0.35}
              />
              <StatCell
                icon={<FiUsers />}
                label="Following"
                value={user.following}
                delay={0.4}
              />
            </div>
          </motion.div>

          {/* ─── Contribution Calendar ─── */}
          <motion.div variants={fadeUp}>
            <motion.div
              initial={headerSlideInitial}
              animate={headerSlideAnimate}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary/55 mb-1">
                Activity
              </p>
              <h3 className="text-xl font-bold tracking-tight mb-4">
                Contribution Calendar
              </h3>
            </motion.div>
            <div className="rounded-2xl border border-border bg-background p-5 overflow-x-auto flex justify-center">
              <GitHubCalendar
                username={user.login}
                colorScheme={resolvedScheme === "dark" ? "dark" : "light"}
                blockSize={13}
                blockMargin={4}
                fontSize={13}
              />
            </div>
          </motion.div>

          {/* ─── Charts Section ─── */}
          <motion.div variants={fadeUp}>
            <motion.div
              initial={headerSlideInitial}
              animate={headerSlideAnimate}
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary/55 mb-1">
                Breakdown
              </p>
              <h3 className="text-xl font-bold tracking-tight mb-4">
                Languages &amp; Distribution
              </h3>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Language Pie Chart */}
              {langData.length > 0 && (
                <motion.div
                  variants={fadeUp}
                  className="rounded-2xl border border-border overflow-hidden bg-background"
                >
                  <div className="p-5 pb-2">
                    <p className="text-[11px] text-muted-foreground uppercase tracking-widest font-medium">
                      Language Distribution
                    </p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      Across {user.public_repos} public repos
                    </p>
                  </div>
                  <div className="px-5 pb-5">
                    <ChartContainer
                      config={langConfig}
                      className="mx-auto aspect-square max-h-[260px]"
                    >
                      <PieChart>
                        <ChartTooltip
                          cursor={false}
                          content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                          data={langData}
                          dataKey="value"
                          nameKey="name"
                          innerRadius={55}
                          strokeWidth={4}
                        >
                          <Label
                            content={({ viewBox }) => {
                              if (
                                viewBox &&
                                "cx" in viewBox &&
                                "cy" in viewBox
                              ) {
                                return (
                                  <text
                                    x={viewBox.cx}
                                    y={viewBox.cy}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                  >
                                    <tspan
                                      x={viewBox.cx}
                                      y={viewBox.cy}
                                      className="fill-foreground text-2xl font-bold"
                                    >
                                      {langTotal}
                                    </tspan>
                                    <tspan
                                      x={viewBox.cx}
                                      y={(viewBox.cy || 0) + 20}
                                      className="fill-muted-foreground text-xs"
                                    >
                                      Repos
                                    </tspan>
                                  </text>
                                );
                              }
                            }}
                          />
                          {langData.map((entry, i) => (
                            <Cell
                              key={`cell-${i}`}
                              fill={getLangColor(entry.name)}
                            />
                          ))}
                        </Pie>
                      </PieChart>
                    </ChartContainer>
                    <div className="flex flex-wrap gap-2 mt-3 justify-center">
                      {langData.map((l) => (
                        <Badge
                          key={l.name}
                          variant="outline"
                          className="text-xs"
                        >
                          <span
                            className="inline-block w-2 h-2 rounded-full mr-1"
                            style={{ background: getLangColor(l.name) }}
                          />
                          {l.name} ({l.value})
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Repo Breakdown */}
              <motion.div
                variants={fadeUp}
                className="rounded-2xl border border-border overflow-hidden bg-background"
              >
                <div className="p-5 pb-2">
                  <p className="text-[11px] text-muted-foreground uppercase tracking-widest font-medium">
                    Repository Breakdown
                  </p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {stats.originalRepoCount} original &middot;{" "}
                    {stats.forkedRepoCount} forked
                  </p>
                </div>
                <div className="px-5 pb-5 space-y-3">
                  <div className="w-full h-3 rounded-full bg-muted overflow-hidden flex">
                    <div
                      className="h-full bg-primary/80 transition-all"
                      style={{
                        width: `${(stats.originalRepoCount / (user.public_repos || 1)) * 100}%`,
                      }}
                    />
                    <div
                      className="h-full bg-sky-400/80 transition-all"
                      style={{
                        width: `${(stats.forkedRepoCount / (user.public_repos || 1)) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="flex gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <span className="inline-block w-2 h-2 rounded-full bg-primary/80" />
                      Original ({stats.originalRepoCount})
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="inline-block w-2 h-2 rounded-full bg-sky-400/80" />
                      Forked ({stats.forkedRepoCount})
                    </span>
                  </div>

                  {/* Profile Radar nested here */}
                  {radarData.length > 0 && (
                    <div className="mt-4">
                      <p className="text-[11px] text-muted-foreground uppercase tracking-widest font-medium mb-2">
                        Profile Radar
                      </p>
                      <ResponsiveContainer width="100%" height={240}>
                        <RadarChart data={radarData}>
                          <PolarGrid stroke="hsl(var(--muted-foreground) / 0.15)" />
                          <PolarAngleAxis
                            dataKey="dim"
                            tick={{
                              fontSize: 11,
                              fill: "hsl(var(--muted-foreground))",
                            }}
                          />
                          <PolarRadiusAxis tick={false} axisLine={false} />
                          <Radar
                            dataKey="value"
                            stroke="hsl(var(--primary))"
                            fill="hsl(var(--primary))"
                            fillOpacity={0.2}
                            strokeWidth={2}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* ─── Top Repos ─── */}
          {stats.topRepos.length > 0 && (
            <motion.div variants={fadeUp}>
              <motion.div
                initial={headerSlideInitial}
                animate={headerSlideAnimate}
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary/55 mb-1">
                  Highlights
                </p>
                <h3 className="text-xl font-bold tracking-tight mb-4">
                  Top Repositories
                </h3>
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-border rounded-2xl overflow-hidden border border-border">
                {stats.topRepos.map((repo, i) => (
                  <motion.a
                    key={repo.name}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative bg-background hover:bg-muted/30 hover:[box-shadow:inset_0_2px_0_hsl(var(--primary)/0.6)] p-5 flex flex-col gap-2 transition-colors"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 220,
                      damping: 22,
                      delay: 0.05 * i,
                    }}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-[radial-gradient(ellipse_at_20%_50%,hsl(var(--primary)/0.08)_0%,transparent_65%)]" />
                    <div className="relative flex items-start justify-between gap-2">
                      <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                        {repo.name}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                        <FiStar className="text-amber-500" />
                        {repo.stargazers_count}
                      </div>
                    </div>
                    {repo.description && (
                      <p className="relative text-xs text-muted-foreground line-clamp-2">
                        {repo.description}
                      </p>
                    )}
                    <div className="relative flex gap-2 mt-auto">
                      {repo.language && (
                        <Badge variant="outline" className="text-xs">
                          <span
                            className="inline-block w-2 h-2 rounded-full mr-1"
                            style={{
                              background: getLangColor(repo.language),
                            }}
                          />
                          {repo.language}
                        </Badge>
                      )}
                      {repo.forks_count > 0 && (
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <GoRepoForked />
                          {repo.forks_count}
                        </span>
                      )}
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}

          {/* ─── Topics Cloud ─── */}
          {stats.topTopics.length > 0 && (
            <motion.div variants={fadeUp}>
              <motion.div
                initial={headerSlideInitial}
                animate={headerSlideAnimate}
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-primary/55 mb-1">
                  Interests
                </p>
                <h3 className="text-xl font-bold tracking-tight mb-4">
                  Top Topics
                </h3>
              </motion.div>
              <div className="rounded-2xl border border-border bg-background py-10 px-6">
                <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 max-w-lg mx-auto">
                  {(() => {
                    const sorted = [...stats.topTopics].sort(
                      (a, b) => b.count - a.count,
                    );
                    // Interleave: push biggest to center, smallest to edges
                    const centered: typeof sorted = [];
                    for (let i = 0; i < sorted.length; i++) {
                      if (i % 2 === 0) centered.push(sorted[i]);
                      else centered.unshift(sorted[i]);
                    }
                    const maxCount = sorted[0]?.count || 1;
                    return centered.map((t, i) => {
                      const ratio = t.count / maxCount;
                      const size = 0.72 + ratio * 0.9;
                      const opacity = 0.4 + ratio * 0.6;
                      return (
                        <motion.span
                          key={t.name}
                          initial={{
                            opacity: 0,
                            scale: 0.6,
                            filter: "blur(4px)",
                          }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                            filter: "blur(0px)",
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 240,
                            damping: 20,
                            delay: 0.04 * i,
                          }}
                          className="cursor-default transition-colors hover:text-primary leading-none"
                          style={{
                            fontSize: `${size}rem`,
                            opacity,
                            fontWeight: ratio > 0.5 ? 600 : 400,
                          }}
                          title={`${t.name} (${t.count} repos)`}
                        >
                          {t.name}
                        </motion.span>
                      );
                    });
                  })()}
                </div>
              </div>
            </motion.div>
          )}

          {/* Footer */}
          <p className="text-[11px] text-center text-muted-foreground/60 pt-2">
            Data from GitHub's public REST API · Unauthenticated requests
            limited to 60/hour
          </p>
        </motion.div>
      )}

      {/* Initial state */}
      {!fetched && !loading && !error && (
        <motion.div
          className="text-center py-20 text-muted-foreground"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 22 }}
        >
          <p className="text-lg font-medium tracking-tight">
            Enter a GitHub username and click Fetch
          </p>
          <p className="text-xs mt-1 text-muted-foreground/60">
            Uses GitHub's public REST API — no authentication required
          </p>
        </motion.div>
      )}
    </section>
  );
};

export default GitHubStats;
