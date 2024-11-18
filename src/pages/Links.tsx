import { FlipWords } from "@/components/ui/flip-words";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import mainImage from "../../public/assets/profile.png";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { Github, Linkedin, Twitter } from "lucide-react";
import LinkCard from "@/components/LinkCard";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
export default function Links(): JSX.Element {
  const links = [
    { title: "GitHub", url: "https://github.com/", icon: Github },
    { title: "LinkedIn", url: "https://linkedin.com/", icon: Linkedin },
    { title: "Twitter", url: "https://twitter.com/", icon: Twitter },
    // Add more links as needed
  ];
  return (
    <>
      <BackgroundBeamsWithCollision className="min-h-screen">
        <TracingBeam className="min-h-screen">
          <div className="flex flex-col lg:flex-row justify-center items-center px-4  z-20 w-full">
            <div className="w-full">
              <span className="text-sm font-bold text-center dark:text-neutral-100">
                Links{" "}
              </span>
              {links.map((element, index) => (
                <LinkCard
                  key={index}
                  title={element.title}
                  url={element.url}
                  icon={element.icon}
                />
              ))}
            </div>
          </div>
        </TracingBeam>
      </BackgroundBeamsWithCollision>
    </>
  );
}
