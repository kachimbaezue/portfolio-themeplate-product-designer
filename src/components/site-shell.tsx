import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  RecordIcon,
  Menu01Icon,
  Cancel01Icon,
  Sun03Icon,
  Moon02Icon,
  NewTwitterIcon,
  Linkedin02Icon,
  Github01Icon,
  DribbbleIcon,
  Mail01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";
import { siteConfig } from "@/data/config";

const links = [
  { to: "/", label: "Home" },
  { to: "/work", label: "Work" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

const socialIcons = [
  { key: "x",        icon: NewTwitterIcon, label: "X / Twitter" },
  { key: "linkedin", icon: Linkedin02Icon,  label: "LinkedIn"   },
  { key: "github",   icon: Github01Icon,    label: "GitHub"     },
  { key: "dribbble", icon: DribbbleIcon,    label: "Dribbble"   },
] as const;

type ThemeMode = "light" | "dark";

/* ─── Theme hook ─────────────────────────────────────────────── */
function applyTheme(mode: ThemeMode) {
  const html = document.documentElement;
  html.classList.remove("dark");
  if (mode === "dark") html.classList.add("dark");
}

function useTheme() {
  const [theme, setTheme] = useState<ThemeMode>("light");

  useEffect(() => {
    const stored = (typeof window !== "undefined" && localStorage.getItem("theme")) as ThemeMode | null;
    const initial: ThemeMode = stored ?? (siteConfig.theme === "dark" ? "dark" : "light");
    setTheme(initial);
    applyTheme(initial);
  }, []);

  const toggleDark = () => {
    setTheme((prev) => {
      const next: ThemeMode = prev === "light" ? "dark" : "light";
      applyTheme(next);
      try { localStorage.setItem("theme", next); } catch {}
      return next;
    });
  };

  return { theme, toggleDark };
}

/* ─── Dark / Light toggle pill ──────────────────────────────── */
function ThemeToggle() {
  const { theme, toggleDark } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      onClick={toggleDark}
      aria-label="Toggle dark mode"
      className="relative inline-flex items-center h-8 w-14 rounded-full bg-background border border-border transition-colors"
    >
      <span
        className={`absolute top-0.5 h-7 w-7 rounded-full bg-foreground text-background flex items-center justify-center transition-transform duration-300 ${
          isDark ? "translate-x-6" : "translate-x-0.5"
        }`}
      >
        <HugeiconsIcon icon={isDark ? Moon02Icon : Sun03Icon} size={14} />
      </span>
    </button>
  );
}

/* ─── Top Bar ────────────────────────────────────────────────── */
function TopBar({ onMenu, menuOpen }: { onMenu: () => void; menuOpen: boolean }) {
  const location = useLocation();
  return (
    <div className="flex items-center justify-between px-5 sm:px-7 py-4">
      <div className="flex items-center gap-3">
        <Link to="/" className="flex items-center gap-2 font-medium text-foreground">
          <HugeiconsIcon icon={RecordIcon} size={20} strokeWidth={2} />
          <span className="text-base">{siteConfig.name}</span>
        </Link>
        <ThemeToggle />
        {siteConfig.available && (
          <span
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-background text-xs font-medium"
            style={{ color: "var(--color-available)" }}
          >
            <span
              className="h-2 w-2 rounded-full animate-pulse-dot"
              style={{ background: "var(--color-available)" }}
            />
            Available
          </span>
        )}
      </div>

      <nav className="hidden lg:flex items-center gap-1">
        {links.map((l) => {
          const active =
            location.pathname === l.to ||
            (l.to === "/work" && location.pathname.startsWith("/work"));
          return (
            <Link
              key={l.to}
              to={l.to}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                active
                  ? "bg-foreground text-background"
                  : "text-foreground/70 hover:text-foreground hover:bg-background"
              }`}
            >
              {l.label}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={onMenu}
        className="lg:hidden inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background text-sm font-medium hover:bg-foreground hover:text-background transition-colors"
        aria-label="Toggle menu"
      >
        <span className="hidden sm:inline">{menuOpen ? "Close" : "Menu"}</span>
        <HugeiconsIcon icon={menuOpen ? Cancel01Icon : Menu01Icon} size={18} />
      </button>
    </div>
  );
}

/* ─── Mobile Menu ────────────────────────────────────────────── */
function MenuPanel({ onClose }: { onClose: () => void }) {
  const location = useLocation();
  return (
    <div className="px-3 pb-3 lg:hidden animate-fade-in">
      <div className="rounded-3xl bg-foreground text-background p-3 grid grid-cols-2 gap-2">
        {links.map((l) => {
          const active = location.pathname === l.to;
          return (
            <Link
              key={l.to}
              to={l.to}
              onClick={onClose}
              className={`rounded-2xl py-5 text-center text-base font-medium transition-all ${
                active ? "bg-background/15" : "hover:bg-background/10"
              }`}
            >
              {l.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Footer ─────────────────────────────────────────────────── */
function Footer() {
  const activeSocials = socialIcons.filter(
    (s) => siteConfig.socials[s.key as keyof typeof siteConfig.socials]
  );

  return (
    <footer
      className="mt-4 rounded-3xl overflow-hidden animate-fade-up"
      style={{ backgroundColor: "oklch(0.13 0.005 250)" }}
    >
      {/* CTA strip */}
      <div
        className="px-8 sm:px-12 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
        style={{ borderBottom: "1px solid oklch(0.97 0.005 85 / 8%)" }}
      >
        <div>
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-2"
            style={{ color: "oklch(0.97 0.005 85 / 40%)" }}
          >
            Open to new projects
          </p>
          <h2
            className="text-2xl sm:text-3xl font-light tracking-tight"
            style={{ color: "oklch(0.97 0.005 85)" }}
          >
            Let's build something great.
          </h2>
        </div>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-opacity hover:opacity-80 shrink-0"
          style={{
            backgroundColor: "oklch(0.97 0.005 85)",
            color: "oklch(0.13 0.005 250)",
          }}
        >
          Start a project
          <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
        </Link>
      </div>

      {/* Main grid */}
      <div className="px-8 sm:px-12 py-10 grid gap-10 md:grid-cols-12">
        {/* Brand */}
        <div className="md:col-span-5">
          <div
            className="flex items-center gap-2 font-medium mb-4"
            style={{ color: "oklch(0.97 0.005 85)" }}
          >
            <HugeiconsIcon icon={RecordIcon} size={18} />
            <span>{siteConfig.name}</span>
          </div>
          <p
            className="text-sm leading-relaxed max-w-xs"
            style={{ color: "oklch(0.97 0.005 85 / 50%)" }}
          >
            {siteConfig.bio}
          </p>
          <div className="mt-6 flex items-center gap-2">
            {activeSocials.map((s) => (
              <a
                key={s.key}
                href={siteConfig.socials[s.key as keyof typeof siteConfig.socials]}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="h-9 w-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{
                  backgroundColor: "oklch(0.97 0.005 85 / 8%)",
                  color: "oklch(0.97 0.005 85 / 65%)",
                }}
              >
                <HugeiconsIcon icon={s.icon} size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* Pages */}
        <div className="md:col-span-3">
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ color: "oklch(0.97 0.005 85 / 35%)" }}
          >
            Pages
          </p>
          <ul className="space-y-2.5">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="text-sm transition-opacity hover:opacity-100"
                  style={{ color: "oklch(0.97 0.005 85 / 55%)" }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact + theme switcher */}
        <div className="md:col-span-4">
          <p
            className="text-xs font-semibold tracking-widest uppercase mb-4"
            style={{ color: "oklch(0.97 0.005 85 / 35%)" }}
          >
            Contact
          </p>
          <ul className="space-y-3 mb-8">
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-sm flex items-center gap-2 transition-opacity hover:opacity-100"
                style={{ color: "oklch(0.97 0.005 85 / 55%)" }}
              >
                <HugeiconsIcon icon={Mail01Icon} size={14} />
                {siteConfig.email}
              </a>
            </li>
            <li
              className="text-sm"
              style={{ color: "oklch(0.97 0.005 85 / 55%)" }}
            >
              {siteConfig.location}
            </li>
            {siteConfig.available && (
              <li
                className="flex items-center gap-2 text-sm"
                style={{ color: "var(--color-available)" }}
              >
                <span
                  className="h-2 w-2 rounded-full animate-pulse-dot"
                  style={{ background: "var(--color-available)" }}
                />
                Available for work
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="px-8 sm:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs"
        style={{
          borderTop: "1px solid oklch(0.97 0.005 85 / 8%)",
          color: "oklch(0.97 0.005 85 / 28%)",
        }}
      >
        <span>
          {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </span>
        <span>Deisgned by <a href="https://mocworkshop.web.app/">MUC Labs.</a> </span>
      </div>
    </footer>
  );
}

/* ─── Shell ──────────────────────────────────────────────────── */
export function SiteShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="min-h-screen w-full">
      <div className="mx-auto w-full max-w-[1280px] px-3 sm:px-5 py-4 sm:py-6">
        <header className="panel overflow-hidden mb-4 sticky top-3 z-30 backdrop-blur">
          <TopBar onMenu={() => setMenuOpen((v) => !v)} menuOpen={menuOpen} />
          {menuOpen && <MenuPanel onClose={() => setMenuOpen(false)} />}
        </header>
        <main className="space-y-4">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
