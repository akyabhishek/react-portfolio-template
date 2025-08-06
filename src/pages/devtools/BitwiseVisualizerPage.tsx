import React from "react";
import BitwiseVisualizer from "@/components/devtools/BitwiseVisualizer";
import { Helmet } from "react-helmet";

export default function BitwiseVisualizerPage() {
  return (
    <>
      <Helmet>
        <title>
          Bitwise Operation Visualizer | Online Tool By Abhishek Kumar Yadav
        </title>
        <meta
          name="description"
          content="Free online tool to visualize bitwise operations (AND, OR, XOR, NOT, Left Shift, Right Shift) with binary block representation. Fast, interactive, and educational."
        />
        <meta
          name="keywords"
          content="bitwise, visualizer, online, tool, binary, AND, OR, XOR, NOT, shift, left shift, right shift"
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://akyabhishek.vercel.app/bitwise-visualizer"
        />
      </Helmet>

      <main className="mt-14">
        <BitwiseVisualizer />
      </main>
    </>
  );
}
