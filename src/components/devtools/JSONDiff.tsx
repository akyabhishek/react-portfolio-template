"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-json";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import * as jsonlint from "jsonlint-mod";
import { toast } from "@/hooks/use-toast";
import { FiCopy, FiUpload, FiRefreshCw } from "react-icons/fi";
import { useTheme } from "../theme-provider";
import * as jsondiffpatch from "jsondiffpatch";
import ReactDiffViewer, { DiffMethod } from "react-diff-viewer-continued";

const defaultLeft = `{
  "name": "John Doe",
  "age": 30,
  "email": "john@example.com",
  "address": {
    "city": "New York",
    "zip": "10001"
  },
  "hobbies": ["reading", "gaming"],
  "active": true
}`;

const defaultRight = `{
  "name": "John Doe",
  "age": 31,
  "email": "john.doe@example.com",
  "address": {
    "city": "San Francisco",
    "zip": "94102",
    "state": "CA"
  },
  "hobbies": ["reading", "hiking"],
  "active": false,
  "role": "admin"
}`;

type DiffViewTab = "visual" | "structural" | "patch";

export default function JSONDiff() {
  const [leftJson, setLeftJson] = useState<string>("");
  const [rightJson, setRightJson] = useState<string>("");
  const [leftError, setLeftError] = useState<string | null>(null);
  const [rightError, setRightError] = useState<string | null>(null);
  const [delta, setDelta] = useState<jsondiffpatch.Delta | undefined>(
    undefined,
  );
  const [activeTab, setActiveTab] = useState<DiffViewTab>("visual");
  const [isLoaded, setIsLoaded] = useState(false);
  const { theme } = useTheme();

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedLeft = localStorage.getItem("jsonDiff_left");
      const savedRight = localStorage.getItem("jsonDiff_right");
      const savedTab = localStorage.getItem("jsonDiff_tab");
      setLeftJson(savedLeft || defaultLeft);
      setRightJson(savedRight || defaultRight);
      if (savedTab && ["visual", "structural", "patch"].includes(savedTab)) {
        setActiveTab(savedTab as DiffViewTab);
      }
    } catch {
      setLeftJson(defaultLeft);
      setRightJson(defaultRight);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem("jsonDiff_left", leftJson);
      localStorage.setItem("jsonDiff_right", rightJson);
      localStorage.setItem("jsonDiff_tab", activeTab);
    } catch {
      // ignore
    }
  }, [leftJson, rightJson, activeTab, isLoaded]);

  // Validate helper
  const validate = (
    input: string,
    setError: (e: string | null) => void,
  ): any | null => {
    try {
      const parsed = jsonlint.parse(input);
      setError(null);
      return parsed;
    } catch (e: any) {
      setError(e.message);
      return null;
    }
  };

  // Compute diff when either side changes
  useEffect(() => {
    const left = validate(leftJson, setLeftError);
    const right = validate(rightJson, setRightError);
    if (left !== null && right !== null) {
      const d = jsondiffpatch.diff(left, right);
      setDelta(d);
    } else {
      setDelta(undefined);
    }
  }, [leftJson, rightJson]);

  // Beautify a JSON string
  const beautify = (json: string): string => {
    try {
      return JSON.stringify(JSON.parse(json), null, 2);
    } catch {
      return json;
    }
  };

  // File upload handler
  const handleFileUpload =
    (setter: (val: string) => void) => (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setter(content);
        toast({ title: "JSON file uploaded", duration: 3000 });
      };
      reader.readAsText(file);
    };

  // Render structural diff recursively
  const renderStructuralDiff = (
    delta: jsondiffpatch.Delta | undefined,
  ): React.ReactNode => {
    if (!delta) {
      return (
        <p className="text-green-600 dark:text-green-400 font-medium">
          No differences found – the JSON objects are identical.
        </p>
      );
    }

    const entries: React.ReactNode[] = [];

    const walkDelta = (d: any, path: string) => {
      for (const key of Object.keys(d)) {
        if (key === "_t") continue; // array marker
        const currentPath = path ? `${path}.${key}` : key;
        const value = d[key];

        if (Array.isArray(value)) {
          if (value.length === 1) {
            // Added
            entries.push(
              <div
                key={currentPath}
                className="flex items-start gap-2 py-1 border-b border-gray-100 dark:border-gray-800"
              >
                <span className="shrink-0 px-2 py-0.5 rounded text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  ADDED
                </span>
                <code className="text-sm font-mono break-all">
                  {currentPath}
                </code>
                <span className="text-gray-400 mx-1">=</span>
                <code className="text-sm font-mono text-green-700 dark:text-green-300 break-all">
                  {JSON.stringify(value[0])}
                </code>
              </div>,
            );
          } else if (value.length === 2) {
            // Modified
            entries.push(
              <div
                key={currentPath}
                className="flex items-start gap-2 py-1 border-b border-gray-100 dark:border-gray-800"
              >
                <span className="shrink-0 px-2 py-0.5 rounded text-xs font-semibold bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                  CHANGED
                </span>
                <code className="text-sm font-mono break-all">
                  {currentPath}
                </code>
                <span className="text-gray-400 mx-1">:</span>
                <code className="text-sm font-mono text-red-600 dark:text-red-400 line-through break-all">
                  {JSON.stringify(value[0])}
                </code>
                <span className="text-gray-400 mx-1">→</span>
                <code className="text-sm font-mono text-green-700 dark:text-green-300 break-all">
                  {JSON.stringify(value[1])}
                </code>
              </div>,
            );
          } else if (value.length === 3 && value[2] === 0) {
            // Deleted
            entries.push(
              <div
                key={currentPath}
                className="flex items-start gap-2 py-1 border-b border-gray-100 dark:border-gray-800"
              >
                <span className="shrink-0 px-2 py-0.5 rounded text-xs font-semibold bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                  REMOVED
                </span>
                <code className="text-sm font-mono break-all">
                  {currentPath}
                </code>
                <span className="text-gray-400 mx-1">=</span>
                <code className="text-sm font-mono text-red-600 dark:text-red-400 line-through break-all">
                  {JSON.stringify(value[0])}
                </code>
              </div>,
            );
          }
        } else if (typeof value === "object" && value !== null) {
          walkDelta(value, currentPath);
        }
      }
    };

    walkDelta(delta, "");

    if (entries.length === 0) {
      return (
        <p className="text-green-600 dark:text-green-400 font-medium">
          No differences found – the JSON objects are identical.
        </p>
      );
    }

    return <div className="space-y-1">{entries}</div>;
  };

  // Summary stats
  const getDiffStats = (
    delta: jsondiffpatch.Delta | undefined,
  ): { added: number; removed: number; changed: number } => {
    const stats = { added: 0, removed: 0, changed: 0 };
    if (!delta) return stats;

    const walk = (d: any) => {
      for (const key of Object.keys(d)) {
        if (key === "_t") continue;
        const value = d[key];
        if (Array.isArray(value)) {
          if (value.length === 1) stats.added++;
          else if (value.length === 2) stats.changed++;
          else if (value.length === 3 && value[2] === 0) stats.removed++;
        } else if (typeof value === "object" && value !== null) {
          walk(value);
        }
      }
    };
    walk(delta);
    return stats;
  };

  const stats = getDiffStats(delta);
  const hasErrors = leftError !== null || rightError !== null;

  const editorClassName =
    "min-h-[350px] font-mono text-sm bg-muted dark:bg-[#23272f] rounded-lg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 transition-colors";

  return (
    <div className="flex items-center justify-center">
      <section className="max-w-screen-xl w-full p-4 space-y-4">
        <h2 className="text-2xl font-bold mb-1">JSON Diff Tool</h2>
        <p className="text-xs text-gray-500 mb-4">
          Compare two JSON objects side by side. Paste or upload JSON, then view
          visual diffs, structural changes, or JSON Patch output.
        </p>

        {/* Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">Original (Left)</span>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    document.getElementById("diff-upload-left")?.click();
                  }}
                  title="Upload JSON"
                >
                  <FiUpload size={14} />
                </Button>
                <input
                  id="diff-upload-left"
                  type="file"
                  accept=".json"
                  className="hidden"
                  onChange={handleFileUpload(setLeftJson)}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setLeftJson(beautify(leftJson));
                    toast({ title: "Beautified", duration: 2000 });
                  }}
                  title="Beautify"
                >
                  Beautify
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(leftJson);
                    toast({ title: "Copied", duration: 2000 });
                  }}
                  title="Copy"
                >
                  <FiCopy size={14} />
                </Button>
              </div>
            </div>
            {leftError && (
              <Alert variant="destructive" className="py-2">
                <AlertTitle className="text-xs">Invalid JSON (Left)</AlertTitle>
                <AlertDescription className="text-xs">
                  {leftError}
                </AlertDescription>
              </Alert>
            )}
            <Editor
              value={leftJson}
              onValueChange={setLeftJson}
              highlight={(code: string) =>
                Prism.highlight(code, Prism.languages.json, "json")
              }
              padding={12}
              className={editorClassName}
              style={{ fontFamily: "JetBrains Mono" }}
            />
          </div>

          {/* Right */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold">Modified (Right)</span>
              <div className="flex gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    document.getElementById("diff-upload-right")?.click();
                  }}
                  title="Upload JSON"
                >
                  <FiUpload size={14} />
                </Button>
                <input
                  id="diff-upload-right"
                  type="file"
                  accept=".json"
                  className="hidden"
                  onChange={handleFileUpload(setRightJson)}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setRightJson(beautify(rightJson));
                    toast({ title: "Beautified", duration: 2000 });
                  }}
                  title="Beautify"
                >
                  Beautify
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(rightJson);
                    toast({ title: "Copied", duration: 2000 });
                  }}
                  title="Copy"
                >
                  <FiCopy size={14} />
                </Button>
              </div>
            </div>
            {rightError && (
              <Alert variant="destructive" className="py-2">
                <AlertTitle className="text-xs">
                  Invalid JSON (Right)
                </AlertTitle>
                <AlertDescription className="text-xs">
                  {rightError}
                </AlertDescription>
              </Alert>
            )}
            <Editor
              value={rightJson}
              onValueChange={setRightJson}
              highlight={(code: string) =>
                Prism.highlight(code, Prism.languages.json, "json")
              }
              padding={12}
              className={editorClassName}
              style={{ fontFamily: "JetBrains Mono" }}
            />
          </div>
        </div>

        {/* Swap & Reset */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const temp = leftJson;
              setLeftJson(rightJson);
              setRightJson(temp);
              toast({ title: "Swapped", duration: 2000 });
            }}
            title="Swap left and right"
          >
            <FiRefreshCw size={14} className="mr-1" /> Swap
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setLeftJson("{}");
              setRightJson("{}");
              try {
                localStorage.removeItem("jsonDiff_left");
                localStorage.removeItem("jsonDiff_right");
              } catch {
                // ignore
              }
              toast({ title: "Reset", duration: 2000 });
            }}
          >
            Reset
          </Button>
        </div>

        {/* Diff Stats */}
        {!hasErrors && delta !== undefined && (
          <div className="flex items-center gap-3 text-sm">
            <span className="px-2 py-0.5 rounded bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 font-semibold">
              +{stats.added} added
            </span>
            <span className="px-2 py-0.5 rounded bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 font-semibold">
              ~{stats.changed} changed
            </span>
            <span className="px-2 py-0.5 rounded bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 font-semibold">
              -{stats.removed} removed
            </span>
          </div>
        )}

        {!hasErrors && delta === undefined && leftJson && rightJson && (
          <p className="text-green-600 dark:text-green-400 font-medium text-sm">
            No differences – the JSON objects are identical.
          </p>
        )}

        {/* Diff Output Tabs */}
        {!hasErrors && (
          <Tabs
            value={activeTab}
            onValueChange={(val) => setActiveTab(val as DiffViewTab)}
          >
            <TabsList>
              <TabsTrigger value="visual">Visual Diff</TabsTrigger>
              <TabsTrigger value="structural">Structural Diff</TabsTrigger>
              <TabsTrigger value="patch">JSON Patch</TabsTrigger>
            </TabsList>

            <TabsContent value="visual">
              <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-auto">
                <ReactDiffViewer
                  oldValue={beautify(leftJson)}
                  newValue={beautify(rightJson)}
                  splitView={true}
                  useDarkTheme={theme === "dark"}
                  leftTitle="Original"
                  rightTitle="Modified"
                  compareMethod={DiffMethod.WORDS}
                />
              </div>
            </TabsContent>

            <TabsContent value="structural">
              <div className="rounded-lg border border-gray-200 dark:border-gray-700 p-4 bg-muted dark:bg-[#23272f] overflow-auto min-h-[200px]">
                {renderStructuralDiff(delta)}
              </div>
            </TabsContent>

            <TabsContent value="patch">
              <div className="rounded-lg border border-gray-200 dark:border-gray-700 overflow-auto">
                <div className="flex items-center justify-between p-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="text-xs text-gray-500">
                    RFC 6902-style JSON Patch
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      const patchOps = generatePatch();
                      navigator.clipboard.writeText(
                        JSON.stringify(patchOps, null, 2),
                      );
                      toast({
                        title: "Patch copied to clipboard",
                        duration: 2000,
                      });
                    }}
                  >
                    <FiCopy size={14} className="mr-1" /> Copy
                  </Button>
                </div>
                <Editor
                  value={JSON.stringify(generatePatch(), null, 2)}
                  onValueChange={() => {}}
                  highlight={(code: string) =>
                    Prism.highlight(code, Prism.languages.json, "json")
                  }
                  padding={12}
                  className="font-mono text-sm bg-muted dark:bg-[#23272f] text-gray-900 dark:text-gray-100 min-h-[200px]"
                  style={{ fontFamily: "JetBrains Mono" }}
                  readOnly
                />
              </div>
            </TabsContent>
          </Tabs>
        )}
      </section>
    </div>
  );

  // Generate RFC 6902-style patch from jsondiffpatch delta
  function generatePatch(): Array<{
    op: string;
    path: string;
    value?: any;
    from?: string;
  }> {
    const ops: Array<{
      op: string;
      path: string;
      value?: any;
      from?: string;
    }> = [];
    if (!delta) return ops;

    const walk = (d: any, basePath: string) => {
      for (const key of Object.keys(d)) {
        if (key === "_t") continue;
        const escapedKey = key.replace(/~/g, "~0").replace(/\//g, "~1");
        const currentPath = `${basePath}/${escapedKey}`;
        const value = d[key];

        if (Array.isArray(value)) {
          if (value.length === 1) {
            ops.push({ op: "add", path: currentPath, value: value[0] });
          } else if (value.length === 2) {
            ops.push({ op: "replace", path: currentPath, value: value[1] });
          } else if (value.length === 3 && value[2] === 0) {
            ops.push({ op: "remove", path: currentPath });
          }
        } else if (typeof value === "object" && value !== null) {
          walk(value, currentPath);
        }
      }
    };

    walk(delta, "");
    return ops;
  }
}
