import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock } from "lucide-react";
import { blogPosts, getPostBySlug } from "@/lib/blog-posts";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Article" };
  return {
    title: `${post.title} | Corp Haven`,
    description: post.excerpt,
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="min-h-dvh bg-[#04060c] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_0%,rgba(56,189,248,0.1),transparent)]" />

      <div className="relative">
        <div className="relative aspect-[21/9] max-h-[min(52vh,520px)] w-full overflow-hidden md:aspect-[2.4/1]">
          <Image
            src={post.image}
            alt=""
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-[#04060c] via-[#04060c]/70 to-[#04060c]/25"
            aria-hidden
          />
        </div>

        <div className="relative mx-auto max-w-3xl px-5 pb-20 pt-8 md:px-8 md:pt-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/55 transition hover:text-white"
          >
            <ArrowLeft className="size-4" aria-hidden />
            All articles
          </Link>

          <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium uppercase tracking-[0.2em] text-sky-400/90">
            <span>{post.category}</span>
            <span className="text-white/25" aria-hidden>
              ·
            </span>
            <time dateTime={post.dateIso}>{post.date}</time>
            <span className="text-white/25" aria-hidden>
              ·
            </span>
            <span className="inline-flex items-center gap-1.5 text-white/50">
              <Clock className="size-3.5 text-sky-400/80" aria-hidden />
              {post.readMinutes} min read
            </span>
          </div>

          <h1 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-[0.02em] text-white md:text-4xl md:leading-tight">
            {post.title}
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-white/75">
            {post.excerpt}
          </p>

          <div className="mt-12 space-y-6 text-base leading-relaxed text-white/70">
            {post.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="mt-14 border-t border-white/[0.08] pt-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-sky-400 transition hover:text-sky-300"
            >
              <ArrowLeft className="size-4" aria-hidden />
              Back to insights
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
