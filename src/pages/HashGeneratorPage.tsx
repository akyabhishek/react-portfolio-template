import React from "react";
import HashGenerator from "@/components/HashGenerator";
import { Helmet } from "react-helmet";

export default function HashGeneratorPage() {
  return (
    <>
      <Helmet>
        <title>Hash Generator | Online Tool By Abhishek Kumar Yadav</title>
        <meta
          name="description"
          content="Free online hash generator for MD5, SHA-1, SHA-256, and SHA-512. Instantly generate secure hashes for any text input. Fast, interactive, and privacy-friendly."
        />
        <meta
          name="keywords"
          content="hash generator, online, tool, md5, sha1, sha256, sha512, cryptography, secure, text, clipboard"
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://akyabhishek.vercel.app/hash-generator"
        />
      </Helmet>

      <main className="mt-14">
        <HashGenerator />
      </main>
    </>
  );
}
