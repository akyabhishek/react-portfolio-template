import React, { useState, useRef } from "react";
import { GlowingEffect } from "./ui/glowing-effect";

interface FloatingImageProps {
  mainImage: string;
  altImage?: string;
}

const FloatingImage: React.FC<FloatingImageProps> = ({
  mainImage,
  altImage,
}) => {
  const [showAlt, setShowAlt] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  const currentSrc = showAlt && altImage ? altImage : mainImage;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    setMousePosition({
      x: ((e.clientX - centerX) / rect.width) * 20,
      y: ((e.clientY - centerY) / rect.height) * 20,
    });
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  const handleClick = () => {
    if (altImage) setShowAlt((prev) => !prev);
  };

  return (
    <div
      ref={imageRef}
      className="relative rounded-2xl md:rounded-3xl duration-700 h-auto w-auto transition-all shadow-2xl hover:shadow-3xl group perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      role={altImage ? "button" : undefined}
      tabIndex={altImage ? 0 : undefined}
      onKeyDown={(e) => {
        if (altImage && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          handleClick();
        }
      }}
      style={{
        transform: `
          rotateX(${-mousePosition.y * 0.5}deg) 
          rotateY(${mousePosition.x * 0.5}deg)
          scale(${mousePosition.x !== 0 || mousePosition.y !== 0 ? 1.05 : 1})
        `,
        transformStyle: "preserve-3d",
        transition: "transform 0.3s ease-out",
        cursor: altImage ? "pointer" : undefined,
      }}
    >
      <div className="relative h-full rounded-2xl border-3 md:rounded-3xl overflow-hidden">
        <GlowingEffect
          borderWidth={3}
          spread={50}
          glow={true}
          disabled={false}
          proximity={150}
          inactiveZone={0.01}
        />

        <img
          src={currentSrc}
          alt="Abhishek Kumar Yadav - Software Developer"
          width={384}
          height={384}
          loading="eager"
          className="relative z-10 w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-cover rounded-2xl md:rounded-3xl transition-all duration-500 group-hover:brightness-110 group-hover:contrast-105"
          style={{
            transform: `
              translateZ(50px)
              rotateX(${mousePosition.y * 0.1}deg) 
              rotateY(${-mousePosition.x * 0.1}deg)
            `,
          }}
        />
      </div>
    </div>
  );
};

export default FloatingImage;
