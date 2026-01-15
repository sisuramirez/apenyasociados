"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Calendar, Clock, Send, Loader2, XCircle } from "lucide-react";
import financialPeople from "@/assets/financial-people.webp";

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  message: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

// Success Checkmark SVG Component
const SuccessCheckmark = () => (
  <svg
    className="w-20 h-20"
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Outer Circle */}
    <circle
      cx="50"
      cy="50"
      r="45"
      stroke="#12ACA4"
      strokeWidth="4"
      fill="none"
    />
    {/* Checkmark */}
    <motion.path
      d="M30 50 L45 65 L70 35"
      stroke="#12ACA4"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
    />
  </svg>
);

export default function ContactSection() {
  const { language, t } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      service: "",
      date: "",
      time: "",
      message: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      // Get the service label for the email
      const serviceLabel = services.find(s => s.value === formData.service)?.label || formData.service;

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          service: serviceLabel,
          language,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        resetForm();
      } else {
        setStatus("error");
        setErrorMessage(data.message || t.contact.form.error);
      }
    } catch {
      setStatus("error");
      setErrorMessage(t.contact.form.error);
    }
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

  const isLoading = status === "loading";

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

          {/* Form or Success State */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
          >
            <AnimatePresence mode="wait">
              {status === "success" ? (
                /* Success State View */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="flex flex-col items-center justify-center py-16 px-8 bg-gradient-to-b from-white to-[#F4F7F6] rounded-2xl border border-gray-100 shadow-sm"
                >
                  {/* Animated Checkmark */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.4, ease: "backOut" }}
                  >
                    <SuccessCheckmark />
                  </motion.div>

                  {/* Thank You Title */}
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="text-3xl font-bold text-[#17383F] mt-8 mb-4"
                  >
                    {t.contact.successState.title}
                  </motion.h3>

                  {/* Message */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className="text-lg text-gray-600 text-center mb-8"
                  >
                    {t.contact.successState.message}
                  </motion.p>

                  {/* Signature */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    className="text-center"
                  >
                    <p className="text-gray-500 italic">
                      {t.contact.successState.regards}
                    </p>
                    <p className="text-[#12ACA4] font-semibold mt-1">
                      {t.contact.successState.team}
                    </p>
                  </motion.div>

                  {/* Optional: Button to send another request */}
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.7 }}
                    onClick={() => setStatus("idle")}
                    className="mt-10 text-sm text-gray-400 hover:text-[#12ACA4] transition-colors underline underline-offset-2"
                  >
                    {language === "es" ? "Enviar otra solicitud" : "Send another request"}
                  </motion.button>
                </motion.div>
              ) : (
                /* Form View */
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Error Message */}
                  <AnimatePresence>
                    {status === "error" && errorMessage && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="mb-6 p-4 rounded-lg flex items-start gap-3 bg-red-50 border border-red-200 text-red-800"
                      >
                        <XCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-600" />
                        <p className="text-sm">{errorMessage}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

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
                        disabled={isLoading}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#12ACA4] focus:border-transparent transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                          disabled={isLoading}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#12ACA4] focus:border-transparent transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                          disabled={isLoading}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#12ACA4] focus:border-transparent transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                        disabled={isLoading}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#12ACA4] focus:border-transparent transition-colors bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                          disabled={isLoading}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#12ACA4] focus:border-transparent transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                          disabled={isLoading}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#12ACA4] focus:border-transparent transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />
                      </div>
                    </div>

                    {/* Message (Optional) */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        {t.contact.form.message}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        disabled={isLoading}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#12ACA4] focus:border-transparent transition-colors resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                        placeholder={t.contact.form.messagePlaceholder}
                      />
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 inline-flex items-center justify-center gap-2 bg-[#12ACA4] hover:bg-[#0e918a] text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            {t.contact.form.sending}
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5" />
                            {t.contact.form.submit}
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        onClick={handleWhatsApp}
                        disabled={isLoading}
                        className="flex-1 inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
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
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
