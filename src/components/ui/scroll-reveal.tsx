import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: string;
  className?: string;
}

export function ScrollReveal({ children, className }: ScrollRevealProps) {
  const textRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const element = textRef.current;
    if (!element || prefersReducedMotion) return;

    const words = Array.from(
      element.querySelectorAll<HTMLElement>("[data-reveal-word]"),
    );
    const state = { progress: 0 };
    const duration = 0.5;
    const stagger = 0.05;
    const totalDuration = duration + Math.max(0, words.length - 1) * stagger;
    const render = () => {
      const time = state.progress * totalDuration;
      words.forEach((word, index) => {
        const progress = Math.max(
          0,
          Math.min(1, (time - index * stagger) / duration),
        );
        word.style.opacity = String(0.1 + progress * 0.9);
        word.style.filter = progress === 1 ? "" : `blur(${4 * (1 - progress)}px)`;
      });
    };

    const context = gsap.context(() => {
      gsap.fromTo(
        element,
        { rotation: 3, transformOrigin: "0% 50%" },
        {
          rotation: 0,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "clamp(bottom bottom)",
            scrub: true,
          },
        },
      );

      render();
      gsap.to(state, {
        progress: 1,
        ease: "none",
        onUpdate: render,
        scrollTrigger: {
          trigger: element,
          start: () =>
            `top bottom-=${0.2 * Math.min(element.offsetHeight, window.innerHeight)}`,
          end: "clamp(bottom bottom)",
          scrub: true,
        },
      });
    }, element);

    return () => {
      context.revert();
      words.forEach((word) => {
        word.style.removeProperty("opacity");
        word.style.removeProperty("filter");
      });
    };
  }, [children, prefersReducedMotion]);

  return (
    <span
      ref={textRef}
      className={cn(
        "block min-w-0 flex-1 font-sans text-[clamp(1.125rem,2.5vw,1.75rem)] font-normal leading-[1.5]",
        className,
      )}
    >
      {children.split(/(\s+)/).map((part, index) =>
        part.trim() ? (
          <span key={index} data-reveal-word className="inline-block">
            {part}
          </span>
        ) : (
          part
        ),
      )}
    </span>
  );
}
