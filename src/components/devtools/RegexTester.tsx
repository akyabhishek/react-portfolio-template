"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { toast } from "@/hooks/use-toast";
import { FiCopy, FiChevronDown, FiChevronUp } from "react-icons/fi";

const MATCH_COLORS = [
  { bg: "#facc15", text: "#422006" }, // yellow
  { bg: "#60a5fa", text: "#1e3a5f" }, // blue
  { bg: "#4ade80", text: "#14532d" }, // green
  { bg: "#c084fc", text: "#3b0764" }, // purple
  { bg: "#fb923c", text: "#431407" }, // orange
  { bg: "#f472b6", text: "#500724" }, // pink
  { bg: "#2dd4bf", text: "#042f2e" }, // teal
];

const DARK_MATCH_COLORS = [
  { bg: "#854d0e", text: "#fef9c3" },
  { bg: "#1e40af", text: "#dbeafe" },
  { bg: "#166534", text: "#dcfce7" },
  { bg: "#6b21a8", text: "#f3e8ff" },
  { bg: "#9a3412", text: "#ffedd5" },
  { bg: "#9d174d", text: "#fce7f3" },
  { bg: "#115e59", text: "#ccfbf1" },
];

interface MatchInfo {
  index: number;
  fullMatch: string;
  groups: string[];
  namedGroups: Record<string, string>;
}

const MAX_MATCHES = 1000;

const CHEATSHEET = [
  { pattern: ".", desc: "Any character (except newline)" },
  { pattern: "\\d", desc: "Digit [0-9]" },
  { pattern: "\\D", desc: "Non-digit" },
  { pattern: "\\w", desc: "Word char [a-zA-Z0-9_]" },
  { pattern: "\\W", desc: "Non-word char" },
  { pattern: "\\s", desc: "Whitespace" },
  { pattern: "\\S", desc: "Non-whitespace" },
  { pattern: "\\b", desc: "Word boundary" },
  { pattern: "^", desc: "Start of string/line" },
  { pattern: "$", desc: "End of string/line" },
  { pattern: "*", desc: "0 or more" },
  { pattern: "+", desc: "1 or more" },
  { pattern: "?", desc: "0 or 1 (optional)" },
  { pattern: "{n}", desc: "Exactly n times" },
  { pattern: "{n,m}", desc: "Between n and m times" },
  { pattern: "(abc)", desc: "Capture group" },
  { pattern: "(?:abc)", desc: "Non-capturing group" },
  { pattern: "(?<name>abc)", desc: "Named capture group" },
  { pattern: "a|b", desc: "Alternation (a or b)" },
  { pattern: "[abc]", desc: "Character class" },
  { pattern: "[^abc]", desc: "Negated character class" },
  { pattern: "(?=abc)", desc: "Positive lookahead" },
  { pattern: "(?!abc)", desc: "Negative lookahead" },
  { pattern: "(?<=abc)", desc: "Positive lookbehind" },
  { pattern: "(?<!abc)", desc: "Negative lookbehind" },
];

export default function RegexTester() {
  const [pattern, setPattern] = useState("");
  const [testString, setTestString] = useState("");
  const [flags, setFlags] = useState<Record<string, boolean>>({
    g: true,
    i: false,
    m: false,
    s: false,
    u: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [matches, setMatches] = useState<MatchInfo[]>([]);
  const [showCheatsheet, setShowCheatsheet] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Detect dark mode from document
  const isDark =
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark");
  const colors = isDark ? DARK_MATCH_COLORS : MATCH_COLORS;

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("regexTester_state");
      if (saved) {
        const state = JSON.parse(saved);
        if (state.pattern) setPattern(state.pattern);
        if (state.testString) setTestString(state.testString);
        if (state.flags) setFlags(state.flags);
      } else {
        setPattern("(\\w+)@(\\w+\\.\\w+)");
        setTestString(
          "Contact us at john@example.com or jane@test.org for help.\nAlso reach out to support@company.io.",
        );
      }
    } catch {
      setPattern("(\\w+)@(\\w+\\.\\w+)");
      setTestString(
        "Contact us at john@example.com or jane@test.org for help.\nAlso reach out to support@company.io.",
      );
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(
        "regexTester_state",
        JSON.stringify({ pattern, testString, flags }),
      );
    } catch {
      // ignore
    }
  }, [pattern, testString, flags, isLoaded]);

  // Execute regex (debounced)
  const executeRegex = useCallback(() => {
    if (!pattern) {
      setError(null);
      setMatches([]);
      return;
    }

    try {
      const flagStr = Object.entries(flags)
        .filter(([, v]) => v)
        .map(([k]) => k)
        .join("");

      const regex = new RegExp(pattern, flagStr);
      setError(null);

      const results: MatchInfo[] = [];
      if (flagStr.includes("g")) {
        let match: RegExpExecArray | null;
        let count = 0;
        while (
          (match = regex.exec(testString)) !== null &&
          count < MAX_MATCHES
        ) {
          // Prevent infinite loop on zero-length matches
          if (match[0].length === 0) {
            regex.lastIndex++;
          }
          results.push({
            index: match.index,
            fullMatch: match[0],
            groups: match.slice(1),
            namedGroups: match.groups ? { ...match.groups } : {},
          });
          count++;
        }
      } else {
        const match = regex.exec(testString);
        if (match) {
          results.push({
            index: match.index,
            fullMatch: match[0],
            groups: match.slice(1),
            namedGroups: match.groups ? { ...match.groups } : {},
          });
        }
      }
      setMatches(results);
    } catch (e: any) {
      setError(e.message);
      setMatches([]);
    }
  }, [pattern, testString, flags]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(executeRegex, 150);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [executeRegex]);

  // Build highlighted HTML for the test string
  const getHighlightedHtml = (): string => {
    if (!pattern || matches.length === 0 || error) {
      return escapeHtml(testString);
    }

    // Sort matches by index, build non-overlapping segments
    const sorted = [...matches].sort((a, b) => a.index - b.index);
    const parts: string[] = [];
    let lastEnd = 0;

    for (const m of sorted) {
      if (m.index < lastEnd) continue; // skip overlapping
      if (m.index > lastEnd) {
        parts.push(escapeHtml(testString.slice(lastEnd, m.index)));
      }
      const color = colors[0]; // full match color
      parts.push(
        `<span style="background:${color.bg};color:${color.text};border-radius:3px;padding:1px 2px;">${escapeHtml(m.fullMatch)}</span>`,
      );
      lastEnd = m.index + m.fullMatch.length;
    }

    if (lastEnd < testString.length) {
      parts.push(escapeHtml(testString.slice(lastEnd)));
    }

    return parts.join("");
  };

  const escapeHtml = (str: string): string =>
    str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  const toggleFlag = (flag: string) => {
    setFlags((prev) => ({ ...prev, [flag]: !prev[flag] }));
  };

  const flagStr = Object.entries(flags)
    .filter(([, v]) => v)
    .map(([k]) => k)
    .join("");

  return (
    <div className="flex items-center justify-center">
      <section className="max-w-screen-xl w-full p-4 space-y-4">
        <h2 className="text-2xl font-bold mb-1">Regex Tester</h2>
        <p className="text-xs text-gray-500 mb-4">
          Test regular expressions with live matching, capture group
          highlighting, and a quick reference cheatsheet.
        </p>

        {/* Pattern Input */}
        <div className="space-y-2">
          <label className="text-sm font-semibold">Pattern</label>
          <div className="flex items-center gap-2">
            <span className="text-gray-400 font-mono text-lg">/</span>
            <Input
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="Enter regex pattern..."
              className="font-mono flex-1"
              spellCheck={false}
            />
            <span className="text-gray-400 font-mono text-lg">/{flagStr}</span>
          </div>

          {/* Flag Toggles */}
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-gray-500">Flags:</span>
            {Object.entries(flags).map(([flag, active]) => (
              <Badge
                key={flag}
                variant={active ? "default" : "outline"}
                className={`cursor-pointer select-none transition-colors ${
                  active
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
                onClick={() => toggleFlag(flag)}
              >
                {flag}
                <span className="ml-1 text-[10px] opacity-70">
                  {flag === "g"
                    ? "global"
                    : flag === "i"
                      ? "case-insensitive"
                      : flag === "m"
                        ? "multiline"
                        : flag === "s"
                          ? "dotall"
                          : "unicode"}
                </span>
              </Badge>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && (
          <Alert variant="destructive" className="py-2">
            <AlertTitle className="text-xs">Invalid Regex</AlertTitle>
            <AlertDescription className="text-xs font-mono">
              {error}
            </AlertDescription>
          </Alert>
        )}

        {/* Test String with Highlighted Matches */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold">Test String</label>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(testString);
                  toast({ title: "Copied", duration: 2000 });
                }}
              >
                <FiCopy size={14} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setPattern("");
                  setTestString("");
                  setFlags({ g: true, i: false, m: false, s: false, u: false });
                  try {
                    localStorage.removeItem("regexTester_state");
                  } catch {
                    // ignore
                  }
                  toast({ title: "Reset", duration: 2000 });
                }}
              >
                Reset
              </Button>
            </div>
          </div>

          {/* Editable textarea */}
          <textarea
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            rows={6}
            spellCheck={false}
            className="w-full font-mono text-sm p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-muted dark:bg-[#23272f] text-gray-900 dark:text-gray-100 resize-y transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
            style={{ fontFamily: "JetBrains Mono" }}
            placeholder="Enter text to test against..."
          />

          {/* Highlighted preview */}
          {matches.length > 0 && (
            <div className="space-y-1">
              <span className="text-xs text-gray-500">
                Highlighted preview:
              </span>
              <div
                className="font-mono text-sm p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-muted dark:bg-[#23272f] text-gray-900 dark:text-gray-100 whitespace-pre-wrap break-words overflow-auto max-h-[300px]"
                style={{ fontFamily: "JetBrains Mono" }}
                dangerouslySetInnerHTML={{ __html: getHighlightedHtml() }}
              />
            </div>
          )}
        </div>

        {/* Match Stats */}
        <div className="flex items-center gap-3 text-sm">
          <Badge
            variant="outline"
            className={
              matches.length > 0
                ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
                : ""
            }
          >
            {matches.length} match{matches.length !== 1 ? "es" : ""}
          </Badge>
          {matches.length >= MAX_MATCHES && (
            <span className="text-xs text-yellow-600 dark:text-yellow-400">
              (capped at {MAX_MATCHES})
            </span>
          )}
        </div>

        {/* Match Results */}
        {matches.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-semibold">Match Results</h3>
            <div className="space-y-2 max-h-[400px] overflow-auto">
              {matches.map((m, idx) => (
                <div
                  key={idx}
                  className="rounded-lg border border-gray-200 dark:border-gray-700 p-3 bg-muted dark:bg-[#23272f] text-sm"
                >
                  <div className="flex items-start gap-2 flex-wrap">
                    <Badge variant="secondary" className="shrink-0">
                      Match {idx + 1}
                    </Badge>
                    <code
                      className="font-mono px-2 py-0.5 rounded text-xs"
                      style={{
                        background: colors[0].bg,
                        color: colors[0].text,
                      }}
                    >
                      {m.fullMatch}
                    </code>
                    <span className="text-xs text-gray-400">
                      index {m.index}–{m.index + m.fullMatch.length}
                    </span>
                  </div>

                  {/* Capture groups */}
                  {m.groups.length > 0 && (
                    <div className="mt-2 space-y-1 pl-2 border-l-2 border-gray-200 dark:border-gray-700">
                      {m.groups.map((g, gi) => {
                        const color = colors[(gi + 1) % colors.length];
                        const namedKey = Object.entries(m.namedGroups).find(
                          ([, v]) => v === g,
                        )?.[0];
                        return (
                          <div
                            key={gi}
                            className="flex items-center gap-2 text-xs"
                          >
                            <span className="text-gray-500">
                              Group {gi + 1}
                              {namedKey ? ` (${namedKey})` : ""}:
                            </span>
                            <code
                              className="font-mono px-1.5 py-0.5 rounded"
                              style={{
                                background: color.bg,
                                color: color.text,
                              }}
                            >
                              {g ?? "undefined"}
                            </code>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Cheatsheet */}
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <button
            className="w-full flex items-center justify-between p-3 text-sm font-semibold bg-muted dark:bg-[#23272f] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            onClick={() => setShowCheatsheet(!showCheatsheet)}
          >
            Regex Cheatsheet
            {showCheatsheet ? (
              <FiChevronUp size={16} />
            ) : (
              <FiChevronDown size={16} />
            )}
          </button>
          {showCheatsheet && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 border-t border-gray-200 dark:border-gray-700">
              {CHEATSHEET.map((item) => (
                <div
                  key={item.pattern}
                  className="flex items-center gap-2 p-2 border-b border-r border-gray-100 dark:border-gray-800 text-xs"
                >
                  <code className="font-mono font-bold text-emerald-600 dark:text-emerald-400 shrink-0 min-w-[80px]">
                    {item.pattern}
                  </code>
                  <span className="text-gray-500 dark:text-gray-400">
                    {item.desc}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
