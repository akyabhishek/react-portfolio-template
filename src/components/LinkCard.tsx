import React from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface LinkCardProps {
  title: string;
  url: string;
  icon?: React.ReactNode;
  colorClass?: string;
}

const LinkCard: React.FC<LinkCardProps> = (ele) => {
  return (
    <a
      href={ele.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ele.title}
      title={ele.title}
    >
      <Button
        variant="outline"
        className={cn(
          "rounded-2xl transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]",
          ele.colorClass,
        )}
        asChild
      >
        <div>
          {ele.icon && <span aria-hidden="true">{ele.icon}</span>}
          <span className="sr-only">{ele.title}</span>
        </div>
      </Button>
    </a>
  );
};

export default LinkCard;
