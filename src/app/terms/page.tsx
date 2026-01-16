"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowLeft } from "lucide-react";

const termsContent = {
  es: {
    title: "Términos y Condiciones",
    date: "Última Actualización: 01 de enero de 2026",
    sections: [
      {
        title: "1. Aceptación",
        content: "Al usar este sitio, acepta estos términos.",
      },
      {
        title: "2. No Asesoría",
        content:
          "La relación profesional comienza solo tras la firma de un contrato, no por el envío del formulario.",
      },
      {
        title: "3. Uso Correcto",
        content: "El usuario garantiza información real.",
      },
      {
        title: "4. Propiedad",
        content: "Logos y diseño pertenecen a Apen y Asociados.",
      },
    ],
    backToHome: "Volver al inicio",
  },
  en: {
    title: "Terms & Conditions",
    date: "Last Updated: January 01, 2026",
    sections: [
      {
        title: "1. Acceptance",
        content: "By using this site, you agree to these terms.",
      },
      {
        title: "2. No Advisory Relationship",
        content:
          "Professional relationship starts only after a signed contract, not by form submission.",
      },
      {
        title: "3. Accuracy",
        content: "Users must provide truthful information.",
      },
      {
        title: "4. Property",
        content: "Logos and design belong to Apen y Asociados.",
      },
    ],
    backToHome: "Back to home",
  },
};

export default function TermsPage() {
  const { language } = useLanguage();
  const content = termsContent[language];

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#12ACA4] hover:text-[#0e918a] transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          {content.backToHome}
        </Link>

        <h1 className="text-3xl lg:text-4xl font-bold text-[#17383F] mb-4">
          {content.title}
        </h1>

        <p className="text-gray-500 text-sm mb-8">{content.date}</p>

        <div className="space-y-6">
          {content.sections.map((section, index) => (
            <div key={index}>
              <h2 className="text-xl font-semibold text-[#17383F] mb-2">
                {section.title}
              </h2>
              <p className="text-gray-600 leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
