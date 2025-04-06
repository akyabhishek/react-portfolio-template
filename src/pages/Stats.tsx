import { TracingBeam } from "@/components/ui/tracing-beam";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ChartConfig } from "@/components/ui/chart";
import ChartComponent from "../components/LeetCodeChart";
import { calculateAge, formatDate } from "@/utils/utils";
import {
  ProfileResponse,
  SolvedProblemsResponse,
} from "@/types/LeetCodeAPIProps";
import { GitHubRepo } from "@/types/GitHubAPIProps";
import GitHubCalendar from 'react-github-calendar'

const colors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
  "bg-teal-500",
  "bg-orange-500",
];

export default function Stats(): JSX.Element {
  const [ranking, setRanking] = useState<number | null>(null);
  const [skillTags, setSkillTags] = useState<string[]>([]);
  const [gitHubData, setGitHubData] = useState<GitHubRepo>();
  const [solvedProblems, setSolvedProblems] =
    useState<SolvedProblemsResponse | null>(null);

  const dob = new Date("1999-07-02T00:00:00");
  const [age, setAge] = useState(calculateAge(dob));

  useEffect(() => {
    const interval = setInterval(() => {
      setAge(calculateAge(dob));
    }, 1);

    return () => clearInterval(interval);
  }, [dob]);

  const colorMap = useMemo(() => {
    const map = new Map();
    skillTags.forEach((tag) => {
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      map.set(tag, randomColor);
    });
    return map;
  }, [skillTags]);

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await axios.get<ProfileResponse>(
          "https://alfa-leetcode-api.onrender.com/mrabk121"
        );
        setRanking(response.data.ranking);
        setSkillTags(response.data.skillTags);
      } catch (error) {
        console.error("Error fetching ranking:", error);
      }
    };

    const fetchSolvedProblems = async () => {
      try {
        const response = await axios.get<SolvedProblemsResponse>(
          "https://alfa-leetcode-api.onrender.com/mrabk121/solved"
        );
        setSolvedProblems(response.data);
      } catch (error) {
        console.error("Error fetching solved problems:", error);
      }
    };
    const fetchGithub = async () => {
      try {
        const response = await axios.get(
          "https://api.github.com/repos/akyabhishek/react-portfolio-template"
        );
        setGitHubData(response.data);
      } catch (error) {
        console.error("Error fetching repository data:", error);
      }
    };
    fetchGithub();
    fetchRanking();
    fetchSolvedProblems();
  }, []);
  const leetcodeChartConfig = {
    total: {
      label: "Total Solved",
    },
    easy: {
      label: "Easy",
      color: "#34D399",
    },
    medium: {
      label: "Medium",
      color: "#6366F1",
    },
    hard: {
      label: "Hard",
      color: "#e2366f",
    },
  } satisfies ChartConfig;

  return (
    <>
      <TracingBeam className="min-h-screen">
        <div className="min-h-min flex flex-col justify-center items-center p-4 space-x-4">
          <h1 className="text-3xl mt-5">STATS</h1>
          <br />
          <div className="container w-full my-2">
            <div className="mt-4">
              <h2 className="text-lg mb-4 font-bold uppercase tracking-widest">
                Some stats about me
              </h2>
              <Table className="w-full">
                <TableBody>
                  <TableRow className="min-w-full">
                    <TableCell className="font-medium text-left">
                      Current Age
                    </TableCell>
                    <TableCell className="text-left">
                      {age.years} years, {age.days} days, {age.hours} hours,{" "}
                      {age.minutes} minutes, {age.seconds} seconds,{" "}
                      {age.milliseconds} milliseconds
                    </TableCell>
                  </TableRow>
                  <TableRow className="min-w-full">
                    <TableCell className="font-medium text-left">
                      Current City
                    </TableCell>
                    <TableCell className="text-left">
                      Noida, Uttar Pradesh
                    </TableCell>
                  </TableRow>
                  <TableRow className="min-w-full">
                    <TableCell className="font-medium text-left">
                      Countries Visited
                    </TableCell>
                    <TableCell className="text-left">02</TableCell>
                  </TableRow>
                  <TableRow className="min-w-full">
                    <TableCell className="font-medium text-left">
                      Nationality
                    </TableCell>
                    <TableCell className="text-left">Indian</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            {solvedProblems && (
              <div className="mt-8">
                <h2 className="text-lg mb-4 font-bold uppercase tracking-widest">
                  LeetCode Stats
                </h2>

                <div>
                  <ChartComponent
                    description="Problems solved on LeetCode by difficulty."
                    data={[
                      { name: "Easy", value: solvedProblems?.easySolved ?? 0 },
                      {
                        name: "Medium",
                        value: solvedProblems?.mediumSolved ?? 0,
                      },
                      { name: "Hard", value: solvedProblems?.hardSolved ?? 0 },
                    ]}
                    config={leetcodeChartConfig}
                  />
                </div>

                <Table className="w-full">
                  <TableBody>
                    <TableRow className="min-w-full">
                      <TableCell className="font-medium text-left">
                        Problems Solved
                      </TableCell>
                      <TableCell className="text-left">
                        {solvedProblems?.solvedProblem}
                      </TableCell>
                    </TableRow>
                    <TableRow className="min-w-full">
                      <TableCell className="font-medium text-left">
                        Ranking
                      </TableCell>
                      <TableCell className="text-left">{ranking}</TableCell>
                    </TableRow>
                    <TableRow className="min-w-full">
                      <TableCell className="font-medium text-left">
                        Skill tags
                      </TableCell>
                      <TableCell className="text-left">
                        {skillTags.map((skill, index) => (
                          <Badge
                            className={`inline-block mx-1 my-1 rounded-full text-white hover:text-black ${colorMap.get(
                              skill
                            )}`}
                          >
                            {skill}
                          </Badge>
                        ))}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            )}

            {/* Stats about site */}
            {gitHubData && (
              <div className="mt-8">
                <h2 className="text-lg mb-4 font-bold uppercase tracking-widest">
                  Some stats about this site
                </h2>
                <Table className="w-full">
                  <TableBody>
                    <TableRow className="min-w-full">
                      <TableCell className="font-medium text-left">
                        Lines of code powering this website
                      </TableCell>
                      <TableCell className="text-left">24950</TableCell>
                    </TableRow>
                    <TableRow className="min-w-full">
                      <TableCell className="font-medium text-left">
                        Open issues
                      </TableCell>
                      <TableCell className="text-left">
                        {gitHubData.open_issues}
                      </TableCell>
                    </TableRow>
                    <TableRow className="min-w-full">
                      <TableCell className="font-medium text-left">
                        Stars this repository has on github
                      </TableCell>
                      <TableCell className="text-left">
                        {gitHubData.stargazers_count}
                      </TableCell>
                    </TableRow>
                    <TableRow className="min-w-full">
                      <TableCell className="font-medium text-left">
                        Number of forks
                      </TableCell>
                      <TableCell className="text-left">
                        {gitHubData.network_count}
                      </TableCell>
                    </TableRow>
                    <TableRow className="min-w-full">
                      <TableCell className="font-medium text-left">
                        Last updated at
                      </TableCell>
                      <TableCell className="text-left">
                        {formatDate(gitHubData?.updated_at ?? "")}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            )}
            <div className="mt-10">
              <h2 className="text-lg mb-4 font-bold uppercase tracking-widest">
                GitHub Contribution Calendar</h2>
              <GitHubCalendar username="akyabhishek" blockSize={11} blockRadius={4} colorScheme="dark"/></div>
          </div>
        </div>
      </TracingBeam>
    </>
  );
}
