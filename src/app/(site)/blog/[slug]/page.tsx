// app/blog/[slug]/page.tsx
import { Oswald, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getPostBySlug, getRelatedPosts, type ContentBlock } from "@/lib/blog-posts";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-mono",
});

function initialsOf(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "h2":
      return (
        <h2 className="font-[family-name:var(--font-display)] mt-10 text-2xl font-semibold uppercase tracking-wide text-[#161A2C]">
          {block.text}
        </h2>
      );
    case "ul":
      return (
        <ul className="mt-4 space-y-2">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-[#3A3629]">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#C9A24B]" />
              {item}
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote className="my-8 border-l-2 border-[#C9A24B] pl-5 font-[family-name:var(--font-display)] text-xl italic tracking-wide text-[#161A2C]">
          {block.text}
        </blockquote>
      );
    case "p":
    default:
      return <p className="mt-4 text-[15px] leading-relaxed text-[#3A3629]">{block.text}</p>;
  }
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.slug, 3);

  return (
    <div
      className={`${oswald.variable} ${plexSans.variable} ${plexMono.variable} font-[family-name:var(--font-body)] min-h-screen bg-[#EFEBE1]`}
    >
      {/* HERO */}
      <section className="bg-[#161A2C] px-4 pb-16 pt-12 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-[#9AA1C2] hover:text-[#E4C878]"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to journal
          </Link>

          <span className="font-[family-name:var(--font-mono)] mt-6 inline-block rounded-full border border-[#2A3050] bg-[#1E2542] px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#E4C878]">
            {post.category}
          </span>

          <h1 className="font-[family-name:var(--font-display)] mt-4 text-3xl font-semibold leading-tight text-[#F1E9CE] sm:text-5xl">
            {post.title}
          </h1>

          <div className="mt-6 flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#C9A24B] text-xs font-semibold text-[#161A2C]">
              {initialsOf(post.author)}
            </span>
            <div>
              <p className="text-sm font-semibold text-[#F1E9CE]">{post.author}</p>
              <p className="font-[family-name:var(--font-mono)] flex items-center gap-3 text-[11px] text-[#8E93A8]">
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {post.readTime}
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COVER IMAGE */}
      <div className="mx-auto -mt-10 max-w-4xl px-4 sm:px-6">
        <div className="aspect-[16/9] overflow-hidden rounded-2xl shadow-[0_20px_50px_-25px_rgba(22,26,44,0.6)]">
          <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
        </div>
      </div>

      {/* BODY + QUICK FACTS */}
      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1fr_260px]">
          <article className="min-w-0">
            <p className="text-lg leading-relaxed text-[#5B5748]">{post.excerpt}</p>
            {post.content.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </article>

          <aside className="md:sticky md:top-8 md:h-fit">
            <div className="rounded-2xl border border-[#D8CFAF] bg-white p-5">
              <p className="font-[family-name:var(--font-mono)] text-[11px] font-semibold uppercase tracking-widest text-[#8A7A4E]">
                Quick facts
              </p>
              <ul className="mt-3 space-y-3">
                {post.quickFacts.map((fact, i) => (
                  <li key={i} className="flex items-start gap-2 text-[13px] leading-snug text-[#3A3629]">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#C9A24B]" />
                    {fact}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 rounded-2xl bg-[#161A2C] p-5">
              <p className="font-[family-name:var(--font-display)] text-sm uppercase tracking-wide text-[#F1E9CE]">
                Planning a visit?
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-[#9AA1C2]">
                We can arrange a private transfer for this trip, no meter, fixed price.
              </p>
              <Link
                href="/destinations"
                className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#C9A24B] px-3.5 py-2 text-[11px] font-semibold uppercase tracking-wide text-[#161A2C] hover:bg-[#E4C878]"
              >
                See destinations <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </aside>
        </div>

        {/* AUTHOR BYLINE */}
        <div className="mt-14 flex items-start gap-4 border-t border-[#D8CFAF] pt-8">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#161A2C] text-sm font-semibold text-[#E4C878]">
            {initialsOf(post.author)}
          </span>
          <div>
            <p className="text-sm font-semibold text-[#161A2C]">{post.author}</p>
            <p className="mt-1 text-sm leading-relaxed text-[#5B5748]">{post.authorBio}</p>
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
        <h2 className="font-[family-name:var(--font-display)] mb-6 text-xl font-semibold uppercase tracking-wide text-[#161A2C]">
          More from the journal
        </h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {related.map((r) => (
            <Link
              key={r.slug}
              href={`/blog/${r.slug}`}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_12px_30px_-20px_rgba(22,26,44,0.4)]"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={r.image}
                  alt={r.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <p className="font-[family-name:var(--font-mono)] text-[10px] font-semibold uppercase tracking-widest text-[#8A7A4E]">
                  {r.category}
                </p>
                <h3 className="font-[family-name:var(--font-display)] mt-1.5 text-base font-semibold leading-snug text-[#161A2C]">
                  {r.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}