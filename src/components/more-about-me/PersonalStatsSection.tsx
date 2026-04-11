import { useEffect, useState } from "react";
import { calculateAge } from "@/utils/utils";
import { motion } from "framer-motion";
import { Timer, MapPin, Globe, Flag, MessageCircle } from "lucide-react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      type: "spring" as const,
      stiffness: 240,
      damping: 22,
    },
  },
};

const stats = [
  {
    icon: MapPin,
    label: "Current City",
    value: "Noida, Uttar Pradesh",
  },
  {
    icon: Globe,
    label: "Countries Visited",
    value: "02",
  },
  {
    icon: Flag,
    label: "Nationality",
    value: "Indian",
  },
];

export default function PersonalStatsSection() {
  const dob = new Date("1999-07-02T00:00:00");
  const [age, setAge] = useState(calculateAge(dob));

  useEffect(() => {
    const interval = setInterval(() => {
      setAge(calculateAge(dob));
    }, 1);
    return () => clearInterval(interval);
  }, [dob]);

  return (
    <motion.div
      className="mt-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.15 }}
      variants={containerVariants}
    >
      <motion.h2
        className="text-lg mb-4 font-bold uppercase tracking-widest"
        variants={itemVariants}
      >
        Some Stats About Me
      </motion.h2>

      <div className="grid grid-cols-1 gap-px bg-border rounded-2xl overflow-hidden border border-border">
        {/* Age — full-width live ticker */}
        <motion.div
          className="group relative bg-background hover:bg-muted/30 transition-colors duration-300 p-5 flex items-start gap-4 overflow-hidden"
          variants={itemVariants}
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-[radial-gradient(ellipse_at_20%_50%,hsl(var(--primary)/0.08)_0%,transparent_65%)]" />
          <div className="relative mt-0.5 p-2 rounded-xl bg-muted group-hover:bg-primary/10 text-muted-foreground group-hover:text-primary transition-colors duration-300">
            <Timer className="w-4 h-4" />
          </div>
          <div className="relative flex flex-col gap-1 min-w-0">
            <span className="text-[11px] text-muted-foreground uppercase tracking-widest font-medium">
              Current Age
            </span>
            <p className="text-lg font-semibold leading-snug tabular-nums">
              {age.years}y &nbsp;{age.days}d &nbsp;{age.hours}h &nbsp;
              {age.minutes}m &nbsp;{age.seconds}s{" "}
              <span className="text-muted-foreground font-normal">
                {age.milliseconds}ms
              </span>
            </p>
          </div>
        </motion.div>

        {/* Languages spoken — full-width */}
        <motion.div
          className="group relative bg-background hover:bg-muted/30 transition-colors duration-300 p-5 flex items-start gap-4 cursor-default overflow-hidden"
          variants={itemVariants}
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-[radial-gradient(ellipse_at_20%_50%,hsl(var(--primary)/0.08)_0%,transparent_65%)]" />
          <div className="relative mt-0.5 p-2 rounded-xl bg-muted group-hover:bg-primary/10 text-muted-foreground group-hover:text-primary transition-colors duration-300">
            <MessageCircle className="w-4 h-4" />
          </div>
          <div className="relative flex flex-col gap-2.5 flex-1">
            <span className="text-[11px] text-muted-foreground uppercase tracking-widest font-medium">
              Languages Spoken
            </span>
            <div className="flex items-center gap-4 flex-wrap">
              {[
                { name: "Hindi", level: "Native" },
                { name: "English", level: "Fluent" },
                { name: "Awadhi", level: "Native" },
                { name: "Urdu", level: "Basic" },
              ].map(({ name, level }, i, arr) => (
                <div key={name} className="flex items-baseline gap-1.5">
                  <span className="text-sm font-semibold">{name}</span>
                  <span className="text-[11px] text-muted-foreground">
                    {level}
                  </span>
                  {i < arr.length - 1 && (
                    <span className="ml-2 text-border select-none">·</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Other stats — 3-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border">
          {stats.map(({ icon: Icon, label, value }) => (
            <motion.div
              key={label}
              className="group relative bg-background hover:bg-muted/30 transition-colors duration-300 p-5 flex items-start gap-4 cursor-default overflow-hidden"
              variants={itemVariants}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-[radial-gradient(ellipse_at_20%_50%,hsl(var(--primary)/0.08)_0%,transparent_65%)]" />
              <div className="relative mt-0.5 p-2 rounded-xl bg-muted group-hover:bg-primary/10 text-muted-foreground group-hover:text-primary transition-colors duration-300">
                <Icon className="w-4 h-4" />
              </div>
              <div className="relative flex flex-col gap-1">
                <span className="text-[11px] text-muted-foreground uppercase tracking-widest font-medium">
                  {label}
                </span>
                <p className="text-sm font-semibold leading-snug">{value}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
