'use client';

// Sabit "Bize Ulaşın" Butonu - Sağ alt köşede her sayfada görünür
export default function ContactButton() {
  return (
    <a
      href="mailto:info@lunara.com"
      className="fixed bottom-8 right-8 z-50 bg-white text-[#5D4E37] px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 font-semibold text-sm md:text-base"
      aria-label="Bize Ulaşın"
    >
      Bize Ulaşın
    </a>
  );
}
