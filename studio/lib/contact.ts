/**
 * Règles du formulaire de contact, partagées par le navigateur et le serveur :
 * la même validation des deux côtés, le même message au final.
 */

export type ContactPayload = {
  nom: string;
  entreprise: string;
  email: string;
  telephone: string;
  projet: string;
  message: string;
  /** Champ piège, invisible : seul un robot le remplit. */
  site_web: string;
};

export type ContactField = "nom" | "email" | "message";
export type ContactErrors = Partial<Record<ContactField, string>>;
export type Mail = { subject: string; body: string };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const LIMITS: Record<keyof ContactPayload, number> = {
  nom: 120,
  entreprise: 160,
  email: 200,
  telephone: 40,
  projet: 80,
  message: 5000,
  site_web: 200,
};

/** Ramène n'importe quelle entrée à des chaînes propres et bornées. */
export function cleanContact(input: unknown): ContactPayload {
  const source = (typeof input === "object" && input !== null ? input : {}) as Record<string, unknown>;
  const read = (key: keyof ContactPayload) => {
    const value = source[key];
    return (typeof value === "string" ? value : "").trim().slice(0, LIMITS[key]);
  };
  return {
    nom: read("nom"),
    entreprise: read("entreprise"),
    email: read("email"),
    telephone: read("telephone"),
    projet: read("projet"),
    message: read("message"),
    site_web: read("site_web"),
  };
}

export function validateContact(data: ContactPayload): ContactErrors {
  const errors: ContactErrors = {};
  if (!data.nom) errors.nom = "Indiquez votre nom, pour que je sache à qui répondre.";
  if (!data.email) errors.email = "Indiquez votre e-mail, pour que je puisse vous répondre.";
  else if (!EMAIL.test(data.email)) errors.email = "Cette adresse e-mail semble incomplète.";
  if (!data.message) errors.message = "Décrivez votre besoin en quelques mots.";
  return errors;
}

export function composeMail(data: ContactPayload): Mail {
  const lines = ["Bonjour Evan,", "", data.message, "", "—", `Nom : ${data.nom}`];
  if (data.entreprise) lines.push(`Entreprise : ${data.entreprise}`);
  lines.push(`E-mail : ${data.email}`);
  if (data.telephone) lines.push(`Téléphone : ${data.telephone}`);
  if (data.projet) lines.push(`Type de projet : ${data.projet}`);

  return {
    subject: `Demande de projet — ${data.entreprise || data.nom}`,
    body: lines.join("\n"),
  };
}

/** Liens qui ouvrent un message déjà rédigé dans la messagerie du visiteur. */
export function mailLinks(to: string, mail: Mail) {
  const recipient = encodeURIComponent(to);
  const subject = encodeURIComponent(mail.subject);
  const body = encodeURIComponent(mail.body);
  return {
    mailto: `mailto:${to}?subject=${subject}&body=${body}`,
    gmail: `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${subject}&body=${body}`,
    outlook: `https://outlook.office.com/mail/deeplink/compose?to=${recipient}&subject=${subject}&body=${body}`,
  };
}
