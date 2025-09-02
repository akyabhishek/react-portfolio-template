"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Copy,
  RotateCcw,
  TrendingUp,
  Clock,
  HardDrive,
  Info,
} from "lucide-react";
import Editor from "react-simple-code-editor";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  Cell,
} from "recharts";

type ComplexityType =
  | "O(1)"
  | "O(log n)"
  | "O(n)"
  | "O(n log n)"
  | "O(n²)"
  | "O(n³)"
  | "O(2^n)";

interface ComplexityResult {
  timeComplexity: ComplexityType;
  spaceComplexity: ComplexityType;
  explanation: string;
  patterns: string[];
  confidence: "high" | "medium" | "low";
  language?: string;
  languageSupport?: "full" | "partial" | "limited" | "unsupported";
  warning?: string;
}

// Complexity visualization data
const complexityData = {
  "O(1)": {
    value: 1,
    color: "#22c55e",
    description: "Constant time - Best case",
  },
  "O(log n)": {
    value: 2,
    color: "#84cc16",
    description: "Logarithmic time - Very efficient",
  },
  "O(n)": {
    value: 3,
    color: "#eab308",
    description: "Linear time - Good performance",
  },
  "O(n log n)": {
    value: 4,
    color: "#f97316",
    description: "Linearithmic time - Acceptable",
  },
  "O(n²)": {
    value: 5,
    color: "#ef4444",
    description: "Quadratic time - Poor for large inputs",
  },
  "O(n³)": {
    value: 6,
    color: "#dc2626",
    description: "Cubic time - Very poor performance",
  },
  "O(2^n)": {
    value: 7,
    color: "#991b1b",
    description: "Exponential time - Extremely poor",
  },
};

// Generate simple Big O curve data
const generateComplexityGraphData = (complexity: ComplexityType) => {
  const data = [];
  for (let x = 1; x <= 10; x++) {
    let y = 1;
    switch (complexity) {
      case "O(1)":
        y = 1;
        break;
      case "O(log n)":
        y = Math.log2(x);
        break;
      case "O(n)":
        y = x;
        break;
      case "O(n log n)":
        y = x * Math.log2(x);
        break;
      case "O(n²)":
        y = x * x;
        break;
      case "O(n³)":
        y = x * x * x;
        break;
      case "O(2^n)":
        y = Math.pow(2, Math.min(x, 8)); // Cap to prevent huge numbers
        break;
    }
    data.push({
      x,
      y: Math.round(y * 100) / 100, // Round to 2 decimal places
    });
  }
  return data;
};

// Sample code examples
const sampleCodes = {
  "Linear Search": `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i;
    }
  }
  return -1;
}`,
  "Binary Search": `function binarySearch(arr, target) {
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
  "Bubble Sort": `function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
  "Fibonacci (Recursive)": `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`,
  "Merge Sort": `function mergeSort(arr) {
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
  "Two Sum": `function twoSum(nums, target) {
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
};

// --- ROBUST COMPLEXITY ANALYZER ---
const analyzeComplexity = (code: string): ComplexityResult => {
  const cleanCode = code.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, "").trim();
  const lines = cleanCode
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line);

  // Detect programming language
  const languageDetection = detectLanguage(cleanCode);

  let timeComplexity: ComplexityType = "O(1)";
  let spaceComplexity: ComplexityType = "O(1)";
  let patterns: string[] = [];
  let confidence: "high" | "medium" | "low" = "high";

  // Adjust confidence based on language support
  if (
    languageDetection.support === "limited" ||
    languageDetection.support === "unsupported"
  ) {
    confidence = "low";
  } else if (languageDetection.support === "partial") {
    confidence = confidence === "high" ? "medium" : "low";
  }

  // Enhanced tokenization and parsing
  const tokens = tokenizeCode(cleanCode, languageDetection.language);
  const ast = parseToAST(tokens, languageDetection.language);

  // Analyze different complexity patterns
  const loopAnalysis = analyzeLoops(ast, cleanCode, languageDetection.language);
  const recursionAnalysis = analyzeRecursion(
    ast,
    cleanCode,
    languageDetection.language
  );
  const algorithmPatternAnalysis = analyzeAlgorithmPatterns(cleanCode);

  // Determine time complexity based on analysis
  const complexityResults = [
    loopAnalysis,
    recursionAnalysis,
    algorithmPatternAnalysis,
  ].filter((result) => result.complexity !== "O(1)");

  if (complexityResults.length > 0) {
    // Take the highest complexity found
    const sortedComplexities = complexityResults.sort(
      (a, b) =>
        getComplexityWeight(b.complexity) - getComplexityWeight(a.complexity)
    );
    timeComplexity = sortedComplexities[0].complexity;
    patterns = sortedComplexities.flatMap((r) => r.patterns);
    confidence = getLowerConfidence(
      confidence,
      sortedComplexities[0].confidence
    );

    // Helper function for comparing confidence levels
    function getLowerConfidence(
      a: "high" | "medium" | "low",
      b: "high" | "medium" | "low"
    ): "high" | "medium" | "low" {
      const levels = { high: 3, medium: 2, low: 1 };
      return levels[a] < levels[b] ? a : b;
    }
  }

  // Determine space complexity
  const spaceAnalysis = analyzeSpaceComplexity(
    ast,
    cleanCode,
    languageDetection.language
  );
  spaceComplexity = spaceAnalysis.complexity;
  patterns = [...patterns, ...spaceAnalysis.patterns];

  const explanation = generateExplanation(
    timeComplexity,
    spaceComplexity,
    patterns
  );

  return {
    timeComplexity,
    spaceComplexity,
    explanation,
    patterns,
    confidence,
    language: languageDetection.language,
    languageSupport: languageDetection.support,
    warning: languageDetection.warning,
  };
};

// Language detection function
function detectLanguage(code: string): {
  language: string;
  support: "full" | "partial" | "limited" | "unsupported";
  warning?: string;
} {
  const lowerCode = code.toLowerCase();

  // JavaScript/TypeScript patterns
  if (/\b(function|const|let|var|=>)\b/.test(code) && /\{|\}/.test(code)) {
    return {
      language: "JavaScript/TypeScript",
      support: "full",
    };
  }

  // Java patterns
  if (
    /\b(public|private|class|void|int|String)\b/.test(code) &&
    /\{|\}/.test(code)
  ) {
    return {
      language: "Java",
      support: "full",
    };
  }

  // C/C++ patterns
  if (
    /\b(int|void|char|float|double|#include)\b/.test(code) &&
    /\{|\}/.test(code)
  ) {
    return {
      language: "C/C++",
      support: "full",
    };
  }

  // C# patterns
  if (
    /\b(using|namespace|class|void|int|string)\b/.test(code) &&
    /\{|\}/.test(code)
  ) {
    return {
      language: "C#",
      support: "full",
    };
  }

  // Python patterns
  if (
    /\b(def|if|elif|else|for|while|in|range)\b/.test(lowerCode) &&
    !/\{|\}/.test(code)
  ) {
    return {
      language: "Python",
      support: "partial",
      warning:
        "Python analysis may be less accurate due to syntax differences. Best results with JavaScript-like languages.",
    };
  }

  // Go patterns
  if (/\b(func|package|import|var|:=)\b/.test(lowerCode)) {
    return {
      language: "Go",
      support: "partial",
      warning:
        "Go analysis may miss some patterns. Consider using JavaScript-like syntax for better accuracy.",
    };
  }

  // Ruby patterns
  if (/\b(def|end|class|if|elsif|while|each)\b/.test(lowerCode)) {
    return {
      language: "Ruby",
      support: "limited",
      warning:
        "Ruby analysis is limited. Results may not be accurate. Consider using JavaScript-like languages.",
    };
  }

  // Kotlin patterns
  if (/\b(fun|val|var|class|if|when|for)\b/.test(lowerCode)) {
    return {
      language: "Kotlin",
      support: "partial",
      warning:
        "Kotlin analysis may miss some patterns. Better accuracy with Java or JavaScript.",
    };
  }

  // Functional languages (limited support)
  if (/\b(map|filter|reduce|lambda|foldr|foldl)\b/.test(lowerCode)) {
    return {
      language: "Functional Language",
      support: "limited",
      warning:
        "Functional programming analysis is limited. This tool is optimized for imperative languages.",
    };
  }

  // If we can't detect but there's code, assume it's C-style
  if (code.trim().length > 0) {
    return {
      language: "Unknown (C-style assumed)",
      support: "partial",
      warning:
        "Language not detected. Assuming C-style syntax. Results may vary.",
    };
  }

  return {
    language: "Unknown",
    support: "unsupported",
    warning: "Unable to detect programming language or syntax not supported.",
  };
}

// Enhanced tokenize function with language awareness
function tokenizeCode(code: string, language: string): string[] {
  // Base regex for C-style languages
  let tokenRegex =
    /\b(?:for|while|if|else|function|return|const|let|var|new|Map|Set|Array)\b|[(){}\[\];,=<>!&|+\-*/]|\w+|"[^"]*"|'[^']*'/g;

  // Adjust for Python
  if (language === "Python") {
    tokenRegex =
      /\b(?:for|while|if|elif|else|def|return|in|range|len)\b|[():,=<>!&|+\-*/]|\w+|"[^"]*"|'[^']*'/g;
  }

  // Adjust for Go
  if (language === "Go") {
    tokenRegex =
      /\b(?:for|if|else|func|return|var|:=|range|len)\b|[(){}\[\];,=<>!&|+\-*/]|\w+|"[^"]*"|'[^']*'/g;
  }

  return code.match(tokenRegex) || [];
}

// Simple AST-like structure for analysis
interface ASTNode {
  type: "loop" | "function" | "call" | "block" | "assignment";
  content: string;
  children: ASTNode[];
  depth: number;
}

function parseToAST(tokens: string[], language: string): ASTNode[] {
  const nodes: ASTNode[] = [];
  let depth = 0;
  let i = 0;

  while (i < tokens.length) {
    const token = tokens[i];

    // Handle different loop syntaxes based on language
    const isLoop =
      language === "Python"
        ? token === "for" || token === "while"
        : token === "for" || token === "while";

    // Handle different function syntaxes
    const isFunction =
      language === "Python"
        ? token === "def"
        : language === "Go"
        ? token === "func"
        : token === "function";

    if (isLoop) {
      const loopNode: ASTNode = {
        type: "loop",
        content: token,
        children: [],
        depth: depth,
      };

      // For Python, look for colon instead of brace
      const blockStart = language === "Python" ? ":" : "{";
      const blockEnd = language === "Python" ? null : "}"; // Python uses indentation

      // Skip to block start
      while (i < tokens.length && tokens[i] !== blockStart && tokens[i] !== "{")
        i++;
      i++; // skip block start
      depth++;

      const bodyTokens = [];
      if (language === "Python") {
        // For Python, we'll assume the next few tokens are the body (simplified)
        let tokenCount = 0;
        while (i < tokens.length && tokenCount < 10) {
          // Simple heuristic
          bodyTokens.push(tokens[i]);
          i++;
          tokenCount++;
        }
      } else {
        // For brace-based languages
        let braceCount = 1;
        while (i < tokens.length && braceCount > 0) {
          if (tokens[i] === "{") braceCount++;
          if (tokens[i] === "}") braceCount--;
          if (braceCount > 0) bodyTokens.push(tokens[i]);
          i++;
        }
      }

      loopNode.children = parseToAST(bodyTokens, language);
      nodes.push(loopNode);
      depth--;
    } else if (isFunction) {
      const funcNode: ASTNode = {
        type: "function",
        content: tokens[i + 1] || "",
        children: [],
        depth: depth,
      };
      nodes.push(funcNode);
      i++;
    } else if (
      token.includes("(") &&
      !["for", "while", "if", "def", "func"].includes(tokens[i - 1] || "")
    ) {
      const callNode: ASTNode = {
        type: "call",
        content: token,
        children: [],
        depth: depth,
      };
      nodes.push(callNode);
    }
    i++;
  }

  return nodes;
}

// Analyze loop patterns
function analyzeLoops(
  ast: ASTNode[],
  code: string,
  language: string
): {
  complexity: ComplexityType;
  patterns: string[];
  confidence: "high" | "medium" | "low";
} {
  const loops = findAllLoops(ast);

  if (loops.length === 0) {
    return { complexity: "O(1)", patterns: [], confidence: "high" };
  }

  const maxDepth = Math.max(...loops.map((loop) => getNestedDepth(loop, ast)));

  // Language-specific loop pattern detection
  let hasLengthDivision, hasBinarySearchPattern, hasLogPattern;

  if (language === "Python") {
    hasLengthDivision = /\/\/\s*2|\/\s*2/.test(code);
    hasBinarySearchPattern =
      /mid|left.*right|right.*left/.test(code) && hasLengthDivision;
    hasLogPattern = /log|binary|divide/.test(code.toLowerCase());
  } else {
    hasLengthDivision = /\/\s*2|>>|\/=\s*2/.test(code);
    hasBinarySearchPattern =
      /mid|left.*right|right.*left/.test(code) && hasLengthDivision;
    hasLogPattern = /log|binary|divide/.test(code.toLowerCase());
  }

  if (hasBinarySearchPattern || (hasLogPattern && maxDepth === 1)) {
    return {
      complexity: "O(log n)",
      patterns: ["Binary search or divide-and-conquer pattern"],
      confidence: language === "Python" ? "medium" : "high",
    };
  }

  // Analyze loop iteration patterns
  const patterns = [];
  let complexity: ComplexityType = "O(1)";

  if (maxDepth === 1) {
    if (hasLinearIteration(code, language)) {
      complexity = "O(n)";
      patterns.push("Single linear loop");
    }
  } else if (maxDepth === 2) {
    if (hasNestedLinearLoops(code, language)) {
      complexity = "O(n²)";
      patterns.push("Nested linear loops");
    }
  } else if (maxDepth === 3) {
    complexity = "O(n³)";
    patterns.push("Triple nested loops");
  } else if (maxDepth > 3) {
    complexity = `O(n^${maxDepth})` as ComplexityType;
    patterns.push(`${maxDepth} levels of nested loops`);
  }

  return {
    complexity,
    patterns,
    confidence: maxDepth <= 3 && language !== "Python" ? "high" : "medium",
  };
}

// Analyze recursion patterns
function analyzeRecursion(
  ast: ASTNode[],
  code: string,
  language: string
): {
  complexity: ComplexityType;
  patterns: string[];
  confidence: "high" | "medium" | "low";
} {
  const functions = ast.filter((node) => node.type === "function");

  for (const func of functions) {
    const funcName = func.content;
    if (!funcName) continue;

    const recursiveCallPattern = new RegExp(`\\b${funcName}\\s*\\(`, "g");
    const recursiveCalls = (code.match(recursiveCallPattern) || []).length - 1; // -1 for function definition

    if (recursiveCalls === 0) continue;

    // Check for memoization
    const hasMemoization = /memo|cache|dp|dynamic/.test(code.toLowerCase());

    // Fibonacci-like exponential recursion
    if (recursiveCalls >= 2 && !hasMemoization) {
      if (/fibonacci|fib/.test(code.toLowerCase())) {
        return {
          complexity: "O(2^n)",
          patterns: ["Exponential recursion (Fibonacci-like)"],
          confidence: "high",
        };
      }
      return {
        complexity: "O(2^n)",
        patterns: ["Multiple recursive calls without memoization"],
        confidence: language === "Python" ? "medium" : "medium",
      };
    }

    // Single recursive call patterns
    if (recursiveCalls === 1) {
      // Divide and conquer with linear work per level
      if (
        /merge|quick|sort/.test(code.toLowerCase()) ||
        hasArraySlicing(code, language)
      ) {
        return {
          complexity: "O(n log n)",
          patterns: ["Divide and conquer with linear work"],
          confidence: "high",
        };
      }

      // Simple linear recursion
      return {
        complexity: "O(n)",
        patterns: ["Linear recursion"],
        confidence: "high",
      };
    }
  }

  return { complexity: "O(1)", patterns: [], confidence: "high" };
}

// Analyze space complexity
function analyzeSpaceComplexity(
  ast: ASTNode[],
  code: string,
  language: string
): { complexity: ComplexityType; patterns: string[] } {
  const patterns = [];
  let complexity: ComplexityType = "O(1)";

  // Check for recursion (call stack) - language specific
  let hasRecursion;
  if (language === "Python") {
    hasRecursion = /def\s+(\w+).*?:\s*[\s\S]*?\1\s*\(/.test(code);
  } else if (language === "Go") {
    hasRecursion = /func\s+(\w+).*?\{[\s\S]*?\1\s*\(/.test(code);
  } else {
    hasRecursion = /function\s+(\w+).*?\{[\s\S]*?\1\s*\(/.test(code);
  }

  if (hasRecursion) {
    complexity = "O(n)";
    patterns.push("Recursion call stack");
  }

  // Check for data structure allocation - language specific
  let hasArrayAllocation, hasMapSetAllocation;

  if (language === "Python") {
    hasArrayAllocation = /\[\]|\[.*\]|list\(/.test(code);
    hasMapSetAllocation = /dict\(|\{\}|set\(/.test(code);
  } else if (language === "Java") {
    hasArrayAllocation = /new\s+\w+\[\]|new\s+ArrayList|new\s+Array/.test(code);
    hasMapSetAllocation = /new\s+(HashMap|HashSet|TreeMap|TreeSet)/.test(code);
  } else {
    hasArrayAllocation = /new\s+Array|Array\(|\[\]|\[.*\]/.test(code);
    hasMapSetAllocation = /new\s+(Map|Set|HashMap|HashSet)/.test(code);
  }

  if (hasArrayAllocation || hasMapSetAllocation) {
    complexity = "O(n)";
    if (hasArrayAllocation) patterns.push("Array allocation");
    if (hasMapSetAllocation) patterns.push("Hash table/Set allocation");
  }

  return { complexity, patterns };
}

// Analyze specific algorithm patterns
function analyzeAlgorithmPatterns(code: string): {
  complexity: ComplexityType;
  patterns: string[];
  confidence: "high" | "medium" | "low";
} {
  const lowerCode = code.toLowerCase();

  // Binary search pattern
  if (
    (/mid.*=.*\+.*\/|mid.*=.*>>/.test(code) ||
      /mid.*=.*floor.*\//.test(lowerCode)) &&
    /left.*right|right.*left/.test(lowerCode)
  ) {
    return {
      complexity: "O(log n)",
      patterns: ["Binary search algorithm"],
      confidence: "high",
    };
  }

  // Two pointers technique
  if (
    /left.*right|start.*end|i.*j/.test(lowerCode) &&
    /\+\+|\-\-/.test(code) &&
    !/for.*\(/.test(lowerCode)
  ) {
    return {
      complexity: "O(n)",
      patterns: ["Two pointers technique"],
      confidence: "high",
    };
  }

  // Sliding window
  if (
    /window|slide/.test(lowerCode) ||
    (/left.*right/.test(lowerCode) && /while.*\(/.test(lowerCode))
  ) {
    return {
      complexity: "O(n)",
      patterns: ["Sliding window technique"],
      confidence: "high",
    };
  }

  // Hash table lookup
  if (
    /map\.has|map\.get|set\.has/.test(lowerCode) &&
    !/for.*\(/.test(lowerCode)
  ) {
    return {
      complexity: "O(n)",
      patterns: ["Hash table operations"],
      confidence: "high",
    };
  }

  return { complexity: "O(1)", patterns: [], confidence: "high" };
}

// Helper functions
function findAllLoops(ast: ASTNode[]): ASTNode[] {
  const loops: ASTNode[] = [];

  function traverse(nodes: ASTNode[]) {
    for (const node of nodes) {
      if (node.type === "loop") {
        loops.push(node);
      }
      if (node.children) {
        traverse(node.children);
      }
    }
  }

  traverse(ast);
  return loops;
}

function getNestedDepth(loop: ASTNode, ast: ASTNode[]): number {
  let maxDepth = 1;

  function traverse(nodes: ASTNode[], currentDepth: number) {
    for (const node of nodes) {
      if (node.type === "loop") {
        maxDepth = Math.max(maxDepth, currentDepth + 1);
        traverse(node.children, currentDepth + 1);
      } else if (node.children) {
        traverse(node.children, currentDepth);
      }
    }
  }

  traverse(loop.children, 1);
  return maxDepth;
}

function hasLinearIteration(code: string, language: string): boolean {
  if (language === "Python") {
    return /for.*in.*range|for.*in.*len|while.*len|while.*</.test(code);
  } else if (language === "Go") {
    return /for.*range|for.*len|for.*</.test(code);
  } else {
    return /for.*i.*length|for.*i.*<|while.*length|while.*</.test(code);
  }
}

function hasNestedLinearLoops(code: string, language: string): boolean {
  if (language === "Python") {
    const forLoops = (code.match(/for\s+\w+\s+in/g) || []).length;
    const whileLoops = (code.match(/while\s+/g) || []).length;
    return forLoops + whileLoops >= 2;
  } else {
    const forLoops = (code.match(/for\s*\(/g) || []).length;
    const whileLoops = (code.match(/while\s*\(/g) || []).length;
    return forLoops + whileLoops >= 2;
  }
}

function hasArraySlicing(code: string, language: string): boolean {
  if (language === "Python") {
    return /\[.*:.*\]|slice/.test(code);
  } else if (language === "Go") {
    return /\[.*:.*\]/.test(code);
  } else {
    return /slice|substring|substr/.test(code);
  }
}

function getComplexityWeight(complexity: ComplexityType): number {
  const weights = {
    "O(1)": 1,
    "O(log n)": 2,
    "O(n)": 3,
    "O(n log n)": 4,
    "O(n²)": 5,
    "O(n³)": 6,
    "O(2^n)": 7,
  };
  return weights[complexity] || 0;
}

function generateExplanation(
  timeComplexity: ComplexityType,
  spaceComplexity: ComplexityType,
  patterns: string[]
): string {
  let explanation = `Time: ${timeComplexity}, Space: ${spaceComplexity}. `;

  if (patterns.length > 0) {
    explanation += `Analysis: ${patterns.join("; ")}.`;
  } else {
    explanation += "No significant complexity patterns detected.";
  }

  return explanation;
}

// --- REACT COMPONENT ---
export default function ComplexityAnalyzer() {
  const [code, setCode] = useState("");
  const [autoAnalyze, setAutoAnalyze] = useState(true);
  const [result, setResult] = useState<ComplexityResult | null>(null);
  const [selectedSample, setSelectedSample] = useState<string>("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const runAnalysis = async () => {
    if (code.trim()) {
      setIsAnalyzing(true);
      // Add a small delay to show loading state
      setTimeout(() => {
        setResult(analyzeComplexity(code));
        setIsAnalyzing(false);
      }, 300);
    } else {
      setResult(null);
      setIsAnalyzing(false);
    }
  };

  useEffect(() => {
    if (autoAnalyze) runAnalysis();
  }, [code, autoAnalyze]);

  const handleReset = () => {
    setCode("");
    setResult(null);
    setSelectedSample("");
  };

  const handleCopy = async () => {
    if (result) {
      try {
        await navigator.clipboard.writeText(
          `Time: ${result.timeComplexity}, Space: ${result.spaceComplexity}\nExplanation: ${result.explanation}`
        );
        // You could add a toast notification here
      } catch (err) {
        console.error("Failed to copy to clipboard:", err);
      }
    }
  };

  const loadSampleCode = (sampleName: string) => {
    setCode(sampleCodes[sampleName as keyof typeof sampleCodes]);
    setSelectedSample(sampleName);
  };

  const getComplexityColor = (complexity: ComplexityType) => {
    return complexityData[complexity]?.color || "#6b7280";
  };

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case "high":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Algorithm Complexity Analyzer</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Analyze time and space complexity of your algorithms with interactive
          visualizations
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
            {Object.keys(sampleCodes).map((sample) => (
              <Button
                key={sample}
                variant={selectedSample === sample ? "default" : "outline"}
                size="sm"
                onClick={() => loadSampleCode(sample)}
              >
                {sample}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Code Editor Section */}
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Code Editor</span>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={autoAnalyze}
                  onCheckedChange={setAutoAnalyze}
                  className="data-[state=checked]:bg-emerald-600"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Auto Analyze
                </span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border rounded-lg overflow-hidden">
              <Editor
                value={code}
                onValueChange={setCode}
                highlight={(code: string) => code} // Simple highlighting that just returns the code as-is
                padding={16}
                className="min-h-[300px] font-mono text-sm bg-gray-50 dark:bg-gray-800 dark:text-gray-100"
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 14,
                }}
                placeholder="// Enter your algorithm code here...
function example(arr) {
  // Your code here
  return result;
}"
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
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={isAnalyzing || !code.trim()}
                >
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {isAnalyzing ? "Analyzing..." : "Analyze"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        <div className="space-y-6">
          {isAnalyzing ? (
            <Card className="h-fit">
              <CardContent className="flex flex-col items-center justify-center py-12 space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <div className="text-center space-y-2">
                  <h3 className="font-semibold text-lg text-gray-600 dark:text-gray-400">
                    Analyzing Code...
                  </h3>
                  <p className="text-gray-500 dark:text-gray-500">
                    Examining patterns and calculating complexity
                  </p>
                </div>
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
                        <span className="font-medium">Time Complexity</span>
                      </div>
                      <div
                        className="text-2xl font-bold px-3 py-1 rounded-lg text-white text-center"
                        style={{
                          backgroundColor: getComplexityColor(
                            result.timeComplexity
                          ),
                        }}
                      >
                        {result.timeComplexity}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <HardDrive className="w-4 h-4 text-green-600" />
                        <span className="font-medium">Space Complexity</span>
                      </div>
                      <div
                        className="text-2xl font-bold px-3 py-1 rounded-lg text-white text-center"
                        style={{
                          backgroundColor: getComplexityColor(
                            result.spaceComplexity
                          ),
                        }}
                      >
                        {result.spaceComplexity}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Language Detected</span>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {result.language}
                        </Badge>
                        <Badge
                          className={
                            result.languageSupport === "full"
                              ? "bg-green-100 text-green-800 text-xs"
                              : result.languageSupport === "partial"
                              ? "bg-yellow-100 text-yellow-800 text-xs"
                              : "bg-red-100 text-red-800 text-xs"
                          }
                        >
                          {result.languageSupport?.toUpperCase()}
                        </Badge>
                      </div>
                    </div>

                    {result.warning && (
                      <div className="text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 p-2 rounded border border-amber-200 dark:border-amber-800">
                        ⚠️ {result.warning}
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <span className="font-medium">Confidence Level</span>
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
                          {result.patterns.map((pattern, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              {pattern}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Complexity Visualizations */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Visualization</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="time" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="time">Time Complexity</TabsTrigger>
                      <TabsTrigger value="comparison">
                        Complexity Comparison
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="time" className="space-y-4">
                      <div className="text-center">
                        <h3 className="font-semibold text-lg">
                          {result.timeComplexity} Growth Pattern
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {complexityData[result.timeComplexity]?.description}
                        </p>
                      </div>
                      <div className="w-full aspect-square max-w-md mx-auto">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={generateComplexityGraphData(
                              result.timeComplexity
                            )}
                            margin={{
                              top: 20,
                              right: 30,
                              left: 20,
                              bottom: 20,
                            }}
                          >
                            <XAxis
                              dataKey="x"
                              className="fill-gray-600 dark:fill-gray-400"
                              tick={{ fontSize: 12 }}
                              axisLine={{ stroke: "#6b7280" }}
                              tickLine={{ stroke: "#6b7280" }}
                            />
                            <YAxis
                              className="fill-gray-600 dark:fill-gray-400"
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
                              labelFormatter={(label) => `x: ${label}`}
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

                    <TabsContent value="comparison" className="space-y-4">
                      <div className="text-center">
                        <h3 className="font-semibold text-lg">
                          Complexity Comparison
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          How your algorithm compares to common complexities
                        </p>
                      </div>
                      <div className="w-full aspect-square max-w-md mx-auto">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={Object.entries(complexityData).map(
                              ([complexity, data]) => ({
                                complexity,
                                value: data.value,
                                isYourAlgorithm:
                                  complexity === result.timeComplexity,
                              })
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
                              className="fill-gray-600 dark:fill-gray-400"
                              tick={{ fontSize: 12 }}
                              axisLine={{ stroke: "#6b7280" }}
                              tickLine={{ stroke: "#6b7280" }}
                            />
                            <YAxis
                              className="fill-gray-600 dark:fill-gray-400"
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
                              formatter={(value, name, props) => [
                                value,
                                props.payload.isYourAlgorithm
                                  ? "Your Algorithm"
                                  : "Reference Complexity",
                              ]}
                            />
                            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                              {Object.entries(complexityData).map(
                                ([complexity, data], index) => (
                                  <Cell
                                    key={`cell-${index}`}
                                    fill={
                                      complexity === result.timeComplexity
                                        ? "#3b82f6"
                                        : "#94a3b8"
                                    }
                                  />
                                )
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
                <TrendingUp className="w-12 h-12 text-gray-400" />
                <div className="text-center space-y-2">
                  <h3 className="font-semibold text-lg text-gray-600 dark:text-gray-400">
                    No Analysis Yet
                  </h3>
                  <p className="text-gray-500 dark:text-gray-500">
                    Enter your algorithm code to see complexity analysis and
                    visualizations
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
