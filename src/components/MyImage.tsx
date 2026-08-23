import React from "react";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface FloatingImageProps {
  mainImage: string;
}

const FloatingImage: React.FC<FloatingImageProps> = ({ mainImage }) => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.img
      src={mainImage}
      alt="Abhishek Kumar Yadav - Software Developer"
      loading="eager"
      className="w-full max-w-xs h-auto sm:max-w-sm md:h-[85vh] md:max-w-none md:w-auto lg:h-[95vh] lg:w-auto object-contain object-bottom"
      initial={
        prefersReducedMotion
          ? { opacity: 1 }
          : { opacity: 0, x: 80, scale: 0.95, filter: "blur(12px)" }
      }
      whileInView={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
    />
  );
};

export default FloatingImage;
