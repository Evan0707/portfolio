"use server";

import { cleanContact, composeMail, validateContact } from "@/studio/lib/contact";
import { site } from "@/studio/lib/site";

export type ContactResult = { ok: true } | { ok: false; reason: "invalid" | "unavailable" };

/**
 * Envoie la demande de contact par e-mail, via l'API Resend.
 *
 * Actif seulement si RESEND_API_KEY est définie (voir .env.example) : c'est la
 * clé qu'utilise déjà le formulaire du portfolio (app/api/contact). Sans clé,
 * le formulaire ne passe pas par ici : il ouvre la messagerie du visiteur.
 *
 * Une Server Action est une adresse publique : tout ce qui arrive est donc
 * nettoyé et revalidé ici, quoi qu'ait vérifié le navigateur.
 */
export async function sendContact(input: unknown): Promise<ContactResult> {
  const data = cleanContact(input);

  // Champ piège rempli : un robot. On répond « oui » pour ne rien lui apprendre.
  if (data.site_web) return { ok: true };

  if (Object.keys(validateContact(data)).length > 0) return { ok: false, reason: "invalid" };

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: false, reason: "unavailable" };

  const mail = composeMail(data);

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // Par défaut, le même domaine d'envoi que le formulaire du portfolio.
        from: process.env.CONTACT_FROM ?? `${site.name} <contact@evan-g.com>`,
        to: [process.env.CONTACT_TO ?? site.email],
        reply_to: data.email,
        subject: mail.subject,
        text: mail.body,
      }),
    });

    if (!response.ok) {
      console.error("[contact] Resend a refusé l'envoi :", response.status, await response.text());
      return { ok: false, reason: "unavailable" };
    }
    return { ok: true };
  } catch (error) {
    console.error("[contact] Envoi impossible :", error);
    return { ok: false, reason: "unavailable" };
  }
}
