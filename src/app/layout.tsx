import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat, Trade_Winds } from "next/font/google";
import "./globals.css";
import ClientProviders from "@/components/providers/ClientProviders";
import Script from "next/script";

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
        <meta
          name="google-site-verification"
          content="75S_6Qlt5-LofAcnswD010xOqxBzGg4m6n7LwT96ozc"
        />
        {/* <!-- Google tag (gtag.js) --> */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1TJXBXVSDQ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1TJXBXVSDQ');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${montserrat.variable} ${tradeWinds.variable} antialiased overflow-x-hidden`}
      >
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
