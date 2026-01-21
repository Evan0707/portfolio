"use client"
import { useEffect, useState } from 'react'

export default function MouseGrid() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

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

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Static Grid Pattern - Wireframe */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Mouse Halo Glow Effect */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          left: mousePosition.x - 250,
          top: mousePosition.y - 250,
          background: `radial-gradient(circle, rgba(200, 214, 255, 0.12) 0%, rgba(161, 183, 255, 0.04) 40%, transparent 65%)`,
          filter: 'blur(50px)',
        }}
      />
    </div>
  )
}
