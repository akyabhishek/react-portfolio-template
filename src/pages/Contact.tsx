import React from "react";
import {FlipWords} from "@/components/ui/flip-words";
import LinkCard from "@/components/LinkCard";
import {BackgroundBeamsWithCollision} from "@/components/ui/background-beams-with-collision";
import {Card} from "@/components/ui/card";
import {CardBody} from "@/components/ui/3d-card";
import {Link} from "react-router-dom";
import {
    SiFacebook,
    SiGeeksforgeeks,
    SiGithub,
    SiInstagram,
    SiLeetcode,
    SiLinkedin,
    SiSnapchat,
    SiX,
    SiYoutube
} from "react-icons/si";

export default function Contact(): JSX.Element {
  const links = [
    {
      title: "LinkedIn",
      url: "https://www.linkedin.com/in/abhishekkumaryadav/",
      icon: <SiLinkedin />,
    },
    { title: "GitHub", url: "https://github.com/akyabhishek", icon: <SiGithub /> },
    {
      title: "LeetCode",
      url: "https://leetcode.com/mrabk121/",
      icon: <SiLeetcode />
    },
    {
      title: "GeeksforGeeks",
      url: "https://www.geeksforgeeks.org/user/akyabhishek/",
      icon: <SiGeeksforgeeks />
    },
    {
      title: "Instagram",
      url: "https://instagram.com/abhishekkumaryadav.aky",
      icon: <SiInstagram />,
    },
    {
      title: "YouTube",
      url: "https://www.youtube.com/@abhishekaky",
      icon: <SiYoutube />,
    },
    { title: "Twitter", url: "https://x.com/akyabhishek", icon: <SiX /> },
    {
      title: "Facebook",
      url: "https://www.facebook.com/abhishekkumaryadav.aky",
      icon: <SiFacebook />,
    },
    {
      title: "Snapchat",
      url: "https://www.snapchat.com/add/mrabk121",
      icon: <SiSnapchat />,
    },
  ];

  return (
    <div id="contact">
      <h1 className="text-3xl my-5">CONTACT</h1>
      <BackgroundBeamsWithCollision className="w-full h-auto z-10 translate-y-7">
        <Card className="border-none py-28">
          <CardBody className="w-full h-auto  z-20 ">
            <p className="leading-9 text-center">
              Feel free to get in touch at:{" "}
              <Link to="mailto:aky.abhishekkumaryadav@gmail.com" className="font-medium underline underline-offset-4 transition-colors hover:text-emerald-500"
              >
                aky.abhishekkumaryadav@gmail.com
              </Link>
              <br />
              <FlipWords
                words={[
                  "Still thinking? Take your time!",
                  "I'll wait... but not forever!",
                  "Okay, maybe forever.",
                  "Don't be shy—I'm super friendly!",
                  "Unless you ask for free coffee ☕.",
                  "Need help? I’ve got you!",
                  "Just say 'Hi'—I won't bite!",
                  "Typing already? I’m excited!",
                  "Wait... are you really emailing?",
                  "Kidding. You totally should!",
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
                      />
                    </div>
                  )
              )}
            </div>
            <div className="text-center text-xs text-muted-foreground pt-10">
              Built (because why reinvent the wheel?) with{" "}
              <a
                href="https://ui.shadcn.com/"
                className="text-sm font-medium underline underline-offset-4 text-muted-foreground transition-colors hover:text-emerald-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                shadcn/ui
              </a>
              ,{" "}
              <a
                href="https://magicui.design/"
                className="text-sm font-medium underline underline-offset-4 text-muted-foreground transition-colors hover:text-emerald-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                magicui
              </a>
              , and{" "}
              <a
                href="https://ui.aceternity.com/"
                className="text-sm font-medium underline underline-offset-4 text-muted-foreground transition-colors hover:text-emerald-500"
                target="_blank"
                rel="noopener noreferrer"
              >
                acernity.dev
              </a>
              .
            </div>

          </CardBody></Card>
      </BackgroundBeamsWithCollision>

    </div>
  );
}
