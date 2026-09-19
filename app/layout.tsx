import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileConversionBar } from "@/components/layout/MobileConversionBar";
import { FloatingContactButtons } from "@/components/layout/FloatingContactButtons";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ved Enterprises | Fast & Reliable Home Appliance Repair at Your Doorstep",
  description:
    "Professional doorstep repair and servicing for AC, Refrigerator, Washing Machine, Microwave, RO Water Purifier, Geyser, TV, and Appliance Installation. Transparent pricing and genuine spare parts.",
  keywords: [
    "appliance repair",
    "AC repair",
    "refrigerator repair",
    "washing machine repair",
    "RO service",
    "geyser repair",
    "doorstep appliance service",
    "Ved Enterprises",
  ],
  authors: [{ name: "Ved Enterprises" }],
  openGraph: {
    title: "Ved Enterprises | Home Appliance Repair & Servicing",
    description:
      "Expert doorstep diagnostics, repairs, and genuine parts for all household appliances. Book your same-day repair today.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}>
      <body className="min-h-screen flex flex-col bg-white text-slate-900 antialiased selection:bg-orange-500 selection:text-white">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingContactButtons />
        <MobileConversionBar />
      </body>
    </html>
  );
}
