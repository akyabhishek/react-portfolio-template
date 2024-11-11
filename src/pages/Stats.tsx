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

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart, Cell } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const calculateAge = (dob: Date) => {
  const now = new Date();
  const diff = now.getTime() - dob.getTime();

  const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  const days = Math.floor(
    (diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24)
  );
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    .toString()
    .padStart(2, "0");
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)
    .toString()
    .padStart(2, "0");
  const milliseconds = (diff % 1000).toString().padStart(3, "0");

  return { years, days, hours, minutes, seconds, milliseconds };
};
interface LeetCodeApiResponse {
  username: string;
  name: string;
  birthday: string;
  avatar: string;
  ranking: number;
  reputation: number;
  gitHub: string;
  twitter: string;
  linkedIN: string;
  website: string[];
  country: string;
  company: string;
  school: string;
  skillTags: string[];
  about: string;
}

interface SolvedProblemsResponse {
  solvedProblem: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalSubmissionNum: {
    difficulty: string;
    count: number;
    submissions: number;
  }[];
  acSubmissionNum: {
    difficulty: string;
    count: number;
    submissions: number;
  }[];
}
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
        const response = await axios.get<LeetCodeApiResponse>(
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
    fetchRanking();
    fetchSolvedProblems();
  }, []);

  const pieData = solvedProblems
    ? [
        {
          name: "easy",
          // value: solvedProblems.easySolved,
          value: 10,
          fill: "var(--color-easy)",
        },
        {
          name: "medium",
          value: 20,
          // value: solvedProblems.mediumSolved,
          fill: "var(--color-medium",
        },
        {
          name: "hard",
          // value: solvedProblems.hardSolved,
          value: 30,
          fill: "var(--color-hard)",
        },
      ]
    : [];
  const chartConfig = {
    visitors: {
      label: "Solved",
    },
    chrome: {
      label: "Easy",
      color: "hsl(var(--chart-1))",
    },
    safari: {
      label: "Medium",
      color: "hsl(var(--chart-2))",
    },
    firefox: {
      label: "Hard",
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig;
  return (
    <>
      <TracingBeam>
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
                </TableBody>
              </Table>
            </div>

            <div className="mt-8">
              <h2 className="text-lg mb-4 font-bold uppercase tracking-widest">
                LeetCode Stats
              </h2>

              <div>
                <Card className="flex flex-col">
                  <CardHeader className="items-center pb-0">
                    <CardTitle>Pie Chart - Donut with Text</CardTitle>
                    <CardDescription>January - June 2024</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1 pb-0">
                    <ChartContainer
                      config={chartConfig}
                      className="mx-auto aspect-square max-h-[250px]"
                    >
                      <PieChart>
                        <ChartTooltip
                          cursor={false}
                          content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                          data={pieData}
                          dataKey="visitors"
                          nameKey="browser"
                          innerRadius={60}
                          strokeWidth={5}
                        >
                          <Label
                            content={({ viewBox }) => {
                              if (
                                viewBox &&
                                "cx" in viewBox &&
                                "cy" in viewBox
                              ) {
                                return (
                                  <text
                                    x={viewBox.cx}
                                    y={viewBox.cy}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                  >
                                    <tspan
                                      x={viewBox.cx}
                                      y={viewBox.cy}
                                      className="fill-foreground text-3xl font-bold"
                                    >
                                      {solvedProblems?.solvedProblem.toLocaleString()}
                                    </tspan>
                                    <tspan
                                      x={viewBox.cx}
                                      y={(viewBox.cy || 0) + 24}
                                      className="fill-muted-foreground"
                                    >
                                      Visitors
                                    </tspan>
                                  </text>
                                );
                              }
                            }}
                          />
                        </Pie>
                      </PieChart>
                    </ChartContainer>
                  </CardContent>
                  <CardFooter className="flex-col gap-2 text-sm">
                    <div className="flex items-center gap-2 font-medium leading-none">
                      Trending up by 5.2% this month{" "}
                      <TrendingUp className="h-4 w-4" />
                    </div>
                    <div className="leading-none text-muted-foreground">
                      Showing total visitors for the last 6 months
                    </div>
                  </CardFooter>
                </Card>
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

            <div className="mt-8">
              <h2 className="text-lg mb-4 font-bold uppercase tracking-widest">
                Some stats about this site
              </h2>
              <Table className="w-full">
                <TableBody>
                  <TableRow className="min-w-full">
                    <TableCell className="font-medium text-left">
                      Lines of Typescript powering this website
                    </TableCell>
                    <TableCell className="text-left">1002</TableCell>
                  </TableRow>
                  <TableRow className="min-w-full">
                    <TableCell className="font-medium text-left">
                      Stars this repository has on github
                    </TableCell>
                    <TableCell className="text-left">0</TableCell>
                  </TableRow>
                  <TableRow className="min-w-full">
                    <TableCell className="font-medium text-left">
                      Last updated at
                    </TableCell>
                    <TableCell className="text-left">
                      {" "}
                      10 November 2024
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </TracingBeam>
    </>
  );
}
