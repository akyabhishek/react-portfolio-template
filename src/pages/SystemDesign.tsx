import { useEffect, useMemo, useState } from "react";
import {
  FiCheck,
  FiCopy,
  FiExternalLink,
  FiPlay,
  FiSearch,
} from "react-icons/fi";
import { Helmet } from "react-helmet";
import { Input } from "@/components/ui/input";
import { systemDesignQuestions } from "@/config/systemDesignData";

type SystemDesignQuestion = {
  question: string;
  solution: string;
  video?: string;
};

const VISITED_KEY = "system-design-visited-v1";

function normalizeQuestion(value: string): string {
  return value.trim().toLowerCase();
}

function getYouTubeEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace("www.", "").toLowerCase();

    if (host === "youtube.com") {
      const id = parsed.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }

    if (host === "youtu.be") {
      const id = parsed.pathname.split("/").filter(Boolean)[0];
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }

    if (host === "youtube-nocookie.com") {
      const parts = parsed.pathname.split("/").filter(Boolean);
      const id = parts[parts.length - 1];
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }

    return null;
  } catch {
    return null;
  }
}

export default function SystemDesign() {
  const [search, setSearch] = useState("");
  const [visited, setVisited] = useState<Set<string>>(new Set());
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [openVideoFor, setOpenVideoFor] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(VISITED_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as string[];
      if (Array.isArray(parsed)) {
        setVisited(new Set(parsed));
      }
    } catch {
      setVisited(new Set());
    }
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return systemDesignQuestions as SystemDesignQuestion[];

    return (systemDesignQuestions as SystemDesignQuestion[]).filter((item) =>
      item.question.toLowerCase().includes(q),
    );
  }, [search]);

  const visitedCount = useMemo(() => {
    return (systemDesignQuestions as SystemDesignQuestion[]).filter((item) =>
      visited.has(normalizeQuestion(item.question)),
    ).length;
  }, [visited]);

  const videosCount = useMemo(() => {
    return (systemDesignQuestions as SystemDesignQuestion[]).filter(
      (item) => !!item.video,
    ).length;
  }, []);

  const onOpen = (question: string) => {
    setVisited((prev) => {
      const next = new Set(prev);
      next.add(normalizeQuestion(question));
      localStorage.setItem(VISITED_KEY, JSON.stringify(Array.from(next)));
      return next;
    });
  };

  const onCopy = async (index: number, url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedIndex(index);
      window.setTimeout(() => setCopiedIndex(null), 1200);
    } catch {
      setCopiedIndex(null);
    }
  };

  return (
    <>
      <Helmet>
        <title>System Design Questions | Abhishek Kumar Yadav</title>
        <meta
          name="description"
          content="A curated list of important system design questions with solution links for interview preparation."
        />
      </Helmet>

      <div className="max-w-5xl mx-auto mt-14 px-4 pb-16">
        <div className="mb-5">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            System Design Questions
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Practice from the complete question set available in the data file.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-4">
          <div className="rounded-xl border bg-card px-3 py-2">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
              Total Questions
            </p>
            <p className="text-lg font-semibold">
              {systemDesignQuestions.length}
            </p>
          </div>
          <div className="rounded-xl border bg-card px-3 py-2">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
              Opened
            </p>
            <p className="text-lg font-semibold">{visitedCount}</p>
          </div>
          <div className="rounded-xl border bg-card px-3 py-2">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
              Remaining
            </p>
            <p className="text-lg font-semibold">
              {Math.max(systemDesignQuestions.length - visitedCount, 0)}
            </p>
          </div>
          <div className="rounded-xl border bg-card px-3 py-2">
            <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
              With Video
            </p>
            <p className="text-lg font-semibold">{videosCount}</p>
          </div>
        </div>

        <div className="relative mb-4">
          <FiSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={14}
          />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions..."
            className="pl-8 h-9 text-sm"
          />
        </div>

        <div className="space-y-2">
          {filtered.length === 0 && (
            <div className="rounded-xl border bg-card p-4 text-sm text-muted-foreground">
              No questions found for your search.
            </div>
          )}

          {filtered.map((item, index) => {
            const isVisited = visited.has(normalizeQuestion(item.question));
            const embedUrl = item.video ? getYouTubeEmbedUrl(item.video) : null;
            const videoKey = normalizeQuestion(item.question);
            const showVideo = openVideoFor === videoKey && !!embedUrl;

            return (
              <div
                key={`${item.question}-${index}`}
                className="rounded-xl border bg-card p-3 sm:p-4 transition-colors hover:bg-muted/30"
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`mt-0.5 inline-flex min-w-8 h-8 items-center justify-center rounded-md text-xs font-semibold border ${
                      isVisited
                        ? "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800"
                        : "bg-muted text-muted-foreground border-border"
                    }`}
                  >
                    {index + 1}
                  </span>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm sm:text-base font-medium leading-relaxed">
                      {item.question}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <a
                        href={item.solution}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => onOpen(item.question)}
                        className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium bg-emerald-600 text-white hover:bg-emerald-700 transition-colors"
                      >
                        Open Answer
                        <FiExternalLink size={12} />
                      </a>

                      <button
                        onClick={() => onCopy(index, item.solution)}
                        className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium border border-border bg-background hover:bg-muted transition-colors"
                        type="button"
                      >
                        {copiedIndex === index ? (
                          <>
                            Copied
                            <FiCheck size={12} />
                          </>
                        ) : (
                          <>
                            Copy Link
                            <FiCopy size={12} />
                          </>
                        )}
                      </button>

                      {embedUrl && (
                        <button
                          onClick={() =>
                            setOpenVideoFor((prev) =>
                              prev === videoKey ? null : videoKey,
                            )
                          }
                          className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium border border-border bg-background hover:bg-muted transition-colors"
                          type="button"
                        >
                          <FiPlay size={12} />
                          {showVideo ? "Hide Video" : "Watch Video"}
                        </button>
                      )}

                      {isVisited && (
                        <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
                          Opened
                        </span>
                      )}
                    </div>

                    {showVideo && (
                      <div className="mt-3 overflow-hidden rounded-lg border border-border bg-black">
                        <div className="relative w-full pt-[56.25%]">
                          <iframe
                            src={embedUrl}
                            title={`Video for ${item.question}`}
                            className="absolute inset-0 h-full w-full"
                            loading="lazy"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
