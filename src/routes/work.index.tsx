import { createFileRoute, Link } from "@tanstack/react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { SiteShell } from "@/components/site-shell";
import { works } from "@/data/works";
import { siteConfig } from "@/data/config";

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title: `Work — ${siteConfig.name}` },
      { name: "description", content: `Selected projects by ${siteConfig.name} across web, mobile, and brand design.` },
      { property: "og:title", content: `Work — ${siteConfig.name}` },
      { property: "og:description", content: `Selected projects by ${siteConfig.name} across web, mobile, and brand design.` },
    ],
  }),
  component: Work,
});

function Work() {
  return (
    <SiteShell>
      {/* Header */}
      <section className="panel px-6 sm:px-12 py-12 lg:py-16 animate-fade-up">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <div>
            <h1 className="text-[40px] sm:text-[60px] leading-[1.05] font-light tracking-tight">
              Work
            </h1>
            <p className="mt-3 text-body text-sm max-w-sm">
              Selected projects across web, mobile, and brand design.
            </p>
          </div>
          <div className="text-sm text-body">
            {works.length} projects
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-up delay-100">
        {works.map((w, i) => (
          <Link
            to="/work/$id"
            params={{ id: w.id }}
            key={w.id}
            className="group panel overflow-hidden hover-lift"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-t-[22px]">
              <img
                src={w.image}
                alt={w.title}
                width={800}
                height={600}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-foreground/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-background text-foreground text-sm font-medium translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  View Project
                  <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
                </span>
              </div>
              {/* Category pill */}
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-background/90 backdrop-blur-sm text-xs font-medium text-foreground">
                {w.category}
              </span>
            </div>

            {/* Meta */}
            <div className="flex items-center justify-between px-6 py-5">
              <div>
                <div className="font-medium text-foreground">{w.title}</div>
                <div className="text-sm text-body mt-0.5">{w.client} · {w.year}</div>
              </div>
              <span className="h-9 w-9 rounded-full bg-background border border-border flex items-center justify-center group-hover:bg-foreground group-hover:border-foreground transition-colors">
                <HugeiconsIcon
                  icon={ArrowRight01Icon}
                  size={16}
                  className="text-foreground group-hover:text-background transition-colors"
                />
              </span>
            </div>
          </Link>
        ))}
      </section>
    </SiteShell>
  );
}
