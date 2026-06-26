import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "manudev — Manuel Pérez",
  description:
    "Portafolio de Manuel Antonio Pérez Fonseca. Estudiante de CS en Tecnológico de Monterrey. Full-stack: Next.js, React, FastAPI, SwiftUI.",
  icons: {
    icon: "/yo.png",
    apple: "/yo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${bricolage.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
