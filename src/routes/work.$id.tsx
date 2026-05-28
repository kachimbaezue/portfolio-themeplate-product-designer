import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Link04Icon,
  StarIcon,
} from "@hugeicons/core-free-icons";
import { SiteShell } from "@/components/site-shell";
import { works } from "@/data/works";
import { siteConfig } from "@/data/config";
import { getAvatarUrl } from "@/lib/avatar";

export const Route = createFileRoute("/work/$id")({
  loader: ({ params }) => {
    const work = works.find((w) => w.id === params.id);
    if (!work) throw notFound();
    return { work };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${(loaderData as any)?.work?.title ?? "Project"} — ${siteConfig.name}` },
      { name: "description", content: (loaderData as any)?.work?.about ?? "" },
    ],
  }),
  errorComponent: ({ error }) => (
    <SiteShell>
      <section className="panel px-6 sm:px-12 py-20 text-center animate-fade-up">
        <h1 className="text-[40px] font-light tracking-tight">Something went wrong</h1>
        <p className="mt-3 text-body text-sm">{error.message}</p>
        <Link
          to="/work"
          className="mt-6 inline-flex items-center gap-2 text-sm text-body hover:text-foreground transition-colors"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
          Back to Work
        </Link>
      </section>
    </SiteShell>
  ),
  component: WorkDetail,
});

function WorkDetail() {
  const { work } = Route.useLoaderData() as any;
  const idx = works.findIndex((w) => w.id === work.id);
  const next = works[(idx + 1) % works.length];
  const prev = works[(idx - 1 + works.length) % works.length];

  return (
    <SiteShell>
      {/* ── Header ───────────────────────────────────────────── */}
      <section className="panel px-6 sm:px-12 py-12 lg:py-16 animate-fade-up">
        <Link
          to="/work"
          className="inline-flex items-center gap-2 text-sm text-body hover:text-foreground transition-colors mb-8"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
          All Work
        </Link>

        <div className="grid lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-center gap-2 mb-5">
              <span className="px-3 py-1 rounded-full bg-background border border-border text-xs font-medium text-foreground">
                {work.category}
              </span>
              <span className="text-sm text-body">{work.year}</span>
            </div>
            <h1 className="text-[36px] sm:text-[56px] lg:text-[72px] leading-[1.05] font-light tracking-tight">
              {work.title}
            </h1>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <a
              href="#"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Preview
              <HugeiconsIcon icon={Link04Icon} size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* ── Details ──────────────────────────────────────────── */}
      <section className="panel px-6 sm:px-12 py-12 animate-fade-up delay-100">
        <div className="grid lg:grid-cols-12 gap-10">
          {/* Testimonial card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-surface border border-border p-7 h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <HugeiconsIcon key={i} icon={StarIcon} size={14} className="fill-current" />
                  ))}
                </div>
                <p className="text-base font-medium leading-relaxed text-foreground">
                  "Outstanding creativity and professional service — exceeded every expectation."
                </p>
              </div>
              <div className="mt-8 flex items-center gap-3">
                <img
                  src={getAvatarUrl(work.client)}
                  alt={work.client}
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <div className="text-sm font-medium">{work.client}</div>
                  <div className="text-xs text-body">Client</div>
                </div>
              </div>
            </div>
          </div>

          {/* Project meta */}
          <div className="lg:col-span-7">
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className="rounded-xl bg-background border border-border px-5 py-4">
                <div className="text-xs text-body mb-1.5 uppercase tracking-wider">Client</div>
                <div className="font-medium">{work.client}</div>
              </div>
              <div className="rounded-xl bg-background border border-border px-5 py-4">
                <div className="text-xs text-body mb-1.5 uppercase tracking-wider">Service</div>
                <div className="font-medium">{work.service}</div>
              </div>
              <div className="rounded-xl bg-background border border-border px-5 py-4">
                <div className="text-xs text-body mb-1.5 uppercase tracking-wider">Year</div>
                <div className="font-medium">{work.year}</div>
              </div>
              <div className="rounded-xl bg-background border border-border px-5 py-4">
                <div className="text-xs text-body mb-1.5 uppercase tracking-wider">Category</div>
                <div className="font-medium">{work.category}</div>
              </div>
            </div>
            <div>
              <div className="text-xs text-body uppercase tracking-wider mb-3">About</div>
              <p className="text-sm text-foreground leading-relaxed">{work.about}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Gallery ──────────────────────────────────────────── */}
      <section className="panel px-6 sm:px-12 py-12 animate-fade-up delay-200">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-lg font-medium">Gallery</h2>
          <span className="text-sm text-body">1 image</span>
        </div>
        <div className="rounded-2xl overflow-hidden bg-surface border border-border">
          <img
            src={work.image}
            alt={work.title}
            width={1200}
            height={800}
            loading="lazy"
            className="w-full aspect-[16/9] object-cover"
          />
        </div>
      </section>

      {/* ── Next / Prev ───────────────────────────────────────── */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-up delay-300">
        {prev && (
          <Link
            to="/work/$id"
            params={{ id: prev.id }}
            className="panel px-6 py-8 flex items-center gap-4 hover-lift group"
          >
            <span className="h-10 w-10 rounded-full bg-background border border-border flex items-center justify-center shrink-0 group-hover:bg-foreground group-hover:border-foreground transition-colors">
              <HugeiconsIcon
                icon={ArrowLeft01Icon}
                size={16}
                className="text-foreground group-hover:text-background transition-colors"
              />
            </span>
            <div className="min-w-0">
              <div className="text-xs text-body mb-0.5">Previous</div>
              <div className="font-medium truncate">{prev.title}</div>
            </div>
          </Link>
        )}
        {next && (
          <Link
            to="/work/$id"
            params={{ id: next.id }}
            className="panel px-6 py-8 flex items-center justify-between gap-4 hover-lift group sm:col-start-2"
          >
            <div className="min-w-0">
              <div className="text-xs text-body mb-0.5">Next</div>
              <div className="font-medium truncate">{next.title}</div>
            </div>
            <span className="h-10 w-10 rounded-full bg-background border border-border flex items-center justify-center shrink-0 group-hover:bg-foreground group-hover:border-foreground transition-colors">
              <HugeiconsIcon
                icon={ArrowRight01Icon}
                size={16}
                className="text-foreground group-hover:text-background transition-colors"
              />
            </span>
          </Link>
        )}
      </section>
    </SiteShell>
  );
}
