"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es");
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const menuItems = [
    { key: "home", label: t.nav.home },
    { key: "about", label: t.nav.about },
    { key: "team", label: t.nav.team },
    { key: "services", label: t.nav.services },
    { key: "contact", label: t.nav.contact },
  ];

  const LanguageToggle = () => (
    <div className="flex items-center space-x-3">
      <span
        className={`text-sm font-medium transition-colors ${
          language === "es" ? "text-primary" : "text-gray-400"
        }`}
      >
        {t.lang.es}
      </span>
      <button
        onClick={toggleLanguage}
        className="relative inline-flex h-6 w-11 items-center rounded-full bg-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
        aria-label="Toggle language"
      >
        <motion.span
          className="inline-block h-4 w-4 transform rounded-full bg-primary shadow-lg"
          animate={{
            x: language === "es" ? 4 : 24,
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        />
      </button>
      <span
        className={`text-sm font-medium transition-colors ${
          language === "en" ? "text-primary" : "text-gray-400"
        }`}
      >
        {t.lang.en}
      </span>
    </div>
  );

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile & Tablet Layout (< 1024px): 3 Column Grid */}
          <div className="grid grid-cols-3 items-center h-20 lg:hidden transition-all duration-300">
            {/* Left: Logo */}
            <div className="flex justify-start overflow-visible">
              <Image
                src="/assets/Logo-Apen-y-Asociadoss.png"
                alt="Apen y Asociados"
                width={180}
                height={64}
                className="h-8 tablet:h-16 w-auto max-w-none transition-all duration-300"
                priority
              />
            </div>

            {/* Center: Language Toggle */}
            <div className="flex justify-center">
              <div className="flex items-center space-x-2 ml-16 tablet:ml-0">
                <span
                  className={`text-xs font-medium transition-colors ${
                    language === "es" ? "text-primary" : "text-gray-400"
                  }`}
                >
                  {t.lang.es}
                </span>
                <button
                  onClick={toggleLanguage}
                  className="relative inline-flex h-5 w-9 items-center rounded-full bg-secondary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  aria-label="Toggle language"
                >
                  <motion.span
                    className="inline-block h-3 w-3 transform rounded-full bg-primary shadow-lg"
                    animate={{
                      x: language === "es" ? 3 : 21,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                    }}
                  />
                </button>
                <span
                  className={`text-xs font-medium transition-colors ${
                    language === "en" ? "text-primary" : "text-gray-400"
                  }`}
                >
                  {t.lang.en}
                </span>
              </div>
            </div>

            {/* Right: Hamburger Menu Button */}
            <div className="flex justify-end">
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6 text-secondary" />
                ) : (
                  <Menu className="h-6 w-6 text-secondary" />
                )}
              </button>
            </div>
          </div>

          {/* Desktop Layout (>= 1024px): Flexbox with Horizontal Links */}
          <div className="hidden lg:flex items-center justify-between h-20 transition-all duration-300">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Image
                src="/assets/Logo-Apen-y-Asociadoss.png"
                alt="Apen y Asociados"
                width={180}
                height={64}
                className="h-16 w-auto transition-all duration-300"
                priority
              />
            </div>

            {/* Desktop Menu Items */}
            <div className="flex items-center space-x-8">
              {menuItems.map((item) => (
                <a
                  key={item.key}
                  href={`#${item.key}`}
                  className="text-secondary hover:text-primary transition-colors duration-200 font-medium"
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Desktop: IECnet Logo + Language Toggle */}
            <div className="flex items-center space-x-4 transition-all duration-300">
              <Image
                src="/assets/iec-net.png"
                alt="IECnet"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
              <LanguageToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile & Tablet Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={closeMobileMenu}
            />

            {/* Mobile & Tablet Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-white z-50 shadow-2xl lg:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Menu Header */}
                <div className="flex items-center justify-between px-6 h-20 border-b border-gray-200">
                  <span className="text-lg font-semibold text-secondary">
                    Menu
                  </span>
                  <button
                    onClick={closeMobileMenu}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    aria-label="Close menu"
                  >
                    <X className="h-6 w-6 text-secondary" />
                  </button>
                </div>

                {/* Mobile Menu Items */}
                <nav className="flex-1 px-6 py-8 space-y-1 overflow-y-auto">
                  {menuItems.map((item, index) => (
                    <motion.a
                      key={item.key}
                      href={`#${item.key}`}
                      onClick={closeMobileMenu}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="block px-4 py-3 text-lg font-medium text-secondary hover:text-primary hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      {item.label}
                    </motion.a>
                  ))}
                </nav>

                {/* Mobile Menu Footer with IECnet Logo */}
                <div className="px-6 py-6 border-t border-gray-200">
                  <div className="flex justify-center">
                    <Image
                      src="/assets/iec-net.png"
                      alt="IECnet"
                      width={120}
                      height={40}
                      className="h-10 w-auto"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
