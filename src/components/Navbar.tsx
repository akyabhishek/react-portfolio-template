import {
  MobileNav,
  MobileNavHeader,
  MobileNavToggle,
  Navbar as NavbarWrapper,
  NavbarButton,
  NavbarLogo,
  NavBody,
  NavItems,
} from "@/components/ui/resizable-navbar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useEffect, useState, useRef } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { ThemeToggle } from "./ui/theme-toggle";
import { motion, AnimatePresence } from "motion/react";
import { FiTerminal, FiGitBranch, FiExternalLink } from "react-icons/fi";
import { VscTools } from "react-icons/vsc";
import { MdOutlineQuiz } from "react-icons/md";
import { TbMap2 } from "react-icons/tb";
import InteractiveTerminal, {
  type InteractiveTerminalHandle,
} from "./InteractiveTerminal";

// Define the type for navigation items
interface NavItem {
  name: string;
  link: string;
  dropdown?: {
    name: string;
    link: string;
    icon?: React.ReactNode;
  }[];
}

export function Navbar() {
  const terminalRef = useRef<InteractiveTerminalHandle>(null);
  const location = useLocation();

  // State to track which mobile dropdown is open
  const [openMobileDropdown, setOpenMobileDropdown] = useState<number | null>(
    null,
  );

  const navItems: NavItem[] = [
    {
      name: "Experience",
      link: "/#experience",
    },
    {
      name: "Skills",
      link: "/#skills",
    },
    {
      name: "Projects",
      link: "/projects",
    },

    {
      name: "Contact",
      link: "/#contact",
    },
    {
      name: "CV",
      link: "/cv",
    },
    {
      name: "More About Me",
      link: "/about",
    },
    {
      name: "Resources",
      link: "/resources",
      dropdown: [
        {
          name: "DevTools",
          link: "/devtools",
          icon: <VscTools size={14} />,
        },
        {
          name: "BS Visualizer",
          link: "https://binary-search-visualizer-mauve.vercel.app/",
          icon: <FiExternalLink size={14} />,
        },
        {
          name: "Java Interview Questions and Answers",
          link: "/java-interview-question-answers",
          icon: <MdOutlineQuiz size={14} />,
        },
        {
          name: "Roadmap",
          link: "/roadmap-for-product-based-company",
          icon: <TbMap2 size={14} />,
        },
        {
          name: "Git Cheatsheet",
          link: "/git-cheatsheet",
          icon: <FiGitBranch size={14} />,
        },
        {
          name: "System Design",
          link: "/system-design",
          icon: <MdOutlineQuiz size={14} />,
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
        }, 100);
      }
    }
  }, [location.pathname, location.hash]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <NavbarWrapper>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4 relative z-30">
            <button
              onClick={() => terminalRef.current?.openFullscreen()}
              className="text-neutral-500 dark:text-neutral-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors cursor-pointer"
              title="Open Terminal"
            >
              <FiTerminal size={18} />
            </button>
            <ThemeToggle />
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
        </MobileNav>
      </NavbarWrapper>

      <Sheet
        open={isMobileMenuOpen}
        onOpenChange={(open) => {
          setIsMobileMenuOpen(open);
          if (!open) setOpenMobileDropdown(null);
        }}
      >
        <SheetContent side="right" className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>
          <nav className="flex flex-col gap-1 px-2">
            {navItems.map((item, idx) => (
              <div key={`mobile-link-${idx}`}>
                {item.dropdown ? (
                  <div>
                    <div className="flex items-center justify-between py-2">
                      <Link
                        to={item.link}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-neutral-600 dark:text-neutral-300 font-medium hover:text-emerald-500 dark:hover:text-emerald-400"
                      >
                        {item.name}
                      </Link>
                      <button
                        type="button"
                        onClick={() =>
                          setOpenMobileDropdown(
                            openMobileDropdown === idx ? null : idx,
                          )
                        }
                        className="p-1"
                        aria-label={`Toggle ${item.name} menu`}
                      >
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
                      </button>
                    </div>
                    <AnimatePresence>
                      {openMobileDropdown === idx && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="pl-4 border-l border-emerald-300 dark:border-emerald-700 space-y-1 overflow-hidden"
                        >
                          {item.dropdown.map((dropdownItem, dropIdx) =>
                            /^https?:\/\//.test(dropdownItem.link) ? (
                              <a
                                key={`mobile-dropdown-${idx}-${dropIdx}`}
                                href={dropdownItem.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300 text-sm hover:text-emerald-500 dark:hover:text-emerald-400 py-1.5"
                              >
                                {dropdownItem.icon && (
                                  <span className="text-emerald-500 dark:text-emerald-400">
                                    {dropdownItem.icon}
                                  </span>
                                )}
                                {dropdownItem.name}
                                <FiExternalLink className="h-3 w-3 opacity-50" />
                              </a>
                            ) : (
                              <Link
                                key={`mobile-dropdown-${idx}-${dropIdx}`}
                                to={dropdownItem.link}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300 text-sm hover:text-emerald-500 dark:hover:text-emerald-400 py-1.5"
                              >
                                {dropdownItem.icon && (
                                  <span className="text-emerald-500 dark:text-emerald-400">
                                    {dropdownItem.icon}
                                  </span>
                                )}
                                {dropdownItem.name}
                              </Link>
                            ),
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    to={item.link}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-neutral-600 dark:text-neutral-300 py-2 hover:text-emerald-500 dark:hover:text-emerald-400"
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>
          <div className="mt-6 px-2 flex items-center gap-4">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                terminalRef.current?.openFullscreen();
              }}
              className="text-neutral-500 dark:text-neutral-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors"
              title="Open Terminal"
            >
              <FiTerminal size={18} />
            </button>
            <ThemeToggle />
          </div>
        </SheetContent>
      </Sheet>
      <div className="min-h-screen pt-4 ">
        <Outlet />
      </div>
      {/* Hidden terminal - only renders the fullscreen overlay */}
      <InteractiveTerminal ref={terminalRef} hideInline />
    </div>
  );
}
