import React, { useEffect, useState } from "react";
import {GlowingEffect} from "./ui/glowing-effect";

interface FloatingImageProps {
    mainImage: string;
    altImage?: string;
}

const FloatingImage: React.FC<FloatingImageProps> = ({ mainImage, altImage }) => {
    const [currentSrc, setCurrentSrc] = useState(mainImage);
    const [fade, setFade] = useState(false);
    const [showAlt, setShowAlt] = useState(false);

    useEffect(() => {
        if (altImage) {
            const interval = setInterval(() => {
                setFade(true);
                setTimeout(() => {
                    setShowAlt(prev => !prev);
                    setCurrentSrc(showAlt ? mainImage : altImage);
                    setFade(false);
                }, 500); // fade duration
            }, 10000); // 10 seconds
            return () => clearInterval(interval);
        }
    }, [mainImage, altImage, showAlt]);

    return (
        <div
  className="relative rounded-2xl -skew-x-6 md:rounded-3xl -translate-y-6 hover:-translate-y-1 hover:-translate-x-0 hover:skew-x-0 duration-500 h-auto w-auto card-compact hover:bg-base-200 transition-all shadow-2xl hover:shadow-none"
>
        <div className="relative h-full rounded-2xl border-3 md:rounded-3xl">
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
                loading="lazy"
                className={`w-96 h-96 object-cover rounded-2xl shadow-2xl md:rounded-3xl transition-all duration-500 ${fade ? 'blur-md grayscale' : 'blur-0 grayscale-0'}`}
            />
        </div></div>
    );
};

export default FloatingImage;
