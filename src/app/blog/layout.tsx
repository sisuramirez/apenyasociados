import { Suspense } from "react";
import BlogLoading from "./loading";

export const metadata = {
  title: "Blog | Apen y Asociados",
  description: "Artículos, noticias y actualizaciones sobre auditoría, finanzas y consultoría empresarial.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<BlogLoading />}>
      {children}
    </Suspense>
  );
}
