import type { Metadata } from "next";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Apen y Asociados | Auditoría Financiera Profesional",
  description: "Soluciones profesionales de auditoría y consultoría financiera para empresas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="bg-background antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
