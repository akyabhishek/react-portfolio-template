"use client";

import React, { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";
import { FiCopy, FiClipboard, FiRefreshCw } from "react-icons/fi";
import { toast } from "../../hooks/use-toast";
import { Switch } from "@/components/ui/switch";

type EncodingType = "utf-8" | "utf-16" | "ascii";
const ENCODINGS: EncodingType[] = ["utf-8", "utf-16", "ascii"];

const encodeBase64 = (
  input: string,
  encoding: EncodingType,
  urlSafe: boolean,
  processLineByLine: boolean = false
): string => {
  try {
    const processLine = (line: string) => {
      const encoder = new TextEncoder();
      let base64: string;
      if (encoding !== "utf-8") {
        const buffer = encoder.encode(line);
        base64 = btoa(String.fromCharCode(...buffer));
      } else {
        const uint8 = encoder.encode(line);
        base64 = btoa(String.fromCharCode(...uint8));
      }
      if (urlSafe) {
        base64 = base64
          .replace(/\+/g, "-")
          .replace(/\//g, "_")
          .replace(/=+$/, "");
      }
      return base64;
    };

    if (processLineByLine) {
      return input.split("\n").map(processLine).join("\n");
    }
    return processLine(input);
  } catch {
    return "Encoding not supported in this browser.";
  }
};

const decodeBase64 = (
  input: string,
  encoding: EncodingType,
  processLineByLine: boolean
): string => {
  try {
    const processLine = (line: string) => {
      const binary = atob(line);
      const bytes = new Uint8Array(
        [...binary].map((char) => char.charCodeAt(0))
      );
      const decoder = new TextDecoder(encoding);
      return decoder.decode(bytes);
    };
    if (processLineByLine) {
      return input.split("\n").map(processLine).join("\n");
    }
    return processLine(input);
  } catch {
    return "Invalid Base64 input or encoding mismatch.";
  }
};

const Base64Tool: React.FC = () => {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [encodeInput, setEncodeInput] = useState("");
  const [decodeInput, setDecodeInput] = useState("");
  const [encoding, setEncoding] = useState<EncodingType>("utf-8");
  const [processLineByLine, setProcessLineByLine] = useState(false);
  const [isUrlSafe, setIsUrlSafe] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved data from localStorage on component mount
  useEffect(() => {
    try {
      const savedMode = localStorage.getItem("base64Tool_mode");
      const savedEncodeInput = localStorage.getItem("base64Tool_encodeInput");
      const savedDecodeInput = localStorage.getItem("base64Tool_decodeInput");
      const savedEncoding = localStorage.getItem("base64Tool_encoding");
      const savedProcessLineByLine = localStorage.getItem(
        "base64Tool_processLineByLine"
      );
      const savedIsUrlSafe = localStorage.getItem("base64Tool_isUrlSafe");

      if (savedMode && ["encode", "decode"].includes(savedMode)) {
        setMode(savedMode as "encode" | "decode");
      }
      if (savedEncodeInput) setEncodeInput(savedEncodeInput);
      if (savedDecodeInput) setDecodeInput(savedDecodeInput);
      if (savedEncoding && ENCODINGS.includes(savedEncoding as EncodingType)) {
        setEncoding(savedEncoding as EncodingType);
      }
      if (savedProcessLineByLine !== null)
        setProcessLineByLine(savedProcessLineByLine === "true");
      if (savedIsUrlSafe !== null) setIsUrlSafe(savedIsUrlSafe === "true");
    } catch (error) {
      console.warn("Failed to load from localStorage:", error);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever values change (but only after initial load)
  useEffect(() => {
    if (!isLoaded) return;

    try {
      localStorage.setItem("base64Tool_mode", mode);
      localStorage.setItem("base64Tool_encodeInput", encodeInput);
      localStorage.setItem("base64Tool_decodeInput", decodeInput);
      localStorage.setItem("base64Tool_encoding", encoding);
      localStorage.setItem(
        "base64Tool_processLineByLine",
        processLineByLine.toString()
      );
      localStorage.setItem("base64Tool_isUrlSafe", isUrlSafe.toString());
    } catch (error) {
      console.warn("Failed to save to localStorage:", error);
    }
  }, [
    mode,
    encodeInput,
    decodeInput,
    encoding,
    processLineByLine,
    isUrlSafe,
    isLoaded,
  ]);

  const input = mode === "encode" ? encodeInput : decodeInput;
  const setInput = mode === "encode" ? setEncodeInput : setDecodeInput;

  const output =
    mode === "encode"
      ? encodeBase64(encodeInput, encoding, isUrlSafe, processLineByLine)
      : decodeBase64(decodeInput, encoding, processLineByLine);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
      toast({ title: "Pasted from clipboard", duration: 3000 });
    } catch {
      toast({ title: "Failed to paste", duration: 3000 });
    }
  };

  const handleReset = () => {
    setEncodeInput("");
    setDecodeInput("");
    // Clear saved inputs from localStorage when resetting
    try {
      localStorage.removeItem("base64Tool_encodeInput");
      localStorage.removeItem("base64Tool_decodeInput");
    } catch (error) {
      console.warn("Failed to clear localStorage:", error);
    }
    toast({ title: "Inputs cleared", duration: 3000 });
  };

  return (
    <section className="max-w-screen-xl mx-auto p-4 space-y-2">
      <h2 className="text-2xl font-bold">Base64 Encoder / Decoder</h2>
      <p className="text-xs text-gray-500">
        Convert text to and from Base64 with URL-safe and line-by-line support.
        100% secure, all processing happens in your browser.
      </p>

      <Tabs
        value={mode}
        onValueChange={(val) => setMode(val as "encode" | "decode")}
        className="w-full"
      >
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="encode">Encode</TabsTrigger>
          <TabsTrigger value="decode">Decode</TabsTrigger>
        </TabsList>

        <div className="flex flex-col gap-4 mt-4">
          {/* Encoding dropdown */}
          <div>
            <Label htmlFor="encoding">Character Encoding</Label>
            <Select
              value={encoding}
              onValueChange={(val) => setEncoding(val as EncodingType)}
            >
              <SelectTrigger className="mt-2 w-[200px]">
                <SelectValue placeholder="Select Encoding" />
              </SelectTrigger>
              <SelectContent>
                {ENCODINGS.map((enc) => (
                  <SelectItem key={enc} value={enc}>
                    {enc.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {mode === "encode" && (
            <div className="flex items-center space-x-2">
              <Switch
                id="url-safe"
                checked={isUrlSafe}
                onCheckedChange={setIsUrlSafe}
              />
              <Label htmlFor="url-safe">Use URL-safe encoding</Label>
            </div>
          )}
          <div className="flex items-center space-x-2">
            <Switch
              id="line-by-line"
              checked={processLineByLine}
              onCheckedChange={setProcessLineByLine}
            />
            <Label htmlFor="line-by-line">
              {mode == "encode" ? "Encode" : "Decode"} each line separately
            </Label>
          </div>

          {/* Input section with paste & reset buttons */}
          <div className="relative">
            <Label htmlFor="input">Input</Label>
            <div className="absolute top-[2.2rem] right-1 z-10 flex gap-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 p-1 text-muted-foreground hover:text-primary"
                      onClick={handlePaste}
                    >
                      <FiClipboard size={16} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>Paste from clipboard</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 p-1 text-muted-foreground hover:text-primary"
                      onClick={handleReset}
                    >
                      <FiRefreshCw size={16} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>Reset all</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <Textarea
              id="input"
              placeholder={`Enter text to ${mode}`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="mt-2 pr-16"
              rows={5}
            />
          </div>

          {/* Output section with copy button */}
          <div className="relative">
            <Label htmlFor="output">Output</Label>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute top-[2.2rem] right-1 z-10 h-6 w-6 p-1 text-muted-foreground hover:text-primary"
                    onClick={() => {
                      if (!output) return;
                      navigator.clipboard.writeText(output);
                      toast({ title: "Copied to clipboard", duration: 3000 });
                    }}
                  >
                    <FiCopy size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="top">
                  <p>Copy to clipboard</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Textarea
              id="output"
              value={output}
              readOnly
              rows={5}
              className="mt-2 pr-10 bg-muted"
              placeholder={`Base64 ${
                mode === "encode" ? "encoded" : "decoded"
              } output`}
            />
          </div>
        </div>
      </Tabs>
    </section>
  );
};

export default Base64Tool;
