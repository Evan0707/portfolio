import type { ReactNode } from "react";
import type { IconName } from "@/studio/lib/site";
import { availability, contact, cta, routes, site } from "@/studio/lib/site";
import { gutter } from "@/studio/lib/ui";
import { StatusDot } from "../brand";
import { ContactForm } from "../contact-form";
import { CopyButton } from "../copy-button";
import { Icon } from "../icon";

export function Contact() {
  // Avec une clé Resend, le formulaire envoie lui-même l'e-mail ; sinon il
  // ouvre la messagerie du visiteur. Voir .env.example.
  const delivery = process.env.RESEND_API_KEY ? "server" : "mailto";

  return (
    <section id="contact" aria-labelledby="contact-title" className={`relative mt-[140px] md:mt-[240px] ${gutter}`}>
      {/* Deux lignes géantes, comme « PARLONS / ENSEMBLE » sur le portfolio. */}
      <h2 id="contact-title" data-reveal aria-label={cta.primary} className="font-heading text-[12vw] leading-none tracking-tight md:text-[8vw]">
        <span aria-hidden="true" className="block">
          {contact.title}
        </span>
        <span aria-hidden="true" className="-mt-2 block text-fg/20">
          {contact.titleMuted}
        </span>
      </h2>

      <p data-reveal className="mt-8 max-w-2xl text-lg leading-relaxed text-soft">
        {contact.lead}
      </p>

      <div className="mt-12 grid grid-cols-1 gap-12 md:mt-16 md:grid-cols-2 md:gap-20">
        {/* tout ce qu'un dirigeant veut savoir avant d'écrire */}
        <div data-reveal className="space-y-7">
          <Field icon="mail" label={contact.fields.email}>
            <a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center break-all text-lg text-fg/80 transition-colors hover:text-fg">
              {site.email}
            </a>
            <div>
              <CopyButton text={site.email} label="Copier l’adresse" doneLabel="Adresse copiée" />
            </div>
          </Field>

          <Field icon="calendar" label={contact.fields.availability}>
            <p className="flex items-center gap-2.5 text-lg text-fg/80">
              <StatusDot />
              {availability.headline}
            </p>
            <p className="mt-1.5 text-sm text-mute">{availability.detail}</p>
          </Field>

          <Field icon="pin" label={contact.fields.area}>
            <p className="text-lg text-fg/80">{site.area}</p>
            <p className="mt-1.5 text-sm text-mute">{contact.fields.areaDetail}</p>
          </Field>

          <Field icon="clock" label={contact.fields.reply}>
            <p className="text-lg text-fg/80">{contact.fields.replyValue}</p>
            <p className="mt-1.5 text-sm text-mute">{contact.fields.replyDetail}</p>
          </Field>
        </div>

        <div data-reveal>
          <ContactForm delivery={delivery} />
        </div>
      </div>

      <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2">
        <LinkCard icon="linkedin" title="LinkedIn" value={site.linkedin.label} href={site.linkedin.url} />
        <LinkCard icon="portfolio" title="Portfolio" value={site.portfolio.label} href={routes.portfolio} />
      </div>
    </section>
  );
}

function Field({ icon, label, children }: { icon: IconName; label: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-2 flex items-center gap-2 text-xs uppercase tracking-widest text-mute">
        <Icon name={icon} size={14} />
        {label}
      </p>
      {children}
    </div>
  );
}

function LinkCard({ icon, title, value, href }: { icon: IconName; title: string; value: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-reveal
      className="flex items-center justify-between gap-4 border border-line bg-card px-7 py-6 transition-colors hover:border-fg/30 hover:bg-fg/6"
    >
      <span className="flex min-w-0 items-center gap-3.5">
        <Icon name={icon} size={20} weight="fill" className="shrink-0 text-soft" />
        <span className="min-w-0">
          <span className="block text-lg font-semibold leading-7">{title}</span>
          <span className="block truncate text-[13px] leading-[18px] text-mute">{value}</span>
        </span>
      </span>
      <Icon name="arrow-out" size={20} className="shrink-0 text-soft" />
    </a>
  );
}
