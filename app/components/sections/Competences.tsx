"use client"
import { useRef } from 'react'
import {
  motion,
  useScroll,
  useSpring,
  useVelocity,
  useTransform,
  useMotionValue,
  useAnimationFrame,
  useReducedMotion,
  wrap,
} from 'framer-motion'
import Tag from '@/app/components/ui/Tag'
import SectionTitle from '@/app/components/ui/SectionTitle'
import { marqueeSkills, skillFamilies } from '@/app/data/portfolio'

export default function Competences() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="mt-[200px] md:mt-[350px] overflow-hidden">
      <div className="px-[5vw] md:px-[7.3vw]">
        <SectionTitle id="skills-title">COMPÉTENCES</SectionTitle>
      </div>

      <Marquee />

      <div className="px-[5vw] md:px-[7.3vw] mt-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillFamilies.map((family) => (
            <div key={family.label}>
              <div className="h-px w-full bg-fg/20" />
              <p className="mt-4 text-[12px] uppercase tracking-[0.1em] text-fg/40">{family.label}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {family.items.map((item) => (
                  <Tag key={item}>{item}</Tag>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const BASE_SPEED = 14 // % de largeur par seconde

/**
 * Marquee branché sur la vélocité du scroll : il accélère quand on scrolle
 * vite et change de sens quand on remonte. L'ancienne version tournait à
 * vitesse fixe, sans lien avec ce que fait l'utilisateur.
 */
function Marquee() {
  const reduce = useReducedMotion()
  const baseX = useMotionValue(0)
  const direction = useRef(1)

  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smooth = useSpring(scrollVelocity, { damping: 50, stiffness: 400 })
  const factor = useTransform(smooth, [-2000, 2000], [-4, 4], { clamp: false })

  // deux copies de la liste : on boucle sur -50%
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`)

  useAnimationFrame((_, delta) => {
    if (reduce) return
    let moveBy = direction.current * BASE_SPEED * (delta / 1000)
    const v = factor.get()
    if (v < 0) direction.current = -1
    else if (v > 0) direction.current = 1
    moveBy += direction.current * moveBy * Math.abs(v)
    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div
      className="mt-16 relative"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
      }}
      aria-hidden="true"
    >
      <motion.div className="flex w-max" style={reduce ? undefined : { x }}>
        {[0, 1].map((copy) => (
          <div key={copy} className="flex gap-16 md:gap-24 items-center pr-16 md:pr-24">
            {marqueeSkills.map((skill) => (
              <div key={`${copy}-${skill.name}`} className="shrink-0 text-center">
                <p className="text-4xl md:text-6xl font-[family-name:var(--font-dela-gothic-one)] text-fg/10 whitespace-nowrap">
                  {skill.name}
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.3em] text-fg/30">{skill.sub}</p>
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
