"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { Mail, Phone, MapPin } from "lucide-react";
import logoApen from "@/assets/Logo-Apen-y-Asociadoss.png";

export default function Footer() {
  const { t } = useLanguage();

  const navLinks = [
    { key: "home", label: t?.nav?.home || "Inicio", href: "/#" },
    { key: "about", label: t?.nav?.about || "Nosotros", href: "/#nosotros" },
    { key: "team", label: t?.nav?.team || "Equipo", href: "/#equipo" },
    { key: "services", label: t?.nav?.services || "Servicios", href: "/#servicios" },
    { key: "blog", label: t?.nav?.blog || "Blog", href: "/blog" },
    { key: "contact", label: t?.nav?.contact || "Contacto", href: "/#contacto" },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#17383F] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <Image
              src={logoApen}
              alt="Apen y Asociados"
              className="h-12 w-auto brightness-0 invert mb-4"
            />
            <p className="text-gray-300 text-sm leading-relaxed">
              {t.footer.description}
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#12ACA4]">
              {t.footer.navigation}
            </h3>
            <nav className="space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  className="block text-gray-300 hover:text-[#12ACA4] transition-colors text-sm"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#12ACA4]">
              {t.footer.services}
            </h3>
            <ul className="space-y-2">
              <li className="text-gray-300 text-sm">{t.contact.services.audit}</li>
              <li className="text-gray-300 text-sm">{t.contact.services.advisory}</li>
              <li className="text-gray-300 text-sm">{t.contact.services.consulting}</li>
              <li className="text-gray-300 text-sm">{t.contact.services.humanCapital}</li>
              <li className="text-gray-300 text-sm">{t.contact.services.special}</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#12ACA4]">
              {t.footer.contact}
            </h3>
            <div className="space-y-3">
              <a
                href="mailto:info@apenyasociados.com"
                className="flex items-center gap-2 text-gray-300 hover:text-[#12ACA4] transition-colors text-sm"
              >
                <Mail className="w-4 h-4 flex-shrink-0" />
                <span>info@apenyasociados.com</span>
              </a>
              <a
                href="tel:+50243865000"
                className="flex items-start gap-2 text-gray-300 hover:text-[#12ACA4] transition-colors text-sm"
              >
                <Phone className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>{t.footer.phoneLabel}:</strong> {t.footer.phone}
                </span>
              </a>
              <div className="flex items-start gap-2 text-gray-300 text-sm">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>{t.footer.addressLabel}:</strong> {t.footer.address}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              {t.footer.copyright.replace("{year}", currentYear.toString())}
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-gray-400 hover:text-[#12ACA4] transition-colors text-sm"
              >
                {t.footer.privacy}
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-[#12ACA4] transition-colors text-sm"
              >
                {t.footer.terms}
              </a>
            </div>
          </div>

          {/* Developer Credits */}
          <div className="mt-6 pt-4 border-t border-gray-700/50 text-center">
            <p className="text-gray-500 text-xs md:text-base">
              {t?.footer?.credits?.prefix || "Diseñado y desarrollado por"}{" "}
              <a
                href="https://sisuwebs.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#12ACA4] hover:text-[#0e918a] transition-colors font-medium"
              >
                {t?.footer?.credits?.link || "Sisu"}
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
