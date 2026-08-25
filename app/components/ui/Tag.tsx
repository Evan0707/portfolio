import type { ReactNode } from 'react'

/**
 * Étiquette de compétence / service / stack.
 * `filled` reprend le fond card-bg, `outline` la bordure seule.
 */
export default function Tag({
  children,
  variant = 'filled',
  className = '',
}: {
  children: ReactNode
  variant?: 'filled' | 'outline'
  className?: string
}) {
  return (
    <span
      className={[
        'inline-flex items-center px-3 py-1.5 text-[13px] leading-[18px] border transition-colors',
        variant === 'filled'
          ? 'bg-fg/3 border-fg/10 text-fg/60 hover:border-fg/25'
          : 'border-fg/20 text-fg/50 hover:border-fg/35',
        className,
      ].join(' ')}
    >
      {children}
    </span>
  )
}
