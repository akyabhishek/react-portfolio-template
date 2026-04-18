import { TracingBeam } from "@/components/ui/tracing-beam";
import PersonalStatsSection from "@/components/more-about-me/PersonalStatsSection";
import LeetCodeStatsSection from "@/components/more-about-me/LeetCodeStatsSection";
import SiteStatsSection from "@/components/more-about-me/SiteStatsSection";
import GitHubCalendarSection from "@/components/more-about-me/GitHubCalendarSection";
import BooksSection from "@/components/more-about-me/BooksSection";
import PlacesSection from "@/components/more-about-me/PlacesSection";
import ColophonSection from "@/components/more-about-me/ColophonSection";
import PrinciplesValuesSection from "@/components/more-about-me/PrinciplesValuesSection";

export default function About(): JSX.Element {
  return (
    <>
      <div className="min-h-min flex flex-col justify-center items-center p-4 space-x-4 mt-10">
        <TracingBeam>
          <div className="mt-8 mb-2 text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground/70 mb-3">
              More About Me
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.06]">
              The Human Side
            </h1>
            <p className="text-sm text-muted-foreground mt-3 max-w-md leading-relaxed mx-auto">
              Beyond the code - stats, values, books, places, and the thinking
              behind it all.
            </p>
          </div>
          <div className="container w-full my-2">
            <PersonalStatsSection />
            <PrinciplesValuesSection />
            <LeetCodeStatsSection />
            <SiteStatsSection />
            <BooksSection />
            <PlacesSection />
            <GitHubCalendarSection />
            <ColophonSection />
          </div>
        </TracingBeam>
      </div>
    </>
  );
}
