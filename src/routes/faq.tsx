import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlusSignIcon, MinusSignIcon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { SiteShell } from "@/components/site-shell";
import { siteConfig } from "@/data/config";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: `FAQ — ${siteConfig.name}` },
      { name: "description", content: `Answers to common questions about working with ${siteConfig.name}.` },
      { property: "og:title", content: `FAQ — ${siteConfig.name}` },
      { property: "og:description", content: `Answers to common questions about working with ${siteConfig.name}.` },
    ],
  }),
  component: FAQ,
});

const faqs = [
  {
    q: "What does a typical project look like?",
    a: "We start with a kickoff call to align on goals, then move through discovery, design, and build phases. Most projects wrap up in 2–6 weeks depending on scope.",
  },
  {
    q: "Do you work with international clients?",
    a: "Yes — I collaborate with clients across timezones. Async-first with weekly sync calls works well for most teams.",
  },
  {
    q: "What tools do you design and build in?",
    a: "Figma for design, and React/Next.js, Webflow, or Framer for the build — depending on what fits your stack and goals.",
  },
  {
    q: "Can you handle branding from scratch?",
    a: "Absolutely. Full brand identity work — logo, type system, colour palette, and brand guidelines — is available as part of a dedicated engagement.",
  },
  {
    q: "How do payments work?",
    a: "50% upfront to reserve your slot, 50% on delivery. Larger engagements can be split into monthly milestones.",
  },
  {
    q: "Do you offer ongoing support after launch?",
    a: "Yes — monthly retainers are available for clients who want continuous design, updates, and iteration support.",
  },
  {
    q: "What if I'm not happy with the result?",
    a: "Revisions are built into every project. I work closely with you throughout so there are no surprises — and I won't consider a project done until you're genuinely happy.",
  },
  {
    q: "How do I get started?",
    a: "Just reach out via the contact page or book a 30-minute call. We'll talk through your project and I'll send over a proposal within 48 hours.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <SiteShell>
      <section className="panel px-6 sm:px-12 py-12 lg:py-16 animate-fade-up text-center">
        <h1 className="text-[40px] sm:text-[60px] leading-[1.05] font-light tracking-tight">
          Frequently asked
        </h1>
        <p className="mt-4 text-body text-sm max-w-md mx-auto">
          Answers to the things people ask most often. Got something else?{" "}
          <Link to="/contact" className="underline underline-offset-2 hover:text-foreground transition-colors">
            Reach out anytime.
          </Link>
        </p>
      </section>

      <section className="panel p-3 sm:p-4 animate-fade-up delay-100">
        <div className="divide-y divide-border">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="py-1">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 text-left px-4 py-4 rounded-xl hover:bg-background transition-colors"
                >
                  <span className="font-medium text-foreground text-sm sm:text-base">
                    {f.q}
                  </span>
                  <span className="h-7 w-7 rounded-full bg-background flex items-center justify-center shrink-0">
                    <HugeiconsIcon icon={isOpen ? MinusSignIcon : PlusSignIcon} size={14} />
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

      {/* CTA */}
      <section className="panel px-6 sm:px-12 py-12 text-center animate-fade-up delay-200">
        <p className="text-sm text-body mb-3">Still have questions?</p>
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
        >
          Get in touch
          <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
        </Link>
      </section>
    </SiteShell>
  );
}
