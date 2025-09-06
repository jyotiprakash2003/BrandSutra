import BrandHeader from "@/components/brand-header";
import Hero from "@/components/hero";
import WhatWeDo from "@/components/what-we-do";
import WhoWeAre from "@/components/who-we-are";
import SelectedWork from "@/components/selected-work";
import ContactUs from "@/components/contact-us";

export default function Page() {
  return (
    <>
      <BrandHeader />
      <main className="scroll-container min-h-dvh bg-[#000000] text-[#ffffff] font-sans">
        {/* Hero section */}
        <section className="scroll-section align-left">
          <Hero />
        </section>

        {/* What We Do Section */}
        <section className="scroll-section">
          <WhatWeDo />
        </section>

        {/* Who We Are Section */}
        <section className="scroll-section">
          <WhoWeAre />
        </section>

        {/* Selected Work Section */}
        <section className="scroll-section">
          <SelectedWork />
        </section>

        {/* Contact Us Section */}
        <section className="scroll-section">
          <ContactUs />
        </section>
      </main>
    </>
  );
}