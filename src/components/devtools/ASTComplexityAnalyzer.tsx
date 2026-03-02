"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Copy,
  RotateCcw,
  TrendingUp,
  Clock,
  HardDrive,
  Info,
  TreePine,
  ChevronRight,
  ChevronDown,
  GitBranch,
} from "lucide-react";
import Editor from "react-simple-code-editor";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts";

// ─── TYPES ──────────────────────────────────────────────────────────────────

type SupportedLanguage =
  | "javascript"
  | "typescript"
  | "java"
  | "python"
  | "cpp"
  | "csharp"
  | "go"
  | "kotlin";

type ComplexityClass =
  | "O(1)"
  | "O(log n)"
  | "O(n)"
  | "O(n log n)"
  | "O(n²)"
  | "O(n³)"
  | "O(2^n)"
  | "O(V + E)";

interface ASTNode {
  kind:
    | "program"
    | "function"
    | "for-loop"
    | "while-loop"
    | "do-while-loop"
    | "foreach-loop"
    | "if"
    | "else"
    | "call"
    | "return"
    | "assignment"
    | "block"
    | "recursion"
    | "collection-alloc"
    | "unknown";
  label: string;
  detail?: string;
  children: ASTNode[];
  line?: number;
}

interface AnalysisResult {
  timeComplexity: ComplexityClass;
  spaceComplexity: ComplexityClass;
  explanation: string;
  patterns: string[];
  confidence: "high" | "medium" | "low";
  ast: ASTNode;
}

// ─── LANGUAGE CONFIG ────────────────────────────────────────────────────────

const LANGUAGES: {
  value: SupportedLanguage;
  label: string;
  placeholder: string;
}[] = [
  {
    value: "javascript",
    label: "JavaScript",
    placeholder: `function example(arr) {\n  for (let i = 0; i < arr.length; i++) {\n    console.log(arr[i]);\n  }\n}`,
  },
  {
    value: "typescript",
    label: "TypeScript",
    placeholder: `function example(arr: number[]): void {\n  for (let i = 0; i < arr.length; i++) {\n    console.log(arr[i]);\n  }\n}`,
  },
  {
    value: "java",
    label: "Java",
    placeholder: `public void example(int[] arr) {\n    for (int i = 0; i < arr.length; i++) {\n        System.out.println(arr[i]);\n    }\n}`,
  },
  {
    value: "python",
    label: "Python",
    placeholder: `def example(arr):\n    for item in arr:\n        print(item)`,
  },
  {
    value: "cpp",
    label: "C / C++",
    placeholder: `void example(int arr[], int n) {\n    for (int i = 0; i < n; i++) {\n        printf("%d\\n", arr[i]);\n    }\n}`,
  },
  {
    value: "csharp",
    label: "C#",
    placeholder: `void Example(int[] arr) {\n    foreach (var item in arr) {\n        Console.WriteLine(item);\n    }\n}`,
  },
  {
    value: "go",
    label: "Go",
    placeholder: `func example(arr []int) {\n    for _, v := range arr {\n        fmt.Println(v)\n    }\n}`,
  },
  {
    value: "kotlin",
    label: "Kotlin",
    placeholder: `fun example(arr: List<Int>) {\n    for (item in arr) {\n        println(item)\n    }\n}`,
  },
];

// ─── SAMPLE CODES (per language) ────────────────────────────────────────────

const SAMPLE_CODES: Record<
  string,
  { label: string; code: string; lang: SupportedLanguage }
> = {
  "Linear Search (JS)": {
    label: "Linear Search",
    lang: "javascript",
    code: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}`,
  },
  "Binary Search (JS)": {
    label: "Binary Search",
    lang: "javascript",
    code: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}`,
  },
  "Bubble Sort (JS)": {
    label: "Bubble Sort",
    lang: "javascript",
    code: `function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
  },
  "Fibonacci Recursive (JS)": {
    label: "Fibonacci (Recursive)",
    lang: "javascript",
    code: `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`,
  },
  "Merge Sort (JS)": {
    label: "Merge Sort",
    lang: "javascript",
    code: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  let result = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  return result.concat(left.slice(i)).concat(right.slice(j));
}`,
  },
  "Two Sum (JS)": {
    label: "Two Sum (HashMap)",
    lang: "javascript",
    code: `function twoSum(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }

  return [];
}`,
  },
  "DFS Graph (Java)": {
    label: "Graph DFS (Java)",
    lang: "java",
    code: `class Solution {
    public boolean isBipartite(int[][] graph) {
        int n = graph.length;
        int[] color = new int[n];
        for (int i = 0; i < n; i++) {
            color[i] = -1;
        }
        for (int i = 0; i < n; i++) {
            if (color[i] == -1) {
                if (dfs(graph, color, i, 0) == false)
                    return false;
            }
        }
        return true;
    }

    public boolean dfs(int[][] graph, int[] color, int row, int col) {
        color[row] = col;
        for (int i = 0; i < graph[row].length; i++) {
            int neighbor = graph[row][i];
            if (color[neighbor] == -1) {
                if (dfs(graph, color, neighbor, 1-col) == false)
                    return false;
            }
            else if (color[neighbor] == col) {
                return false;
            }
        }
        return true;
    }
}`,
  },
  "BFS (JS)": {
    label: "BFS Traversal",
    lang: "javascript",
    code: `function bfs(graph, start) {
  const visited = new Set();
  const queue = [start];
  visited.add(start);

  while (queue.length > 0) {
    const node = queue.shift();
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return visited;
}`,
  },
  "Nested Triple (Python)": {
    label: "Triple Nested (Python)",
    lang: "python",
    code: `def triple_nested(matrix):
    n = len(matrix)
    result = 0
    for i in range(n):
        for j in range(n):
            for k in range(n):
                result += matrix[i][j] * matrix[j][k]
    return result`,
  },
  "Quick Sort (Java)": {
    label: "Quick Sort (Java)",
    lang: "java",
    code: `public void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

public int partition(int[] arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            int temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
        }
    }
    int temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    return i + 1;
}`,
  },
};

// ─── COMPLEXITY METADATA ────────────────────────────────────────────────────

const COMPLEXITY_META: Record<
  ComplexityClass,
  { value: number; color: string; description: string }
> = {
  "O(1)": { value: 1, color: "#22c55e", description: "Constant — Best case" },
  "O(log n)": {
    value: 2,
    color: "#84cc16",
    description: "Logarithmic — Very efficient",
  },
  "O(n)": {
    value: 3,
    color: "#eab308",
    description: "Linear — Good performance",
  },
  "O(n log n)": {
    value: 4,
    color: "#f97316",
    description: "Linearithmic — Acceptable",
  },
  "O(n²)": {
    value: 5,
    color: "#ef4444",
    description: "Quadratic — Poor for large inputs",
  },
  "O(n³)": {
    value: 6,
    color: "#dc2626",
    description: "Cubic — Very poor performance",
  },
  "O(2^n)": {
    value: 7,
    color: "#991b1b",
    description: "Exponential — Extremely poor",
  },
  "O(V + E)": {
    value: 3.5,
    color: "#d97706",
    description: "Graph traversal — Linear in vertices + edges",
  },
};

// ─── AST BUILDER ────────────────────────────────────────────────────────────
//
// A lightweight recursive-descent parser that builds a simplified AST from
// source code.  It is NOT a full language parser — it recognises structural
// patterns (functions, loops, branches, calls, allocations) that matter for
// Big-O reasoning and deliberately ignores everything else.

function buildAST(code: string, lang: SupportedLanguage): ASTNode {
  const lines = code.split("\n");
  const root: ASTNode = { kind: "program", label: "Program", children: [] };

  if (lang === "python") {
    parsePython(lines, 0, lines.length, root, 0);
  } else {
    parseBraceLanguage(lines, 0, lines.length, root, lang);
  }

  return root;
}

// ── Python parser (indentation-based) ───────────────────────────────────────

function getIndent(line: string): number {
  const match = line.match(/^(\s*)/);
  return match ? match[1].length : 0;
}

function parsePython(
  lines: string[],
  start: number,
  end: number,
  parent: ASTNode,
  baseIndent: number,
) {
  let i = start;

  while (i < end) {
    const raw = lines[i];
    const trimmed = raw.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      i++;
      continue;
    }
    const indent = getIndent(raw);
    if (indent < baseIndent) break;
    if (indent > baseIndent) {
      i++;
      continue;
    }

    // Function def
    const fnMatch = trimmed.match(/^def\s+(\w+)\s*\(/);
    if (fnMatch) {
      const node: ASTNode = {
        kind: "function",
        label: `def ${fnMatch[1]}()`,
        detail: trimmed,
        children: [],
        line: i + 1,
      };
      const bodyStart = i + 1;
      const bodyEnd = findPythonBlockEnd(lines, bodyStart, indent);
      parsePython(lines, bodyStart, bodyEnd, node, indent + 1);
      parent.children.push(node);
      i = bodyEnd;
      continue;
    }

    // For loop
    const forMatch = trimmed.match(/^for\s+/);
    if (forMatch) {
      const node: ASTNode = {
        kind: "for-loop",
        label: trimmed.replace(/:$/, ""),
        children: [],
        line: i + 1,
      };
      const bodyStart = i + 1;
      const bodyEnd = findPythonBlockEnd(lines, bodyStart, indent);
      parsePython(lines, bodyStart, bodyEnd, node, indent + 1);
      parent.children.push(node);
      i = bodyEnd;
      continue;
    }

    // While loop
    const whileMatch = trimmed.match(/^while\s+/);
    if (whileMatch) {
      const node: ASTNode = {
        kind: "while-loop",
        label: trimmed.replace(/:$/, ""),
        children: [],
        line: i + 1,
      };
      const bodyStart = i + 1;
      const bodyEnd = findPythonBlockEnd(lines, bodyStart, indent);
      parsePython(lines, bodyStart, bodyEnd, node, indent + 1);
      parent.children.push(node);
      i = bodyEnd;
      continue;
    }

    // If / elif / else
    if (/^(if|elif)\s+/.test(trimmed)) {
      const node: ASTNode = {
        kind: "if",
        label: trimmed.replace(/:$/, ""),
        children: [],
        line: i + 1,
      };
      const bodyStart = i + 1;
      const bodyEnd = findPythonBlockEnd(lines, bodyStart, indent);
      parsePython(lines, bodyStart, bodyEnd, node, indent + 1);
      parent.children.push(node);
      i = bodyEnd;
      continue;
    }
    if (/^else\s*:/.test(trimmed)) {
      const node: ASTNode = {
        kind: "else",
        label: "else",
        children: [],
        line: i + 1,
      };
      const bodyStart = i + 1;
      const bodyEnd = findPythonBlockEnd(lines, bodyStart, indent);
      parsePython(lines, bodyStart, bodyEnd, node, indent + 1);
      parent.children.push(node);
      i = bodyEnd;
      continue;
    }

    // Return
    if (/^return\b/.test(trimmed)) {
      parent.children.push({
        kind: "return",
        label: trimmed,
        children: [],
        line: i + 1,
      });
      i++;
      continue;
    }

    // Collection alloc
    if (
      /\b(list|dict|set)\s*\(/.test(trimmed) ||
      /=\s*\[\s*\]/.test(trimmed) ||
      /=\s*\{\s*\}/.test(trimmed)
    ) {
      parent.children.push({
        kind: "collection-alloc",
        label: trimmed,
        children: [],
        line: i + 1,
      });
      i++;
      continue;
    }

    // Function call
    const callMatch = trimmed.match(/(\w+)\s*\(/);
    if (
      callMatch &&
      !/^(if|elif|while|for|def|class|print|return)\b/.test(trimmed)
    ) {
      parent.children.push({
        kind: "call",
        label: trimmed,
        detail: callMatch[1],
        children: [],
        line: i + 1,
      });
      i++;
      continue;
    }

    // Assignment / other
    if (/=/.test(trimmed) && !/==/.test(trimmed)) {
      parent.children.push({
        kind: "assignment",
        label: trimmed,
        children: [],
        line: i + 1,
      });
    } else {
      parent.children.push({
        kind: "unknown",
        label: trimmed,
        children: [],
        line: i + 1,
      });
    }
    i++;
  }
}

function findPythonBlockEnd(
  lines: string[],
  start: number,
  parentIndent: number,
): number {
  let i = start;
  while (i < lines.length) {
    const trimmed = lines[i].trim();
    if (!trimmed || trimmed.startsWith("#")) {
      i++;
      continue;
    }
    if (getIndent(lines[i]) <= parentIndent) return i;
    i++;
  }
  return i;
}

// ── Brace-language parser (JS/TS/Java/C++/C#/Go/Kotlin) ────────────────────

function parseBraceLanguage(
  lines: string[],
  start: number,
  end: number,
  parent: ASTNode,
  lang: SupportedLanguage,
) {
  let i = start;

  while (i < end) {
    const trimmed = lines[i].trim();
    if (
      !trimmed ||
      /^\/\//.test(trimmed) ||
      /^\/\*/.test(trimmed) ||
      trimmed === "*/" ||
      /^\*/.test(trimmed)
    ) {
      i++;
      continue;
    }

    // Skip class declarations (Java/C#/Kotlin) — descend into body
    if (
      /^(public\s+|private\s+|protected\s+|abstract\s+|static\s+|final\s+)*(class|interface|struct|enum|object)\s+/.test(
        trimmed,
      )
    ) {
      if (trimmed.includes("{")) {
        const bodyStart = i + 1;
        const bodyEnd = findMatchingBrace(lines, i);
        parseBraceLanguage(lines, bodyStart, bodyEnd, parent, lang);
        i = bodyEnd + 1;
      } else {
        i++;
      }
      continue;
    }

    // Function / method declaration
    const fnNode = tryParseFunction(trimmed, lang, i);
    if (fnNode) {
      if (trimmed.includes("{")) {
        const bodyStart = i + 1;
        const bodyEnd = findMatchingBrace(lines, i);
        parseBraceLanguage(lines, bodyStart, bodyEnd, fnNode, lang);
        i = bodyEnd + 1;
      } else {
        // Opening brace on next line
        const braceLineIdx = findNextBraceLine(lines, i + 1);
        if (braceLineIdx !== -1) {
          const bodyStart = braceLineIdx + 1;
          const bodyEnd = findMatchingBrace(lines, braceLineIdx);
          parseBraceLanguage(lines, bodyStart, bodyEnd, fnNode, lang);
          i = bodyEnd + 1;
        } else {
          i++;
        }
      }
      parent.children.push(fnNode);
      continue;
    }

    // For loop
    if (
      /^\bfor\s*[\(]/.test(trimmed) ||
      /^\bfor\s*\(/.test(trimmed) ||
      /^\bfor\s+/.test(trimmed)
    ) {
      const isForEach =
        /for\s*\(\s*(const|let|var|final|auto)?\s*\w+\s+(of|in|:)\s+/.test(
          trimmed,
        ) ||
        /for\s*\(\s*\w+\s+\w+\s*:\s*/.test(trimmed) ||
        /for\s*.*range/.test(trimmed) ||
        /foreach/i.test(trimmed);
      const node: ASTNode = {
        kind: isForEach ? "foreach-loop" : "for-loop",
        label: trimmed.replace(/\s*\{?\s*$/, ""),
        children: [],
        line: i + 1,
      };
      if (trimmed.includes("{")) {
        const bodyEnd = findMatchingBrace(lines, i);
        parseBraceLanguage(lines, i + 1, bodyEnd, node, lang);
        i = bodyEnd + 1;
      } else {
        const braceLineIdx = findNextBraceLine(lines, i + 1);
        if (braceLineIdx !== -1) {
          const bodyEnd = findMatchingBrace(lines, braceLineIdx);
          parseBraceLanguage(lines, braceLineIdx + 1, bodyEnd, node, lang);
          i = bodyEnd + 1;
        } else {
          // single-line loop body
          i++;
          if (i < end) {
            parseBraceLanguage(lines, i, i + 1, node, lang);
            i++;
          }
        }
      }
      parent.children.push(node);
      continue;
    }

    // While loop
    if (/^\bwhile\s*\(/.test(trimmed)) {
      const node: ASTNode = {
        kind: "while-loop",
        label: trimmed.replace(/\s*\{?\s*$/, ""),
        children: [],
        line: i + 1,
      };
      if (trimmed.includes("{")) {
        const bodyEnd = findMatchingBrace(lines, i);
        parseBraceLanguage(lines, i + 1, bodyEnd, node, lang);
        i = bodyEnd + 1;
      } else {
        const braceLineIdx = findNextBraceLine(lines, i + 1);
        if (braceLineIdx !== -1) {
          const bodyEnd = findMatchingBrace(lines, braceLineIdx);
          parseBraceLanguage(lines, braceLineIdx + 1, bodyEnd, node, lang);
          i = bodyEnd + 1;
        } else {
          i++;
        }
      }
      parent.children.push(node);
      continue;
    }

    // Do-while
    if (/^\bdo\s*\{?/.test(trimmed)) {
      const node: ASTNode = {
        kind: "do-while-loop",
        label: "do-while",
        children: [],
        line: i + 1,
      };
      if (trimmed.includes("{")) {
        const bodyEnd = findMatchingBrace(lines, i);
        parseBraceLanguage(lines, i + 1, bodyEnd, node, lang);
        i = bodyEnd + 1;
      } else {
        i++;
      }
      parent.children.push(node);
      continue;
    }

    // If / else if
    if (/^\b(if|else\s+if)\s*\(/.test(trimmed)) {
      const node: ASTNode = {
        kind: "if",
        label: trimmed.replace(/\s*\{?\s*$/, ""),
        children: [],
        line: i + 1,
      };
      if (trimmed.includes("{")) {
        const bodyEnd = findMatchingBrace(lines, i);
        parseBraceLanguage(lines, i + 1, bodyEnd, node, lang);
        i = bodyEnd + 1;
      } else {
        i++;
      }
      parent.children.push(node);
      continue;
    }

    // Else
    if (/^\belse\s*\{?/.test(trimmed)) {
      const node: ASTNode = {
        kind: "else",
        label: "else",
        children: [],
        line: i + 1,
      };
      if (trimmed.includes("{")) {
        const bodyEnd = findMatchingBrace(lines, i);
        parseBraceLanguage(lines, i + 1, bodyEnd, node, lang);
        i = bodyEnd + 1;
      } else {
        i++;
      }
      parent.children.push(node);
      continue;
    }

    // Return
    if (/^\breturn\b/.test(trimmed)) {
      parent.children.push({
        kind: "return",
        label: trimmed.replace(/;$/, ""),
        children: [],
        line: i + 1,
      });
      i++;
      continue;
    }

    // Collection allocation
    if (
      /\bnew\s+(Map|Set|HashMap|HashSet|ArrayList|TreeMap|TreeSet|Array|LinkedList|Queue|Deque|Stack)\b/.test(
        trimmed,
      ) ||
      /=\s*\[\s*\]/.test(trimmed) ||
      /=\s*make\(/.test(trimmed)
    ) {
      parent.children.push({
        kind: "collection-alloc",
        label: trimmed.replace(/;$/, ""),
        children: [],
        line: i + 1,
      });
      i++;
      continue;
    }

    // Function call (standalone expression)
    const callMatch = trimmed.match(/^(\w[\w.]*)\s*\(/);
    if (
      callMatch &&
      !/^(if|else|while|for|do|switch|catch|return|class|new)\b/.test(trimmed)
    ) {
      parent.children.push({
        kind: "call",
        label: trimmed.replace(/;$/, ""),
        detail: callMatch[1],
        children: [],
        line: i + 1,
      });
      i++;
      continue;
    }

    // Assignment / other
    if (/[=]/.test(trimmed) && !/[!=<>]=/.test(trimmed)) {
      parent.children.push({
        kind: "assignment",
        label: trimmed.replace(/;$/, ""),
        children: [],
        line: i + 1,
      });
    } else if (trimmed !== "{" && trimmed !== "}") {
      parent.children.push({
        kind: "unknown",
        label: trimmed.replace(/;$/, ""),
        children: [],
        line: i + 1,
      });
    }
    i++;
  }
}

function tryParseFunction(
  line: string,
  lang: SupportedLanguage,
  _lineIdx: number,
): ASTNode | null {
  let match: RegExpMatchArray | null = null;

  switch (lang) {
    case "javascript":
    case "typescript":
      match = line.match(/^(?:export\s+)?(?:async\s+)?function\s+(\w+)\s*\(/);
      if (!match)
        match = line.match(
          /^(?:const|let|var)\s+(\w+)\s*=\s*(?:async\s+)?\(?.*?\)?\s*=>/,
        );
      break;
    case "java":
    case "csharp":
      match = line.match(
        /^(?:public|private|protected|static|final|abstract|override|virtual|async|\s)*\s*(?:\w+(?:<[^>]+>)?(?:\[\])?)\s+(\w+)\s*\(/,
      );
      break;
    case "cpp":
      match = line.match(
        /^(?:static\s+|virtual\s+|inline\s+)?(?:\w+(?:<[^>]+>)?[\s*&]*)\s+(\w+)\s*\(/,
      );
      if (!match) match = line.match(/^void\s+(\w+)\s*\(/);
      break;
    case "go":
      match = line.match(/^func\s+(?:\([^)]*\)\s*)?(\w+)\s*\(/);
      break;
    case "kotlin":
      match = line.match(
        /^(?:fun|private\s+fun|public\s+fun|override\s+fun)\s+(\w+)\s*\(/,
      );
      break;
    case "python":
      match = line.match(/^def\s+(\w+)\s*\(/);
      break;
  }

  if (!match) return null;
  return {
    kind: "function",
    label: `fn ${match[1]}()`,
    detail: line.replace(/\s*\{?\s*$/, ""),
    children: [],
    line: _lineIdx + 1,
  };
}

function findMatchingBrace(lines: string[], startLine: number): number {
  let depth = 0;
  for (let i = startLine; i < lines.length; i++) {
    for (const ch of lines[i]) {
      if (ch === "{") depth++;
      if (ch === "}") {
        depth--;
        if (depth === 0) return i;
      }
    }
  }
  return lines.length - 1;
}

function findNextBraceLine(lines: string[], start: number): number {
  for (let i = start; i < Math.min(start + 3, lines.length); i++) {
    if (lines[i].trim().startsWith("{") || lines[i].includes("{")) return i;
  }
  return -1;
}

// ─── COMPLEXITY ANALYZER (from AST) ────────────────────────────────────────

function analyzeFromAST(
  ast: ASTNode,
  code: string,
  lang: SupportedLanguage,
): Omit<AnalysisResult, "ast"> {
  const patterns: string[] = [];
  let confidence: "high" | "medium" | "low" = "high";

  // 1. Compute max nested loop depth
  const maxLoopDepth = computeMaxLoopDepth(ast);

  // 2. Detect recursion
  const funcNames = collectFunctionNames(ast);
  const recursionInfo = detectRecursion(ast, code, funcNames, lang);

  // 3. Detect well-known algorithm patterns from code text
  const algoPattern = detectAlgorithmPattern(code, lang);

  // 4. Detect graph traversal
  const graphTraversal = detectGraphTraversal(ast, code);

  // 5. Determine time complexity
  let timeComplexity: ComplexityClass = "O(1)";

  // Priority: algorithm pattern > graph traversal > recursion+loops > loops > recursion
  if (algoPattern) {
    timeComplexity = algoPattern.complexity;
    patterns.push(...algoPattern.patterns);
    confidence = algoPattern.confidence;
  } else if (graphTraversal) {
    timeComplexity = "O(V + E)";
    patterns.push(...graphTraversal.patterns);
    confidence = graphTraversal.confidence;
  } else if (recursionInfo.isRecursive && maxLoopDepth > 0) {
    // Recursive function with inner loops — multiplicative unless it's divide-and-conquer
    if (recursionInfo.isDivideAndConquer) {
      timeComplexity = "O(n log n)";
      patterns.push("Divide-and-conquer recursion with linear work");
    } else if (recursionInfo.callCount >= 2) {
      timeComplexity = "O(2^n)";
      patterns.push("Exponential recursion with inner loops");
    } else {
      // Linear recursion * loop
      const loopPower = Math.min(maxLoopDepth + 1, 3);
      timeComplexity = powerToComplexity(loopPower);
      patterns.push(`Linear recursion × ${maxLoopDepth}-deep loop nesting`);
    }
    confidence = "medium";
  } else if (recursionInfo.isRecursive) {
    if (recursionInfo.isDivideAndConquer) {
      timeComplexity = "O(n log n)";
      patterns.push("Divide-and-conquer recursion (like merge sort)");
    } else if (recursionInfo.callCount >= 2 && !recursionInfo.hasMemoization) {
      timeComplexity = "O(2^n)";
      patterns.push("Multiple recursive calls without memoization");
    } else if (recursionInfo.callCount >= 2 && recursionInfo.hasMemoization) {
      timeComplexity = "O(n)";
      patterns.push("Recursive with memoization → linear");
    } else {
      timeComplexity = "O(n)";
      patterns.push("Linear recursion (single self-call)");
    }
  } else if (maxLoopDepth > 0) {
    // Check for binary search pattern inside while loop
    if (hasBinarySearchPattern(code, lang)) {
      timeComplexity = "O(log n)";
      patterns.push("Binary search pattern (halving search space)");
    } else {
      timeComplexity = depthToComplexity(maxLoopDepth);
      if (maxLoopDepth === 1) patterns.push("Single loop — linear iteration");
      else if (maxLoopDepth === 2)
        patterns.push("Nested loops (depth 2) — quadratic");
      else if (maxLoopDepth === 3) patterns.push("Triple nested loops — cubic");
      else patterns.push(`${maxLoopDepth}-deep nested loops (capped at cubic)`);
    }
  } else {
    patterns.push("No loops or recursion detected — constant time");
  }

  // 6. Space complexity
  const spaceComplexity = computeSpaceComplexity(ast, code, recursionInfo);

  // 7. Explanation
  const explanation = buildExplanation(
    timeComplexity,
    spaceComplexity,
    patterns,
  );

  return { timeComplexity, spaceComplexity, explanation, patterns, confidence };
}

// ── helpers ─────────────────────────────────────────────────────────────────

function computeMaxLoopDepth(node: ASTNode): number {
  const isLoop = [
    "for-loop",
    "while-loop",
    "do-while-loop",
    "foreach-loop",
  ].includes(node.kind);
  let maxChild = 0;
  for (const child of node.children) {
    maxChild = Math.max(maxChild, computeMaxLoopDepth(child));
  }
  return isLoop ? 1 + maxChild : maxChild;
}

function collectFunctionNames(node: ASTNode): string[] {
  const names: string[] = [];
  if (node.kind === "function") {
    const m = node.label.match(/fn\s+(\w+)/);
    if (m) names.push(m[1]);
  }
  for (const child of node.children) {
    names.push(...collectFunctionNames(child));
  }
  return names;
}

interface RecursionInfo {
  isRecursive: boolean;
  callCount: number;
  isDivideAndConquer: boolean;
  hasMemoization: boolean;
}

function detectRecursion(
  ast: ASTNode,
  code: string,
  funcNames: string[],
  _lang: SupportedLanguage,
): RecursionInfo {
  const result: RecursionInfo = {
    isRecursive: false,
    callCount: 0,
    isDivideAndConquer: false,
    hasMemoization: false,
  };

  const lowerCode = code.toLowerCase();
  result.hasMemoization = /memo|cache|dp\[|dynamic/.test(lowerCode);

  for (const funcName of funcNames) {
    const body = extractFunctionBodyText(code, funcName);
    if (!body) continue;

    const callRegex = new RegExp(`\\b${escapeRegex(funcName)}\\s*\\(`, "g");
    const matches = body.match(callRegex);
    if (matches && matches.length > 0) {
      result.isRecursive = true;
      result.callCount = Math.max(result.callCount, matches.length);

      // Divide-and-conquer: 2 recursive calls + array slicing or half-range
      if (
        matches.length >= 2 &&
        (/slice|substring|subarray/i.test(body) || /mid|half|\/\s*2/.test(body))
      ) {
        result.isDivideAndConquer = true;
      }
    }
  }

  return result;
}

function extractFunctionBodyText(
  code: string,
  funcName: string,
): string | null {
  const escaped = escapeRegex(funcName);
  const pattern = new RegExp(
    `(?:function|def|func|(?:public|private|protected|static|override|virtual|async|\\s)*\\s*(?:\\w+(?:<[^>]+>)?(?:\\[\\])?\\s+))${escaped}\\s*\\(`,
  );
  const match = pattern.exec(code);
  if (!match) return null;

  // For Python, find body by colon
  const colonIdx = code.indexOf(":", match.index + match[0].length);
  const braceIdx = code.indexOf("{", match.index + match[0].length);

  if (braceIdx !== -1 && (colonIdx === -1 || braceIdx < colonIdx)) {
    let depth = 1;
    let i = braceIdx + 1;
    while (i < code.length && depth > 0) {
      if (code[i] === "{") depth++;
      if (code[i] === "}") depth--;
      i++;
    }
    return code.substring(braceIdx + 1, i - 1);
  } else if (colonIdx !== -1) {
    const afterColon = code.substring(colonIdx + 1);
    const nextDef = afterColon.search(/\n(?=def\s|class\s)/);
    return nextDef === -1 ? afterColon : afterColon.substring(0, nextDef);
  }
  return null;
}

function detectAlgorithmPattern(
  code: string,
  _lang: SupportedLanguage,
): {
  complexity: ComplexityClass;
  patterns: string[];
  confidence: "high" | "medium" | "low";
} | null {
  const lower = code.toLowerCase();

  // Binary search (explicit mid + left/right)
  if (
    (/mid\s*=/.test(code) || /mid\s*=/.test(lower)) &&
    /left.*right|lo.*hi|low.*high/i.test(code)
  ) {
    return {
      complexity: "O(log n)",
      patterns: ["Binary search algorithm detected"],
      confidence: "high",
    };
  }

  // Two pointers
  if (
    /left.*right|start.*end|lo.*hi/i.test(code) &&
    /\+\+|--|\+=\s*1|-=\s*1/.test(code) &&
    !/mid/.test(lower)
  ) {
    return {
      complexity: "O(n)",
      patterns: ["Two-pointer technique"],
      confidence: "high",
    };
  }

  // Sliding window
  if (/window|sliding/i.test(lower) && /while|for/.test(lower)) {
    return {
      complexity: "O(n)",
      patterns: ["Sliding window technique"],
      confidence: "high",
    };
  }

  return null;
}

function detectGraphTraversal(
  _ast: ASTNode,
  code: string,
): { patterns: string[]; confidence: "high" | "medium" | "low" } | null {
  const hasAdjAccess = /graph\[\w+\]|adj\[\w+\]|neighbor|adjacency/i.test(code);
  const hasVisited = /visited|color|seen|marked/i.test(code);
  const hasDfsBfs =
    /dfs|bfs|queue|stack/i.test(code) ||
    /\bqueue\b|\bstack\b|Queue\(|Deque\(|LinkedList\(/i.test(code) ||
    /function\s+(\w+)[\s\S]*?\1\s*\(/.test(code) ||
    /def\s+(\w+)[\s\S]*?\1\s*\(/.test(code) ||
    /\b(\w+)\s*\([^)]*\)\s*\{[\s\S]*?\1\s*\(/.test(code);

  if (hasAdjAccess && hasVisited && hasDfsBfs) {
    return {
      patterns: ["Graph traversal (DFS/BFS on adjacency list)"],
      confidence: "high",
    };
  }
  if (hasAdjAccess && hasVisited) {
    return {
      patterns: ["Graph neighbor iteration with visited tracking"],
      confidence: "medium",
    };
  }
  return null;
}

function hasBinarySearchPattern(
  code: string,
  _lang: SupportedLanguage,
): boolean {
  return (
    (/mid/.test(code.toLowerCase()) &&
      /left.*right|lo.*hi|low.*high/i.test(code) &&
      /\/\s*2|>>\s*1/.test(code)) ||
    false
  );
}

function computeSpaceComplexity(
  ast: ASTNode,
  code: string,
  recursionInfo: RecursionInfo,
): ComplexityClass {
  let space: ComplexityClass = "O(1)";

  if (recursionInfo.isRecursive) space = "O(n)";

  // Check for collection allocations in the AST
  const hasAlloc = hasNodeOfKind(ast, "collection-alloc");
  if (hasAlloc) space = "O(n)";

  // Also check code text for allocations
  if (
    /new\s+(Map|Set|HashMap|HashSet|ArrayList|Array|TreeMap|Queue|Stack|Deque)/i.test(
      code,
    ) ||
    /=\s*\[\s*\]/.test(code) ||
    /\blist\(|dict\(|set\(/.test(code.toLowerCase())
  ) {
    space = "O(n)";
  }

  return space;
}

function hasNodeOfKind(node: ASTNode, kind: ASTNode["kind"]): boolean {
  if (node.kind === kind) return true;
  return node.children.some((c) => hasNodeOfKind(c, kind));
}

function depthToComplexity(depth: number): ComplexityClass {
  if (depth <= 0) return "O(1)";
  if (depth === 1) return "O(n)";
  if (depth === 2) return "O(n²)";
  return "O(n³)";
}

function powerToComplexity(power: number): ComplexityClass {
  if (power <= 0) return "O(1)";
  if (power === 1) return "O(n)";
  if (power === 2) return "O(n²)";
  return "O(n³)";
}

function buildExplanation(
  time: ComplexityClass,
  space: ComplexityClass,
  patterns: string[],
): string {
  let text = `Time: ${time}, Space: ${space}. `;
  if (patterns.length > 0) {
    text += `Analysis: ${patterns.join("; ")}.`;
  } else {
    text += "No significant complexity patterns detected.";
  }
  return text;
}

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// ─── CHART DATA ─────────────────────────────────────────────────────────────

function generateCurveData(complexity: ComplexityClass) {
  const data = [];
  for (let x = 1; x <= 10; x++) {
    let y = 1;
    switch (complexity) {
      case "O(1)":
        y = 1;
        break;
      case "O(log n)":
        y = x <= 1 ? 0.1 : Math.log2(x);
        break;
      case "O(n)":
        y = x;
        break;
      case "O(n log n)":
        y = x <= 1 ? 0.1 : x * Math.log2(x);
        break;
      case "O(V + E)":
        y = x * 1.5;
        break;
      case "O(n²)":
        y = x * x;
        break;
      case "O(n³)":
        y = x * x * x;
        break;
      case "O(2^n)":
        y = Math.pow(2, x);
        break;
    }
    data.push({ x, y: Math.round(y * 100) / 100 });
  }
  return data;
}

// ─── AST TREE VIEWER COMPONENT ──────────────────────────────────────────────

function ASTTreeNode({ node, depth = 0 }: { node: ASTNode; depth?: number }) {
  const [expanded, setExpanded] = useState(depth < 3);
  const hasChildren = node.children.length > 0;

  const kindColors: Record<string, string> = {
    program: "text-blue-500",
    function: "text-purple-500",
    "for-loop": "text-orange-500",
    "while-loop": "text-orange-500",
    "do-while-loop": "text-orange-500",
    "foreach-loop": "text-orange-400",
    if: "text-yellow-500",
    else: "text-yellow-600",
    call: "text-cyan-500",
    return: "text-green-500",
    assignment: "text-gray-500",
    recursion: "text-red-500",
    "collection-alloc": "text-pink-500",
    unknown: "text-gray-400",
    block: "text-gray-500",
  };

  const kindIcons: Record<string, string> = {
    program: "📦",
    function: "ƒ",
    "for-loop": "🔄",
    "while-loop": "🔄",
    "do-while-loop": "🔄",
    "foreach-loop": "🔄",
    if: "❓",
    else: "↪",
    call: "📞",
    return: "↩",
    assignment: "←",
    recursion: "🔁",
    "collection-alloc": "📦",
    unknown: "·",
    block: "{ }",
  };

  return (
    <div className="select-none">
      <div
        className={`flex items-center gap-1 py-0.5 px-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer text-sm font-mono`}
        style={{ paddingLeft: `${depth * 16}px` }}
        onClick={() => hasChildren && setExpanded(!expanded)}
      >
        {hasChildren ? (
          expanded ? (
            <ChevronDown className="w-3.5 h-3.5 flex-shrink-0 text-gray-400" />
          ) : (
            <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 text-gray-400" />
          )
        ) : (
          <span className="w-3.5 h-3.5 flex-shrink-0" />
        )}
        <span className="flex-shrink-0">{kindIcons[node.kind] || "·"}</span>
        <span className={`font-semibold ${kindColors[node.kind] || ""}`}>
          {node.kind}
        </span>
        <span className="text-gray-600 dark:text-gray-400 truncate ml-1">
          {node.label}
        </span>
        {node.line && (
          <span className="text-gray-400 text-xs ml-auto flex-shrink-0">
            L{node.line}
          </span>
        )}
      </div>
      {expanded &&
        hasChildren &&
        node.children.map((child, idx) => (
          <ASTTreeNode key={idx} node={child} depth={depth + 1} />
        ))}
    </div>
  );
}

// ─── MAIN COMPONENT ─────────────────────────────────────────────────────────

export default function ASTComplexityAnalyzer() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState<SupportedLanguage>("javascript");
  const [autoAnalyze, setAutoAnalyze] = useState(true);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [selectedSample, setSelectedSample] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const codeRef = useRef(code);
  codeRef.current = code;
  const langRef = useRef(language);
  langRef.current = language;

  const runAnalysis = useCallback(() => {
    const currentCode = codeRef.current.trim();
    if (!currentCode) {
      setResult(null);
      return;
    }
    setIsAnalyzing(true);
    setTimeout(() => {
      const ast = buildAST(currentCode, langRef.current);
      const analysis = analyzeFromAST(ast, currentCode, langRef.current);
      setResult({ ...analysis, ast });
      setIsAnalyzing(false);
    }, 200);
  }, []);

  useEffect(() => {
    if (autoAnalyze && code.trim()) runAnalysis();
    else if (!code.trim()) setResult(null);
  }, [code, language, autoAnalyze, runAnalysis]);

  const handleReset = () => {
    setCode("");
    setResult(null);
    setSelectedSample("");
  };

  const handleCopy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(
        `Time: ${result.timeComplexity}, Space: ${result.spaceComplexity}\n${result.explanation}`,
      );
    } catch {
      /* ignore */
    }
  };

  const loadSample = (key: string) => {
    const sample = SAMPLE_CODES[key];
    if (sample) {
      setLanguage(sample.lang);
      setCode(sample.code);
      setSelectedSample(key);
    }
  };

  const getComplexityColor = (c: ComplexityClass) =>
    COMPLEXITY_META[c]?.color || "#6b7280";

  const getConfidenceColor = (c: string) => {
    switch (c) {
      case "high":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "low":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const currentPlaceholder =
    LANGUAGES.find((l) => l.value === language)?.placeholder ?? "";

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <TreePine className="w-7 h-7 text-emerald-500" />
          <h1 className="text-2xl font-bold">AST Complexity Analyzer</h1>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Parses your code into an Abstract Syntax Tree and derives Big-O
          complexity from the tree structure
        </p>
      </div>

      {/* Sample Code Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="w-5 h-5" />
            Try Sample Algorithms
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {Object.entries(SAMPLE_CODES).map(([key, sample]) => (
              <Button
                key={key}
                variant={selectedSample === key ? "default" : "outline"}
                size="sm"
                onClick={() => loadSample(key)}
              >
                {sample.label}
                <Badge variant="secondary" className="ml-1 text-[10px]">
                  {LANGUAGES.find((l) => l.value === sample.lang)?.label}
                </Badge>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* ── Left: Editor ─────────────────────────────────────────────── */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center justify-between flex-wrap gap-2">
              <span>Code Editor</span>
              <div className="flex items-center gap-3">
                {/* Language Selector */}
                <Select
                  value={language}
                  onValueChange={(val) => setLanguage(val as SupportedLanguage)}
                >
                  <SelectTrigger className="w-[160px] h-8 text-sm">
                    <SelectValue placeholder="Language" />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGES.map((l) => (
                      <SelectItem key={l.value} value={l.value}>
                        {l.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Auto-analyse toggle */}
                <div className="flex items-center gap-1.5">
                  <Switch
                    checked={autoAnalyze}
                    onCheckedChange={setAutoAnalyze}
                    className="data-[state=checked]:bg-emerald-600"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Auto
                  </span>
                </div>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border rounded-lg overflow-hidden">
              <Editor
                value={code}
                onValueChange={setCode}
                highlight={(c: string) => c}
                padding={16}
                className="min-h-[300px] font-mono text-sm bg-gray-50 dark:bg-gray-800 dark:text-gray-100"
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 14,
                }}
                placeholder={currentPlaceholder}
              />
            </div>

            <div className="flex justify-between">
              <div className="space-x-2">
                <Button onClick={handleReset} variant="outline" size="sm">
                  <RotateCcw className="w-4 h-4 mr-1" /> Reset
                </Button>
                <Button
                  onClick={handleCopy}
                  variant="outline"
                  size="sm"
                  disabled={!result}
                >
                  <Copy className="w-4 h-4 mr-1" /> Copy Results
                </Button>
              </div>
              {!autoAnalyze && (
                <Button
                  onClick={runAnalysis}
                  size="sm"
                  className="bg-emerald-600 hover:bg-emerald-700"
                  disabled={isAnalyzing || !code.trim()}
                >
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {isAnalyzing ? "Analyzing…" : "Analyze"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* ── Right: Results ───────────────────────────────────────────── */}
        <div className="space-y-6">
          {isAnalyzing ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600" />
                <p className="font-semibold text-lg text-gray-600 dark:text-gray-400">
                  Building AST & analyzing…
                </p>
              </CardContent>
            </Card>
          ) : result ? (
            <>
              {/* Complexity Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Complexity Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span className="font-medium">Time</span>
                      </div>
                      <div
                        className="text-2xl font-bold px-3 py-1 rounded-lg text-white text-center"
                        style={{
                          backgroundColor: getComplexityColor(
                            result.timeComplexity,
                          ),
                        }}
                      >
                        {result.timeComplexity}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <HardDrive className="w-4 h-4 text-green-600" />
                        <span className="font-medium">Space</span>
                      </div>
                      <div
                        className="text-2xl font-bold px-3 py-1 rounded-lg text-white text-center"
                        style={{
                          backgroundColor: getComplexityColor(
                            result.spaceComplexity,
                          ),
                        }}
                      >
                        {result.spaceComplexity}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Confidence</span>
                      <Badge className={getConfidenceColor(result.confidence)}>
                        {result.confidence.toUpperCase()}
                      </Badge>
                    </div>

                    <div className="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                      {result.explanation}
                    </div>

                    {result.patterns.length > 0 && (
                      <div className="space-y-2">
                        <span className="font-medium text-sm">
                          Detected Patterns:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {result.patterns.map((p, i) => (
                            <Badge
                              key={i}
                              variant="secondary"
                              className="text-xs"
                            >
                              {p}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* AST Viewer + Charts */}
              <Card>
                <CardHeader>
                  <CardTitle>Visualizations</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="ast" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="ast">
                        <GitBranch className="w-4 h-4 mr-1" />
                        AST
                      </TabsTrigger>
                      <TabsTrigger value="time">
                        <Clock className="w-4 h-4 mr-1" />
                        Growth
                      </TabsTrigger>
                      <TabsTrigger value="comparison">Comparison</TabsTrigger>
                    </TabsList>

                    {/* AST Tree Tab */}
                    <TabsContent value="ast" className="space-y-2 pt-2">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Simplified AST — click nodes to expand / collapse
                      </p>
                      <div className="max-h-[420px] overflow-auto border rounded-lg p-2 bg-gray-50 dark:bg-gray-900">
                        <ASTTreeNode node={result.ast} />
                      </div>
                    </TabsContent>

                    {/* Growth Curve Tab */}
                    <TabsContent value="time" className="space-y-4">
                      <div className="text-center">
                        <h3 className="font-semibold text-lg">
                          {result.timeComplexity} Growth Pattern
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {COMPLEXITY_META[result.timeComplexity]?.description}
                        </p>
                      </div>
                      <div className="w-full aspect-square max-w-md mx-auto">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={generateCurveData(result.timeComplexity)}
                            margin={{
                              top: 20,
                              right: 30,
                              left: 20,
                              bottom: 20,
                            }}
                          >
                            <XAxis
                              dataKey="x"
                              tick={{ fontSize: 12 }}
                              axisLine={{ stroke: "#6b7280" }}
                              tickLine={{ stroke: "#6b7280" }}
                            />
                            <YAxis
                              tick={{ fontSize: 12 }}
                              axisLine={{ stroke: "#6b7280" }}
                              tickLine={{ stroke: "#6b7280" }}
                            />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "var(--background)",
                                border: "1px solid var(--border)",
                                borderRadius: "6px",
                                color: "var(--foreground)",
                              }}
                              formatter={(value) => [
                                value,
                                result.timeComplexity,
                              ]}
                              labelFormatter={(l) => `n = ${l}`}
                            />
                            <Line
                              type="monotone"
                              dataKey="y"
                              stroke={getComplexityColor(result.timeComplexity)}
                              strokeWidth={2}
                              dot={false}
                              activeDot={{
                                r: 4,
                                fill: getComplexityColor(result.timeComplexity),
                              }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </TabsContent>

                    {/* Comparison Bar Tab */}
                    <TabsContent value="comparison" className="space-y-4">
                      <div className="text-center">
                        <h3 className="font-semibold text-lg">
                          Complexity Comparison
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Where your algorithm sits among common complexities
                        </p>
                      </div>
                      <div className="w-full aspect-square max-w-md mx-auto">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={Object.entries(COMPLEXITY_META).map(
                              ([complexity, meta]) => ({
                                complexity,
                                value: meta.value,
                                isYours: complexity === result.timeComplexity,
                              }),
                            )}
                            margin={{
                              top: 20,
                              right: 30,
                              left: 20,
                              bottom: 20,
                            }}
                          >
                            <XAxis
                              dataKey="complexity"
                              tick={{ fontSize: 10 }}
                              axisLine={{ stroke: "#6b7280" }}
                              tickLine={{ stroke: "#6b7280" }}
                            />
                            <YAxis
                              tick={{ fontSize: 12 }}
                              axisLine={{ stroke: "#6b7280" }}
                              tickLine={{ stroke: "#6b7280" }}
                            />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: "var(--background)",
                                border: "1px solid var(--border)",
                                borderRadius: "6px",
                                color: "var(--foreground)",
                              }}
                              formatter={(value, _name, props) => [
                                value,
                                (props.payload as { isYours: boolean }).isYours
                                  ? "Your Algorithm"
                                  : "Reference",
                              ]}
                            />
                            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                              {Object.entries(COMPLEXITY_META).map(
                                ([complexity], idx) => (
                                  <Cell
                                    key={idx}
                                    fill={
                                      complexity === result.timeComplexity
                                        ? "#3b82f6"
                                        : "#94a3b8"
                                    }
                                  />
                                ),
                              )}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="h-fit">
              <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
                <TreePine className="w-12 h-12 text-gray-400" />
                <div className="text-center space-y-2">
                  <h3 className="font-semibold text-lg text-gray-600 dark:text-gray-400">
                    No Analysis Yet
                  </h3>
                  <p className="text-gray-500">
                    Select a language, paste your code, and see the AST-based
                    complexity breakdown
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
