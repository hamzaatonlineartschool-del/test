/**
 * Homepage hero slider — full-bleed imagery + copy per slide.
 * Replace URLs with Corp Haven brand photography when available.
 */
export type HeroSlide = {
  id: string;
  image: string;
  alt: string;
  kicker: string;
  headline: string;
  subline: string;
  /** Tailwind gradient classes after `bg-gradient-to-r` */
  overlayFrom: string;
};

export const heroSlides: readonly HeroSlide[] = [
  {
    id: "scale",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=85",
    alt: "Operations team collaborating in a modern workspace",
    kicker: "01 · Gateway",
    headline: "Where teams scale without the chaos",
    subline:
      "Global delivery with clear ownership — the responsiveness of an in-house team, tuned for outsourcing.",
    overlayFrom: "from-teal-950/88 via-[#0c1829]/72",
  },
  {
    id: "performance",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1920&q=85",
    alt: "Analytics and performance dashboards",
    kicker: "02 · Performance",
    headline: "Outcomes your leadership can act on",
    subline:
      "Reporting tied to SLAs and CSAT — not vanity charts. Continuous improvement, week after week.",
    overlayFrom: "from-slate-950/90 via-[#0f172a]/70",
  },
  {
    id: "care",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1920&q=85",
    alt: "Customer care and support professionals",
    kicker: "03 · Care",
    headline: "Every touchpoint strengthens trust",
    subline:
      "Omnichannel support with QA and playbooks aligned to your brand voice — loyalty that shows up in the numbers.",
    overlayFrom: "from-cyan-950/85 via-[#0a1620]/75",
  },
] as const;

export const heroPillars = [
  { href: "/#services", label: "Customer operations" },
  { href: "/#capabilities", label: "Capabilities" },
  { href: "/contact", label: "Start a partnership" },
] as const;
