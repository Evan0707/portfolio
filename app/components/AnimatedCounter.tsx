"use client"
import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface AnimatedCounterProps {
 end: number
 suffix?: string
 duration?: number
 className?: string
 isInViewProp?: boolean // Allow parent to control when animation triggers
}

export default function AnimatedCounter({
 end,
 suffix = '',
 duration = 2000,
 className = '',
 isInViewProp
}: AnimatedCounterProps) {
 const [count, setCount] = useState(0)
 const ref = useRef(null)
 const internalInView = useInView(ref, { once: true, margin: "-100px" })
 // Use parent's inView if provided, otherwise use internal detection
 const isInView = isInViewProp !== undefined ? isInViewProp : internalInView
 const hasAnimated = useRef(false)

 useEffect(() => {
  if (isInView && !hasAnimated.current) {
   hasAnimated.current = true

   const startTime = Date.now()
   const animate = () => {
    const elapsed = Date.now() - startTime
    const progress = Math.min(elapsed / duration, 1)

    // Easing function (ease out cubic)
    const easeOut = 1 - Math.pow(1 - progress, 3)

    setCount(Math.floor(easeOut * end))

    if (progress < 1) {
     requestAnimationFrame(animate)
    }
   }

   requestAnimationFrame(animate)
  }
 }, [isInView, end, duration])

 return (
  <span ref={ref} className={className}>
   {count}{suffix}
  </span>
 )
}
