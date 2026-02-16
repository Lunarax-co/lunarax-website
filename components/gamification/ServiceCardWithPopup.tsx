'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  link: string;
  suitableFor: string[];
}

export function ServiceCardWithPopup({ icon, title, description, link, suitableFor }: ServiceCardProps) {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div 
      className="service-card-wrapper"
      onMouseEnter={() => setShowPopup(true)}
      onMouseLeave={() => setShowPopup(false)}
    >
      <Link href={link} className="service-card">
        <div className="service-icon">{icon}</div>
        <h3>{title}</h3>
        <p>{description}</p>
      </Link>
      
      {showPopup && (
        <div className="service-popup">
          <div className="popup-header">Kimler için uygun?</div>
          <ul className="popup-checklist">
            {suitableFor.map((item, index) => (
              <li key={index}>
                <span className="check-icon">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
