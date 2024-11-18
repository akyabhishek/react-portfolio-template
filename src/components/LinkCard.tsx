import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // import from shadcn components
import { LucideIcon } from "lucide-react"; // This type can be used for icon prop
import { Link } from "react-router-dom";

interface Link {
  title: string;
  url: string;
  icon?: LucideIcon;
}

const LinkCard: React.FC<Link> = (ele) => {
  return (
    <Link
      to={ele.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full"
    >
      <Card className="w-full p-4 mb-4 dark:bg-neutral-900 dark:border-neutral-700 shadow-lg rounded-lg flex items-center cursor-pointer">
        <CardContent className="flex items-center p-0 w-full">
          {/* Icon */}
          {ele.icon && (
            <span className="mr-3 text-neutral-600 dark:text-neutral-300">
              {React.createElement(ele.icon, { size: 24 })}
            </span>
          )}
          {/* Title */}
          <span className="text-neutral-800 dark:text-neutral-100 w-full text-center">
            {ele.title}
          </span>
        </CardContent>
      </Card>
    </Link>
  );
};

export default LinkCard;
