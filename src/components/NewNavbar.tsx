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
import { motion, AnimatePresence } from "motion/react";

// Define the type for navigation items
interface NavItem {
  name: string;
  link: string;
  dropdown?: {
    name: string;
    link: string;
  }[];
}

export function NewNavbar() {
  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";

  const toggleTheme = (checked: boolean) => {
    setTheme(checked ? "dark" : "light");
  };

  // State to track which mobile dropdown is open
  const [openMobileDropdown, setOpenMobileDropdown] = useState<number | null>(
    null
  );

  const navItems: NavItem[] = [
    {
      name: "About",
      link: "/#about",
    },
    {
      name: "Skills",
      link: "/#skills",
    },
    {
      name: "Projects",
      link: "/#projects",
    },

    {
      name: "Stats",
      link: "/stats",
    },
    {
      name: "Contact",
      link: "/#contact",
    },
    {
      name: "Resources",
      link: "#",
      dropdown: [
        {
          name: "DevTools",
          link: "/devtools",
        },
        {
          name: "BS Visualizer",
          link: "https://binary-search-visualizer-mauve.vercel.app/",
        },
      ],
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
            <NavbarButton variant="secondary" className="space-x-2">
              <Switch checked={isDark} onCheckedChange={toggleTheme} />
            </NavbarButton>
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
            onClose={() => {
              setIsMobileMenuOpen(false);
              setOpenMobileDropdown(null);
            }}
          >
            {navItems.map((item, idx) => (
              <div key={`mobile-link-${idx}`} className="w-full">
                {item.dropdown ? (
                  <div className="mb-2">
                    <div
                      className="relative text-neutral-600 dark:text-neutral-300 font-medium mb-1 flex items-center justify-between cursor-pointer py-2"
                      onClick={() =>
                        setOpenMobileDropdown(
                          openMobileDropdown === idx ? null : idx
                        )
                      }
                    >
                      <span>{item.name}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 transition-transform duration-300 ${
                          openMobileDropdown === idx ? "rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                    <AnimatePresence>
                      {openMobileDropdown === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="pl-4 border-l border-emerald-300 dark:border-emerald-700 space-y-2 mt-1 overflow-hidden"
                        >
                          {item.dropdown.map((dropdownItem, dropIdx) => (
                            <a
                              key={`mobile-dropdown-${idx}-${dropIdx}`}
                              href={dropdownItem.link}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block text-neutral-600 dark:text-neutral-300 text-sm hover:text-emerald-500 dark:hover:text-emerald-400 py-1"
                            >
                              {dropdownItem.name}
                            </a>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <a
                    href={item.link}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="relative text-neutral-600 dark:text-neutral-300 block mb-2 py-2"
                  >
                    <span className="block">{item.name}</span>
                  </a>
                )}
              </div>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="secondary"
                className="w-full"
              >
                <Switch
                  checked={isDark}
                  onCheckedChange={toggleTheme}
                  className="float-left"
                />
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
