import { Link } from "react-router-dom";

interface HiddenLink {
  name: string;
  link: string;
  description: string;
}

const hiddenLinks: HiddenLink[] = [
  {
    name: "Terminal",
    link: "/t",
    description: "Interactive terminal portfolio",
  },
  {
    name: "Landing Chooser",
    link: "/landing",
    description: "Pick a landing experience",
  },
  {
    name: "Links",
    link: "/links",
    description: "All my social & profile links",
  },
  { name: "Clock", link: "/clock", description: "Fullscreen digital clock" },
  { name: "Books", link: "/books", description: "Books I have read" },
  { name: "Topup", link: "/topup", description: "Buy me a coffee" },
];

export default function HiddenPages(): JSX.Element {
  return (
    <div className="min-h-screen container mx-auto max-w-3xl px-4 pt-28 pb-16">
      <h1 className="text-3xl font-bold">Hidden Pages</h1>
      <p className="mt-2 text-muted-foreground">
        Pages that are not linked in the navbar.
      </p>

      <ul className="mt-8 grid gap-3 sm:grid-cols-2">
        {hiddenLinks.map((item) => (
          <li key={item.link}>
            <Link
              to={item.link}
              className="block rounded-lg border p-4 transition-colors hover:bg-accent"
            >
              <span className="font-medium">{item.name}</span>
              <span className="ml-2 text-xs text-muted-foreground">
                {item.link}
              </span>
              <p className="mt-1 text-sm text-muted-foreground">
                {item.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
