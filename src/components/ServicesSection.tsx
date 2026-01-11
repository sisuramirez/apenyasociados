"use client";

import { useState } from "react";
import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import { Check, RotateCcw } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

import auditoriaImg from "@/assets/servicios-auditoria.webp";
import asesoriaImg from "@/assets/servicios-asesoria.webp";
import consultoriaImg from "@/assets/servicios-Consultoria.webp";
import talentoImg from "@/assets/servicios-talento.webp";
import especialesImg from "@/assets/servicios-servicios-especiales.webp";

interface ServiceData {
  key: "auditoria" | "asesoria" | "consultoria" | "talento" | "especiales";
  image: StaticImageData;
}

const services: ServiceData[] = [
  { key: "auditoria", image: auditoriaImg },
  { key: "asesoria", image: asesoriaImg },
  { key: "consultoria", image: consultoriaImg },
  { key: "talento", image: talentoImg },
  { key: "especiales", image: especialesImg },
];

interface FlipCardProps {
  service: ServiceData;
  t: {
    services: {
      flipHint: string;
      [key: string]: {
        title: string;
        description: string;
        items: string[];
      } | string;
    };
  };
}

function FlipCard({ service, t }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const serviceData = t.services[service.key] as {
    title: string;
    description: string;
    items: string[];
  };

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <motion.div
      className="w-full lg:w-[380px] h-[500px] cursor-pointer"
      style={{ perspective: "1000px" }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true, margin: "-50px" }}
      onClick={handleClick}
    >
      <motion.div
        className="relative w-full h-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Face */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl bg-[#17383F] p-6 flex flex-col items-center justify-between shadow-xl"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="flex flex-col items-center pt-2">
            <div className="w-48 h-48 mb-4 relative">
              <Image
                src={service.image}
                alt={serviceData.title}
                fill
                className="object-contain filter brightness-0 invert"
              />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 text-center">
              {serviceData.title}
            </h3>
            <p className="text-gray-300 text-center text-sm leading-relaxed px-2">
              {serviceData.description}
            </p>
          </div>
          <div className="flex items-center gap-2 text-[#12ACA4] text-sm font-medium pb-2">
            <RotateCcw className="w-4 h-4" />
            <span>{t.services.flipHint}</span>
          </div>
        </div>

        {/* Back Face */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl bg-[#12ACA4] p-6 flex flex-col shadow-xl"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <h3 className="text-2xl font-bold text-white mb-6 text-center pt-2">
            {serviceData.title}
          </h3>
          <ul className="space-y-3 flex-1">
            {serviceData.items.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-white" />
                </div>
                <span className="text-white text-sm leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-center gap-2 text-white/70 text-sm font-medium pt-4">
            <RotateCcw className="w-4 h-4" />
            <span>{t.services.flipHint}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const { t } = useLanguage();

  return (
    <section id="servicios" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl lg:text-4xl font-bold text-[#17383F] text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          {t.services.title}
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-8">
          {services.map((service) => (
            <FlipCard key={service.key} service={service} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
