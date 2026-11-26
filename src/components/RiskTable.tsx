import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Search, 
  Filter, 
  Printer, 
  CheckCircle2, 
  AlertTriangle, 
  HeartHandshake, 
  CreditCard, 
  Package, 
  Laptop, 
  Gift, 
  Landmark,
  ChevronDown,
  ChevronUp,
  Sparkles
} from 'lucide-react';
import { SENIOR_RISKS_MATRIX } from '../data/risksData';
import { RiskItem, FontSize } from '../types';

interface RiskTableProps {
  fontSize: FontSize;
}

export const RiskTable: React.FC<RiskTableProps> = ({ fontSize }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Tous');
  const [expandedRiskId, setExpandedRiskId] = useState<string | null>(null);

  const categories = [
    'Tous',
    'Administrations',
    'Bancaire & Paiement',
    'Famille & Détresse',
    'Colis & Livraisons',
    'Panique Technique',
    'Cadeaux & Gains'
  ];

  const filteredRisks = SENIOR_RISKS_MATRIX.filter(item => {
    const matchesCategory = selectedCategory === 'Tous' || item.category === selectedCategory;
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.targetVictimWants.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.psychologicalLeverage.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.exampleScenario.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.goldenRule.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handlePrint = () => {
    window.print();
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Administrations': return <Landmark className="w-4 h-4 text-blue-600" />;
      case 'Bancaire & Paiement': return <CreditCard className="w-4 h-4 text-emerald-600" />;
      case 'Famille & Détresse': return <HeartHandshake className="w-4 h-4 text-rose-600" />;
      case 'Colis & Livraisons': return <Package className="w-4 h-4 text-amber-600" />;
      case 'Panique Technique': return <Laptop className="w-4 h-4 text-purple-600" />;
      case 'Cadeaux & Gains': return <Gift className="w-4 h-4 text-pink-600" />;
      default: return <ShieldAlert className="w-4 h-4 text-slate-600" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-800 font-bold text-lg mb-1">
            <ShieldAlert className="w-5 h-5 text-blue-600" />
            <h2>Grand Tableau Pédagogique des Risques Numériques</h2>
          </div>
          <p className="text-slate-600 text-sm max-w-3xl">
            Répertoire complet des attaques, arnaques et pièges par courriel les plus fréquents. À utiliser comme fiche mémo durant et après la formation de Christophe.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-4 py-2.5 rounded-xl shadow-sm text-sm transition self-start md:self-auto shrink-0"
        >
          <Printer className="w-4 h-4" />
          <span>Imprimer la Fiche Mémo</span>
        </button>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Rechercher un piège (ex: carte vitale, colis, virement, petit-fils, virus)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900"
            />
          </div>
        </div>

        {/* Categories Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0 mr-1" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Risks Matrix Cards List */}
      <div className="space-y-4">
        {filteredRisks.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
            Aucun risque ne correspond à votre recherche « {searchTerm} ».
          </div>
        ) : (
          filteredRisks.map((risk) => {
            const isExpanded = expandedRiskId === risk.id;

            return (
              <div
                key={risk.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all overflow-hidden"
              >
                {/* Header row */}
                <div 
                  onClick={() => setExpandedRiskId(isExpanded ? null : risk.id)}
                  className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-3 cursor-pointer select-none bg-gradient-to-r hover:from-slate-50 hover:to-white"
                >
                  <div className="flex items-start md:items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-slate-100 border border-slate-200/80 shrink-0 mt-0.5 md:mt-0">
                      {getCategoryIcon(risk.category)}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700">
                          {risk.category}
                        </span>
                        <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                          risk.dangerLevel === 'Très Élevé' 
                            ? 'bg-rose-100 text-rose-800' 
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          Danger : {risk.dangerLevel}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">
                          Fréquence : {risk.frequency}
                        </span>
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900">
                        {risk.name}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end md:self-auto">
                    <span className="text-xs text-blue-600 font-semibold hidden sm:inline">
                      {isExpanded ? 'Masquer les détails' : 'Voir les signaux & parades'}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-slate-100 space-y-4 animate-in fade-in">
                    {/* Scenario preview */}
                    <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">
                        Exemple de formulation reçue par mail :
                      </p>
                      <p className="text-sm italic text-slate-700 font-serif">
                        « {risk.exampleScenario} »
                      </p>
                    </div>

                    {/* Dual columns: Objective & Psychology */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="bg-rose-50/70 border border-rose-200/80 p-3.5 rounded-xl text-xs sm:text-sm">
                        <strong className="text-rose-900 block font-bold mb-1">
                          🎯 Ce que le fraudeur cherche à obtenir :
                        </strong>
                        <p className="text-rose-800">{risk.targetVictimWants}</p>
                      </div>

                      <div className="bg-amber-50/70 border border-amber-200/80 p-3.5 rounded-xl text-xs sm:text-sm">
                        <strong className="text-amber-900 block font-bold mb-1">
                          🧠 Le piège psychologique (l'émotion ciblée) :
                        </strong>
                        <p className="text-amber-800">{risk.psychologicalLeverage}</p>
                      </div>
                    </div>

                    {/* Red flags */}
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-amber-500" />
                        Les Signaux d'Alerte Infaillibles (Indices à repérer) :
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {risk.redFlags.map((flag, idx) => (
                          <div key={idx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200/60 text-xs text-slate-700">
                            <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold shrink-0 text-[10px]">
                              {idx + 1}
                            </span>
                            <span>{flag}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Golden Rule banner */}
                    <div className="bg-emerald-50 border border-emerald-300 p-3.5 rounded-xl flex items-start gap-3 text-xs sm:text-sm text-emerald-950">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="block font-bold text-emerald-900 mb-0.5">
                          🛡️ La Parade Protectrice (Le bon réflexe à adopter) :
                        </strong>
                        <p className="font-medium text-emerald-800">{risk.goldenRule}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Senior Advice Footer */}
      <div className="mt-8 bg-gradient-to-r from-blue-900 to-indigo-900 text-white rounded-2xl p-6 shadow-md">
        <div className="max-w-3xl space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-300" />
            <h3 className="font-bold text-lg">La Règle des 3 Vérités de l'Atelier Christophe</h3>
          </div>
          <p className="text-blue-100 text-sm leading-relaxed">
            1. <strong>Une administration ou une banque ne vous demande jamais de carte bleue par mail.</strong><br/>
            2. <strong>En cas de doute, on ne clique pas : on ouvre son propre navigateur ou on téléphone avec son répertoire habituel.</strong><br/>
            3. <strong>Prendre son temps n'a jamais tué personne : les urgences à 24h sont toujours fabriquées de toutes pièces.</strong>
          </p>
        </div>
      </div>
    </div>
  );
};
