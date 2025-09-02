import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "./ui/card";
import { FiCode, FiSearch, FiStar } from "react-icons/fi";
import { GiLogicGateXor } from "react-icons/gi";
import { PiHashStraightFill } from "react-icons/pi";
import { LuFileJson } from "react-icons/lu";
import { SiJsonwebtokens } from "react-icons/si";
import { MdQrCode, MdQrCodeScanner, MdConstruction } from "react-icons/md";
import { BiTime } from "react-icons/bi";
import { CometCard } from "./ui/comet-card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { useState } from "react";
import { settings } from "@/config/settings";
const tools = [
  {
    name: "Algorithm Complexity Analyzer",
    description: "Analyze time and space complexity of algorithms",
    link: "/algorithm-complexity-analyzer",
    icon: <BiTime className="inline-block text-3xl text-emerald-600" />,
    category: "Programming",
    tags: ["algorithm", "complexity", "big-o", "performance", "analysis"],
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
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );

    const matchesCategory =
      selectedCategory === "All" || tool.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = ["All", ...new Set(tools.map((tool) => tool.category))];

  return (
    <div id="devtools">
      <section className="p-4 md:p-8 bg-gradient-to-b max-w-6xl mx-auto transition-colors duration-300">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">DEV TOOLS</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            A collection of essential tools to enhance your development workflow
            and boost productivity.
          </p>

          {/* Search Bar */}
          {settings.devTools.enableSearch && (
            <div className="relative mb-6">
              <FiSearch
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <Input
                type="text"
                placeholder="Search tools... (e.g., json, encode, qr)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full max-w-md"
              />
            </div>
          )}

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="outline" className="text-sm">
              {filteredTools.length}{" "}
              {filteredTools.length === 1 ? "tool" : "tools"} available
            </Badge>
            {categories.map((category) => {
              const count =
                category === "All"
                  ? tools.length
                  : tools.filter((tool) => tool.category === category).length;
              const isSelected = selectedCategory === category;

              return (
                <Badge
                  key={category}
                  variant={isSelected ? "default" : "secondary"}
                  className={`text-xs cursor-pointer transition-colors hover:bg-emerald-100 hover:text-emerald-800 dark:hover:bg-emerald-900 dark:hover:text-emerald-100 ${
                    isSelected ? "bg-emerald-600 text-white" : ""
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}: {count}
                </Badge>
              );
            })}
          </div>
        </div>

        <div className="space-y-6 border-l-2 border-dotted border-emerald-300 pl-6 py-3 rounded-2xl">
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
                  className="block text-center mt-1"
                  title={`${tool.name} - ${tool.description}`}
                  rel="noopener noreferrer"
                >
                  <CometCard className="h-full">
                    <Card className="shadow-sm hover:text-emerald-600 transition-all duration-300 border-neutral-200 dark:border-neutral-800 h-full group relative flex flex-col min-h-[200px]">
                      {/* Popular Badge */}
                      {tool.popular && (
                        <Badge
                          title="Popular"
                          className="absolute top-2 right-2 bg-emerald-100 text-emerald-800 dark:bg-emerald-900 hover:bg-emerald-200 dark:text-emerald-100 text-xs"
                        >
                          <FiStar size={12} />
                        </Badge>
                      )}

                      {/* Beta Badge */}
                      {tool.inDevelopment && (
                        <Badge
                          title="Beta"
                          className={`absolute top-2 ${
                            tool.popular ? "right-16" : "right-2"
                          } bg-orange-100 text-orange-800 dark:bg-orange-900 hover:bg-orange-200 dark:text-orange-100 text-xs`}
                        >
                          Beta
                        </Badge>
                      )}

                      <CardHeader className="font-semibold text-md flex flex-col items-center justify-center gap-2 p-6 flex-shrink-0">
                        <div className="flex flex-col items-center justify-center gap-2">
                          <div className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                            {tool.icon}
                          </div>
                          <span className="text-center text-md font-semibold leading-tight">
                            {tool.name}
                          </span>
                        </div>
                      </CardHeader>

                      {/* Description and Category */}
                      {settings.devTools.showDescriptions && (
                        <CardContent className="px-6 pb-4 flex-grow flex flex-col justify-between">
                          <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-2 flex-grow">
                            {tool.description}
                          </p>
                          <div className="flex justify-center mt-auto">
                            <Badge
                              variant="secondary"
                              className="text-xs muted"
                            >
                              {tool.category}
                            </Badge>
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
