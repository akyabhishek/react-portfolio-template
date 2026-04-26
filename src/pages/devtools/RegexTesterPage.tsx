import React from "react";
import RegexTester from "@/components/devtools/RegexTester";
import { Helmet } from "react-helmet";

export default function RegexTesterPage() {
  return (
    <>
      <Helmet>
        <title>
          Regex Tester | Online Regular Expression Tool By Abhishek Kumar Yadav
        </title>
        <meta
          name="description"
          content="Free online regex tester with live matching, capture group highlighting, and a quick reference cheatsheet. Test your regular expressions instantly."
        />
        <meta
          name="keywords"
          content="regex tester, regular expression, online, tool, match, capture group, cheatsheet"
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://abhishekkumaryadav.in/regex-tester"
        />
      </Helmet>

      <main className="mt-14">
        <RegexTester />
      </main>
    </>
  );
}
