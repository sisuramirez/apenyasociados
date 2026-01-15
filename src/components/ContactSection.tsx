"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Calendar, Clock, Send } from "lucide-react";
import financialPeople from "@/assets/financial-people.webp";

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
}

export default function ContactSection() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Estoy interesado en sus servicios");
    window.open(`https://wa.me/50243865000?text=${message}`, "_blank");
  };

  const services = [
    { value: "auditoria", label: t.contact.services.audit },
    { value: "asesoria", label: t.contact.services.advisory },
    { value: "consultoria", label: t.contact.services.consulting },
    { value: "talento", label: t.contact.services.humanCapital },
    { value: "especiales", label: t.contact.services.special },
  ];

  return (
    <section id="contacto" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl lg:text-4xl font-bold text-[#17383F] text-center mb-12"
        >
          {t.contact.title}
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image - Hidden on mobile for performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true }}
            className="hidden lg:block"
          >
            <Image
              src={financialPeople}
              alt="Contact Apen y Asociados"
              className="w-full h-auto object-cover rounded-2xl shadow-lg"
            />
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {t.contact.form.name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#12ACA4] focus:border-transparent transition-colors"
                  placeholder={t.contact.form.namePlaceholder}
                />
              </div>

              {/* Email & Phone Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t.contact.form.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#12ACA4] focus:border-transparent transition-colors"
                    placeholder={t.contact.form.emailPlaceholder}
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t.contact.form.phone}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#12ACA4] focus:border-transparent transition-colors"
                    placeholder={t.contact.form.phonePlaceholder}
                  />
                </div>
              </div>

              {/* Service */}
              <div>
                <label
                  htmlFor="service"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  {t.contact.form.service}
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#12ACA4] focus:border-transparent transition-colors bg-white"
                >
                  <option value="">{t.contact.form.servicePlaceholder}</option>
                  {services.map((service) => (
                    <option key={service.value} value={service.value}>
                      {service.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Time Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    <Calendar className="inline w-4 h-4 mr-1" />
                    {t.contact.form.date}
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#12ACA4] focus:border-transparent transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="time"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    <Clock className="inline w-4 h-4 mr-1" />
                    {t.contact.form.time}
                  </label>
                  <input
                    type="time"
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#12ACA4] focus:border-transparent transition-colors"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#12ACA4] hover:bg-[#0e918a] text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300"
                >
                  <Send className="w-5 h-5" />
                  {t.contact.form.submit}
                </button>
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
