import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "../context/LanguageContext";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "National Oil & Gas Company (NOGC) | Powering Mozambique's Energy Future",
  description: "NOGC is Mozambique's leading energy partner, delivering innovative, reliable, and sustainable solutions in oil exploration, gas processing, and renewable energy.",
  keywords: ["Oil", "Gas", "Mozambique", "Energy", "NOGC", "Petroleum", "Renewable Energy", "Infrastructure"],
  authors: [{ name: "National Oil & Gas Company SA" }],
  openGraph: {
    title: "National Oil & Gas Company (NOGC)",
    description: "Powering Mozambique's Energy Future through innovation, safety, and sustainable operations.",
    type: "website",
    locale: "en_US",
    url: "https://www.nogc.co.mz",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth overflow-x-hidden">
      <body
        className={`${outfit.variable} ${inter.variable} antialiased bg-slate-950 text-white font-sans overflow-x-hidden`}
      >
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
