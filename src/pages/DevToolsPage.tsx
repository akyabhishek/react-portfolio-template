import React from "react";
import ToolsForDev from "@/components/DevToolsSection";
import { Helmet } from "react-helmet";

export default function DevToolsPage() {
  return (
    <>
      <Helmet>
        <title>
          DevTools by Abhishek Kumar Yadav – Online Developer Utilities & Coding
          Tools
        </title>
        <meta
          name="description"
          content="Free online developer tools including Base64 encoder/decoder, hash generator, bitwise visualizer, and more. Fast, secure, and privacy-friendly utilities for developers."
        />
        <meta
          name="keywords"
          content="developer tools, online, utilities, base64, hash generator, bitwise, encode, decode, programming, utilities"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://akyabhishek.vercel.app/devtools" />
      </Helmet>

      <main className="mt-14">
        <ToolsForDev />
      </main>
    </>
  );
}
