import React from "react";
import QRScanner from "@/components/devtools/QRScanner";
import { Helmet } from "react-helmet";

export default function QRScannerPage() {
  return (
    <>
      <Helmet>
        <title>
          QR Code Scanner | Camera & Image Upload Tool By Abhishek Kumar Yadav
        </title>
        <meta
          name="description"
          content="Free online QR code scanner with camera support and image upload. Scan QR codes instantly using your device camera or upload images. Fast, secure, and works offline."
        />
        <meta
          name="keywords"
          content="qr scanner, qr code reader, camera scanner, image upload, qr decode, barcode scanner, mobile scanner"
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://akyabhishek.vercel.app/qr-scanner"
        />
      </Helmet>

      <main className="mt-14">
        <QRScanner />
      </main>
    </>
  );
}
