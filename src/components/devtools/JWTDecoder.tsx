"use client";

import React, { useState } from "react";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-json";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import { FiCopy, FiRefreshCw } from "react-icons/fi";
import { toast } from "../../hooks/use-toast";
import { Label } from "@/components/ui/label";

function decodeJWT(token: string) {
  if (!token.trim()) return {};
  try {
    const [header, payload, signature] = token.split(".");
    if (!header || !payload) return { error: "Invalid JWT format" };
    const decode = (str: string) => {
      str = str.replace(/-/g, "+").replace(/_/g, "/");
      while (str.length % 4) str += "=";
      return JSON.parse(atob(str));
    };
    return {
      header: decode(header),
      payload: decode(payload),
      signature,
    };
  } catch (e) {
    return { error: "Failed to decode JWT" };
  }
}

const JWTDecoder: React.FC = () => {
  const [jwt, setJwt] = useState("");
  const [decoded, setDecoded] = useState<any>({});
  const [live, setLive] = useState(true);

  React.useEffect(() => {
    if (live) {
      setDecoded(decodeJWT(jwt));
    }
  }, [jwt, live]);

  const handleDecode = () => {
    setDecoded(decodeJWT(jwt));
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setJwt(text);
      toast({ title: "Pasted from clipboard", duration: 3000 });
    } catch {
      toast({ title: "Failed to paste", duration: 3000 });
    }
  };

  const handleReset = () => {
    setJwt("");
    setDecoded({});
    toast({ title: "Inputs cleared", duration: 3000 });
  };

  // Highlight JSON using Prism
  const highlightJson = (json: any) => {
    if (!json) return "";
    const jsonStr =
      typeof json === "string" ? json : JSON.stringify(json, null, 2);
    return Prism.highlight(jsonStr, Prism.languages.json, "json");
  };

  return (
    <section className="max-w-screen-xl mx-auto p-4 space-y-2">
      <h2 className="text-2xl font-bold">JWT Decoder</h2>
      <p className="text-xs text-gray-500">
        Paste your JWT below to decode its header and payload. All processing
        happens in your browser.
      </p>
      <div className="relative">
        <Label htmlFor="jwt-input">JWT Token</Label>
        <div className="absolute top-[2.2rem] right-1 z-10 flex gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-6 w-6 p-1 text-muted-foreground hover:text-primary"
            onClick={handlePaste}
          >
            <FiCopy size={16} />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-6 w-6 p-1 text-muted-foreground hover:text-primary"
            onClick={handleReset}
          >
            <FiRefreshCw size={16} />
          </Button>
        </div>
        <Textarea
          id="jwt-input"
          placeholder="Paste JWT token here"
          value={jwt}
          onChange={(e) => setJwt(e.target.value)}
          className="mt-2 pr-16"
          rows={3}
        />
      </div>
      <div className="flex items-center justify-between mt-2 min-h-[40px]">
        <div className="flex items-center space-x-2">
          <Switch id="live-decode" checked={live} onCheckedChange={setLive} />
          <Label htmlFor="live-decode">Live decode</Label>
        </div>
        <div style={{ minWidth: 90 }}>
          {!live && (
            <Button onClick={handleDecode} disabled={!jwt}>
              Decode
            </Button>
          )}
        </div>
      </div>
      <div className="mt-4">
        <Label>Decoded Header</Label>
        <div className="mt-2 bg-muted rounded p-2 text-sm overflow-x-auto min-h-[80px]">
          <Editor
            value={
              decoded.header ? JSON.stringify(decoded.header, null, 2) : ""
            }
            onValueChange={() => {}}
            highlight={highlightJson}
            placeholder="Decoded header will appear here"
            padding={2}
            readOnly
            className="font-mono text-base bg-transparent border-none text-gray-900 dark:text-gray-100"
            style={{ fontFamily: "JetBrains Mono" }}
          />
        </div>
      </div>
      <div className="mt-2">
        <Label>Decoded Payload</Label>
        <div className="mt-2 bg-muted rounded p-2 text-sm overflow-x-auto min-h-[120px]">
          <Editor
            value={
              decoded.payload ? JSON.stringify(decoded.payload, null, 2) : ""
            }
            onValueChange={() => {}}
            highlight={highlightJson}
            padding={2}
            placeholder="Decoded payload will appear here"
            readOnly
            className="font-mono text-base bg-transparent border-none text-gray-900 dark:text-gray-100"
            style={{ fontFamily: "JetBrains Mono" }}
          />
        </div>
      </div>
      {decoded.error && (
        <p className="text-red-500 text-xs mt-2">{decoded.error}</p>
      )}
    </section>
  );
};

export default JWTDecoder;
