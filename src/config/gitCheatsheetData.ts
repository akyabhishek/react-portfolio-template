export type GitCommand = {
  command: string;
  description: string;
  example?: string;
  danger?: boolean;
};

export type GitCategory = {
  category: string;
  commands: GitCommand[];
};

export const gitCheatsheet: GitCategory[] = [
  {
    category: "Setup & Configuration",
    commands: [
      {
        command: 'git config --global user.name "Your Name"',
        description: "Set your name for all repos on this machine.",
      },
      {
        command: 'git config --global user.email "you@example.com"',
        description: "Set your email for all repos on this machine.",
      },
      {
        command: "git config --list",
        description: "Show all your current Git configuration values.",
      },
      {
        command: "git init",
        description:
          "Initialize a new Git repository in the current directory. Creates a hidden .git folder to start tracking changes.",
      },
      {
        command: "git clone <url>",
        description:
          "Download a remote repository to your local machine, including all its history.",
        example: "git clone https://github.com/user/repo.git",
      },
    ],
  },
  {
    category: "Staging & Committing",
    commands: [
      {
        command: "git status",
        description:
          "Show which files are modified, staged, or untracked. Your go-to command to understand what's happening.",
      },
      {
        command: "git add <file>",
        description:
          "Stage a specific file so it's included in the next commit.",
        example: "git add index.html",
      },
      {
        command: "git add .",
        description:
          "Stage all changed and new files in the current directory and below.",
      },
      {
        command: "git add -A / git add --all",
        description:
          "Stage all changes in the entire repository — new, modified, and deleted files — regardless of the current directory. --all is the long-form alias of -A.",
      },
      {
        command: 'git commit -m "message"',
        description:
          "Save staged changes as a new snapshot with a short descriptive message.",
        example: 'git commit -m "fix: resolve login redirect bug"',
      },
      {
        command: 'git commit -am "message"',
        description:
          "Stage all tracked (modified/deleted) files and commit in one step — skips a separate git add. Does not include untracked new files.",
        example: 'git commit -am "fix: update button styles"',
      },
      {
        command: "git commit --amend",
        description:
          "Edit the last commit — change the message or add forgotten files. Don't use this after pushing.",
      },
      {
        command: "git diff",
        description:
          "Show unstaged changes (what you changed but haven't staged yet).",
      },
      {
        command: "git diff --staged",
        description: "Show changes that are staged and ready to be committed.",
      },
    ],
  },
  {
    category: "Branching",
    commands: [
      {
        command: "git branch",
        description:
          "List all local branches. The current branch is marked with *.",
      },
      {
        command: "git branch <name>",
        description: "Create a new branch (but don't switch to it).",
        example: "git branch feat/navbar",
      },
      {
        command: "git checkout <branch>",
        description: "Switch to an existing branch.",
        example: "git checkout main",
      },
      {
        command: "git checkout -b <branch>",
        description:
          "Create a new branch and switch to it immediately. Most common way to start a feature.",
        example: "git checkout -b feat/login-page",
      },
      {
        command: "git switch <branch>",
        description:
          "Modern alternative to checkout for switching branches (Git 2.23+).",
      },
      {
        command: "git switch -c <branch>",
        description: "Create and switch to a new branch (modern syntax).",
      },
      {
        command: "git branch -d <branch>",
        description:
          "Delete a branch that has already been merged. Use -D to force-delete an unmerged branch.",
        example: "git branch -d feat/navbar",
      },
      {
        command: "git branch -a",
        description: "List all branches — both local and remote-tracking ones.",
      },
    ],
  },
  {
    category: "Merging & Rebasing",
    commands: [
      {
        command: "git merge <branch>",
        description:
          "Merge the specified branch into your current branch. Creates a merge commit if there are diverged changes.",
        example: "git merge feat/login-page",
      },
      {
        command: "git rebase <branch>",
        description:
          "Reapply your current branch's commits on top of another branch. Makes history linear and clean. Avoid on shared branches.",
        example: "git rebase main",
      },
      {
        command: "git merge --abort",
        description:
          "Cancel a merge that has conflicts. Returns everything to the state before the merge started.",
      },
      {
        command: "git rebase --abort",
        description:
          "Cancel an in-progress rebase and go back to where you were.",
      },
    ],
  },
  {
    category: "Remote Repositories",
    commands: [
      {
        command: "git remote -v",
        description:
          "Show the URLs of the remote repositories linked to this repo.",
      },
      {
        command: "git remote add origin <url>",
        description:
          "Link a remote repository (commonly called 'origin') to your local repo.",
        example: "git remote add origin https://github.com/user/repo.git",
      },
      {
        command: "git push origin <branch>",
        description: "Upload your local commits to the remote branch.",
        example: "git push origin main",
      },
      {
        command: "git push -u origin <branch>",
        description:
          "Push and set the upstream so future pushes/pulls just need 'git push'.",
        example: "git push -u origin feat/login-page",
      },
      {
        command: "git pull",
        description:
          "Fetch changes from the remote and merge them into your current branch. Shortcut for fetch + merge.",
      },
      {
        command: "git fetch",
        description:
          "Download remote changes without merging. Lets you inspect before applying.",
      },
      {
        command: "git push --force-with-lease",
        description:
          "Force-push safely — only overwrites if no one else has pushed since you last fetched. Safer than --force.",
      },
    ],
  },
  {
    category: "Undoing Changes",
    commands: [
      {
        command: "git restore <file>",
        description:
          "Discard unstaged changes in a file — reverts it to the last committed state.",
        example: "git restore index.html",
      },
      {
        command: "git restore --staged <file>",
        description:
          "Unstage a file (remove from staging area) without losing the changes.",
      },
      {
        command: "git reset --soft HEAD~1",
        description:
          "Undo the last commit but keep all changes staged (in the index). The safest reset — nothing is lost.",
        example: "git reset --soft HEAD~1",
      },
      {
        command: "git reset --mixed HEAD~1",
        description:
          "Undo the last commit and unstage the changes, but keep them in your working directory. This is the default when no flag is specified.",
        example: "git reset HEAD~1",
      },
      {
        command: "git reset --hard HEAD~1",
        description:
          "Undo the last commit and permanently discard all its changes from both the index and working directory. Destructive — cannot be recovered easily.",
        example: "git reset --hard HEAD~1",
        danger: true,
      },
      {
        command: "git revert <commit>",
        description:
          "Create a new commit that undoes the changes of a specific commit. Safe for shared branches because it doesn't rewrite history.",
        example: "git revert a1b2c3d",
      },
    ],
  },
  {
    category: "Stashing",
    commands: [
      {
        command: "git stash",
        description:
          "Temporarily shelve your uncommitted changes so you can switch branches or pull safely.",
      },
      {
        command: "git stash pop",
        description:
          "Reapply the most recent stash and remove it from the stash list.",
      },
      {
        command: "git stash list",
        description: "Show all saved stashes.",
      },
      {
        command: "git stash apply",
        description:
          "Reapply the most recent stash but keep it in the stash list.",
      },
      {
        command: "git stash drop",
        description: "Delete the most recent stash.",
      },
    ],
  },
  {
    category: "Inspecting History",
    commands: [
      {
        command: "git log",
        description: "Show the full commit history for the current branch.",
      },
      {
        command: "git log --oneline",
        description:
          "Show a compact one-line-per-commit history. Great for a quick overview.",
      },
      {
        command: "git log --graph --oneline --all",
        description:
          "Visualize the commit history as a text-based graph across all branches.",
      },
      {
        command: "git show <commit>",
        description: "Show the details and diff of a specific commit.",
        example: "git show a1b2c3d",
      },
      {
        command: "git blame <file>",
        description:
          "Show who last modified each line of a file and when. Useful for tracking down when a change was introduced.",
        example: "git blame src/App.tsx",
      },
      {
        command: "git reflog",
        description:
          "Show a log of all recent HEAD movements (commits, resets, checkouts). Lifesaver for recovering lost commits.",
      },
    ],
  },
  {
    category: "Tags",
    commands: [
      {
        command: "git tag <name>",
        description:
          "Create a lightweight tag pointing to the current commit. Commonly used for releases.",
        example: "git tag v1.0.0",
      },
      {
        command: 'git tag -a <name> -m "message"',
        description:
          "Create an annotated tag with a message — preferred for release versions.",
        example: 'git tag -a v1.0.0 -m "First stable release"',
      },
      {
        command: "git push origin --tags",
        description: "Push all local tags to the remote repository.",
      },
    ],
  },
  {
    category: "Cherry-pick & Clean",
    commands: [
      {
        command: "git cherry-pick <commit>",
        description:
          "Apply a specific commit from another branch onto your current branch. Useful when you need only one fix, not a full merge.",
        example: "git cherry-pick a1b2c3d",
      },
      {
        command: "git clean -fd",
        description:
          "Remove all untracked files and directories. Useful to get a clean working directory. Destructive — double-check first.",
        danger: true,
      },
      {
        command: "git clean -n",
        description:
          "Dry run — shows what untracked files would be removed without actually deleting anything.",
      },
    ],
  },
  {
    category: "Help & Documentation",
    commands: [
      {
        command: "git help <command>",
        description:
          "Open the full manual page for a specific git command in your browser or terminal.",
        example: "git help commit",
      },
      {
        command: "git <command> --help",
        description:
          "Alternative syntax to open the manual page for a command. Same as git help <command>.",
        example: "git commit --help",
      },
      {
        command: "git <command> -h",
        description:
          "Show a short usage summary for a command directly in the terminal — quicker than --help.",
        example: "git commit -h",
      },
      {
        command: "git help -a",
        description: "List all available git commands.",
      },
      {
        command: "git help -g",
        description:
          "List available git concept guides such as workflows, glossary, and everyday usage.",
      },
    ],
  },
];
