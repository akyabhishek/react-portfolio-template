import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

interface Link {
  title: string;
  url: string;
  icon?: React.ReactNode;
}

const LinkCard: React.FC<Link> = (ele) => {
  return (
    <a
      href={ele.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ele.title}
      title={ele.title}
    >
      <Button variant="outline" className="rounded-2xl " asChild>
        <div>
          {/* Icon and accessible text for SEO */}
          {ele.icon && <span aria-hidden="true">{ele.icon}</span>}
          <span className="sr-only">{ele.title}</span>
        </div>
      </Button>
    </a>
  );
};

export default LinkCard;
