import { useState, useMemo } from "react";
import { gitCheatsheet } from "@/config/gitCheatsheetData";
import { Input } from "@/components/ui/input";
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

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={handleCopy}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 p-1 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
          >
            {copied ? <FiCheck size={12} /> : <FiCopy size={12} />}
          </button>
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

export default function GitCheatsheet() {
  const [search, setSearch] = useState("");
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());
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
  }, [search]);

  const totalCommands = filtered.reduce((acc, s) => acc + s.commands.length, 0);

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

      <div className="max-w-5xl mx-auto mt-14 px-4 pb-12">
        {/* Sticky header */}
        <div className="sticky top-14 z-20 bg-background/80 backdrop-blur-lg -mx-4 px-4 pt-3 pb-3">
          <div className="flex items-center justify-between max-w-5xl mx-auto mb-2">
            <h1 className="text-xl font-bold tracking-tight">Git Cheatsheet</h1>
            <span className="text-xs text-muted-foreground">
              {totalCommands} command{totalCommands !== 1 && "s"}
            </span>
          </div>
          <div className="relative max-w-5xl mx-auto">
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
          <div className="flex flex-wrap gap-1.5 mt-2 max-w-5xl mx-auto">
            {gitCheatsheet.map((section) => (
              <button
                key={section.category}
                onClick={() =>
                  document
                    .getElementById(`cat-${section.category}`)
                    ?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
                className="shrink-0 flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors cursor-pointer"
              >
                <span className="text-emerald-600 dark:text-emerald-400">
                  {categoryIcons[section.category] ?? <VscTerminal size={11} />}
                </span>
                {section.category}
              </button>
            ))}
          </div>
        </div>

        {/* Tables */}
        <div className="mt-4 space-y-6 max-w-5xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-sm text-muted-foreground">
                No commands match your search.
              </p>
            </div>
          ) : (
            filtered.map((section) => (
              <div
                key={section.category}
                id={`cat-${section.category}`}
                className="scroll-mt-52"
              >
                {/* Category label */}
                <div
                  className="flex items-center justify-between gap-2 mb-2 cursor-pointer select-none group/header"
                  onClick={() => toggleCollapse(section.category)}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600 dark:text-emerald-400">
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
                  className={`grid grid-cols-1 sm:grid-cols-2 gap-3 ${collapsed.has(section.category) ? "hidden" : ""}`}
                >
                  {section.commands.map((cmd, i) => (
                    <div
                      key={i}
                      className="group relative flex flex-col gap-2 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-card p-3 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
                    >
                      {/* Top row: command + copy */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1 min-w-0">
                          <code className="text-base font-mono font-semibold text-emerald-600 dark:text-emerald-400 break-all">
                            <Highlight text={cmd.command} query={search} />
                          </code>
                          {cmd.danger && (
                            <span className="inline-flex items-center text-[10px] text-red-500 border border-red-500/30 bg-red-500/10 rounded px-1.5 py-0.5 leading-none font-medium shrink-0">
                              ⚠ destructive
                            </span>
                          )}
                        </div>
                        <div className="shrink-0 mt-0.5">
                          <CopyButton text={cmd.command} />
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        <Highlight text={cmd.description} query={search} />
                      </p>

                      {/* Example */}
                      {cmd.example && (
                        <div className="rounded-md bg-neutral-950 dark:bg-neutral-900 border border-neutral-800 px-3 py-2">
                          <span className="text-[10px] text-neutral-500 uppercase tracking-widest select-none block mb-1">
                            example
                          </span>
                          <code className="text-[12px] font-mono text-neutral-300 leading-snug break-all">
                            <Highlight text={cmd.example} query={search} />
                          </code>
                        </div>
                      )}
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
