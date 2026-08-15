import BooksSection from "@/components/more-about-me/BooksSection";
import { TracingBeam } from "@/components/ui/tracing-beam";

export default function BooksPage(): JSX.Element {
  return (
    <div className="min-h-min flex flex-col justify-center items-center p-4 mt-10">
      <TracingBeam>
        <div className="container w-full my-2">
          <BooksSection />
        </div>
      </TracingBeam>
    </div>
  );
}
