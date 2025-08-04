import { FlipWords } from "@/components/ui/flip-words";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import mainImage from "../../public/assets/abhishekkumaryadav-ghibli.png";
import altMainImage from "../../public/assets/abhishekkumaryadav.png";
import { TracingBeam } from "@/components/ui/tracing-beam";
import SkillsSection from "@/components/SkillsSection";
import FloatingImage from "@/components/MyImage";
import AboutMe from "@/components/AboutMe";
import ProjectsSection from "@/components/ProjectSection";
import { TextReveal } from "@/components/magicui/text-reveal";
import ExperienceSection from "@/components/Experience";
import Contact from "./Contact";
import ToolsForDev from "@/components/ToolsForDev";

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
    <div>
      <div className="min-h-screen h-auto flex flex-col lg:flex-row justify-center items-center px-5 md:px-40 space-x-2 mt-10 ">
        <div className="text-2xl mx-auto font-normal text-neutral-600 dark:text-neutral-400 lg:w-1/2 lg:pl-3">
          <FlipWords words={greetings} duration={3000} />
          <br />
          <span className="text-base">I am Abhishek. I am a </span>
          <FlipWords
            words={["<Developer/>", "Learner", "<Coder/>", "Programmer"]}
            duration={15000}
            className="dark:text-emerald-500 text-emerald-600 text-base"
          />
          <TextGenerateEffect
            words={"Welcome to my over-engineered portfolio site."}
            className="text-base"
          />
          <div></div>
        </div>
        <div className="lg:w-1/2 p-10 flex justify-center">
          <FloatingImage mainImage={mainImage} altImage={altMainImage} />
        </div>
      </div>
      <TracingBeam className="px-6">
        <AboutMe />

        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        
        {/* <CodeQuote /> */}

        <TextReveal>
          I learn fast—mostly because I break things faster.
        </TextReveal>
        <ToolsForDev />
        <Contact />
      </TracingBeam>
    </div>
  );
}
