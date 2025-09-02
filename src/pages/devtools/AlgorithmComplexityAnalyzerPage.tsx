import React from "react";
import AlgorithmComplexityAnalyzer from "@/components/devtools/AlgorithmComplexityAnalyzer";
import { Helmet } from "react-helmet";

export default function AlgorithmComplexityAnalyzerPage() {
  return (
    <>
      <Helmet>
        <title>
          Algorithm Complexity Analyzer | Time & Space Complexity Analysis Tool
          By Abhishek Kumar Yadav
        </title>
        <meta
          name="description"
          content="Free online algorithm complexity analyzer. Analyze time and space complexity of algorithms with Big O notation. Includes common algorithm examples and explanations."
        />
        <meta
          name="keywords"
          content="algorithm complexity, big o notation, time complexity, space complexity, analysis, programming, algorithms, performance, computer science"
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://akyabhishek.vercel.app/algorithm-complexity-analyzer"
        />
      </Helmet>

      <main className="mt-14">
        <AlgorithmComplexityAnalyzer />
      </main>
    </>
  );
}
