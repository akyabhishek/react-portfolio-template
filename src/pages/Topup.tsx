import React, { useState } from "react";
import { Helmet } from "react-helmet";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  Clock,
  Calculator,
  Coffee,
  Settings,
  Info,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function Topup() {
  const [workedHours, setWorkedHours] = useState<string>("");
  const [workedMinutes, setWorkedMinutes] = useState<string>("");
  const [exitTime, setExitTime] = useState<string>("");
  const [travelTime, setTravelTime] = useState<string>("30");
  const [targetHours, setTargetHours] = useState<string>("10");
  const [showConfig, setShowConfig] = useState<boolean>(false);
  const [showExample, setShowExample] = useState<boolean>(false);
  const [result, setResult] = useState<{
    topupStart: string;
    topupEnd: string;
    topupDuration: string;
  } | null>(null);

  const calculateTopup = () => {
    // Validate inputs
    const hours = parseInt(workedHours) || 0;
    const minutes = parseInt(workedMinutes) || 0;
    const travel = parseInt(travelTime) || 0;
    const target = parseFloat(targetHours) || 10;

    if (!exitTime) {
      alert("Please enter exit time");
      return;
    }

    // Calculate total worked time in minutes
    const workedTotalMinutes = hours * 60 + minutes;

    // Calculate target time in minutes
    const targetTotalMinutes = target * 60;

    // Calculate topup needed in minutes
    const topupNeeded = targetTotalMinutes - workedTotalMinutes;

    if (topupNeeded <= 0) {
      alert("You've already completed your target hours!");
      return;
    }

    // Parse exit time
    const [exitHour, exitMinute] = exitTime.split(":").map(Number);
    if (isNaN(exitHour) || isNaN(exitMinute)) {
      alert("Invalid exit time format");
      return;
    }

    // Calculate topup start time (exit time + travel time)
    let topupStartMinutes = exitHour * 60 + exitMinute + travel;
    const topupStartHour = Math.floor(topupStartMinutes / 60) % 24;
    const topupStartMinute = topupStartMinutes % 60;

    // Calculate topup end time
    let topupEndMinutes = topupStartMinutes + topupNeeded;
    const topupEndHour = Math.floor(topupEndMinutes / 60) % 24;
    const topupEndMinute = topupEndMinutes % 60;

    // Format times to 12-hour format
    const formatTime = (h: number, m: number) => {
      const period = h >= 12 ? "PM" : "AM";
      const hour12 = h % 12 || 12;
      return `${hour12.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")} ${period}`;
    };

    const topupHours = Math.floor(topupNeeded / 60);
    const topupMins = topupNeeded % 60;

    setResult({
      topupStart: formatTime(topupStartHour, topupStartMinute),
      topupEnd: formatTime(topupEndHour, topupEndMinute),
      topupDuration: `${topupHours}h ${topupMins}m`,
    });
  };

  const handleReset = () => {
    setWorkedHours("");
    setWorkedMinutes("");
    setExitTime("");
    setTravelTime("30");
    setTargetHours("10");
    setResult(null);
  };

  return (
    <>
      <Helmet>
        <title>Topup Calculator - Work Hours Calculator</title>
        <meta
          name="description"
          content="Calculate the time range needed to complete your target work hours"
        />
      </Helmet>

      <main className="min-h-screen bg-background py-20 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Topup Calculator</h1>
            <p className="text-sm text-muted-foreground">
              Calculate topup time range
            </p>
          </div>

          <Card className="shadow-lg">
            <CardContent className="pt-6 space-y-6">
              {/* Time Already Worked */}
              <div className="space-y-2">
                <Label className="text-sm">Time Worked</Label>
                <div className="grid grid-cols-2 gap-3">
                  <Select value={workedHours} onValueChange={setWorkedHours}>
                    <SelectTrigger>
                      <SelectValue placeholder="Hours" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 24 }, (_, i) => (
                        <SelectItem key={i} value={i.toString()}>
                          {i} {i === 1 ? "hour" : "hours"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={workedMinutes}
                    onValueChange={setWorkedMinutes}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Minutes" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 60 }, (_, i) => (
                        <SelectItem key={i} value={i.toString()}>
                          {i} {i === 1 ? "min" : "mins"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Exit Time */}
              <div className="space-y-2">
                <Label htmlFor="exitTime" className="text-sm">
                  Exit Time
                </Label>
                <Input
                  id="exitTime"
                  type="time"
                  value={exitTime}
                  onChange={(e) => setExitTime(e.target.value)}
                />
              </div>

              {/* Config Section */}
              <div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowConfig(!showConfig)}
                  className="w-full justify-between text-muted-foreground hover:text-foreground"
                >
                  <span className="flex items-center gap-2">
                    <Settings className="w-4 h-4" />
                    Configuration
                  </span>
                  {showConfig ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </Button>

                {showConfig && (
                  <div className="mt-3 space-y-4 p-4 border rounded-md bg-muted/30">
                    <div className="space-y-2">
                      <Label htmlFor="travelTime" className="text-sm">
                        Travel Time (minutes)
                      </Label>
                      <Input
                        id="travelTime"
                        type="number"
                        min="0"
                        placeholder="30"
                        value={travelTime}
                        onChange={(e) => setTravelTime(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="targetHours" className="text-sm">
                        Target Total Hours
                      </Label>
                      <Input
                        id="targetHours"
                        type="number"
                        min="0"
                        step="0.5"
                        placeholder="10"
                        value={targetHours}
                        onChange={(e) => setTargetHours(e.target.value)}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <Button onClick={calculateTopup} className="flex-1">
                  Calculate
                </Button>
                <Button onClick={handleReset} variant="outline">
                  Reset
                </Button>
              </div>

              {/* Result */}
              {result && (
                <div className="p-4 bg-primary/10 rounded-lg border border-primary">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Start
                      </span>
                      <span className="text-xl font-bold text-primary">
                        {result.topupStart}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">End</span>
                      <span className="text-xl font-bold text-primary">
                        {result.topupEnd}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="text-sm text-muted-foreground">
                        Duration
                      </span>
                      <span className="text-sm font-semibold">
                        {result.topupDuration}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Example Section */}
          <div className="mt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowExample(!showExample)}
              className="w-full justify-between text-muted-foreground hover:text-foreground"
            >
              <span className="flex items-center gap-2">
                <Info className="w-4 h-4" />
                Example
              </span>
              {showExample ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </Button>

            {showExample && (
              <Card className="mt-2 bg-muted/30">
                <CardContent className="pt-4 text-sm space-y-1">
                  <p>• Worked: 7h 30m</p>
                  <p>• Exit: 5:00 PM</p>
                  <p>• Travel: 30 min</p>
                  <p>• Target: 10 hours</p>
                  <p className="pt-2 font-semibold text-primary">
                    → Topup: 05:30 PM to 08:00 PM (2h 30m)
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
