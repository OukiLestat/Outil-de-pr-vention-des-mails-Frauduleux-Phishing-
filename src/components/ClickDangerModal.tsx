import React from 'react';
import { ShieldAlert, AlertTriangle, X, Lock, ExternalLink, ShieldCheck, CreditCard, Ban, CheckCircle2 } from 'lucide-react';
import { DangerOnClickInfo } from '../types';

interface ClickDangerModalProps {
  isOpen: boolean;
  onClose: () => void;
  dangerInfo?: DangerOnClickInfo;
  buttonFakeUrl?: string;
  isPhishing?: boolean;
}

export const ClickDangerModal: React.FC<ClickDangerModalProps> = ({
  isOpen,
  onClose,
  dangerInfo,
  buttonFakeUrl,
  isPhishing = true
}) => {
  if (!isOpen || !dangerInfo) return null;

  if (!isPhishing) {
    // Reassuring safe modal for legitimate authentic emails
    return (
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
        <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border-4 border-emerald-500 overflow-hidden relative animate-in zoom-in-95">
          {/* Green Reassuring Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-5 flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white shrink-0 border border-white/30 shadow-inner">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider bg-emerald-900/60 px-2.5 py-0.5 rounded-full border border-emerald-300/40 text-emerald-100 mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                  COURRIEL VÉRIFIÉ
                </div>
                <h3 className="text-xl sm:text-2xl font-black leading-tight">
                  Rien à signaler
                </h3>
                <p className="text-emerald-100 text-xs sm:text-sm font-medium mt-0.5">
                  {dangerInfo.title}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/20 transition shrink-0"
              title="Fermer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 space-y-4">
            {buttonFakeUrl && (
              <div className="bg-slate-900 text-slate-200 p-3 rounded-lg border border-slate-700 text-xs font-mono break-all space-y-1">
                <span className="text-emerald-400 font-bold block uppercase text-[10px] tracking-wider">
                  Adresse de destination officielle et sécurisée :
                </span>
                <div className="flex items-center gap-2 text-slate-300">
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{buttonFakeUrl}</span>
                </div>
              </div>
            )}

            <div className="space-y-2 bg-emerald-50/70 border border-emerald-200 p-4 rounded-xl text-xs sm:text-sm text-slate-800">
              <h4 className="font-bold text-emerald-900 uppercase text-xs">Pourquoi ce clic est sans danger :</h4>
              {dangerInfo.consequences.map((step, index) => (
                <div key={index} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="leading-snug">{step}</p>
                </div>
              ))}
            </div>

            <div className="p-3.5 bg-blue-50 rounded-xl border border-blue-200 text-xs sm:text-sm text-blue-950">
              <strong>💡 Bon réflexe :</strong> {dangerInfo.immediateReaction}
            </div>
          </div>

          <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl shadow-md transition"
            >
              Compris, fermer la fenêtre
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Red Danger Modal for Phishing
  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
      <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl border-4 border-red-500 overflow-hidden relative animate-in zoom-in-95">
        {/* Top Warning Header */}
        <div className="bg-gradient-to-r from-red-600 via-red-700 to-rose-700 text-white p-5 flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white shrink-0 border border-white/30 shadow-inner">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider bg-red-900/60 px-2.5 py-0.5 rounded-full border border-red-400/40 text-red-100 mb-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
                DANGER DÉTECTÉ • NE CLIQUEZ JAMAIS DANS LA VRAIE VIE !
              </div>
              <h3 className="text-lg sm:text-xl font-black leading-tight">
                {dangerInfo.title}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/20 transition shrink-0"
            title="Fermer l'alerte"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Fake Destination URL Notice */}
          {buttonFakeUrl && (
            <div className="bg-slate-900 text-slate-200 p-3 rounded-lg border border-slate-700 text-xs font-mono break-all space-y-1">
              <span className="text-red-400 font-bold block uppercase text-[10px] tracking-wider">
                Lien pirate masqué sous le bouton :
              </span>
              <div className="flex items-center gap-2 text-slate-300">
                <ExternalLink className="w-3.5 h-3.5 text-red-400 shrink-0" />
                <span>{buttonFakeUrl}</span>
              </div>
            </div>
          )}

          {/* What happens step by step */}
          <div className="space-y-2.5">
            <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 uppercase tracking-wide">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              Voici ce qui se passerait immédiatement après avoir cliqué :
            </h4>
            <div className="space-y-2 bg-red-50/60 border border-red-200/80 p-3.5 rounded-xl text-xs sm:text-sm text-slate-800">
              {dangerInfo.consequences.map((step, index) => (
                <div key={index} className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-red-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <p className="leading-snug">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Financial and identity impact */}
          <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 space-y-1.5">
            <span className="text-xs font-bold text-amber-900 uppercase tracking-wide flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-amber-700" />
              Conséquence financière directe :
            </span>
            <p className="text-xs sm:text-sm text-amber-950 font-medium">
              {dangerInfo.financialRisk}
            </p>
          </div>

          {/* What to do if clicked by mistake in real life */}
          <div className="p-4 bg-slate-100 rounded-xl border border-slate-300 space-y-1.5">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              Que faire si vous aviez cliqué par erreur chez vous ?
            </span>
            <p className="text-xs text-slate-700 leading-relaxed">
              {dangerInfo.immediateReaction}
            </p>
          </div>
        </div>

        {/* Footer Button */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl shadow-md transition flex items-center gap-2"
          >
            <Ban className="w-4 h-4" />
            J'ai compris le danger, fermer l'alerte
          </button>
        </div>
      </div>
    </div>
  );
};
