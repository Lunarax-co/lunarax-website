'use client';

import { useState } from 'react';

interface Question {
  id: number;
  question: string;
  options: { text: string; score: number }[];
}

const questions: Question[] = [
  {
    id: 1,
    question: 'Şirketinizin aylık fatura/belge hacmi nedir?',
    options: [
      { text: 'Çok az (0-50 adet)', score: 0 },
      { text: 'Orta (50-200 adet)', score: 1 },
      { text: 'Yüksek (200+ adet)', score: 2 },
    ],
  },
  {
    id: 2,
    question: 'Mevcut ön muhasebe yönetiminizde yaşadığınız en büyük sorun nedir?',
    options: [
      { text: 'Sorun yaşamıyorum', score: 0 },
      { text: 'Personel devir hızı yüksek', score: 2 },
      { text: 'Maliyet kontrolü zor', score: 1 },
    ],
  },
  {
    id: 3,
    question: 'Gelecek 12 ayda büyüme hedefleriniz nasıl?',
    options: [
      { text: 'Mevcut durumu korumak', score: 0 },
      { text: 'Orta ölçekte büyüme', score: 1 },
      { text: 'Hızlı büyüme/yurtdışı açılım', score: 2 },
    ],
  },
];

export function SuitabilityQuiz() {
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (questionId: number, score: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: score }));
  };

  const calculateResult = () => {
    const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
    setShowResult(true);
    return totalScore;
  };

  const allAnswered = Object.keys(answers).length === questions.length;
  const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
  const isSuitable = totalScore >= 3;

  return (
    <div className="suitability-quiz">
      <h3 className="quiz-title">Hizmetimiz Size Uygun mu?</h3>
      <p className="quiz-subtitle">3 soruyu yanıtlayarak öğrenin</p>

      <div className="quiz-questions">
        {questions.map((q) => (
          <div key={q.id} className="quiz-question">
            <p className="question-text">
              <span className="question-number">Soru {q.id}:</span> {q.question}
            </p>
            <div className="quiz-options">
              {q.options.map((option, index) => (
                <button
                  key={index}
                  className={`quiz-option ${answers[q.id] === option.score ? 'selected' : ''}`}
                  onClick={() => handleAnswer(q.id, option.score)}
                >
                  {option.text}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {allAnswered && !showResult && (
        <button className="quiz-submit-btn" onClick={calculateResult}>
          Sonucu Gör
        </button>
      )}

      {showResult && (
        <div className={`quiz-result ${isSuitable ? 'suitable' : 'not-suitable'}`}>
          <div className="result-icon">{isSuitable ? '✅' : '⚠️'}</div>
          <div className="result-text">
            <strong>{isSuitable ? 'Hizmetimiz Size Uygun!' : 'Şu An İçin Uygun Değil'}</strong>
            <p>
              {isSuitable
                ? 'İşletmenizin profili süreç bazlı ön muhasebe hizmetinden faydalanmak için uygun görünüyor. Detaylı görüşme için formumuzu doldurun.'
                : 'Mevcut iş hacminiz ve ihtiyaçlarınız göz önüne alındığında, klasik personel çalışması veya serbest muhasebeci daha uygun olabilir.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
