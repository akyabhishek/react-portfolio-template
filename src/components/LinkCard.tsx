import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

interface Link {
  title: string;
  url: string;
  icon?: React.ReactNode;
}

const LinkCard: React.FC<Link> = (ele) => {
  return (
    <Link to={ele.url} target="_blank" rel="noopener noreferrer">
      <Button variant="outline">
        {/* Icon */}
        {ele.icon && (
          <span >
            {ele.icon}

          </span>
        )}
      </Button>
    </Link>
  );
};

export default LinkCard;
