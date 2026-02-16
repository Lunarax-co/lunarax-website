import Script from "next/script";
import type { Metadata } from 'next';
import './globals.css';
import { GamificationProvider } from '@/contexts/GamificationContext';

export const metadata: Metadata = {
  title: 'LunaraX - Süreç Bazlı Ön Muhasebe Yönetimi',
  description: 'Güçlü bir ekosistemle çalışan, süreç odaklı ön muhasebe ve operasyon yönetimi hizmeti.',
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

        <Script
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
  strategy="afterInteractive"
/>

<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
  `}
</Script>

      </head>
      <body className="antialiased text-[#E8E9ED] bg-[#0A1520]">
        <GamificationProvider>
          {children}
        </GamificationProvider>
      </body>
    </html>
  );
}
