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
    <Link to={ele.url} target="_blank" rel="noopener noreferrer">
      <Card className="w-full sm:w-auto p-4 mb-2 shadow-lg rounded-lg items-center cursor-pointer">
        <CardContent className="flex items-center p-0 w-full sm:w-auto">
          {/* Icon */}
          {ele.icon && (
            <span className="mr-3 0">
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
