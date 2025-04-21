import React from "react";
import { FlipWords } from "@/components/ui/flip-words";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { TracingBeam } from "@/components/ui/tracing-beam";
import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
} from "lucide-react";
import LinkCard from "@/components/LinkCard";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { CardBody } from "@/components/ui/3d-card";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

export default function Contact(): JSX.Element {
  const links = [
    {
      title: "LinkedIn",
      url: "https://www.linkedin.com/in/abhishekkumaryadav/",
      icon: Linkedin,
    },
    {
      title: "Instagram",
      url: "https://instagram.com/abhishekkumaryadav.aky",
      icon: Instagram,
    },
    {
      title: "YouTube",
      url: "https://www.youtube.com/@abhishekaky",
      icon: Youtube,
    },
    { title: "Twitter", url: "https://x.com/akyabhishek", icon: Twitter },
    {
      title: "Facebook",
      url: "https://www.facebook.com/abhishekkumaryadav.aky",
      icon: Facebook,
    },
    { title: "GitHub", url: "https://github.com/", icon: Github },
    {
      title: "Snapchat",
      url: "https://www.snapchat.com/add/mrabk121",
    },
    // Add more links as needed
  ];

  return (
    <div className="flex justify-center items-center mt-10">
      <Card className="flex flex-col items-center sm:my-5">
        <BackgroundBeamsWithCollision className="h-full">
          <CardBody className="w-full p-8 h-auto sm:mx-10  z-20 ">
            <div className="text-center">
              <p className="text-neutral-500 dark:text-neutral-400">CONTACT</p>
            </div>
            <Separator className="my-4" />
            <p className="leading-9 text-center">
              Feel free to get in touch at:{" "}
              <Link to="mailto:aky.abhishekkumaryadav@gmail.com">
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

            <Separator className="my-4" />

            <div className="lg:flex-row w-full">
              <div className="w-full text-center">
                <div className="mb-5">
                  <span className="text-neutral-500 dark:text-neutral-400">
                    Social Links
                  </span>
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                  {links.map(
                    (element, index) =>
                      element && (
                        <div key={index} className="w-full sm:w-auto">
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
              </div>
            </div>
          </CardBody>
        </BackgroundBeamsWithCollision>
      </Card>
    </div>
  );
}
