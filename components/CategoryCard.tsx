'use client';

import Link from 'next/link';

// Kategori Kart Bileşeni - Her alt hizmet için kullanılır
interface CategoryCardProps {
  icon: string;
  title: string;
  description: string;
  href: string;
}

export default function CategoryCard({ icon, title, description, href }: CategoryCardProps) {
  return (
    <Link href={href}>
      <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:scale-105 hover:bg-white/20 transition-all duration-300 cursor-pointer border border-white/20">
        {/* İkon */}
        <div className="text-4xl mb-4">{icon}</div>
        
        {/* Başlık */}
        <h3 className="text-xl font-semibold text-white mb-3">{title}</h3>
        
        {/* Açıklama */}
        <p className="text-white/80 text-sm">{description}</p>
      </div>
    </Link>
  );
}
