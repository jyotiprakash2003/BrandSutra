"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function ContactUs() {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert("Form submitted! (placeholder)");
  };

  return (
    <section id="contact" className="w-full max-w-2xl mx-auto px-6 text-center py-24 md:py-36">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
          CONTACT US
        </h2>
        <p className="mt-6 text-base md:text-lg leading-relaxed text-white/85">
          Have a project in mind? We’d love to hear from you.
        </p>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        className="mt-10 space-y-6 text-left"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <div className="space-y-2">
          <Label htmlFor="name" className="text-white/85">Name</Label>
          <Input id="name" name="name" placeholder="Your Name" required className="bg-white/5 border-white/15 text-white placeholder:text-white/40" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email" className="text-white/85">Email</Label>
          <Input id="email" name="email" type="email" placeholder="your.email@example.com" required className="bg-white/5 border-white/15 text-white placeholder:text-white/40" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="message" className="text-white/85">Message</Label>
          <Textarea id="message" name="message" placeholder="Tell us about your project..." required className="min-h-[120px] bg-white/5 border-white/15 text-white placeholder:text-white/40" />
        </div>
        <Button type="submit" className="w-full bg-white text-black hover:bg-white/90 font-bold">
          Send Message
        </Button>
      </motion.form>
    </section>
  );
}