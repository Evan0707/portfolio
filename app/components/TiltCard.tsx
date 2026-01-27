"use client"
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface TiltCardProps {
 children: React.ReactNode
 className?: string
 tiltAmount?: number
 scale?: number
 onClick?: () => void
}

export default function TiltCard({
 children,
 className = '',
 tiltAmount = 10,
 scale = 1.02,
 onClick
}: TiltCardProps) {
 const ref = useRef<HTMLDivElement>(null)
 const [rotateX, setRotateX] = useState(0)
 const [rotateY, setRotateY] = useState(0)
 const [isHovering, setIsHovering] = useState(false)

 const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  if (!ref.current) return

  const { clientX, clientY } = e
  const { left, top, width, height } = ref.current.getBoundingClientRect()

  const x = (clientX - left) / width - 0.5
  const y = (clientY - top) / height - 0.5

  setRotateX(-y * tiltAmount)
  setRotateY(x * tiltAmount)
 }

 const handleMouseEnter = () => {
  setIsHovering(true)
 }

 const handleMouseLeave = () => {
  setIsHovering(false)
  setRotateX(0)
  setRotateY(0)
 }

 return (
  <motion.div
   ref={ref}
   onClick={onClick}
   onMouseMove={handleMouseMove}
   onMouseEnter={handleMouseEnter}
   onMouseLeave={handleMouseLeave}
   animate={{
    rotateX,
    rotateY,
    scale: isHovering ? scale : 1,
   }}
   transition={{ type: "spring", stiffness: 300, damping: 20 }}
   style={{
    transformStyle: 'preserve-3d',
    perspective: 1000,
   }}
   className={className}
  >
   {children}
  </motion.div>
 )
}
