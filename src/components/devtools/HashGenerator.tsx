"use client";

import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FiCopy, FiClipboard, FiRefreshCw } from "react-icons/fi";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";

const encodeText = async (text: string, algo: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);

  // MD5 not supported by crypto.subtle
  if (algo === "MD5") {
    const md5 = await import("crypto-js/md5");
    return md5.default(text).toString();
  }

  const hashBuffer = await crypto.subtle.digest(algo, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
};

const HashGenerator: React.FC = () => {
  const [input, setInput] = useState("");
  const [algorithm, setAlgorithm] = useState<
    "MD5" | "SHA-1" | "SHA-256" | "SHA-512"
  >("SHA-256");
  const [hash, setHash] = useState("");
  const [live, setLive] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved data from localStorage on component mount
  React.useEffect(() => {
    try {
      const savedInput = localStorage.getItem("hashGenerator_input");
      const savedAlgorithm = localStorage.getItem("hashGenerator_algorithm");
      const savedLive = localStorage.getItem("hashGenerator_live");

      if (savedInput) setInput(savedInput);
      if (
        savedAlgorithm &&
        ["MD5", "SHA-1", "SHA-256", "SHA-512"].includes(savedAlgorithm)
      ) {
        setAlgorithm(savedAlgorithm as "MD5" | "SHA-1" | "SHA-256" | "SHA-512");
      }
      if (savedLive !== null) setLive(savedLive === "true");
    } catch (error) {
      console.warn("Failed to load from localStorage:", error);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever values change (but only after initial load)
  React.useEffect(() => {
    if (!isLoaded) return;

    try {
      localStorage.setItem("hashGenerator_input", input);
      localStorage.setItem("hashGenerator_algorithm", algorithm);
      localStorage.setItem("hashGenerator_live", live.toString());
    } catch (error) {
      console.warn("Failed to save to localStorage:", error);
    }
  }, [input, algorithm, live, isLoaded]);

  const generateHash = async () => {
    const result = await encodeText(input, algorithm);
    setHash(result);
  };

  React.useEffect(() => {
    if (live && input) {
      encodeText(input, algorithm).then(setHash);
    } else if (!input) {
      setHash("");
    }
  }, [input, algorithm, live]);

  const handleReset = () => {
    setInput("");
    setHash("");
    // Clear localStorage when resetting
    try {
      localStorage.removeItem("hashGenerator_input");
    } catch (error) {
      console.warn("Failed to clear localStorage:", error);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(hash);
    toast({ title: "Copied to clipboard", duration: 3000 });
  };

  return (
    <div className="flex items-center justify-center">
      <section className="max-w-screen-xl w-full p-4 space-y-6">
        <h2 className="text-2xl font-bold mb-5">Hash Generator</h2>
        <p className="text-xs text-gray-500">
          Generate MD5, SHA-1, SHA-256, and SHA-512 hashes instantly. Secure,
          in-browser, and supports text input with copy option.
        </p>
        <div>
          <Label>Text to hash</Label>
          <div className="relative">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter text..."
              className="pr-20"
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute top-2 right-12 z-10 h-6 w-6 p-1"
              aria-label="Reset"
              onClick={handleReset}
            >
              <FiRefreshCw size={14} />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 z-10 h-6 w-6 p-1"
              aria-label="Paste"
              onClick={async () => {
                const text = await navigator.clipboard.readText();
                setInput(text);
                toast({ title: "Pasted from clipboard", duration: 3000 });
              }}
            >
              <FiClipboard size={14} />
            </Button>
          </div>
        </div>

        <div>
          <Label>Hash Algorithm</Label>
          <Select
            value={algorithm}
            onValueChange={(val) => setAlgorithm(val as any)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select algorithm" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MD5">MD5</SelectItem>
              <SelectItem value="SHA-1">SHA-1</SelectItem>
              <SelectItem value="SHA-256">SHA-256</SelectItem>
              <SelectItem value="SHA-512">SHA-512</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between min-h-[40px]">
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <Switch
                checked={live}
                onCheckedChange={(val: boolean) => setLive(val)}
              />
              <span className="text-sm font-medium">Live conversion</span>
              <div className="w-2 h-2 flex items-center justify-center">
                {live && (
                  <span
                    className="inline-block w-2 h-2 rounded-full bg-emerald-600 animate-pulse"
                    style={{ animationDuration: "1.2s" }}
                    title="Live mode active"
                  ></span>
                )}
              </div>
            </label>
          </div>
          <div className="min-w-[120px] flex items-center justify-end h-10">
            {!live && (
              <Button onClick={generateHash} disabled={!input}>
                Generate Hash
              </Button>
            )}
          </div>
        </div>

        <div className="mt-4">
          <Label>Output:</Label>
          <div className="flex items-center gap-2 mt-1">
            <Textarea
              readOnly
              value={hash}
              className="mt-2 pr-10 bg-muted"
              placeholder="Hash will appear here..."
            />
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopy}
              disabled={!hash}
              className="h-6 w-6 p-1"
            >
              <FiCopy size={14} />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HashGenerator;
