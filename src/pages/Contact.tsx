import React from "react";
import { FlipWords } from "@/components/ui/flip-words";
import LinkCard from "@/components/LinkCard";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Card } from "@/components/ui/card";
import { CardBody } from "@/components/ui/3d-card";
import { Link } from "react-router-dom";
import {
  SiFacebook,
  SiGeeksforgeeks,
  SiGithub,
  SiInstagram,
  SiLeetcode,
  SiLinkedin,
  SiMedium,
  SiSnapchat,
  SiX,
  SiYoutube,
} from "react-icons/si";
import { socialLinksData } from "@/config/data";

const iconMap: Record<string, React.ReactNode> = {
  LinkedIn: <SiLinkedin />,
  GitHub: <SiGithub />,
  LeetCode: <SiLeetcode />,
  GeeksforGeeks: <SiGeeksforgeeks />,
  Medium: <SiMedium />,
  Instagram: <SiInstagram />,
  YouTube: <SiYoutube />,
  Twitter: <SiX />,
  Facebook: <SiFacebook />,
  Snapchat: <SiSnapchat />,
};

const brandColors: Record<string, string> = {
  LinkedIn: "hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]",
  GitHub:
    "hover:bg-[#333] hover:text-white hover:border-[#333] dark:hover:bg-[#f0f0f0] dark:hover:text-black dark:hover:border-[#f0f0f0]",
  LeetCode: "hover:bg-[#FFA116] hover:text-black hover:border-[#FFA116]",
  GeeksforGeeks: "hover:bg-[#2F8D46] hover:text-white hover:border-[#2F8D46]",
  Medium:
    "hover:bg-[#000] hover:text-white hover:border-[#000] dark:hover:bg-[#fff] dark:hover:text-black dark:hover:border-[#fff]",
  Instagram: "hover:bg-[#E4405F] hover:text-white hover:border-[#E4405F]",
  YouTube: "hover:bg-[#FF0000] hover:text-white hover:border-[#FF0000]",
  Twitter:
    "hover:bg-[#000] hover:text-white hover:border-[#000] dark:hover:bg-[#fff] dark:hover:text-black dark:hover:border-[#fff]",
  Facebook: "hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]",
  Snapchat: "hover:bg-[#FFFC00] hover:text-black hover:border-[#FFFC00]",
};

export default function Contact(): JSX.Element {
  const links = socialLinksData
    .filter((l) => l.title in iconMap)
    .map((l) => ({
      title: l.title,
      url: l.url,
      icon: iconMap[l.title],
      colorClass: brandColors[l.title],
    }));

  return (
    <div id="contact">
      <h1 className="text-3xl my-5">CONTACT</h1>
      <BackgroundBeamsWithCollision className="w-full h-auto z-10 translate-y-7">
        <Card className="border-none py-28">
          <CardBody className="w-full h-auto  z-20 ">
            <p className="leading-9 text-center">
              Feel free to get in touch at:{" "}
              <Link
                to="mailto:aky.abhishekkumaryadav@gmail.com"
                className="font-medium underline underline-offset-4 transition-colors hover:text-emerald-500"
              >
                aky.abhishekkumaryadav@gmail.com
              </Link>
              <br />
              <FlipWords
                words={[
                  "Still thinking? Take your time!",
                  "I'll wait... but not forever!",
                  "Okay, maybe forever.",
                  "Don’t be shy—I'm super friendly!",
                  "Unless you ask for free coffee ☕.",
                  "Need help? I’ve got you!",
                  "Typing already? I’m excited!",
                  "Wait... are you really emailing?",
                  "Kidding. You totally should!",
                  "Pssst... I’m still here",
                  "Your keyboard misses you!",
                  "The suspense is killing me!",
                  "Fun fact: I debug faster than I reply",
                  "You write, I reply—teamwork!",
                  "Free smiles with every message",
                  "If you don't email, I'll start singing",
                  "I promise my code is cleaner than my jokes",
                  "Your move...",
                ]}
                duration={2000}
              />
            </p>

            <div className="flex flex-wrap justify-center gap-4 py-20">
              {links.map(
                (element, index) =>
                  element && (
                    <div key={index}>
                      <LinkCard
                        key={index}
                        title={element.title}
                        url={element.url}
                        icon={element.icon}
                        colorClass={element.colorClass}
                      />
                    </div>
                  ),
              )}
            </div>
            <div className="text-center text-xs text-muted-foreground pt-10">
              Built (because why reinvent the wheel?) with{" "}
              <a
                href="https://ui.shadcn.com/"
                className="text-xs font-medium underline underline-offset-4 text-muted-foreground transition-colors hover:text-emerald-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                shadcn/ui
              </a>
              ,{" "}
              <a
                href="https://magicui.design/"
                className="text-xs font-medium underline underline-offset-4 text-muted-foreground transition-colors hover:text-emerald-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                magicui
              </a>
              , and{" "}
              <a
                href="https://ui.aceternity.com/"
                className="text-xs font-medium underline underline-offset-4 text-muted-foreground transition-colors hover:text-emerald-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                acernity.dev
              </a>
              .
            </div>
          </CardBody>
        </Card>
      </BackgroundBeamsWithCollision>
    </div>
  );
}
