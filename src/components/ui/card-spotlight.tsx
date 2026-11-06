"use client";

import {motion, useMotionTemplate, useMotionValue} from "framer-motion";
import React, {
  lazy,
  MouseEvent as ReactMouseEvent,
  Suspense,
  useState,
} from "react";
import {cn} from "@/lib/utils";

const CanvasRevealEffect = lazy(() =>
  import("@/components/ui/canvas-reveal-effect").then((module) => ({
    default: module.CanvasRevealEffect,
  })),
);

export const CardSpotlight = ({
  children,
  radius = 350,
  className,
  ...props
}: {
  radius?: number;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: ReactMouseEvent<HTMLDivElement>) {
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const [isHovering, setIsHovering] = useState(false);
  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);
  return (
    <div
      className={cn(
        "group/spotlight p-10 rounded-md relative border border-neutral-200 bg-black-900 dark:border-neutral-800",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <motion.div
        className="pointer-events-none absolute bg-white dark:bg-neutral-900 z-0 -inset-px rounded-md opacity-0 transition duration-300 group-hover/spotlight:opacity-100"
        style={{
          maskImage: useMotionTemplate`
            radial-gradient(
              ${radius}px circle at ${mouseX}px ${mouseY}px,
              white,
              transparent 80%
            )
          `,
        }}
      >
        {isHovering && (
          <Suspense fallback={null}>
            <CanvasRevealEffect
              animationSpeed={5}
              containerClassName="bg-transparent absolute inset-0 pointer-events-none"
              colors={[
                [34, 197, 94],
                [5, 150, 105],
              ]}
              dotSize={3}
            />
          </Suspense>
        )}
      </motion.div>
      {children}
    </div>
  );
};
