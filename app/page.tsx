// <CHANG\`\`\`tsx file="app/page.tsx"
import BrandHeader from "@/components/brand-header"
import Hero from "@/components/hero"
import WhatWeDo from "@/components/what-we-do"
import WhoWeAre from "@/components/who-we-are"
import SelectedWork from "@/components/selected-work"

export default function Page() {
  return (
    <main className="min-h-dvh bg-[#000000] text-[#ffffff] font-sans">
      {/* Top center brand header */}
      <BrandHeader />

      {/* Hero section */}
      <Hero />

      {/* Large spacer to match composition rhythm */}
      <div className="h-44 md:h-56" aria-hidden="true" />

      {/* Section title and cards */}
      <WhatWeDo />

      {/* Transition to Who We Are */}
      <div className="h-24 md:h-28" aria-hidden="true" />

      <WhoWeAre />

      {/* Selected work */}
      <SelectedWork />

      {/* Bottom breathing room */}
      <div className="h-24" aria-hidden="true" />
    </main>
  )
}
