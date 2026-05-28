import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  NewTwitterIcon,
  Linkedin02Icon,
  Github01Icon,
  DribbbleIcon,
  Mail01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons";
import { SiteShell } from "@/components/site-shell";
import { siteConfig } from "@/data/config";
import { toast } from "sonner";
import { getCalApi } from "@calcom/embed-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact — ${siteConfig.name}` },
      { name: "description", content: `Get in touch with ${siteConfig.name} to start your next project.` },
      { property: "og:title", content: `Contact — ${siteConfig.name}` },
      { property: "og:description", content: `Get in touch with ${siteConfig.name} to start your next project.` },
    ],
  }),
  component: Contact,
});

const socials = [
  {
    label: "X / Twitter",
    sublabel: "@yourhandle",
    icon: NewTwitterIcon,
    href: siteConfig.socials.x,
    color: "#000000",
  },
  {
    label: "LinkedIn",
    sublabel: "Connect professionally",
    icon: Linkedin02Icon,
    href: siteConfig.socials.linkedin,
    color: "#0A66C2",
  },
  {
    label: "Dribbble",
    sublabel: "Design shots & work",
    icon: DribbbleIcon,
    href: siteConfig.socials.dribbble,
    color: "#EA4C89",
  },
  {
    label: "GitHub",
    sublabel: "Open source & code",
    icon: Github01Icon,
    href: siteConfig.socials.github,
    color: "#333333",
  },
];

function Contact() {
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!siteConfig.calLink) return;
    (async function () {
      const cal = await getCalApi({ namespace: "30min" });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Message sent! I'll be in touch soon.");
      (e.target as HTMLFormElement).reset();
    }, 800);
  }

  return (
    <SiteShell>
      {/* Header */}
      <section className="panel px-6 sm:px-12 py-12 lg:py-16 animate-fade-up">
        <h1 className="text-[40px] sm:text-[60px] leading-[1.05] font-light tracking-tight">
          Let's talk.
        </h1>
        <p className="mt-4 text-body max-w-md">
          Have a project in mind or just want to say hello? Reach out — I'd love to hear from you.
        </p>
      </section>

      {/* Email CTA */}
      <a
        href={`mailto:${siteConfig.email}`}
        className="panel px-6 sm:px-12 py-8 flex items-center justify-between gap-4 hover:bg-foreground hover:text-background group transition-colors animate-fade-up delay-100"
      >
        <div className="flex items-center gap-4">
          <span className="h-11 w-11 rounded-xl bg-background group-hover:bg-background/10 flex items-center justify-center transition-colors">
            <HugeiconsIcon icon={Mail01Icon} size={20} />
          </span>
          <div>
            <div className="font-medium text-sm">Send an email</div>
            <div className="text-body text-sm group-hover:text-background/60 transition-colors">{siteConfig.email}</div>
          </div>
        </div>
        <HugeiconsIcon icon={ArrowRight01Icon} size={18} className="text-body group-hover:text-background group-hover:translate-x-1 transition-all" />
      </a>

      {/* Book a call */}
      {siteConfig.calLink && (
        <section className="panel px-6 sm:px-10 py-10 animate-fade-up delay-200">
          <h2 className="text-xl font-medium mb-1.5">Book a call</h2>
          <p className="text-body text-sm max-w-sm mb-6">
            Prefer to chat? Grab a 30-minute slot on my calendar.
          </p>
          <button
            data-cal-namespace="30min"
            data-cal-link={siteConfig.calLink}
            data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-background border border-border text-sm font-medium hover:bg-foreground hover:text-background transition-colors"
          >
            Schedule 30-min call
            <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
          </button>
        </section>
      )}

      {/* Social links */}
      <section className="animate-fade-up delay-300">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {socials.filter((s) => s.href).map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="panel px-5 py-5 flex items-center gap-4 hover:bg-foreground hover:text-background group transition-colors"
            >
              <span
                className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0 transition-colors"
                style={{ backgroundColor: `${s.color}15` }}
              >
                <HugeiconsIcon icon={s.icon} size={18} style={{ color: s.color }} className="group-hover:text-background transition-colors" />
              </span>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm">{s.label}</div>
                <div className="text-xs text-body group-hover:text-background/60 transition-colors truncate">{s.sublabel}</div>
              </div>
              <HugeiconsIcon icon={ArrowRight01Icon} size={16} className="text-body group-hover:text-background group-hover:translate-x-0.5 transition-all shrink-0" />
            </a>
          ))}
        </div>
      </section>

      {/* Contact form */}
      <section className="panel px-6 sm:px-10 py-10 animate-fade-up delay-400">
        <h2 className="text-xl font-medium mb-1.5">Send a message</h2>
        <p className="text-body text-sm mb-7">I'll get back to you within 24 hours.</p>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor="name" className="text-sm font-medium">Name</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm placeholder:text-body focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-shadow"
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm placeholder:text-body focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-shadow"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <label htmlFor="message" className="text-sm font-medium">Message</label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              placeholder="Tell me about your project..."
              className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm placeholder:text-body focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-shadow resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={sending}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {sending ? "Sending…" : "Send message"}
            {!sending && <HugeiconsIcon icon={ArrowRight01Icon} size={14} />}
          </button>
        </form>
      </section>
    </SiteShell>
  );
}
