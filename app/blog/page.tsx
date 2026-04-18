import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BlogCard } from "@/components/blog/blog-card";
import { blogPosts } from "@/lib/blog-posts";

export default function BlogPage() {
  return (
    <div className="min-h-dvh bg-[#04060c] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(56,189,248,0.12),transparent)]" />

      <div className="relative mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-white/55 transition hover:text-white"
        >
          <ArrowLeft className="size-4" aria-hidden />
          Back to home
        </Link>

        <p className="mt-10 text-xs uppercase tracking-[0.35em] text-sky-400/90">
          Insights
        </p>
        <h1 className="mt-3 max-w-3xl font-display text-3xl font-semibold uppercase leading-tight tracking-[0.06em] text-white md:text-4xl">
          From the Corp Haven journal
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/65">
          Practical perspective on refits, onboard systems, craftsmanship, and
          compliance — written for owners, captains, and project teams.
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:gap-8">
          {blogPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
