"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import financialPeople from "@/assets/financial-people.webp";

export default function AboutSection() {
  const { t } = useLanguage();

  const whatsappMessage = encodeURIComponent("Estoy interesado en sus servicios");

  const whatsappLink = `https://wa.me/50243865000?text=${whatsappMessage}`;

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image - Shows first on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="order-1 lg:order-2"
          >
            <Image
              src={financialPeople}
              alt="Apen y Asociados Team"
              className="w-full h-auto object-cover rounded-2xl shadow-lg"
              priority
            />
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="order-2 lg:order-1"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[#17383F] mb-6">
              {t.about.title}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {t.about.description}
            </p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#12ACA4] text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-300 hover:bg-[#0e918a]"
            >
              {t.about.cta}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
