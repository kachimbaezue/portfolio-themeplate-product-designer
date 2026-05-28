import { useState, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Call02Icon,
  ArrowRight01Icon,
  StarIcon,
  QuoteUpIcon,
  PlusSignIcon,
  MinusSignIcon,
  PaintBrush02Icon,
  FigmaIcon,
  Rocket01Icon,
  BinaryCodeIcon,
  Clock01Icon,
  DeliveryBox01Icon,
  CustomerService01Icon,
} from "@hugeicons/core-free-icons";
import { SiteShell } from "@/components/site-shell";
import { works } from "@/data/works";
import { siteConfig } from "@/data/config";
import { getAvatarUrl } from "@/lib/avatar";
import heroImage from "@/assets/hero-side-image.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${siteConfig.name} — ${siteConfig.role}` },
      { name: "description", content: siteConfig.bio },
      { property: "og:title", content: `${siteConfig.name} — ${siteConfig.role}` },
      { property: "og:description", content: siteConfig.bio },
      { property: "og:type", content: "website" },
      { property: "og:url", content: siteConfig.siteUrl },
    ],
  }),
  component: Index,
});

/* ── Data ──────────────────────────────────────────────────────── */

const services = [
  {
    icon: BinaryCodeIcon,
    title: "Frontend Development",
    desc: "Fast, accessible, and scalable websites built with clean, modern code.",
    tag: "Code",
  },
  {
    icon: PaintBrush02Icon,
    title: "UI / UX Design",
    desc: "Intuitive interfaces designed around real user needs — from wireframe to final pixel.",
    tag: "Design",
  },
  {
    icon: FigmaIcon,
    title: "Figma Systems",
    desc: "High-fidelity prototypes and component libraries ready for handoff or iteration.",
    tag: "Figma",
  },
  {
    icon: Rocket01Icon,
    title: "Startup Launch",
    desc: "End-to-end help for early-stage teams — from first pixel to public launch.",
    tag: "Strategy",
  },
];

const tiers = [
  {
    name: "Landing Page",
    price: "$500",
    period: "fixed",
    description: "A fast, high-converting single page for your product or service.",
    features: [
      { icon: PaintBrush02Icon, text: "UI/UX Design + Development" },
      { icon: Clock01Icon,      text: "5 to 7 day delivery" },
      { icon: DeliveryBox01Icon, text: "Responsive and performance optimised" },
      { icon: FigmaIcon,        text: "Figma source file included" },
    ],
    featured: false,
    cta: "Get started",
  },
  {
    name: "Full Website",
    price: "$1,200",
    period: "fixed",
    description: "A complete multi-page site built to grow with your business.",
    features: [
      { icon: PaintBrush02Icon,    text: "UI/UX Design + Development" },
      { icon: DeliveryBox01Icon,   text: "Up to 5 pages" },
      { icon: Clock01Icon,         text: "2 to 4 week delivery" },
      { icon: CustomerService01Icon, text: "SEO-ready and responsive" },
      { icon: FigmaIcon,           text: "Figma source file included" },
    ],
    featured: true,
    cta: "Get started",
  },
];

const testimonials = [
  {
    quote: "Brought our brand to life with thoughtful detail and real craftsmanship. Every pixel felt intentional.",
    name: "Emerie B.",
    role: "Founder",
    seed: "emerie",
  },
  {
    quote: "The smoothest design partnership we have had. Delivered ahead of schedule and nailed the brief.",
    name: "Kachi",
    role: "CEO, Fiflow AI",
    seed: "kachi",
  },
  {
    quote: "Beautiful work, on time, and a genuine partner throughout the entire process.",
    name: "Aisha Bello",
    role: "CEO, Goldline",
    seed: "aisha",
  },
  {
    quote: "Took our vague idea and turned it into a product we are genuinely proud to show off.",
    name: "Marcus T.",
    role: "Co-founder, Lumen",
    seed: "marcus",
  },
  {
    quote: "Fast, communicative, and the quality of work is consistently above what we expected.",
    name: "Priya S.",
    role: "Head of Product, Atlas",
    seed: "priya",
  },
  {
    quote: "Our conversion rate jumped 40% after the redesign. The ROI speaks for itself.",
    name: "Daniel O.",
    role: "Founder, Northpeak",
    seed: "daniel",
  },
];

const faqs = [
  {
    q: "What does a typical project look like?",
    a: "We start with a short kickoff call to align on goals, then move through design in Figma and frontend development. Most projects wrap up in 2 to 6 weeks.",
  },
  {
    q: "What tools do you design and build in?",
    a: "Figma for design, and modern frontend tech such as React, Next.js, Webflow, or Framer for the build, depending on what fits your stack.",
  },
  {
    q: "How do payments work?",
    a: "50% upfront to reserve your slot, 50% on delivery. Larger projects can be split into milestone payments.",
  },
  {
    q: "Do you offer support after launch?",
    a: "Yes. Monthly retainers are available for ongoing design, updates, and iteration support.",
  },
];

/* ── Testimonial Slider ─────────────────────────────────────── */
function TestimonialSlider() {
  const [active, setActive] = useState(0);
  const startX = useRef(0);

  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((a) => (a + 1) % testimonials.length);

  const onTouchStart = (e: React.TouchEvent) => { startX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    const diff = startX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
  };

  return (
    <div className="relative">
      {/* Desktop grid — 3 columns */}
      <div className="hidden md:grid md:grid-cols-3 gap-4">
        {testimonials.map((t, i) => (
          <TestimonialCard key={i} t={t} />
        ))}
      </div>

      {/* Mobile slider — swipe only, no arrow buttons */}
      <div
        className="md:hidden overflow-hidden"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${active * 100}%)` }}
        >
          {testimonials.map((t, i) => (
            <div key={i} className="w-full shrink-0">
              <TestimonialCard t={t} />
            </div>
          ))}
        </div>

        {/* Dots only — centered, no arrows */}
        <div className="flex items-center justify-center gap-1.5 mt-5">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className="rounded-full transition-all duration-300"
              style={{
                width: active === i ? "20px" : "6px",
                height: "6px",
                backgroundColor: active === i
                  ? "var(--color-foreground)"
                  : "var(--color-muted-foreground)",
                opacity: active === i ? 1 : 0.35,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function TestimonialCard({ t }: { t: typeof testimonials[0] }) {
  return (
    <figure className="rounded-2xl bg-background border border-border p-6 hover-lift flex flex-col h-full">
      <div className="flex items-center gap-0.5 text-amber-500 mb-4">
        {[...Array(5)].map((_, k) => (
          <HugeiconsIcon key={k} icon={StarIcon} size={11} className="fill-current" />
        ))}
      </div>
      <HugeiconsIcon icon={QuoteUpIcon} size={18} className="text-foreground/20 mb-3" />
      <blockquote className="text-foreground text-sm leading-relaxed flex-1">
        {t.quote}
      </blockquote>
      <div className="mt-5 flex items-center gap-3">
        <img
          src={getAvatarUrl(t.seed)}
          alt={t.name}
          width={36}
          height={36}
          className="h-9 w-9 rounded-full shrink-0"
        />
        <div className="min-w-0">
          <div className="text-sm font-medium truncate">{t.name}</div>
          <div className="text-xs text-body truncate">{t.role}</div>
        </div>
      </div>
    </figure>
  );
}

/* ── Page ───────────────────────────────────────────────────── */
function Index() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <SiteShell>

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="panel px-6 sm:px-12 lg:px-16 py-12 lg:py-20 animate-fade-up">
        <div className="grid lg:grid-cols-12 gap-10 items-center">

          {/* Left */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-8">
              <img
                src={getAvatarUrl(siteConfig.name)}
                alt={`${siteConfig.name} avatar`}
                width={52}
                height={52}
                className="h-13 w-13 rounded-full ring-2 ring-border"
              />
              <div>
                <div className="font-medium text-foreground text-sm">{siteConfig.name}</div>
                <div className="text-xs text-body">{siteConfig.role}</div>
              </div>
            </div>

            <h1 className="text-[30px] sm:text-[42px] lg:text-[50px] leading-[1.1] font-light tracking-tight max-w-xl">
              {siteConfig.tagline}
            </h1>
            <p className="mt-5 text-body text-sm max-w-sm leading-relaxed">
              From concept to launch — modern websites with stunning visuals, seamless UX, and clean code.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Book a Call
                <HugeiconsIcon icon={Call02Icon} size={15} />
              </Link>
              <Link
                to="/work"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-background text-foreground text-sm font-medium border border-border hover:bg-foreground hover:text-background transition-colors"
              >
                View Work
                <HugeiconsIcon icon={ArrowRight01Icon} size={15} />
              </Link>
            </div>
          </div>

          {/* Right — hero image, hidden on mobile */}
          <div className="hidden lg:block lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-border hover-lift aspect-square">
              <img
                src={heroImage}
                alt="Featured work preview"
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Recent Work Marquee ───────────────────────────────── */}
      <section className="panel py-10 animate-fade-up delay-100 overflow-hidden">
        <div className="flex items-end justify-between mb-7 px-6 sm:px-12">
          <div>
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight">Recent work</h2>
            <p className="mt-1 text-xs text-body">Hover to pause · click to explore</p>
          </div>
          <Link
            to="/work"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-background border border-border text-sm font-medium hover:bg-foreground hover:text-background transition-colors"
          >
            All Work
            <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
          </Link>
        </div>

        <div className="relative group/marquee">
          {/* Left fade */}
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to right, var(--color-surface), transparent)" }} />
          {/* Right fade */}
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none"
            style={{ background: "linear-gradient(to left, var(--color-surface), transparent)" }} />

          <div className="flex gap-4 animate-marquee-slow group-hover/marquee:[animation-play-state:paused] w-max px-6 sm:px-12">
            {[...works, ...works].map((w, i) => (
              <Link
                to="/work/$id"
                params={{ id: w.id }}
                key={i}
                className="group/card relative w-[240px] sm:w-[340px] lg:w-[420px] shrink-0 rounded-2xl overflow-hidden bg-background border border-border hover-lift"
              >
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={w.image}
                    alt={w.title}
                    width={800}
                    height={600}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-foreground/40 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-background text-foreground text-xs font-medium translate-y-2 group-hover/card:translate-y-0 transition-transform duration-300">
                      View Project
                      <HugeiconsIcon icon={ArrowRight01Icon} size={13} />
                    </span>
                  </div>
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-background/90 backdrop-blur-sm text-xs font-medium">
                    {w.category}
                  </span>
                </div>
                <div className="px-4 py-3.5 flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm text-foreground">{w.title}</div>
                    <div className="text-xs text-body mt-0.5">{w.client} · {w.year}</div>
                  </div>
                  <HugeiconsIcon icon={ArrowRight01Icon} size={14} className="text-body group-hover/card:text-foreground transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────────────── */}
      <section id="services" className="panel px-6 sm:px-12 py-12 lg:py-16 animate-fade-up">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-body mb-2">What I do</p>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight">Services</h2>
          </div>
          <p className="text-body text-sm max-w-[220px] text-right hidden sm:block">
            Design, build, and scale — end to end.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {services.map((s, i) => (
            <div
              key={s.title}
              className="group rounded-2xl bg-background border border-border p-6 hover-lift flex gap-5 items-start"
              style={{ animationDelay: `${i * 55}ms` }}
            >
              <span className="h-11 w-11 rounded-xl bg-surface border border-border flex items-center justify-center shrink-0 group-hover:bg-foreground group-hover:border-foreground transition-colors">
                <HugeiconsIcon
                  icon={s.icon}
                  size={20}
                  className="text-foreground group-hover:text-background transition-colors"
                />
              </span>
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <h3 className="text-sm font-medium">{s.title}</h3>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-surface border border-border text-body">
                    {s.tag}
                  </span>
                </div>
                <p className="text-body text-sm leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Pricing ──────────────────────────────────────────── */}
      <section id="pricing" className="panel px-6 sm:px-12 py-12 lg:py-16 animate-fade-up">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-body mb-2">Investment</p>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight">Pricing</h2>
          </div>
          <p className="text-body text-sm max-w-[220px] text-right hidden sm:block">
            Simple, honest pricing for every stage.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tiers.map((t, i) => (
            <div
              key={t.name}
              className="rounded-2xl flex flex-col overflow-hidden"
              style={{
                animationDelay: `${i * 60}ms`,
                backgroundColor: t.featured ? "var(--color-foreground)" : "var(--color-background)",
                border: t.featured ? "none" : "1px solid var(--color-border)",
              }}
            >
              <div className="p-7 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-5">
                  <h3
                    className="text-base font-medium"
                    style={{ color: t.featured ? "var(--color-background)" : "var(--color-foreground)" }}
                  >
                    {t.name}
                  </h3>
                  {t.featured && (
                    <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-background/15 text-background">
                      Popular
                    </span>
                  )}
                </div>

                <div className="flex items-baseline gap-1 mb-2">
                  <span
                    className="text-4xl sm:text-5xl font-light tracking-tight"
                    style={{ color: t.featured ? "var(--color-background)" : "var(--color-foreground)" }}
                  >
                    {t.price}
                  </span>
                  <span
                    className="text-sm"
                    style={{ color: t.featured ? "var(--color-background)" : "var(--color-muted-foreground)", opacity: t.featured ? 0.6 : 1 }}
                  >
                    / {t.period}
                  </span>
                </div>
                <p
                  className="text-sm mb-7"
                  style={{ color: t.featured ? "var(--color-background)" : "var(--color-muted-foreground)", opacity: t.featured ? 0.65 : 1 }}
                >
                  {t.description}
                </p>

                <ul className="space-y-3 flex-1 mb-8">
                  {t.features.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-3 text-sm"
                      style={{ color: t.featured ? "var(--color-background)" : "var(--color-foreground)" }}
                    >
                      <span
                        className="h-7 w-7 rounded-lg flex items-center justify-center shrink-0"
                        style={{
                          backgroundColor: t.featured ? "rgba(255,255,255,0.12)" : "var(--color-surface)",
                          border: t.featured ? "1px solid rgba(255,255,255,0.15)" : "1px solid var(--color-border)",
                        }}
                      >
                        <HugeiconsIcon
                          icon={f.icon}
                          size={14}
                          style={{ color: t.featured ? "var(--color-background)" : "var(--color-foreground)" }}
                        />
                      </span>
                      <span style={{ opacity: t.featured ? 0.85 : 1 }}>{f.text}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all hover:opacity-90"
                  style={{
                    backgroundColor: t.featured ? "var(--color-background)" : "var(--color-foreground)",
                    color: t.featured ? "var(--color-foreground)" : "var(--color-background)",
                  }}
                >
                  {t.cta}
                  <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
                </Link>

                <p
                  className="mt-4 text-center text-xs"
                  style={{ color: t.featured ? "var(--color-background)" : "var(--color-muted-foreground)", opacity: t.featured ? 0.5 : 1 }}
                >
                  Need something custom?{" "}
                  <Link
                    to="/contact"
                    className="underline underline-offset-2"
                    style={{ color: "inherit" }}
                  >
                    Let's talk
                  </Link>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────── */}
      <section id="testimonials" className="panel px-6 sm:px-12 py-12 lg:py-16 animate-fade-up">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-body mb-2">Social proof</p>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight">Testimonials</h2>
          </div>
          <Link
            to="/testimonials"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-background border border-border text-sm font-medium hover:bg-foreground hover:text-background transition-colors"
          >
            All reviews
            <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
          </Link>
        </div>
        <TestimonialSlider />
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section id="faq" className="panel px-6 sm:px-12 py-12 lg:py-16 animate-fade-up">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <p className="text-xs font-semibold tracking-widest uppercase text-body mb-2">Questions</p>
            <h2 className="text-3xl sm:text-4xl font-light tracking-tight">FAQ</h2>
          </div>
          <p className="text-body text-sm max-w-[220px] text-right hidden sm:block">
            Answers to the things people ask most often.
          </p>
        </div>
        <div className="divide-y divide-border">
          {faqs.map((f, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={i} className="py-1">
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 text-left px-4 py-4 rounded-xl hover:bg-background transition-colors"
                >
                  <span className="font-medium text-foreground text-sm sm:text-base">{f.q}</span>
                  <span className="h-7 w-7 rounded-full bg-background border border-border flex items-center justify-center shrink-0">
                    <HugeiconsIcon icon={isOpen ? MinusSignIcon : PlusSignIcon} size={13} />
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-500 ease-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-4 pb-5 text-sm text-body leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="panel px-6 sm:px-12 py-16 lg:py-20 text-center animate-fade-up">
        <p className="text-xs font-semibold tracking-widest uppercase text-body mb-4">
          Currently available
        </p>
        <h2 className="text-4xl sm:text-5xl font-light tracking-tight max-w-md mx-auto">
          Have a project in mind?
        </h2>
        <p className="mt-4 text-body text-sm max-w-xs mx-auto leading-relaxed">
          I am taking on new work. Let's build something memorable together.
        </p>
        <Link
          to="/contact"
          className="mt-8 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Start a Project
          <HugeiconsIcon icon={ArrowRight01Icon} size={15} />
        </Link>
      </section>

    </SiteShell>
  );
}
