import React from "react";
import ASTComplexityAnalyzer from "@/components/devtools/ASTComplexityAnalyzer";
import { Helmet } from "react-helmet";

export default function ASTComplexityAnalyzerPage() {
  return (
    <>
      <Helmet>
        <title>
          Code Complexity Analyzer | AST-Based Big O Analysis Tool By Abhishek
          Kumar Yadav
        </title>
        <meta
          name="description"
          content="Free online AST-based algorithm complexity analyzer. Parses your code into an Abstract Syntax Tree and derives time & space complexity with Big O notation. Supports JavaScript, Java, Python, C++, and more."
        />
        <meta
          name="keywords"
          content="ast, abstract syntax tree, algorithm complexity, big o notation, time complexity, space complexity, code analysis, programming, performance"
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://akyabhishek.vercel.app/code-complexity-analyzer"
        />
      </Helmet>

      <main className="mt-14">
        <ASTComplexityAnalyzer />
      </main>
    </>
  );
}
