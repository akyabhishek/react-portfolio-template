import { FlipWords } from "@/components/ui/flip-words";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import mainImage from "../../public/assets/abhishekkumaryadav-ghibli.png";
import { TracingBeam } from "@/components/ui/tracing-beam";
import {
  TextRevealCard,
  TextRevealCardDescription,
  TextRevealCardTitle,
} from "@/components/ui/text-reveal-card";
import SkillsSection from "@/components/SkillsSection";
import CodeQuote from "@/components/CodeQuote";
import FloatingImage from "@/components/MyImage";
import ResumeButton from "@/components/DownloadResumeBtn";
import AboutMe from "@/components/AboutMe";
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
        <div className="min-h-screen h-auto flex flex-col lg:flex-row justify-center items-center px-4 space-x-2 mt-10 ">
          <div className="text-2xl mx-auto font-normal text-neutral-600 dark:text-neutral-400 lg:w-1/2 lg:pl-3">
            <FlipWords words={greetings} duration={3000} /><br />
            <span>I am Abhishek</span>
            <br /> I am a{" "}
            <FlipWords
              words={["<Developer>", "Frontend Dev", "Backend Dev", "Full-stack Dev"]}
              duration={15000}
              className="dark:text-green-500 text-green-600"
            />
            <TextGenerateEffect
              words={"Welcome to my website."}
              className="text-2xl"
            />
            <div>
            </div>
          </div>
          <div className="lg:w-1/2 p-10 flex justify-center">

            <FloatingImage mainImage={mainImage} />
          </div>
        </div>
        <span className="text-xs text-center space-x-0 pb-28">
          Please feel free to read more about me, or you can check out my
          resume, projects, view site statistics, or contact me.
        </span>
        <AboutMe />
        <SkillsSection />

        <div className="pt-10 mb-10">
          <h1 className="text-3xl my-5">Developer's Journey Algorithm</h1>
          <CodeQuote />
        </div></div>
    </TracingBeam>
  );
}
