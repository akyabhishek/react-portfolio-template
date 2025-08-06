//

import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "./ui/card";
import { FiCode } from "react-icons/fi";
import { GiLogicGateXor } from "react-icons/gi";
import { PiHashStraightFill } from "react-icons/pi";
import { LuFileJson } from "react-icons/lu";
const tools = [
  {
    name: "JSON Formatter & Viewer",
    link: "/json-formatter",
    icon: <LuFileJson className="inline-block text-3xl text-emerald-600" />,
  },
  {
    name: "Base64 Encoder/Decoder",
    link: "/base64-tool",
    icon: <FiCode className="inline-block text-3xl text-emerald-600" />,
  },
  {
    name: "Bitwise Visualizer",
    link: "/bitwise-visualizer",
    icon: <GiLogicGateXor className="inline-block text-3xl text-emerald-600" />,
  },
  {
    name: "Hash Generator",
    link: "/hash-generator",
    icon: (
      <PiHashStraightFill className="inline-block text-3xl text-emerald-600" />
    ),
  },
];
export default function ToolsForDev() {
  return (
    <div id="devtools">
      <section className="p-3 md:p-6 bg-gradient-to-b max-w-4xl mx-auto transition-colors duration-300">
        <h1 className="text-3xl mb-4">DEV TOOLS</h1>
        <div className="space-y-6 border-l-2 border-dotted pl-6 py-3 rounded-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tools.map((tool) => (
              <Link
                to={tool.link}
                className="block text-center mt-1"
                title={tool.name}
                rel="noopener noreferrer"
              >
                <Card
                  key={tool.name}
                  className="shadow-sm hover:text-emerald-600 transition-shadow"
                >
                  <CardHeader className="font-semibold text-md flex flex-col items-center justify-center gap-2">
                    <div className="flex flex-col items-center justify-center">
                      {tool.icon}

                      {tool.name}
                    </div>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
