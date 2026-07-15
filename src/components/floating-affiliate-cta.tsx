"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ANALYTICS_EVENTS, trackEvent } from "@/lib/analytics";

/**
 * Premium, env-gated floating affiliate CTA.
 *
 * - Renders nothing unless NEXT_PUBLIC_AFFILIATE_URL is configured.
 * - Appears after ~25% scroll and fades out near the top.
 * - Hides while the footer or any existing affiliate CTA is on screen,
 *   so two affiliate CTAs are never visible at once.
 * - Fixed positioning only (no layout shift, no LCP/CLS impact).
 */
export function FloatingAffiliateCTA() {
  const href = process.env.NEXT_PUBLIC_AFFILIATE_URL;
  const pathname = usePathname();

  const [scrolledEnough, setScrolledEnough] = useState(false);
  const [blocked, setBlocked] = useState(false);

  const shownRef = useRef(false);
  const hiddenRef = useRef(false);

  const visible = Boolean(href) && scrolledEnough && !blocked;

  // Reset the per-page analytics funnel on client navigation. Visibility state
  // is recomputed by the scroll/observer effects below (they depend on pathname).
  useEffect(() => {
    shownRef.current = false;
    hiddenRef.current = false;
  }, [pathname]);

  // Show after ~25% scroll; hide near the top. rAF-throttled, passive listener.
  useEffect(() => {
    if (!href) return;
    let raf = 0;
    const measure = () => {
      raf = 0;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const pct = scrollable > 0 ? window.scrollY / scrollable : 0;
      setScrolledEnough(pct >= 0.25);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [href, pathname]);

  // Hide while the footer or any existing affiliate CTA is in view.
  useEffect(() => {
    if (!href || typeof IntersectionObserver === "undefined") return;
    const targets = [
      ...Array.from(document.querySelectorAll("[data-affiliate-cta]")),
      document.querySelector("footer"),
    ].filter((el): el is Element => Boolean(el));
    if (targets.length === 0) return;
    const active = new Set<Element>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) active.add(entry.target);
          else active.delete(entry.target);
        }
        setBlocked(active.size > 0);
      },
      { threshold: 0 },
    );
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, [href, pathname]);

  // Separate show / hide analytics (once each per page view).
  useEffect(() => {
    if (visible && !shownRef.current) {
      shownRef.current = true;
      trackEvent(ANALYTICS_EVENTS.floatingCtaShow, { placement: "floating_cta" });
    } else if (!visible && shownRef.current && !hiddenRef.current) {
      hiddenRef.current = true;
      trackEvent(ANALYTICS_EVENTS.floatingCtaHide, { placement: "floating_cta" });
    }
  }, [visible]);

  if (!href) return null;

  const onClick = () => trackEvent(ANALYTICS_EVENTS.floatingCtaClick, { placement: "floating_cta" });
  const ariaLabel = "Try InstaDoodle on the official website (opens in a new tab)";

  return (
    <>
      {/* Desktop / tablet: premium floating card */}
      <div
        aria-hidden={!visible}
        className={`fixed bottom-6 right-6 z-50 hidden w-64 sm:block ${
          visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
        } transition-all duration-300 ease-out motion-reduce:transition-none`}
      >
        <div className="rounded-xl border border-black/10 bg-white/90 p-4 shadow-[var(--shadow-card)] backdrop-blur">
          <p className="text-xs font-semibold text-muted">Visit the official website</p>
          <a
            href={href}
            target="_blank"
            rel="sponsored nofollow noopener"
            onClick={onClick}
            tabIndex={visible ? 0 : -1}
            aria-label={ariaLabel}
            className="mt-2 flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-violet px-4 py-3 text-sm font-extrabold text-white transition duration-200 hover:scale-[1.03] hover:bg-[var(--violet-600)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet/40 motion-reduce:transition-none motion-reduce:hover:scale-100"
          >
            <span aria-hidden>🎬</span> Try InstaDoodle
          </a>
          <p className="mt-2 text-[10px] leading-4 text-muted">
            Affiliate link • We may earn a commission at no extra cost.
          </p>
        </div>
      </div>

      {/* Mobile: fixed safe-area bar */}
      <div
        aria-hidden={!visible}
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom) + 0.5rem)" }}
        className={`fixed inset-x-0 bottom-0 z-50 border-t border-black/10 bg-white/95 px-4 pt-2.5 backdrop-blur sm:hidden ${
          visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
        } transition-all duration-300 ease-out motion-reduce:transition-none`}
      >
        <a
          href={href}
          target="_blank"
          rel="sponsored nofollow noopener"
          onClick={onClick}
          tabIndex={visible ? 0 : -1}
          aria-label={ariaLabel}
          className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-violet px-5 text-base font-extrabold text-white transition duration-200 hover:bg-[var(--violet-600)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-violet/40 motion-reduce:transition-none"
        >
          <span aria-hidden>🎬</span> Try InstaDoodle
        </a>
        <p className="mt-1 text-center text-[10px] leading-4 text-muted">
          Affiliate link • we may earn a commission at no extra cost.
        </p>
      </div>
    </>
  );
}
