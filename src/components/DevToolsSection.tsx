import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "./ui/card";
import { FiCode, FiSearch, FiStar, FiX } from "react-icons/fi";
import { GiLogicGateXor } from "react-icons/gi";
import { PiHashStraightFill } from "react-icons/pi";
import { LuFileJson, LuFileDiff } from "react-icons/lu";
import { SiJsonwebtokens } from "react-icons/si";
import { MdQrCode, MdQrCodeScanner, MdConstruction } from "react-icons/md";
import { BiGitBranch } from "react-icons/bi";
import { TbRegex } from "react-icons/tb";
import { CometCard } from "./ui/comet-card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { useState } from "react";
import { settings } from "@/config/settings";
const tools = [
  {
    name: "Code Complexity Analyzer",
    description: "AST-based Big O analysis with tree visualization",
    link: "/code-complexity-analyzer",
    icon: <BiGitBranch className="inline-block text-3xl text-emerald-600" />,
    category: "Programming",
    tags: [
      "ast",
      "algorithm",
      "complexity",
      "big-o",
      "tree",
      "analysis",
      "performance",
    ],
    popular: true,
    inDevelopment: true,
  },
  {
    name: "JSON Formatter & Viewer",
    description: "Format, validate and view JSON data",
    link: "/json-formatter",
    icon: <LuFileJson className="inline-block text-3xl text-emerald-600" />,
    category: "Data Processing",
    tags: ["json", "format", "validate"],
    popular: true,
    inDevelopment: false,
  },
  {
    name: "JSON Diff Tool",
    description:
      "Compare two JSON objects with visual, structural & patch views",
    link: "/json-diff",
    icon: <LuFileDiff className="inline-block text-3xl text-emerald-600" />,
    category: "Data Processing",
    tags: ["json", "diff", "compare", "patch"],
    popular: true,
    inDevelopment: false,
  },
  {
    name: "Regex Tester",
    description: "Test regular expressions with live matching & capture groups",
    link: "/regex-tester",
    icon: <TbRegex className="inline-block text-3xl text-emerald-600" />,
    category: "Programming",
    tags: ["regex", "regular expression", "match", "test", "capture group"],
    popular: true,
    inDevelopment: false,
  },
  {
    name: "Base64 Encoder/Decoder",
    description: "Encode and decode Base64 strings",
    link: "/base64-tool",
    icon: <FiCode className="inline-block text-3xl text-emerald-600" />,
    category: "Encoding",
    tags: ["base64", "encode", "decode"],
    popular: true,
    inDevelopment: false,
  },
  {
    name: "JWT Decoder",
    description: "Decode and analyze JWT tokens",
    link: "/jwt-decoder",
    icon: (
      <SiJsonwebtokens className="inline-block text-3xl text-emerald-600" />
    ),
    category: "Security",
    tags: ["jwt", "token", "security"],
    popular: false,
    inDevelopment: false,
  },
  {
    name: "Bitwise Visualizer",
    description: "Visualize bitwise operations",
    link: "/bitwise-visualizer",
    icon: <GiLogicGateXor className="inline-block text-3xl text-emerald-600" />,
    category: "Programming",
    tags: ["bitwise", "binary", "operations"],
    popular: false,
    inDevelopment: false,
  },
  {
    name: "Hash Generator",
    description: "Generate MD5, SHA1, SHA256 hashes",
    link: "/hash-generator",
    icon: (
      <PiHashStraightFill className="inline-block text-3xl text-emerald-600" />
    ),
    category: "Security",
    tags: ["hash", "md5", "sha256"],
    popular: false,
    inDevelopment: false,
  },
  {
    name: "QR Code Generator",
    description: "Generate QR codes for text, URLs, and more",
    link: "/qr-generator",
    icon: <MdQrCode className="inline-block text-3xl text-emerald-600" />,
    category: "Utilities",
    tags: ["qr", "code", "generator"],
    popular: true,
    inDevelopment: false,
  },
  {
    name: "QR Code Scanner",
    description: "Scan QR codes using camera or image upload",
    link: "/qr-scanner",
    icon: (
      <MdQrCodeScanner className="inline-block text-3xl text-emerald-600" />
    ),
    category: "Utilities",
    tags: ["qr", "scanner", "camera"],
    popular: false,
    inDevelopment: false,
  },
];
export default function ToolsForDev() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter tools based on search query and selected category
  const filteredTools = tools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      );

    const matchesCategory =
      selectedCategory === "All" || tool.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = ["All", ...new Set(tools.map((tool) => tool.category))];

  return (
    <div id="devtools" className="pt-10">
      <section className="p-6 md:p-8 max-w-5xl mx-auto transition-colors duration-300">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">DEV TOOLS</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            A collection of essential tools to enhance your development workflow
            and boost productivity.
          </p>

          {/* Search Bar */}
          {settings.devTools.enableSearch && (
            <div className="mb-6">
              <div className="relative">
                <FiSearch
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  size={16}
                />
                <Input
                  type="text"
                  placeholder="Search tools... (e.g., json, encode, qr)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-9 w-full"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Clear search"
                  >
                    <FiX size={14} />
                  </button>
                )}
              </div>
              {searchQuery && (
                <p className="text-xs text-muted-foreground mt-2">
                  {filteredTools.length === 0
                    ? "No tools match your search"
                    : `${filteredTools.length} tool${filteredTools.length === 1 ? "" : "s"} found`}
                </p>
              )}
            </div>
          )}

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            {categories.map((category) => {
              const count =
                category === "All"
                  ? tools.length
                  : tools.filter((tool) => tool.category === category).length;
              const isSelected = selectedCategory === category;

              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors select-none border ${
                    isSelected
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "bg-transparent text-muted-foreground border-neutral-200 dark:border-neutral-700 hover:border-neutral-400 dark:hover:border-neutral-500 hover:text-foreground"
                  }`}
                >
                  {category}
                  <span
                    className={`text-[10px] ${isSelected ? "opacity-70" : "opacity-50"}`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="space-y-6 py-3">
          {filteredTools.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">
                No tools found
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-sm">
                Try adjusting your search query
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool) => (
                <Link
                  key={tool.name}
                  to={tool.link}
                  className="group block mt-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-xl"
                  title={`${tool.name} - ${tool.description}`}
                >
                  <CometCard className="h-full">
                    <Card className="shadow-sm transition-all duration-300 border-neutral-200 dark:border-neutral-800 h-full flex flex-col">
                      <CardHeader className="px-5 pt-5 pb-3 flex-shrink-0">
                        <div className="flex items-center gap-3">
                          <div className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 shrink-0">
                            {tool.icon}
                          </div>
                          <span className="text-sm font-semibold leading-tight font-display text-left">
                            {tool.name}
                          </span>
                        </div>
                      </CardHeader>

                      {/* Description and Category */}
                      {settings.devTools.showDescriptions && (
                        <CardContent className="px-5 pb-5 flex-grow flex flex-col justify-between gap-3">
                          <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                            {tool.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <Badge
                              variant="secondary"
                              className="text-xs text-muted-foreground"
                            >
                              {tool.category}
                            </Badge>
                            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground/40 font-medium">
                              {tool.inDevelopment && <span>Beta</span>}
                              {tool.popular && <FiStar size={9} />}
                            </div>
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  </CometCard>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
