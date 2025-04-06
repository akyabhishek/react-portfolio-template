import { FlipWords } from "@/components/ui/flip-words";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import mainImage from "../../public/assets/abhishekkumaryadav.png";
import { TracingBeam } from "@/components/ui/tracing-beam";
import {
  TextRevealCard,
  TextRevealCardDescription,
  TextRevealCardTitle,
} from "@/components/ui/text-reveal-card";
import SkillsSection from "@/components/SkillsSection";
import CodeQuote from "@/components/CodeQuote";
import { HeroHighlight,Highlight } from "@/components/ui/hero-highlight";
export default function Home(): JSX.Element {
  const greetings: string[] = [
    "Hi,",
    "Hello,",
    "Namaste,",
    "Sat Sri Akal,",
    "Namaskar,",
    "Ram Ram,",
    "Kem Cho,",
    "Vaṇakkam,",
    "Namaskara,",
    "Vandanam,",
    "Pranam,",
    "Khurumjari,",
    "Salaam,",
    "Jai Shri Krishna,",
    "Khamma Ghani,",
    "Radhe Radhe,",
    "Ram Ram,",
    "Nômoshkar,",
    "Salaam Alaikum,",
    "Julley,",
    "Dhaal Karu,",
    "Namaskāra,",
    "Narmada Har,",
  ];


  return (
    <TracingBeam className="px-6 pb-20">
      <div >
        <div className="min-h-screen h-auto flex flex-col lg:flex-row justify-center items-center px-4 space-x-3  pt-4 ">
          <div className="text-2xl mx-auto font-normal text-neutral-600 dark:text-neutral-400 lg:w-1/2 lg:pl-3">
            <FlipWords words={greetings} duration={3000} />I am Abhishek.
            <br /> I am a{" "}
            <FlipWords
              words={["<Developer>", "Frontend Dev", "Backend Dev", "Full-stack Dev"]}
              duration={15000}
              className="dark:text-green-500"
            />
            <TextGenerateEffect
              words={"Welcome to my website."}
              className="text-2xl"
            />
          </div>
          <div className="lg:w-1/2 p-10 flex justify-center">
            <img
              src={mainImage}
              alt="Abhishek"
              className="w-96 h-96 object-cover rounded-3xl shadow-lg"
            />
          </div>
        </div>
        <span className="text-xs text-center space-x-0 pb-28">
          Please feel free to read more about me, or you can check out my
          resume, projects, view site statistics, or contact me.
        </span>

        <div className="pt-10 mb-10" id="about">
          <h1 className="text-3xl my-5">ABOUT ME</h1>
          <HeroHighlight className="max-w-3xl mx-auto p-6 text-justify text-gray-800 dark:text-gray-200 leading-loose">
            
            <p className="mb-4">
              I'm a <Highlight>Software Developer at Cognizant</Highlight> with over <Highlight>1.6 years of experience</Highlight>, having contributed to <Highlight>American Airlines</Highlight> projects using Java, Spring Boot, TypeScript, Playwright, Selenium, and more. I graduated from <Highlight>Shri Ramswaroop Memorial College</Highlight> (AKTU) and also hold a diploma from <Highlight>Hewett Polytechnic</Highlight>. Through personal projects, I’ve explored React, Tailwind, Axios, and Spring Security.
            </p>
            <p className="mb-4">
              I enjoy <Highlight>collaborating in agile teams</Highlight>, solving real-world problems, and always learning something new.
            </p>
            <p className="mb-4">
              My journey so far includes reaching the <Highlight>Grand Finale of the Smart India Hackathon 2022</Highlight>,
              winning <Highlight>India’s Biggest Entrepreneurship Conclave 2022</Highlight>,
              securing <Highlight>1st prize at Start UP Conclave 2k22</Highlight> and <Highlight>SRMU’s Awasar</Highlight>,
              and participating in the <Highlight>G20 platform</Highlight>.
            </p>
            <p>
              I'm always open to new opportunities that challenge me and help me grow.
            </p>
           </HeroHighlight> </div>
        <div className="pt-5 mb-5">
          <h1 className="text-3xl">MY DEVELOPER DNA</h1>

          <SkillsSection />        </div>

        <div className="pt-10 mb-10">
          <h1 className="text-3xl my-5">Developer's Journey Algorithm</h1>
          <CodeQuote/>
        </div></div>
    </TracingBeam>
  );
}
