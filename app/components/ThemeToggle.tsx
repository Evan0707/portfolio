"use client"
import { motion } from 'framer-motion'
import { Moon, Sun } from '@phosphor-icons/react/dist/ssr'
import { useTheme } from './ThemeProvider'

export default function ThemeToggle() {
  const context = useTheme()

  // Avant l'hydratation le contexte n'existe pas encore : on rend la coquille.
  if (!context) {
    return (
      <div className="w-10 h-10 flex items-center justify-center rounded-full border border-fg/10">
        <Moon size={18} className="text-fg/50" />
      </div>
    )
  }

  const { theme, toggleTheme } = context

  return (
    <button
      onClick={toggleTheme}
      className="relative w-10 h-10 flex items-center justify-center overflow-hidden rounded-full border border-fg/10 hover:border-fg/40 transition-colors cursor-pointer"
      aria-label={theme === 'dark' ? 'Activer le mode clair' : 'Activer le mode sombre'}
    >
      <motion.span
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : 180, scale: theme === 'dark' ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <Moon size={18} className="text-fg/70" />
      </motion.span>

      <motion.span
        initial={false}
        animate={{ rotate: theme === 'light' ? 0 : -180, scale: theme === 'light' ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="absolute"
      >
        <Sun size={18} className="text-fg/80" />
      </motion.span>
    </button>
  )
}
