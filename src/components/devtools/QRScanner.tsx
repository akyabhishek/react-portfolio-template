"use client";

import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  FiCamera,
  FiUpload,
  FiCopy,
  FiExternalLink,
  FiStopCircle,
  FiPlay,
  FiRefreshCw,
} from "react-icons/fi";
import { toast } from "../../hooks/use-toast";
import QRCode from "qrcode-reader";

interface ScanResult {
  data: string;
  timestamp: Date;
  source: "camera" | "upload";
}

const QRScanner: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [scanHistory, setScanHistory] = useState<ScanResult[]>([]);
  const [activeTab, setActiveTab] = useState<"camera" | "upload">("camera");
  const [stream, setStream] = useState<MediaStream | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scanIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Load scan history from localStorage
  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem("qrScanner_history");
      if (savedHistory) {
        const parsed = JSON.parse(savedHistory);
        // Convert timestamp strings back to Date objects
        const history = parsed.map((item: any) => ({
          ...item,
          timestamp: new Date(item.timestamp),
        }));
        setScanHistory(history);
      }
    } catch (error) {
      console.warn("Failed to load scan history:", error);
    }
  }, []);

  // Save scan history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("qrScanner_history", JSON.stringify(scanHistory));
    } catch (error) {
      console.warn("Failed to save scan history:", error);
    }
  }, [scanHistory]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, []);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment", // Use back camera if available
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });

      setStream(mediaStream);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }

      setIsScanning(true);
      startScanning();

      toast({
        title: "Camera started",
        description: "Position QR code in camera view",
        duration: 3000,
      });
    } catch (error) {
      console.error("Camera access error:", error);
      toast({
        title: "Camera access denied",
        description: "Please allow camera access to scan QR codes",
        duration: 3000,
      });
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setIsScanning(false);
    stopScanning();

    toast({
      title: "Camera stopped",
      duration: 2000,
    });
  };

  const startScanning = () => {
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
    }

    scanIntervalRef.current = setInterval(() => {
      scanQRFromVideo();
    }, 500); // Scan every 500ms
  };

  const stopScanning = () => {
    if (scanIntervalRef.current) {
      clearInterval(scanIntervalRef.current);
      scanIntervalRef.current = null;
    }
  };

  const scanQRFromVideo = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas || video.readyState !== 4) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    try {
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const qr = new QRCode();

      qr.callback = (err, value) => {
        if (err) return;

        if (value?.result) {
          handleScanSuccess(value.result, "camera");
        }
      };

      qr.decode(imageData);
    } catch (error) {
      // Silent error - scanning will continue
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file",
        duration: 3000,
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      scanQRFromImage(result);
    };
    reader.readAsDataURL(file);
  };

  const scanQRFromImage = (imageSrc: string) => {
    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      try {
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const qr = new QRCode();

        qr.callback = (err, value) => {
          if (err) {
            toast({
              title: "No QR code found",
              description: "Could not detect a QR code in this image",
              duration: 3000,
            });
            return;
          }

          if (value?.result) {
            handleScanSuccess(value.result, "upload");
          }
        };

        qr.decode(imageData);
      } catch (error) {
        toast({
          title: "Scan failed",
          description: "Error processing the image",
          duration: 3000,
        });
      }
    };
    img.src = imageSrc;
  };

  const handleScanSuccess = (data: string, source: "camera" | "upload") => {
    const result: ScanResult = {
      data,
      timestamp: new Date(),
      source,
    };

    setScanResult(result);
    setScanHistory((prev) => [result, ...prev.slice(0, 9)]); // Keep last 10 results

    if (source === "camera") {
      // Stop scanning briefly to prevent multiple scans of the same code
      stopScanning();
      setTimeout(() => {
        if (isScanning) startScanning();
      }, 2000);
    }

    toast({
      title: "QR Code detected!",
      description: `Found: ${data.substring(0, 50)}${
        data.length > 50 ? "..." : ""
      }`,
      duration: 3000,
    });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard", duration: 2000 });
  };

  const openLink = (url: string) => {
    try {
      const validUrl = url.startsWith("http") ? url : `https://${url}`;
      window.open(validUrl, "_blank");
    } catch (error) {
      toast({ title: "Invalid URL", duration: 2000 });
    }
  };

  const isUrl = (text: string) => {
    try {
      // Check if it's a valid URL with protocol
      if (text.startsWith("http://") || text.startsWith("https://")) {
        new URL(text);
        return true;
      }

      // Check if it looks like a domain (contains a dot and valid characters)
      const domainPattern = /^[a-zA-Z0-9-]+\.[a-zA-Z]{2,}([\/\w \.-]*)*\/?$/;
      if (domainPattern.test(text)) {
        // Try to validate as URL with https prefix
        new URL(`https://${text}`);
        return true;
      }

      return false;
    } catch {
      return false;
    }
  };

  const clearHistory = () => {
    setScanHistory([]);
    setScanResult(null);
    localStorage.removeItem("qrScanner_history");
    toast({ title: "History cleared", duration: 2000 });
  };

  return (
    <section className="max-w-screen-xl mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold">QR Code Scanner</h2>
      <p className="text-xs text-gray-500">
        Scan QR codes using your camera or upload an image. All processing
        happens locally in your browser.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scanner Section */}
        <div className="space-y-4">
          <Tabs
            value={activeTab}
            onValueChange={(val) => setActiveTab(val as "camera" | "upload")}
          >
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="camera">Camera Scan</TabsTrigger>
              <TabsTrigger value="upload">Upload Image</TabsTrigger>
            </TabsList>

            <TabsContent value="camera" className="space-y-4">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative w-full aspect-video bg-muted rounded-lg overflow-hidden">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    muted
                    playsInline
                  />
                  {!isScanning && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <FiCamera
                          size={48}
                          className="mx-auto mb-2 text-muted-foreground"
                        />
                        <p className="text-muted-foreground">
                          Camera not active
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  {!isScanning ? (
                    <Button
                      onClick={startCamera}
                      className="flex items-center gap-2"
                    >
                      <FiPlay size={16} />
                      Start Camera
                    </Button>
                  ) : (
                    <Button
                      onClick={stopCamera}
                      variant="destructive"
                      className="flex items-center gap-2"
                    >
                      <FiStopCircle size={16} />
                      Stop Camera
                    </Button>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="upload" className="space-y-4">
              <div className="flex flex-col items-center space-y-4">
                <div
                  className="w-full p-8 border-2 border-dashed border-muted-foreground/25 rounded-lg text-center cursor-pointer hover:border-muted-foreground/50 hover:bg-muted/50 transition-all duration-200"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <FiUpload
                    size={48}
                    className="mx-auto mb-4 text-muted-foreground"
                  />
                  <p className="text-sm text-muted-foreground mb-2">
                    Click to upload an image containing a QR code
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Supports JPG, PNG, GIF, and other image formats
                  </p>
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <canvas ref={canvasRef} className="hidden" />
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          {/* Current Scan Result */}
          {scanResult && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg">Scan Result</CardTitle>
                <div className="flex gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(scanResult.data)}
                        >
                          <FiCopy size={16} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>Copy to clipboard</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  {isUrl(scanResult.data) && (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openLink(scanResult.data)}
                          >
                            <FiExternalLink size={16} />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Open link</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={scanResult.data}
                  readOnly
                  rows={4}
                  className="resize-none bg-muted"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Scanned via {scanResult.source} at{" "}
                  {scanResult.timestamp.toLocaleString()}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Scan History */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg">Scan History</CardTitle>
              {scanHistory.length > 0 && (
                <Button variant="outline" size="sm" onClick={clearHistory}>
                  <FiRefreshCw size={16} />
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {scanHistory.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">
                  No scans yet. Start scanning to see history here.
                </p>
              ) : (
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {scanHistory.map((result, index) => (
                    <div
                      key={index}
                      className="p-2 border rounded text-sm hover:bg-muted cursor-pointer"
                      onClick={() => setScanResult(result)}
                    >
                      <p className="font-mono text-xs truncate">
                        {result.data}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {result.timestamp.toLocaleString()} • {result.source}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default QRScanner;
