import { CommandCheatsheet } from "@/components/CommandCheatsheet";
import { gitCheatsheet } from "@/config/gitCheatsheetData";

export default function GitCheatsheet() {
  return (
    <CommandCheatsheet
      categories={gitCheatsheet}
      title="Git Cheatsheet – Essential Git Commands for Developers"
      description="A concise Git cheatsheet with the most important commands for setup, branching, merging, undoing changes, stashing, and more. Quick reference for everyday Git usage."
      keywords="git cheatsheet, git commands, git tutorial, git reference, branching, merging, rebase, stash, git for beginners"
      searchPlaceholder="Search commands… (e.g., stash, rebase, push)"
      storageKey="git-cheatsheet-compact-view"
    />
  );
}
