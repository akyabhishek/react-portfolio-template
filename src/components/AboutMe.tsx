import {HeroHighlight, Highlight} from "@/components/ui/hero-highlight";
import { useMemo } from "react";

export default function AboutMe(){
    // Calculate experience dynamically
    const experience = useMemo(() => {
        const start = new Date("2023-09-14");
        const now = new Date();
        let months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
        if (now.getDate() < start.getDate()) months--;
        const years = Math.floor(months / 12);
        const remMonths = months % 12;
        if (years > 0 && remMonths > 0) {
            return `${years} year${years > 1 ? 's' : ''} ${remMonths} month${remMonths > 1 ? 's' : ''}`;
        } else if (years > 0) {
            return `${years} year${years > 1 ? 's' : ''}`;
        } else {
            return `${remMonths} month${remMonths > 1 ? 's' : ''}`;
        }
    }, []);
    return(
        <div className="pt-10 mb-10" id="about">
        <h1 className="text-3xl my-5">ABOUT ME</h1>
        <HeroHighlight className="max-w-3xl mx-auto p-6 text-justify text-gray-800 dark:text-gray-200 leading-loose">
          
          <p className="mb-4">
            I'm a <Highlight>Software Developer at Cognizant</Highlight> with over <Highlight>{experience} of experience</Highlight>, having contributed to <Highlight>American Airlines</Highlight> projects using Java, Spring Boot, TypeScript, Playwright, Selenium, and more. I graduated from <Highlight>Shri Ramswaroop Memorial College</Highlight> (AKTU) and also hold a diploma from <Highlight>Hewett Polytechnic</Highlight>. Through personal projects, I’ve explored React, Tailwind, Axios, and Spring Security.
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
    );
}