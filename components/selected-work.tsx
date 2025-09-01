"use client"

import { motion } from "motion/react"

type Work = {
  title: string
  subtitle?: string
  imgAlt: string
  imgSrc: string
}

const works: Work[] = [
  {
    title: "Retail Rebrand",
    subtitle: "Identity + Web",
    imgAlt: "Retail case study",
    imgSrc: "/retail-rebrand-monochrome.png",
  },
  {
    title: "DTC Growth",
    subtitle: "Paid + Social",
    imgAlt: "DTC growth campaign",
    imgSrc: "/dtc-growth-monochrome.png",
  },
  {
    title: "Product Design",
    subtitle: "App UI/UX",
    imgAlt: "Product design app screens",
    imgSrc: "/product-design-ui-ux-monochrome.png",
  },
]

export default function SelectedWork() {
  return (
    <section aria-labelledby="work-title" className="py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <h2 id="work-title" className="text-balance text-3xl md:text-5xl font-extrabold text-white">
          Selected work
        </h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
          {works.map((w, i) => (
            <motion.article
              key={w.title}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, delay: i * 0.06, ease: [0.2, 0.8, 0.2, 1] }}
            >
              <img
                src={w.imgSrc || "/placeholder.svg"}
                alt={w.imgAlt}
                className="h-56 md:h-64 w-full object-cover opacity-70 transition-opacity duration-300 group-hover:opacity-90"
              />
              <div className="absolute inset-0 bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="text-white text-lg md:text-xl font-semibold">{w.title}</h3>
                {w.subtitle && <p className="text-white/70 text-sm">{w.subtitle}</p>}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
