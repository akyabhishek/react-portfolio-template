import { Helmet } from "react-helmet";
import TextCleaner from "@/components/devtools/TextCleaner";

export default function TextCleanerPage() {
  return (
    <>
      <Helmet>
        <title>AI Text Cleaner | Online Tool By Abhishek Kumar Yadav</title>
        <meta
          name="description"
          content="Clean invisible characters and extra whitespace, normalize punctuation, and remove Markdown from pasted text. Processed locally in your browser."
        />
        <meta
          name="keywords"
          content="ai text cleaner, text cleaner, invisible characters, unicode, whitespace, markdown, punctuation"
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://abhishekkumaryadav.in/ai-text-cleaner"
        />
      </Helmet>
      <main className="mt-14">
        <TextCleaner />
      </main>
    </>
  );
}
