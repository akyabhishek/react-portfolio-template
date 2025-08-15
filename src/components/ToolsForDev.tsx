import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "./ui/card";
import { FiCode } from "react-icons/fi";
import { GiLogicGateXor } from "react-icons/gi";
import { PiHashStraightFill } from "react-icons/pi";
import { LuFileJson } from "react-icons/lu";
import { SiJsonwebtokens } from "react-icons/si";
import { MdQrCode } from "react-icons/md";
import { CometCard } from "./ui/comet-card";
const tools = [
  {
    name: "JSON Formatter & Viewer",
    description: "Format, validate and view JSON data",
    link: "/json-formatter",
    icon: <LuFileJson className="inline-block text-3xl text-emerald-600" />,
  },
  {
    name: "Base64 Encoder/Decoder",
    description: "Encode and decode Base64 strings",
    link: "/base64-tool",
    icon: <FiCode className="inline-block text-3xl text-emerald-600" />,
  },
  {
    name: "JWT Decoder",
    description: "Decode and analyze JWT tokens",
    link: "/jwt-decoder",
    icon: (
      <SiJsonwebtokens className="inline-block text-3xl text-emerald-600" />
    ),
  },
  {
    name: "Bitwise Visualizer",
    description: "Visualize bitwise operations",
    link: "/bitwise-visualizer",
    icon: <GiLogicGateXor className="inline-block text-3xl text-emerald-600" />,
  },
  {
    name: "Hash Generator",
    description: "Generate MD5, SHA1, SHA256 hashes",
    link: "/hash-generator",
    icon: (
      <PiHashStraightFill className="inline-block text-3xl text-emerald-600" />
    ),
  },
  {
    name: "QR Code Generator",
    description: "Generate QR codes for text, URLs, and more",
    link: "/qr-generator",
    icon: <MdQrCode className="inline-block text-3xl text-emerald-600" />,
  },
];
export default function ToolsForDev() {
  return (
    <div id="devtools">
      <section className="p-4 md:p-8 bg-gradient-to-b max-w-6xl mx-auto transition-colors duration-300">
        <h1 className="text-3xl mb-4">DEV TOOLS</h1>
        <div className="space-y-6 border-l-2 border-dotted border-emerald-300 pl-6 py-3 rounded-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Link
                key={tool.name}
                to={tool.link}
                className="block text-center mt-1"
                title={`${tool.name} - ${tool.description}`}
                rel="noopener noreferrer"
              >
                <CometCard className="h-full">
                  <Card className="shadow-sm hover:text-emerald-600 transition-all duration-300 border-neutral-200 h-full group">
                    <CardHeader className="font-semibold text-md flex flex-col items-center justify-center gap-2 p-6">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <div className="transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                          {tool.icon}
                        </div>
                        <span className="text-center text-sm font-semibold leading-tight">
                          {tool.name}
                        </span>
                      </div>
                    </CardHeader>
                  </Card>
                </CometCard>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
