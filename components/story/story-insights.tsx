"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { BlogCard } from "@/components/blog/blog-card";
import { ParallaxLayer } from "@/components/motion/parallax";
import { SectionDepth } from "@/components/motion/section-depth";
import { Stagger, StaggerChild } from "@/components/motion/reveal";
import { SectionHead } from "@/components/ui/section-head";
import { blogPosts } from "@/lib/blog-posts";

export function StoryInsights() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      id="blog"
      className="relative scroll-mt-20 overflow-hidden border-t border-white/[0.06] bg-[#04060c] px-5 py-24 md:px-10 md:py-32"
    >
      <SectionDepth sectionRef={sectionRef} tone="violet" />

      {!reduce ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -left-[20%] top-[18%] h-[420px] w-[70%] rounded-full bg-sky-500/[0.07] blur-[120px]"
          animate={{ opacity: [0.45, 0.75, 0.45], scale: [1, 1.05, 1] }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ) : null}
      {!reduce ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -right-[15%] bottom-[8%] h-[360px] w-[55%] rounded-full bg-violet-500/[0.06] blur-[100px]"
          animate={{ opacity: [0.35, 0.6, 0.35] }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      ) : null}

      <div className="relative mx-auto max-w-6xl">
        <ParallaxLayer range={10} scrub={0.65} className="mb-12 md:mb-16">
          <SectionHead
            index="10"
            eyebrow="Insights"
            title="Blog"
            description="Editorial notes from the yard — refits, machinery, interiors, and standards."
            action={
              <motion.div whileHover={{ scale: reduce ? 1 : 1.02 }}>
                <Link
                  href="/blog"
                  className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-5 py-2.5 text-sm font-medium text-white transition hover:border-sky-500/40 hover:bg-sky-500/10"
                >
                  View all articles
                  <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </motion.div>
            }
          />
        </ParallaxLayer>

        <Stagger
          className="grid gap-6 sm:grid-cols-2 lg:gap-8"
          stagger={0.09}
          delayChildren={0.04}
        >
          {blogPosts.map((post) => (
            <StaggerChild key={post.slug}>
              <BlogCard post={post} />
            </StaggerChild>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
