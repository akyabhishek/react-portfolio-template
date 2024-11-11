import { FlipWords } from "@/components/ui/flip-words";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import mainImage from "../../public/assets/profile.png";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { Github, Linkedin, Twitter } from "lucide-react";
import LinkCard from "@/components/LinkCard";
export default function Links(): JSX.Element {
  const links = [
    { title: "GitHub", url: "https://github.com/", icon: Github },
    { title: "LinkedIn", url: "https://linkedin.com/", icon: Linkedin },
    { title: "Twitter", url: "https://twitter.com/", icon: Twitter },
    // Add more links as needed
  ];
  return (
    <>
      <TracingBeam>
        <div className="h-[40rem] flex flex-col lg:flex-row justify-center items-center px-4 space-x-4">
          <LinkCard title="GitHub" url="https://github.com/" icon={Github} />
        </div>
      </TracingBeam>
    </>
  );
}
