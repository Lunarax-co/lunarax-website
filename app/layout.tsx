import Script from "next/script";
import type { Metadata } from "next";
import "./globals.css";
import { GamificationProvider } from "@/contexts/GamificationContext";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  title: "LunaraX - Süreç Bazlı Ön Muhasebe Yönetimi",
  description:
    "Güçlü bir ekosistemle çalışan, süreç odaklı ön muhasebe ve operasyon yönetimi hizmeti.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <head>
        <link rel="stylesheet" href="/styles.css" />
      </head>

      <body className="antialiased text-[#E8E9ED] bg-[#0A1520]">
        {/* ✅ Google Analytics (GA4) */}
        {GA_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script
              id="google-analytics"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}', { send_page_view: true });
                `,
              }}
            />
          </>
        ) : null}

        <GamificationProvider>{children}</GamificationProvider>
      </body>
    </html>
  );
}
