"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import iecNet from "@/assets/iec-net.png";

export default function InternationalSection() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Layout: Stacked (forum.webp, IEC logo, text) */}
        <div className="flex flex-col lg:hidden gap-8">
          {/* Forum.webp Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex items-center justify-center"
          >
            <Image
              src="/assets/forum.webp"
              alt="Forum of Firms"
              width={400}
              height={200}
              className="max-w-xs h-auto object-contain"
            />
          </motion.div>

          {/* IEC Net Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex items-center justify-center"
          >
            <Image
              src={iecNet}
              alt="IECnet Global Network"
              className="max-w-sm h-auto object-contain"
              priority
            />
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl font-bold text-[#17383F] mb-6">
              {t.international.title}
            </h2>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>{t.international.p1}</p>
              <p>{t.international.p2}</p>
              <p>{t.international.p3}</p>
            </div>

            {/* CTA Block */}
            <div className="mt-8">
              <span className="block text-xs font-bold uppercase text-gray-500 mb-2">
                {t.international.visitLabel}
              </span>
              <a
                href={t.international.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#12ACA4] text-white font-bold px-6 py-3 rounded-lg transition-colors duration-300 hover:bg-[#0e918a]"
              >
                {t.international.buttonText}
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Desktop Layout: Two columns */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Images stacked vertically, centered relative to right */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-col items-center justify-center gap-8"
          >
            {/* Forum.webp Image */}
            <Image
              src="/assets/forum.webp"
              alt="Forum of Firms"
              width={400}
              height={200}
              className="max-w-md h-auto object-contain"
            />
            {/* IEC Net Logo */}
            <Image
              src={iecNet}
              alt="IECnet Global Network"
              className="max-w-lg lg:max-w-[55rem] h-auto object-contain"
              priority
            />
          </motion.div>

          {/* Right Column - Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[#17383F] mb-6">
              {t.international.title}
            </h2>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>{t.international.p1}</p>
              <p>{t.international.p2}</p>
              <p>{t.international.p3}</p>
            </div>

            {/* CTA Block */}
            <div className="mt-8">
              <span className="block text-xs font-bold uppercase text-gray-500 mb-2">
                {t.international.visitLabel}
              </span>
              <a
                href={t.international.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#12ACA4] text-white font-bold px-6 py-3 rounded-lg transition-colors duration-300 hover:bg-[#0e918a]"
              >
                {t.international.buttonText}
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
