"use client";

import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "framer-motion";
import { ArrowUpRight, Clock } from "lucide-react";
import type { BlogPost } from "@/lib/blog-posts";
import { cn } from "@/lib/utils";

type BlogCardProps = {
  post: BlogPost;
  className?: string;
};

export function BlogCard({ post, className }: BlogCardProps) {
  const reduce = useReducedMotion();

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={cn(
        "group relative flex h-full min-h-[380px] flex-col overflow-hidden rounded-3xl",
        "border border-white/[0.08] bg-white/[0.02] shadow-[0_24px_80px_-24px_rgba(0,0,0,0.85)]",
        "transition-[border-color,box-shadow,transform] duration-500",
        "hover:-translate-y-1 hover:border-sky-400/25 hover:shadow-[0_32px_90px_-28px_rgba(14,165,233,0.12)]",
        "motion-reduce:hover:translate-y-0",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400/80",
        className,
      )}
    >
      <div className="relative flex-1 overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className={cn(
            "object-cover transition-transform duration-[1.1s] ease-out will-change-transform",
            !reduce && "group-hover:scale-[1.07]",
          )}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#04060c] via-[#04060c]/55 to-transparent"
          aria-hidden
        />
        <div
          className="absolute inset-0 opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(120% 80% at 10% 0%, rgba(56,189,248,0.15), transparent 50%)",
          }}
          aria-hidden
        />

        <div className="absolute left-5 top-5 z-[1] flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/90 backdrop-blur-md">
            {post.category}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-[1] p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium uppercase tracking-[0.18em] text-white/50">
            <time dateTime={post.dateIso}>{post.date}</time>
            <span className="text-white/25" aria-hidden>
              ·
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5 text-sky-400/90" aria-hidden />
              {post.readMinutes} min read
            </span>
          </div>

          <h3 className="mt-3 font-display text-lg font-semibold leading-snug tracking-[0.02em] text-white transition duration-300 group-hover:text-sky-50 md:text-xl">
            {post.title}
          </h3>

          <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/72 md:line-clamp-2 md:text-[15px]">
            {post.excerpt}
          </p>

          <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-sky-400 transition duration-300 group-hover:gap-3">
            Read article
            <ArrowUpRight className="size-4 shrink-0" aria-hidden />
          </span>
        </div>
      </div>
    </Link>
  );
}
