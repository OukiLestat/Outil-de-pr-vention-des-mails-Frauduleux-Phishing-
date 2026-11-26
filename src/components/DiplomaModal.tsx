import React, { useState } from 'react';
import { Award, Printer, X, CheckCircle2, ShieldCheck, Calendar, User } from 'lucide-react';
import { WORKSHOP_DETAILS } from '../data/workshopData';

interface DiplomaModalProps {
  isOpen: boolean;
  onClose: () => void;
  solvedCount: number;
  totalCount: number;
  correctCount: number;
}

export const DiplomaModal: React.FC<DiplomaModalProps> = ({
  isOpen,
  onClose,
  solvedCount,
  totalCount,
  correctCount
}) => {
  const [participantName, setParticipantName] = useState('Jean Dupont');

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-in fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border-4 border-amber-400 relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition print:hidden"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Border Design */}
        <div className="border-2 border-dashed border-amber-300 rounded-2xl p-6 sm:p-8 text-center bg-gradient-to-b from-amber-50/40 via-white to-amber-50/20 relative">
          {/* Top Seal Badge */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 text-white flex items-center justify-center mx-auto mb-3 shadow-lg shadow-amber-500/30">
            <Award className="w-9 h-9" />
          </div>

          <span className="text-xs uppercase font-extrabold tracking-widest text-amber-800 block mb-1">
            République Française • C2i, ville de Deuil la barre
          </span>

          <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 tracking-tight mb-2">
            CERTIFICAT DE CYBER-DÉTECTIVE
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto mb-5">
            Délivré à l'issue de l'atelier d'initiation et de sensibilisation aux risques des courriels frauduleux.
          </p>

          <div className="my-5 py-4 border-y border-amber-200">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">
              Ce certificat d'honneur est décerné à :
            </p>
            <div className="inline-block relative">
              <input
                type="text"
                value={participantName}
                onChange={(e) => setParticipantName(e.target.value)}
                placeholder="Votre Prénom et Nom"
                className="text-xl sm:text-2xl font-bold font-serif text-slate-900 border-b-2 border-amber-400 px-3 py-1 text-center bg-transparent focus:outline-none focus:border-blue-600"
              />
              <span className="text-[10px] text-slate-400 block mt-0.5 print:hidden">
                (Cliquez pour modifier votre nom)
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-lg mx-auto mb-6">
            Pour avoir analysé avec brio les pièges du numérique, déjoué les tentatives de vol d'identifiants et de coordonnées bancaires, et validé les <strong>Règles d'Or de la Cybersécurité du Quotidien</strong>.
          </p>

          {/* Results stats */}
          <div className="bg-amber-100/60 rounded-xl p-3 max-w-md mx-auto flex items-center justify-around text-xs font-semibold text-amber-950 mb-6 border border-amber-200">
            <div>
              <span className="block text-slate-500 font-normal">Score d'investigation :</span>
              <span className="text-base font-bold text-emerald-700">{correctCount} / {totalCount} réussis</span>
            </div>
            <div className="h-6 w-px bg-amber-300" />
            <div>
              <span className="block text-slate-500 font-normal">Mention :</span>
              <span className="text-base font-bold text-blue-800">
                {correctCount >= 6 ? 'Très Vigilant 🛡️' : 'Apprenti Vigilant 🔍'}
              </span>
            </div>
          </div>

          {/* Signatures Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-200 text-xs text-slate-600">
            <div className="text-left">
              <p className="font-semibold text-slate-800 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-blue-600" />
                Date : {WORKSHOP_DETAILS.date}
              </p>
              <p className="text-slate-500">{WORKSHOP_DETAILS.sessionNumber} ({WORKSHOP_DETAILS.schedule})</p>
            </div>

            <div className="text-center sm:text-right">
              <p className="font-semibold text-slate-800 flex items-center gap-1 justify-center sm:justify-end">
                <User className="w-3.5 h-3.5 text-amber-600" />
                Le Formateur Référent :
              </p>
              <p className="font-serif italic font-bold text-slate-900 text-base">
                {WORKSHOP_DETAILS.animator}
              </p>
            </div>
          </div>
        </div>

        {/* Action Bottom Bar */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 print:hidden">
          <span className="text-xs text-slate-500">
            Lieu : {WORKSHOP_DETAILS.location}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 rounded-xl transition"
            >
              Fermer
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2.5 rounded-xl shadow-md text-sm transition"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimer mon Diplôme</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
