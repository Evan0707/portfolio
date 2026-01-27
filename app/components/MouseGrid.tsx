"use client"
import { useEffect, useState } from 'react'
import { useTheme } from './ThemeProvider'

export default function MouseGrid() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const themeContext = useTheme()
  const isDark = !themeContext || themeContext.theme === 'dark'

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const gridColor = isDark ? 'rgba(255,255,255,0.02)' : 'rgba(10,10,11,0.04)'
  const glowColor = isDark
    ? 'radial-gradient(circle, rgba(200, 214, 255, 0.12) 0%, rgba(161, 183, 255, 0.04) 40%, transparent 65%)'
    : 'radial-gradient(circle, rgba(100, 120, 200, 0.08) 0%, rgba(80, 100, 180, 0.03) 40%, transparent 65%)'

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Static Grid Pattern - Wireframe */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          backgroundImage: `
            linear-gradient(${gridColor} 1px, transparent 1px),
            linear-gradient(90deg, ${gridColor} 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Mouse Halo Glow Effect */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full transition-opacity duration-300"
        style={{
          left: mousePosition.x - 250,
          top: mousePosition.y - 250,
          background: glowColor,
          filter: 'blur(50px)',
        }}
      />
    </div>
  )
}
