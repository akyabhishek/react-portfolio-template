import React from "react";
import JSONFormatter from "@/components/devtools/JSONFormatter";
import { Helmet } from "react-helmet";

export default function JSONFormatterPage() {
  return (
    <>
      <Helmet>
        <title>
          JSON Formatter & Viewer | Online Tool By Abhishek Kumar Yadav
        </title>
        <meta
          name="description"
          content="Free online JSON formatter and viewer. Beautify, minify, validate, and visualize your JSON instantly. Fast, interactive, and privacy-friendly."
        />
        <meta
          name="keywords"
          content="json formatter, json viewer, online, tool, beautify, validate, tree view, clipboard"
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://akyabhishek.vercel.app/json-formatter"
        />
      </Helmet>

      <main className="mt-14">
        <JSONFormatter />
      </main>
    </>
  );
}
