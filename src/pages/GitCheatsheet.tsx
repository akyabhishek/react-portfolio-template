import { useState, useMemo } from "react";
import { gitCheatsheet } from "@/config/gitCheatsheetData";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Helmet } from "react-helmet";
import { FiSearch, FiCopy, FiCheck } from "react-icons/fi";
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

export default function GitCheatsheet() {
  const [search, setSearch] = useState("");

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
          <div className="flex items-center justify-between max-w-3xl mx-auto mb-2">
            <h1 className="text-xl font-bold tracking-tight">Git Cheatsheet</h1>
            <span className="text-xs text-muted-foreground">
              {totalCommands} command{totalCommands !== 1 && "s"}
            </span>
          </div>
          <div className="relative max-w-3xl mx-auto">
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
        </div>

        {/* Tables */}
        <div className="mt-4 space-y-6 max-w-3xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-sm text-muted-foreground">
                No commands match your search.
              </p>
            </div>
          ) : (
            filtered.map((section) => (
              <div key={section.category}>
                {/* Category label */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-emerald-600 dark:text-emerald-400">
                    {categoryIcons[section.category] ?? (
                      <VscTerminal size={14} />
                    )}
                  </span>
                  <h2 className="text-sm font-semibold">{section.category}</h2>
                </div>

                <div className="rounded-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent bg-muted/40">
                        <TableHead className="h-8 px-3 text-xs w-[40%]">
                          Command
                        </TableHead>
                        <TableHead className="h-8 px-3 text-xs">
                          Description
                        </TableHead>
                        <TableHead className="h-8 px-3 text-xs w-8" />
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {section.commands.map((cmd, i) => (
                        <TableRow key={i} className="group">
                          <TableCell className="px-3 py-2 align-top">
                            <code className="text-[13px] font-mono font-medium text-emerald-600 dark:text-emerald-400">
                              {cmd.command}
                            </code>
                            {cmd.example && (
                              <div className="text-[11px] font-mono text-muted-foreground/70 mt-0.5">
                                e.g. {cmd.example}
                              </div>
                            )}
                          </TableCell>
                          <TableCell className="px-3 py-2 text-xs text-muted-foreground align-top leading-relaxed">
                            {cmd.description}
                          </TableCell>
                          <TableCell className="px-2 py-2 align-top">
                            <CopyButton text={cmd.command} />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
