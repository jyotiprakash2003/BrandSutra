"use client"

import { useRef } from "react"
import { motion, useInView } from "motion/react"

export default function WhoWeAre() {
  const ref = useRef<HTMLDivElement | null>(null)
  const inView = useInView(ref, { amount: 0.35, margin: "0px 0px -10% 0px" })

  return (
    <section ref={ref} aria-labelledby="who-title" className="relative isolate">
      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center">
        <motion.h2
          id="who-title"
          className="text-4xl md:text-6xl font-extrabold tracking-tight text-white"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0.6, y: 12 }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        >
          WHO ARE WE
        </motion.h2>

        <motion.p
          className="mt-6 text-base md:text-lg leading-relaxed text-white/85"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0.8, y: 8 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.2, 0.8, 0.2, 1] }}
        >
          Just a bunch of college graduates who know business, and help building businesses.
        </motion.p>

        <motion.p
          className="mt-2 text-sm md:text-base text-white/60"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0.8, y: 6 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
        >
          More about us later 😉
        </motion.p>
      </div>
    </section>
  )
}