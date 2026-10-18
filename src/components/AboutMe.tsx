import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { getExperienceString } from "@/config/data";

export default function AboutMe() {
  // Calculate experience dynamically
  const experience = useMemo(() => getExperienceString(), []);

  return (
    <div className="pt-10" id="about">
      <div className="p-6 md:p-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">ABOUT ME</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          My journey so far.
        </p>

        <div className="pb-6 text-gray-800 dark:text-gray-200 leading-loose space-y-5">
          <p>
            <ScrollReveal>
              {`I'm a Software Engineer at Cognizant with over ${experience} of
              experience, having contributed to a leading U.S. airline client on
              projects using Java, Spring Boot, TypeScript, Docker, Kubernetes, CI/CD, Gen AI, Playwright,
              Selenium, and more. I graduated from Shri Ramswaroop Memorial
              College (AKTU) and also hold a diploma from Hewett Polytechnic.`}
            </ScrollReveal>
          </p>
          <p>
            <ScrollReveal>
              I enjoy collaborating in agile teams, solving real-world problems,
              and always learning something new.
            </ScrollReveal>
          </p>
          <p>
            <ScrollReveal>
              My journey so far includes reaching the Grand Finale of the Smart
              India Hackathon 2022, winning India's Biggest Entrepreneurship
              Conclave 2022, securing 1st prize at Start UP Conclave 2k22 and
              SRMU's Awasar, and participating in the G20 platform.
            </ScrollReveal>
          </p>
          <p>
            <ScrollReveal>
              I'm always open to new opportunities that challenge me and help me
              grow.
            </ScrollReveal>
          </p>
        </div>

        <div className="text-center mt-8">
          <Button variant="link" asChild className="hover:text-emerald-600">
            <Link to="/about">More about me</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
