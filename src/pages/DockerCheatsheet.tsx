import { CommandCheatsheet } from "@/components/CommandCheatsheet";
import { dockerCheatsheet } from "@/config/dockerCheatsheetData";

export default function DockerCheatsheet() {
  return (
    <CommandCheatsheet
      categories={dockerCheatsheet}
      title="Docker Cheatsheet – Essential Docker CLI Commands"
      description="A quick reference for essential Docker CLI commands to manage images, containers, and Docker Hub."
      keywords="docker cheatsheet, docker commands, docker CLI, docker images, docker containers"
      searchPlaceholder="Search Docker commands… (e.g., build, run, logs)"
      storageKey="docker-cheatsheet-compact-view"
    />
  );
}
