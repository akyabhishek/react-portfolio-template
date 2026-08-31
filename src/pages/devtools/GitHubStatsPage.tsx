import GitHubStats from "@/components/devtools/GitHubStats";
import { Helmet } from "react-helmet";

export default function GitHubStatsPage() {
  return (
    <>
      <Helmet>
        <title>GitHub Stats | Online Tool By Abhishek Kumar Yadav</title>
        <meta
          name="description"
          content="Visualize any GitHub user's public stats, repos, languages, stars, forks, pull requests and contributions. Free online tool."
        />
        <meta
          name="keywords"
          content="github stats, github profile, repos, stars, forks, pull requests, issues, contributions, languages, visualization"
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://abhishekkumaryadav.in/github-stats"
        />
      </Helmet>

      <main className="mt-14">
        <GitHubStats />
      </main>
    </>
  );
}
