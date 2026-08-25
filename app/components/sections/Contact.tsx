"use client"
import { useState, type FormEvent, type ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import {
  EnvelopeSimple,
  MapPin,
  Translate,
  CalendarCheck,
  LinkedinLogo,
  FilePdf,
  ArrowUpRight,
  DownloadSimple,
  CircleNotch,
} from '@phosphor-icons/react/dist/ssr'
import MagneticButton from '@/app/components/MagneticButton'
import { profile, availability, links } from '@/app/data/portfolio'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function Contact() {
  const reduce = useReducedMotion()
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [feedback, setFeedback] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!email || !message) {
      setStatus('error')
      setFeedback('Veuillez remplir tous les champs.')
      return
    }

    setStatus('loading')
    setFeedback('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, message }),
      })
      const data = await response.json()

      if (response.ok) {
        setStatus('success')
        setFeedback('Message envoyé ! Je vous répondrai très bientôt.')
        setEmail('')
        setMessage('')
      } else {
        setStatus('error')
        setFeedback(data?.error ?? "Une erreur est survenue. Réessayez.")
      }
    } catch {
      setStatus('error')
      setFeedback('Impossible d’envoyer le message. Réessayez plus tard.')
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="mt-[200px] md:mt-[350px] mb-[200px] px-[5vw] md:px-[7.3vw]"
    >
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2
          id="contact-title"
          className="font-[family-name:var(--font-dela-gothic-one)] text-[12vw] md:text-[8vw] leading-none tracking-tight"
        >
          PARLONS
        </h2>
        <p className="font-[family-name:var(--font-dela-gothic-one)] text-[12vw] md:text-[8vw] leading-none tracking-tight text-fg/20 -mt-2">
          ENSEMBLE
        </p>
      </motion.div>

      <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
        {/* tout ce qu'un recruteur doit savoir avant de décider */}
        <div className="space-y-7">
          <Field icon={<EnvelopeSimple size={14} />} label="Email">
            <a href={`mailto:${profile.email}`} className="text-lg text-fg/80 hover:text-fg transition-colors">
              {profile.email}
            </a>
          </Field>

          <Field icon={<CalendarCheck size={14} />} label="Alternance">
            <p className="flex items-center gap-2.5 text-lg text-fg/80">
              <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
                <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              {availability.short}
            </p>
            <p className="mt-1.5 text-sm text-fg/40">
              {availability.detail}
              {' · '}
              <span className={availability.rhythm.todo ? 'text-fg/25 italic' : undefined}>
                {availability.rhythm.value}
              </span>
            </p>
          </Field>

          <Field icon={<MapPin size={14} />} label="Localisation & mobilité">
            <p className="text-lg text-fg/80">{profile.location}</p>
            <p className="mt-1.5 text-sm text-fg/40">{profile.mobility}</p>
          </Field>

          <Field icon={<Translate size={14} />} label="Langues">
            <p className="text-lg text-fg/80">{profile.languages}</p>
          </Field>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="contact-email" className="block mb-2 text-xs uppercase tracking-widest text-fg/40">
              Votre email
            </label>
            <input
              id="contact-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'loading'}
              placeholder="hello@exemple.com"
              required
              className="w-full bg-transparent border-b border-fg/20 pb-3 text-fg placeholder:text-fg/30 focus:border-fg/60 focus:outline-none transition-colors disabled:opacity-50"
            />
          </div>

          <div>
            <label htmlFor="contact-message" className="block mb-2 text-xs uppercase tracking-widest text-fg/40">
              Message
            </label>
            <textarea
              id="contact-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={status === 'loading'}
              placeholder="Parlez-moi de votre projet..."
              required
              className="w-full h-32 resize-none bg-transparent border-b border-fg/20 pb-3 text-fg placeholder:text-fg/30 focus:border-fg/60 focus:outline-none transition-colors disabled:opacity-50"
            />
          </div>

          {feedback && (
            <p
              role="status"
              className={`text-sm ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}
            >
              {feedback}
            </p>
          )}

          <MagneticButton
            type="submit"
            disabled={status === 'loading'}
            className="mt-4 inline-flex items-center gap-2 border border-fg/30 px-8 py-3 text-sm uppercase tracking-wider text-fg/80 transition-all duration-300 hover:bg-fg hover:text-bg disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-fg/80"
          >
            {status === 'loading' ? (
              <>
                <CircleNotch size={16} className="animate-spin" />
                Envoi...
              </>
            ) : (
              'Envoyer'
            )}
          </MagneticButton>
        </form>
      </div>

      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8">
        <LinkCard
          icon={<LinkedinLogo size={20} weight="fill" />}
          title="LinkedIn"
          value={links.linkedin.todo ? 'à renseigner' : links.linkedinLabel}
          href={links.linkedin.todo ? null : links.linkedin.value}
          hint="À faire : renseigner l'URL LinkedIn dans app/data/portfolio.ts"
          trailing={<ArrowUpRight size={20} />}
        />
        <LinkCard
          icon={<FilePdf size={20} weight="fill" />}
          title="CV"
          value={links.cvFileName}
          href={links.cv.todo ? null : links.cv.value}
          download
          hint={`À faire : déposer ${links.cvFileName} dans /public`}
          trailing={<DownloadSimple size={20} />}
        />
      </div>

      <footer className="mt-24 pt-8 border-t border-fg/10 flex flex-wrap items-center justify-between gap-4 text-xs text-fg/30">
        <p>© 2026 {profile.name}</p>
        <p className="flex gap-6">
          {links.linkedin.todo ? (
            <span className="text-fg/15">LinkedIn</span>
          ) : (
            <a
              href={links.linkedin.value!}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-fg/60 transition-colors"
            >
              LinkedIn
            </a>
          )}
          {links.cv.todo ? (
            <span className="text-fg/15">CV (PDF)</span>
          ) : (
            <a href={links.cv.value!} download className="hover:text-fg/60 transition-colors">
              CV (PDF)
            </a>
          )}
        </p>
      </footer>
    </section>
  )
}

function Field({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div>
      <p className="mb-2 flex items-center gap-2 text-xs uppercase tracking-widest text-fg/40">
        {icon}
        {label}
      </p>
      {children}
    </div>
  )
}

function LinkCard({
  icon,
  title,
  value,
  href,
  hint,
  trailing,
  download,
}: {
  icon: ReactNode
  title: string
  value: string
  href?: string | null
  hint: string
  trailing: ReactNode
  download?: boolean
}) {
  const inner = (
    <>
      <span className="flex items-center gap-3.5 min-w-0">
        <span className={href ? 'text-fg/60' : 'text-fg/20'}>{icon}</span>
        <span className="min-w-0">
          <span className="block text-lg font-semibold leading-7">{title}</span>
          <span className={`block truncate text-[13px] leading-[18px] ${href ? 'text-fg/40' : 'text-fg/20 italic'}`}>
            {value}
          </span>
        </span>
      </span>
      <span className={href ? 'text-fg/50' : 'text-fg/15'}>{trailing}</span>
    </>
  )

  const className =
    'flex items-center justify-between gap-4 border border-fg/10 bg-fg/3 px-7 py-6 transition-colors'

  if (!href) {
    return (
      <div title={hint} aria-disabled="true" className={`${className} cursor-not-allowed`}>
        {inner}
      </div>
    )
  }

  return (
    <a
      href={href}
      {...(download ? { download: true } : { target: '_blank', rel: 'noopener noreferrer' })}
      className={`${className} hover:border-fg/30 hover:bg-fg/6`}
    >
      {inner}
    </a>
  )
}
