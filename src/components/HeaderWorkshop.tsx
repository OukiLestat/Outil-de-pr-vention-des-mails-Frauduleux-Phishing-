import React from 'react';
import { ShieldCheck, Calendar, Clock, User, Award, Eye, ZoomIn, ZoomOut, FileText, CheckCircle2 } from 'lucide-react';
import { WORKSHOP_DETAILS } from '../data/workshopData';
import { FontSize } from '../types';

interface HeaderWorkshopProps {
  activeTab: 'game' | 'risks' | 'analysis' | 'scanner';
  setActiveTab: (tab: 'game' | 'risks' | 'analysis' | 'scanner') => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  solvedCount: number;
  totalCount: number;
  onOpenDiploma: () => void;
}

export const HeaderWorkshop: React.FC<HeaderWorkshopProps> = ({
  activeTab,
  setActiveTab,
  fontSize,
  setFontSize,
  solvedCount,
  totalCount,
  onOpenDiploma
}) => {
  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 shadow-md">
      {/* Top Banner: Workshop Meta Details without pricing or senior label */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 border-b border-blue-900/40 px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs md:text-sm">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-slate-300">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-semibold border border-blue-400/30">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              {WORKSHOP_DETAILS.sessionNumber}
            </span>
            
            {/* Animé par Christophe + Little Lightbulb for Pedagogical Analysis */}
            <div className="inline-flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span>Animé par <strong className="text-white font-medium">{WORKSHOP_DETAILS.animator}</strong></span>
              
              {/* Point 4: Small lightbulb button only */}
              <button
                onClick={() => setActiveTab('analysis')}
                className={`p-1 rounded-full transition relative group cursor-pointer ${
                  activeTab === 'analysis' 
                    ? 'bg-amber-400/30 ring-2 ring-amber-400 text-amber-300 shadow-sm shadow-amber-400/50' 
                    : 'hover:bg-slate-800 text-amber-400 hover:text-amber-300'
                }`}
                title="Analyse pédagogique et conseils de Christophe (Cliquez pour consulter)"
                aria-label="Analyse pédagogique"
              >
                <span className="text-sm sm:text-base leading-none block transform group-hover:scale-110 transition">💡</span>
                {/* Micro tooltip */}
                <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 bg-slate-950 text-white text-[10px] font-medium px-2 py-0.5 rounded border border-slate-700 opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-40">
                  Analyse pédagogique
                </span>
              </button>
            </div>

            <span className="inline-flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-blue-400" />
              {WORKSHOP_DETAILS.date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              {WORKSHOP_DETAILS.schedule}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-blue-300 bg-blue-950/60 border border-blue-500/30 px-2.5 py-0.5 rounded text-xs font-semibold">
              🛡️ {WORKSHOP_DETAILS.location}
            </span>
          </div>
        </div>
      </div>

      {/* Main Title & Action Bar */}
      <div className="max-w-7xl mx-auto px-4 py-4 sm:py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30 font-bold text-xl">
              🔍
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                Cyber-Enquête : Déjouer les Mails Pièges
              </h1>
              <p className="text-slate-400 text-sm">
                Simulateur de boîte mail Google • Entraînement pratique pour démasquer le phishing en toute sérénité
              </p>
            </div>
          </div>
        </div>

        {/* Accessibility Tools & Diploma Button */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* Text Size Controls */}
          <div className="flex items-center bg-slate-800/80 rounded-lg p-1 border border-slate-700/60 text-xs">
            <span className="text-slate-400 px-2 flex items-center gap-1 font-medium">
              <Eye className="w-3.5 h-3.5" /> Lecture :
            </span>
            <button
              onClick={() => setFontSize('normal')}
              className={`px-2.5 py-1 rounded transition font-medium ${fontSize === 'normal' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'}`}
              title="Taille de texte standard"
            >
              Normal
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-2.5 py-1 rounded transition font-medium text-sm ${fontSize === 'large' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'}`}
              title="Texte plus grand et confortable"
            >
              Grand
            </button>
            <button
              onClick={() => setFontSize('xlarge')}
              className={`px-2.5 py-1 rounded transition font-medium text-base ${fontSize === 'xlarge' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-300 hover:text-white'}`}
              title="Très grand texte pour un confort optimal"
            >
              A++
            </button>
          </div>

          {/* Diploma Trigger */}
          <button
            onClick={onOpenDiploma}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white px-3.5 py-2 rounded-lg font-medium text-sm shadow-md transition"
          >
            <Award className="w-4 h-4 text-amber-200" />
            <span>Mon Diplôme ({solvedCount}/{totalCount})</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="max-w-7xl mx-auto px-4 flex space-x-1 border-t border-slate-800/80 overflow-x-auto">
        <button
          onClick={() => setActiveTab('game')}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition whitespace-nowrap ${
            activeTab === 'game'
              ? 'border-blue-500 text-blue-400 bg-blue-500/10'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>1. Boîte Mail Gmail & Enquête ({solvedCount}/{totalCount})</span>
        </button>

        <button
          onClick={() => setActiveTab('risks')}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition whitespace-nowrap ${
            activeTab === 'risks'
              ? 'border-blue-500 text-blue-400 bg-blue-500/10'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>2. Grand Tableau des Risques</span>
        </button>

        <button
          onClick={() => setActiveTab('scanner')}
          className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold border-b-2 transition whitespace-nowrap ${
            activeTab === 'scanner'
              ? 'border-blue-500 text-blue-400 bg-blue-500/10'
              : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
          }`}
        >
          <span>🧪</span>
          <span>3. Testeur de Mail (Bac à sable)</span>
        </button>
      </nav>
    </header>
  );
};
