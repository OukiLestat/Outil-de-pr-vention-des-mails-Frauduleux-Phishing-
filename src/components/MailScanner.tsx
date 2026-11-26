import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, AlertTriangle, Sparkles, RefreshCw, Send, CheckCircle2 } from 'lucide-react';
import { FontSize } from '../types';

interface MailScannerProps {
  fontSize: FontSize;
}

export const MailScanner: React.FC<MailScannerProps> = ({ fontSize }) => {
  const [emailText, setEmailText] = useState('');
  const [analysisResult, setAnalysisResult] = useState<{
    score: number;
    dangerLevel: 'Très Élevé' | 'Modéré' | 'Faible / Sûr';
    alertsFound: { type: string; desc: string; severity: 'high' | 'medium' | 'safe' }[];
    verdict: string;
    advice: string;
  } | null>(null);

  const samplePresets = [
    {
      title: 'Colis bloqué avec frais 1,99 €',
      text: 'Bonjour, votre colis FR-9831 est retenu au centre de distribution. Un paiement de 1,99 € est requis sous 48h sur http://suivi-colis-relais.biz sinon votre colis sera détruit.'
    },
    {
      title: 'Message du petit-fils sur WhatsApp',
      text: 'Coucou maman c est moi, j ai cassé mon téléphone. C est mon nouveau numéro temporaire. Ne m appelle pas le micro marche pas. Peux tu m aider pour une facture urgente stp ?'
    },
    {
      title: 'Courriel légitime Médiathèque municipale',
      text: 'Chers usagers de la médiathèque, nous vous rappelons que vos livres réservés sont disponibles à l’accueil. Horaires d’ouverture : du mardi au samedi de 10h à 18h. À bientôt !'
    }
  ];

  const handleScan = () => {
    if (!emailText.trim()) return;

    const lower = emailText.toLowerCase();
    const alerts: { type: string; desc: string; severity: 'high' | 'medium' | 'safe' }[] = [];
    let riskPoints = 0;

    // Check urgency
    if (lower.includes('urgent') || lower.includes('48h') || lower.includes('24h') || lower.includes('immédiat') || lower.includes('détruit') || lower.includes('suspendu') || lower.includes('bloqué')) {
      riskPoints += 35;
      alerts.push({
        type: 'Urgence artificielle et Menace',
        desc: 'Le message utilise un délai couperet ou des mots alarmants (« urgent », « 48h », « suspendu ») pour vous empêcher de réfléchir.',
        severity: 'high'
      });
    }

    // Check financial keywords
    if (lower.includes('carte bancaire') || lower.includes('cb') || lower.includes('1,99') || lower.includes('frais') || lower.includes('virement') || lower.includes('remboursement') || lower.includes('paiement') || lower.includes('€')) {
      riskPoints += 30;
      alerts.push({
        type: 'Demande financière ou bancaire',
        desc: 'Présence de termes liés à de l’argent, une carte bancaire ou des micro-frais. Rappel : Ameli et les impôts ne demandent jamais de CB par mail.',
        severity: 'high'
      });
    }

    // Check link or suspicious domain
    if (lower.includes('http') || lower.includes('.biz') || lower.includes('.net') || lower.includes('.org') || lower.includes('.info') || lower.includes('cliquez')) {
      riskPoints += 25;
      alerts.push({
        type: 'Incitation au clic sur un lien externe',
        desc: 'Le message pousse à cliquer sur une adresse internet. Méfiez-vous des extensions comme .biz, .net ou .info.',
        severity: 'medium'
      });
    }

    // Check secret / no-call requests
    if (lower.includes('ne m’appelle pas') || lower.includes("ne m'appelle pas") || lower.includes('micro') || lower.includes('secret') || lower.includes('whatsapp') || lower.includes('nouveau numéro')) {
      riskPoints += 40;
      alerts.push({
        type: 'Tentative d’isolement (arnaque aux proches)',
        desc: 'Refus de parler au téléphone ou incitation à basculer sur WhatsApp : caractéristique de l’arnaque « Coucou Maman ».',
        severity: 'high'
      });
    }

    // Baseline assessment
    let dangerLevel: 'Très Élevé' | 'Modéré' | 'Faible / Sûr' = 'Faible / Sûr';
    let verdict = 'Ce courriel semble d’apparence courtoise et ne présente pas d’indices majeurs d’attaque.';
    let advice = 'Restez toujours attentif au nom de l’expéditeur, mais ce message ne cherche a priori pas à vous soutirer d’argent.';

    if (riskPoints >= 50) {
      dangerLevel = 'Très Élevé';
      verdict = '🚨 FORTE PROBABILITÉ DE COURRIEL FRAUDULEUX (Phishing / Escroquerie)';
      advice = 'Ne cliquez sur aucun lien, ne transmettez aucune coordonnée bancaire et supprimez ce message. En cas de doute, appelez vous-même l’organisme officiel avec votre numéro habituel.';
    } else if (riskPoints >= 25) {
      dangerLevel = 'Modéré';
      verdict = '⚠️ ATTENTION : Plusieurs signaux suspects détectés';
      advice = 'Vérifiez bien l’expéditeur officiel avant toute action. Ne fournissez jamais de mot de passe ni de numéro de carte bleue.';
    }

    setAnalysisResult({
      score: Math.min(riskPoints, 98),
      dangerLevel,
      alertsFound: alerts,
      verdict,
      advice
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      {/* Intro */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 text-blue-800 font-bold text-lg mb-1">
          <Sparkles className="w-5 h-5 text-blue-600" />
          <h2>Testeur de Courriel : Bac à Sable d'Analyse</h2>
        </div>
        <p className="text-slate-600 text-sm max-w-3xl">
          Vous avez reçu un courriel suspect dans votre vraie vie ? Ou vous souhaitez tester un scénario lors de l'atelier de Christophe ? Collez son texte ci-dessous pour lancer l'analyse automatisée des signaux de fraude.
        </p>

        {/* Quick Presets */}
        <div className="mt-4 pt-4 border-t border-slate-100">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wide block mb-2">
            Exemples rapides à tester en 1 clic :
          </span>
          <div className="flex flex-wrap gap-2">
            {samplePresets.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setEmailText(preset.text);
                  setAnalysisResult(null);
                }}
                className="text-xs bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 font-medium px-3 py-1.5 rounded-lg border border-slate-200 transition"
              >
                👉 {preset.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Input Form */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div>
          <label className="block text-sm font-bold text-slate-900 mb-1">
            Collez le texte du courriel à analyser :
          </label>
          <textarea
            rows={5}
            value={emailText}
            onChange={(e) => setEmailText(e.target.value)}
            placeholder="Exemple : Bonjour, votre carte vitale arrive à expiration sous 48h. Veuillez cliquer ici pour régler 2,60€ de frais de port..."
            className="w-full p-4 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 leading-relaxed font-sans"
          />
        </div>

        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => {
              setEmailText('');
              setAnalysisResult(null);
            }}
            className="text-xs text-slate-500 hover:text-slate-800 font-semibold px-3 py-2"
          >
            Effacer
          </button>

          <button
            onClick={handleScan}
            disabled={!emailText.trim()}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-xl shadow-md transition"
          >
            <Sparkles className="w-4 h-4" />
            <span>Analyser ce message</span>
          </button>
        </div>
      </div>

      {/* Result Card */}
      {analysisResult && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-lg space-y-5 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <span className="text-xs uppercase font-bold text-slate-500 tracking-wider">
                Résultat du Diagnostic de Sécurité
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                {analysisResult.verdict}
              </h3>
            </div>

            <div className={`px-4 py-2 rounded-xl text-center shrink-0 border ${
              analysisResult.dangerLevel === 'Très Élevé'
                ? 'bg-rose-100 border-rose-300 text-rose-900 font-bold'
                : analysisResult.dangerLevel === 'Modéré'
                ? 'bg-amber-100 border-amber-300 text-amber-900 font-bold'
                : 'bg-emerald-100 border-emerald-300 text-emerald-900 font-bold'
            }`}>
              <span className="text-xs block">Indice de suspicion</span>
              <span className="text-xl">{analysisResult.score}%</span>
            </div>
          </div>

          {/* Detected Signals */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-800">
              Signaux détectés dans le texte ({analysisResult.alertsFound.length}) :
            </h4>

            {analysisResult.alertsFound.length === 0 ? (
              <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs sm:text-sm text-emerald-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Aucun signal alarmant majeur détecté dans ce message.</span>
              </div>
            ) : (
              <div className="space-y-2">
                {analysisResult.alertsFound.map((alert, idx) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl border text-xs sm:text-sm flex items-start gap-3 ${
                      alert.severity === 'high'
                        ? 'bg-rose-50 border-rose-200 text-rose-950'
                        : 'bg-amber-50 border-amber-200 text-amber-950'
                    }`}
                  >
                    <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-bold">{alert.type}</strong>
                      <p className="text-slate-700 mt-0.5">{alert.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Advice */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-xs sm:text-sm text-blue-950 space-y-1">
            <strong className="block font-bold text-blue-900">
              🛡️ Le Réflexe recommandé par Christophe :
            </strong>
            <p className="text-blue-800">{analysisResult.advice}</p>
          </div>
        </div>
      )}
    </div>
  );
};
