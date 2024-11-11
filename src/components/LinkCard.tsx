import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // import from shadcn components
import { LucideIcon } from "lucide-react"; // This type can be used for icon prop
import { Link } from "react-router-dom";

// Define the Link type with optional icon property
interface Link {
  title: string;
  url: string;
  icon?: LucideIcon; // lucide-react icon type
}

const LinkCard: React.FC<Link> = (ele) => {
  return (
    <Card className="w-full p-4 bg-white border border-neutral-200 dark:bg-neutral-900 dark:border-neutral-700 shadow-lg rounded-lg">
      {/* Card Title */}
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-semibold text-neutral-800 dark:text-neutral-100">
          {ele.title}
        </CardTitle>
      </CardHeader>

      {/* Links */}
      <CardContent className="flex flex-col space-y-3">
        <Link to={ele.url} target="_blank" rel="noopener noreferrer">
          {/* Icon */}
          {ele.icon && (
            <span className="mr-3 text-neutral-600 dark:text-neutral-300">
              {React.createElement(ele.icon, { size: 24 })}{" "}
              {/* Icon Component */}
            </span>
          )}
        </Link>
      </CardContent>
    </Card>
  );
};

export default LinkCard;
