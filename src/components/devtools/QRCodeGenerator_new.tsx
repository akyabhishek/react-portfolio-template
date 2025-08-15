"use client";

import React, { useState, useEffect, useRef } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";
import { FiDownload, FiClipboard, FiRefreshCw, FiCopy } from "react-icons/fi";
import { toast } from "../../hooks/use-toast";
import { Input } from "@/components/ui/input";
import QRCode from "qrcode";

type ErrorCorrectionLevel = "L" | "M" | "Q" | "H";
type QRType = "image/png" | "image/jpeg" | "image/webp";

const ERROR_CORRECTION_LEVELS: {
  value: ErrorCorrectionLevel;
  label: string;
  description: string;
}[] = [
  {
    value: "L",
    label: "Low (~7%)",
    description: "Good for clean environments",
  },
  {
    value: "M",
    label: "Medium (~15%)",
    description: "General purpose (default)",
  },
  { value: "Q", label: "Quartile (~25%)", description: "Good for outdoor use" },
  {
    value: "H",
    label: "High (~30%)",
    description: "Best for damaged surfaces",
  },
];

const QR_TYPES: { value: QRType; label: string }[] = [
  { value: "image/png", label: "PNG" },
  { value: "image/jpeg", label: "JPEG" },
  { value: "image/webp", label: "WebP" },
];

const SIZE_OPTIONS: { value: number; label: string }[] = [
  { value: 128, label: "128px (Small)" },
  { value: 256, label: "256px (Medium)" },
  { value: 384, label: "384px (Large)" },
  { value: 512, label: "512px (X-Large)" },
  { value: 768, label: "768px (XX-Large)" },
  { value: 1024, label: "1024px (Print Quality)" },
];

const QRCodeGenerator: React.FC = () => {
  // Validation function for hex color codes
  const isValidHexColor = (color: string): boolean => {
    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    return hexRegex.test(color);
  };

  // Sanitize color input
  const sanitizeColor = (color: string, fallback: string): string => {
    if (isValidHexColor(color)) {
      return color;
    }
    return fallback;
  };

  const [text, setText] = useState("");
  const [size, setSize] = useState(256);
  const [margin, setMargin] = useState(1);
  const [errorCorrectionLevel, setErrorCorrectionLevel] =
    useState<ErrorCorrectionLevel>("M");
  const [darkColor, setDarkColor] = useState("#000000");
  const [lightColor, setLightColor] = useState("#FFFFFF");
  const [qrType, setQrType] = useState<QRType>("image/png");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoDataURL, setLogoDataURL] = useState("");
  const [logoSize, setLogoSize] = useState(20);
  const [qrCodeDataURL, setQrCodeDataURL] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load saved data from localStorage on component mount
  useEffect(() => {
    try {
      const savedText = localStorage.getItem("qrGenerator_text");
      const savedSize = localStorage.getItem("qrGenerator_size");
      const savedMargin = localStorage.getItem("qrGenerator_margin");
      const savedErrorLevel = localStorage.getItem("qrGenerator_errorLevel");
      const savedDarkColor = localStorage.getItem("qrGenerator_darkColor");
      const savedLightColor = localStorage.getItem("qrGenerator_lightColor");
      const savedQrType = localStorage.getItem("qrGenerator_qrType");
      const savedLogoSize = localStorage.getItem("qrGenerator_logoSize");

      if (savedText) setText(savedText);
      if (savedSize) setSize(parseInt(savedSize));
      if (savedMargin) setMargin(parseInt(savedMargin));
      if (
        savedErrorLevel &&
        ERROR_CORRECTION_LEVELS.find((level) => level.value === savedErrorLevel)
      ) {
        setErrorCorrectionLevel(savedErrorLevel as ErrorCorrectionLevel);
      }
      if (savedDarkColor) setDarkColor(savedDarkColor);
      if (savedLightColor) setLightColor(savedLightColor);
      if (savedQrType && QR_TYPES.find((type) => type.value === savedQrType)) {
        setQrType(savedQrType as QRType);
      }
      if (savedLogoSize) setLogoSize(parseInt(savedLogoSize));
    } catch (error) {
      console.warn("Failed to load from localStorage:", error);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever values change
  useEffect(() => {
    if (!isLoaded) return;

    try {
      localStorage.setItem("qrGenerator_text", text);
      localStorage.setItem("qrGenerator_size", size.toString());
      localStorage.setItem("qrGenerator_margin", margin.toString());
      localStorage.setItem("qrGenerator_errorLevel", errorCorrectionLevel);
      localStorage.setItem("qrGenerator_darkColor", darkColor);
      localStorage.setItem("qrGenerator_lightColor", lightColor);
      localStorage.setItem("qrGenerator_qrType", qrType);
      localStorage.setItem("qrGenerator_logoSize", logoSize.toString());
    } catch (error) {
      console.warn("Failed to save to localStorage:", error);
    }
  }, [
    text,
    size,
    margin,
    errorCorrectionLevel,
    darkColor,
    lightColor,
    qrType,
    logoSize,
    isLoaded,
  ]);

  // Generate QR code whenever inputs change
  useEffect(() => {
    if (!text.trim()) {
      setQrCodeDataURL("");
      return;
    }

    const generateQR = async () => {
      try {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Sanitize colors before using them
        const safeDarkColor = sanitizeColor(darkColor, "#000000");
        const safeLightColor = sanitizeColor(lightColor, "#FFFFFF");

        const options = {
          errorCorrectionLevel,
          type: qrType,
          quality: 0.92,
          margin: margin,
          color: {
            dark: safeDarkColor,
            light: safeLightColor,
          },
          width: size,
        };

        await QRCode.toCanvas(canvas, text, options);

        // If logo is provided, overlay it on the QR code
        if (logoDataURL) {
          const ctx = canvas.getContext("2d");
          if (ctx) {
            const logoImg = new Image();
            logoImg.onload = () => {
              const logoSizePixels = (size * logoSize) / 100;
              const logoX = (size - logoSizePixels) / 2;
              const logoY = (size - logoSizePixels) / 2;

              // Draw white background circle for logo
              ctx.fillStyle = safeLightColor;
              ctx.beginPath();
              ctx.arc(
                size / 2,
                size / 2,
                logoSizePixels / 2 + 5,
                0,
                2 * Math.PI
              );
              ctx.fill();

              // Draw logo
              ctx.drawImage(
                logoImg,
                logoX,
                logoY,
                logoSizePixels,
                logoSizePixels
              );

              const dataURL = canvas.toDataURL(qrType, 0.92);
              setQrCodeDataURL(dataURL);
            };
            logoImg.src = logoDataURL;
          }
        } else {
          const dataURL = canvas.toDataURL(qrType, 0.92);
          setQrCodeDataURL(dataURL);
        }
      } catch (error) {
        console.error("Failed to generate QR code:", error);
        toast({
          title: "Failed to generate QR code",
          description: "Please check your input and try again.",
          duration: 3000,
        });
      }
    };

    generateQR();
  }, [
    text,
    size,
    margin,
    errorCorrectionLevel,
    darkColor,
    lightColor,
    qrType,
    logoDataURL,
    logoSize,
  ]);

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText(clipboardText);
      toast({ title: "Pasted from clipboard", duration: 3000 });
    } catch {
      toast({ title: "Failed to paste", duration: 3000 });
    }
  };

  const handleReset = () => {
    setText("");
    setSize(256);
    setMargin(1);
    setErrorCorrectionLevel("M");
    setDarkColor("#000000");
    setLightColor("#FFFFFF");
    setQrType("image/png");
    setLogoFile(null);
    setLogoDataURL("");
    setLogoSize(20);

    // Clear the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    try {
      localStorage.removeItem("qrGenerator_text");
      localStorage.removeItem("qrGenerator_size");
      localStorage.removeItem("qrGenerator_margin");
      localStorage.removeItem("qrGenerator_errorLevel");
      localStorage.removeItem("qrGenerator_darkColor");
      localStorage.removeItem("qrGenerator_lightColor");
      localStorage.removeItem("qrGenerator_qrType");
      localStorage.removeItem("qrGenerator_includeMargin");
      localStorage.removeItem("qrGenerator_logoSize");
    } catch (error) {
      console.warn("Failed to clear localStorage:", error);
    }

    toast({ title: "Settings reset to default", duration: 3000 });
  };

  const handleDownload = () => {
    if (!qrCodeDataURL) return;

    const link = document.createElement("a");
    link.download = `qrcode-${Date.now()}.${qrType.split("/")[1]}`;
    link.href = qrCodeDataURL;
    link.click();

    toast({ title: "QR code downloaded", duration: 3000 });
  };

  const handleCopyImage = async () => {
    if (!qrCodeDataURL) return;

    try {
      const canvas = canvasRef.current;
      if (!canvas) return;

      canvas.toBlob(
        async (blob) => {
          if (!blob) return;

          await navigator.clipboard.write([
            new ClipboardItem({ [blob.type]: blob }),
          ]);

          toast({ title: "QR code copied to clipboard", duration: 3000 });
        },
        qrType,
        0.92
      );
    } catch {
      toast({ title: "Failed to copy image", duration: 3000 });
    }
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: "Logo file too large",
          description: "Please select a file smaller than 2MB",
          duration: 3000,
        });
        return;
      }

      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setLogoDataURL(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setLogoFile(null);
    setLogoDataURL("");
    // Clear the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDarkColorChange = (color: string) => {
    // Allow temporary invalid states while typing, but validate on blur
    setDarkColor(color);
  };

  const handleLightColorChange = (color: string) => {
    // Allow temporary invalid states while typing, but validate on blur
    setLightColor(color);
  };

  const handleDarkColorBlur = (color: string) => {
    const sanitized = sanitizeColor(color, "#000000");
    if (sanitized !== color) {
      setDarkColor(sanitized);
      toast({
        title: "Invalid color format",
        description: "Foreground color reset to default black (#000000)",
        duration: 3000,
      });
    }
  };

  const handleLightColorBlur = (color: string) => {
    const sanitized = sanitizeColor(color, "#FFFFFF");
    if (sanitized !== color) {
      setLightColor(sanitized);
      toast({
        title: "Invalid color format",
        description: "Background color reset to default white (#FFFFFF)",
        duration: 3000,
      });
    }
  };

  return (
    <section className="max-w-screen-xl mx-auto p-4 space-y-4">
      <h2 className="text-2xl font-bold">QR Code Generator</h2>
      <p className="text-xs text-gray-500">
        Generate customizable QR codes for text, URLs, and more. 100% secure,
        all processing happens in your browser.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input and Settings */}
        <div className="space-y-6">
          {/* Text Input */}
          <div className="relative">
            <Label htmlFor="text">Text or URL to Encode</Label>
            <div className="absolute top-[2.2rem] right-1 z-10 flex gap-1">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 p-1 text-muted-foreground hover:text-primary"
                      onClick={handlePaste}
                    >
                      <FiClipboard size={16} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>Paste from clipboard</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 p-1 text-muted-foreground hover:text-primary"
                      onClick={handleReset}
                    >
                      <FiRefreshCw size={16} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>Reset all settings</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>

            <Textarea
              id="text"
              placeholder="Enter text, URL, or any data to generate QR code"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="mt-2 pr-16"
              rows={4}
            />
          </div>

          {/* Basic Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="size">Size</Label>
              <Select
                value={size.toString()}
                onValueChange={(val) => setSize(parseInt(val))}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select Size" />
                </SelectTrigger>
                <SelectContent>
                  {SIZE_OPTIONS.map((sizeOption) => (
                    <SelectItem
                      key={sizeOption.value}
                      value={sizeOption.value.toString()}
                    >
                      {sizeOption.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="format">Download Format</Label>
              <Select
                value={qrType}
                onValueChange={(val) => setQrType(val as QRType)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select Format" />
                </SelectTrigger>
                <SelectContent>
                  {QR_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Logo Upload */}
          <div className="space-y-3">
            <Label>Logo (Optional)</Label>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-xs file:bg-muted file:text-muted-foreground hover:file:bg-muted/80"
                />
              </div>
              {logoDataURL && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleRemoveLogo}
                >
                  Remove
                </Button>
              )}
            </div>
            {logoDataURL && (
              <div className="flex items-center gap-3">
                <img
                  src={logoDataURL}
                  alt="Logo preview"
                  className="w-12 h-12 object-contain border rounded"
                />
                <div className="flex-1">
                  <Label htmlFor="logoSize">Logo Size ({logoSize}%)</Label>
                  <Input
                    id="logoSize"
                    type="range"
                    min="10"
                    max="40"
                    value={logoSize}
                    onChange={(e) => setLogoSize(parseInt(e.target.value))}
                    className="mt-1"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Advanced Settings */}
          <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
            <h3 className="font-semibold text-sm">Advanced Settings</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="darkColor">Foreground Color</Label>
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="color"
                    id="darkColor"
                    value={isValidHexColor(darkColor) ? darkColor : "#000000"}
                    onChange={(e) => handleDarkColorChange(e.target.value)}
                    className="w-10 h-8 rounded border border-input"
                  />
                  <Input
                    value={darkColor}
                    onChange={(e) => handleDarkColorChange(e.target.value)}
                    onBlur={(e) => handleDarkColorBlur(e.target.value)}
                    className="flex-1 text-xs"
                    placeholder="#000000"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="lightColor">Background Color</Label>
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="color"
                    id="lightColor"
                    value={isValidHexColor(lightColor) ? lightColor : "#FFFFFF"}
                    onChange={(e) => handleLightColorChange(e.target.value)}
                    className="w-10 h-8 rounded border border-input"
                  />
                  <Input
                    value={lightColor}
                    onChange={(e) => handleLightColorChange(e.target.value)}
                    onBlur={(e) => handleLightColorBlur(e.target.value)}
                    className="flex-1 text-xs"
                    placeholder="#FFFFFF"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="errorLevel">Error Correction Level</Label>
                <Select
                  value={errorCorrectionLevel}
                  onValueChange={(val) =>
                    setErrorCorrectionLevel(val as ErrorCorrectionLevel)
                  }
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select Error Correction" />
                  </SelectTrigger>
                  <SelectContent>
                    {ERROR_CORRECTION_LEVELS.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        <div>
                          <div className="font-medium">{level.label}</div>
                          <div className="text-xs text-muted-foreground">
                            {level.description}
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="margin">Margin (quiet zone)</Label>
                <Input
                  id="margin"
                  type="number"
                  min="0"
                  max="20"
                  value={margin}
                  onChange={(e) => setMargin(parseInt(e.target.value) || 0)}
                  className="mt-2"
                  placeholder="0 = no margin"
                />
              </div>
            </div>
          </div>
        </div>

        {/* QR Code Preview and Actions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>QR Code Preview</Label>
            {qrCodeDataURL && (
              <div className="flex gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={handleDownload}
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <FiDownload size={16} />
                        Download
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>
                        Download QR code as {qrType.split("/")[1].toUpperCase()}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={handleCopyImage}
                        variant="outline"
                        size="sm"
                        className="flex items-center gap-2"
                      >
                        <FiCopy size={16} />
                        Copy
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Copy image to clipboard</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
          </div>

          <div>
            <div className="mt-2 p-4 border rounded-lg bg-muted/30 flex flex-col items-center justify-center min-h-[300px]">
              {text.trim() ? (
                <div className="flex flex-col items-center gap-4">
                  <canvas ref={canvasRef} style={{ display: "none" }} />
                  {qrCodeDataURL && (
                    <img
                      src={qrCodeDataURL}
                      alt="Generated QR Code"
                      className="rounded"
                      style={{ maxWidth: "100%", height: "auto" }}
                    />
                  )}
                </div>
              ) : (
                <div className="text-center text-muted-foreground">
                  <p>Enter text above to generate QR code</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QRCodeGenerator;
