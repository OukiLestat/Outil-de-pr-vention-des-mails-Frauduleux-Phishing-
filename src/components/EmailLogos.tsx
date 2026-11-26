import React from 'react';

interface EmailLogoProps {
  type: 'ameli' | 'laposte' | 'mediatheque' | 'banque' | 'famille' | 'impots' | 'microsoft' | 'edf' | 'antai' | 'netflix' | 'doctolib' | 'ameli_legitime' | 'securite';
  className?: string;
}

export const EmailLogo: React.FC<EmailLogoProps> = ({ type, className = '' }) => {
  switch (type) {
    case 'ameli':
    case 'ameli_legitime':
      return (
        <div className={`inline-flex items-center gap-3 bg-white p-2.5 rounded-lg border border-slate-200 shadow-sm ${className}`}>
          {/* Marianne / French Republic mark */}
          <div className="flex flex-col items-center justify-center border-r border-slate-300 pr-3 text-[9px] font-bold leading-tight text-slate-800 text-center">
            <div className="w-6 h-4 bg-gradient-to-r from-blue-700 via-white to-red-600 border border-slate-300 rounded-[2px] mb-0.5 shadow-xs" />
            <span>RÉPUBLIQUE</span>
            <span>FRANÇAISE</span>
          </div>
          {/* Assurance Maladie Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-700 flex items-center justify-center text-white font-black text-sm shadow-xs">
              <span className="tracking-tighter">sécu</span>
            </div>
            <div className="leading-tight">
              <span className="block font-black text-blue-900 text-base tracking-tight">l'Assurance Maladie</span>
              <span className="block text-[11px] font-semibold text-emerald-600 tracking-wide uppercase">
                {type === 'ameli_legitime' ? 'Espace Assuré • ameli.fr' : 'Portail Carte Vitale'}
              </span>
            </div>
          </div>
        </div>
      );

    case 'laposte':
      return (
        <div className={`inline-flex items-center gap-3 bg-white p-2.5 rounded-lg border border-slate-200 shadow-sm ${className}`}>
          {/* La Poste Yellow Arrow Bird */}
          <div className="w-10 h-10 rounded-xl bg-amber-400 flex items-center justify-center shadow-xs border border-amber-500/30">
            <svg viewBox="0 0 24 24" className="w-7 h-7 text-blue-950 fill-current">
              <path d="M2.5 12l17-7.5-6.5 8 8-2.5-18.5 9.5 4-7.5z" />
            </svg>
          </div>
          <div className="leading-tight">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-blue-950 text-sm tracking-tight">LA POSTE</span>
              <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-1.5 py-0.2 rounded">SERVICES</span>
            </div>
            <span className="block font-black text-blue-700 text-base tracking-wider uppercase">COLISSIMO</span>
          </div>
        </div>
      );

    case 'doctolib':
      return (
        <div className={`inline-flex items-center gap-3 bg-white p-2.5 rounded-lg border border-slate-200 shadow-sm ${className}`}>
          <div className="w-9 h-9 rounded-xl bg-[#008ce6] flex items-center justify-center text-white font-black text-lg shadow-xs">
            D
          </div>
          <div className="leading-tight">
            <span className="block font-black text-[#008ce6] text-base tracking-tight">Doctolib</span>
            <span className="block text-[11px] text-slate-500 font-medium">Service officiel de rappel de consultation</span>
          </div>
        </div>
      );

    case 'mediatheque':
      return (
        <div className={`inline-flex items-center gap-3 bg-white p-2.5 rounded-lg border border-slate-200 shadow-sm ${className}`}>
          <div className="w-10 h-10 rounded-xl bg-sky-700 text-white flex items-center justify-center font-bold text-lg shadow-xs">
            📖
          </div>
          <div className="leading-tight">
            <span className="block font-bold text-slate-900 text-sm">Médiathèque Municipale</span>
            <span className="block text-xs text-sky-700 font-medium">Réseau des Bibliothèques Publiques</span>
          </div>
        </div>
      );

    case 'banque':
      return (
        <div className={`inline-flex items-center gap-3 bg-white p-2.5 rounded-lg border border-slate-200 shadow-sm ${className}`}>
          <div className="w-10 h-10 rounded-lg bg-emerald-700 flex items-center justify-center text-white shadow-xs p-1">
            <div className="flex items-center justify-center font-black text-lg tracking-tighter text-emerald-100">
              CA
            </div>
          </div>
          <div className="leading-tight">
            <span className="block font-black text-emerald-950 text-base tracking-tight">CRÉDIT AGRICOLE</span>
            <span className="block text-[11px] font-medium text-emerald-800">Service Sécurité & Lutte Anti-Fraude</span>
          </div>
        </div>
      );

    case 'famille':
      return (
        <div className={`inline-flex items-center gap-3 bg-white p-2 rounded-lg border border-slate-200 shadow-sm ${className}`}>
          <div className="w-9 h-9 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-xs">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 18.09c-1.52 0-3.02-.41-4.32-1.18l-.31-.18-3.21.84.86-3.13-.2-.32a8.17 8.17 0 0 1-1.25-4.31c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.17 8.17 0 0 1 2.41 5.83c.01 4.54-3.69 8.24-8.24 8.24z" />
            </svg>
          </div>
          <div className="leading-tight">
            <span className="block font-bold text-slate-800 text-xs">Message Instantané Mobile</span>
            <span className="block text-[11px] text-slate-500">Contact Famille & Proches</span>
          </div>
        </div>
      );

    case 'impots':
    case 'securite':
      return (
        <div className={`inline-flex items-center gap-3 bg-white p-2.5 rounded-lg border border-slate-200 shadow-sm ${className}`}>
          <div className="flex flex-col items-center justify-center border-r border-slate-300 pr-3 text-[9px] font-bold leading-tight text-slate-800 text-center">
            <div className="w-6 h-4 bg-gradient-to-r from-blue-700 via-white to-red-600 border border-slate-300 rounded-[2px] mb-0.5 shadow-xs" />
            <span>RÉPUBLIQUE</span>
            <span>FRANÇAISE</span>
          </div>
          <div className="leading-tight">
            <span className="block font-black text-slate-900 text-sm">Direction générale des Finances publiques</span>
            <span className="block text-xs font-bold text-blue-900 tracking-wide">impots.gouv.fr • Espace Particulier</span>
          </div>
        </div>
      );

    case 'microsoft':
      return (
        <div className={`inline-flex items-center gap-3 bg-white p-2.5 rounded-lg border border-slate-200 shadow-sm ${className}`}>
          <div className="grid grid-cols-2 gap-0.5 w-7 h-7 p-0.5">
            <div className="bg-red-500 rounded-xs" />
            <div className="bg-emerald-500 rounded-xs" />
            <div className="bg-blue-500 rounded-xs" />
            <div className="bg-amber-400 rounded-xs" />
          </div>
          <div className="leading-tight">
            <span className="block font-bold text-slate-900 text-sm">Microsoft Windows Defender</span>
            <span className="block text-xs text-red-600 font-semibold uppercase tracking-wider">Centre de Sécurité Système</span>
          </div>
        </div>
      );

    case 'edf':
      return (
        <div className={`inline-flex items-center gap-3 bg-white p-2.5 rounded-lg border border-slate-200 shadow-sm ${className}`}>
          <div className="w-9 h-9 rounded-full bg-blue-900 flex items-center justify-center text-white font-black text-xs shadow-xs">
            <div className="flex items-center">
              <span className="text-orange-500 font-black">e</span>
              <span className="text-white font-black">df</span>
            </div>
          </div>
          <div className="leading-tight">
            <span className="block font-black text-blue-950 text-sm">EDF Particuliers</span>
            <span className="block text-xs text-slate-500">Fournisseur d'électricité de France</span>
          </div>
        </div>
      );

    case 'antai':
      return (
        <div className={`inline-flex items-center gap-3 bg-white p-2.5 rounded-lg border border-slate-200 shadow-sm ${className}`}>
          <div className="flex flex-col items-center justify-center border-r border-slate-300 pr-3 text-[9px] font-bold leading-tight text-slate-800 text-center">
            <div className="w-6 h-4 bg-gradient-to-r from-blue-700 via-white to-red-600 border border-slate-300 rounded-[2px] mb-0.5 shadow-xs" />
            <span>RÉPUBLIQUE</span>
            <span>FRANÇAISE</span>
          </div>
          <div className="leading-tight">
            <div className="flex items-center gap-1.5">
              <span className="font-black text-blue-950 text-sm tracking-tight">ANTAI</span>
              <span className="text-[10px] bg-red-100 text-red-700 font-bold px-1.5 py-0.2 rounded">AVIS OFFICIEL</span>
            </div>
            <span className="block text-[11px] text-slate-700 font-medium">Agence Nationale de Traitement Automatisé des Infractions</span>
          </div>
        </div>
      );

    case 'netflix':
      return (
        <div className={`inline-flex items-center gap-3 bg-zinc-950 p-2.5 rounded-lg border border-zinc-800 shadow-sm text-white ${className}`}>
          <span className="font-black text-red-600 text-xl tracking-wider uppercase font-sans">
            NETFLIX
          </span>
          <div className="border-l border-zinc-700 pl-2.5 leading-tight">
            <span className="block text-xs font-semibold text-zinc-200">Centre d'aide & Facturation</span>
            <span className="block text-[10px] text-zinc-400">Notification de compte</span>
          </div>
        </div>
      );

    default:
      return null;
  }
};
