"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#services", label: "Services" },
  { href: "/#capabilities", label: "Capabilities" },
  { href: "/#process", label: "Process" },
  { href: "/work", label: "Work" },
  { href: "/#blog", label: "Blog" },
];

export function SiteHeader() {
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const scrollGate = useRef(false);

  const atHeroTop = isHome && !scrolled;

  useLenis((lenis) => {
    const next = lenis.scroll > 32;
    if (scrollGate.current !== next) {
      scrollGate.current = next;
      setScrolled(next);
    }
  });

  useEffect(() => {
    if (open) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,box-shadow,border-color] duration-300",
          scrolled
            ? "border-white/[0.08] bg-[#05080f]/92 shadow-[0_12px_40px_-20px_rgba(0,0,0,0.65)] backdrop-blur-xl backdrop-saturate-150"
            : atHeroTop
              ? "border-white/[0.12] bg-[#05080f]/30 shadow-[0_8px_40px_-24px_rgba(0,0,0,0.45)] backdrop-blur-2xl backdrop-saturate-150"
              : "border-transparent bg-[#05080f]/40 backdrop-blur-md",
        )}
        initial={reduce ? false : { y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8">
          <Link
            href="/"
            className="group flex items-baseline gap-1 text-sm font-semibold tracking-tight text-[var(--foreground)]"
          >
            <span className="font-display transition group-hover:text-sky-300">Corp</span>
            <span className="font-display bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
              Haven
            </span>
          </Link>

          <nav
            className="hidden items-center gap-7 text-sm text-[var(--muted)] lg:flex"
            aria-label="Primary"
          >
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="transition hover:text-[var(--foreground)]"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <motion.div
              className="hidden lg:block"
              whileHover={{ scale: reduce ? 1 : 1.03 }}
              whileTap={{ scale: reduce ? 1 : 0.98 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-1.5 rounded-full bg-sky-500/90 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-400 md:text-sm"
              >
                Book call
                <ArrowRight className="size-3.5 md:size-4" aria-hidden />
              </Link>
            </motion.div>

            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 text-white lg:hidden"
              aria-expanded={open}
              onClick={() => setOpen(true)}
            >
              <Menu className="size-5" aria-hidden />
              <span className="sr-only">Open menu</span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[60] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-black/75 backdrop-blur-sm"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              className="absolute right-0 top-0 flex h-full w-[min(100%,380px)] flex-col border-l border-white/10 bg-[#070a12] shadow-2xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={
                reduce
                  ? { duration: 0.2 }
                  : { type: "spring", damping: 30, stiffness: 320 }
              }
            >
              <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
                <span className="font-display text-sm font-semibold text-white">
                  Menu
                </span>
                <button
                  type="button"
                  className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 text-white"
                  onClick={() => setOpen(false)}
                >
                  <X className="size-5" aria-hidden />
                  <span className="sr-only">Close</span>
                </button>
              </div>
              <nav
                className="flex flex-1 flex-col gap-1 px-3 py-6"
                aria-label="Mobile"
              >
                {links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="rounded-xl px-4 py-3 text-base font-medium text-white/85 transition hover:bg-white/[0.06] hover:text-white"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                ))}
                <Link
                  href="/contact"
                  className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-sky-500 px-5 py-3.5 text-sm font-semibold text-white"
                  onClick={() => setOpen(false)}
                >
                  Book call
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </nav>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
