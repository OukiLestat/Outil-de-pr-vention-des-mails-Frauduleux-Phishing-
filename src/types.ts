export type FontSize = 'normal' | 'large' | 'xlarge';

export interface EmailClue {
  id: string;
  label: string;
  hint: string;
  explanation: string;
  severity: 'high' | 'medium' | 'safe';
  targetType: 'sender' | 'subject' | 'link' | 'urgency' | 'attachment' | 'greeting';
}

export interface QuizOption {
  id: string;
  text: string;
  isAnomaly: boolean;
  explanation: string;
}

export interface DangerOnClickInfo {
  title: string;
  consequences: string[];
  financialRisk: string;
  immediateReaction: string;
}

export interface EmailCase {
  id: string;
  order: number;
  title: string;
  category: 'Administration' | 'Livraison' | 'Banque' | 'Famille' | 'Informatique' | 'Consommation' | 'Divertissement';
  logoType: 'ameli' | 'laposte' | 'mediatheque' | 'banque' | 'famille' | 'impots' | 'microsoft' | 'edf' | 'antai' | 'netflix' | 'doctolib' | 'ameli_legitime' | 'securite';
  senderDisplay: string;
  senderEmail: string;
  realDomainWarning?: string;
  recipient: string;
  date: string;
  timeSnippet: string;
  subject: string;
  isPhishing: boolean;
  difficulty: 'Facile' | 'Intermédiaire' | 'Subtil';
  scamType: string;
  contextDesc: string;
  bodySnippet: string;
  fullBodyHtml: string;
  buttonText?: string;
  buttonFakeUrl?: string;
  attachmentName?: string;
  clues: EmailClue[];
  quizOptions: QuizOption[];
  dangerOnClick?: DangerOnClickInfo;
  psychologicalTrigger: string;
  whatScammerWants: string;
  goldenRule: string;
  christopheAdvice: string;
  legitimacySignals?: string[];
}

export interface RiskItem {
  id: string;
  category: 'Administrations' | 'Bancaire & Paiement' | 'Famille & Proches' | 'Colis & Livraisons' | 'Panique Technique' | 'Cadeaux & Gains';
  name: string;
  targetVictimWants: string;
  psychologicalLeverage: string;
  redFlags: string[];
  goldenRule: string;
  exampleScenario: string;
  dangerLevel: 'Très Élevé' | 'Élevé' | 'Moyen';
  frequency: 'Quotidien' | 'Très Fréquent' | 'Fréquent';
}

export interface WorkshopInfo {
  title: string;
  animator: string;
  date: string;
  schedule: string;
  price: string;
  seniorDiscount: string;
  sessionNumber: string;
  location: string;
}

export interface PlayerProgress {
  solvedCases: Record<string, {
    verdict: 'phishing' | 'safe';
    isCorrect: boolean;
    selectedOptions: string[];
    score: number;
  }>;
  score: number;
  completed: boolean;
  playerName: string;
}
