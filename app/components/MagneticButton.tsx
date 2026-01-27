"use client"
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface MagneticButtonProps {
 children: React.ReactNode
 className?: string
 strength?: number
 onClick?: () => void
 type?: 'button' | 'submit'
 disabled?: boolean
}

export default function MagneticButton({
 children,
 className = '',
 strength = 0.3,
 onClick,
 type = 'button',
 disabled = false
}: MagneticButtonProps) {
 const ref = useRef<HTMLButtonElement>(null)
 const [position, setPosition] = useState({ x: 0, y: 0 })

 const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
  if (!ref.current || disabled) return

  const { clientX, clientY } = e
  const { left, top, width, height } = ref.current.getBoundingClientRect()

  const x = (clientX - left - width / 2) * strength
  const y = (clientY - top - height / 2) * strength

  setPosition({ x, y })
 }

 const handleMouseLeave = () => {
  setPosition({ x: 0, y: 0 })
 }

 return (
  <motion.button
   ref={ref}
   type={type}
   disabled={disabled}
   onClick={onClick}
   onMouseMove={handleMouseMove}
   onMouseLeave={handleMouseLeave}
   animate={{ x: position.x, y: position.y }}
   transition={{ type: "spring", stiffness: 150, damping: 15 }}
   className={className}
  >
   {children}
  </motion.button>
 )
}
