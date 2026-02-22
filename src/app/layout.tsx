import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat, Trade_Winds } from "next/font/google";
import "./globals.css";
import ClientProviders from "@/components/providers/ClientProviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const tradeWinds = Trade_Winds({
  subsets: ["latin"],
  weight: "400", // Trade Winds has only 400
  display: "swap",
  variable: "--font-trade-winds",
});

export const metadata: Metadata = {
  title: "Tufani Pizza",
  description: "",
  icons: {
    icon: "/favicon.jpeg",
    shortcut: "/favicon.jpeg",
    apple: "/favicon.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="favicon.jpeg" type="image/x-icon" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${tradeWinds.variable} antialiased overflow-x-hidden`}
      >
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
