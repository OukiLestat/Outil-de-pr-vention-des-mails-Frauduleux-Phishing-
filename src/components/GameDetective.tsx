import React, { useState } from 'react';
import { 
  ArrowLeft,
  Star,
  Archive,
  AlertOctagon,
  Trash2,
  Mail,
  Clock,
  Tag,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
  CheckSquare,
  Square,
  RefreshCw,
  ExternalLink,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Lightbulb,
  Award,
  Reply,
  Printer,
  Ban,
  FileWarning,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { EmailCase, FontSize, QuizOption } from '../types';
import { EMAILS_CASES } from '../data/emailsData';
import { EmailLogo } from './EmailLogos';
import { ClickDangerModal } from './ClickDangerModal';
import { BrowserUrlTooltip } from './BrowserUrlTooltip';

interface GameDetectiveProps {
  fontSize: FontSize;
  solvedCases: Record<string, {
    verdict: 'phishing' | 'safe';
    isCorrect: boolean;
    selectedOptions: string[];
    score: number;
  }>;
  onCaseSolved: (caseId: string, verdict: 'phishing' | 'safe', isCorrect: boolean, selectedOptions: string[], score: number) => void;
  onOpenDiploma: () => void;
  onResetExercise?: () => void;
}

const getEmailButtonStyle = (logoType?: string) => {
  switch (logoType) {
    case 'laposte':
      return 'bg-[#ffcc00] hover:bg-[#f5be00] text-slate-900 font-bold border border-amber-300 shadow-sm rounded-lg';
    case 'doctolib':
      return 'bg-[#0596de] hover:bg-[#0482bf] text-white font-bold shadow-sm rounded-lg';
    case 'netflix':
      return 'bg-[#e50914] hover:bg-[#cc0812] text-white font-bold shadow-sm rounded-md tracking-wide';
    case 'banque':
      return 'bg-[#e2001a] hover:bg-[#c00016] text-white font-bold shadow-sm rounded-lg';
    case 'edf':
      return 'bg-[#005bbb] hover:bg-[#004b9b] text-white font-semibold shadow-sm rounded-full';
    case 'mediatheque':
      return 'bg-slate-800 hover:bg-slate-900 text-white font-medium shadow-sm rounded-lg';
    case 'ameli':
      return 'bg-[#0c419a] hover:bg-[#0a357d] text-white font-semibold shadow-sm rounded-lg';
    case 'impots':
      return 'bg-[#000091] hover:bg-[#1212ff] text-white font-medium shadow-sm rounded';
    case 'antai':
      return 'bg-[#003184] hover:bg-[#002460] text-white font-bold shadow-sm rounded';
    case 'tech':
      return 'bg-amber-600 hover:bg-amber-700 text-white font-bold shadow-sm rounded-lg';
    case 'gagnant':
      return 'bg-emerald-600 hover:bg-emerald-700 text-white font-black shadow-md rounded-xl uppercase tracking-wider';
    default:
      return 'bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm rounded-lg';
  }
};

export const GameDetective: React.FC<GameDetectiveProps> = ({
  fontSize,
  solvedCases,
  onCaseSolved,
  onOpenDiploma,
  onResetExercise
}) => {
  // Navigation state: 'list' (Gmail Inbox) or 'detail' (Full Email Page)
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');
  const [selectedCaseId, setSelectedCaseId] = useState<string>(EMAILS_CASES[0].id);

  // Search & Filters in Gmail Inbox
  const [searchQuery, setSearchQuery] = useState('');
  const [inboxTab, setInboxTab] = useState<'primary' | 'promotions' | 'social'>('primary');
  const [starredEmails, setStarredEmails] = useState<Record<string, boolean>>({});
  const [showResetToast, setShowResetToast] = useState(false);

  // Hover and Click danger states
  const [hoveredUrl, setHoveredUrl] = useState<string | null>(null);
  const [isDangerModalOpen, setIsDangerModalOpen] = useState(false);

  // QCM state for current email
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [chosenVerdict, setChosenVerdict] = useState<'phishing' | 'safe' | null>(null);
  const [hasValidatedResponse, setHasValidatedResponse] = useState<boolean>(false);
  const [validationResult, setValidationResult] = useState<{
    isCorrect: boolean;
    score: number;
    maxScore: number;
  } | null>(null);

  const currentCase = EMAILS_CASES.find(c => c.id === selectedCaseId) || EMAILS_CASES[0];
  const caseProgress = solvedCases[currentCase.id];

  // Font size multiplier classes
  const textClass = {
    normal: 'text-sm sm:text-base',
    large: 'text-base sm:text-lg',
    xlarge: 'text-lg sm:text-xl leading-relaxed'
  }[fontSize];

  // Open an email in full page
  const handleOpenEmail = (emailId: string) => {
    setSelectedCaseId(emailId);
    setViewMode('detail');
    setHoveredUrl(null);

    // If already solved previously, restore state
    const prev = solvedCases[emailId];
    if (prev) {
      setSelectedOptions(prev.selectedOptions || []);
      setChosenVerdict(prev.verdict);
      setHasValidatedResponse(true);
      setValidationResult({
        isCorrect: prev.isCorrect,
        score: prev.score || 10,
        maxScore: 10
      });
    } else {
      setSelectedOptions([]);
      setChosenVerdict(null);
      setHasValidatedResponse(false);
      setValidationResult(null);
    }
  };

  // Return to Gmail Inbox
  const handleBackToInbox = () => {
    setViewMode('list');
    setHoveredUrl(null);
  };

  // Reset exercise to beginning (Refresh button)
  const handleRefresh = () => {
    if (onResetExercise) {
      onResetExercise();
    }
    setViewMode('list');
    setSearchQuery('');
    setSelectedCaseId(EMAILS_CASES[0].id);
    setSelectedOptions([]);
    setChosenVerdict(null);
    setHasValidatedResponse(false);
    setValidationResult(null);
    setHoveredUrl(null);
    setShowResetToast(true);
    setTimeout(() => setShowResetToast(false), 3500);
  };

  // Toggle star
  const toggleStar = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setStarredEmails(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Toggle option selection in QCM
  const toggleOption = (optionId: string) => {
    if (hasValidatedResponse) return; // Locked once validated
    setSelectedOptions(prev => 
      prev.includes(optionId) ? prev.filter(id => id !== optionId) : [...prev, optionId]
    );
  };

  // Submit QCM response
  const handleValidateResponse = () => {
    if (!chosenVerdict) return;

    const isVerdictCorrect = (chosenVerdict === 'phishing' && currentCase.isPhishing) ||
                             (chosenVerdict === 'safe' && !currentCase.isPhishing);

    // Calculate score based on correct anomaly selections
    const anomalies = currentCase.quizOptions.filter(o => o.isAnomaly).map(o => o.id);
    const correctSelected = selectedOptions.filter(id => anomalies.includes(id)).length;
    const incorrectSelected = selectedOptions.filter(id => !anomalies.includes(id)).length;
    
    let computedScore = isVerdictCorrect ? 5 : 0;
    computedScore += Math.max(0, correctSelected * 2 - incorrectSelected);

    setHasValidatedResponse(true);
    setValidationResult({
      isCorrect: isVerdictCorrect,
      score: computedScore,
      maxScore: 10
    });

    onCaseSolved(currentCase.id, chosenVerdict, isVerdictCorrect, selectedOptions, computedScore);

    // Celebration if finishing all cases successfully
    const currentSolvedCount = Object.keys(solvedCases).length + (caseProgress ? 0 : 1);
    if (isVerdictCorrect && currentSolvedCount >= EMAILS_CASES.length) {
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Safe fallback
      }
    }

    // Scroll automatically down to the correction section
    setTimeout(() => {
      const correctionElement = document.getElementById('correction-section');
      if (correctionElement) {
        correctionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 120);
  };

  // Navigate to next email
  const handleGoToNextEmail = () => {
    const currentIndex = EMAILS_CASES.findIndex(c => c.id === currentCase.id);
    if (currentIndex < EMAILS_CASES.length - 1) {
      handleOpenEmail(EMAILS_CASES[currentIndex + 1].id);
    } else {
      handleBackToInbox();
      onOpenDiploma();
    }
  };

  // Filtered emails in inbox
  const filteredEmails = EMAILS_CASES.filter(email => {
    const q = searchQuery.toLowerCase();
    return (
      email.subject.toLowerCase().includes(q) ||
      email.senderDisplay.toLowerCase().includes(q) ||
      email.bodySnippet.toLowerCase().includes(q) ||
      email.category.toLowerCase().includes(q)
    );
  });

  const totalSolved = Object.keys(solvedCases).length;
  const correctCount = (Object.values(solvedCases) as { verdict: 'phishing' | 'safe'; isCorrect: boolean }[]).filter(s => s.isCorrect).length;

  return (
    <div className="bg-[#f6f8fc] min-h-[calc(100vh-64px)] flex flex-col font-sans">
      {/* 1. Gmail Top Search and Branding Bar */}
      <div className="bg-white border-b border-slate-200 px-4 py-2.5 flex items-center justify-between gap-4 sticky top-0 z-30 shadow-xs">
        {/* Left: Gmail Logo & Menu */}
        <div className="flex items-center gap-3 shrink-0">
          <button 
            onClick={handleBackToInbox}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-600 transition"
            title="Menu principal"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className="h-0.5 w-full bg-slate-600 rounded"></span>
              <span className="h-0.5 w-full bg-slate-600 rounded"></span>
              <span className="h-0.5 w-full bg-slate-600 rounded"></span>
            </div>
          </button>
          
          <button 
            onClick={handleBackToInbox}
            className="flex items-center gap-2 group cursor-pointer focus:outline-none"
          >
            {/* Google Gmail Envelope Logo */}
            <div className="relative w-8 h-6 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-7 h-7">
                <path fill="#4285F4" d="M1.5 6.5v11a1.5 1.5 0 0 0 1.5 1.5h3.5v-9.5L12 13.5l5.5-4v9.5H21a1.5 1.5 0 0 0 1.5-1.5v-11a1.5 1.5 0 0 0-2.4-1.2L12 9.5 3.9 5.3A1.5 1.5 0 0 0 1.5 6.5z"/>
                <path fill="#EA4335" d="M12 9.5L3.9 5.3A1.5 1.5 0 0 0 1.5 6.5v2.3l10.5 5.7 10.5-5.7V6.5a1.5 1.5 0 0 0-2.4-1.2L12 9.5z"/>
                <path fill="#FBBC05" d="M17.5 19h3.5a1.5 1.5 0 0 0 1.5-1.5v-11L17.5 9.5V19z"/>
                <path fill="#34A853" d="M6.5 19H3a1.5 1.5 0 0 1-1.5-1.5v-11L6.5 9.5V19z"/>
              </svg>
            </div>
            <span className="text-xl font-normal text-slate-700 tracking-tight font-sans">
              Gmail
            </span>
          </button>

          <span className="hidden md:inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
            Simulateur d'Enquête • {EMAILS_CASES.length} Exercices (Pièges & Courriels Sûrs)
          </span>
        </div>

        {/* Center: Gmail Rounded Search Bar */}
        <div className="flex-1 max-w-2xl mx-auto">
          <div className="relative flex items-center bg-[#edf2fc] hover:bg-[#e4ebf8] focus-within:bg-white focus-within:shadow-md rounded-full px-4 py-2 transition border border-transparent focus-within:border-slate-300">
            <Search className="w-4 h-4 text-slate-500 mr-3 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Rechercher dans les messages (Ameli, Colissimo, Impôts, etc.)"
              className="w-full bg-transparent text-sm text-slate-800 placeholder-slate-500 focus:outline-none"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="text-xs text-slate-400 hover:text-slate-700 px-1"
              >
                ✕
              </button>
            )}
            <SlidersHorizontal className="w-4 h-4 text-slate-500 ml-2 shrink-0 cursor-pointer hover:text-slate-700" />
          </div>
        </div>

        {/* Right: User Avatar & Diploma Quick Trigger */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <div className="hidden sm:flex flex-col text-right">
            <span className="text-xs font-bold text-slate-800">
              Progression : {totalSolved}/{EMAILS_CASES.length}
            </span>
            <span className="text-[11px] text-emerald-700 font-medium">
              {correctCount} sans faute
            </span>
          </div>

          <button
            onClick={onOpenDiploma}
            className="flex items-center gap-1.5 text-xs font-bold bg-amber-100 hover:bg-amber-200 text-amber-900 px-3 py-1.5 rounded-full border border-amber-300 transition shadow-xs"
            title="Voir mon attestation"
          >
            <Award className="w-3.5 h-3.5 text-amber-700" />
            <span className="hidden sm:inline">Mon Attestation</span>
          </button>

          {/* User profile avatar */}
          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-xs border border-blue-700">
            J
          </div>
        </div>
      </div>

      {/* Main Gmail Layout with Sidebar & Content */}
      <div className="flex-1 flex max-w-[1600px] w-full mx-auto">
        {/* Left Sidebar (Classic Gmail Style) */}
        <aside className="w-16 md:w-60 p-2 md:p-3 shrink-0 border-r border-slate-200/80 bg-[#f6f8fc] hidden sm:flex sm:flex-col justify-between">
          <div className="space-y-4">
            {/* New Message / Compose Button */}
            <div className="px-1">
              <button 
                onClick={() => handleOpenEmail(EMAILS_CASES[0].id)}
                className="w-full flex items-center gap-3 bg-[#c2e7ff] hover:bg-[#b3dcf7] text-[#001d35] font-semibold text-sm px-4 py-3 rounded-2xl shadow-sm transition group"
              >
                <div className="w-5 h-5 flex items-center justify-center text-slate-800">
                  <span className="text-xl leading-none font-bold">+</span>
                </div>
                <span className="hidden md:inline">Commencer l'enquête</span>
              </button>
            </div>

            {/* Navigation Folders */}
            <nav className="space-y-0.5 text-slate-700 text-sm font-medium">
              <button 
                onClick={handleBackToInbox}
                className={`w-full flex items-center justify-between px-3.5 py-2 rounded-full transition ${
                  viewMode === 'list' ? 'bg-[#d3e3fd] text-[#041e49] font-bold' : 'hover:bg-slate-200/70'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-slate-700" />
                  <span className="hidden md:inline">Boîte de réception</span>
                </div>
                <span className="hidden md:inline text-xs font-bold text-blue-900 bg-blue-200/80 px-2 py-0.5 rounded-full">
                  {EMAILS_CASES.length}
                </span>
              </button>

              <button 
                onClick={handleBackToInbox}
                className="w-full flex items-center gap-3 px-3.5 py-2 rounded-full hover:bg-slate-200/70 transition"
              >
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="hidden md:inline">Messages suivis</span>
              </button>

              <button 
                onClick={handleBackToInbox}
                className="w-full flex items-center gap-3 px-3.5 py-2 rounded-full hover:bg-slate-200/70 transition"
              >
                <Clock className="w-4 h-4 text-slate-600" />
                <span className="hidden md:inline">En attente</span>
              </button>

              <button 
                onClick={handleBackToInbox}
                className="w-full flex items-center gap-3 px-3.5 py-2 rounded-full hover:bg-slate-200/70 transition"
              >
                <AlertOctagon className="w-4 h-4 text-red-600" />
                <span className="hidden md:inline">Spam / Frauduleux</span>
              </button>

              <button 
                onClick={handleBackToInbox}
                className="w-full flex items-center gap-3 px-3.5 py-2 rounded-full hover:bg-slate-200/70 transition"
              >
                <Trash2 className="w-4 h-4 text-slate-600" />
                <span className="hidden md:inline">Corbeille</span>
              </button>
            </nav>
          </div>

          {/* Bottom Workshop info badge */}
          <div className="p-3 bg-white/80 rounded-xl border border-slate-200 text-xs text-slate-600 hidden md:block space-y-1">
            <span className="font-bold text-slate-800 block">Atelier n°6</span>
            <p className="text-[11px] text-slate-500 leading-tight">
              Animé par Christophe • Détection active des courriels piégés.
            </p>
          </div>
        </aside>

        {/* Main Center Area */}
        <main className="flex-1 bg-white sm:rounded-tl-2xl sm:my-2 sm:mr-2 border border-slate-200/80 shadow-xs flex flex-col overflow-hidden">
          
          {/* ======================================================== */}
          {/* VIEW MODE 1: GMAIL INBOX LIST (When browsing all emails) */}
          {/* ======================================================== */}
          {viewMode === 'list' && (
            <div className="flex-1 flex flex-col">
              {/* Inbox Header Toolbar */}
              <div className="border-b border-slate-200 px-4 py-2 flex items-center justify-between gap-2 text-slate-600 bg-white">
                <div className="flex items-center gap-3">
                  <input type="checkbox" className="rounded text-blue-600 cursor-pointer w-4 h-4" readOnly />
                  <button 
                    onClick={handleRefresh}
                    className="p-1.5 hover:bg-slate-100 active:bg-slate-200 rounded-full text-slate-600 transition flex items-center justify-center cursor-pointer group" 
                    title="Actualiser et recommencer l'exercice depuis le début"
                  >
                    <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                  </button>
                  <button className="p-1.5 hover:bg-slate-100 rounded text-slate-600" title="Plus">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span>1–{filteredEmails.length} sur {EMAILS_CASES.length} messages</span>
                  <div className="flex items-center">
                    <button className="p-1 hover:bg-slate-100 rounded text-slate-400">
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button className="p-1 hover:bg-slate-100 rounded text-slate-400">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Gmail Category Tabs */}
              <div className="flex border-b border-slate-200 bg-white text-xs sm:text-sm font-semibold text-slate-600">
                <button
                  onClick={() => setInboxTab('primary')}
                  className={`flex items-center gap-2.5 px-6 py-3 border-b-2 transition ${
                    inboxTab === 'primary'
                      ? 'border-blue-600 text-blue-600 font-bold'
                      : 'border-transparent hover:bg-slate-50'
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  <span>Principale</span>
                  <span className="text-[11px] bg-blue-100 text-blue-800 px-1.5 py-0.2 rounded-full font-bold">
                    {EMAILS_CASES.length}
                  </span>
                </button>

                <button
                  onClick={() => setInboxTab('promotions')}
                  className={`flex items-center gap-2.5 px-6 py-3 border-b-2 transition ${
                    inboxTab === 'promotions'
                      ? 'border-blue-600 text-blue-600 font-bold'
                      : 'border-transparent hover:bg-slate-50'
                  }`}
                >
                  <Tag className="w-4 h-4 text-emerald-600" />
                  <span>Promotions</span>
                </button>

                <button
                  onClick={() => setInboxTab('social')}
                  className={`flex items-center gap-2.5 px-6 py-3 border-b-2 transition ${
                    inboxTab === 'social'
                      ? 'border-blue-600 text-blue-600 font-bold'
                      : 'border-transparent hover:bg-slate-50'
                  }`}
                >
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span>Mises à jour</span>
                </button>
              </div>

              {/* Christophe's Reassuring & Non-Guilt Banner */}
              <div className="mx-4 mt-3 mb-2 p-3 sm:p-3.5 bg-blue-50/90 border border-blue-200/90 rounded-xl flex items-start gap-3 shadow-2xs">
                <span className="text-xl shrink-0 mt-0.5">🤝</span>
                <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  <strong className="text-blue-950 font-bold">Rappel bienveillant de Christophe :</strong> « Ne culpabilisez jamais si vous hésitez ou faites une erreur. Même des informaticiens chevronnés ou des dirigeants d'entreprise se font piéger chaque jour. Notre atelier est un espace d'entraînement 100% sécurisé pour acquérir les bons réflexes sans stress. Vous avez le droit d'essayer, de vous tromper et de recommencer ! »
                </div>
              </div>

              {/* Emails Table / Rows */}
              <div className="flex-1 divide-y divide-slate-100 overflow-y-auto">
                {filteredEmails.map((emailItem) => {
                  const solved = solvedCases[emailItem.id];
                  const isStarred = starredEmails[emailItem.id];

                  return (
                    <div
                      key={emailItem.id}
                      onClick={() => handleOpenEmail(emailItem.id)}
                      className={`group flex items-center px-3 sm:px-4 py-2.5 hover:bg-slate-50 hover:shadow-xs transition cursor-pointer select-none text-xs sm:text-sm ${
                        solved ? 'bg-slate-50/50' : 'bg-white font-medium'
                      }`}
                    >
                      {/* Checkbox and Star */}
                      <div className="flex items-center gap-2.5 mr-3 shrink-0">
                        <input
                          type="checkbox"
                          className="rounded text-blue-600 cursor-pointer w-4 h-4"
                          onClick={e => e.stopPropagation()}
                          readOnly
                        />
                        <button
                          onClick={e => toggleStar(e, emailItem.id)}
                          className="p-1 text-slate-400 hover:text-amber-500 transition"
                          title="Marquer d'une étoile"
                        >
                          <Star className={`w-4 h-4 ${isStarred ? 'text-amber-400 fill-amber-400' : ''}`} />
                        </button>
                      </div>

                      {/* Sender Display */}
                      <div className="w-36 sm:w-52 shrink-0 truncate pr-2">
                        <span className={`block truncate ${solved ? 'text-slate-700' : 'text-slate-900 font-bold'}`}>
                          {emailItem.senderDisplay}
                        </span>
                      </div>

                      {/* Subject + Snippet */}
                      <div className="flex-1 truncate pr-4">
                        <span className={`${solved ? 'text-slate-800' : 'text-slate-950 font-bold'}`}>
                          {emailItem.subject}
                        </span>
                        <span className="text-slate-400 mx-1.5 hidden sm:inline">—</span>
                        <span className="text-slate-500 truncate hidden sm:inline">
                          {emailItem.bodySnippet}
                        </span>
                      </div>

                      {/* Solved Badge / Phishing vs Safe tag */}
                      <div className="shrink-0 mr-3 flex items-center gap-1.5">
                        {solved ? (
                          solved.isCorrect ? (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                              <CheckCircle2 className="w-3 h-3" />
                              Résolu
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-700 bg-red-100 px-2 py-0.5 rounded-full border border-red-300">
                              <XCircle className="w-3 h-3" />
                              À revoir
                            </span>
                          )
                        ) : (
                          <span className="inline-flex items-center text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                            Non lu
                          </span>
                        )}
                      </div>

                      {/* Date / Time */}
                      <div className="w-14 sm:w-16 text-right shrink-0 text-slate-500 text-xs font-medium">
                        {emailItem.timeSnippet}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* VIEW MODE 2: OPENED FULL PAGE EMAIL (With Side QCM)      */}
          {/* ======================================================== */}
          {viewMode === 'detail' && (
            <div className="flex-1 flex flex-col overflow-y-auto">
              {/* Full Email Top Toolbar (With Back to Inbox button) */}
              <div className="border-b border-slate-200 px-4 py-2.5 flex items-center justify-between gap-2 bg-white sticky top-0 z-20 shadow-xs">
                {/* Back button and quick actions */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={handleBackToInbox}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-slate-100 text-slate-700 font-semibold text-xs sm:text-sm transition group border border-slate-200"
                    title="Retourner à la boîte de réception"
                  >
                    <ArrowLeft className="w-4 h-4 text-slate-600 group-hover:-translate-x-0.5 transition-transform" />
                    <span>Retour à la boîte de réception</span>
                  </button>

                  <div className="h-5 w-px bg-slate-200 hidden sm:block" />

                  <button className="p-1.5 hover:bg-slate-100 rounded text-slate-600 hidden sm:inline-block" title="Archiver">
                    <Archive className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 hover:bg-slate-100 rounded text-slate-600 hidden sm:inline-block" title="Signaler comme spam">
                    <AlertOctagon className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 hover:bg-slate-100 rounded text-slate-600 hidden sm:inline-block" title="Supprimer">
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 hover:bg-slate-100 rounded text-slate-600 hidden sm:inline-block" title="Marquer comme non lu">
                    <Mail className="w-4 h-4" />
                  </button>
                </div>

                {/* Email order & pagination */}
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <span>Exercice {currentCase.order} sur {EMAILS_CASES.length}</span>
                  <div className="flex items-center border-l border-slate-200 pl-2">
                    <button 
                      onClick={() => {
                        const idx = EMAILS_CASES.findIndex(c => c.id === currentCase.id);
                        if (idx > 0) handleOpenEmail(EMAILS_CASES[idx - 1].id);
                      }}
                      disabled={currentCase.order === 1}
                      className="p-1 hover:bg-slate-100 rounded text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Précédent"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => {
                        const idx = EMAILS_CASES.findIndex(c => c.id === currentCase.id);
                        if (idx < EMAILS_CASES.length - 1) handleOpenEmail(EMAILS_CASES[idx + 1].id);
                      }}
                      disabled={currentCase.order === EMAILS_CASES.length}
                      className="p-1 hover:bg-slate-100 rounded text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed"
                      title="Suivant"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Two-Column Responsive Layout: Real Email (Left/Center) + QCM Quiz (Right) */}
              <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 p-4 sm:p-6 bg-slate-50/50">
                {/* Left/Center Column (8 cols): The Opened Authentic Email Body */}
                <div className="lg:col-span-7 xl:col-span-8 space-y-6">
                  {/* Email Container Card */}
                  <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-7 space-y-6">
                    {/* Subject Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b border-slate-100 pb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-xs bg-slate-100 text-slate-600 font-semibold px-2 py-0.5 rounded">
                            Boîte de réception
                          </span>
                          <span className="text-xs bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded border border-blue-200">
                            {currentCase.category}
                          </span>
                        </div>
                        <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                          {currentCase.subject}
                        </h1>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button className="p-1.5 hover:bg-slate-100 rounded text-slate-500" title="Imprimer">
                          <Printer className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 hover:bg-slate-100 rounded text-slate-500" title="Répondre">
                          <Reply className="w-4 h-4" />
                        </button>
                        <button className="p-1.5 hover:bg-slate-100 rounded text-slate-500" title="Options">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Sender Info Row */}
                    <div className="flex items-start justify-between gap-3 text-xs sm:text-sm">
                      <div className="flex items-start gap-3">
                        {/* Round Sender Avatar */}
                        <div className="w-10 h-10 rounded-full bg-slate-700 text-white flex items-center justify-center font-bold text-base shadow-xs shrink-0">
                          {currentCase.senderDisplay.charAt(0)}
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="font-bold text-slate-900 text-sm sm:text-base">
                              {currentCase.senderDisplay}
                            </span>
                            <span className="text-slate-500 font-mono text-xs">
                              &lt;{currentCase.senderEmail}&gt;
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            À : <span className="text-slate-700 font-medium">moi ({currentCase.recipient})</span>
                          </p>
                        </div>
                      </div>

                      <div className="text-right text-xs text-slate-500 shrink-0">
                        <span>{currentCase.date}</span>
                      </div>
                    </div>

                    {/* Realistic Email Logo Header inside the email */}
                    <div className="pt-2">
                      <EmailLogo type={currentCase.logoType} />
                    </div>

                    {/* Email Content Body */}
                    <div 
                      className={`text-slate-800 leading-relaxed space-y-3 ${textClass}`}
                      dangerouslySetInnerHTML={{ __html: currentCase.fullBodyHtml }}
                    />

                    {/* Attachment if present */}
                    {currentCase.attachmentName && (
                      <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <FileWarning className="w-8 h-8 text-red-500" />
                          <div>
                            <span className="text-xs font-bold text-slate-800 block">
                              {currentCase.attachmentName}
                            </span>
                            <span className="text-[11px] text-slate-500">
                              Fichier exécutable • 1.4 Mo
                            </span>
                          </div>
                        </div>
                        <button
                          onClick={() => setIsDangerModalOpen(true)}
                          className="text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 px-3 py-1.5 rounded-lg transition"
                        >
                          Ouvrir la pièce jointe
                        </button>
                      </div>
                    )}

                    {/* Action button placed naturally inside the email body */}
                    {currentCase.buttonText && currentCase.buttonFakeUrl && (
                      <div className="pt-4 pb-1">
                        <div className="flex justify-start">
                          <button
                            id={`email-action-btn-${currentCase.id}`}
                            onMouseEnter={() => setHoveredUrl(currentCase.buttonFakeUrl || null)}
                            onMouseLeave={() => setHoveredUrl(null)}
                            onClick={() => setIsDangerModalOpen(true)}
                            className={`inline-flex items-center justify-center gap-2 px-6 py-3 text-sm sm:text-base transition cursor-pointer active:scale-98 ${getEmailButtonStyle(currentCase.logoType)}`}
                          >
                            <span>{currentCase.buttonText}</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* ======================================================= */}
                  {/* CORRECTION & CHRISTOPHE'S ADVICE DISPLAYED UNDER EMAIL */}
                  {/* ======================================================= */}
                  {hasValidatedResponse && validationResult && (
                    <div 
                      id="correction-section"
                      className="bg-white rounded-2xl border-2 border-blue-500 p-6 shadow-md space-y-6 animate-in fade-in slide-in-from-top-4 scroll-mt-6"
                    >
                      {/* Verdict Banner */}
                      <div className={`p-4 rounded-xl flex items-start gap-3.5 ${
                        validationResult.isCorrect 
                          ? 'bg-emerald-50 border border-emerald-300 text-emerald-900' 
                          : 'bg-amber-50 border border-amber-300 text-amber-900'
                      }`}>
                        {validationResult.isCorrect ? (
                          <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                        ) : (
                          <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                        )}
                        <div className="space-y-1">
                          <h3 className="font-bold text-base sm:text-lg">
                            {validationResult.isCorrect 
                              ? '👏 Excellent diagnostic ! Vous avez démasqué la nature exacte de ce courriel.'
                              : '⚠️ Attention ! Ce message cachait des pièges importants qu’il faut reconnaître.'}
                          </h3>
                          <p className="text-xs sm:text-sm opacity-90">
                            {currentCase.isPhishing
                              ? 'Il s’agit bien d’un courriel frauduleux (Hameçonnage / Phishing).'
                              : 'Il s’agit bien d’un courriel authentique et sûr (Légitime).'}
                          </p>
                        </div>
                      </div>

                      {/* Detailed Anomaly Breakdown */}
                      <div className="space-y-3">
                        <h4 className="font-bold text-sm text-slate-900 uppercase tracking-wide flex items-center gap-2">
                          <CheckSquare className="w-4 h-4 text-blue-600" />
                          Correction détaillée de l'enquête :
                        </h4>

                        <div className="grid grid-cols-1 gap-2.5">
                          {currentCase.quizOptions.map((opt) => {
                            const isUserSelected = selectedOptions.includes(opt.id);
                            return (
                              <div
                                key={opt.id}
                                className={`p-3 rounded-xl border text-xs sm:text-sm flex items-start gap-3 ${
                                  opt.isAnomaly
                                    ? isUserSelected 
                                      ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                                      : 'bg-amber-50/70 border-amber-200 text-amber-950'
                                    : isUserSelected
                                      ? 'bg-red-50/70 border-red-200 text-red-950'
                                      : 'bg-slate-50 border-slate-200 text-slate-700'
                                }`}
                              >
                                <span className="mt-0.5">
                                  {opt.isAnomaly ? (
                                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-600 text-white font-bold text-xs">
                                      ✓
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-slate-300 text-slate-700 font-bold text-xs">
                                      —
                                    </span>
                                  )}
                                </span>
                                <div>
                                  <span className="font-bold block">
                                    {opt.text}
                                  </span>
                                  <span className="text-xs opacity-80 mt-0.5 block">
                                    👉 {opt.explanation}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Christophe's Personalized Advice (Universal, without senior labels) */}
                      <div className="bg-gradient-to-br from-blue-900 to-indigo-950 text-white p-5 rounded-xl space-y-3 shadow-sm">
                        <div className="flex items-center gap-2.5 text-amber-300 font-bold text-sm">
                          <Lightbulb className="w-4 h-4 text-amber-300" />
                          <span>Le Conseil & Réflexe Protecteur de Christophe :</span>
                        </div>
                        <p className="text-xs sm:text-sm text-blue-100 leading-relaxed font-medium">
                          « {currentCase.christopheAdvice} »
                        </p>
                        <div className="pt-2 border-t border-blue-800/80 text-[11px] text-blue-300 flex items-center justify-between">
                          <span>Règle d'or : {currentCase.goldenRule}</span>
                          <span className="italic">Atelier n°6 • Christophe</span>
                        </div>
                      </div>

                      {/* Bottom Navigation Buttons */}
                      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                        <button
                          onClick={handleBackToInbox}
                          className="px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm transition flex items-center gap-2"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          Boîte de réception
                        </button>

                        <button
                          onClick={handleGoToNextEmail}
                          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition flex items-center gap-2"
                        >
                          <span>Passer au courriel suivant</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Right Column (4-5 cols): Interactive QCM / Detective Quiz */}
                <div className="lg:col-span-5 xl:col-span-4 space-y-4">
                  <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 space-y-5 sticky top-20">
                    {/* Header */}
                    <div className="border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2 text-blue-700 font-bold text-xs uppercase tracking-wider mb-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        Enquête Détective
                      </div>
                      <h2 className="text-lg font-bold text-slate-900">
                        Analyse du courriel
                      </h2>
                      <p className="text-xs text-slate-500 mt-1">
                        Observez attentivement le message ci-contre et cochez les indices suspects :
                      </p>
                    </div>

                    {/* Question 1: Multiple choice checkboxes */}
                    <div className="space-y-2.5">
                      <label className="text-xs font-bold text-slate-800 uppercase tracking-wide block">
                        {currentCase.isPhishing 
                          ? "1. Quels signes ou anomalies vous alertent sur ce courriel ? (plusieurs réponses possibles)"
                          : "1. Quels éléments de confiance et de sécurité observez-vous ? (plusieurs réponses possibles)"}
                      </label>

                      <div className="space-y-2">
                        {currentCase.quizOptions.map((opt) => {
                          const isSelected = selectedOptions.includes(opt.id);
                          return (
                            <div
                              key={opt.id}
                              onClick={() => toggleOption(opt.id)}
                              className={`p-3 rounded-xl border transition cursor-pointer flex items-start gap-2.5 text-xs select-none ${
                                isSelected 
                                  ? 'bg-blue-50 border-blue-400 text-blue-950 font-medium' 
                                  : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                              } ${hasValidatedResponse ? 'opacity-75 cursor-default' : ''}`}
                            >
                              <div className="mt-0.5 shrink-0">
                                {isSelected ? (
                                  <CheckSquare className="w-4 h-4 text-blue-600" />
                                ) : (
                                  <Square className="w-4 h-4 text-slate-400" />
                                )}
                              </div>
                              <span className="leading-snug">
                                {opt.text}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Question 2: Verdict Final (Phishing vs Safe) */}
                    <div className="space-y-2.5 pt-3 border-t border-slate-100">
                      <label className="text-xs font-bold text-slate-800 uppercase tracking-wide block">
                        2. Votre verdict final sur ce courriel :
                      </label>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <button
                          type="button"
                          disabled={hasValidatedResponse}
                          onClick={() => setChosenVerdict('phishing')}
                          className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition ${
                            chosenVerdict === 'phishing'
                              ? 'bg-red-50 border-red-500 text-red-900 shadow-xs'
                              : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                          } ${hasValidatedResponse ? 'cursor-default' : ''}`}
                        >
                          <ShieldAlert className="w-5 h-5 text-red-600" />
                          <span>Courriel Frauduleux</span>
                          <span className="text-[10px] text-red-600 font-normal">Arnaque / Piège</span>
                        </button>

                        <button
                          type="button"
                          disabled={hasValidatedResponse}
                          onClick={() => setChosenVerdict('safe')}
                          className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center gap-1.5 transition ${
                            chosenVerdict === 'safe'
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-xs'
                              : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                          } ${hasValidatedResponse ? 'cursor-default' : ''}`}
                        >
                          <ShieldCheck className="w-5 h-5 text-emerald-600" />
                          <span>Courriel Authentique</span>
                          <span className="text-[10px] text-emerald-600 font-normal">Légitime / Sûr</span>
                        </button>
                      </div>
                    </div>

                    {/* Validate Response Action Button */}
                    <div className="pt-2">
                      {!hasValidatedResponse ? (
                        <button
                          onClick={handleValidateResponse}
                          disabled={!chosenVerdict}
                          className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm py-3 px-4 rounded-xl shadow-md transition flex items-center justify-center gap-2"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Valider mon analyse</span>
                        </button>
                      ) : (
                        <div className="text-center p-3 bg-slate-100 rounded-xl text-xs text-slate-600 font-medium">
                          ✓ Analyse validée ! Regardez la correction détaillée sous le courriel.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Windows-style browser hover URL tooltip in bottom left */}
      <BrowserUrlTooltip url={hoveredUrl} />

      {/* Danger Modal triggered on email action button click */}
      <ClickDangerModal
        isOpen={isDangerModalOpen}
        onClose={() => setIsDangerModalOpen(false)}
        dangerInfo={currentCase.dangerOnClick}
        buttonFakeUrl={currentCase.buttonFakeUrl}
        isPhishing={currentCase.isPhishing}
      />

      {/* Reset Confirmation Toast Notification */}
      {showResetToast && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700 flex items-center gap-3 z-50 animate-in fade-in slide-in-from-bottom-3 text-xs sm:text-sm font-medium">
          <div className="w-7 h-7 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            <RefreshCw className="w-4 h-4 animate-spin" />
          </div>
          <div>
            <span className="font-bold text-emerald-400 block">Exercice réinitialisé !</span>
            <span className="text-slate-300">Vous repartez au début de l'atelier pour vous réentraîner.</span>
          </div>
        </div>
      )}
    </div>
  );
};
