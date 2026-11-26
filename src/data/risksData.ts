import { RiskItem } from '../types';

export const SENIOR_RISKS_MATRIX: RiskItem[] = [
  {
    id: 'risk-ameli',
    category: 'Administrations',
    name: 'Fausse Carte Vitale & Faux Remboursement Ameli',
    targetVictimWants: 'Numéro de Sécurité Sociale, date de naissance, adresse postale, et coordonnées de Carte Bancaire sous prétexte de frais d’envoi (2 € à 4 €).',
    psychologicalLeverage: 'La Peur d’une rupture dans le remboursement des soins et médicaments + l’Urgence (délai de 24h à 48h).',
    redFlags: [
      'Expéditeur terminant par @ameli-update.com, @services-sante.fr ou @gmail.com au lieu de @ameli.fr',
      'Demande de payer des frais d’expédition pour renouveler la carte Vitale',
      'Menace de suspension immédiate de vos droits d’assuré',
      'Lien internet ne débutant pas rigoureusement par https://assure.ameli.fr/'
    ],
    goldenRule: 'La Carte Vitale est 100 % GRATUITE. Elle se met à jour en 10 secondes sur une borne verte en pharmacie. Ameli ne sollicite jamais vos coordonnées bancaires par e-mail.',
    exampleScenario: '« Votre carte vitale V4 arrive à expiration sous 48h. Veuillez régler 2,60 € de frais de port pour recevoir votre nouvelle carte. »',
    dangerLevel: 'Très Élevé',
    frequency: 'Quotidien'
  },
  {
    id: 'risk-colis',
    category: 'Colis & Livraisons',
    name: 'Faux Colis Bloqué (La Poste, Colissimo, Chronopost, Mondial Relay)',
    targetVictimWants: 'Coordonnées de carte bancaire pour prélever une micro-somme (1,99 €) qui dissimule en réalité un abonnement récurrent automatique de 49 €/mois.',
    psychologicalLeverage: 'La Curiosité (se demander qui a envoyé un colis) et l’Impatience (crainte que le paquet soit retourné ou détruit).',
    redFlags: [
      'Numéro de suivi inconnu que vous n’attendiez pas',
      'Demande de régler des « frais de douane » ou un « complément d’affranchissement » dérisoire',
      'Délai impératif de 48 heures avant retour à l’expéditeur',
      'Expéditeur en @laposte-colis-suivi.org ou @chronopost-service.net'
    ],
    goldenRule: 'Ne cliquez jamais sur le lien du SMS ou courriel. Ouvrez votre navigateur et saisissez vous-même « laposte.fr » pour entrer le numéro de suivi.',
    exampleScenario: '« Votre colis n° FR-82910 est retenu en plateforme logistique. Veuillez payer 1,99 € pour programmer la livraison à domicile. »',
    dangerLevel: 'Très Élevé',
    frequency: 'Quotidien'
  },
  {
    id: 'risk-banque',
    category: 'Bancaire & Paiement',
    name: 'Fausse Alerte Sécurité Bancaire & Faux Conseiller Fraude',
    targetVictimWants: 'Identifiant client, mot de passe de l’espace bancaire, code secret de carte, ou validation d’un code reçu par SMS (Pass Sécurité).',
    psychologicalLeverage: 'La Panique financière immédiate (crainte de voir son compte débité de centaines d’euros).',
    redFlags: [
      'Courriel signalant un paiement frauduleux urgent (ex. : 800 € chez Cdiscount ou Darty)',
      'Bouton « Annuler l’opération » exigeant de ressaisir ses identifiants confidentiels',
      'Appel téléphonique consécutif d’un prétendu conseiller anti-fraude (usurpant le numéro officiel de l’agence)',
      'Demande de valider une notification sur son smartphone pour prétendument « bloquer le virement »'
    ],
    goldenRule: 'Votre banque ne vous demandera JAMAIS votre mot de passe ni de valider une opération pour l’annuler. Raccrochez et appelez votre conseiller habituel.',
    exampleScenario: '« Une tentative de paiement de 750 € a été bloquée. Cliquez immédiatement ici pour annuler cette transaction frauduleuse. »',
    dangerLevel: 'Très Élevé',
    frequency: 'Très Fréquent'
  },
  {
    id: 'risk-famille',
    category: 'Famille & Proches',
    name: 'Arnaque au faux proche (« Coucou, j’ai cassé mon téléphone »)',
    targetVictimWants: 'Virement bancaire instantané ou achat de coupons rechargeables (PCS, Transcash, Neosurf) au bureau de tabac.',
    psychologicalLeverage: 'L’Inquiétude pour un proche, l’Empathie, et le sentiment d’urgence pour secourir un membre de la famille.',
    redFlags: [
      'Message affirmant : « Coucou, mon téléphone est tombé dans l’eau/cassé, note mon numéro provisoire »',
      'Numéro inconnu exigeant de communiquer exclusivement par WhatsApp ou SMS',
      'Refus formel de parler de vive voix (« Le micro est cassé, ne m’appelle pas »)',
      'Demande pressante d’argent pour régler une facture ou une caution en urgence sous le sceau du secret'
    ],
    goldenRule: 'RÈGLE ABSOLUE : Appelez immédiatement votre proche sur son ANCIEN numéro habituel. Ne versez jamais un centime sans avoir entendu sa vraie voix.',
    exampleScenario: '« Salut, c’est Lucas. J’ai un nouveau numéro provisoire. J’ai une facture urgente avant 17h, peux-tu m’aider ? Ne le dis pas aux autres. »',
    dangerLevel: 'Très Élevé',
    frequency: 'Très Fréquent'
  },
  {
    id: 'risk-impots',
    category: 'Administrations',
    name: 'Faux Remboursement des Impôts (DGFiP / Trésor Public)',
    targetVictimWants: 'Numéro de carte bancaire avec date d’expiration et cryptogramme pour débiter le compte.',
    psychologicalLeverage: 'L’Appât du gain (croire à un remboursement inespéré de l’État) et la confiance envers les symboles officiels.',
    redFlags: [
      'Adresse courriel ne finissant PAS par l’extension officielle @dgfip.finances.gouv.fr ou @impots.gouv.fr',
      'Formulaire réclamant un numéro de Carte Bancaire pour « vous verser de l’argent » (une CB sert à payer, pas à recevoir un virement du fisc)',
      'Promesse d’une somme séduisante (ex. : 284,50 € ou 342,80 €)'
    ],
    goldenRule: 'L’administration fiscale possède déjà votre RIB et ne vous demandera JAMAIS votre carte bancaire. Connectez-vous exclusivement sur impots.gouv.fr par vous-même.',
    exampleScenario: '« Avis favorable : Vous disposez d’un trop-perçu fiscal de 342,80 €. Renseignez vos coordonnées bancaires pour recevoir votre virement. »',
    dangerLevel: 'Élevé',
    frequency: 'Fréquent'
  },
  {
    id: 'risk-antai',
    category: 'Administrations',
    name: 'Fausse Contravention & Avis de Majoration (ANTAI / Amendes)',
    targetVictimWants: 'Coordonnées de carte bancaire et données du certificat d’immatriculation pour ponctionner de l’argent.',
    psychologicalLeverage: 'La Peur du gendarme, la crainte de poursuites judiciaires et l’urgence d’éviter une majoration sous 24h.',
    redFlags: [
      'Adresse de messagerie ne finissant pas par @antai.gouv.fr',
      'Menace de majoration sous 24h (alors que la loi accorde au minimum 45 jours)',
      'Lien de paiement ne renvoyant pas vers le site gouvernemental officiel amendes.gouv.fr'
    ],
    goldenRule: 'Le seul portail officiel pour régler une amende en France est amendes.gouv.fr. Ne cliquez sur aucun lien reçu par messagerie.',
    exampleScenario: '« Avis de contravention n° 948102 : Infraction de stationnement de 35 €. Majoration à 75 € sous 24h en cas de non-paiement immédiat. »',
    dangerLevel: 'Très Élevé',
    frequency: 'Quotidien'
  },
  {
    id: 'risk-streaming',
    category: 'Cadeaux & Gains',
    name: 'Faux Renouvellement d’Abonnement (Netflix, Spotify, Amazon)',
    targetVictimWants: 'Identifiants de compte et coordonnées complètes de carte bancaire.',
    psychologicalLeverage: 'La Crainte d’une interruption de service et la frustration de ne plus avoir accès à ses contenus multimédias.',
    redFlags: [
      'Expéditeur utilisant un domaine fantaisiste non officiel',
      'Message générique ne mentionnant pas votre nom d’utilisateur',
      'Lien de redirection vers un formulaire externe non sécurisé'
    ],
    goldenRule: 'Ouvrez directement l’application de streaming sur votre télévision ou appareil pour vérifier l’état de votre compte.',
    exampleScenario: '« Netflix : Votre compte est suspendu. Mettez à jour vos informations de facturation sous 24h pour réactiver vos services. »',
    dangerLevel: 'Élevé',
    frequency: 'Très Fréquent'
  },
  {
    id: 'risk-support',
    category: 'Panique Technique',
    name: 'Faux Virus Bloquant & Faux Support Microsoft / Apple',
    targetVictimWants: 'Prise de contrôle à distance de votre appareil (via AnyDesk ou TeamViewer), puis extorsion de 200 € à 800 € pour une fausse réparation.',
    psychologicalLeverage: 'La Terreur informatique (peur d’avoir tout perdu, avertissement sonore strident, message rouge à l’écran).',
    redFlags: [
      'Message alarmant à l’écran ou par courriel affirmant que votre système est infecté par un « Cheval de Troie »',
      'Numéro de téléphone commençant par 09 ou 08 invitant à contacter un informaticien d’urgence',
      'Fichier joint au message se terminant par .exe, .scr ou .bat',
      'Demande d’installer un logiciel de télémaintenance pour vous dépanner'
    ],
    goldenRule: 'Microsoft, Apple ou Google n’affichent JAMAIS de numéro de téléphone dans une alerte. Si l’écran est bloqué, éteignez calmement l’ordinateur avec le bouton marche/arrêt.',
    exampleScenario: '« ALERTE CRITIQUE WINDOWS : Votre ordinateur est infecté. N’éteignez pas votre PC ! Contactez d’urgence le support au 09 70 XX XX XX. »',
    dangerLevel: 'Très Élevé',
    frequency: 'Très Fréquent'
  },
  {
    id: 'risk-loterie',
    category: 'Cadeaux & Gains',
    name: 'Fausse Loterie, Chèque Cadeau Carrefour/Leclerc & Smartphone à 1 €',
    targetVictimWants: 'Coordonnées bancaires pour souscrire à votre insu un abonnement payant mensuel difficile à résilier.',
    psychologicalLeverage: 'L’Illusion de la chance, la surprise d’avoir été « sélectionné » parmi des milliers de participants.',
    redFlags: [
      'Gagner à un tirage au sort auquel vous n’avez jamais souscrit',
      'Promesse d’un smartphone ou d’un bon d’achat contre seulement 1 € ou 2 € de frais d’expédition',
      'Compte à rebours de quelques minutes pour réclamer le lot',
      'Expéditeur sans aucun lien avec l’enseigne commerciale citée'
    ],
    goldenRule: 'Personne n’offre un smartphone à 1 000 € ou un bon d’achat pour 1 €. Si c’est trop beau pour être vrai, c’est invariablement une escroquerie.',
    exampleScenario: '« Félicitations ! Votre adresse e-mail a été tirée au sort pour remporter un bon d’achat de 500 €. Cliquez vite pour valider. »',
    dangerLevel: 'Moyen',
    frequency: 'Quotidien'
  },
  {
    id: 'risk-convocation',
    category: 'Administrations',
    name: 'Fausse Convocation Judiciaire (Gendarmerie, Police, Europol)',
    targetVictimWants: 'Virement bancaire de plusieurs milliers d’euros pour « régler une amende amiable » et éviter une garde à vue.',
    psychologicalLeverage: 'La Honte, la Sidération et la Peur panique de la justice.',
    redFlags: [
      'Accusation gravissime communiquée par un simple courriel',
      'Document PDF comportant des logos officiels mais truffé de tournures incohérentes et de signatures fantaisistes',
      'Menace d’arrestation sous 48h en l’absence de règlement immédiat',
      'Adresse de contact en @gmail.com ou @police-judiciaire-fr.com'
    ],
    goldenRule: 'La Justice et les forces de l’ordre ne convoquent JAMAIS les citoyens pour des infractions pénales par un simple courriel. Supprimez sans répondre.',
    exampleScenario: '« CONVOCATION JUDICIAIRE IMMÉDIATE : Vous êtes poursuivi pour infractions informatiques. Répondez sous 72h pour éviter votre arrestation. »',
    dangerLevel: 'Élevé',
    frequency: 'Fréquent'
  }
];
