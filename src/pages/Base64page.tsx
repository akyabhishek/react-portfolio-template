
import React from "react";
import Base64Tool from "@/components/Base64Tool";
import { Helmet } from "react-helmet";

export default function Base64Page() {
  return (
    <>
      <Helmet>
        <title>Base64 Encoder & Decoder | Online Tool By Abhishek Kumar Yadav</title>
        <meta
          name="description"
          content="Free online tool to encode and decode Base64 text with support for UTF-8, ASCII, and UTF-16 character sets. Live, fast, and secure."
        />
        <meta name="keywords" content="base64, encode, decode, online, tool, text, utf-8, ascii, utf-16" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://akyabhishek.vercel.app/base64-tool" />
      </Helmet>

      <main className="mt-14">
        <Base64Tool />
      </main>
    </>
  );
}
