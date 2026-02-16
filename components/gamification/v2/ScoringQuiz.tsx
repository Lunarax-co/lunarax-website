'use client';

import { useState } from 'react';

interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    weight: number;
  }[];
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'Aylık belge hacminiz ne kadar?',
    options: [
      { text: 'Çok az (0-50)', weight: 0 },
      { text: 'Orta (50-200)', weight: 1 },
      { text: 'Yüksek (200+)', weight: 2 },
    ],
  },
  {
    id: 2,
    question: 'En büyük sorununuz hangisi?',
    options: [
      { text: 'Sorun yaşamıyorum', weight: 0 },
      { text: 'Personel devir hızı', weight: 2 },
      { text: 'Maliyet kontrolü', weight: 1 },
    ],
  },
  {
    id: 3,
    question: 'Gelecek 12 ay için hedefiniz nedir?',
    options: [
      { text: 'Mevcut durumu korumak', weight: 0 },
      { text: 'Orta ölçekte büyüme', weight: 1 },
      { text: 'Hızlı büyüme / yurt dışı', weight: 2 },
    ],
  },
];

const scoreResults = [
  {
    score: 5,
    title: '🎯 Mükemmel Eşleşme',
    description: 'LunaraX, işletmenizin ihtiyaçlarını tam olarak karşılamak için tasarlandı.',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    score: 3,
    title: '✨ Geliştirilebilir ama Uygun',
    description: 'Biraz optimizasyon ile LunaraX\'ın tam potansiyelinden daha fazla yararlanabilirsiniz.',
    color: 'from-amber-500 to-amber-600',
  },
  {
    score: 0,
    title: '⚠️ Şu an için Uygun Değil',
    description: 'İşlem hacminiz düşük olabilir. Ancak büyüdüğünüzde LunaraX\'ı değerlendirebilirsiniz.',
    color: 'from-slate-500 to-slate-600',
  },
];

export function ScoringQuiz() {
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [showResult, setShowResult] = useState(false);
  const [showConsultOptions, setShowConsultOptions] = useState(false);

  const handleAnswer = (questionId: number, weight: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: weight,
    }));
  };

  const totalScore = Object.values(answers).reduce((sum, w) => sum + w, 0);
  const allAnswered = Object.keys(answers).length === quizQuestions.length;

  const getResult = () => {
    if (totalScore >= 5) return scoreResults[0];
    if (totalScore >= 3) return scoreResults[1];
    return scoreResults[2];
  };

  const result = getResult();
  const canConsult = totalScore >= 3;

  return (
    <div className="w-full py-12" id="hizmet-uygunluk-testi">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-2">
            <svg
              className="h-6 w-6 text-emerald-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="2" y="7" width="20" height="10" rx="5" />
              <path d="M6 12h4" />
              <path d="M8 10v4" />
              <circle cx="17" cy="11" r="1" />
              <circle cx="19" cy="13" r="1" />
            </svg>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Hizmet Uygunluk Testi
            </h2>
          </div>
          <p className="text-slate-400">
            3 soru cevaplayıp, size uygun olup olmadığını öğrenin
          </p>
        </div>

        {/* Questions */}
        {!showResult ? (
          <div className="space-y-8">
            {quizQuestions.map((q) => (
              <div
                key={q.id}
                className="p-6 bg-slate-800/40 border border-slate-600/50 rounded-xl"
              >
                <h3 className="text-lg sm:text-xl font-semibold text-white mb-4">
                  Soru {q.id}: {q.question}
                </h3>
                <div className="space-y-3">
                  {q.options.map((option, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleAnswer(q.id, option.weight)}
                      className={`
                        w-full text-left p-4 rounded-lg border-2 transition-all duration-200
                        ${
                          answers[q.id] === option.weight
                            ? 'border-emerald-500 bg-emerald-500/20 text-emerald-200'
                            : 'border-slate-600/50 bg-slate-700/30 text-slate-300 hover:border-emerald-500/50 hover:bg-slate-700/50'
                        }
                      `}
                    >
                      <span className="font-semibold">{option.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => setShowResult(true)}
                disabled={!allAnswered}
                className={`
                  px-8 py-3 rounded-lg font-bold transition-all duration-300
                  ${
                    allAnswered
                      ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:shadow-lg hover:shadow-emerald-500/50 cursor-pointer'
                      : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                  }
                `}
              >
                {allAnswered ? 'Sonucu Gör' : 'Tüm soruları cevaplayın'}
              </button>
            </div>
          </div>
        ) : (
          // Result Screen
          <div className="animate-in fade-in duration-300">
            <div
              className={`
                max-w-xl mx-auto p-6 sm:p-8 rounded-2xl border-2 border-opacity-50 bg-gradient-to-br
                ${result.color} bg-opacity-10 border-current
              `}
            >
              <h3
                className={`
                  text-3xl font-bold mb-3
                  ${result.color === 'from-emerald-500 to-emerald-600' && 'text-emerald-300'}
                  ${result.color === 'from-amber-500 to-amber-600' && 'text-amber-300'}
                  ${result.color === 'from-slate-500 to-slate-600' && 'text-slate-300'}
                `}
              >
                {result.title}
              </h3>
              <p className="text-slate-300 mb-6">
                {result.description}
              </p>

              {/* Consultation CTA */}
              <div className="mb-8">
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      if (canConsult) {
                        setShowConsultOptions((prev) => !prev);
                      }
                    }}
                    className={`
                      w-full sm:w-auto px-6 py-3 rounded-lg font-bold transition-all duration-300
                      ${
                        canConsult
                          ? 'bg-emerald-500 text-slate-900 hover:bg-emerald-400 hover:shadow-lg hover:shadow-emerald-500/40'
                          : 'bg-slate-700 text-slate-400 cursor-not-allowed'
                      }
                    `}
                  >
                    Danışmanlık Al
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowResult(false);
                      setAnswers({});
                      setShowConsultOptions(false);
                    }}
                    className="w-full sm:w-auto px-6 py-3 rounded-lg border-2 border-slate-600 text-slate-300 font-bold hover:border-slate-500 transition-colors"
                  >
                    Tekrar
                  </button>
                </div>
                {!canConsult && (
                  <p className="text-xs text-slate-500 mt-2">
                    Danışmanlık için uygunluk sonucu gerekiyor.
                  </p>
                )}

                {canConsult && showConsultOptions && (
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="p-4 bg-slate-800/50 border border-slate-600/50 rounded-lg">
                      <h4 className="text-sm font-semibold text-white mb-2">
                        Formu Doldur
                      </h4>
                      <p className="text-xs text-slate-400 mb-3">
                        Formu doldurarak işletmenizi ve ihtiyaçlarınızı netleştirirsiniz; böylece size en uygun danışmanlık planını daha hızlı hazırlayabiliriz.
                      </p>
                      <a
                        href="/firmanizi-taniyalim.html"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-900 font-semibold rounded-md transition-all duration-300"
                      >
                        <span>📝</span>
                        <span>Formu Doldur</span>
                      </a>
                    </div>
                    <div className="p-4 bg-slate-800/50 border border-slate-600/50 rounded-lg">
                      <h4 className="text-sm font-semibold text-white mb-2">
                        Hızlı İletişim
                      </h4>
                      <p className="text-xs text-slate-400 mb-3">
                        Hızlı bir ön görüşme için bizi hemen bilgilendirin.
                      </p>
                      <a
                        href="/iletisim.html"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-md transition-all duration-300"
                      >
                        <span>⚡</span>
                        <span>Hızlı İletişim</span>
                      </a>
                    </div>
                  </div>
                )}
              </div>

              {/* Score Breakdown */}
              <div className="space-y-3 mb-8">
                <h4 className="font-bold text-white text-sm">Analiz:</h4>
                <div className="grid grid-cols-3 gap-4">
                  {quizQuestions.map((q) => (
                    <div
                      key={q.id}
                      className="p-3 bg-slate-800/50 rounded-lg text-center"
                    >
                      <p className="text-xs text-slate-400 mb-1">S{q.id}</p>
                      <p className="font-bold text-emerald-400">
                        +{answers[q.id]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
