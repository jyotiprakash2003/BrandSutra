"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import BrandHeader from "@/components/brand-header";
import Hero from "@/components/hero";
import WhatWeDo from "@/components/what-we-do";
import WhoWeAre from "@/components/who-we-are";
import SelectedWork from "@/components/selected-work";
import ContactUs from "@/components/contact-us";

// This is a reusable wrapper component that adds a "pan-in" animation
// to its children when they are scrolled into the viewport.
const AnimatedSection = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef(null);
  // The `once: true` option ensures the animation only runs once per page load.
  // `amount: 0.2` means the animation triggers when 20% of the element is visible.
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.section
      ref={ref}
      className={className}
      // Initial state: transparent and slightly moved down
      initial={{ opacity: 0, y: 50 }}
      // Animate to: fully visible and in its original position
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
};

export default function Page() {
  return (
    <>
      <BrandHeader />
      {/* The main container for all sections. We are no longer using scroll-snapping,
        so the browser's natural scroll behavior will take over. Each section is
        given a minimum height of the viewport to ensure they fill the screen
        as you scroll to them.
      */}
      <main className="bg-[#000000] text-[#ffffff] font-sans">
        {/* Hero Section */}
        <AnimatedSection className="min-h-dvh w-full flex flex-col items-start justify-center relative p-6">
          <Hero />
        </AnimatedSection>

        {/* What We Do Section */}
        <AnimatedSection className="min-h-dvh w-full flex flex-col items-center justify-center relative py-20 px-6">
          <WhatWeDo />
        </AnimatedSection>

        {/* Who We Are Section */}
        <AnimatedSection className="min-h-dvh w-full flex flex-col items-center justify-center relative py-20 px-6">
          <WhoWeAre />
        </AnimatedSection>

        {/* Selected Work Section */}
        <AnimatedSection className="min-h-dvh w-full flex flex-col items-center justify-center relative py-20 px-6">
          <SelectedWork />
        </AnimatedSection>

        {/* Contact Us Section */}
        <AnimatedSection className="min-h-dvh w-full flex flex-col items-center justify-center relative py-20 px-6">
          <ContactUs />
        </AnimatedSection>
      </main>
    </>
  );
}
