"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import misionImg from "@/assets/mision.webp";
import visionImg from "@/assets/vision.webp";
import valoresImg from "@/assets/valores.webp";

interface PhilosophyCard {
  key: string;
  image: StaticImageData;
  title: string;
  content: string | string[];
  isValues: boolean;
}

export default function PhilosophySection() {
  const { t } = useLanguage();

  const cards: PhilosophyCard[] = [
    {
      key: "mision",
      image: misionImg,
      title: t.philosophy.mision.title,
      content: t.philosophy.mision.text,
      isValues: false,
    },
    {
      key: "vision",
      image: visionImg,
      title: t.philosophy.vision.title,
      content: t.philosophy.vision.text,
      isValues: false,
    },
    {
      key: "valores",
      image: valoresImg,
      title: t.philosophy.valores.title,
      content: t.philosophy.valores.items,
      isValues: true,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="nosotros" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-3xl lg:text-4xl font-bold text-[#17383F] text-center mb-12"
        >
          {t.philosophy.title}
        </motion.h2>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {cards.map((card) => (
            <motion.div
              key={card.key}
              variants={cardVariants}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col items-center p-6 space-y-4"
            >
              {/* Card Image */}
              <div className="h-32 w-full flex justify-center">
                <Image
                  src={card.image}
                  alt={card.title}
                  className="object-contain h-full w-auto"
                />
              </div>

              {/* Card Title */}
              <h3 className="text-xl font-bold text-[#17383F] text-center">
                {card.title}
              </h3>

              {/* Card Description */}
              {card.isValues ? (
                <ul className="space-y-2">
                  {(card.content as string[]).map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-[#12ACA4] flex-shrink-0" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600 leading-relaxed text-center">
                  {card.content as string}
                </p>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
