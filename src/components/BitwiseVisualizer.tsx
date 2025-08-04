import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

const getBitLength = (n: number) => Math.max(8, n.toString(2).length);
const toBinary = (n: number, bits: number) => n.toString(2).padStart(bits, "0");

const BitwiseVisualizer: React.FC = () => {
  const [num1, setNum1] = useState("5");
  const [num2, setNum2] = useState("3");
  const [inputMode, setInputMode] = useState<"dec" | "bin" | "hex">("dec");
  const [operation, setOperation] = useState<
    "AND" | "OR" | "XOR" | "NOT" | "LSHIFT" | "RSHIFT"
  >("AND");

  const parseInput = (val: string) => {
    if (inputMode === "bin") return parseInt(val, 2) || 0;
    if (inputMode === "hex") return parseInt(val, 16) || 0;
    return parseInt(val) || 0;
  };
  const n1 = parseInput(num1);
  const n2 = parseInput(num2);
  const n1Bits = getBitLength(n1);
  const n2Bits = getBitLength(n2);

  const result = (() => {
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
  return (
    <div className="flex items-center justify-center">
      <section className="max-w-3xl w-full p-4 space-y-6">
        <h2 className="text-2xl font-bold mb-5">
          Bitwise Operation Visualizer
        </h2>
        <p className="text-xs text-gray-500">
          Visualize AND, OR, XOR, NOT, and shift operations in binary.
          Interactive and in-browser with real-time binary representation.
        </p>
        <div>
          <Label>Input Mode</Label>
          <Select
            value={inputMode}
            onValueChange={(val) => setInputMode(val as any)}
          >
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
              onChange={(e) => setNum1(e.target.value)}
              placeholder={
                inputMode === "bin"
                  ? "e.g. 1010"
                  : inputMode === "hex"
                  ? "e.g. 1A"
                  : "e.g. 10"
              }
            />
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
                onChange={(e) => setNum2(e.target.value)}
                placeholder={
                  inputMode === "bin"
                    ? "e.g. 1010"
                    : inputMode === "hex"
                    ? "e.g. 1A"
                    : "e.g. 10"
                }
              />
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
