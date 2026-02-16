'use client';

/* 
  LUNARA - Danışmanlık Yolculuğu Akışı
  Amaç: Kullanıcının kendini tanıması, firmanın durumunu analiz etmesi ve ona özel çözüm haritasına ulaşması.
*/

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ContactButton from '@/components/ContactButton';
import Footer from '@/components/Footer';

const questions = [
  {
    id: 1,
    question: "Firmanız hangi aşamada?",
    options: ["Yeni kuruluyor", "Büyüme aşamasında", "Yurtdışına açılmak istiyor", "Yeniden yapılanma sürecinde"]
  },
  {
    id: 2,
    question: "En çok ihtiyaç duyduğunuz alan hangisi?",
    options: ["Stratejik planlama", "Maliyet düşürme", "Yatırım alma", "Ekip/verimlilik"]
  },
  {
    id: 3,
    question: "Sektörünüz nedir?",
    options: ["Hizmet", "Üretim", "E-ticaret", "Teknoloji", "Turizm", "Diğer"]
  }
];

const solutionMatrix: { [key: string]: string } = {
  "Yeni kuruluyor|Stratejik planlama": "İş Planı Geliştirme",
  "Büyüme aşamasında|Yatırım alma": "Büyüme Stratejileri",
  "Yurtdışına açılmak istiyor|Stratejik planlama": "Uluslararasılaşma",
  "Yeniden yapılanma sürecinde|Ekip/verimlilik": "Süreç İyileştirme"
};

export default function DanismanlikAkisi() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  const handleAnswer = (q: number, answer: string) => {
    setAnswers({ ...answers, [q]: answer });
    setStep(step + 1);
  };

  const getResult = () => {
    const key = `${answers[1]}|${answers[2]}`;
    return solutionMatrix[key] || "Özelleştirilmiş Danışmanlık";
  };

  if (step >= questions.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2C1810] via-[#5D4E37] to-[#3D2E1F] flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-8 text-white text-center">
            Sizin İçin En Uygun Hizmet
          </h1>
          <Card className="bg-white/10 backdrop-blur-sm text-white w-full max-w-md border border-white/20">
            <CardContent className="p-8">
              <p className="text-lg mb-4 text-white/80">
                Lunara'nın size önerdiği danışmanlık hizmeti:
              </p>
              <h2 className="text-3xl mt-6 mb-8 font-bold text-white">
                {getResult()}
              </h2>
              <div className="flex flex-col gap-4">
                <Button 
                  variant="default" 
                  onClick={() => setStep(0)}
                  className="w-full"
                >
                  Tekrar Başla
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={() => window.location.href = 'mailto:info@lunara.com'}
                  className="w-full"
                >
                  Detaylı Bilgi Al
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <ContactButton />
        <Footer />
      </div>
    );
  }

  const current = questions[step];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2C1810] via-[#5D4E37] to-[#3D2E1F] flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white text-center">
          Danışmanlık Yolculuğunuz
        </h1>
        <p className="text-white/70 mb-8 text-center">
          Adım {step + 1} / {questions.length}
        </p>
        
        <Card className="bg-white/10 backdrop-blur-sm text-white w-full max-w-xl border border-white/20">
          <CardContent className="p-8">
            <p className="text-2xl mb-8 font-semibold text-white text-center">
              {current.question}
            </p>
            <div className="flex flex-col gap-4">
              {current.options.map((opt, idx) => (
                <Button 
                  key={idx} 
                  variant="outline" 
                  onClick={() => handleAnswer(current.id, opt)}
                  className="w-full text-lg py-4 hover:scale-105"
                >
                  {opt}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <ContactButton />
      <Footer />
    </div>
  );
}
