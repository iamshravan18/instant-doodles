import Link from "next/link";
import Image from "next/image";
import { AffiliateDisclosure } from "./affiliate-disclosure";
import { TrackedLink } from "./tracked-link";
import { ANALYTICS_EVENTS } from "@/lib/analytics";

const groups = [
  {
    label: "Explore",
    links: [
      ["Features", "/features"],
      ["Use cases", "/use-cases"],
      ["Samples", "/samples"],
      ["Resources", "/resources"],
    ],
  },
  {
    label: "Compare",
    links: [
      ["Comparison guide", "/alternatives"],
      ["InstaDoodle vs Doodly", "/alternatives/doodly"],
      ["InstaDoodle vs VideoScribe", "/alternatives/videoscribe"],
      ["InstaDoodle vs Animaker", "/alternatives/animaker"],
    ],
  },
  {
    label: "Guides",
    links: [
      ["Whiteboard animation software", "/whiteboard-animation-software"],
      ["AI whiteboard animation", "/ai-whiteboard-animation"],
      ["Educational video maker", "/educational-video-maker"],
      ["Training video software", "/training-video-software"],
    ],
  },
  {
    label: "Company",
    links: [
      ["About", "/about"],
      ["Contact", "/contact"],
      ["Privacy", "/privacy"],
      ["Terms", "/terms"],
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-black/10 bg-card">
      <div className="mx-auto w-full max-w-6xl px-5 pt-10 lg:px-8">
        <AffiliateDisclosure />
      </div>
      <div className="mx-auto grid w-full max-w-6xl gap-9 px-5 py-12 sm:grid-cols-2 lg:grid-cols-5 lg:px-8">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2">
            <Image src="/images/instadoodle/instadoodle-logo.webp" alt="InstaDoodle logo" width={146} height={32} className="h-6 w-auto" />
          </div>
          <p className="mt-2 text-sm font-black tracking-[-0.03em]">
            Independent <span className="text-magenta">InstaDoodle</span> Guide
          </p>
          <p className="mt-3 max-w-64 text-sm text-muted">
            An independent product-education guide to AI-assisted whiteboard animation and doodle video workflows. Not
            the official InstaDoodle website.
          </p>
        </div>
        {groups.map((group) => (
          <div key={group.label}>
            <h2 className="text-sm font-extrabold uppercase tracking-[0.12em]">{group.label}</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {group.links.map(([label, href]) => (
                <li key={href}>
                  {label === "Contact" ? (
                    <TrackedLink
                      href={href}
                      event={ANALYTICS_EVENTS.contactAction}
                      eventDetail={{ placement: "footer" }}
                      className="hover:text-violet hover:underline"
                    >
                      {label}
                    </TrackedLink>
                  ) : (
                    <Link href={href} className="hover:text-violet hover:underline">
                      {label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-black/10 px-5 py-5 text-center text-xs text-muted">
        © {new Date().getFullYear()} Independent InstaDoodle Guide. Product, pricing, legal and support information
        requires business approval before publication.
      </div>
    </footer>
  );
}
