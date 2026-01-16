"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowLeft } from "lucide-react";

const privacyContent = {
  es: {
    title: "Política de Privacidad",
    date: "Última Actualización: 01 de enero de 2026",
    content: `En Apen y Asociados, valoramos su privacidad.

Datos recolectados: Nombre, correo, teléfono y detalles de la cita.

Finalidad: Gestionar su solicitud y enviar confirmaciones.

Blog: Informativo, no constituye asesoría vinculante.

Protección: No compartimos datos con terceros; procesados en Vercel/Zoho.

Derechos: Acceso o eliminación vía info@apenyasociados.com.`,
    backToHome: "Volver al inicio",
  },
  en: {
    title: "Privacy Policy",
    date: "Last Updated: January 01, 2026",
    content: `At Apen y Asociados, we value your privacy.

Data Collected: Name, email, phone, and appointment details.

Purpose: Manage requests and send confirmations.

Blog: Educational, not binding advice.

Protection: No data sharing with third parties; processed via Vercel/Zoho.

Rights: Access or deletion via info@apenyasociados.com.`,
    backToHome: "Back to home",
  },
};

export default function PrivacyPage() {
  const { language } = useLanguage();
  const content = privacyContent[language];

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

        <div className="prose prose-lg max-w-none">
          {content.content.split("\n\n").map((paragraph, index) => (
            <p key={index} className="text-gray-600 leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </main>
  );
}
