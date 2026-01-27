"use client"
import Image from "next/image";
import wave from '@/public/Layer_1 1.webp'
import menu from '@/public/Menu.svg'
import close from '@/public/Close.svg'
import { useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion'
import * as React from 'react';
import Link from "next/link";
import MouseGrid from "./components/MouseGrid";
import ThemeToggle from "./components/ThemeToggle";
import AnimatedCounter from "./components/AnimatedCounter";
import MagneticButton from "./components/MagneticButton";
import TiltCard from "./components/TiltCard";


function GradualSpacing({ text = 'Gradual Spacing' }: { text: string }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <div className="flex justify-start mb-8 pl-[7.3vw]">
      <AnimatePresence>
        {text.split('').map((char, i) => (
          <motion.h3
            ref={ref}
            key={i}
            initial={{ opacity: 0, x: -18 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            exit="hidden"
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="font-[family-name:var(--font-dela-gothic-one)] z-9999 text-[4vw] tracking-wide"
          >
            {char === ' ' ? <span>&nbsp;</span> : char}
          </motion.h3>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  const [navOpen, setNavOpen] = useState(true)
  const [showMenu, setShowMenu] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  // Contact form states
  const [formEmail, setFormEmail] = useState('')
  const [formMessage, setFormMessage] = useState('')
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [formFeedback, setFormFeedback] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formEmail || !formMessage) {
      setFormStatus('error')
      setFormFeedback('Please fill in all fields.')
      return
    }

    setFormStatus('loading')
    setFormFeedback('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formEmail,
          message: formMessage,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setFormStatus('success')
        setFormFeedback('Message sent successfully! I will reply to you soon.')
        setFormEmail('')
        setFormMessage('')

        // Reset success message after 5 seconds
        setTimeout(() => {
          setFormStatus('idle')
          setFormFeedback('')
        }, 5000)
      } else {
        setFormStatus('error')
        setFormFeedback(data.error || 'An error occurred.')
      }
    } catch (error) {
      setFormStatus('error')
      setFormFeedback('Connection error. Please try again.')
    }
  }

  const { scrollY } = useScroll()
  const portY = useTransform(scrollY, [0, 500], [0, -50])
  const folioY = useTransform(scrollY, [0, 500], [0, 50])

  // Horizontal scroll container ref
  const projectsRef = React.useRef<HTMLDivElement>(null)
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)

  // Scroll hijacking: convert vertical scroll to horizontal when in projects section
  React.useEffect(() => {
    const container = scrollContainerRef.current
    const projectsSection = projectsRef.current
    if (!container || !projectsSection) return

    const handleWheel = (e: WheelEvent) => {
      const rect = projectsSection.getBoundingClientRect()
      const isInView = rect.top <= 100 && rect.bottom >= window.innerHeight * 0.5

      if (isInView) {
        const maxScroll = container.scrollWidth - container.clientWidth
        const currentScroll = container.scrollLeft

        // Check if we can scroll horizontally
        const canScrollLeft = currentScroll > 0
        const canScrollRight = currentScroll < maxScroll - 1

        if ((e.deltaY > 0 && canScrollRight) || (e.deltaY < 0 && canScrollLeft)) {
          e.preventDefault()
          container.scrollLeft += e.deltaY
        }
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [])

  const handleToggle = () => {
    if (showMenu) {
      setIsClosing(true)
      setTimeout(() => {
        setShowMenu(false)
        setIsClosing(false)
      }, 500)
    } else {
      setShowMenu(true)
    }
    setNavOpen(!navOpen)
  }

  return (
    <div className="overflow-hidden relative">
      {/* Interactive Grid Background */}
      <MouseGrid />

      {/* HERO SECTION */}
      <header id="home" className="min-h-screen flex flex-col relative">

        {/* Top Bar */}
        <div className="flex justify-between items-start px-[5vw] md:px-[7.3vw] pt-8">
          <ThemeToggle />
          <nav className="flex flex-col items-end z-50">
            <Image onClick={handleToggle} src={navOpen ? menu : close} alt="Menu" width={24} className="cursor-pointer opacity-70 hover:opacity-100 transition-opacity" />
            {showMenu &&
              <ul className="flex flex-col items-end gap-2 mt-4 text-sm">
                <li style={{ animation: `${isClosing ? 'slideOutToRight' : 'slideInFromRight'} 0.3s ease-out ${isClosing ? '0.3s' : ''} both` }}>
                  <a href="#home" className="text-[var(--foreground)]/70 hover:text-[var(--foreground)] transition-colors tracking-wider">HOME</a>
                </li>
                <li style={{ animation: `${isClosing ? 'slideOutToRight' : 'slideInFromRight'} 0.3s ease-out ${isClosing ? '0.2s' : '0.1s'} both` }}>
                  <a href="#projects" className="text-[var(--foreground)]/70 hover:text-[var(--foreground)] transition-colors tracking-wider">PROJECTS</a>
                </li>
                <li style={{ animation: `${isClosing ? 'slideOutToRight' : 'slideInFromRight'} 0.3s ease-out ${isClosing ? '0.1s' : '0.2s'} both` }}>
                  <a href="#about" className="text-[var(--foreground)]/70 hover:text-[var(--foreground)] transition-colors tracking-wider">ABOUT</a>
                </li>
                <li style={{ animation: `${isClosing ? 'slideOutToRight' : 'slideInFromRight'} 0.3s ease-out ${isClosing ? '0s' : '0.3s'} both` }}>
                  <a href="#contact" className="text-[var(--foreground)]/70 hover:text-[var(--foreground)] transition-colors tracking-wider">CONTACT</a>
                </li>
              </ul>
            }
          </nav>
        </div>

        {/* Main Title - PORT-FOLIO Split */}
        <div className="flex-1 flex flex-col justify-center items-center px-[5vw]">
          <div className="relative">
            {/* PORT */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ y: portY }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex items-baseline"
            >
              <span className="font-[family-name:var(--font-dela-gothic-one)] text-[18vw] md:text-[12vw] leading-none tracking-tight">
                PORT
              </span>
              <span className="font-[family-name:var(--font-dela-gothic-one)] text-[18vw] md:text-[12vw] leading-none tracking-tight text-white/20">
                —
              </span>
            </motion.div>

            {/* FOLIO */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ y: folioY }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="flex items-baseline justify-end -mt-4 md:-mt-8"
            >
              <span className="font-[family-name:var(--font-dela-gothic-one)] text-[18vw] md:text-[12vw] leading-none tracking-tight z-50">
                FOLIO
              </span>
            </motion.div>

            {/* Wave image centered */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Image src={wave} alt="" className="w-[35vw] md:w-[20vw] opacity-90" />
            </div>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 text-white/50 text-sm md:text-base tracking-[0.2em] uppercase"
          >
            Evan G — Creative Developer
          </motion.p>
        </div>

        {/* Bottom Info */}
        <div className="flex justify-between items-end px-[5vw] md:px-[7.3vw] pb-8">
          <div className="text-xs text-white/40 space-y-1">
            <p>Web Designer</p>
            <p>Web Developer</p>
          </div>
          <div className="text-xs text-white/40 text-right">
            <p>evan.g.creative@gmail.com</p>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <div className="w-px h-8 bg-white/20"></div>
          <span className="text-[10px] text-white/30 tracking-widest">SCROLL</span>
        </motion.div>
      </header>

      <div id="projects" ref={projectsRef} className="mt-[200px] md:mt-[350px] px-[5vw] md:px-[7.3vw]">
        <GradualSpacing text="PROJECTS" />

        {/* Projects Container */}
        <div
          ref={scrollContainerRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >

          {/* Project Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0 }}
            viewport={{ once: true }}
            className="flex-shrink-0"
          >
            <TiltCard
              onClick={() => window.open('https://lekebabiste.com', '_blank')}
              className="w-full cursor-pointer group"
            >
              <div className="aspect-[4/3] bg-[url(@/public/leKebabsite.jpg)] bg-cover bg-center border border-white/10 grayscale group-hover:grayscale-0 transition-all duration-500"></div>
              <div className="mt-4">
                <div className="flex items-baseline justify-between">
                  <h4 className="text-lg text-white">Le Kebabiste</h4>
                  <span className="text-xs text-white/30">01</span>
                </div>
                <p className="text-sm text-white/40 mt-1">Web Design & Development</p>
                <span className="text-xs text-white/50 mt-3 flex items-center gap-1 group-hover:text-white/70 transition-colors">
                  View Project <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </div>
            </TiltCard>
          </motion.div>

          {/* Project Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            viewport={{ once: true }}
            className="flex-shrink-0"
          >
            <TiltCard
              className="w-full cursor-pointer group"
            >
              <div className="aspect-[4/3] bg-[url(@/public/SFK.jpg)] bg-cover bg-center border border-white/10 grayscale group-hover:grayscale-0 transition-all duration-500"></div>
              <div className="mt-4">
                <div className="flex items-baseline justify-between">
                  <h4 className="text-lg text-white">SFK Project</h4>
                  <span className="text-xs text-white/30">02</span>
                </div>
                <p className="text-sm text-white/40 mt-1">Branding & Web Development</p>
                <span className="text-xs text-white/50 mt-3 flex items-center gap-1 group-hover:text-white/70 transition-colors">
                  View Project <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </div>
            </TiltCard>
          </motion.div>

          {/* Project Card 3 - Payko */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex-shrink-0"
          >
            <TiltCard
              onClick={() => window.open('https://payko.app/', '_blank')}
              className="w-full cursor-pointer group"
            >
              <div className="aspect-[4/3] bg-[url(@/public/payko_project.png)] bg-cover bg-center border border-white/10 grayscale group-hover:grayscale-0 transition-all duration-500"></div>
              <div className="mt-4">
                <div className="flex items-baseline justify-between">
                  <h4 className="text-lg text-white">Payko</h4>
                  <span className="text-xs text-white/30">03</span>
                </div>
                <p className="text-sm text-white/40 mt-1">SaaS — Freelancer Invoicing</p>
                <span className="text-xs text-white/50 mt-3 flex items-center gap-1 group-hover:text-white/70 transition-colors">
                  View Project <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </div>
            </TiltCard>
          </motion.div>

        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center gap-3 mt-8">
          <div className="w-6 h-px bg-white/50"></div>
          <div className="w-6 h-px bg-white/20"></div>
          <div className="w-6 h-px bg-white/20"></div>
        </div>
      </div>

      {/* SKILLS SECTION */}
      <section className="mt-[200px] md:mt-[350px] overflow-hidden">
        <div className="px-[5vw] md:px-[7.3vw]">
          <GradualSpacing text="SKILLS" />
        </div>

        {/* Skills Marquee */}
        <div
          className="mt-16 relative"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          }}
        >
          {/* Scrolling container */}
          <motion.div
            className="flex gap-16 md:gap-24"
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {[...Array(2)].map((_, groupIndex) => (
              <div key={groupIndex} className="flex gap-16 md:gap-24 items-center">
                {[
                  { name: 'React', sub: 'Frontend' },
                  { name: 'React Native', sub: 'Mobile' },
                  { name: 'Next.js', sub: 'Framework' },
                  { name: 'Supabase', sub: 'Backend' },
                  { name: 'PostgreSQL', sub: 'Database' },
                ].map((skill) => (
                  <div key={`${groupIndex}-${skill.name}`} className="flex-shrink-0 text-center">
                    <p className="text-4xl md:text-6xl font-[family-name:var(--font-dela-gothic-one)] text-white/10 hover:text-white/30 transition-colors duration-500 cursor-default whitespace-nowrap">
                      {skill.name}
                    </p>
                    <p className="text-xs text-white/30 tracking-[0.3em] mt-2 uppercase">{skill.sub}</p>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Static skill tags */}
        <div className="px-[5vw] md:px-[7.3vw] mt-16">
          <div className="flex flex-wrap gap-4 justify-center">
            {['JavaScript', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Git'].map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="px-4 py-2 border border-white/10 text-white/50 text-sm hover:border-white/30 hover:text-white/80 transition-all cursor-default"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="mt-[200px] md:mt-[350px] px-[5vw] md:px-[7.3vw]">
        <GradualSpacing text="ABOUT" />

        <div className="mt-12 grid md:grid-cols-2 gap-12 md:gap-20">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-3xl md:text-4xl font-[family-name:var(--font-dela-gothic-one)] leading-tight">
              Passionate about code<br />
              <span className="text-[var(--foreground)]/40">& design.</span>
            </h3>
            <p className="text-[var(--foreground)]/70 leading-relaxed text-lg">
              I am Evan, a freelance web developer and designer. I create modern and
              custom digital experiences for clients who want to stand out.
            </p>
            <p className="text-[var(--foreground)]/50 leading-relaxed">
              Specialized in React, Next.js, and React Native, I transform your ideas into
              performant and aesthetic applications. Each project is an opportunity
              to push the boundaries of what is possible.
            </p>

            {/* CTA */}
            <div className="pt-4">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-[var(--foreground)]/80 hover:text-[var(--foreground)] transition-colors group"
              >
                <span className="text-sm tracking-wider uppercase">Let's work together</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </motion.div>

          {/* Stats & Highlights */}
          <div className="space-y-8">
            {/* Parallax Stats */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              <div className="border border-[var(--border-color)] p-6 hover:border-[var(--foreground)]/30 transition-colors">
                <p className="text-4xl font-[family-name:var(--font-dela-gothic-one)]">
                  <AnimatedCounter end={3} suffix="+" duration={1500} />
                </p>
                <p className="text-sm text-[var(--foreground)]/40 mt-2">Years of Experience</p>
              </div>
              <div className="border border-[var(--border-color)] p-6 hover:border-[var(--foreground)]/30 transition-colors">
                <p className="text-4xl font-[family-name:var(--font-dela-gothic-one)]">
                  <AnimatedCounter end={15} suffix="+" duration={2000} />
                </p>
                <p className="text-sm text-[var(--foreground)]/40 mt-2">Projects Delivered</p>
              </div>
              <div className="border border-[var(--border-color)] p-6 hover:border-[var(--foreground)]/30 transition-colors">
                <p className="text-4xl font-[family-name:var(--font-dela-gothic-one)]">
                  <AnimatedCounter end={100} suffix="%" duration={2500} />
                </p>
                <p className="text-sm text-[var(--foreground)]/40 mt-2">Satisfied Clients</p>
              </div>
              <div className="border border-[var(--border-color)] p-6 hover:border-[var(--foreground)]/30 transition-colors">
                <p className="text-4xl font-[family-name:var(--font-dela-gothic-one)]">
                  <AnimatedCounter end={24} suffix="h" duration={1800} />
                </p>
                <p className="text-sm text-[var(--foreground)]/40 mt-2">Response Time</p>
              </div>
            </motion.div>

            {/* Services with parallax */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <p className="text-xs text-[var(--foreground)]/40 uppercase tracking-widest">What I do</p>
              <div className="flex flex-wrap gap-3">
                {['Websites', 'Mobile Apps', 'UI/UX Design', 'E-commerce', 'SEO'].map((service, i) => (
                  <motion.span
                    key={service}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    viewport={{ once: true }}
                    className="px-4 py-2 bg-[var(--card-bg)] border border-[var(--border-color)] text-[var(--foreground)]/60 text-sm"
                  >
                    {service}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="mt-[200px] md:mt-[350px] px-[5vw] md:px-[7.3vw]">
        <GradualSpacing text="WORDS" />

        <div className="mt-12 space-y-16 md:space-y-24">

          {/* Testimonial 1 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl"
          >
            <p className="text-2xl md:text-4xl leading-relaxed text-white/80 font-light">
              "Evan transformed our vision into a stunning digital experience. His attention to detail and creative approach exceeded all expectations."
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/50">
                M
              </div>
              <div>
                <p className="text-white">Marie Chen</p>
                <p className="text-sm text-white/40">CEO, TechVision Labs</p>
              </div>
            </div>
          </motion.div>

          {/* Testimonial 2 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl ml-auto text-right"
          >
            <p className="text-2xl md:text-4xl leading-relaxed text-white/80 font-light">
              "Working with Evan was a game-changer. Fast delivery, clean code, and a design that our users love."
            </p>
            <div className="mt-6 flex items-center gap-4 justify-end">
              <div>
                <p className="text-white">Lucas Bernard</p>
                <p className="text-sm text-white/40">Founder, StartupFlow</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/50">
                L
              </div>
            </div>
          </motion.div>

          {/* Testimonial 3 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl"
          >
            <p className="text-2xl md:text-4xl leading-relaxed text-white/80 font-light">
              "The perfect blend of creativity and technical expertise. Evan delivered a mobile app that feels premium and performs flawlessly."
            </p>
            <div className="mt-6 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/50">
                S
              </div>
              <div>
                <p className="text-white">Sophie Martin</p>
                <p className="text-sm text-white/40">Product Lead, InnovateCo</p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-24 grid grid-cols-3 gap-8 border-t border-white/10 pt-12"
        >
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-[family-name:var(--font-dela-gothic-one)] text-white">
              <AnimatedCounter end={15} suffix="+" duration={2000} />
            </p>
            <p className="text-sm text-white/40 mt-2">Projects</p>
          </div>
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-[family-name:var(--font-dela-gothic-one)] text-white">
              <AnimatedCounter end={100} suffix="%" duration={2500} />
            </p>
            <p className="text-sm text-white/40 mt-2">Satisfaction</p>
          </div>
          <div className="text-center">
            <p className="text-4xl md:text-5xl font-[family-name:var(--font-dela-gothic-one)] text-white">
              <AnimatedCounter end={3} suffix="+" duration={1500} />
            </p>
            <p className="text-sm text-white/40 mt-2">Years Exp.</p>
          </div>
        </motion.div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="mt-[200px] md:mt-[350px] mb-[200px] px-[5vw] md:px-[7.3vw]">

        {/* Big Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="font-[family-name:var(--font-dela-gothic-one)] text-[12vw] md:text-[8vw] leading-none tracking-tight">
            LET'S
          </h2>
          <h2 className="font-[family-name:var(--font-dela-gothic-one)] text-[12vw] md:text-[8vw] leading-none tracking-tight text-white/20 -mt-2">
            TALK
          </h2>
        </motion.div>

        <div className="mt-12 md:mt-16 grid md:grid-cols-2 gap-12 md:gap-20">

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <p className="text-xs text-white/40 uppercase tracking-widest mb-2">Email</p>
              <a href="mailto:evan.g.creative@gmail.com" className="text-lg text-white/80 hover:text-white transition-colors">
                evan.g.creative@gmail.com
              </a>
            </div>
            <div>
              <p className="text-xs text-white/40 uppercase tracking-widest mb-2">Fiverr</p>
              <Link href="https://fr.fiverr.com/s/VYKjYYZ" target="_blank" className="text-lg text-white/80 hover:text-white transition-colors">
                View Profile →
              </Link>
            </div>
            <div>
              <p className="text-xs text-white/40 uppercase tracking-widest mb-2">Malt</p>
              <Link href="https://www.malt.fr/profile/evang1" target="_blank" className="text-lg text-white/80 hover:text-white transition-colors">
                View Profile →
              </Link>
            </div>
            <div>
              <p className="text-xs text-white/40 uppercase tracking-widest mb-2">Status</p>
              <p className="text-lg text-white/80 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                Available for projects
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="text-xs text-white/40 uppercase tracking-widest block mb-2">Your Email</label>
              <input
                type="email"
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
                disabled={formStatus === 'loading'}
                className="w-full bg-transparent border-b border-white/20 pb-3 text-white focus:border-white/60 focus:outline-none transition-colors disabled:opacity-50"
                placeholder="hello@example.com"
                required
              />
            </div>
            <div>
              <label className="text-xs text-white/40 uppercase tracking-widest block mb-2">Message</label>
              <textarea
                value={formMessage}
                onChange={(e) => setFormMessage(e.target.value)}
                disabled={formStatus === 'loading'}
                className="w-full bg-transparent border-b border-white/20 pb-3 text-white focus:border-white/60 focus:outline-none transition-colors resize-none h-32 disabled:opacity-50"
                placeholder="Tell me about your project..."
                required
              ></textarea>
            </div>

            {/* Feedback Message */}
            {formFeedback && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-sm ${formStatus === 'success' ? 'text-green-400' : 'text-red-400'}`}
              >
                {formFeedback}
              </motion.p>
            )}

            <MagneticButton
              type="submit"
              disabled={formStatus === 'loading'}
              className="mt-4 px-8 py-3 border border-white/30 text-white/80 hover:bg-white hover:text-black transition-all duration-300 tracking-wider text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-white/80 flex items-center gap-2"
            >
              {formStatus === 'loading' ? (
                <>
                  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  SENDING...
                </>
              ) : (
                'SEND MESSAGE'
              )}
            </MagneticButton>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-24 pt-8 border-t border-white/10 flex justify-between items-center text-xs text-white/30">
          <p>© 2026 Evan G</p>
          <p>Designed & Developed with passion</p>
        </div>
      </section>
    </div>
  );
}
