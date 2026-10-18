import { useLayoutEffect, useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface ScrollStackProps {
  children: ReactNode;
}

export function ScrollStack({ children }: ScrollStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container || prefersReducedMotion) return;

    const items = Array.from(
      container.querySelectorAll<HTMLElement>("[data-stack-item]"),
    );
    const surfaces = items.map((item) =>
      item.querySelector<HTMLElement>("[data-stack-surface]"),
    );
    let frame = 0;

    const update = () => {
      frame = 0;
      const stackTop = 96;
      const stackOffset = 24;
      const cardHeight = Math.max(0, ...items.map((item) => item.offsetHeight));
      // Keep the shared sticky boundary beyond the completed stack.
      container.style.paddingBottom = `${cardHeight + items.length * stackOffset}px`;

      const containerTop = container.getBoundingClientRect().top;
      let naturalTop = containerTop;
      const tops = items.map((item) => {
        const top = naturalTop;
        naturalTop += item.offsetHeight + 100;
        return top;
      });

      items.forEach((item, index) => {
        const surface = surfaces[index];
        if (!surface) return;

        const pinTop = stackTop + index * stackOffset;
        item.style.top = `${pinTop}px`;

        const nextTop = tops[index + 1];
        const progress =
          nextTop === undefined
            ? 0
            : Math.max(
                0,
                Math.min(
                  1,
                  (pinTop + item.offsetHeight - nextTop) /
                    Math.max(1, item.offsetHeight - 24),
                ),
              );
        surface.style.transform = `scale(${1 - progress * 0.05})`;
      });
    };

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(container);
    items.forEach((item, index) => {
      observer.observe(item);
      const card = surfaces[index]?.firstElementChild;
      if (card) observer.observe(card);
    });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();

    return () => {
      window.cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      container.style.removeProperty("padding-bottom");
      items.forEach((item, index) => {
        item.style.removeProperty("top");
        surfaces[index]?.style.removeProperty("transform");
      });
    };
  }, [children, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={
        prefersReducedMotion
          ? "grid auto-rows-fr gap-4"
          : "relative isolate grid auto-rows-fr gap-[100px] [&>[data-stack-item]]:sticky"
      }
    >
      {children}
    </div>
  );
}

export function ScrollStackItem({ children }: ScrollStackProps) {
  return (
    <div data-stack-item className="relative h-full has-[:focus-visible]:z-50">
      <div data-stack-surface className="h-full origin-top rounded-xl bg-background [&>*]:h-full">
        {children}
      </div>
    </div>
  );
}
