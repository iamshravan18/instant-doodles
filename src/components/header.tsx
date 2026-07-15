"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { TrackedLink } from "./tracked-link";
import { ANALYTICS_EVENTS } from "@/lib/analytics";
import { getImage } from "@/lib/media";

const NAV = [
  ["Features", "/features"],
  ["Use cases", "/use-cases"],
  ["Compare", "/alternatives"],
  ["Examples", "/examples"],
  ["Resources", "/resources"],
  ["Search", "/search"],
] as const;

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const logo = getImage("logo");

  // Lock scroll + Escape-to-close while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-[color-mix(in_srgb,var(--paper)_88%,transparent)] backdrop-blur">
      <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-4 px-5 py-3 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5" aria-label="Independent InstaDoodle Guide — home">
          <Image src={logo.src} alt={logo.alt} width={logo.width} height={logo.height} className="h-7 w-auto" priority />
          <span className="rounded-full border border-black/15 bg-card px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-[0.1em] text-muted">
            Independent&nbsp;guide
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 text-sm font-semibold md:flex">
          {NAV.map(([label, href]) => {
            const active = isActive(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`relative py-1 transition-colors hover:text-violet ${active ? "text-violet" : "text-ink"}`}
              >
                {label}
                {active && <span aria-hidden className="absolute -bottom-0.5 left-0 h-0.5 w-full rounded-full bg-magenta" />}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <TrackedLink
            href="/alternatives"
            event={ANALYTICS_EVENTS.navigationCta}
            eventDetail={{ placement: "header" }}
            className="hidden rounded-full bg-ink px-4 py-2 text-sm font-bold text-white transition hover:bg-violet sm:inline-flex"
          >
            Compare whiteboard tools <span aria-hidden>→</span>
          </TrackedLink>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink bg-card md:hidden"
          >
            <span aria-hidden className="relative block h-3.5 w-5">
              <span className={`absolute left-0 h-0.5 w-5 rounded bg-ink transition-all ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 top-1.5 h-0.5 w-5 rounded bg-ink transition-all ${open ? "opacity-0" : "opacity-100"}`} />
              <span className={`absolute left-0 h-0.5 w-5 rounded bg-ink transition-all ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            className="md:hidden"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={reduce ? {} : { height: "auto", opacity: 1 }}
            exit={reduce ? {} : { height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <nav aria-label="Mobile" className="border-t border-black/10 bg-paper px-5 pb-6 pt-2">
              <ul className="flex flex-col">
                {NAV.map(([label, href]) => {
                  const active = isActive(pathname, href);
                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={`flex items-center justify-between border-b border-black/8 py-3.5 text-base font-bold ${active ? "text-violet" : "text-ink"}`}
                      >
                        {label} <span aria-hidden className="text-magenta">↗</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <TrackedLink
                href="/alternatives"
                event={ANALYTICS_EVENTS.navigationCta}
                eventDetail={{ placement: "mobile_menu" }}
                onClick={() => setOpen(false)}
                className="mt-4 flex items-center justify-center rounded-full bg-ink px-5 py-3 text-base font-bold text-white"
              >
                Compare whiteboard tools <span aria-hidden className="ml-1">→</span>
              </TrackedLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
