import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// Altere apenas esta parte:
export const metadata: Metadata = {
  title: "saep - Gestão de Estoque",
  description: "Sistema de Gestão de Estoque criado para o saep",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Recomendo mudar o lang para pt-BR
    <html lang="pt-BR"> 
      <body className={inter.className}>{children}</body>
    </html>
  );
}