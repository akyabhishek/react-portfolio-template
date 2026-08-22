import { cn } from "@/lib/utils";
import { IconExternalLink, IconMenu2, IconX } from "@tabler/icons-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";

import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ScrollProgress } from "../magicui/scroll-progress";

const isExternal = (url: string) => /^https?:\/\//.test(url);

interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
    dropdown?: {
      name: string;
      link: string;
      icon?: React.ReactNode;
    }[];
  }[];
  className?: string;
  onItemClick?: () => void;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState<boolean>(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 100) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  });

  return (
    <motion.div
      ref={ref}
      // IMPORTANT: Change this to class of `fixed` if you want the navbar to be fixed
      className={cn("fixed inset-x-0 z-40 w-full ", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible },
            )
          : child,
      )}
    </motion.div>
  );
};

export const NavBody = ({ children, className, visible }: NavBodyProps) => {
  return (
    <div
      className={cn("relative z-[60] hidden w-full h-16 lg:flex", className)}
    >
      {/* Blur background as sibling so dropdown can have its own backdrop-filter */}
      <div className="absolute inset-0 backdrop-blur-lg bg-white/30 dark:bg-neutral-950/30 border-b border-white/20 dark:border-neutral-800/50 shadow-sm" />
      <ScrollProgress className="!absolute !top-auto bottom-0 h-px opacity-30 z-10" />
      <div className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6">
        {children}
      </div>
    </div>
  );
};

export const NavItems = ({ items, className, onItemClick }: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  return (
    <motion.div
      onMouseLeave={() => {
        setHovered(null);
        setOpenDropdown(null);
      }}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 lg:flex lg:space-x-2",
        className,
      )}
    >
      {items.map((item, idx) => (
        <div
          key={`link-${idx}`}
          className="relative"
          onMouseEnter={() => {
            setHovered(idx);
            if (item.dropdown) {
              setOpenDropdown(idx);
            } else {
              setOpenDropdown(null);
            }
          }}
        >
          {isExternal(item.link) ? (
            <a
              onClick={() => onItemClick?.()}
              className="relative px-4 py-2 text-neutral-600 dark:text-neutral-300 hover:text-emerald-500 dark:hover:text-emerald-500 transition-all duration-500 ease-in-out flex items-center"
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {hovered === idx && (
                <motion.div
                  layoutId="hovered"
                  className="absolute inset-0 h-full w-full rounded-full bg-neutral-500/10 dark:bg-neutral-400/10"
                />
              )}
              <span className="relative z-20">{item.name}</span>
              <IconExternalLink className="relative z-20 ml-1 h-3.5 w-3.5" />
            </a>
          ) : (
            <Link
              onClick={(e) => {
                const isPlaceholderLink = !item.link || item.link === "#";
                if (item.dropdown && isPlaceholderLink) {
                  e.preventDefault();
                } else if (onItemClick) {
                  onItemClick();
                }
              }}
              className="relative px-4 py-2 text-neutral-600 dark:text-neutral-300 hover:text-emerald-500 dark:hover:text-emerald-500 transition-all duration-500 ease-in-out flex items-center"
              to={item.link}
            >
              {hovered === idx && (
                <motion.div
                  layoutId="hovered"
                  className="absolute inset-0 h-full w-full rounded-full bg-neutral-500/10 dark:bg-neutral-400/10"
                />
              )}
              <span className="relative z-20">{item.name}</span>
              {item.dropdown && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1 relative z-20 transition-transform duration-300 ease-in-out"
                  style={{
                    transform:
                      openDropdown === idx ? "rotate(180deg)" : "rotate(0deg)",
                  }}
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
              )}
            </Link>
          )}

          {/* Dropdown Menu */}
          <AnimatePresence>
            {item.dropdown && openDropdown === idx && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 mt-1 w-48 rounded-md shadow-lg backdrop-blur-lg bg-white/30 dark:bg-neutral-950/30 ring-1 ring-white/20 dark:ring-white/10 z-30"
              >
                <div className="py-1">
                  {item.dropdown.map((dropdownItem, dropIdx) =>
                    isExternal(dropdownItem.link) ? (
                      <a
                        key={`dropdown-${idx}-${dropIdx}`}
                        href={dropdownItem.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={onItemClick}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-500/10 dark:hover:bg-neutral-400/10 hover:text-emerald-500 dark:hover:text-emerald-400"
                      >
                        {dropdownItem.icon && (
                          <span className="text-emerald-500 dark:text-emerald-400 shrink-0">
                            {dropdownItem.icon}
                          </span>
                        )}
                        {dropdownItem.name}
                        <IconExternalLink className="ml-auto h-3.5 w-3.5 opacity-50" />
                      </a>
                    ) : (
                      <Link
                        key={`dropdown-${idx}-${dropIdx}`}
                        to={dropdownItem.link}
                        onClick={onItemClick}
                        className="flex items-center gap-2.5 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 hover:bg-neutral-500/10 dark:hover:bg-neutral-400/10 hover:text-emerald-500 dark:hover:text-emerald-400"
                      >
                        {dropdownItem.icon && (
                          <span className="text-emerald-500 dark:text-emerald-400 shrink-0">
                            {dropdownItem.icon}
                          </span>
                        )}
                        {dropdownItem.name}
                      </Link>
                    ),
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({ children, className, visible }: MobileNavProps) => {
  return (
    <motion.div
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-full flex-col items-center justify-between px-4 h-14 lg:hidden backdrop-blur-lg bg-white/30 dark:bg-neutral-950/30 border-b border-white/20 dark:border-neutral-800/50 shadow-sm",
        className,
      )}
    >
      <ScrollProgress className="!absolute !top-auto bottom-0 h-px opacity-30" />
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
}: MobileNavMenuProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-white px-4 py-8 shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] dark:bg-neutral-950",
            className,
          )}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick: () => void;
}) => {
  return isOpen ? (
    <IconX className="text-black dark:text-white" onClick={onClick} />
  ) : (
    <IconMenu2 className="text-black dark:text-white" onClick={onClick} />
  );
};

export const NavbarLogo = () => {
  return (
    <Link
      to="/"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal text-black"
    >
      <h2 className="text-xl text-gray-900 dark:text-white tracking-tight">
        Abhishek
      </h2>
      <h2 className="text-xl tracking-tight text-gray-900 dark:text-white hidden md:block">
        Kr. Yadav
      </h2>
    </Link>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  ...props
}: {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
} & (
  | React.ComponentPropsWithoutRef<"a">
  | React.ComponentPropsWithoutRef<"button">
)) => {
  const baseStyles =
    "px-4 py-2 rounded-md bg-white button bg-white text-black text-sm font-bold relative cursor-pointer hover:-translate-y-0.5 transition duration-200 inline-block text-center";

  const variantStyles = {
    primary:
      "shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    secondary: "bg-transparent shadow-none dark:text-white",
    dark: "bg-black text-white shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
    gradient:
      "bg-gradient-to-b from-blue-500 to-blue-700 text-white shadow-[0px_2px_0px_0px_rgba(255,255,255,0.3)_inset]",
  };

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      {...props}
    >
      {children}
    </Tag>
  );
};
