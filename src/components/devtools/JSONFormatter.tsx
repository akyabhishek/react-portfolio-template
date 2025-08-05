"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-json";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ReactJson from "react-json-view";
import * as jsonlint from "jsonlint-mod";
import { toast } from "@/hooks/use-toast";
import { FiCopy, FiDownload, FiUpload } from "react-icons/fi";
import { useTheme } from "../theme-provider";

export default function JSONFormatter() {
  const defaultJson = `{
  "user": {
    "id": 1,
    "name": "John Doe",
    "profile": {
      "email": "john@example.com",
      "address": {
        "city": "New York",
        "zip": "10001",
        "geo": {
          "lat": 40.7128,
          "lng": -74.0060
        }
      }
    }
  },
  "posts": [
    {
      "id": 101,
      "title": "Hello World",
      "comments": [
        { "id": 1, "text": "Nice post!" },
        { "id": 2, "text": "Thanks for sharing." }
      ]
    }
  ]
}`;
  const [rawJson, setRawJson] = useState<string>("");
  const [parsedJson, setParsedJson] = useState<any>({});
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [mode, setMode] = useState<"beautify" | "minify">("beautify");
  const { theme, setTheme } = useTheme();
  // Validate and parse JSON
  const handleValidate = (input: string) => {
    try {
      const parsed = jsonlint.parse(input);
      setParsedJson(parsed);
      setError(null);
    } catch (e: any) {
      setError(e.message);
    }
  };

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("jsonFormatterData");
    setRawJson(saved || defaultJson);
  }, []);

  // Save to localStorage and validate on change
  useEffect(() => {
    if (rawJson) {
      localStorage.setItem("jsonFormatterData", rawJson);
    }
    handleValidate(rawJson);
  }, [rawJson]);

  // Format Toggle
  const toggleFormat = () => {
    try {
      const formatted =
        mode === "beautify"
          ? JSON.stringify(JSON.parse(rawJson))
          : JSON.stringify(JSON.parse(rawJson), null, 2);
      setRawJson(formatted);
      setMode(mode === "beautify" ? "minify" : "beautify");
    } catch (e) {
      setError("Invalid JSON for formatting");
    }
  };

  // File Upload
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setRawJson(content);
    };
    reader.readAsText(file);
  };

  // Export as File
  const exportToFile = () => {
    const blob = new Blob([rawJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "formatted.json";
    a.click();
  };

  // Search and Highlight Keys
  const highlightJson = (json: any, query: string): any => {
    if (!query) return json;
    if (typeof json === "object" && json !== null) {
      if (Array.isArray(json)) {
        return json.map((item) => highlightJson(item, query));
      }
      return Object.keys(json).reduce((acc: any, key) => {
        const val = json[key];
        const highlightedKey = key.includes(query) ? `🔍 ${key}` : key;
        acc[highlightedKey] = highlightJson(val, query);
        return acc;
      }, {});
    }
    return json;
  };

  return (
    <div className="flex items-center justify-center">
      <section className="max-w-3xl w-full p-4 space-y-2">
        <h2 className="text-2xl font-bold mb-5">JSON Formatter & Viewer</h2>
        <p className="text-xs text-gray-500">
          Format, view, and copy your JSON data. Paste or upload JSON, view as
          text or tree, and copy or reset easily.
        </p>
        <div className="space-y-1">
          {error && (
            <Alert variant="destructive">
              <AlertTitle>Invalid JSON</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="editor" style={{ marginTop: "0!important" }}>
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="editor">Editor</TabsTrigger>
                <TabsTrigger value="tree">Tree View</TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                {/* Upload button before Download */}
                <Button
                  variant="ghost"
                  type="button"
                  onClick={() => {
                    document.getElementById("json-upload-input")?.click();
                  }}
                  title="Upload JSON file"
                >
                  <FiUpload size={16} />
                </Button>
                <input
                  id="json-upload-input"
                  type="file"
                  accept=".json"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    handleFileUpload(e);
                    toast({ title: "JSON file uploaded", duration: 3000 });
                  }}
                />
                <Button
                  onClick={() => {
                    exportToFile();
                    toast({ title: "JSON downloaded", duration: 3000 });
                  }}
                  variant="ghost"
                  title="Download JSON"
                >
                  <FiDownload size={16} />
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    navigator.clipboard.writeText(rawJson);
                    toast({ title: "Copied to clipboard", duration: 3000 });
                  }}
                  title="Copy JSON"
                >
                  <FiCopy size={16} />
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setRawJson("{}");
                    setError(null);
                    toast({ title: "JSON reset", duration: 3000 });
                  }}
                  title="Reset JSON"
                >
                  Reset
                </Button>
              </div>
            </div>
            <TabsContent value="editor">
              <div className="relative">
                {/* Beautify button on top right of textarea */}
                <Button
                  variant="outline"
                  className="absolute top-2 right-4 z-10"
                  onClick={() => {
                    try {
                      const beautified = JSON.stringify(
                        JSON.parse(rawJson),
                        null,
                        2
                      );
                      setRawJson(beautified);
                      setError(null);
                      toast({ title: "Beautified JSON", duration: 3000 });
                    } catch (e) {
                      setError("Invalid JSON for beautify");
                      toast({
                        title: "Invalid JSON for beautify",
                        duration: 3000,
                        variant: "destructive",
                      });
                    }
                  }}
                  title="Beautify JSON"
                >
                  Beautify
                </Button>
                <Editor
                  value={rawJson}
                  onValueChange={setRawJson}
                  highlight={(code: any) =>
                    Prism.highlight(code, Prism.languages.json, "json")
                  }
                  padding={16}
                  className="min-h-[400px] font-mono text-base bg-muted dark:bg-[#23272f] rounded-lg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 transition-colors"
                  style={{ fontFamily: "JetBrains Mono" }}
                />
              </div>
            </TabsContent>
            <TabsContent value="tree">
              <div className="border rounded p-4 overflow-auto min-h-[400px] bg-muted  text-sm text-gray-900 dark:text-gray-100 border-gray-200 dark:border-gray-700 transition-colors">
                <ReactJson
                  src={parsedJson}
                  name={null}
                  collapsed={2}
                  displayDataTypes={false}
                  enableClipboard={false}
                  theme={theme === "dark" ? "monokai" : "rjv-default"}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
}
