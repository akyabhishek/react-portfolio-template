import { TracingBeam } from "@/components/ui/tracing-beam";
import PersonalStatsSection from "@/components/more-about-me/PersonalStatsSection";
import LeetCodeStatsSection from "@/components/more-about-me/LeetCodeStatsSection";
import SiteStatsSection from "@/components/more-about-me/SiteStatsSection";
import GitHubCalendarSection from "@/components/more-about-me/GitHubCalendarSection";
import BooksSection from "@/components/more-about-me/BooksSection";
import PlacesSection from "@/components/more-about-me/PlacesSection";

export default function About(): JSX.Element {
  return (
    <>
      <div className="min-h-min flex flex-col justify-center items-center p-4 space-x-4 mt-10">
        <TracingBeam>
          <h1 className="text-3xl mt-5">MORE ABOUT ME</h1>
          <br />
          <div className="container w-full my-2">
            <PersonalStatsSection />
            <LeetCodeStatsSection />
            <SiteStatsSection />
            <BooksSection />
            <PlacesSection />
            <GitHubCalendarSection />
          </div>
        </TracingBeam>
      </div>
    </>
  );
}
