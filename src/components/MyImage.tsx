import React from "react";
import {GlowingEffect} from "./ui/glowing-effect";

interface FloatingImageProps {
    mainImage: string;
}

const FloatingImage: React.FC<FloatingImageProps> = ({ mainImage }) => {


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
                src={mainImage}
                alt="Abhishek"
                className="w-96 h-96 object-cover rounded-2xl shadow-2xl md:rounded-3xl"
            />
        </div></div>
    );
};

export default FloatingImage;
