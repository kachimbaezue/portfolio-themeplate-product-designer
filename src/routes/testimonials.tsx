import { createFileRoute } from "@tanstack/react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import { StarIcon, QuoteUpIcon } from "@hugeicons/core-free-icons";
import { SiteShell } from "@/components/site-shell";
import { siteConfig } from "@/data/config";
import { getAvatarUrl } from "@/lib/avatar";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: `Testimonials — ${siteConfig.name}` },
      { name: "description", content: `What clients say about working with ${siteConfig.name}.` },
      { property: "og:title", content: `Testimonials — ${siteConfig.name}` },
      { property: "og:description", content: `What clients say about working with ${siteConfig.name}.` },
    ],
  }),
  component: Testimonials,
});

const items = [
  {
    quote: "Brought our brand to life with thoughtful detail and real craftsmanship. Every pixel felt intentional.",
    name: "Emerie B.",
    role: "Founder",
    seed: "emerie",
    stars: 5,
  },
  {
    quote: "The smoothest design partnership we've had. Delivered ahead of schedule and nailed the brief.",
    name: "Kachi",
    role: "CEO, Fiflow AI",
    seed: "kachi",
    stars: 5,
  },
  {
    quote: "Beautiful work, on time, and a genuine partner throughout the entire process.",
    name: "Aisha Bello",
    role: "CEO, Goldline",
    seed: "aisha",
    stars: 5,
  },
  {
    quote: "Took our vague idea and turned it into a product we're genuinely proud to show off.",
    name: "Marcus T.",
    role: "Co-founder, Lumen",
    seed: "marcus",
    stars: 5,
  },
  {
    quote: "Fast, communicative, and the quality of work is consistently above what we expected.",
    name: "Priya S.",
    role: "Head of Product, Atlas",
    seed: "priya",
    stars: 5,
  },
  {
    quote: "Our conversion rate jumped 40% after the redesign. The ROI speaks for itself.",
    name: "Daniel O.",
    role: "Founder, Northpeak",
    seed: "daniel",
    stars: 5,
  },
];

function Testimonials() {
  return (
    <SiteShell>
      <section className="panel px-6 sm:px-12 py-12 lg:py-16 animate-fade-up text-center">
        <h1 className="text-[40px] sm:text-[60px] leading-[1.05] font-light tracking-tight">
          Words from clients
        </h1>
        <p className="mt-4 text-body max-w-md mx-auto text-sm">
          A few notes from the people I've had the pleasure of working with.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-up delay-100">
        {items.map((t, i) => (
          <figure
            key={i}
            className="panel p-7 hover-lift flex flex-col"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            {/* Stars */}
            <div className="flex items-center gap-0.5 text-amber-500 mb-4">
              {[...Array(t.stars)].map((_, k) => (
                <HugeiconsIcon key={k} icon={StarIcon} size={12} className="fill-current" />
              ))}
            </div>

            <HugeiconsIcon icon={QuoteUpIcon} size={20} className="text-foreground/20 mb-3" />
            <blockquote className="text-foreground text-sm leading-relaxed flex-1">
              "{t.quote}"
            </blockquote>

            <div className="mt-6 flex items-center gap-3">
              <img
                src={getAvatarUrl(t.seed)}
                alt={t.name}
                width={40}
                height={40}
                className="h-10 w-10 rounded-full shrink-0"
              />
              <div className="min-w-0">
                <div className="text-sm font-medium truncate">{t.name}</div>
                <div className="text-xs text-body truncate">{t.role}</div>
              </div>
            </div>
          </figure>
        ))}
      </section>
    </SiteShell>
  );
}
