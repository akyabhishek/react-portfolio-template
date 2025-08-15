import { SiGithub, SiGoogleplay } from "react-icons/si";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { GoLinkExternal } from "react-icons/go";
import { CardContainer } from "./ui/3d-card";

interface ProjectCardProps {
  title: string;
  description: string;
  techStack: string[];
  imageUrl: string;
  github?: string;
  liveUrl?: string;
  playstore?: string;
  live?: boolean;
  duration?: string;
}

export default function ProjectCard(props: ProjectCardProps) {
  const {
    title,
    description,
    techStack,
    imageUrl,
    live,
    github,
    liveUrl,
    playstore,
    duration,
  } = props;
  const cardContent = (
    <CardContainer className="inter-var">
      <Card className="max-w-sm w-full shadow-md hover:shadow-lg transition-shadow duration-300  relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:border-white/[0.2] border-black/[0.1]">
        <CardHeader>
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-auto object-cover rounded-2xl mb-4"
          />
          <br />
          <div className="text-xs text-muted-foreground">{duration}</div>
          <CardTitle className="flex items-center gap-2">
            {title}
            {live && (
              <span className="inline-block h-2 w-2 rounded-2xl bg-emerald-500 -translate-y-0.5"></span>
            )}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {techStack.map((tech, index) => (
              <Badge
                key={index}
                variant="outline"
                className="font-normal rounded-2xl"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          {github && (
            <Button variant="ghost" size="sm" asChild>
              <a href={github} target="_blank" rel="noopener noreferrer">
                <SiGithub />
                GitHub
              </a>
            </Button>
          )}
          {playstore && (
            <Button variant="ghost" size="sm" asChild>
              <a href={playstore} target="_blank" rel="noopener noreferrer">
                <SiGoogleplay />
                App
              </a>
            </Button>
          )}
          {liveUrl && (
            <Button
              variant="ghost"
              size="sm"
              className="text-emerald-500"
              asChild
            >
              <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                <GoLinkExternal />
              </a>
            </Button>
          )}
        </CardFooter>
      </Card>
    </CardContainer>
  );

  return liveUrl ? (
    <a href={liveUrl} target="_blank" rel="noopener noreferrer">
      {cardContent}
    </a>
  ) : (
    cardContent
  );
}
