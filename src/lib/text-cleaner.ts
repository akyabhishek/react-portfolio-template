import { remark } from "remark";
import stripMarkdown from "strip-markdown";
import { remove as removeConfusables } from "confusables";
import type { Nodes, Root } from "mdast";

export const MAX_TEXT_LENGTH = 10_000;

export interface CleanerOptions {
  whitespace: boolean;
  invisible: boolean;
  punctuation: boolean;
  markdown: boolean;
  quotes?: boolean;
  dashes?: boolean;
  ellipsis?: boolean;
  preserveCode?: boolean;
  nonBreakingSpaces?: boolean;
  trailingWhitespace?: boolean;
  asterisks?: boolean;
  headings?: boolean;
  lookalikes?: boolean;
  unicode?: boolean;
}

export const DEFAULT_CLEANER_OPTIONS: CleanerOptions = {
  whitespace: true,
  invisible: true,
  punctuation: true,
  markdown: false,
  preserveCode: true,
  asterisks: false,
  headings: false,
  lookalikes: false,
  unicode: false,
};

export interface CleanupCounts {
  whitespace: number;
  invisible: number;
  punctuation: number;
  markdown: number;
  nonBreakingSpaces: number;
  trailingWhitespace: number;
  asterisks: number;
  headings: number;
  lookalikes: number;
  unicode: number;
}

export interface CleanerResult {
  text: string;
  changed: boolean;
  counts: CleanupCounts;
}

export function isCleanupEnabled(
  options: CleanerOptions,
  key: keyof CleanerOptions,
): boolean {
  if (options[key] !== undefined) return options[key];
  if (key === "quotes" || key === "dashes" || key === "ellipsis")
    return options.punctuation;
  if (key === "nonBreakingSpaces" || key === "trailingWhitespace")
    return options.whitespace;
  return key === "preserveCode";
}

const parser = remark();
const punctuation: Record<string, string> = {
  "\u201a": "'",
  "\u201b": "'",
  "\u2018": "'",
  "\u2019": "'",
  "\u201c": '"',
  "\u201d": '"',
  "\u201e": '"',
  "\u201f": '"',
  "\u2026": "...",
  "\u2013": "-",
  "\u2014": "-",
};

function walk(node: Nodes, visit: (node: Nodes) => boolean | void): void {
  if (visit(node) === false) return;
  if ("children" in node) {
    for (const child of node.children) walk(child, visit);
  }
}

function protectedRanges(
  input: string,
  preserveCode = true,
): [number, number][] {
  const ranges: [number, number][] = [];
  walk(parser.parse(input), (node) => {
    if (node.type === "link" || node.type === "linkReference") {
      const start = node.position?.start.offset;
      const end = node.position?.end.offset;
      const labelStart = node.children[0]?.position?.start.offset;
      const labelEnd =
        node.children[node.children.length - 1]?.position?.end.offset;
      if (
        start !== undefined &&
        end !== undefined &&
        labelStart !== undefined &&
        labelEnd !== undefined
      ) {
        ranges.push([start, labelStart], [labelEnd, end]);
      }
      return;
    }
    if (
      [
        ...(preserveCode ? ["code", "inlineCode"] : []),
        "image",
        "imageReference",
        "definition",
        "html",
      ].includes(node.type)
    ) {
      const start = node.position?.start.offset;
      const end = node.position?.end.offset;
      if (start !== undefined && end !== undefined) ranges.push([start, end]);
      return false;
    }
  });
  for (const match of input.matchAll(
    /(?:https?:\/\/|www\.)[^\s<>"'\u2018\u2019\u201c\u201d\u201e\u201f]+|[\p{L}\p{N}._%+-]+@[\p{L}\p{N}.-]+\.[\p{L}]{2,}/gu,
  )) {
    ranges.push([match.index, match.index + match[0].length]);
  }
  ranges.sort((first, second) => first[0] - second[0]);
  const merged: [number, number][] = [];
  for (const range of ranges) {
    const previous = merged[merged.length - 1];
    if (previous && range[0] <= previous[1])
      previous[1] = Math.max(previous[1], range[1]);
    else merged.push([...range]);
  }
  return merged;
}

function cleanProse(
  input: string,
  options: CleanerOptions,
  counts: CleanupCounts,
): string {
  let output = input;
  if (options.unicode) {
    const normalized = output.normalize("NFKC");
    if (normalized !== output) {
      counts.unicode += Math.max(
        1,
        [...output.matchAll(/\P{M}\p{M}*|\p{M}+/gu)].filter(
          ([group]) => group.normalize("NFKC") !== group,
        ).length,
      );
      output = normalized;
    }
  }
  if (options.lookalikes) {
    output = output.replace(
      /[\p{Script=Cyrillic}\p{Script=Greek}]/gu,
      (match) => {
        const replacement = removeConfusables(match);
        if (replacement !== match && /^[A-Za-z]+$/.test(replacement)) {
          counts.lookalikes++;
          return replacement;
        }
        return match;
      },
    );
  }
  if (options.invisible) {
    output = output.replace(
      /[\u200b\ufeff]+|[\u00ad\u2060]/g,
      (match, offset: number, source: string) => {
        counts.invisible += match.length;
        if (match === "\u00ad" || match === "\u2060") return "";
        const before = source.slice(0, offset).match(/[\p{L}\p{N}]$/u);
        const after = /^[\p{L}\p{N}]/u.test(
          source.slice(offset + match.length),
        );
        return before && after ? " " : "";
      },
    );
  }
  if (isCleanupEnabled(options, "quotes")) {
    output = output.replace(
      /[\u2018\u2019\u201a\u201b\u201c\u201d\u201e\u201f]/g,
      (match) => {
        counts.punctuation++;
        return punctuation[match];
      },
    );
  }
  if (isCleanupEnabled(options, "dashes")) {
    output = output.replace(/[\u2013\u2014]/g, (match) => {
      counts.punctuation++;
      return punctuation[match];
    });
  }
  if (isCleanupEnabled(options, "ellipsis")) {
    output = output.replace(/\u2026/g, (match) => {
      counts.punctuation++;
      return punctuation[match];
    });
  }
  if (options.asterisks) {
    output = output.replace(/\*/g, () => {
      counts.asterisks++;
      return "";
    });
  }
  if (isCleanupEnabled(options, "nonBreakingSpaces")) {
    output = output.replace(/[\u00a0\u202f]/g, () => {
      counts.nonBreakingSpaces++;
      counts.whitespace++;
      return " ";
    });
  }
  if (options.whitespace) {
    output = output.replace(/\r\n?/g, () => {
      counts.whitespace++;
      return "\n";
    });
  }
  return output;
}

function normalizeWhitespace(
  input: string,
  options: CleanerOptions,
  counts: CleanupCounts,
): string {
  const ranges = protectedRanges(input, options.preserveCode !== false);
  let rangeIndex = 0;
  const output = input.replace(/[ \t]+/g, (match, offset: number) => {
    while (ranges[rangeIndex] && ranges[rangeIndex][1] <= offset) rangeIndex++;
    const range = ranges[rangeIndex];
    if (range && offset + match.length > range[0]) return match;
    const lineStart = input.lastIndexOf("\n", offset - 1) + 1;
    const indentation = /^[ \t]*$/.test(input.slice(lineStart, offset));
    const next = input[offset + match.length];
    const trailing = next === "\n" || next === "\r" || next === undefined;
    const hardBreak =
      !options.markdown &&
      next === "\n" &&
      /^ {2,}$/.test(match) &&
      !indentation;
    const replacement = trailing
      ? !isCleanupEnabled(options, "trailingWhitespace")
        ? match
        : hardBreak
          ? "  "
          : ""
      : !options.whitespace
        ? match
        : indentation
          ? match
          : " ";
    if (replacement !== match) {
      counts.whitespace++;
      if (trailing) counts.trailingWhitespace++;
    }
    return replacement;
  });
  if (!options.whitespace) return output;
  return output.replace(/^\n+|\n+$/g, (match, offset: number) => {
    if (
      ranges.some(
        ([start, end]) => offset < end && offset + match.length > start,
      )
    )
      return match;
    counts.whitespace++;
    return "";
  });
}

function removeHeadingMarkers(input: string, counts: CleanupCounts): string {
  const edits: { start: number; end: number; replacement: string }[] = [];
  walk(parser.parse(input), (node) => {
    if (node.type !== "heading") return;
    const start = node.position?.start.offset;
    const end = node.position?.end.offset;
    if (start === undefined || end === undefined) return;
    const prefix = input.slice(start, end).match(/^( {0,3})#{1,6}(?:[ \t]+|$)/);
    if (prefix)
      edits.push({
        start,
        end: start + prefix[0].length,
        replacement: prefix[1],
      });
  });
  let output = input;
  for (const edit of edits.sort(
    (first, second) => second.start - first.start,
  )) {
    output =
      output.slice(0, edit.start) + edit.replacement + output.slice(edit.end);
    counts.headings++;
  }
  return output;
}

function plainMarkdown(input: string, counts: CleanupCounts): string {
  const tree = parser.parse(input);
  const definitions = new Map<string, string>();
  walk(tree, (node) => {
    if (node.type === "definition")
      definitions.set(node.identifier.toLowerCase(), node.url);
  });
  const processor = remark().use(stripMarkdown, {
    keep: [
      "code",
      "inlineCode",
      "html",
      "link",
      "linkReference",
      "image",
      "imageReference",
    ],
    remove: [["definition", () => undefined]],
  });
  walk(tree, (node) => {
    if (!["root", "text", "paragraph", "html"].includes(node.type))
      counts.markdown++;
  });
  const stripped = processor.runSync(tree) as Root;
  function render(node: Nodes): string {
    if ("value" in node) return node.value;
    if (node.type === "image" || node.type === "imageReference") {
      const destination =
        node.type === "image"
          ? node.url
          : definitions.get(node.identifier.toLowerCase());
      return [node.alt || "", destination ? `(${destination})` : ""]
        .filter(Boolean)
        .join(" ");
    }
    if (node.type === "link" || node.type === "linkReference") {
      const label = node.children.map(render).join("");
      const destination =
        node.type === "link"
          ? node.url
          : definitions.get(node.identifier.toLowerCase());
      return destination && label !== destination
        ? `${label} (${destination})`
        : label;
    }
    if ("children" in node)
      return node.children.map(render).join(node.type === "root" ? "\n\n" : "");
    return "";
  }
  return render(stripped);
}

export function cleanText(
  input: string,
  options: CleanerOptions = DEFAULT_CLEANER_OPTIONS,
): CleanerResult {
  if (input.length > MAX_TEXT_LENGTH)
    throw new Error(
      `Text must be ${MAX_TEXT_LENGTH.toLocaleString("en-US")} characters or fewer.`,
    );
  const counts: CleanupCounts = {
    whitespace: 0,
    invisible: 0,
    punctuation: 0,
    markdown: 0,
    nonBreakingSpaces: 0,
    trailingWhitespace: 0,
    asterisks: 0,
    headings: 0,
    lookalikes: 0,
    unicode: 0,
  };
  const source = options.headings ? removeHeadingMarkers(input, counts) : input;
  let cursor = 0;
  let output = "";
  for (const [start, end] of protectedRanges(
    source,
    options.preserveCode !== false,
  )) {
    output +=
      cleanProse(source.slice(cursor, start), options, counts) +
      source.slice(start, end);
    cursor = end;
  }
  output += cleanProse(source.slice(cursor), options, counts);
  if (options.whitespace || isCleanupEnabled(options, "trailingWhitespace"))
    output = normalizeWhitespace(output, options, counts);
  if (options.markdown) output = plainMarkdown(output, counts);
  return { text: output, changed: output !== input, counts };
}
