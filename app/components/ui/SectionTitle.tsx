"use client"
import { motion, useReducedMotion } from 'framer-motion'

/**
 * Titre de section.
 *
 * Remplace l'ancien GradualSpacing, qui animait chaque caractère dans son
 * propre <motion.h3> (11 nœuds animés pour « COMPÉTENCES ») et posait le même
 * `ref` sur tous les caractères dans un .map — si bien que useInView
 * n'observait réellement que le dernier. Ici : un seul nœud, un seul ref,
 * révélé au masque avec un léger flou.
 */
export default function SectionTitle({
  children,
  id,
  className = '',
}: {
  children: React.ReactNode
  id?: string
  className?: string
}) {
  const reduce = useReducedMotion()

  return (
    <div className="overflow-hidden pl-[7.3vw] mb-8">
      <motion.h2
        id={id}
        initial={reduce ? false : { opacity: 0, y: '35%', filter: 'blur(6px)' }}
        whileInView={{ opacity: 1, y: '0%', filter: 'blur(0px)' }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`font-[family-name:var(--font-dela-gothic-one)] text-[8vw] md:text-[4vw] leading-none tracking-wide ${className}`}
      >
        {children}
      </motion.h2>
    </div>
  )
}
