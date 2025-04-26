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
import { SiFacebook, SiGithub, SiInstagram, SiLinkedin, SiSnapchat, SiX, SiYoutube } from "react-icons/si";

export default function Contact(): JSX.Element {
  const links = [
    {
      title: "LinkedIn",
      url: "https://www.linkedin.com/in/abhishekkumaryadav/",
      icon: <SiLinkedin />,
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
    { title: "Twitter", url: "https://x.com/akyabhishek", icon: <SiX/> },
    {
      title: "Facebook",
      url: "https://www.facebook.com/abhishekkumaryadav.aky",
      icon: <SiFacebook />,
    },
    { title: "GitHub", url: "https://github.com/akyabhishek", icon: <SiGithub /> },
    {
      title: "Snapchat",
      url: "https://www.snapchat.com/add/mrabk121",
      icon:<SiSnapchat/>,
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
          </CardBody></Card>
        </BackgroundBeamsWithCollision>
      
    </div>
  );
}
