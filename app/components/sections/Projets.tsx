"use client"
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, ArrowRight, Browsers, DeviceMobile, GraduationCap, LinkSimpleBreak } from '@phosphor-icons/react/dist/ssr'
import TiltCard from '@/app/components/TiltCard'
import Tag from '@/app/components/ui/Tag'
import SectionTitle from '@/app/components/ui/SectionTitle'
import { featuredProject, projects, studyProjects, type Project, type Surface } from '@/app/data/portfolio'

export default function Projets() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="mt-[200px] md:mt-[350px] px-[5vw] md:px-[7.3vw]"
    >
      <SectionTitle id="projects-title">PROJETS</SectionTitle>

      <Label>Produits</Label>
      <Featured />

      <div className="mt-11 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} delay={i * 0.1} />
        ))}
      </div>

      <div className="mt-18">
        <Label>Projets d’études</Label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {studyProjects.map((s) => (
          <article key={s.title} className="bg-fg/3 border border-fg/10 px-8 py-7">
            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.1em] text-fg/30">
              <GraduationCap size={14} />
              Projet d’études · IUT de Valence
            </span>
            <h3 className="mt-3.5 text-[22px] leading-8 font-semibold">{s.title}</h3>
            <p className="mt-3.5 text-sm leading-[22px] text-fg/50">{s.description}</p>
            <div className="mt-3.5 flex flex-wrap gap-2">
              {s.tags.map((t) => (
                <Tag key={t} variant="outline">{t}</Tag>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-6 text-[12px] uppercase tracking-[0.1em] text-fg/40">{children}</p>
  )
}

/**
 * openChantier n'est pas « un projet de plus » : le repo mobile est en réalité
 * openchantier-mobile, le compagnon terrain de l'app web. On le présente donc
 * comme un produit à deux surfaces plutôt que deux cartes séparées.
 */
function Featured() {
  const reduce = useReducedMotion()
  const p = featuredProject

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] gap-8 lg:gap-14"
    >
      <a
        href={p.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative block aspect-[4/3] overflow-hidden border border-fg/10"
      >
        <Image
          src={p.image}
          alt={`Aperçu de ${p.title}`}
          fill
          sizes="(max-width: 1024px) 90vw, 60vw"
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
        />
      </a>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xs text-fg/30">{p.index}</span>
          <span className="bg-fg px-2.5 py-0.5 text-[11px] uppercase tracking-[0.1em] text-bg">
            Produit
          </span>
        </div>

        <h3 className="font-[family-name:var(--font-dela-gothic-one)] text-4xl leading-[1.15] tracking-tight">
          {p.title}
        </h3>

        <p className="text-base leading-relaxed text-fg/50">{p.tagline}</p>

        <div className="flex flex-col gap-px">
          {p.surfaces.map((s) => (
            <SurfaceRow key={s.label} surface={s} />
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {p.stack.map((s) => (
            <Tag key={s} variant="outline">{s}</Tag>
          ))}
        </div>

        <div className="pt-2">
          <a
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-fg/30 px-8 py-3 text-sm uppercase tracking-wider text-fg/80 hover:bg-fg hover:text-bg transition-all duration-300"
          >
            openchantier.com
            <ArrowUpRight size={15} weight="bold" />
          </a>
        </div>
      </div>
    </motion.article>
  )
}

function SurfaceRow({ surface }: { surface: Surface }) {
  return (
    <div className="flex items-center gap-3.5 bg-fg/3 px-4 py-3.5">
      <span className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-lg bg-fg/10">
        {surface.image ? (
          <Image src={surface.image} alt="" width={36} height={36} className="h-full w-full object-cover" />
        ) : surface.icon === 'phone' ? (
          <DeviceMobile size={19} className="text-fg/50" />
        ) : (
          <Browsers size={19} className="text-fg/50" />
        )}
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-semibold leading-5">{surface.label}</span>
        <span className="block text-xs leading-[17px] text-fg/40">{surface.description}</span>
      </span>
    </div>
  )
}

function ProjectCard({ project, delay }: { project: Project; delay: number }) {
  const reduce = useReducedMotion()
  const href = project.href.todo ? null : project.href.value
  // `todo` = lien encore à trouver (on le rappelle) ; sinon absence assumée (on se tait).
  const linkPending = project.href.todo

  const body = (
    <>
      <div className="relative aspect-[4/3] overflow-hidden border border-fg/10">
        <Image
          src={project.image}
          alt={`Aperçu de ${project.title}`}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
        />
      </div>
      <div className="mt-4">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-lg">{project.title}</h3>
          <span className="text-xs text-fg/30">{project.index}</span>
        </div>
        <p className={`mt-1.5 text-sm ${project.subtitle.todo ? 'text-fg/25 italic' : 'text-fg/40'}`}>
          {project.subtitle.value}
        </p>
        <p className={`mt-1.5 text-xs leading-[17px] ${project.meta.todo ? 'text-fg/20 italic' : 'text-fg/40'}`}>
          {project.meta.value}
          {project.meta.todo && ' — à compléter'}
        </p>
        {href ? (
          <span className="mt-3 flex items-center gap-1 text-xs text-fg/50 group-hover:text-fg/80 transition-colors">
            Voir le projet
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </span>
        ) : linkPending ? (
          <span className="mt-3 flex items-center gap-1.5 text-xs text-fg/20 italic">
            <LinkSimpleBreak size={13} />
            Lien à ajouter
          </span>
        ) : null}
      </div>
    </>
  )

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay }}
    >
      <TiltCard className={`w-full group ${href ? 'cursor-pointer' : ''}`}>
        {href ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className="block">
            {body}
          </a>
        ) : (
          body
        )}
      </TiltCard>
    </motion.div>
  )
}
