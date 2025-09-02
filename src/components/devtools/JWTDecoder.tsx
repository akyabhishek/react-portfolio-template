"use client";

import React, { useState, useRef, useCallback } from "react";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-json";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import { FiCopy, FiRefreshCw, FiInfo } from "react-icons/fi";
import { toast } from "../../hooks/use-toast";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Standard JWT claims with descriptions
const STANDARD_CLAIMS = {
  // Registered claims (RFC 7519)
  iss: {
    name: "Issuer",
    description:
      "The issuer of the JWT. This is typically a URL or identifier of the service that issued the token.",
    type: "string",
  },
  sub: {
    name: "Subject",
    description:
      "The subject of the JWT. This is typically the user ID or identifier of the entity the token represents.",
    type: "string",
  },
  aud: {
    name: "Audience",
    description:
      "The audience that this JWT is intended for. This can be a string or array of strings.",
    type: "string | string[]",
  },
  exp: {
    name: "Expiration Time",
    description:
      "The expiration time of the JWT as a Unix timestamp. After this time, the JWT should not be accepted.",
    type: "number",
  },
  nbf: {
    name: "Not Before",
    description:
      "The time before which the JWT should not be accepted, as a Unix timestamp.",
    type: "number",
  },
  iat: {
    name: "Issued At",
    description: "The time at which the JWT was issued, as a Unix timestamp.",
    type: "number",
  },
  jti: {
    name: "JWT ID",
    description:
      "A unique identifier for the JWT. This can be used to prevent JWT replay attacks.",
    type: "string",
  },
  // Common custom claims
  name: {
    name: "Name",
    description: "The full name of the user.",
    type: "string",
  },
  given_name: {
    name: "Given Name",
    description: "The first name of the user.",
    type: "string",
  },
  family_name: {
    name: "Family Name",
    description: "The last name of the user.",
    type: "string",
  },
  email: {
    name: "Email",
    description: "The email address of the user.",
    type: "string",
  },
  email_verified: {
    name: "Email Verified",
    description: "Whether the user's email address has been verified.",
    type: "boolean",
  },
  preferred_username: {
    name: "Preferred Username",
    description: "The preferred username of the user.",
    type: "string",
  },
  picture: {
    name: "Picture",
    description: "URL to the user's profile picture.",
    type: "string",
  },
  locale: {
    name: "Locale",
    description: "The user's locale/language preference.",
    type: "string",
  },
  updated_at: {
    name: "Updated At",
    description:
      "Time when the user's information was last updated, as a Unix timestamp.",
    type: "number",
  },
  phone_number: {
    name: "Phone Number",
    description: "The user's phone number.",
    type: "string",
  },
  phone_number_verified: {
    name: "Phone Number Verified",
    description: "Whether the user's phone number has been verified.",
    type: "boolean",
  },
  roles: {
    name: "Roles",
    description: "Array of roles assigned to the user.",
    type: "string[]",
  },
  permissions: {
    name: "Permissions",
    description: "Array of permissions granted to the user.",
    type: "string[]",
  },
  scope: {
    name: "Scope",
    description:
      "OAuth 2.0 scope values that the access token is authorized for.",
    type: "string",
  },
};

function formatClaimValue(key: string, value: any): string {
  if (value === null || value === undefined) return "null";

  // Format timestamps
  if (
    (key === "exp" || key === "nbf" || key === "iat" || key === "updated_at") &&
    typeof value === "number"
  ) {
    const date = new Date(value * 1000);
    return `${value} (${date.toLocaleString()})`;
  }

  // Format arrays
  if (Array.isArray(value)) {
    return JSON.stringify(value);
  }

  // Format objects
  if (typeof value === "object") {
    return JSON.stringify(value);
  }

  return String(value);
}

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
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("json");

  // Load saved data from localStorage on component mount
  React.useEffect(() => {
    try {
      const savedJwt = localStorage.getItem("jwtDecoder_jwt");
      const savedLive = localStorage.getItem("jwtDecoder_live");

      if (savedJwt) setJwt(savedJwt);
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
      localStorage.setItem("jwtDecoder_jwt", jwt);
      localStorage.setItem("jwtDecoder_live", live.toString());
    } catch (error) {
      console.warn("Failed to save to localStorage:", error);
    }
  }, [jwt, live, isLoaded]);

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
    // Clear localStorage when resetting
    try {
      localStorage.removeItem("jwtDecoder_jwt");
    } catch (error) {
      console.warn("Failed to clear localStorage:", error);
    }
    toast({ title: "Inputs cleared", duration: 3000 });
  };

  const handleCopyHeader = async () => {
    try {
      const headerText = decoded.header
        ? JSON.stringify(decoded.header, null, 2)
        : "";
      await navigator.clipboard.writeText(headerText);
      toast({ title: "Header copied to clipboard", duration: 3000 });
    } catch {
      toast({ title: "Failed to copy header", duration: 3000 });
    }
  };

  const handleCopyPayload = async () => {
    try {
      const payloadText = decoded.payload
        ? JSON.stringify(decoded.payload, null, 2)
        : "";
      await navigator.clipboard.writeText(payloadText);
      toast({ title: "Payload copied to clipboard", duration: 3000 });
    } catch {
      toast({ title: "Failed to copy payload", duration: 3000 });
    }
  };

  // Highlight JSON using Prism
  const highlightJson = (json: any) => {
    if (!json) return "";
    const jsonStr =
      typeof json === "string" ? json : JSON.stringify(json, null, 2);
    return Prism.highlight(jsonStr, Prism.languages.json, "json");
  };

  return (
    <section className="max-w-screen-xl mx-auto p-4">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold">JWT Decoder</h2>
        <p className="text-xs text-gray-500">
          Paste your JWT below to decode its header and payload. All processing
          happens in your browser.
        </p>
      </div>

      {/* Main Layout: Left and Right columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side - JWT Input */}
        <div className="flex flex-col space-y-4">
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
              className={`mt-2 pr-16 resize-none ${
                jwt && !decoded.error
                  ? ""
                  : jwt && decoded.error
                  ? "text-red-600 dark:text-red-400"
                  : ""
              }`}
              rows={20}
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between min-h-[40px]">
            <div className="flex items-center space-x-2">
              <Switch
                id="live-decode"
                checked={live}
                onCheckedChange={setLive}
              />
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

          {/* Error display */}
          {decoded.error && (
            <p className="text-red-500 text-xs">{decoded.error}</p>
          )}
        </div>

        {/* Right Side - Decoded Output */}
        <div className="flex flex-col space-y-6">
          {/* Header Section */}
          <div>
            <Label>Decoded Header</Label>
            <Tabs defaultValue="json" className="mt-2">
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="json">JSON</TabsTrigger>
                <TabsTrigger value="claims">Claims Table</TabsTrigger>
              </TabsList>

              <TabsContent value="json" className="mt-2">
                <div className="bg-muted rounded p-2 text-sm max-h-60 overflow-auto relative">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute top-1 right-1 h-6 w-6 p-1 text-muted-foreground hover:text-primary z-10"
                    onClick={handleCopyHeader}
                    disabled={!decoded.header}
                  >
                    <FiCopy size={14} />
                  </Button>
                  <Editor
                    value={
                      decoded.header
                        ? JSON.stringify(decoded.header, null, 2)
                        : ""
                    }
                    onValueChange={() => {}}
                    highlight={highlightJson}
                    placeholder="Decoded header will appear here"
                    padding={2}
                    readOnly
                    className="text-base bg-transparent border-none text-gray-900 dark:text-gray-100"
                    style={{ fontFamily: "JetBrains Mono" }}
                  />
                </div>
              </TabsContent>

              <TabsContent value="claims" className="mt-2">
                {decoded.header && Object.keys(decoded.header).length > 0 ? (
                  <div className="border rounded-md max-h-60 overflow-auto">
                    <TooltipProvider>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[120px]">Claim</TableHead>
                            <TableHead className="w-[150px]">Name</TableHead>
                            <TableHead>Value</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {Object.entries(decoded.header).map(
                            ([key, value]) => {
                              // Common header claims
                              const headerClaims = {
                                alg: {
                                  name: "Algorithm",
                                  description:
                                    "The algorithm used to sign the JWT",
                                  type: "string",
                                },
                                typ: {
                                  name: "Type",
                                  description:
                                    "The type of token, typically 'JWT'",
                                  type: "string",
                                },
                                kid: {
                                  name: "Key ID",
                                  description:
                                    "A hint indicating which key was used to secure the JWS",
                                  type: "string",
                                },
                                cty: {
                                  name: "Content Type",
                                  description: "The content type of the JWT",
                                  type: "string",
                                },
                                crit: {
                                  name: "Critical",
                                  description:
                                    "Extensions that must be understood and processed",
                                  type: "string[]",
                                },
                              };
                              const claimInfo =
                                headerClaims[key as keyof typeof headerClaims];
                              const isStandardClaim = !!claimInfo;

                              return (
                                <TableRow key={key}>
                                  <TableCell className="text-sm">
                                    <span
                                      className={
                                        isStandardClaim
                                          ? "text-blue-600 dark:text-blue-400"
                                          : "text-gray-600 dark:text-gray-400"
                                      }
                                    >
                                      {key}
                                    </span>
                                  </TableCell>
                                  <TableCell className="text-sm">
                                    {claimInfo
                                      ? claimInfo.name
                                      : "Custom Claim"}
                                  </TableCell>
                                  <TableCell className="text-sm max-w-[300px] truncate">
                                    {formatClaimValue(key, value)}
                                  </TableCell>
                                </TableRow>
                              );
                            }
                          )}
                        </TableBody>
                      </Table>
                    </TooltipProvider>
                  </div>
                ) : (
                  <div className="bg-muted rounded p-4 text-center text-gray-500 min-h-[80px] flex items-center justify-center">
                    <p>No header claims to display</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* Payload Section */}
          <div>
            <Label>Decoded Payload</Label>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="mt-2"
            >
              <TabsList className="grid grid-cols-2">
                <TabsTrigger value="json">JSON</TabsTrigger>
                <TabsTrigger value="claims">Claims Table</TabsTrigger>
              </TabsList>

              <TabsContent value="json" className="mt-2">
                <div className="bg-muted rounded p-2 text-sm max-h-80 overflow-auto relative">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute top-1 right-1 h-6 w-6 p-1 text-muted-foreground hover:text-primary z-10"
                    onClick={handleCopyPayload}
                    disabled={!decoded.payload}
                  >
                    <FiCopy size={14} />
                  </Button>
                  <Editor
                    value={
                      decoded.payload
                        ? JSON.stringify(decoded.payload, null, 2)
                        : ""
                    }
                    onValueChange={() => {}}
                    highlight={highlightJson}
                    padding={2}
                    placeholder="Decoded payload will appear here"
                    readOnly
                    className="text-base bg-transparent border-none text-gray-900 dark:text-gray-100"
                    style={{ fontFamily: "JetBrains Mono" }}
                  />
                </div>
              </TabsContent>

              <TabsContent value="claims" className="mt-2">
                {decoded.payload && Object.keys(decoded.payload).length > 0 ? (
                  <div className="border rounded-md max-h-80 overflow-auto">
                    <TooltipProvider>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className="w-[120px]">Claim</TableHead>
                            <TableHead className="w-[150px]">Name</TableHead>
                            <TableHead>Value</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {Object.entries(decoded.payload).map(
                            ([key, value]) => {
                              const claimInfo =
                                STANDARD_CLAIMS[
                                  key as keyof typeof STANDARD_CLAIMS
                                ];
                              const isStandardClaim = !!claimInfo;

                              return (
                                <TableRow key={key}>
                                  <TableCell className="text-sm">
                                    <span
                                      className={
                                        isStandardClaim
                                          ? "text-blue-600 dark:text-blue-400"
                                          : "text-gray-600 dark:text-gray-400"
                                      }
                                    >
                                      {key}
                                    </span>
                                  </TableCell>
                                  <TableCell className="text-sm">
                                    {claimInfo
                                      ? claimInfo.name
                                      : "Custom Claim"}
                                  </TableCell>
                                  <TableCell className="text-sm max-w-[300px] truncate">
                                    {formatClaimValue(key, value)}
                                  </TableCell>
                                </TableRow>
                              );
                            }
                          )}
                        </TableBody>
                      </Table>
                    </TooltipProvider>
                  </div>
                ) : (
                  <div className="bg-muted rounded p-4 text-center text-gray-500 min-h-[120px] flex items-center justify-center">
                    <p>No payload claims to display</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JWTDecoder;
