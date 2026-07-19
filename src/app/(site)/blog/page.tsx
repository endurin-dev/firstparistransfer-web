// app/blog/page.tsx
import { Oswald, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Link from "next/link";
import { blogPosts, type BlogPost } from "@/lib/blog-posts";

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

function minutesOf(readTime: string): number {
  const n = parseInt(readTime, 10);
  return Number.isNaN(n) ? 1 : n;
}

function initialsOf(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

const maxMinutes = Math.max(...blogPosts.map((p) => minutesOf(p.readTime)));

function PostCard({ post, large = false }: { post: BlogPost; large?: boolean }) {
  const minutes = minutesOf(post.readTime);
  const barWidth = Math.round((minutes / maxMinutes) * 100);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_16px_40px_-24px_rgba(22,26,44,0.45)] transition-shadow hover:shadow-[0_20px_48px_-20px_rgba(22,26,44,0.55)]"
    >
      <div className={`relative overflow-hidden ${large ? "aspect-[4/3]" : "aspect-video"}`}>
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#161A2C]/50 via-transparent to-transparent" />

        {post.featured && (
          <span className="font-[family-name:var(--font-mono)] absolute right-4 top-4 rounded-full bg-[#C9A24B] px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#161A2C]">
            Featured
          </span>
        )}

        <div className="absolute left-4 top-4 flex h-16 w-16 flex-col items-center justify-center rounded-full border-2 border-dashed border-[#C9A24B] bg-white/90 text-center leading-none">
          <span className="font-[family-name:var(--font-mono)] text-[8px] font-semibold uppercase tracking-wide text-[#161A2C]">
            {post.category.length > 12 ? post.category.split(" ")[0] : post.category}
          </span>
          <span className="my-1 h-px w-8 bg-[#D8CFAF]" />
          <span className="font-[family-name:var(--font-mono)] text-[10px] font-semibold text-[#8A7A4E]">
            {post.readTime}
          </span>
        </div>
      </div>

      <div className={`flex flex-1 flex-col ${large ? "p-8" : "p-6"}`}>
        <h3
          className={`font-[family-name:var(--font-display)] font-semibold leading-snug text-[#161A2C] ${
            large ? "text-2xl" : "text-lg"
          }`}
        >
          {post.title}
        </h3>
        <p className={`mt-3 text-[#5B5748] ${large ? "text-sm" : "text-[13px]"} line-clamp-3`}>
          {post.excerpt}
        </p>

        <div className="mt-5 flex items-center gap-2.5">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#161A2C] text-[10px] font-semibold text-[#E4C878]">
            {initialsOf(post.author)}
          </span>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-[#161A2C]">{post.author}</p>
            <p className="font-[family-name:var(--font-mono)] flex items-center gap-1.5 text-[10px] text-[#8A7A4E]">
              <Calendar className="h-3 w-3" /> {post.date}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <div className="h-1 w-full overflow-hidden rounded-full bg-[#EFEBE1]">
            <div className="h-full rounded-full bg-[#C9A24B]" style={{ width: `${barWidth}%` }} />
          </div>
          <p className="mt-1.5 flex items-center gap-1 text-[10px] text-[#8A7A4E]">
            <Clock className="h-3 w-3" /> {post.readTime} read
          </p>
        </div>

        <div className="mt-5 flex items-center gap-1.5 border-t border-[#EFEBE1] pt-4 text-xs font-semibold uppercase tracking-wide text-[#161A2C]">
          Read article
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}

export default function BlogPage() {
  const featured = blogPosts.filter((p) => p.featured);
  const rest = blogPosts.filter((p) => !p.featured);

  return (
    <div
      className={`${oswald.variable} ${plexSans.variable} ${plexMono.variable} font-[family-name:var(--font-body)] min-h-screen bg-[#EFEBE1]`}
    >
      <section className="bg-[#161A2C] px-4 py-24 text-center sm:px-6">
        <p className="font-[family-name:var(--font-mono)] text-xs font-semibold uppercase tracking-[0.3em] text-[#E4C878]">
          Dispatches from the team
        </p>
        <h1 className="font-[family-name:var(--font-display)] mt-4 text-5xl font-semibold uppercase tracking-wide text-[#F1E9CE] sm:text-7xl">
          Paris Insider
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-[#9AA1C2]">
          Hidden gems, local secrets, and honest travel tips — written by the people who actually live here.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <h2 className="font-[family-name:var(--font-display)] mb-8 text-2xl font-semibold uppercase tracking-wide text-[#161A2C]">
          Featured
        </h2>
        <div className="grid gap-6 lg:grid-cols-3">
          {featured.map((post) => (
            <PostCard key={post.slug} post={post} large />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6">
        <h2 className="font-[family-name:var(--font-display)] mb-8 text-2xl font-semibold uppercase tracking-wide text-[#161A2C]">
          More from the journal
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}