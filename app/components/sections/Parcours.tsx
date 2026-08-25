"use client"
import { useRef } from 'react'
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion'
import { Buildings, NotePencil } from '@phosphor-icons/react/dist/ssr'
import { milestones, type Milestone } from '@/app/data/portfolio'

/**
 * PARCOURS — la section absente du site, et le pari visuel de la v2.
 *
 * Le thème s'inverse le temps d'une bande pleine largeur : au milieu d'une
 * page sombre, un fond clair. Ça découpe le rythme et rend le stage EDF —
 * la preuve que quelqu'un a déjà fait confiance à Evan — impossible à rater.
 */
export default function Parcours() {
  const listRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ['start 0.85', 'end 0.5'],
  })
  const scaleY = useSpring(scrollYProgress, { stiffness: 60, damping: 20 })

  return (
    <section
      id="parcours"
      aria-labelledby="parcours-title"
      className="bg-band text-bandfg py-24 md:py-30 mt-[200px] md:mt-[350px]"
    >
      <div className="px-[5vw] md:px-[7.3vw]">
        <div className="pl-[7.3vw]">
          <h2
            id="parcours-title"
            className="font-[family-name:var(--font-dela-gothic-one)] text-[8vw] md:text-[4vw] leading-none tracking-wide"
          >
            PARCOURS
          </h2>
          <p className="mt-3 text-sm md:text-base uppercase tracking-[0.2em] text-bandfg/40">
            Formation &amp; expérience
          </p>
        </div>

        <div ref={listRef} className="relative mt-16 md:mt-20">
          {/* rail : trait creux + trait plein qui se remplit au scroll */}
          <div
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[7px] md:left-[190px] w-px bg-bandfg/15"
          >
            <motion.div
              style={reduce ? undefined : { scaleY }}
              className="absolute inset-0 origin-top bg-bandfg/40"
            />
          </div>

          <ol className="space-y-12 md:space-y-12">
            {milestones.map((m) => (
              <Row key={m.year + m.title} milestone={m} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function Row({ milestone: m }: { milestone: Milestone }) {
  return (
    <li className="relative grid grid-cols-1 md:grid-cols-[170px_40px_1fr] pl-8 md:pl-0">
      {/* jalon */}
      <span
        aria-hidden="true"
        className={[
          'absolute left-[7px] md:left-[190px] -translate-x-1/2 rounded-full',
          m.featured
            ? 'top-[7px] h-3.5 w-3.5 bg-bandfg ring-6 ring-band'
            : 'top-[9px] h-[9px] w-[9px] bg-band border-[1.5px] border-bandfg/30',
        ].join(' ')}
      />

      <p
        className={[
          'font-[family-name:var(--font-dela-gothic-one)] text-lg leading-7 md:text-right md:pr-0',
          m.featured ? 'text-bandfg' : 'text-bandfg/30',
        ].join(' ')}
      >
        {m.year}
      </p>

      <span aria-hidden="true" />

      <div className="mt-2 md:mt-0">
        {m.featured ? <FeaturedMilestone milestone={m} /> : <PlainMilestone milestone={m} />}
      </div>
    </li>
  )
}

function PlainMilestone({ milestone: m }: { milestone: Milestone }) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-3">
        <h3 className="text-xl leading-7 font-semibold">{m.title}</h3>
        {m.current && (
          <span className="inline-flex items-center gap-1.5 border border-bandfg/20 px-2.5 py-0.5 text-[11px] uppercase tracking-[0.1em] text-bandfg/50">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" aria-hidden="true" />
            En cours
          </span>
        )}
      </div>
      <p className="mt-1.5 text-sm text-bandfg/50">{m.subtitle}</p>
    </>
  )
}

/** Le stage EDF a droit à une carte : c'est la ligne la plus forte du CV. */
function FeaturedMilestone({ milestone: m }: { milestone: Milestone }) {
  const detailMissing = !m.detail || m.detail.todo || !m.detail.value

  return (
    <article className="border-[1.5px] border-bandfg px-8 py-7">
      <span className="inline-flex items-center gap-2 bg-bandfg px-2.5 py-1 text-[11px] uppercase tracking-[0.1em] text-band">
        <Buildings size={13} weight="fill" />
        Stage en entreprise
      </span>

      <h3 className="mt-3.5 text-2xl md:text-[26px] leading-9 font-semibold">{m.title}</h3>
      <p className="mt-3.5 text-lg text-bandfg/70">{m.subtitle}</p>
    </article>
  )
}
