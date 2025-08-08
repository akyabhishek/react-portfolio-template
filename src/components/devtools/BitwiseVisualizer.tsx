import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  GiLogicGateAnd,
  GiLogicGateOr,
  GiLogicGateXor,
  GiLogicGateNot,
  GiLogicGateNor,
} from "react-icons/gi";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import { FiRefreshCw } from "react-icons/fi";

const getBitLength = (n: number) => Math.max(8, n.toString(2).length);
const toBinary = (n: number, bits: number) => n.toString(2).padStart(bits, "0");

const BitwiseVisualizer: React.FC = () => {
  const [num1, setNum1] = useState("5");
  const [num2, setNum2] = useState("3");
  const [inputMode, setInputMode] = useState<"dec" | "bin" | "hex">("dec");
  const [operation, setOperation] = useState<
    "AND" | "OR" | "XOR" | "NOT" | "LSHIFT" | "RSHIFT"
  >("AND");
  const [num1Error, setNum1Error] = useState("");
  const [num2Error, setNum2Error] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved data from localStorage on component mount
  useEffect(() => {
    try {
      const savedNum1 = localStorage.getItem("bitwiseVisualizer_num1");
      const savedNum2 = localStorage.getItem("bitwiseVisualizer_num2");
      const savedInputMode = localStorage.getItem(
        "bitwiseVisualizer_inputMode"
      );
      const savedOperation = localStorage.getItem(
        "bitwiseVisualizer_operation"
      );

      if (savedNum1) setNum1(savedNum1);
      if (savedNum2) setNum2(savedNum2);
      if (savedInputMode && ["dec", "bin", "hex"].includes(savedInputMode)) {
        setInputMode(savedInputMode as "dec" | "bin" | "hex");
      }
      if (
        savedOperation &&
        ["AND", "OR", "XOR", "NOT", "LSHIFT", "RSHIFT"].includes(savedOperation)
      ) {
        setOperation(
          savedOperation as "AND" | "OR" | "XOR" | "NOT" | "LSHIFT" | "RSHIFT"
        );
      }
    } catch (error) {
      console.warn("Failed to load from localStorage:", error);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever values change (but only after initial load)
  useEffect(() => {
    if (!isLoaded) return;

    try {
      localStorage.setItem("bitwiseVisualizer_num1", num1);
      localStorage.setItem("bitwiseVisualizer_num2", num2);
      localStorage.setItem("bitwiseVisualizer_inputMode", inputMode);
      localStorage.setItem("bitwiseVisualizer_operation", operation);
    } catch (error) {
      console.warn("Failed to save to localStorage:", error);
    }
  }, [num1, num2, inputMode, operation, isLoaded]);

  const validateInput = (val: string, mode: "dec" | "bin" | "hex"): string => {
    if (!val.trim()) return "Input cannot be empty";

    switch (mode) {
      case "bin":
        if (!/^[01]+$/.test(val)) {
          return "Binary numbers can only contain 0 and 1";
        }
        break;
      case "hex":
        if (!/^[0-9A-Fa-f]+$/.test(val)) {
          return "Hexadecimal numbers can only contain 0-9 and A-F";
        }
        break;
      case "dec":
        if (!/^\d+$/.test(val)) {
          return "Decimal numbers can only contain digits 0-9";
        }
        break;
    }
    return "";
  };

  const parseInput = (val: string) => {
    if (inputMode === "bin") return parseInt(val, 2) || 0;
    if (inputMode === "hex") return parseInt(val, 16) || 0;
    return parseInt(val) || 0;
  };
  const n1 = num1Error ? 0 : parseInput(num1);
  const n2 = num2Error ? 0 : parseInput(num2);
  const n1Bits = getBitLength(n1);
  const n2Bits = getBitLength(n2);

  const result = (() => {
    if (num1Error || (operation !== "NOT" && num2Error)) return 0;

    switch (operation) {
      case "AND":
        return n1 & n2;
      case "OR":
        return n1 | n2;
      case "XOR":
        return n1 ^ n2;
      case "NOT":
        return ~n1 & ((1 << n1Bits) - 1);
      case "LSHIFT":
        return (n1 << (n2 & (n1Bits - 1))) & ((1 << n1Bits) - 1);
      case "RSHIFT":
        return (n1 >> (n2 & (n1Bits - 1))) & ((1 << n1Bits) - 1);
      default:
        return 0;
    }
  })();
  const resultBits = getBitLength(result);
  const maxBits = Math.max(n1Bits, n2Bits, resultBits);

  const handleNum1Change = (value: string) => {
    setNum1(value);
    setNum1Error(validateInput(value, inputMode));
  };

  const handleNum2Change = (value: string) => {
    setNum2(value);
    setNum2Error(validateInput(value, inputMode));
  };

  const handleInputModeChange = (mode: "dec" | "bin" | "hex") => {
    setInputMode(mode);
    setNum1Error(validateInput(num1, mode));
    setNum2Error(validateInput(num2, mode));
  };

  const handleReset = () => {
    setNum1("5");
    setNum2("3");
    setNum1Error("");
    setNum2Error("");
    // Clear localStorage when resetting
    try {
      localStorage.removeItem("bitwiseVisualizer_num1");
      localStorage.removeItem("bitwiseVisualizer_num2");
    } catch (error) {
      console.warn("Failed to clear localStorage:", error);
    }
  };
  return (
    <div className="flex items-center justify-center">
      <section className="max-w-screen-xl w-full p-4 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Bitwise Operation Visualizer</h2>
            <p className="text-xs text-gray-500">
              Visualize AND, OR, XOR, NOT, and shift operations in binary.
              Interactive and in-browser with real-time binary representation.
            </p>
          </div>
          <Button
            variant="ghost"
            onClick={handleReset}
            title="Reset to default values"
            className="flex items-center gap-2"
          >
            <FiRefreshCw size={16} />
            Reset
          </Button>
        </div>
        <div>
          <Label>Input Mode</Label>
          <Select value={inputMode} onValueChange={handleInputModeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select Input Mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="dec">Decimal</SelectItem>
              <SelectItem value="bin">Binary</SelectItem>
              <SelectItem value="hex">Hexadecimal</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Input 1</Label>
            <Input
              type="text"
              value={num1}
              onChange={(e) => handleNum1Change(e.target.value)}
              placeholder={
                inputMode === "bin"
                  ? "e.g. 1010"
                  : inputMode === "hex"
                  ? "e.g. 1A"
                  : "e.g. 10"
              }
              className={num1Error ? "border-red-500" : ""}
            />
            {num1Error && (
              <p className="text-red-500 text-xs mt-1">{num1Error}</p>
            )}
          </div>
          {operation !== "NOT" && (
            <div>
              <Label>
                {operation === "LSHIFT" || operation === "RSHIFT"
                  ? "Shift Amount"
                  : "Input 2"}
              </Label>
              <Input
                type="text"
                value={num2}
                onChange={(e) => handleNum2Change(e.target.value)}
                placeholder={
                  inputMode === "bin"
                    ? "e.g. 1010"
                    : inputMode === "hex"
                    ? "e.g. 1A"
                    : "e.g. 10"
                }
                className={num2Error ? "border-red-500" : ""}
              />
              {num2Error && (
                <p className="text-red-500 text-xs mt-1">{num2Error}</p>
              )}
            </div>
          )}
        </div>
        <div>
          <Label>Operation</Label>
          <Select
            value={operation}
            onValueChange={(val) => setOperation(val as any)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Operation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="AND">
                <span className="flex items-center gap-1">
                  <GiLogicGateAnd />
                  AND
                </span>
              </SelectItem>
              <SelectItem value="OR">
                <span className="flex items-center gap-1">
                  <GiLogicGateOr />
                  OR
                </span>
              </SelectItem>
              <SelectItem value="XOR">
                <span className="flex items-center gap-1">
                  <GiLogicGateXor />
                  XOR
                </span>
              </SelectItem>
              <SelectItem value="NOT">
                <span className="flex items-center gap-1">
                  <GiLogicGateNot />
                  NOT
                </span>
              </SelectItem>
              <SelectItem value="LSHIFT">
                <span className="flex items-center gap-1">
                  <BiLeftArrowAlt />
                  Left Shift
                </span>
              </SelectItem>
              <SelectItem value="RSHIFT">
                <span className="flex items-center gap-1">
                  <BiRightArrowAlt />
                  Right Shift
                </span>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="mt-4 space-y-2 font-mono text-sm">
          <div className="flex items-center gap-2">
            <span className="w-20">Input 1:</span>
            <span className="mr-2">({n1})</span>
            <div className="flex gap-1 justify-end w-full">
              {Array.from({ length: maxBits }).map((_, idx) => {
                const bitIdx = idx - (maxBits - n1Bits);
                if (bitIdx < 0) {
                  // Not block for missing bits
                  return (
                    <span
                      key={idx}
                      className="block w-6 h-6 rounded bg-red-100 dark:bg-red-900 text-center leading-6 font-bold text-base border border-red-300 dark:border-red-600"
                    >
                      ✗
                    </span>
                  );
                }
                const bit = toBinary(n1, n1Bits)[bitIdx];
                return (
                  <span
                    key={idx}
                    className="block w-6 h-6 rounded bg-gray-200 dark:bg-gray-700 text-center leading-6 font-bold text-base border border-gray-300 dark:border-gray-600"
                  >
                    {bit}
                  </span>
                );
              })}
            </div>
          </div>
          {operation !== "NOT" && (
            <div className="flex items-center gap-2">
              <span className="w-20">
                {operation === "LSHIFT" || operation === "RSHIFT"
                  ? "Shift Amount:"
                  : "Input 2:"}
              </span>
              <span className="mr-2">({n2})</span>
              <div className="flex gap-1 justify-end w-full">
                {Array.from({ length: maxBits }).map((_, idx) => {
                  const bitIdx = idx - (maxBits - n2Bits);
                  if (bitIdx < 0) {
                    // Not block for missing bits
                    return (
                      <span
                        key={idx}
                        className="block w-6 h-6 rounded bg-red-100 dark:bg-red-900 text-center leading-6 font-bold text-base border border-red-300 dark:border-red-600"
                      >
                        ✗
                      </span>
                    );
                  }
                  const bit = toBinary(n2, n2Bits)[bitIdx];
                  return (
                    <span
                      key={idx}
                      className="block w-6 h-6 rounded bg-gray-200 dark:bg-gray-700 text-center leading-6 font-bold text-base border border-gray-300 dark:border-gray-600"
                    >
                      {bit}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
          <div className="flex items-center gap-2 font-semibold">
            <span className="w-20">Result:</span>
            <span className="mr-2">({result})</span>
            <div className="flex gap-1 justify-end w-full">
              {Array.from({ length: maxBits }).map((_, idx) => {
                const bitIdx = idx - (maxBits - resultBits);
                if (bitIdx < 0) {
                  // Not block for missing bits
                  return (
                    <span
                      key={idx}
                      className="block w-6 h-6 rounded bg-red-100 dark:bg-red-900 text-center leading-6 font-bold text-base border border-red-300 dark:border-red-600"
                    >
                      ✗
                    </span>
                  );
                }
                const bit = toBinary(result, resultBits)[bitIdx];
                return (
                  <span
                    key={idx}
                    className="block w-6 h-6 rounded bg-green-200 dark:bg-green-700 text-center leading-6 font-bold text-base border border-green-400 dark:border-green-600"
                  >
                    {bit}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BitwiseVisualizer;
