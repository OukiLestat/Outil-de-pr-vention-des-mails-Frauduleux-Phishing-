import React, { useState, useEffect } from 'react';
import { HeaderWorkshop } from './components/HeaderWorkshop';
import { GameDetective } from './components/GameDetective';
import { RiskTable } from './components/RiskTable';
import { PedagogicalAnalysis } from './components/PedagogicalAnalysis';
import { MailScanner } from './components/MailScanner';
import { DiplomaModal } from './components/DiplomaModal';
import { EMAILS_CASES } from './data/emailsData';
import { WORKSHOP_DETAILS } from './data/workshopData';
import { FontSize } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<'game' | 'risks' | 'analysis' | 'scanner'>('game');
  const [fontSize, setFontSize] = useState<FontSize>('normal');
  const [isDiplomaOpen, setIsDiplomaOpen] = useState<boolean>(false);

  // Solved cases state saved in memory / localStorage for user persistence
  const [solvedCases, setSolvedCases] = useState<Record<string, {
    verdict: 'phishing' | 'safe';
    isCorrect: boolean;
    selectedOptions: string[];
    score: number;
  }>>(() => {
    try {
      const saved = localStorage.getItem('senior_workshop_solved_cases');
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('senior_workshop_solved_cases', JSON.stringify(solvedCases));
    } catch (e) {
      // Safe fallback
    }
  }, [solvedCases]);

  const handleCaseSolved = (
    caseId: string,
    verdict: 'phishing' | 'safe',
    isCorrect: boolean,
    selectedOptions: string[],
    score: number
  ) => {
    setSolvedCases(prev => ({
      ...prev,
      [caseId]: { verdict, isCorrect, selectedOptions, score }
    }));
  };

  const handleResetExercise = () => {
    setSolvedCases({});
    try {
      localStorage.removeItem('senior_workshop_solved_cases');
    } catch (e) {
      // Safe fallback
    }
  };

  const solvedCount = Object.keys(solvedCases).length;
  const correctCount = (Object.values(solvedCases) as { verdict: 'phishing' | 'safe'; isCorrect: boolean }[]).filter(s => s.isCorrect).length;

  return (
    <div className={`min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans selection:bg-blue-200 selection:text-blue-900 ${
      fontSize === 'large' ? 'text-base' : fontSize === 'xlarge' ? 'text-lg' : 'text-sm'
    }`}>
      {/* Header and navigation */}
      <HeaderWorkshop
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        fontSize={fontSize}
        setFontSize={setFontSize}
        solvedCount={solvedCount}
        totalCount={EMAILS_CASES.length}
        onOpenDiploma={() => setIsDiplomaOpen(true)}
      />

      {/* Main Content Areas */}
      <main className="flex-1 pb-16">
        {activeTab === 'game' && (
          <GameDetective
            fontSize={fontSize}
            solvedCases={solvedCases}
            onCaseSolved={handleCaseSolved}
            onOpenDiploma={() => setIsDiplomaOpen(true)}
            onResetExercise={handleResetExercise}
          />
        )}

        {activeTab === 'risks' && (
          <RiskTable fontSize={fontSize} />
        )}

        {activeTab === 'analysis' && (
          <PedagogicalAnalysis />
        )}

        {activeTab === 'scanner' && (
          <MailScanner fontSize={fontSize} />
        )}
      </main>

      {/* Printable Diploma Modal */}
      <DiplomaModal
        isOpen={isDiplomaOpen}
        onClose={() => setIsDiplomaOpen(false)}
        solvedCount={solvedCount}
        totalCount={EMAILS_CASES.length}
        correctCount={correctCount}
      />

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-6 border-t border-slate-800 print:hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p>
            Atelier n°6 : Initiation « Mail frauduleux » • Animé par Christophe • Lundi 14 Décembre 2026 (14h-16h)
          </p>
          <p className="text-slate-500">
            Développé pour la médiation numérique et la sécurité pour tous
          </p>
        </div>
      </footer>
    </div>
  );
}
