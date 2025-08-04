import {
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  Navbar,
  NavbarButton,
  NavbarLogo,
  NavBody,
  NavItems,
} from "@/components/ui/resizable-navbar";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import ResumeButton from "./DownloadResumeBtn";
import { Switch } from "./ui/switch";
import { useTheme } from "./theme-provider";

export function NewNavbar() {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";

  const toggleTheme = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };
  const navItems = [
     {
      name: "DevTools",
      link: "/#devtools",
    },
    {
      name: "About",
      link: "/#about",
    },
    {
      name: "Skills",
      link: "/#skills"
    },
    {
      name: "Projects",
      link: "/#projects",
    },
    {
      name: "Stats",
      link: "/stats",
    }, {
      name: "Contact",
      link: "/#contact",
    },
  ];
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100); // small delay after route loads
      }
    }
  }, [location]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <NavbarButton variant="secondary" className="space-x-2"><Switch checked={isDark} onCheckedChange={toggleTheme} /></NavbarButton>
            <NavbarButton variant="secondary" className="p-0"><ResumeButton /></NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="secondary"
                className="w-full"
              >
                <Switch checked={isDark} onCheckedChange={toggleTheme} className="float-left"/></NavbarButton>
              <NavbarButton
                variant="secondary"
                className="w-full"
              >
                <ResumeButton />
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
      <div className="min-h-screen pt-4 ">
        <Outlet />
      </div>
    </div>
  );
}
