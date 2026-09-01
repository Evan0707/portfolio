"use client"
import Image from 'next/image'
import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import { List, X, DownloadSimple, LinkedinLogo, ArrowDown } from '@phosphor-icons/react/dist/ssr'
import wave from '@/public/Layer_1 1.webp'
import ThemeToggle from '@/app/components/ThemeToggle'
import { profile, links } from '@/app/data/portfolio'

const NAV = [
  { href: '#home', label: 'Accueil' },
  { href: '#parcours', label: 'Parcours' },
  { href: '#projects', label: 'Projets' },
  { href: '#skills', label: 'Compétences' },
  { href: '#about', label: 'À propos' },
  { href: '#contact', label: 'Contact' },
]

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const [menuOpen, setMenuOpen] = useState(false)

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  // Les deux moitiés du mot s'écartent au scroll, libérant l'espace où le nom vit.
  const portY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -70])
  const folioY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 70])

  return (
    <header id="home" ref={ref} className="min-h-svh flex flex-col relative pt-11">
      {/* barre haute */}
      <div className="flex justify-between items-start px-[5vw] md:px-[7.3vw] pt-8">
        <ThemeToggle />
        <nav className="flex flex-col items-end z-50" aria-label="Menu principal">
          <button
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            className="p-1 -m-1 text-fg/70 hover:text-fg transition-colors cursor-pointer"
          >
            {menuOpen ? <X size={24} /> : <List size={24} />}
          </button>
          {menuOpen && (
            <ul className="flex flex-col items-end gap-2 mt-4 text-sm">
              {NAV.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={reduce ? false : { opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                >
                  <a
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-fg/70 hover:text-fg transition-colors tracking-wider uppercase"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          )}
        </nav>
      </div>

      {/* bloc central */}
      <div className="flex-1 flex flex-col justify-center items-center px-[5vw] py-12">
        <div className="relative">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ y: portY }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex items-baseline"
          >
            <span
              aria-hidden="true"
              className="font-[family-name:var(--font-dela-gothic-one)] text-[18vw] md:text-[12vw] leading-none tracking-tight"
            >
              PORT
            </span>
            <span
              aria-hidden="true"
              className="font-[family-name:var(--font-dela-gothic-one)] text-[18vw] md:text-[12vw] leading-none tracking-tight text-fg/20"
            >
              —
            </span>
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ y: folioY }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
            className="flex items-baseline justify-end -mt-4 md:-mt-8"
          >
            <span
              aria-hidden="true"
              className="font-[family-name:var(--font-dela-gothic-one)] text-[18vw] md:text-[12vw] leading-none tracking-tight relative z-10"
            >
              FOLIO
            </span>
          </motion.div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
            <Image src={wave} alt="" className="w-[35vw] md:w-[20vw] opacity-90" priority />
          </div>
        </div>

        {/* Le nom porte enfin du poids typographique — il était en sr-only. */}
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 font-[family-name:var(--font-dela-gothic-one)] text-[8vw] md:text-5xl leading-none tracking-tight text-center uppercase"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-2 text-fg/50 text-base md:text-lg text-center"
        >
          {profile.role} · {profile.school}
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          {/* <CvButton /> */}
          <LinkedinButton />
        </motion.div>
      </div>

      {/* bas de page */}
      <div className="flex justify-between items-end px-[5vw] md:px-[7.3vw] pb-8">
        <div className="text-xs text-fg/40 space-y-1">
          <p>Web Designer</p>
          <p>Web Developer</p>
        </div>
        <p className="text-xs text-fg/40 text-right">{profile.email}</p>
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <ArrowDown size={14} className="text-fg/30" />
        <span className="text-[10px] text-fg/30 tracking-widest">SCROLL</span>
      </motion.div>
    </header>
  )
}

/** Le PDF n'est pas encore dans /public : le bouton l'annonce au lieu de mentir. */
function CvButton() {
  const missing = links.cv.todo || !links.cv.value
  const className =
    'inline-flex items-center gap-2 px-8 py-3 text-sm tracking-wider uppercase transition-all duration-300'

  if (missing) {
    return (
      <span
        title={`À faire : déposer ${links.cvFileName} dans /public`}
        aria-disabled="true"
        className={`${className} bg-fg/40 text-bg cursor-not-allowed`}
      >
        <DownloadSimple size={16} weight="bold" />
        Télécharger le CV
      </span>
    )
  }

  return (
    <a href={links.cv.value!} download className={`${className} bg-fg text-bg hover:bg-fg/85`}>
      <DownloadSimple size={16} weight="bold" />
      Télécharger le CV
    </a>
  )
}

function LinkedinButton() {
  const missing = links.linkedin.todo || !links.linkedin.value
  const className =
    'inline-flex items-center gap-2 px-8 py-3 text-sm tracking-wider uppercase border transition-all duration-300'

  if (missing) {
    return (
      <span
        title="À faire : renseigner l'URL LinkedIn dans app/data/portfolio.ts"
        aria-disabled="true"
        className={`${className} border-fg/15 text-fg/30 cursor-not-allowed`}
      >
        <LinkedinLogo size={16} weight="bold" />
        LinkedIn
      </span>
    )
  }

  return (
    <a
      href={links.linkedin.value!}
      target="_blank"
      rel="noopener noreferrer"
      className={`${className} border-fg/30 text-fg/80 hover:bg-fg hover:text-bg`}
    >
      <LinkedinLogo size={16} weight="bold" />
      LinkedIn
    </a>
  )
}
