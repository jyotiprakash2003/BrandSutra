"use client"

import React, { useEffect, useState, createContext, useContext } from "react"
import { IconArrowNarrowLeft, IconArrowNarrowRight, IconX } from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "framer-motion"
import type { ReactElement } from "react"

interface CarouselProps {
  items: ReactElement[]
  initialScroll?: number
}

type CardData = {
  src?: string
  title: string
  category: string
  content?: React.ReactNode
}

export const CarouselContext = createContext<{
  onCardClose: (index: number) => void
  currentIndex: number
}>({
  onCardClose: () => {},
  currentIndex: 0,
})

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
  const carouselRef = React.useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = React.useState(false)
  const [canScrollRight, setCanScrollRight] = React.useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.scrollLeft = initialScroll
      checkScrollability()
    }
  }, [initialScroll])

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth)
    }
  }

  const scrollLeft = () => carouselRef.current?.scrollBy({ left: -320, behavior: "smooth" })
  const scrollRight = () => carouselRef.current?.scrollBy({ left: 320, behavior: "smooth" })

  const handleCardClose = (index: number) => {
    if (!carouselRef.current) return
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768
    const cardWidth = isMobile ? 256 : 320
    const gap = isMobile ? 24 : 48
    const scrollPosition = (cardWidth + gap) * (index + 1)
    carouselRef.current.scrollTo({ left: scrollPosition, behavior: "smooth" })
    setCurrentIndex(index)
  }

  return (
    <CarouselContext.Provider value={{ onCardClose: handleCardClose, currentIndex }}>
      <div className="relative w-full">
        <div
          className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-10 [scrollbar-width:none] md:py-16"
          ref={carouselRef}
          onScroll={checkScrollability}
        >
          {/* edge fade */}
          <div className="pointer-events-none absolute right-0 z-[5] h-full w-[6%] bg-gradient-to-l from-black to-transparent" />
          {/* equal, larger gaps */}
          <div className={cn("mx-auto max-w-7xl flex flex-row justify-start gap-10 pl-4 md:gap-12")}>
            {items.map((item, index) => (
              <motion.div
                key={"card" + index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.16 * index, ease: "easeOut" } }}
                className="rounded-3xl last:pr-[10%] md:last:pr-[25%]"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mr-6 flex justify-end gap-2">
          <button
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/15 backdrop-blur-md disabled:opacity-40"
            onClick={scrollLeft}
            aria-label="Scroll left"
            disabled={!canScrollLeft}
          >
            <IconArrowNarrowLeft className="h-6 w-6" />
          </button>
          <button
            className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/15 backdrop-blur-md disabled:opacity-40"
            onClick={scrollRight}
            aria-label="Scroll right"
            disabled={!canScrollRight}
          >
            <IconArrowNarrowRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </CarouselContext.Provider>
  )
}

export const Card = ({
  card,
  index,
  layout = false,
}: {
  card: CardData
  index: number
  layout?: boolean
}) => {
  const [open, setOpen] = useState(false)
  const { onCardClose } = useContext(CarouselContext)

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && handleClose()
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  const handleOpen = () => setOpen(true)
  const handleClose = () => {
    setOpen(false)
    onCardClose(index)
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50 h-screen overflow-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 h-full w-full bg-black/80 backdrop-blur-lg"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              layoutId={layout ? `card-${card.title}` : undefined}
              className="relative z-[60] mx-auto my-10 h-fit max-w-3xl rounded-3xl bg-white/10 p-6 text-white ring-1 ring-white/15 backdrop-blur-xl md:p-10"
            >
              <button
                className="sticky top-2 right-0 ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25"
                onClick={handleClose}
                aria-label="Close"
              >
                <IconX className="h-5 w-5" />
              </button>
              <motion.p className="text-sm font-medium text-white/80">{card.category}</motion.p>
              <motion.p className="mt-2 text-2xl font-extrabold leading-tight md:text-4xl">{card.title}</motion.p>
              {card.content ? <div className="py-6">{card.content}</div> : null}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Glass card — smaller size, text-forward so it "covers" the box */}
      <motion.button
        layoutId={layout ? `card-${card.title}` : undefined}
        onClick={handleOpen}
        className="relative z-10 flex h-56 w-64 flex-col items-start justify-end overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-6 text-left text-white backdrop-blur-md md:h-72 md:w-80"
      >
        <div className="pointer-events-none absolute inset-0 z-10 bg-black/10" />
        <div className="relative z-20">
          <motion.p className="font-sans text-[11px] uppercase tracking-wide text-white/80 md:text-xs">
            {card.category}
          </motion.p>
          <motion.p className="mt-2 text-2xl font-extrabold leading-tight md:text-3xl">{card.title}</motion.p>
        </div>
        {card.src ? (
          <img
            src={card.src || "/placeholder.svg"}
            alt={card.title}
            className="absolute inset-0 z-0 h-full w-full object-cover opacity-30"
            loading="lazy"
            decoding="async"
          />
        ) : null}
      </motion.button>
    </>
  )
}
