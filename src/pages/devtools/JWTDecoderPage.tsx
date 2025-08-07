import React from "react";
import JWTDecoder from "@/components/devtools/JWTDecoder";
import { Helmet } from "react-helmet";

export default function JWTDecoderPage() {
  return (
    <>
      <Helmet>
        <title>JWT Decoder | Online DevTools By Abhishek Kumar Yadav</title>
        <meta
          name="description"
          content="Free online JWT decoder. Instantly decode JWT tokens, view header and payload, privacy-friendly and fast."
        />
        <meta
          name="keywords"
          content="jwt decoder, jwt, json web token, online, tool, decode, header, payload, clipboard"
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://akyabhishek.vercel.app/jwt-decoder"
        />
      </Helmet>

      <main className="mt-14">
        <JWTDecoder />
      </main>
    </>
  );
}
