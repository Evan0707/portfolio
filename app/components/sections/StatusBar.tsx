"use client"
import { availability } from '@/app/data/portfolio'

/**
 * Bandeau permanent en haut de page.
 *
 * C'est le point n°1 de l'audit : un recruteur a besoin des dates, du rythme
 * et de la zone de mobilité avant de lire quoi que ce soit d'autre.
 */
export default function StatusBar() {
  return (
    <div className="fixed top-0 inset-x-0 z-100 bg-bg/80 backdrop-blur-md border-b border-fg/10">
      <div className="flex items-center justify-between gap-4 px-[5vw] md:px-[7.3vw] py-3.5">
        <p className="flex items-center gap-2.5 text-[12px] leading-4 tracking-[0.05em] text-fg/60 min-w-0">
          <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
            <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="truncate">
            {availability.headline}
            <span className="hidden lg:inline">
              {' · '}
              <span className={availability.rhythm.todo ? 'text-fg/35' : undefined}>
                {availability.rhythm.value}
              </span>
            </span>
          </span>
        </p>
        <p className="hidden md:block shrink-0 text-[12px] leading-4 tracking-[0.05em] text-fg/60">
          {availability.area}
        </p>
      </div>
    </div>
  )
}
