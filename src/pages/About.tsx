import React from "react";
import {Card} from "@/components/ui/card";
import {CardBody} from "@/components/ui/3d-card";
import {Separator} from "@/components/ui/separator";

export default function About(): JSX.Element {
  return (
    <div className="flex justify-center items-center ">
      <Card className="flex flex-col items-center sm:my-5">
        <CardBody className="w-full p-8 h-auto sm:mx-10  z-20 ">
          <div className="text-center">
            <p className="text-neutral-500 dark:text-neutral-400 font-semibold tracking-[1em]">
              ABOUT ME
            </p>
          </div>
          <Separator className="my-4" />
          <p className="leading-9">
            {" "}
            Hello! I'm a passionate computer science and engineering passout
            from Shri Ramswaroop College of Engineering and Management in
            Lucknow. 🎓 My journey in the world of technology has been
            exhilarating, fueled by my unwavering enthusiasm for software
            development. 💻 📜 Armed with a Diploma in Information Technology,
            I've honed my skills and knowledge to craft innovative solutions in
            the digital realm. 🚀 My commitment to excellence led me to the
            Grand Finale of the prestigious Smart India Hackathon 2022, where I
            collaborated on a project for the Ministry of Culture. 🏛️ The
            experience illuminated the power of teamwork and innovative
            thinking. 🏆 I'm proud to be the winner of India's Biggest
            Entrepreneurship Conclave 2022, a remarkable achievement that
            reflects my entrepreneurial spirit. This accolade was bestowed upon
            me at the confluence of the Start-up Cell under the aegis of HBTU
            Kanpur and Startin UP, a testament to my ability to think creatively
            and strategically. 🥇 Additionally, I secured the coveted 1st Prize
            in the Start UP Conclave 2k22's business idea pitching competition,
            showcasing my prowess in crafting compelling narratives and
            strategic planning. 🏅 I also triumphed at SRMU's Awasar event,
            clinching the 1st prize for my exceptional startup idea pitching
            skills. 🌐 Broadening my horizons, I had the privilege to
            participate in G20, a platform that fostered global discussions and
            collaboration on pressing issues. 🔍 As I embark on the next phase
            of my journey, I'm eagerly exploring new opportunities in the
            dynamic fields of Software Engineering and Information Technology.
            If you're seeking an ambitious and driven individual with a knack
            for innovation, feel free to connect with me! Let's collaborate to
            create meaningful technological breakthroughs. 🚀🔗
            #OpenToNewOpportunities #SoftwareEngineering #InformationTechnology
          </p>

          <Separator className="my-4" />
        </CardBody>
      </Card>
    </div>
  );
}
