"use client"

import { useRef, useEffect, useState } from "react"
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react"
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect"

export default function WhatWeDo() {
  // service cards content
  const cards: { title: string; speed: number; colors: number[][] }[] = [
    { title: "Design websites for your brand", speed: 5.1, colors: [[255, 255, 255]] },
    { title: "Manage Social Media to revamp your online presence", speed: 3, colors: [[255, 255, 255]] },
    { title: "Design your products with us", speed: 3, colors: [[255, 255, 255]] },
  ]

  const sectionRef = useRef<HTMLElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [inView, setInView] = useState(false)

  // reveal on first view
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { threshold: 0.22, rootMargin: "0px 0px -10%" },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // fade the whole block out as user scrolls towards the next section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 60%", "end 15%"], // start fade when mid section reaches viewport center
  })
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <section ref={sectionRef} className="px-6">
      <motion.div
        ref={containerRef}
        style={{ opacity }}
        className={["relative mx-auto max-w-6xl will-change-transform", inView ? "animate-rise-in" : "opacity-0"].join(
          " ",
        )}
      >
        <h2 className="text-center text-white font-extrabold uppercase tracking-wide text-balance text-5xl md:text-7xl lg:text-8xl">
          WHAT DO WE DO?
        </h2>

        <div className="mt-16 md:mt-20 lg:mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
          {cards.map((c, i) => (
            <RevealCard key={i} title={c.title} speed={c.speed} colors={c.colors} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}

// Glass card with canvas reveal on hover
const RevealCard = ({
  title,
  speed,
  colors,
}: {
  title: string
  speed: number
  colors: number[][]
}) => {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group/canvas-card glass rounded-xl border border-white/15 overflow-hidden max-w-sm w-full mx-auto p-4 h-[30rem]"
      aria-label={title}
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            <CanvasRevealEffect
              animationSpeed={speed}
              containerClassName="bg-black"
              colors={colors}
              dotSize={2}
              showGradient
            />
            <div className="absolute inset-0 [mask-image:radial-gradient(420px_at_center,white,transparent)] bg-black/50" />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 h-full flex items-center justify-center">
        <h3 className="text-center text-pretty uppercase font-extrabold text-white transition duration-200 group-hover/canvas-card:-translate-y-1 leading-tight text-2xl md:text-3xl">
          {title}
        </h3>
      </div>
    </div>
  )
}
