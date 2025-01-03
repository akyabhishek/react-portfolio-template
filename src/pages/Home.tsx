import { FlipWords } from "@/components/ui/flip-words";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import mainImage from "../../public/assets/abhishekkumaryadav.png";
import { TracingBeam } from "@/components/ui/tracing-beam";
import {
  TextRevealCard,
  TextRevealCardDescription,
  TextRevealCardTitle,
} from "@/components/ui/text-reveal-card";
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
    <>
      <TracingBeam className="px-6">
        <div className="min-h-screen h-auto flex flex-col lg:flex-row justify-center items-center px-4 space-x-3  pt-4 ">
          <div className="text-2xl mx-auto font-normal text-neutral-600 dark:text-neutral-400 lg:w-1/2 lg:pl-3">
            <FlipWords words={greetings} duration={3000} />I am Abhishek.
            <br /> I am a{" "}
            <FlipWords
              words={["<Developer>.", "Editor.", "Designer.", "Freelancer."]}
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
      </TracingBeam>
    </>
  );
}
