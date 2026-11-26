import React, { useState } from 'react';
import { 
  Lightbulb, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Bot, 
  FileText, 
  Presentation, 
  Cpu, 
  Layers, 
  Copy, 
  Check, 
  MessageSquare,
  HelpCircle,
  ThumbsUp,
  Award,
  BookOpen
} from 'lucide-react';
import { WORKSHOP_DETAILS } from '../data/workshopData';

export const PedagogicalAnalysis: React.FC = () => {
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const samplePrompt = `Agis comme un formateur expert en cybersécurité et pédagogie active. 
Rédige un scénario de courriel d'hameçonnage (phishing) réaliste pour un groupe d'apprenants en France.
Thème : Faux remboursement de mutuelle santé ou carte vitale.
Inclus :
1. Un expéditeur avec un faux nom de domaine subtil
2. Un objet créant une urgence modérée
3. Un levier émotionnel (remboursement ou perte de droits)
4. Trois indices concrets faciles à observer (adresse, formule de politesse, lien sous le bouton)
5. La parade pratique expliquée avec des mots simples et rassurants sans jargon technique.`;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(samplePrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Overview Intro Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-blue-800/40">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center justify-center font-bold text-xl">
            💡
          </div>
          <div>
            <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">
              Analyse & Conseils Pédagogiques
            </span>
            <h2 className="text-xl sm:text-2xl font-bold">
              Retour d'Expert sur votre Atelier « Mails Frauduleux »
            </h2>
          </div>
        </div>

        <p className="text-blue-100 text-sm sm:text-base leading-relaxed max-w-4xl">
          Vous avez conçu un exercice interactif pour votre atelier du <strong>{WORKSHOP_DETAILS.date}</strong> (14h-16h) animé par <strong>{WORKSHOP_DETAILS.animator}</strong>.
          Voici une analyse approfondie de votre démarche, nos recommandations concrètes d'amélioration, et le guide complet des <strong>outils IA de Google</strong> pour concevoir et animer ce type d'ateliers.
        </p>
      </div>

      {/* Part 1: What is Great in Christophe's Workshop */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-emerald-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-base">
            <ThumbsUp className="w-5 h-5 text-emerald-600" />
            <h3>Ce qui est remarquable dans votre initiative :</h3>
          </div>

          <ul className="space-y-3 text-sm text-slate-700">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong>Le format d'enquête ludique :</strong> Transformer une session de cybersécurité souvent austère en un <em>« mini-jeu de détective »</em> active l'attention, stimule la fierté des participants et dédramatise le sujet.
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong>L'apprentissage par l'erreur en milieu sécurisé :</strong> Pouvoir cliquer, observer et se tromper sur un simulateur sans risquer de perdre ses économies est la méthode d'ancrage mémoriel n°1 pour tout apprenant.
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong>La bienveillance et le renforcement positif :</strong> Dédramatiser l'erreur et valoriser chaque indice détecté permet de donner confiance à chaque citoyen pour naviguer sereinement sur internet.
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong>Le créneau de 2h (14h à 16h) :</strong> Idéal d'un point de vue chronobiologique : assez long pour alterner théorie et jeu, sans dépasser le seuil de fatigue cognitive de l'après-midi.
              </div>
            </li>
          </ul>
        </div>

        {/* Part 2: Critical Pitfalls & Points to Watch Out For */}
        <div className="bg-white rounded-2xl border border-amber-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-amber-800 font-bold text-base">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            <h3>Les 4 pièges à éviter absolument lors d'un atelier :</h3>
          </div>

          <ul className="space-y-3 text-sm text-slate-700">
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold shrink-0 text-xs mt-0.5">1</span>
              <div>
                <strong>Ne pas créer de « cyber-paranoïa » :</strong> Si vous ne montrez que des pièges, certains apprenants n'oseront plus jamais ouvrir un e-mail de leurs proches ou de leur médiathèque. Il est <u>vital d'intégrer des courriels authentiques et sûrs</u> dans l'exercice pour leur redonner confiance.
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold shrink-0 text-xs mt-0.5">2</span>
              <div>
                <strong>Bannir tout le jargon technique :</strong> Évitez les termes comme <em>« Spoofing DNS »</em>, <em>« Phishing polymorphe »</em>, <em>« Headers SMTP »</em>. Parlez plutôt d'<em>« usurpation d'identité »</em>, de <em>« faux tampon de la poste »</em> ou de <em>« fausse enveloppe »</em>.
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold shrink-0 text-xs mt-0.5">3</span>
              <div>
                <strong>Privilégier le confort visuel et d'interaction :</strong> Des contrastes nets, des textes lisibles (bouton A++), et l'astuce fondamentale du <em>survol sans clic</em> pour inspecter l'adresse avant d'agir.
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-5 h-5 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold shrink-0 text-xs mt-0.5">4</span>
              <div>
                <strong>Dédramatiser la faute :</strong> Rappelez en introduction que <em>« Même des informaticiens ou des dirigeants d'entreprise se font piéger chaque jour »</em>. Cela lève toute culpabilité chez les apprenants.
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Part 3: Which Google AI Tools to Use */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <span className="text-xs uppercase font-bold text-blue-600 tracking-wider">
            Réponse à votre question
          </span>
          <h3 className="text-xl font-bold text-slate-900 mt-1 flex items-center gap-2">
            <Bot className="w-6 h-6 text-blue-600" />
            Avec quels outils IA de Google créer un tel jeu interactif ?
          </h3>
          <p className="text-slate-600 text-sm mt-1">
            Google propose plusieurs outils d'intelligence artificielle particulièrement puissants et adaptés pour bâtir ce type de support pédagogique :
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Tool 1 */}
          <div className="p-4 rounded-xl bg-blue-50/60 border border-blue-200/80 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
              1
            </div>
            <h4 className="font-bold text-sm text-blue-950">Google AI Studio & Gemini 2.5 Flash</h4>
            <p className="text-xs text-slate-600">
              <strong>À quoi ça sert :</strong> Générer en 2 clics des scénarios de faux courriels hyper-réalistes adaptés à l'actualité (période de soldes, déclarations d'impôts, fausses factures d'énergie).
            </p>
            <div className="text-[11px] bg-white p-2 rounded border border-blue-100 text-blue-800 font-medium">
              👉 C'est exactement le moteur utilisé pour alimenter notre mini-jeu !
            </div>
          </div>

          {/* Tool 2 */}
          <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-200/80 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-sm">
              2
            </div>
            <h4 className="font-bold text-sm text-indigo-950">Google NotebookLM</h4>
            <p className="text-xs text-slate-600">
              <strong>À quoi ça sert :</strong> Vous déposez les fiches officielles de <em>Cybermalveillance.gouv.fr</em> et NotebookLM génère des résumés audio, des questions de quiz et des fiches mémo pour vos participants.
            </p>
            <div className="text-[11px] bg-white p-2 rounded border border-indigo-100 text-indigo-800 font-medium">
              👉 Génère un podcast vocal explicatif à faire écouter en atelier !
            </div>
          </div>

          {/* Tool 3 */}
          <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold text-sm">
              3
            </div>
            <h4 className="font-bold text-sm text-amber-950">Google Forms avec IA (Workspace)</h4>
            <p className="text-xs text-slate-600">
              <strong>À quoi ça sert :</strong> Créer un questionnaire d'auto-évaluation interactif sur tablette ou smartphone, avec correction automatique et explications bienveillantes.
            </p>
            <div className="text-[11px] bg-white p-2 rounded border border-amber-100 text-amber-800 font-medium">
              👉 Idéal pour un sondage en direct avant/après la séance.
            </div>
          </div>

          {/* Tool 4 */}
          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200/80 space-y-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
              4
            </div>
            <h4 className="font-bold text-sm text-emerald-950">Google Slides + Cast Écran</h4>
            <p className="text-xs text-slate-600">
              <strong>À quoi ça sert :</strong> Projeter le jeu sur le grand écran de la salle communale pendant que les participants débattent en groupe avec des cartons rouge/vert.
            </p>
            <div className="text-[11px] bg-white p-2 rounded border border-emerald-100 text-emerald-800 font-medium">
              👉 Stimule la convivialité et l'entraide entre participants.
            </div>
          </div>
        </div>

        {/* Prompt ready to use for Christophe */}
        <div className="mt-4 bg-slate-900 text-white rounded-xl p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Prompt clé en main pour Christophe (à copier dans Google AI Studio ou Gemini) :
            </span>
            <button
              onClick={handleCopyPrompt}
              className="flex items-center gap-1 text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1 rounded-lg border border-slate-700 transition"
            >
              {copiedPrompt ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-300">Copié !</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-slate-400" />
                  <span>Copier le prompt</span>
                </>
              )}
            </button>
          </div>

          <pre className="text-xs font-mono text-slate-300 bg-slate-950/80 p-3.5 rounded-lg overflow-x-auto whitespace-pre-wrap leading-relaxed border border-slate-800">
            {samplePrompt}
          </pre>
        </div>
      </div>

      {/* Part 4: 6 Actionable pedagogical improvements for the workshop */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 shadow-sm space-y-4">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-600" />
          6 Idées Concrètes pour bonifier votre Atelier du Lundi 14 Décembre 2026 :
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
            <span className="text-xs font-bold text-blue-600 uppercase">Idée n°1</span>
            <h4 className="font-bold text-sm text-slate-900">Le jeu des Cartons Rouge / Vert</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Distribuez à chaque participant deux cartons cartonnés (un rouge « Arnaque », un vert « Sûr »). Projetez le courriel au tableau et faites lever les cartons avant de révéler les indices. Échanges dynamiques garantis !
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
            <span className="text-xs font-bold text-blue-600 uppercase">Idée n°2</span>
            <h4 className="font-bold text-sm text-slate-900">L'atelier pratique du « Survol sans clic »</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Faites pratiquer physiquement le geste : poser la flèche de la souris sur le bouton sans appuyer, et lire à voix haute l'adresse internet qui apparaît discrètement en bas à gauche de l'écran.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
            <span className="text-xs font-bold text-blue-600 uppercase">Idée n°3</span>
            <h4 className="font-bold text-sm text-slate-900">La Règle du Canal Indépendant</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Enseignez une règle cardinale : si Ameli, la banque ou les impôts vous écrivent, <em>ne cliquez jamais sur le courriel</em>. Ouvrez votre navigateur et tapez vous-même l'adresse officielle mémorisée.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
            <span className="text-xs font-bold text-blue-600 uppercase">Idée n°4</span>
            <h4 className="font-bold text-sm text-slate-900">La Fiche Plastifiée à garder près de l'ordinateur</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Imprimez le grand tableau des risques (disponible dans l'onglet n°2) sur papier cartonné ou plastifié pour que les participants le gardent à portée de main près de leur écran.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
            <span className="text-xs font-bold text-blue-600 uppercase">Idée n°5</span>
            <h4 className="font-bold text-sm text-slate-900">Le Diplôme de Cyber-Détective</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              En fin de séance (vers 15h50), remettez le diplôme personnalisé avec leur prénom. Cette reconnaissance formelle valorise leur engagement et scelle leur sentiment de compétence numérique.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5">
            <span className="text-xs font-bold text-blue-600 uppercase">Idée n°6</span>
            <h4 className="font-bold text-sm text-slate-900">Le Numéro 33700 et Signal-Spam</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Montrez-leur qu'ils ne sont pas de simples victimes passives, mais des citoyens vigilants capables de signaler les SMS au 33700 ou les courriels suspects sur Signal-Spam.fr.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
