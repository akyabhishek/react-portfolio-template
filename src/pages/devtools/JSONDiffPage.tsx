import React from "react";
import JSONDiff from "@/components/devtools/JSONDiff";
import { Helmet } from "react-helmet";

export default function JSONDiffPage() {
  return (
    <>
      <Helmet>
        <title>
          JSON Diff Tool | Online JSON Compare By Abhishek Kumar Yadav
        </title>
        <meta
          name="description"
          content="Free online JSON diff and compare tool. View visual diffs, structural changes, and JSON Patch output side by side. Fast, interactive, and privacy-friendly."
        />
        <meta
          name="keywords"
          content="json diff, json compare, online, tool, visual diff, structural diff, json patch, side by side"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://akyabhishek.vercel.app/json-diff" />
      </Helmet>

      <main className="mt-14">
        <JSONDiff />
      </main>
    </>
  );
}
