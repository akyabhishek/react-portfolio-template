import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { FiBookOpen, FiCode, FiTool } from "react-icons/fi";
import { VscGitMerge } from "react-icons/vsc";
import { MdDesignServices } from "react-icons/md";
import { GiRoad } from "react-icons/gi";
import { BsQuestionCircle } from "react-icons/bs";
import { CometCard } from "@/components/ui/comet-card";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const resources = [
  {
    name: "Git Cheatsheet",
    description:
      "A comprehensive reference for Git commands — staging, branching, merging, rebasing, and more.",
    link: "/git-cheatsheet",
    icon: <VscGitMerge className="inline-block text-3xl text-emerald-500" />,
    category: "Version Control",
    badge: "Reference",
  },
  {
    name: "System Design",
    description:
      "Concepts, patterns and real-world examples for designing scalable distributed systems.",
    link: "/system-design",
    icon: (
      <MdDesignServices className="inline-block text-3xl text-emerald-500" />
    ),
    category: "Architecture",
    badge: "Learning",
  },
  {
    name: "Java Interview Q&A",
    description:
      "Curated Java interview questions and detailed answers covering core concepts.",
    link: "/java-interview-question-answers",
    icon: (
      <BsQuestionCircle className="inline-block text-3xl text-emerald-500" />
    ),
    category: "Interview Prep",
    badge: "Q&A",
  },
  {
    name: "Roadmap for Product-Based Companies",
    description:
      "A structured roadmap to prepare for roles at top product-based companies.",
    link: "/roadmap-for-product-based-company",
    icon: <GiRoad className="inline-block text-3xl text-emerald-500" />,
    category: "Career",
    badge: "Roadmap",
  },
  {
    name: "Developer Tools",
    description:
      "A collection of free online utilities — JSON formatter, JWT decoder, Base64, regex tester, and more.",
    link: "/devtools",
    icon: <FiTool className="inline-block text-3xl text-emerald-500" />,
    category: "Tools",
    badge: "Utilities",
  },
  {
    name: "Interactive Terminal",
    description:
      "Explore the portfolio through an interactive terminal-style interface.",
    link: "/terminal",
    icon: <FiCode className="inline-block text-3xl text-emerald-500" />,
    category: "Interactive",
    badge: "Fun",
  },
];

export default function ResourcesPage() {
  return (
    <>
      <Helmet>
        <title>Resources – Developer References, Tools & Guides</title>
        <meta
          name="description"
          content="A collection of developer resources including Git cheatsheet, system design guides, Java interview Q&A, career roadmaps, and free online dev tools."
        />
        <meta
          name="keywords"
          content="developer resources, git cheatsheet, system design, java interview, roadmap, devtools"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://abhishekkumaryadav.in/resources" />
      </Helmet>

      <main className="mt-14 min-h-screen px-4 py-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <FiBookOpen className="text-3xl text-emerald-500" />
            <h1 className="text-3xl font-bold tracking-tight">Resources</h1>
          </div>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm">
            A curated collection of developer references, guides, tools, and
            learning material.
          </p>
        </div>

        {/* Resource Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource) => (
            <Link
              key={resource.link}
              to={resource.link}
              className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-xl"
            >
              <CometCard className="h-full">
                <Card className="h-full p-5 rounded-xl transition-all duration-200 border-neutral-200 dark:border-neutral-800 shadow-sm group-hover:shadow-md group-hover:shadow-black/10 dark:group-hover:shadow-black/40">
                  <div className="flex flex-col gap-3 h-full">
                    <div className="flex items-center justify-between">
                      <span>{resource.icon}</span>
                      <Badge
                        variant="outline"
                        className="text-xs text-muted-foreground border-muted-foreground/30"
                      >
                        {resource.badge}
                      </Badge>
                    </div>
                    <div>
                      <h2 className="font-semibold text-base mb-1 group-hover:text-emerald-500 transition-colors">
                        {resource.name}
                      </h2>
                      <p className="text-muted-foreground text-xs leading-relaxed">
                        {resource.description}
                      </p>
                    </div>
                    <div className="mt-auto pt-2">
                      <span className="text-xs text-muted-foreground/60 font-medium uppercase tracking-wide">
                        {resource.category}
                      </span>
                    </div>
                  </div>
                </Card>
              </CometCard>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
