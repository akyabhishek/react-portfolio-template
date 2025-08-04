//

import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "./ui/card";
import { FiCode } from "react-icons/fi";
import { GiLogicGateXor } from "react-icons/gi";
import { PiHashStraightFill } from "react-icons/pi";

const tools = [
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
    icon: <PiHashStraightFill className="inline-block text-3xl text-emerald-600" />,
  },
  // Add more tools here as needed
  // { name: "JSON Formatter", link: "/json-formatter", icon: <FiFileText className="inline-block mr-2 text-xl text-blue-600" />
  // Example: add more tools with icons from react-icons
  // { name: "JSON Formatter", link: "/json-formatter", icon: <FiFileText className="inline-block mr-2 text-xl text-blue-600" /> },
];
export default function ToolsForDev() {
  return (
    <div className="pt-5" id="devtools">
      <h1 className="text-3xl">DEV TOOLS</h1>
      <section className="p-3 md:p-6 bg-gradient-to-b max-w-4xl mx-auto transition-colors duration-300">
        <div className="space-y-6 border-l-2 border-dotted pl-6 py-3 rounded-3xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tools.map((tool) => (
              <Card
                key={tool.name}
                className="shadow-sm hover:text-emerald-600 transition-shadow"
              >
                <CardHeader className="font-semibold text-md flex flex-col items-center justify-center gap-2">
                  <div className="flex flex-col items-center justify-center">
                    {tool.icon}
                    <Link
                      to={tool.link}
                      className="block text-center mt-1"
                      title={tool.name}
                      rel="noopener noreferrer"
                    >
                      {tool.name}
                    </Link>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
