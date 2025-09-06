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
      <main className="min-h-dvh bg-[#000000] text-[#ffffff] font-sans">
        {/* Hero section */}
        <section className="min-h-dvh w-full flex flex-col items-start justify-center relative p-6">
          <Hero />
        </section>

        {/* What We Do Section */}
        <section className="min-h-dvh w-full flex flex-col items-center justify-center relative py-20 px-6">
          <WhatWeDo />
        </section>

        {/* Who We Are Section */}
        <section className="min-h-dvh w-full flex flex-col items-center justify-center relative py-20 px-6">
          <WhoWeAre />
        </section>

        {/* Selected Work Section */}
        <section className="min-h-dvh w-full flex flex-col items-center justify-center relative py-20 px-6">
          <SelectedWork />
        </section>

        {/* Contact Us Section */}
        <section className="min-h-dvh w-full flex flex-col items-center justify-center relative py-20 px-6">
          <ContactUs />
        </section>
      </main>
    </>
  );
}