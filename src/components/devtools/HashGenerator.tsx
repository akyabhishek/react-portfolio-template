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
import { Checkbox } from "@/components/ui/checkbox";
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
  const [live, setLive] = useState(false);

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

  const handleCopy = () => {
    navigator.clipboard.writeText(hash);
    toast({ title: "Copied to clipboard", duration: 3000 });
  };

  return (
    <div className="flex items-center justify-center">
      <section className="max-w-3xl w-full p-4 space-y-6">
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
              className="pr-10"
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="absolute top-2 right-2 z-10"
              aria-label="Paste"
              onClick={async () => {
                const text = await navigator.clipboard.readText();
                setInput(text);
                toast({ title: "Pasted from clipboard", duration: 3000 });
              }}
            >
              <FiClipboard size={18} />
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

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <Checkbox
              checked={live}
              onCheckedChange={(val: boolean) => setLive(val)}
            />
            <span className="flex items-center gap-1">
              Live conversion
              {live && (
                <span
                  className="inline-block w-2 h-2 rounded-full bg-emerald-600 ml-1 animate-pulse"
                  style={{ animationDuration: "1.2s" }}
                  title="Live mode active"
                ></span>
              )}
            </span>
          </label>
          {!live && (
            <Button onClick={generateHash} disabled={!input}>
              Generate Hash
            </Button>
          )}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Reset"
            onClick={() => {
              setInput("");
              setHash("");
            }}
            className="h-6 w-6 p-4 text-muted-foreground hover:text-primary"
          >
            <FiRefreshCw size={18} />
          </Button>
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
              size="icon"
              onClick={handleCopy}
              disabled={!hash}
            >
              <FiCopy size={16} />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HashGenerator;
