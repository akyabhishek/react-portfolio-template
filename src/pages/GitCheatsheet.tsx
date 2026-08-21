import { useState, useMemo, useEffect } from "react";
import { gitCheatsheet, type GitCommand } from "@/config/gitCheatsheetData";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Helmet } from "react-helmet";
import {
  FiSearch,
  FiCopy,
  FiCheck,
  FiChevronDown,
  FiChevronUp,
  FiAlertTriangle,
  FiGrid,
  FiList,
} from "react-icons/fi";
import {
  VscGitCommit,
  VscGitMerge,
  VscGitPullRequest,
  VscRepoPush,
  VscHistory,
  VscSettingsGear,
  VscTag,
  VscArchive,
  VscDiscard,
  VscRepoForked,
  VscTerminal,
  VscQuestion,
} from "react-icons/vsc";

const categoryIcons: Record<string, React.ReactNode> = {
  "Setup & Configuration": <VscSettingsGear size={14} />,
  "Staging & Committing": <VscGitCommit size={14} />,
  Branching: <VscRepoForked size={14} />,
  "Merging & Rebasing": <VscGitMerge size={14} />,
  "Remote Repositories": <VscRepoPush size={14} />,
  "Undoing Changes": <VscDiscard size={14} />,
  Stashing: <VscArchive size={14} />,
  "Inspecting History": <VscHistory size={14} />,
  Tags: <VscTag size={14} />,
  "Cherry-pick & Clean": <VscGitPullRequest size={14} />,
  "Help & Documentation": <VscQuestion size={14} />,
};

// Shorter labels for the filter chips; full names remain in section headers.
const categoryShortLabels: Record<string, string> = {
  "Setup & Configuration": "Setup",
  "Staging & Committing": "Staging",
  Branching: "Branching",
  "Merging & Rebasing": "Merge & Rebase",
  "Remote Repositories": "Remotes",
  "Undoing Changes": "Undo",
  Stashing: "Stash",
  "Inspecting History": "History",
  Tags: "Tags",
  "Cherry-pick & Clean": "Cherry-pick",
  "Help & Documentation": "Help",
};

function CopyButton({
  copied,
  onCopy,
}: {
  copied: boolean;
  onCopy: () => void;
}) {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation();
              onCopy();
            }}
            className="h-6 w-6 p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150 text-muted-foreground hover:text-foreground [&_svg]:size-3"
          >
            {copied ? <FiCheck size={12} /> : <FiCopy size={12} />}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>{copied ? "Copied!" : "Copy"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query) return <>{text}</>;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const parts = text.split(new RegExp(`(${escaped})`, "gi"));
  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark
            key={i}
            className="bg-yellow-200 dark:bg-yellow-800/60 text-inherit rounded-sm px-0.5 not-italic"
          >
            {part}
          </mark>
        ) : (
          part
        ),
      )}
    </>
  );
}

function CommandCard({
  cmd,
  search,
  compact = false,
}: {
  cmd: GitCommand;
  search: string;
  compact?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(cmd.command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (compact) {
    return (
      <div
        onClick={handleCopy}
        className="group relative flex min-w-0 flex-col gap-0.5 border border-border bg-card p-2 hover:bg-accent/40 transition-colors cursor-pointer"
      >
        <div className="flex min-w-0 items-start justify-between gap-1.5">
          <div className="flex items-start gap-1 min-w-0">
            <code className="text-[13px] font-mono font-semibold text-foreground break-all">
              <Highlight text={cmd.command} query={search} />
            </code>
            {cmd.danger && (
              <FiAlertTriangle
                className="text-destructive shrink-0 mt-0.5"
                size={11}
              />
            )}
          </div>
          <div className="shrink-0 mt-0.5">
            <CopyButton copied={copied} onCopy={handleCopy} />
          </div>
        </div>
        <p className="min-w-0 text-[10.5px] text-muted-foreground break-words">
          <Highlight text={cmd.description} query={search} />
        </p>
      </div>
    );
  }

  return (
    <div
      onClick={handleCopy}
      className="group relative flex flex-col gap-1.5 p-3 hover:bg-accent/40 transition-colors cursor-pointer"
    >
      {/* Top row: command + copy */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 min-w-0">
          <code className="text-base font-mono font-semibold text-foreground break-all">
            <Highlight text={cmd.command} query={search} />
          </code>
          {cmd.danger && (
            <Badge
              variant="outline"
              className="text-[10px] px-1.5 py-0.5 gap-1 leading-none font-medium shrink-0 border-destructive/30 bg-destructive/10 text-destructive"
            >
              <FiAlertTriangle size={10} />
              destructive
            </Badge>
          )}
        </div>
        <div className="shrink-0 mt-0.5">
          <CopyButton copied={copied} onCopy={handleCopy} />
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-muted-foreground leading-relaxed">
        <Highlight text={cmd.description} query={search} />
      </p>

      {/* Example */}
      {cmd.example && (
        <div className="rounded-md bg-muted/50 border border-border px-2.5 py-1.5">
          <span className="text-[10px] text-muted-foreground uppercase tracking-widest select-none block mb-0.5">
            example
          </span>
          <code className="text-[12px] font-mono text-foreground/80 leading-snug break-all">
            <Highlight text={cmd.example} query={search} />
          </code>
        </div>
      )}
    </div>
  );
}

// Groups items into fixed-size rows so a connected grid can divide columns and rows separately.
function chunkPairs<T>(items: T[], size: number): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    rows.push(items.slice(i, i + size));
  }
  return rows;
}

const COMPACT_VIEW_STORAGE_KEY = "git-cheatsheet-compact-view";

export default function GitCheatsheet() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());
  const [compact, setCompact] = useState(
    () => localStorage.getItem(COMPACT_VIEW_STORAGE_KEY) === "true",
  );

  useEffect(() => {
    localStorage.setItem(COMPACT_VIEW_STORAGE_KEY, String(compact));
  }, [compact]);

  const toggleCollapse = (category: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      if (next.has(category)) next.delete(category);
      else next.add(category);
      return next;
    });
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return gitCheatsheet
      .filter(
        (section) => !selectedCategory || section.category === selectedCategory,
      )
      .map((section) => ({
        ...section,
        commands: section.commands.filter(
          (cmd) =>
            !q ||
            cmd.command.toLowerCase().includes(q) ||
            cmd.description.toLowerCase().includes(q) ||
            cmd.example?.toLowerCase().includes(q),
        ),
      }))
      .filter((section) => section.commands.length > 0);
  }, [search, selectedCategory]);

  const totalCommands = filtered.reduce((acc, s) => acc + s.commands.length, 0);

  const flatCommands = useMemo(
    () => filtered.flatMap((section) => section.commands),
    [filtered],
  );

  return (
    <>
      <Helmet>
        <title>Git Cheatsheet – Essential Git Commands for Developers</title>
        <meta
          name="description"
          content="A concise Git cheatsheet with the most important commands for setup, branching, merging, undoing changes, stashing, and more. Quick reference for everyday Git usage."
        />
        <meta
          name="keywords"
          content="git cheatsheet, git commands, git tutorial, git reference, branching, merging, rebase, stash, git for beginners"
        />
      </Helmet>

      <div
        className={`mx-auto mt-14 px-4 pb-12 ${compact ? "max-w-full" : "max-w-5xl"}`}
      >
        {/* Sticky header */}
        <div className="sticky top-14 z-20 bg-background/80 backdrop-blur-lg -mx-4 px-4 pt-3 pb-3">
          <div className="flex flex-wrap items-center gap-3 max-w-5xl mx-auto">
            <h1 className="text-xl font-bold tracking-tight shrink-0">
              Git Cheatsheet
            </h1>
            <span className="text-xs text-muted-foreground shrink-0">
              {totalCommands} command{totalCommands !== 1 && "s"}
            </span>
            <div className="relative flex-1 min-w-[160px]">
              <FiSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                size={14}
              />
              <Input
                type="text"
                placeholder="Search commands… (e.g., stash, rebase, push)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 h-9 text-sm"
              />
            </div>
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={compact ? "default" : "outline"}
                    size="icon"
                    aria-pressed={compact}
                    onClick={() => setCompact((c) => !c)}
                    className="h-9 w-9 shrink-0"
                  >
                    {compact ? <FiGrid size={14} /> : <FiList size={14} />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>{compact ? "Compact view" : "Detailed view"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Category filter chips (scrolls with content) */}
        <div className="flex flex-wrap gap-1.5 max-w-5xl mx-auto">
          {gitCheatsheet.map((section) => {
            const isActive = selectedCategory === section.category;
            return (
              <Button
                key={section.category}
                variant={isActive ? "default" : "secondary"}
                size="sm"
                title={section.category}
                onClick={() =>
                  setSelectedCategory((prev) =>
                    prev === section.category ? null : section.category,
                  )
                }
                className="h-7 rounded-full px-3 text-[11px] gap-1.5 [&_svg]:size-3"
              >
                {categoryIcons[section.category] ?? <VscTerminal size={11} />}
                {categoryShortLabels[section.category] ?? section.category}
              </Button>
            );
          })}
        </div>

        {/* Tables */}
        <div
          className={`mt-4 mx-auto ${compact ? "max-w-full" : "max-w-5xl space-y-6"}`}
        >
          {filtered.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-sm text-muted-foreground">
                No commands match your search.
              </p>
            </div>
          ) : compact ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              {flatCommands.map((cmd, i) => (
                <CommandCard key={i} cmd={cmd} search={search} compact />
              ))}
            </div>
          ) : (
            filtered.map((section) => (
              <div
                key={section.category}
                id={`cat-${section.category}`}
                className="scroll-mt-28"
              >
                {/* Category label */}
                <div
                  className="flex items-center justify-between gap-2 mb-2 px-3 py-2 rounded-lg bg-muted/50 cursor-pointer select-none group/header"
                  onClick={() => toggleCollapse(section.category)}
                >
                  <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center rounded-md bg-muted p-1.5 text-foreground [&_svg]:size-3.5">
                      {categoryIcons[section.category] ?? (
                        <VscTerminal size={14} />
                      )}
                    </span>
                    <h2 className="text-sm font-semibold">
                      {section.category}
                    </h2>
                    <span className="text-[11px] text-muted-foreground">
                      ({section.commands.length})
                    </span>
                  </div>
                  <span className="text-muted-foreground group-hover/header:text-foreground transition-colors">
                    {collapsed.has(section.category) ? (
                      <FiChevronDown size={14} />
                    ) : (
                      <FiChevronUp size={14} />
                    )}
                  </span>
                </div>

                <div
                  className={`flex flex-col rounded-2xl border border-border bg-card divide-y divide-border overflow-hidden ${collapsed.has(section.category) ? "hidden" : ""}`}
                >
                  {chunkPairs(section.commands, 2).map((row, rowIdx) => (
                    <div
                      key={rowIdx}
                      className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border"
                    >
                      {row.map((cmd, i) => (
                        <CommandCard key={i} cmd={cmd} search={search} />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
