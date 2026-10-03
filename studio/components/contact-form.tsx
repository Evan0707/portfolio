"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { sendContact } from "@/app/studio/actions";
import {
  cleanContact,
  composeMail,
  mailLinks,
  validateContact,
  type ContactErrors,
  type ContactField,
  type Mail,
} from "@/studio/lib/contact";
import { contact, routes, site } from "@/studio/lib/site";
import { CopyButton } from "./copy-button";
import { Magnetic } from "./effects/magnetic";
import { Icon } from "./icon";
import { buttonClasses } from "./ui/button-link";

type Props = {
  /**
   * "server" : la demande part par e-mail depuis le serveur (clé Resend présente).
   * "mailto" : le formulaire ouvre la messagerie du visiteur, message déjà rédigé.
   */
  delivery: "server" | "mailto";
};

type Status = { tone: "success" | "error"; message: string } | null;

const FIELD_ORDER: ContactField[] = ["nom", "email", "message"];

// Les champs du portfolio : un simple filet sous la saisie.
const label = "mb-2 block text-xs uppercase tracking-widest text-mute";
const input =
  "min-h-11 w-full border-b border-fg/20 bg-transparent pb-3 pt-2 text-fg transition-colors placeholder:text-fg/40 hover:border-fg/40 focus:border-fg focus:outline-none aria-[invalid]:border-danger";
const optional = "ml-1.5 normal-case tracking-normal text-fg/40";
const fallbackLink = "inline-flex min-h-11 items-center border border-fg/20 px-4 text-xs uppercase tracking-wider text-soft transition-colors hover:border-fg hover:text-fg";

export function ContactForm({ delivery }: Props) {
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>(null);
  /** Le message prêt à partir, gardé pour proposer d'autres façons de l'envoyer. */
  const [mail, setMail] = useState<Mail | null>(null);
  const [pending, startTransition] = useTransition();

  const links = mail ? mailLinks(site.email, mail) : null;

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = cleanContact(Object.fromEntries(new FormData(form)));

    const found = validateContact(data);
    setErrors(found);
    const firstInvalid = FIELD_ORDER.find((field) => found[field]);
    if (firstInvalid) {
      setStatus({ tone: "error", message: "Il manque une information pour que je puisse vous répondre." });
      form.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    const composed = composeMail(data);

    if (delivery === "mailto") {
      setMail(composed);
      setStatus({
        tone: "success",
        message: "Votre messagerie s’ouvre avec le message prêt à partir : il ne reste qu’à cliquer sur « Envoyer ».",
      });
      window.location.href = mailLinks(site.email, composed).mailto;
      return;
    }

    startTransition(async () => {
      const result = await sendContact(data).catch(() => ({ ok: false as const }));
      if (result.ok) {
        form.reset();
        setMail(null);
        setStatus({ tone: "success", message: "Message bien reçu. Je vous réponds sous 24 h ouvrées." });
      } else {
        setMail(composed);
        setStatus({
          tone: "error",
          message: "L’envoi n’a pas abouti. Votre message n’est pas perdu : envoyez-le depuis votre messagerie.",
        });
      }
    });
  };

  const clearError = (event: React.FormEvent<HTMLFormElement>) => {
    const name = (event.target as HTMLInputElement).name as ContactField;
    if (errors[name]) setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const errorProps = (field: ContactField) => ({
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? `erreur-${field}` : undefined,
  });

  const fieldError = (field: ContactField) =>
    errors[field] && (
      <p id={`erreur-${field}`} className="mt-2 text-sm text-danger">
        {errors[field]}
      </p>
    );

  return (
    <div>
      <form
        // Sans JavaScript, le navigateur ouvre quand même la messagerie.
        action={`mailto:${site.email}`}
        method="post"
        encType="text/plain"
        noValidate
        onSubmit={onSubmit}
        onInput={clearError}
        className="space-y-7"
      >
        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-8">
          <div>
            <label htmlFor="champ-nom" className={label}>
              Prénom et nom
            </label>
            <input id="champ-nom" name="nom" type="text" autoComplete="name" required className={input} {...errorProps("nom")} />
            {fieldError("nom")}
          </div>
          <div>
            <label htmlFor="champ-entreprise" className={label}>
              Entreprise <span className={optional}>facultatif</span>
            </label>
            <input id="champ-entreprise" name="entreprise" type="text" autoComplete="organization" className={input} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 sm:gap-8">
          <div>
            <label htmlFor="champ-email" className={label}>
              E-mail
            </label>
            <input
              id="champ-email"
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="vous@entreprise.fr"
              required
              className={input}
              {...errorProps("email")}
            />
            {fieldError("email")}
          </div>
          <div>
            <label htmlFor="champ-telephone" className={label}>
              Téléphone <span className={optional}>facultatif</span>
            </label>
            <input id="champ-telephone" name="telephone" type="tel" inputMode="tel" autoComplete="tel" className={input} />
          </div>
        </div>

        <fieldset>
          <legend className={label}>
            Votre projet <span className={optional}>facultatif</span>
          </legend>
          <div className="flex flex-wrap gap-2">
            {contact.projectKinds.map((kind) => (
              <label key={kind} className="relative cursor-pointer">
                <input type="radio" name="projet" value={kind} className="peer absolute inset-0 cursor-pointer opacity-0" />
                <span className="inline-flex min-h-11 items-center border border-fg/20 px-3.5 text-[13px] text-soft transition-colors hover:border-fg/40 peer-checked:border-fg peer-checked:bg-fg peer-checked:text-bg peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-fg">
                  {kind}
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor="champ-message" className={label}>
            Votre besoin, en quelques lignes
          </label>
          <textarea
            id="champ-message"
            name="message"
            required
            placeholder={contact.messagePlaceholder}
            className={`${input} h-32 resize-none`}
            {...errorProps("message")}
          />
          {fieldError("message")}
        </div>

        {/* Champ piège : hors de vue pour les humains, tentant pour les robots. */}
        <div aria-hidden="true" className="absolute h-px w-px overflow-hidden whitespace-nowrap [clip-path:inset(50%)]">
          <label>
            Ne pas remplir ce champ
            <input type="text" name="site_web" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <p role="status" className={`text-sm empty:hidden ${status?.tone === "error" ? "text-danger" : "text-success"}`}>
          {status?.message}
        </p>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <Magnetic>
            <button
              type="submit"
              disabled={pending}
              className={`${buttonClasses.base} ${buttonClasses.outline} cursor-pointer disabled:cursor-not-allowed disabled:opacity-50`}
            >
              {pending ? (
                <>
                  <Icon name="spinner" size={16} className="animate-spin" />
                  Envoi…
                </>
              ) : (
                <>
                  Envoyer ma demande
                  <Icon name="arrow" size={15} weight="bold" />
                </>
              )}
            </button>
          </Magnetic>
          <p className="max-w-[17rem] text-xs leading-[18px] text-mute">
            Vos informations ne servent qu’à vous répondre.{" "}
            <Link href={`${routes.legal}#donnees`} className="underline underline-offset-2 transition-colors hover:text-fg">
              En savoir plus
            </Link>
          </p>
        </div>
      </form>

      {links && mail && (
        <div className="mt-8 border border-line bg-card px-6 py-5">
          <p className="text-sm text-soft">
            {delivery === "mailto"
              ? "Rien ne s’est ouvert ? Envoyez le même message autrement :"
              : "Votre message est prêt. Envoyez-le par le moyen qui vous convient :"}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <a className={fallbackLink} href={links.mailto}>
              Ma messagerie
            </a>
            <a className={fallbackLink} href={links.gmail} target="_blank" rel="noopener noreferrer">
              Gmail
            </a>
            <a className={fallbackLink} href={links.outlook} target="_blank" rel="noopener noreferrer">
              Outlook
            </a>
            <CopyButton
              className="ml-2"
              text={`À : ${site.email}\nObjet : ${mail.subject}\n\n${mail.body}`}
              label="Copier le message"
              doneLabel="Message copié"
            />
          </div>
        </div>
      )}
    </div>
  );
}
