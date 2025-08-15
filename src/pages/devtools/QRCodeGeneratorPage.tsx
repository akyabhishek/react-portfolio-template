import React from "react";
import QRCodeGenerator from "@/components/devtools/QRCodeGenerator";
import { Helmet } from "react-helmet";

export default function QRCodeGeneratorPage() {
  return (
    <>
      <Helmet>
        <title>
          QR Code Generator | Free Online Tool By Abhishek Kumar Yadav
        </title>
        <meta
          name="description"
          content="Free online QR code generator with customizable colors, sizes, and error correction levels. Generate QR codes for URLs, text, and more. 100% secure and private."
        />
        <meta
          name="keywords"
          content="qr code, generator, online, free, custom, url, text, barcode, mobile, scanner"
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://akyabhishek.vercel.app/qr-generator"
        />
      </Helmet>

      <main className="mt-14">
        <QRCodeGenerator />
      </main>
    </>
  );
}
