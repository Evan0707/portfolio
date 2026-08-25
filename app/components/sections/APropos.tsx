"use client"
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { UserFocus, ArrowRight } from '@phosphor-icons/react/dist/ssr'
import AnimatedCounter from '@/app/components/AnimatedCounter'
import SectionTitle from '@/app/components/ui/SectionTitle'
import { profile, bio, lookingFor, stats } from '@/app/data/portfolio'

export default function APropos() {
  const reduce = useReducedMotion()

  return (
    <section id="about" aria-labelledby="about-title" className="mt-[200px] md:mt-[350px] px-[5vw] md:px-[7.3vw]">
      <SectionTitle id="about-title">À PROPOS</SectionTitle>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-[380px_minmax(0,1fr)] gap-10 md:gap-14">
        <Portrait />

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h3 className="text-3xl md:text-4xl font-[family-name:var(--font-dela-gothic-one)] leading-tight">
            Passionné par le code
            <br />
            <span className="text-fg/40">&amp; le design.</span>
          </h3>

          {bio.map((p) => (
            <p
              key={p.text.slice(0, 24)}
              className={p.lead ? 'text-lg leading-relaxed text-fg/70' : 'text-base leading-relaxed text-fg/50'}
            >
              {p.text}
            </p>
          ))}

          <LookingFor />
        </motion.div>
      </div>

      {/* Chiffres vérifiables — les « 3+ ans avec React » contredisaient le CV. */}
      <div className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={reduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="border border-fg/10 p-6 hover:border-fg/30 transition-colors"
          >
            <p className="text-4xl font-[family-name:var(--font-dela-gothic-one)]">
              {s.animated && typeof s.value === 'number' ? (
                <AnimatedCounter end={s.value} suffix={s.suffix} duration={1600} />
              ) : (
                s.value
              )}
            </p>
            <p className="mt-2 text-sm text-fg/40">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

/** Portrait manquant : on montre l'emplacement plutôt que de le passer sous silence. */
function Portrait() {
  if (!profile.portrait.todo && profile.portrait.value) {
    return (
      <div className="relative aspect-[4/5] overflow-hidden border border-fg/10">
        <Image
          src={profile.portrait.value}
          alt={`Portrait d’${profile.name}`}
          fill
          sizes="(max-width: 768px) 90vw, 380px"
          className="object-cover"
          priority={false}
        />
      </div>
    )
  }

  return (
    <div
      title="À faire : déposer le portrait dans /public puis renseigner profile.portrait"
      className="grid aspect-[4/5] place-items-center border border-dashed border-fg/15 bg-fg/3 text-center"
    >
      <div className="flex flex-col items-center gap-2 px-6">
        <UserFocus size={30} className="text-fg/25" />
        <p className="text-[12px] uppercase tracking-[0.1em] text-fg/40">Photo</p>
        <p className="text-xs text-fg/20">portrait à ajouter</p>
      </div>
    </div>
  )
}

function LookingFor() {
  return (
    <div className="border border-fg/10 bg-fg/3 px-7 py-6">
      <p className="text-[11px] uppercase tracking-[0.1em] text-fg/40">
        Ce que je cherche
        {lookingFor.todo && <span className="ml-2 normal-case tracking-normal text-fg/20 italic">brouillon</span>}
      </p>
      <p className="mt-3.5 text-[15px] leading-[25px] text-fg/60">{lookingFor.value}</p>
      <a
        href="#contact"
        className="group mt-5 inline-flex items-center gap-2 text-sm uppercase tracking-wider text-fg/80 hover:text-fg transition-colors"
      >
        Me contacter
        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </a>
    </div>
  )
}
