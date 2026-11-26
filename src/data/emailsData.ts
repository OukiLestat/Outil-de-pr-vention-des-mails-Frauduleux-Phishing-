import { EmailCase } from '../types';

export const EMAILS_CASES: EmailCase[] = [
  // CASE 1: Fake Ameli (Phishing)
  {
    id: 'case-ameli-vitale',
    order: 1,
    title: 'Renouvellement urgent Carte Vitale V4',
    category: 'Administration',
    logoType: 'ameli',
    senderDisplay: "L'Assurance Maladie Ameli",
    senderEmail: 'renouvellement-carte@ameli-services-update4.fr',
    realDomainWarning: 'Fausse adresse : le vrai domaine officiel est uniquement ameli.fr',
    recipient: 'jean.dupont@orange.fr',
    date: '10 Décembre 2026 à 08:34',
    timeSnippet: '08:34',
    subject: 'URGENT : Votre nouvelle Carte Vitale V4 arrive à expiration (Délai 48h)',
    isPhishing: true,
    difficulty: 'Facile',
    scamType: 'Usurpation d’identité de l’Assurance Maladie',
    contextDesc: 'Un courriel prétend que votre carte Vitale expire et exige 2,60 € de frais postaux.',
    bodySnippet: 'Votre carte Vitale arrive à expiration. Veuillez commander votre nouvelle carte...',
    fullBodyHtml: `
      <div class="space-y-4">
        <p class="font-bold text-slate-900">Madame, Monsieur,</p>
        <p>Après étude de votre dossier d'assuré social, nous constatons que votre <strong>Carte Vitale arrive à expiration</strong> le 12 Décembre 2026.</p>
        <div class="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-amber-950 font-medium">
          ⚠️ Sans action sous 48 heures, vos remboursements de soins et de pharmacie seront immédiatement suspendus.
        </div>
        <p>Afin de recevoir votre nouvelle carte Vitale sécurisée directement à votre domicile, veuillez confirmer votre adresse postale et vous acquitter des frais d'affranchissement postal d'un montant de <strong>2,60 €</strong>.</p>
        <p class="text-xs text-slate-500">Direction de la Sécurité Sociale • Caisse Nationale d'Assurance Maladie</p>
      </div>
    `,
    buttonText: 'Commander ma Carte Vitale (2,60 €)',
    buttonFakeUrl: 'https://ameli-portail-renouvellement.secu-paiement-fr.com/vitale-v4/auth',
    psychologicalTrigger: 'La Peur de ne plus être remboursé pour ses médicaments et l’urgence sous 48h.',
    whatScammerWants: 'Vos coordonnées de carte bancaire, votre numéro de sécurité sociale et votre adresse.',
    goldenRule: 'La Carte Vitale est 100 % GRATUITE à vie. Elle se met à jour en 10 secondes sur une borne verte en pharmacie.',
    christopheAdvice: 'Ne paniquez jamais : la Sécurité Sociale ne vous réclamera jamais d’argent ni de carte bancaire par courriel. En cas de doute, ouvrez vous-même ameli.fr sur votre ordinateur ou allez voir votre pharmacien habituel.',
    clues: [
      {
        id: 'clue-1',
        label: "Adresse d'expéditeur trompeuse",
        hint: 'Regardez ce qui est écrit après le signe @ dans l’adresse.',
        explanation: 'L’adresse se termine par @ameli-services-update4.fr au lieu de @ameli.fr. C’est une fausse enveloppe fabriquée par des escrocs.',
        severity: 'high',
        targetType: 'sender'
      },
      {
        id: 'clue-2',
        label: 'Demande de paiement par carte bancaire',
        hint: 'Une carte vitale est-elle payante en France ?',
        explanation: 'La carte Vitale est totalement gratuite. Exiger 2,60 € est l’indice absolu d’une escroquerie.',
        severity: 'high',
        targetType: 'link'
      },
      {
        id: 'clue-3',
        label: 'Urgence artificielle et menace de suspension',
        hint: 'Le délai de 48 heures sous peine de coupure des soins.',
        explanation: 'Les fraudeurs inventent toujours une urgence pour vous empêcher de réfléchir ou d’en parler à un proche.',
        severity: 'medium',
        targetType: 'urgency'
      }
    ],
    quizOptions: [
      {
        id: 'q1-sender',
        text: 'L’adresse de l’expéditeur ne se termine pas par le nom officiel @ameli.fr',
        isAnomaly: true,
        explanation: 'Vrai ! Une vraie administration communique toujours avec son adresse officielle exacte.'
      },
      {
        id: 'q1-fee',
        text: 'L’e-mail réclame 2,60 € de frais pour renouveler la carte Vitale',
        isAnomaly: true,
        explanation: 'Vrai ! La carte vitale est strictement gratuite en France.'
      },
      {
        id: 'q1-logo',
        text: 'Le logo de la Marianne et de l’Assurance Maladie est présent',
        isAnomaly: false,
        explanation: 'Attention : un logo officiel se copie et se colle en 2 secondes par n’importe quel pirate. Ce n’est jamais une garantie d’authenticité !'
      },
      {
        id: 'q1-threat',
        text: 'Menace de suspendre les remboursements de soins sous 48h',
        isAnomaly: true,
        explanation: 'Vrai ! L’urgence imposée est le levier préféré des fraudeurs.'
      }
    ],
    dangerOnClick: {
      title: 'Piège de la fausse carte Vitale activé !',
      consequences: [
        'Vous êtes redirigé vers une copie parfaite du site Ameli contrôlée par des pirates.',
        'Le faux site vous demande votre nom, votre numéro de Sécurité Sociale et vos coordonnées complètes de Carte Bancaire.',
        'Les escrocs effectuent immédiatement des achats en ligne avec votre carte ou revendent votre identité.'
      ],
      financialRisk: 'Paiements non autorisés de plusieurs centaines d’euros sur votre compte bancaire.',
      immediateReaction: 'Faites immédiatement opposition sur votre carte bancaire en appelant le serveur interbancaire d’opposition (0892 705 705) ou votre agence.'
    }
  },

  // CASE 2: REAL Legitimate email from City Library (SAFE)
  {
    id: 'case-mediatheque-safe',
    order: 2,
    title: 'Livre réservé disponible à la Médiathèque',
    category: 'Consommation',
    logoType: 'mediatheque',
    senderDisplay: 'Médiathèque Municipale Jean Moulin',
    senderEmail: 'contact@mediatheque-municipale.fr',
    realDomainWarning: 'Courriel authentique de votre service municipal',
    recipient: 'jean.dupont@orange.fr',
    date: '10 Décembre 2026 à 10h15',
    timeSnippet: '10:15',
    subject: 'Votre réservation de document est disponible à l’accueil',
    isPhishing: false,
    difficulty: 'Facile',
    scamType: 'Courriel officiel et sécurisé (Légitime)',
    contextDesc: 'La bibliothèque municipale vous informe qu’un livre que vous aviez réservé vous attend.',
    bodySnippet: 'Bonjour Monsieur Dupont, le document « Histoire de notre région » que vous aviez réservé...',
    fullBodyHtml: `
      <div class="space-y-4">
        <p class="font-bold text-slate-900">Bonjour Monsieur Dupont,</p>
        <p>Nous avons le plaisir de vous informer que le document suivant est désormais disponible :</p>
        <div class="p-3.5 bg-sky-50 rounded-xl border border-sky-200 text-sky-950 font-medium">
          📚 <strong>« Histoire et Patrimoine de notre Région »</strong> (Tome 2)<br/>
          Réf. : LIV-2026-8819
        </div>
        <p>Vous pouvez venir le retirer à l'accueil de la médiathèque aux horaires habituels d'ouverture (du mardi au samedi de 10h00 à 18h00).</p>
        <p class="text-sm text-slate-600">Ce document restera réservé à votre nom jusqu'au 24 Décembre 2026. Aucun frais n'est à régler.</p>
        <p class="text-xs text-slate-500">L'équipe de la Médiathèque Municipale • Tél : 04 78 XX XX XX</p>
      </div>
    `,
    buttonText: 'Consulter mes emprunts en ligne',
    buttonFakeUrl: 'https://www.mediatheque-municipale.fr/mon-compte',
    psychologicalTrigger: 'Aucun piège psychologique : information utile et courtoise.',
    whatScammerWants: 'Rien : c’est un vrai courriel légitime.',
    goldenRule: 'Ce courriel est sûr : il s’adresse à vous par votre nom, ne demande aucun mot de passe ni carte bancaire, et propose de venir sur place.',
    christopheAdvice: 'Tous les courriels ne sont pas des pièges ! Quand un message est personnalisé avec votre vrai nom, ne demande aucun argent et ne brandit aucune menace, vous pouvez le lire en toute tranquillité.',
    clues: [
      {
        id: 'clue-safe-name',
        label: 'Message personnalisé avec votre nom',
        hint: 'Le message dit « Bonjour Monsieur Dupont » et non « Cher client ».',
        explanation: 'Un message qui utilise votre vrai nom et fait référence à une action réelle que vous avez faite est un bon signe.',
        severity: 'safe',
        targetType: 'greeting'
      },
      {
        id: 'clue-safe-no-money',
        label: 'Aucune demande d’argent ni de coordonnées',
        hint: 'Regardez s’il y a un paiement ou une menace.',
        explanation: 'Le service précise qu’aucun frais n’est à régler et donne les horaires réels d’accueil.',
        severity: 'safe',
        targetType: 'link'
      }
    ],
    quizOptions: [
      {
        id: 'q2-name',
        text: 'Le courriel s’adresse précisément à vous par votre nom de famille (« Monsieur Dupont »)',
        isAnomaly: false,
        explanation: 'C’est un indice de confiance : la médiathèque s’adresse bien à vous personnellement.'
      },
      {
        id: 'q2-no-threat',
        text: 'Il n’y a aucune menace, aucun délai couperet et aucune demande d’argent',
        isAnomaly: false,
        explanation: 'Exact ! Un message d’information du quotidien sans urgence toxique.'
      },
      {
        id: 'q2-suspicious',
        text: 'Le message demande vos identifiants secrets pour récupérer le livre',
        isAnomaly: true,
        explanation: 'Faux ! Le message ne demande aucun identifiant secret, il invite simplement à venir sur place.'
      }
    ],
    dangerOnClick: {
      title: 'Lien sécurisé et authentique',
      consequences: [
        'Ce bouton vous amène en toute sécurité sur le portail officiel de la médiathèque municipale.',
        'Aucun virus, aucune demande frauduleuse.',
        'Vous pouvez naviguer l’esprit tranquille.'
      ],
      financialRisk: '0 € : ce courriel est 100 % sûr et gratuit.',
      immediateReaction: 'Rien à signaler ! C’est un message officiel de votre ville.'
    }
  },

  // CASE 3: Fake Colissimo (Phishing)
  {
    id: 'case-colis-poste',
    order: 3,
    title: 'Colis Colissimo retenu en agence',
    category: 'Livraison',
    logoType: 'laposte',
    senderDisplay: 'La Poste - Colissimo Suivi',
    senderEmail: 'avis-livraison@laposte-colis-suivi-france2026.net',
    realDomainWarning: 'Fausse adresse : le vrai domaine officiel de La Poste est laposte.fr',
    recipient: 'jean.dupont@orange.fr',
    date: '10 Décembre 2026 à 11h42',
    timeSnippet: '11:42',
    subject: 'Colis n° FR-948102 : Impossible de livrer votre paquet (Frais 1,99 €)',
    isPhishing: true,
    difficulty: 'Facile',
    scamType: 'Usurpation d’identité de La Poste',
    contextDesc: 'Un message prétend qu’un paquet est bloqué et réclame 1,99 € pour le réexpédier.',
    bodySnippet: 'Votre colis FR-948102 n’a pas pu être déposé dans votre boîte aux lettres...',
    fullBodyHtml: `
      <div class="space-y-4">
        <p class="font-bold text-slate-900">Bonjour,</p>
        <p>Le livreur n'a pas pu déposer votre colis <strong>n° FR-948102</strong> à votre domicile ce matin en raison d'un gabarit non conforme ou d'un complément d'affranchissement manquant.</p>
        <div class="p-3.5 bg-slate-100 rounded-xl border border-slate-300 text-slate-800">
          📦 Statut : <strong>Colis retenu en centre de tri logistique</strong><br/>
          Frais de réexpédition : <strong>1,99 €</strong>
        </div>
        <p>Veuillez reprogrammer une livraison et régler les frais de réacheminement sous 24 heures. Passé ce délai, le colis sera retourné ou détruit.</p>
        <p class="text-xs text-slate-500">Service Consommateurs Colissimo • La Poste Groupe</p>
      </div>
    `,
    buttonText: 'Reprogrammer la livraison (1,99 €)',
    buttonFakeUrl: 'https://suivi-colis-laposte.reprogrammation-france.com/fr948102',
    psychologicalTrigger: 'La curiosité de savoir ce qu’il y a dans le paquet et la peur de le perdre.',
    whatScammerWants: 'Prélever 1,99 € pour vous abonner en cachette à un service payant à 49 €/mois.',
    goldenRule: 'Ne cliquez jamais sur un lien de colis reçu à l’improviste. Tapez vous-même « laposte.fr » dans votre navigateur pour entrer le numéro de suivi.',
    christopheAdvice: 'Même si vous attendez un paquet pour un anniversaire ou les fêtes, ne cliquez pas sur le bouton. Allez vous-même sur le site officiel de La Poste. Les livreurs ne demandent jamais de régler 1,99 € par courriel pour déposer un paquet.',
    clues: [
      {
        id: 'clue-c1',
        label: 'Adresse en .net non officielle',
        hint: 'Observez la fin de l’adresse de l’expéditeur.',
        explanation: 'L’adresse se termine par @laposte-colis-suivi-france2026.net. C’est un faux nom de domaine qui n’appartient pas à La Poste.',
        severity: 'high',
        targetType: 'sender'
      },
      {
        id: 'clue-c2',
        label: 'Piège de la micro-somme de 1,99 €',
        hint: 'Pourquoi demander moins de 2 euros ?',
        explanation: 'Les 1,99 € servent d’appât pour récupérer votre carte bancaire et déclencher un abonnement mensuel caché de 49 €.',
        severity: 'high',
        targetType: 'link'
      }
    ],
    quizOptions: [
      {
        id: 'qc-domain',
        text: 'L’adresse se termine par @laposte-colis-suivi-france2026.net au lieu de @laposte.fr',
        isAnomaly: true,
        explanation: 'Vrai ! Une fausse enveloppe créée pour imiter La Poste.'
      },
      {
        id: 'qc-microfee',
        text: 'Demande de payer 1,99 € pour récupérer un prétendu colis',
        isAnomaly: true,
        explanation: 'Vrai ! C’est l’arnaque typique au colis bloqué.'
      },
      {
        id: 'qc-deadline',
        text: 'Menace de détruire le colis sous 24h',
        isAnomaly: true,
        explanation: 'Vrai ! La Poste garde un colis 15 jours en bureau de poste, elle ne le détruit jamais en 24h.'
      }
    ],
    dangerOnClick: {
      title: 'Piège du faux colis et de l’abonnement caché !',
      consequences: [
        'Le faux site de La Poste vous invite à taper vos 16 chiffres de carte bancaire pour payer 1,99 €.',
        'Dans les petites lignes invisibles, vous venez d’accepter un abonnement à 49,90 € prélevé chaque mois.',
        'Vos coordonnées bancaires sont enregistrées à l’étranger.'
      ],
      financialRisk: '1,99 € débités tout de suite, puis 49,90 € prélevés chaque mois sur votre compte.',
      immediateReaction: 'Contactez votre banque pour bloquer les prélèvements récurrents et faire opposition sur votre carte bancaire.'
    }
  },

  // CASE 4: REAL Legitimate email from Doctolib (SAFE)
  {
    id: 'case-doctolib-safe',
    order: 4,
    title: 'Rappel de rendez-vous médical Doctolib',
    category: 'Consommation',
    logoType: 'doctolib',
    senderDisplay: 'Doctolib',
    senderEmail: 'rappel@doctolib.fr',
    realDomainWarning: 'Courriel officiel sécurisé Doctolib',
    recipient: 'jean.dupont@orange.fr',
    date: '10 Décembre 2026 à 14h00',
    timeSnippet: '14:00',
    subject: 'Rappel : Votre rendez-vous médical demain avec le Dr Martin à 10h30',
    isPhishing: false,
    difficulty: 'Facile',
    scamType: 'Courriel officiel et sécurisé (Légitime)',
    contextDesc: 'Doctolib vous rappelle simplement l’horaire et l’adresse de votre consultation médicale.',
    bodySnippet: 'Bonjour Monsieur Dupont, nous vous rappelons votre rendez-vous de consultation avec le Dr Martin...',
    fullBodyHtml: `
      <div class="space-y-4">
        <p class="font-bold text-slate-900">Bonjour Monsieur Dupont,</p>
        <p>Nous vous rappelons votre rendez-vous médical de demain :</p>
        <div class="p-4 bg-blue-50 rounded-xl border border-blue-200 text-slate-800 space-y-1">
          <p class="font-bold text-blue-950 text-base">Dr Claire Martin (Médecin Généraliste)</p>
          <p class="text-sm">🗓️ <strong>Mercredi 11 Décembre 2026 à 10h30</strong></p>
          <p class="text-xs text-slate-600">📍 Cabinet Médical des Tilleuls, 14 Avenue de la République</p>
        </div>
        <p class="text-sm text-slate-600">Pensez à apporter votre carte Vitale et votre moyen de paiement habituel pour la consultation sur place. Aucun paiement en ligne n'est demandé.</p>
        <p class="text-xs text-slate-500">Service officiel Doctolib • Vous recevez ce message car vous avez pris rendez-vous sur la plateforme.</p>
      </div>
    `,
    buttonText: 'Gérer ou annuler mon rendez-vous',
    buttonFakeUrl: 'https://www.doctolib.fr/mon-compte/rendez-vous',
    psychologicalTrigger: 'Aucun piège : service de rappel d’un vrai rendez-vous médical.',
    whatScammerWants: 'Rien : courriel entièrement authentique.',
    goldenRule: 'L’adresse provient bien de doctolib.fr, votre nom et le nom du médecin sont exacts, et aucun paiement en ligne n’est sollicité.',
    christopheAdvice: 'Quand vous reconnaissez le nom exact de votre médecin et l’adresse de son cabinet, et qu’aucun numéro de carte bleue n’est demandé, vous pouvez avoir confiance. C’est un service d’aide très pratique.',
    clues: [
      {
        id: 'clue-d-domain',
        label: 'Véritable adresse doctolib.fr',
        hint: 'Regardez le domaine officiel de l’expéditeur.',
        explanation: 'L’adresse se termine bien par @doctolib.fr, domaine officiel et vérifié.',
        severity: 'safe',
        targetType: 'sender'
      },
      {
        id: 'clue-d-details',
        label: 'Détails précis et cohérents sans demande de carte',
        hint: 'Le message rappelle de payer sur place au cabinet.',
        explanation: 'Le docteur se règle sur place au cabinet, Doctolib ne demande aucune coordonnée bancaire par mail.',
        severity: 'safe',
        targetType: 'link'
      }
    ],
    quizOptions: [
      {
        id: 'qd-domain',
        text: 'L’adresse de l’expéditeur est bien le domaine officiel officiel @doctolib.fr',
        isAnomaly: false,
        explanation: 'Exact ! C’est l’adresse authentique de la plateforme de santé.'
      },
      {
        id: 'qd-nopay',
        text: 'Le courriel rappelle qu’aucun paiement en ligne n’est demandé',
        isAnomaly: false,
        explanation: 'Exact ! Le règlement des soins se fait physiquement au cabinet du médecin.'
      },
      {
        id: 'qd-alert',
        text: 'Le courriel vous oblige à payer 50 € de caution pour maintenir le rendez-vous',
        isAnomaly: true,
        explanation: 'Faux ! Il n’y a aucune demande de caution dans ce message.'
      }
    ],
    dangerOnClick: {
      title: 'Lien sécurisé Doctolib',
      consequences: [
        'Ce lien ouvre directement le site sécurisé officiel https://www.doctolib.fr.',
        'Vous pouvez modifier l’heure de votre rendez-vous si vous avez un empêchement.',
        'Aucun danger pour vos données.'
      ],
      financialRisk: '0 € : service gratuit inclus dans votre suivi de santé.',
      immediateReaction: 'Vous pouvez cliquer sereinement si vous avez besoin d’annuler ou décaler votre visite.'
    }
  },

  // CASE 5: Fake Bank Alert (Phishing)
  {
    id: 'case-banque-fraude',
    order: 5,
    title: 'Alerte sécurité bancaire : Virement suspect',
    category: 'Banque',
    logoType: 'banque',
    senderDisplay: 'Crédit Agricole - Sécurité',
    senderEmail: 'alerte-fraude@securite-credit-agricole-verification.com',
    realDomainWarning: 'Fausse adresse : le vrai domaine est credit-agricole.fr',
    recipient: 'jean.dupont@orange.fr',
    date: '10 Décembre 2026 à 15h18',
    timeSnippet: '15:18',
    subject: 'ALERTE SÉCURITÉ : Tentative de prélèvement suspect de 850,00 € bloquée',
    isPhishing: true,
    difficulty: 'Intermédiaire',
    scamType: 'Usurpation d’identité bancaire',
    contextDesc: 'Un courriel prétend qu’un débit de 850 € a eu lieu et demande d’annuler en saisissant vos codes.',
    bodySnippet: 'Une opération par carte bancaire de 850,00 € chez Cdiscount a été détectée...',
    fullBodyHtml: `
      <div class="space-y-4">
        <p class="font-bold text-slate-900">Cher Client,</p>
        <p>Notre système de surveillance anti-fraude vient d'intercepter une transaction suspecte :</p>
        <div class="p-3.5 bg-red-50 rounded-xl border border-red-200 text-red-950 font-medium">
          💳 Achat : <strong>850,00 €</strong> (Commerçant : Cdiscount Informatique)<br/>
          Date : Aujourd'hui à 15h12
        </div>
        <p>Si vous n'êtes pas à l'origine de cette opération, veuillez cliquer immédiatement sur le bouton ci-dessous pour bloquer le virement et sécuriser vos comptes.</p>
        <p class="text-xs text-slate-500">Service Sécurité Numérique • Crédit Agricole SA</p>
      </div>
    `,
    buttonText: 'Annuler cette transaction de 850 €',
    buttonFakeUrl: 'https://securite-annulation-espace-client.com/ca/login',
    psychologicalTrigger: 'La panique financière : la peur de perdre 850 € sur son compte.',
    whatScammerWants: 'Votre identifiant bancaire, votre mot de passe et le code de sécurité reçu par SMS.',
    goldenRule: 'Votre banque ne vous enverra JAMAIS de lien pour annuler une fraude. Raccrochez et appelez votre conseiller au numéro officiel de votre agence.',
    christopheAdvice: 'C’est le piège le plus cruel car il fait battre le cœur très vite. Gardez votre calme : les pirates inventent cet achat de 850 € pour vous pousser à taper votre code secret. Votre vraie banque bloque déjà les opérations douteuses sans vous faire cliquer sur un lien.',
    clues: [
      {
        id: 'clue-b1',
        label: 'Adresse web fantaisiste',
        hint: 'Examinez l’adresse email de l’expéditeur.',
        explanation: 'L’adresse se termine par @securite-credit-agricole-verification.com. Une vraie banque utilise credit-agricole.fr.',
        severity: 'high',
        targetType: 'sender'
      },
      {
        id: 'clue-b2',
        label: 'Formule impersonnelle (« Cher Client »)',
        hint: 'Votre banque connaît parfaitement votre nom.',
        explanation: 'Une banque qui vous écrit utilise toujours votre nom et prénom, et souvent votre numéro d’agence.',
        severity: 'medium',
        targetType: 'greeting'
      }
    ],
    quizOptions: [
      {
        id: 'qb-domain',
        text: 'L’adresse se termine par un faux domaine à rallonge non officiel',
        isAnomaly: true,
        explanation: 'Vrai ! Une adresse fabriquée pour tromper votre vigilance.'
      },
      {
        id: 'qb-generic',
        text: 'L’e-mail commence par un vague « Cher Client » au lieu de votre nom',
        isAnomaly: true,
        explanation: 'Vrai ! Les pirates envoient ce mail à des millions de personnes au hasard sans connaître leur nom.'
      },
      {
        id: 'qb-cancel',
        text: 'Un bouton vous propose d’annuler vous-même l’opération en ligne',
        isAnomaly: true,
        explanation: 'Vrai ! Une banque n’annule jamais une fraude via un simple lien par courriel.'
      }
    ],
    dangerOnClick: {
      title: 'Vol immédiat de vos accès bancaires !',
      consequences: [
        'Le faux site imite l’écran de connexion de votre banque et enregistre vos identifiants.',
        'Un prétendu « conseiller anti-fraude » peut vous téléphoner dans la minute pour vous demander de valider un code sur votre téléphone.',
        'Les escrocs vident vos livrets d’épargne par virement immédiat.'
      ],
      financialRisk: 'Plusieurs milliers d’euros dérobés sur vos comptes bancaires.',
      immediateReaction: 'Appelez d’urgence votre agence bancaire ou le numéro d’urgence officiel qui figure au dos de votre carte bancaire.'
    }
  },

  // CASE 6: REAL Legitimate email from Impots (SAFE)
  {
    id: 'case-impots-safe',
    order: 6,
    title: 'Avis d’impôt disponible sur impots.gouv.fr',
    category: 'Administration',
    logoType: 'securite',
    senderDisplay: 'Direction Générale des Finances Publiques',
    senderEmail: 'ne-pas-repondre@dgfip.finances.gouv.fr',
    realDomainWarning: 'Courriel officiel de l’administration fiscale française',
    recipient: 'jean.dupont@orange.fr',
    date: '10 Décembre 2026 à 16h20',
    timeSnippet: '16:20',
    subject: 'Votre avis d’impôt sur le revenu est disponible dans votre espace particulier',
    isPhishing: false,
    difficulty: 'Intermédiaire',
    scamType: 'Courriel officiel et sécurisé (Légitime)',
    contextDesc: 'L’administration fiscale vous informe simplement qu’un document est consultable en ligne.',
    bodySnippet: 'Bonjour Monsieur Jean Dupont, nous vous informons que votre avis d’impôt sur les revenus...',
    fullBodyHtml: `
      <div class="space-y-4">
        <p class="font-bold text-slate-900">Bonjour Monsieur Jean Dupont,</p>
        <p>Nous vous informons que votre <strong>avis d’impôt sur les revenus 2025</strong> est disponible dans votre espace particulier sur le site impots.gouv.fr.</p>
        <div class="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 text-sm">
          ℹ️ <strong>Rappel de sécurité de la DGFiP :</strong><br/>
          L’administration fiscale ne vous demandera jamais vos coordonnées de carte bancaire par courriel. Pour consulter votre document, rendez-vous directement sur <strong>impots.gouv.fr</strong>.
        </div>
        <p class="text-sm text-slate-600">Ce message est purement informatif. Il ne comporte aucun document joint ni aucun lien direct de paiement.</p>
        <p class="text-xs text-slate-500">Direction générale des Finances publiques • République Française</p>
      </div>
    `,
    buttonText: 'Accéder au portail impots.gouv.fr',
    buttonFakeUrl: 'https://www.impots.gouv.fr/portail/',
    psychologicalTrigger: 'Aucun piège : notification légale informative.',
    whatScammerWants: 'Rien : vrai courriel officiel du fisc.',
    goldenRule: 'La DGFiP ne met JAMAIS de lien direct vers un paiement par carte bancaire. Elle invite à se connecter soi-même sur impots.gouv.fr.',
    christopheAdvice: 'Admirez ce message : il vous rappelle lui-même les consignes de sécurité ! Il ne vous promet pas de chèque magique et ne vous menace pas de prison. C’est la marque d’un courriel d’État authentique.',
    clues: [
      {
        id: 'clue-imp-domain',
        label: 'Domaine officiel dgfip.finances.gouv.fr',
        hint: 'Regardez l’extension de l’expéditeur.',
        explanation: 'Le domaine se termine par .gouv.fr, réservé exclusivement à l’État français.',
        severity: 'safe',
        targetType: 'sender'
      },
      {
        id: 'clue-imp-nopay',
        label: 'Aucune promesse d’argent facile ni demande de carte',
        hint: 'Le courriel vous demande-t-il votre carte bleue ?',
        explanation: 'Aucune demande de paiement, juste un avis disponible.',
        severity: 'safe',
        targetType: 'link'
      }
    ],
    quizOptions: [
      {
        id: 'qimp-gov',
        text: 'L’adresse de messagerie se termine strictement par .gouv.fr',
        isAnomaly: false,
        explanation: 'Exact ! Seuls les organismes publics français ont le droit d’utiliser .gouv.fr.'
      },
      {
        id: 'qimp-nocard',
        text: 'Le courriel ne réclame aucun numéro de carte bleue pour « verser un remboursement »',
        isAnomaly: false,
        explanation: 'Exact ! Le fisc possède déjà votre RIB et ne demande jamais de carte bancaire.'
      },
      {
        id: 'qimp-urgency',
        text: 'Une menace de saisie d’huissier sous 24h est affichée en gros caractères rouges',
        isAnomaly: true,
        explanation: 'Faux ! Ce message est calme, courtois et informatif.'
      }
    ],
    dangerOnClick: {
      title: 'Accès sécurisé au portail officiel des impôts',
      consequences: [
        'Vous êtes dirigé sur la vraie page d’accueil officielle www.impots.gouv.fr.',
        'La connexion est sécurisée par FranceConnect.',
        'Aucun piège.'
      ],
      financialRisk: '0 € : consultation gratuite de vos documents administratifs.',
      immediateReaction: 'Vous pouvez vous connecter en toute sérénité avec vos identifiants fiscaux habituels.'
    }
  },

  // CASE 7: Fake relative WhatsApp scam (Phishing)
  {
    id: 'case-famille-urgence',
    order: 7,
    title: 'Arnaque au faux proche (« Coucou, j’ai cassé mon téléphone »)',
    category: 'Famille',
    logoType: 'famille',
    senderDisplay: 'Lucas (Message Familial)',
    senderEmail: 'message-urgent-famille@contact-mobile-messagerie.com',
    realDomainWarning: 'Fausse adresse : numéro et expéditeur inconnus',
    recipient: 'jean.dupont@orange.fr',
    date: '10 Décembre 2026 à 17h05',
    timeSnippet: '17:05',
    subject: 'Coucou c’est moi, j’ai un gros problème avec mon téléphone portable',
    isPhishing: true,
    difficulty: 'Subtil',
    scamType: 'Arnaque à l’urgence familiale (« Coucou maman / papa »)',
    contextDesc: 'Un escroc se fait passer pour votre enfant ou petit-fils en détresse avec un faux numéro.',
    bodySnippet: 'Coucou, mon téléphone est tombé dans l’eau et l’écran est mort...',
    fullBodyHtml: `
      <div class="space-y-4">
        <p class="font-bold text-slate-900">Coucou,</p>
        <p>Mon téléphone est tombé par terre et l'écran est complètement cassé. C'est mon <strong>nouveau numéro provisoire</strong> que je viens de prendre.</p>
        <div class="p-3.5 bg-emerald-50 rounded-xl border border-emerald-300 text-emerald-950 font-medium">
          📱 Enregistre vite mon nouveau numéro sur WhatsApp : <strong>07 56 XX XX XX</strong>
        </div>
        <p>J'ai un gros souci : je dois régler une facture urgente avant 18h sinon j'ai des pénalités, mais avec mon téléphone bloqué je n'ai plus accès à mon application bancaire. Peux-tu m'aider s'il te plaît ?</p>
        <p class="text-xs text-slate-500">Ne m'appelle pas sur ce numéro le micro ne marche pas, réponds-moi uniquement par message WhatsApp.</p>
      </div>
    `,
    psychologicalTrigger: 'L’amour pour sa famille, l’inquiétude pour son enfant ou son petit-fils, et l’urgence d’aider.',
    whatScammerWants: 'Un virement bancaire instantané ou l’achat de recharges prépayées (Transcash, PCS) en bureau de tabac.',
    goldenRule: 'RÈGLE ABSOLUE : Appelez immédiatement votre proche sur son ANCIEN numéro habituel. Ne versez jamais d’argent sans avoir entendu sa vraie voix.',
    christopheAdvice: 'C’est une escroquerie très répandue. Les voleurs prétendent que « le micro est cassé » précisément pour vous empêcher d’entendre que ce n’est pas la voix de votre proche. Dès que vous recevez ce message, décrochez votre téléphone et composez son ancien numéro habituel !',
    clues: [
      {
        id: 'clue-f1',
        label: 'Refus de parler au téléphone',
        hint: 'Pourquoi refuse-t-il qu’on l’appelle ?',
        explanation: 'L’escroc prétexte un micro cassé car si vous appelez, vous découvrirez immédiatement que ce n’est pas votre proche.',
        severity: 'high',
        targetType: 'sender'
      },
      {
        id: 'clue-f2',
        label: 'Demande d’argent pressante avant une heure limite',
        hint: 'L’heure limite de 18h.',
        explanation: 'Créer une fausse urgence pour vous empêcher de contacter les autres membres de la famille.',
        severity: 'high',
        targetType: 'urgency'
      }
    ],
    quizOptions: [
      {
        id: 'qf-nocall',
        text: 'Le message interdit formellement d’appeler de vive voix (« Le micro est cassé »)',
        isAnomaly: true,
        explanation: 'Vrai ! C’est la signature de cette arnaque pour masquer l’imposture vocale.'
      },
      {
        id: 'qf-transfer',
        text: 'Demande urgente de régler une facture à la place de votre proche',
        isAnomaly: true,
        explanation: 'Vrai ! Le but final est de vous faire envoyer de l’argent rapidement.'
      },
      {
        id: 'qf-realvoice',
        text: 'Vous avez appelé votre proche sur son numéro de toujours et il vous a parlé normalement',
        isAnomaly: false,
        explanation: 'C’est le réflexe sauveur ! Appeler l’ancien numéro permet de démasquer l’escroc en 10 secondes.'
      }
    ],
    dangerOnClick: {
      title: 'Arnaque au faux proche en cours !',
      consequences: [
        'Sur WhatsApp, le faux enfant/petit-fils vous demande de faire un virement instantané de 1 200 € sur un compte à l’étranger.',
        'S’il sent que vous hésitez, il vous demande d’aller acheter des coupons Neosurf ou Transcash au bureau de tabac.',
        'L’argent est encaissé en quelques minutes et devient irrécupérable.'
      ],
      financialRisk: 'Perte sèche de 500 € à 2 500 € en virement immédiat.',
      immediateReaction: 'Prenez votre téléphone fixe ou portable et composez le numéro habituel de votre proche. Vous constaterez qu’il va très bien et qu’il n’a rien demandé.'
    }
  },

  // CASE 8: REAL Legitimate email from Ameli Monthly Statement (SAFE)
  {
    id: 'case-ameli-safe',
    order: 8,
    title: 'Relevé mensuel de remboursements Ameli',
    category: 'Administration',
    logoType: 'ameli_legitime',
    senderDisplay: "L'Assurance Maladie",
    senderEmail: 'assurance-maladie@ameli.fr',
    realDomainWarning: 'Courriel officiel de l’Assurance Maladie',
    recipient: 'jean.dupont@orange.fr',
    date: '10 Décembre 2026 à 17h45',
    timeSnippet: '17:45',
    subject: 'Votre relevé mensuel de remboursements est disponible',
    isPhishing: false,
    difficulty: 'Intermédiaire',
    scamType: 'Courriel officiel et sécurisé (Légitime)',
    contextDesc: 'L’Assurance Maladie vous informe que votre relevé mensuel de santé est consultable en ligne.',
    bodySnippet: 'Bonjour Monsieur Dupont, votre relevé mensuel de prestations du mois de Novembre est disponible...',
    fullBodyHtml: `
      <div class="space-y-4">
        <p class="font-bold text-slate-900">Bonjour Monsieur Dupont,</p>
        <p>Un nouveau relevé mensuel de remboursements (prestations du mois de Novembre) est disponible dans votre espace personnel <strong>compte ameli</strong>.</p>
        <div class="p-3.5 bg-blue-50 rounded-xl border border-blue-200 text-blue-950 text-sm">
          ℹ️ <strong>Rappel officiel de votre Caisse Primaire :</strong><br/>
          L'Assurance Maladie ne vous sollicitera jamais par courriel pour vous demander de communiquer vos coordonnées bancaires (numéro de carte bleue, cryptogramme).
        </div>
        <p class="text-sm text-slate-600">Pour consulter vos décomptes et le détail de vos remboursements, connectez-vous directement sur <strong>ameli.fr</strong> avec votre numéro de Sécurité Sociale.</p>
        <p class="text-xs text-slate-500">Caisse Primaire d'Assurance Maladie • République Française</p>
      </div>
    `,
    buttonText: 'Consulter mon compte sur ameli.fr',
    buttonFakeUrl: 'https://assure.ameli.fr/',
    psychologicalTrigger: 'Aucun piège : notification légale mensuelle sans urgence.',
    whatScammerWants: 'Rien : vrai courriel officiel.',
    goldenRule: 'Le vrai site Ameli se termine toujours par ameli.fr et ne demande JAMAIS de carte bleue.',
    christopheAdvice: 'Notez bien la différence avec le faux courriel d’Ameli du début : ici, pas de délai de 48h, pas de carte vitale qui expire, pas de 2,60 € à payer. C’est un simple avis de mise à disposition.',
    clues: [
      {
        id: 'clue-as-domain',
        label: 'Domaine exact ameli.fr',
        hint: 'Observez l’adresse de l’expéditeur.',
        explanation: 'L’adresse se termine strictement par @ameli.fr.',
        severity: 'safe',
        targetType: 'sender'
      },
      {
        id: 'clue-as-no-card',
        label: 'Rappel de sécurité explicite',
        hint: 'Le courriel avertit lui-même contre le vol de carte bancaire.',
        explanation: 'L’Assurance Maladie rappelle noir sur blanc qu’elle ne demande jamais de carte bleue.',
        severity: 'safe',
        targetType: 'link'
      }
    ],
    quizOptions: [
      {
        id: 'qas-domain',
        text: 'L’adresse de l’expéditeur est authentique (@ameli.fr)',
        isAnomaly: false,
        explanation: 'Exact ! C’est le vrai domaine de l’Assurance Maladie.'
      },
      {
        id: 'qas-nofee',
        text: 'Aucune somme d’argent n’est réclamée pour recevoir ou renouveler un document',
        isAnomaly: false,
        explanation: 'Exact ! Pas de frais factices de 2,60 € ni de carte bancaire demandée.'
      },
      {
        id: 'qas-threat',
        text: 'Menace de suspendre vos remboursements de médicaments sous 24h',
        isAnomaly: true,
        explanation: 'Faux ! Aucune menace n’est proférée dans ce message.'
      }
    ],
    dangerOnClick: {
      title: 'Accès sécurisé à votre compte Ameli',
      consequences: [
        'Le lien vous ouvre en toute sécurité le vrai site https://assure.ameli.fr.',
        'Vos données médicales et vos remboursements sont protégés.',
        'Aucune tentative de fraude.'
      ],
      financialRisk: '0 € : service public officiel de santé.',
      immediateReaction: 'Vous pouvez consulter votre relevé en toute quiétude.'
    }
  },

  // CASE 9: Fake Tax Refund (Phishing)
  {
    id: 'case-impots-remboursement',
    order: 9,
    title: 'Faux remboursement d’impôts de 342,80 €',
    category: 'Administration',
    logoType: 'impots',
    senderDisplay: 'Direction Générale des Finances Publiques',
    senderEmail: 'remboursement-fisc@dgfip-portail-finances-service.com',
    realDomainWarning: 'Fausse adresse : le domaine officiel est impots.gouv.fr',
    recipient: 'jean.dupont@orange.fr',
    date: '10 Décembre 2026 à 18h10',
    timeSnippet: '18:10',
    subject: 'AVIS FAVORABLE : Vous disposez d’un trop-perçu fiscal de 342,80 €',
    isPhishing: true,
    difficulty: 'Facile',
    scamType: 'Usurpation de l’administration fiscale',
    contextDesc: 'Un faux message du fisc vous promet un remboursement de 342,80 € en saisissant votre carte.',
    bodySnippet: 'Après les derniers calculs de vos droits, vous êtes éligible à un remboursement de 342,80 €...',
    fullBodyHtml: `
      <div class="space-y-4">
        <p class="font-bold text-slate-900">Madame, Monsieur,</p>
        <p>Après les derniers calculs de votre déclaration de revenus, nos services ont constaté un trop-perçu en votre faveur d'un montant de <strong>342,80 €</strong>.</p>
        <div class="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950 font-bold">
          💶 Montant à vous rembourser : 342,80 € (Crédit d'impôt validé)
        </div>
        <p>Pour recevoir ce virement sous 48 heures, veuillez renseigner vos coordonnées bancaires ainsi que le numéro de votre carte bancaire sur notre formulaire sécurisé.</p>
        <p class="text-xs text-slate-500">Trésor Public • Ministère de l'Économie et des Finances</p>
      </div>
    `,
    buttonText: 'Réclamer mon remboursement de 342,80 €',
    buttonFakeUrl: 'https://portail-remboursement-dgfip.finances-recouvrement.com/fr',
    psychologicalTrigger: 'L’appât du gain : croire à un cadeau financier inespéré de l’État.',
    whatScammerWants: 'Votre numéro de Carte Bancaire avec date d’expiration et cryptogramme secret.',
    goldenRule: 'Une Carte Bancaire sert à PAYER, elle ne sert JAMAIS à recevoir un virement du fisc. Les impôts utilisent exclusivement votre RIB.',
    christopheAdvice: 'Quand l’État vous rembourse un trop-perçu, il fait un virement direct sur le compte bancaire que vous lui avez déjà donné lors de votre déclaration. Il ne vous demande JAMAIS de numéro de carte bleue par courriel.',
    clues: [
      {
        id: 'clue-i1',
        label: 'Adresse ne finissant pas par .gouv.fr',
        hint: 'Regardez bien l’extension de l’adresse.',
        explanation: 'L’adresse se termine par @dgfip-portail-finances-service.com au lieu de dgfip.finances.gouv.fr.',
        severity: 'high',
        targetType: 'sender'
      },
      {
        id: 'clue-i2',
        label: 'Demande de carte bancaire pour verser de l’argent',
        hint: 'Peut-on recevoir un virement de l’État sur une carte bleue ?',
        explanation: 'C’est une impossibilité technique : pour vous verser de l’argent, on demande un RIB (IBAN), jamais une carte bancaire.',
        severity: 'high',
        targetType: 'link'
      }
    ],
    quizOptions: [
      {
        id: 'qi-notgouv',
        text: 'L’adresse de messagerie se termine par .com au lieu de l’extension d’État .gouv.fr',
        isAnomaly: true,
        explanation: 'Vrai ! Une fausse administration en .com est une contrefaçon évidente.'
      },
      {
        id: 'qi-cardforrefund',
        text: 'L’e-mail réclame vos numéros de carte bancaire pour « vous verser un remboursement »',
        isAnomaly: true,
        explanation: 'Vrai ! Une carte bancaire sert à payer, jamais à recevoir de l’argent du fisc.'
      },
      {
        id: 'qi-toogood',
        text: 'Une somme de 342,80 € vous est promise sans justification fiscale précise',
        isAnomaly: true,
        explanation: 'Vrai ! La promesse d’argent facile est un appât classique.'
      }
    ],
    dangerOnClick: {
      title: 'Vol de carte bancaire sous prétexte de remboursement !',
      consequences: [
        'Le faux site vous demande vos 16 chiffres de carte bancaire et le code à 3 chiffres au dos.',
        'Les escrocs ne vous versent aucun euro mais débitent immédiatement votre compte bancaire.',
        'Votre carte est compromise et doit être détruite.'
      ],
      financialRisk: 'Débit immédiat pouvant atteindre le plafond de votre carte bancaire (1 000 € à 3 000 €).',
      immediateReaction: 'Faites immédiatement opposition sur votre carte bancaire auprès de votre banque.'
    }
  },

  // CASE 10: REAL Legitimate email from EDF (SAFE)
  {
    id: 'case-edf-safe',
    order: 10,
    title: 'Facture d’électricité disponible EDF',
    category: 'Consommation',
    logoType: 'edf',
    senderDisplay: 'EDF Particuliers',
    senderEmail: 'services-clients@edf.fr',
    realDomainWarning: 'Courriel officiel EDF',
    recipient: 'jean.dupont@orange.fr',
    date: '10 Décembre 2026 à 18h30',
    timeSnippet: '18:30',
    subject: 'Votre facture EDF d’électricité est disponible sur votre espace client',
    isPhishing: false,
    difficulty: 'Intermédiaire',
    scamType: 'Courriel officiel et sécurisé (Légitime)',
    contextDesc: 'EDF vous avertit de l’arrivée de votre facture bimestrielle prélevée automatiquement.',
    bodySnippet: 'Bonjour Monsieur Dupont, votre facture n° 882194 du 08/12/2026 est en ligne...',
    fullBodyHtml: `
      <div class="space-y-4">
        <p class="font-bold text-slate-900">Bonjour Monsieur Dupont,</p>
        <p>Votre facture d'électricité n° <strong>882194</strong> d'un montant de <strong>64,20 €</strong> est désormais consultable dans votre espace client EDF.</p>
        <div class="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-700">
          ℹ️ <strong>Modalité de paiement :</strong> Prélèvement automatique prévu le <strong>22 Décembre 2026</strong> sur votre compte bancaire habituel (FR76 XXXX XXXX 490). Vous n'avez aucune démarche à effectuer.
        </div>
        <p class="text-sm text-slate-600">Vous pouvez consulter le détail de vos consommations en vous connectant à votre espace client sur <strong>edf.fr</strong>.</p>
        <p class="text-xs text-slate-500">EDF SA • Direction Commerciale Particuliers</p>
      </div>
    `,
    buttonText: 'Accéder à mon espace client EDF',
    buttonFakeUrl: 'https://particulier.edf.fr/fr/accueil/espace-client.html',
    psychologicalTrigger: 'Aucun piège : notification de routine sans menace de coupure.',
    whatScammerWants: 'Rien : vrai courriel officiel.',
    goldenRule: 'Un courriel légitime rappelle que le prélèvement est automatique et ne vous somme pas de payer sous 2 heures avec une carte bancaire.',
    christopheAdvice: 'Observez la sérénité du message : il vous rappelle vos 4 derniers chiffres de compte, précise la date de prélèvement dans 12 jours et vous dit que vous n’avez rien à faire. Aucune menace de couper le compteur !',
    clues: [
      {
        id: 'clue-e-domain',
        label: 'Adresse officielle @edf.fr',
        hint: 'Regardez le domaine de l’expéditeur.',
        explanation: 'L’adresse se termine bien par @edf.fr, domaine officiel.',
        severity: 'safe',
        targetType: 'sender'
      },
      {
        id: 'clue-e-autopay',
        label: 'Prélèvement automatique rappelé calmement',
        hint: 'Le message demande-t-il de payer d’urgence par carte ?',
        explanation: 'Le message informe simplement que le prélèvement habituel se fera sans intervention.',
        severity: 'safe',
        targetType: 'link'
      }
    ],
    quizOptions: [
      {
        id: 'qe-domain',
        text: 'L’adresse de l’expéditeur appartient au domaine officiel @edf.fr',
        isAnomaly: false,
        explanation: 'Exact ! C’est l’adresse de contact officielle d’EDF.'
      },
      {
        id: 'qe-noemergency',
        text: 'Le courriel ne contient aucune menace de couper le courant dans la journée',
        isAnomaly: false,
        explanation: 'Exact ! Les faux mails menacent de couper l’électricité sous 2 heures pour vous affoler.'
      },
      {
        id: 'qe-iban',
        text: 'Le message cite les derniers chiffres réels de votre compte bancaire pour le prélèvement',
        isAnomaly: false,
        explanation: 'Exact ! Votre fournisseur d’énergie connaît déjà votre moyen de paiement.'
      }
    ],
    dangerOnClick: {
      title: 'Accès sécurisé à l’espace client EDF',
      consequences: [
        'Ce bouton vous amène en toute sécurité sur https://particulier.edf.fr.',
        'Vous pouvez télécharger votre justificatif de domicile ou votre facture.',
        'Aucun risque d’escroquerie.'
      ],
      financialRisk: '0 € : facture normale payée selon votre contrat habituel.',
      immediateReaction: 'Aucune action requise, votre paiement se fera automatiquement.'
    }
  },

  // CASE 11: Fake ANTAI Traffic Fine (Phishing)
  {
    id: 'case-antai-amende',
    order: 11,
    title: 'Fausse contravention de stationnement ANTAI (35 €)',
    category: 'Administration',
    logoType: 'antai',
    senderDisplay: 'ANTAI - Avis de Contravention',
    senderEmail: 'contravention-infraction@antai-gouv-amendes-paiement.com',
    realDomainWarning: 'Fausse adresse : le seul site officiel est amendes.gouv.fr',
    recipient: 'jean.dupont@orange.fr',
    date: '10 Décembre 2026 à 18h45',
    timeSnippet: '18:45',
    subject: 'Avis d’infraction n° 948102 : Retard de paiement de votre amende de stationnement (35 €)',
    isPhishing: true,
    difficulty: 'Intermédiaire',
    scamType: 'Usurpation de l’Agence Nationale de Traitement Automatisé des Infractions',
    contextDesc: 'Un courriel affirme que vous devez 35 € pour un stationnement impayé sous peine de majoration sous 24h.',
    bodySnippet: 'Un avis de contravention électronique a été émis pour votre véhicule...',
    fullBodyHtml: `
      <div class="space-y-4">
        <p class="font-bold text-slate-900">Avis d'infraction routière,</p>
        <p>Un procès-verbal électronique a été dressé à l'encontre de votre véhicule pour l'infraction suivante :</p>
        <div class="p-3.5 bg-red-50 rounded-xl border border-red-200 text-red-950 font-medium">
          🚗 <strong>Stationnement non payé ou gênant</strong><br/>
          Montant initial : <strong>35,00 €</strong> • Majoration à 75,00 € sous 24 heures
        </div>
        <p>Pour éviter l'ouverture d'une procédure judiciaire et la majoration de votre amende, veuillez régler immédiatement par carte bancaire sur notre portail télépaiement.</p>
        <p class="text-xs text-slate-500">Ministère de l'Intérieur • ANTAI • République Française</p>
      </div>
    `,
    buttonText: 'Régler mon amende de 35,00 €',
    buttonFakeUrl: 'https://paiement-amendes-antai.portail-infraction-securite.com',
    psychologicalTrigger: 'La peur de la police, du tribunal et d’une amende majorée.',
    whatScammerWants: 'Votre carte bancaire et votre numéro d’immatriculation.',
    goldenRule: 'En France, le SEUL site légal pour payer une amende est amendes.gouv.fr. L’ANTAI ne menace jamais d’une majoration en 24h (la loi donne 45 jours).',
    christopheAdvice: 'Ne cédez jamais à la panique face à un prétendu PV par e-mail. L’ANTAI n’envoie des courriels que si vous avez donné votre adresse lors d’une interpellation réelle, et la loi vous accorde 45 jours pour régler. Le délai de 24h est un mensonge de pirates.',
    clues: [
      {
        id: 'clue-a1',
        label: 'Faux domaine en .com au lieu de .gouv.fr',
        hint: 'Regardez l’adresse de l’expéditeur.',
        explanation: 'L’adresse se termine par @antai-gouv-amendes-paiement.com. C’est un faux nom de domaine.',
        severity: 'high',
        targetType: 'sender'
      },
      {
        id: 'clue-a2',
        label: 'Majoration en 24h contraire à la loi française',
        hint: 'La loi permet-elle de majorer une amende en 24h ?',
        explanation: 'En France, le délai légal est d’au moins 45 jours. Une majoration en 24h prouve l’escroquerie.',
        severity: 'high',
        targetType: 'urgency'
      }
    ],
    quizOptions: [
      {
        id: 'qa-domain',
        text: 'L’adresse de messagerie se termine par un faux nom de domaine en .com',
        isAnomaly: true,
        explanation: 'Vrai ! Une administration régalienne n’utilise jamais un domaine pirate en .com.'
      },
      {
        id: 'qa-deadline',
        text: 'Menace d’une majoration sous 24h (alors que la loi donne 45 jours)',
        isAnomaly: true,
        explanation: 'Vrai ! L’urgence de 24h est un faux couperet fabriqué de toutes pièces.'
      },
      {
        id: 'qa-link',
        text: 'Le lien renvoie vers le site officiel amendes.gouv.fr',
        isAnomaly: false,
        explanation: 'Faux ! Le lien pointe vers un faux site pirate qui n’est pas amendes.gouv.fr.'
      }
    ],
    dangerOnClick: {
      title: 'Piège de la fausse contravention ANTAI !',
      consequences: [
        'Le faux site pirate imite le portail de télépaiement des amendes.',
        'On vous demande votre carte bancaire pour payer 35 €.',
        'La carte est débitée de montants bien supérieurs et conservée par les fraudeurs.'
      ],
      financialRisk: 'Vol des coordonnées bancaires et retraits frauduleux.',
      immediateReaction: 'Si vous avez un doute sur une vraie amende, ouvrez votre navigateur et tapez vous-même « amendes.gouv.fr ».'
    }
  },

  // CASE 12: Fake Microsoft Windows Defender Security Alert (Phishing)
  {
    id: 'case-support-bloquant',
    order: 12,
    title: 'Alerte virus critique Microsoft Windows',
    category: 'Informatique',
    logoType: 'microsoft',
    senderDisplay: 'Support Sécurité Microsoft Windows',
    senderEmail: 'alerte-systeme@support-windows-microsoft-alerte.org',
    realDomainWarning: 'Fausse adresse : Microsoft n’envoie jamais d’alerte avec numéro de téléphone',
    recipient: 'jean.dupont@orange.fr',
    date: '10 Décembre 2026 à 18h55',
    timeSnippet: '18:55',
    subject: 'ALERTE CRITIQUE WINDOWS : Votre ordinateur est infecté par un Cheval de Troie (Code #0x802)',
    isPhishing: true,
    difficulty: 'Facile',
    scamType: 'Arnaque au faux support informatique',
    contextDesc: 'Un courriel alarmant prétend que votre ordinateur est infecté et vous ordonne d’appeler un 09 d’urgence.',
    bodySnippet: 'Votre système Windows 11 a été compromis par un logiciel espion. Appelez le support...',
    fullBodyHtml: `
      <div class="space-y-4">
        <p class="font-bold text-red-600 uppercase text-base">⚠️ Alerte de Sécurité Système Critique</p>
        <p>Le pare-feu Windows Defender a bloqué une tentative d'intrusion malveillante sur votre machine. Des mots de passe et données bancaires risquent d'être interceptés.</p>
        <div class="p-4 bg-red-600 text-white rounded-xl font-bold text-center space-y-1">
          <p class="text-sm">NE PAS ÉTEINDRE VOTRE ORDINATEUR</p>
          <p class="text-lg tracking-wider">📞 Contactez immédiatement le technicien Microsoft :</p>
          <p class="text-2xl font-black text-amber-300">09 70 44 XX XX (Numéro Gratuit)</p>
        </div>
        <p class="text-xs text-slate-500">Département d'assistance technique Microsoft Corporation</p>
      </div>
    `,
    buttonText: 'Télécharger le logiciel de nettoyage antivirus',
    buttonFakeUrl: 'https://support-technique-reparation.com/outils/AnyDesk-support.exe',
    attachmentName: 'Rapport_Infection_Trojan_Win11.exe',
    psychologicalTrigger: 'La terreur informatique : la peur d’avoir tout cassé ou tout perdu sur son ordinateur.',
    whatScammerWants: 'Prendre le contrôle de votre PC à distance (via AnyDesk) et vous extorquer 300 € à 800 € pour un faux dépannage.',
    goldenRule: 'Microsoft, Apple ou Google n’affichent JAMAIS de numéro de téléphone dans une alerte. Si votre écran se bloque, redémarrez simplement l’ordinateur.',
    christopheAdvice: 'C’est une mise en scène théâtrale : les pirates utilisent des mots effrayants comme « Cheval de Troie » ou « Alerte critique » pour vous tétaniser. N’appelez JAMAIS le numéro indiqué et ne téléchargez aucun fichier .exe joint au courriel.',
    clues: [
      {
        id: 'clue-m1',
        label: 'Numéro de téléphone dans l’alerte',
        hint: 'Microsoft vous demande-t-il un jour de lui téléphoner ?',
        explanation: 'Microsoft n’affiche jamais de numéro de téléphone à contacter. C’est la preuve absolue d’une tentative d’extorsion.',
        severity: 'high',
        targetType: 'link'
      },
      {
        id: 'clue-m2',
        label: 'Fichier joint dangereux qui se termine par .exe',
        hint: 'Regardez le nom de la pièce jointe.',
        explanation: 'Un fichier .exe est un programme informatique qui va s’installer sur votre ordinateur pour donner les clés aux pirates.',
        severity: 'high',
        targetType: 'attachment'
      }
    ],
    quizOptions: [
      {
        id: 'qm-phone',
        text: 'Présence d’un numéro de téléphone d’urgence à appeler impérativement',
        isAnomaly: true,
        explanation: 'Vrai ! Les géants de l’informatique ne mettent jamais de numéro d’appel dans une alerte.'
      },
      {
        id: 'qm-exe',
        text: 'Pièce jointe ou bouton de téléchargement d’un fichier exécutable (.exe)',
        isAnomaly: true,
        explanation: 'Vrai ! Ne lancez jamais un fichier .exe reçu par courriel.'
      },
      {
        id: 'qm-panic',
        text: 'Ordre paniquant en majuscules : « NE PAS ÉTEINDRE VOTRE ORDINATEUR »',
        isAnomaly: true,
        explanation: 'Vrai ! Cette consigne vise à vous empêcher de redémarrer calmement votre machine.'
      }
    ],
    dangerOnClick: {
      title: 'Prise de contrôle à distance de votre ordinateur !',
      consequences: [
        'En cliquant ou en appelant, vous donnez la main à un escroc qui installe un logiciel espion.',
        'L’escroc verrouille votre écran et vous réclame entre 300 € et 800 € par carte bancaire pour « réparer le système ».',
        'Il fouille dans vos dossiers personnels pour voler vos relevés de compte et mots de passe.'
      ],
      financialRisk: 'Extorsion de 300 € à 1 000 € pour une réparation bidon.',
      immediateReaction: 'Éteignez immédiatement votre ordinateur en maintenant le bouton marche/arrêt enfoncé pendant 10 secondes. Rallumez-le : le message aura disparu.'
    }
  },

  // CASE 13: Fake Netflix Account Suspension (Phishing)
  {
    id: 'case-netflix-suspension',
    order: 13,
    title: 'Faux renouvellement d’abonnement Netflix suspendu',
    category: 'Divertissement',
    logoType: 'netflix',
    senderDisplay: 'Netflix Support Facturation',
    senderEmail: 'support-facture@netflix-abonnement-renouvellement.net',
    realDomainWarning: 'Fausse adresse : le seul domaine officiel est netflix.com',
    recipient: 'jean.dupont@orange.fr',
    date: '10 Décembre 2026 à 19h10',
    timeSnippet: '19:10',
    subject: 'Votre abonnement Netflix est suspendu : Échec de votre dernier prélèvement',
    isPhishing: true,
    difficulty: 'Intermédiaire',
    scamType: 'Usurpation d’un service de streaming',
    contextDesc: 'Un message affirme que votre compte Netflix est bloqué et qu’il faut ressaisir votre carte bancaire.',
    bodySnippet: 'Nous n’avons pas pu prélever votre abonnement mensuel. Mettez à jour vos données...',
    fullBodyHtml: `
      <div class="space-y-4 bg-zinc-900 text-white p-5 rounded-xl">
        <p class="font-bold text-lg text-red-500">Mise à jour requise de vos informations de paiement</p>
        <p>Bonjour,</p>
        <p>Nous avons rencontré un problème lors du renouvellement de votre abonnement mensuel Netflix. Par conséquent, l'accès à vos séries et films est temporairement <strong>suspendu</strong>.</p>
        <div class="p-3 bg-zinc-800 rounded-lg border border-zinc-700 text-zinc-300 text-xs">
          Réf. Facturation : NF-889102 • Échec transaction bancaire
        </div>
        <p class="text-sm">Pour réactiver immédiatement votre compte sans interruption de service, veuillez actualiser vos coordonnées bancaires en cliquant sur le bouton ci-dessous.</p>
        <p class="text-xs text-zinc-500">L'équipe Netflix • Service Clientèle International</p>
      </div>
    `,
    buttonText: 'Mettre à jour mes informations de paiement',
    buttonFakeUrl: 'https://netflix-portail-mise-a-jour.compte-client-info.com/fr/login',
    psychologicalTrigger: 'La frustration d’être privé de ses films et séries dès le soir même.',
    whatScammerWants: 'Vos identifiants de compte et vos coordonnées complètes de carte bancaire.',
    goldenRule: 'Pour vérifier l’état d’un abonnement, n’utilisez jamais le lien du courriel : allumez directement votre télévision ou votre application habituelle.',
    christopheAdvice: 'Si votre compte Netflix ou de streaming avait vraiment un souci, l’application sur votre télévision vous l’afficherait au démarrage. Ne rentrez jamais votre numéro de carte bleue depuis un lien reçu par courriel.',
    clues: [
      {
        id: 'clue-n1',
        label: 'Expéditeur non officiel en .net',
        hint: 'Vérifiez le nom de domaine de l’adresse de l’expéditeur.',
        explanation: 'L’adresse se termine par @netflix-abonnement-renouvellement.net au lieu de netflix.com.',
        severity: 'high',
        targetType: 'sender'
      },
      {
        id: 'clue-n2',
        label: 'Message générique sans votre nom d’utilisateur',
        hint: 'Le message commence par un simple « Bonjour ».',
        explanation: 'Netflix s’adresse toujours à vous avec le nom de profil exact de votre compte.',
        severity: 'medium',
        targetType: 'greeting'
      }
    ],
    quizOptions: [
      {
        id: 'qn-domain',
        text: 'L’adresse de messagerie ne se termine pas par @netflix.com',
        isAnomaly: true,
        explanation: 'Vrai ! Une fausse adresse créée par des escrocs.'
      },
      {
        id: 'qn-generic',
        text: 'Le courriel ne mentionne pas votre prénom ni votre nom d’abonné',
        isAnomaly: true,
        explanation: 'Vrai ! Une formule anonyme envoyée en masse.'
      },
      {
        id: 'qn-link',
        text: 'Le bouton redirige vers une adresse internet bizarre en .com qui n’est pas netflix.com',
        isAnomaly: true,
        explanation: 'Vrai ! Le survol du bouton révèle une fausse page de phishing.'
      }
    ],
    dangerOnClick: {
      title: 'Vol de votre compte et de vos données bancaires !',
      consequences: [
        'Le faux site pirate copie l’interface sombre de Netflix pour voler votre mot de passe et votre carte bleue.',
        'Votre compte Netflix est revendu sur des forums de pirates.',
        'Votre carte bancaire est utilisée pour faire des achats frauduleux.'
      ],
      financialRisk: 'Piratage de compte et débits frauduleux sur votre compte bancaire.',
      immediateReaction: 'Ouvrez votre vraie application Netflix sur votre télévision pour constater que votre abonnement fonctionne parfaitement.'
    }
  },

  // CASE 14: Fake Lottery / 1€ Smartphone (Phishing)
  {
    id: 'case-loterie-smartphone',
    order: 14,
    title: 'Gain exceptionnel : Smartphone dernier cri pour 1 €',
    category: 'Consommation',
    logoType: 'laposte',
    senderDisplay: 'Tirage au Sort Fidélité Partenaires',
    senderEmail: 'reclamation-lot@grand-tirage-fidelite-gagnant.info',
    realDomainWarning: 'Fausse adresse : loterie frauduleuse sans aucun fondement',
    recipient: 'jean.dupont@orange.fr',
    date: '10 Décembre 2026 à 19h40',
    timeSnippet: '19:40',
    subject: 'FÉLICITATIONS : Votre adresse e-mail a été tirée au sort pour remporter un Smartphone haut de gamme !',
    isPhishing: true,
    difficulty: 'Facile',
    scamType: 'Arnaque au faux cadeau et smartphone à 1 €',
    contextDesc: 'Un message vous annonce que vous avez gagné un téléphone d’une valeur de 900 € contre 1 € de frais d’envoi.',
    bodySnippet: 'Vous avez été sélectionné parmi les clients fidèles pour recevoir notre lot spécial...',
    fullBodyHtml: `
      <div class="space-y-4">
        <p class="font-bold text-slate-900">Cher internaute privilégié,</p>
        <p>Nous avons l'immense honneur de vous informer que votre adresse e-mail a été sélectionnée par tirage au sort certifié sous contrôle d'huissier !</p>
        <div class="p-4 bg-amber-50 rounded-xl border border-amber-300 text-amber-950 font-bold text-center space-y-1">
          <p class="text-xs uppercase tracking-widest text-amber-800">🎉 Lot Gagné :</p>
          <p class="text-xl">Smartphone 5G Haute Définition (Valeur : 899,00 €)</p>
          <p class="text-sm font-normal text-slate-700">Participation requise : <strong>1,00 € seulement</strong> (frais de port et assurance)</p>
        </div>
        <p>Attention : en raison du nombre limité de lots, vous disposez de <strong>15 minutes</strong> pour valider votre expédition.</p>
        <p class="text-xs text-slate-500">Service Tirage au Sort • Commission des Récompenses Numériques</p>
      </div>
    `,
    buttonText: 'Réclamer mon smartphone à 1,00 €',
    buttonFakeUrl: 'https://reclamation-cadeau-gagnant-direct.biz/smartphone/paiement1euro',
    psychologicalTrigger: 'L’illusion de la chance et l’effet de surprise.',
    whatScammerWants: 'Vos coordonnées bancaires pour vous prélever un abonnement mensuel caché de 69 €.',
    goldenRule: 'Personne n’offre un smartphone à 900 € pour 1 €. Si c’est trop beau pour être vrai, c’est invariablement une arnaque.',
    christopheAdvice: 'Souvenez-vous de cette règle de bon sens : on ne gagne jamais à une loterie à laquelle on n’a jamais acheté de ticket ! Les 1 € réclamés servent juste à capter vos coordonnées bancaires pour un abonnement caché très difficile à résilier.',
    clues: [
      {
        id: 'clue-l1',
        label: 'Cadeau mirifique disproportionné',
        hint: 'Pourquoi une société offrirait-elle 900 € à un inconnu ?',
        explanation: 'Le Père Noël n’envoie pas d’e-mails. Personne ne donne un téléphone à 900 € pour 1 €.',
        severity: 'high',
        targetType: 'subject'
      },
      {
        id: 'clue-l2',
        label: 'Compte à rebours artificiel de 15 minutes',
        hint: 'Le délai de 15 minutes.',
        explanation: 'Ce délai ridicule sert à vous faire perdre votre esprit critique.',
        severity: 'high',
        targetType: 'urgency'
      }
    ],
    quizOptions: [
      {
        id: 'ql-freebie',
        text: 'On vous annonce avoir gagné un lot luxueux à un concours auquel vous n’avez jamais participé',
        isAnomaly: true,
        explanation: 'Vrai ! C’est le signe absolu d’une arnaque par loterie.'
      },
      {
        id: 'ql-euro',
        text: 'Demande de payer 1 € symbolique pour prétendument recevoir le cadeau',
        isAnomaly: true,
        explanation: 'Vrai ! Le piège pour prélever ensuite 69 € par mois en douce.'
      },
      {
        id: 'ql-timer',
        text: 'Un délai de 15 minutes vous est imposé pour réclamer le lot',
        isAnomaly: true,
        explanation: 'Vrai ! Une fausse urgence pour vous pousser à agir sans réfléchir.'
      }
    ],
    dangerOnClick: {
      title: 'Piège de l’abonnement caché à 69 €/mois !',
      consequences: [
        'Vous payez 1 € pensant recevoir un smartphone.',
        'Vous ne recevrez JAMAIS aucun smartphone.',
        'Vous venez de souscrire sans le savoir à un abonnement payant à l’étranger de 69 € débité tous les mois.'
      ],
      financialRisk: '69 € prélevés chaque mois sur votre compte jusqu’à ce que vous fassiez opposition.',
      immediateReaction: 'Supprimez immédiatement ce courriel. Ne donnez jamais votre carte bancaire pour un prétendu cadeau.'
    }
  },

  // CASE 15: Fake Judicial Summons (Phishing)
  {
    id: 'case-convocation-justice',
    order: 15,
    title: 'Fausse convocation judiciaire de la Gendarmerie',
    category: 'Administration',
    logoType: 'antai',
    senderDisplay: 'Commandement de la Gendarmerie Nationale',
    senderEmail: 'brigade-protection-mineurs@gendarmerie-justice-police-fr.org',
    realDomainWarning: 'Fausse adresse : la police et la justice ne convoquent jamais par e-mail',
    recipient: 'jean.dupont@orange.fr',
    date: '10 Décembre 2026 à 20h00',
    timeSnippet: '20:00',
    subject: 'CONVOCATION JUDICIAIRE IMMÉDIATE : Poursuites pénales et mandat d’arrêt n° GEND-2026',
    isPhishing: true,
    difficulty: 'Intermédiaire',
    scamType: 'Arnaque à la fausse convocation de gendarmerie / Europol',
    contextDesc: 'Un faux courriel prétend que vous êtes sous le coup d’un mandat d’arrêt et vous ordonne de répondre sous 72h.',
    bodySnippet: 'Vous faites l’objet d’une enquête judiciaire pour infractions graves sur internet...',
    fullBodyHtml: `
      <div class="space-y-4">
        <p class="font-bold text-red-700 text-lg uppercase">Direction Générale de la Gendarmerie Nationale</p>
        <p>Madame, Monsieur,</p>
        <p>Vous faites l'objet de plusieurs poursuites judiciaires relatives à des infractions de cybercriminalité et consultation de sites illicites.</p>
        <div class="p-3.5 bg-slate-900 text-white rounded-xl text-xs space-y-1 font-mono">
          <p>Dossier n° : JUS-GEND-99201-FR</p>
          <p>Mandat d'arrêt : Transmis au Procureur de la République</p>
        </div>
        <p>Vous disposez d'un délai strict de <strong>72 heures</strong> pour répondre à cette convocation en envoyant vos justifications par e-mail. À défaut, votre dossier sera transmis aux médias et les forces de l'ordre procéderont à votre arrestation à votre domicile.</p>
        <p class="text-xs text-slate-500">Brigade de Protection des Mineurs • Ministère de la Justice</p>
      </div>
    `,
    attachmentName: 'Mandat_Arret_Officiel_Gendarmerie.pdf.exe',
    psychologicalTrigger: 'La sidération, la peur du scandale, de la honte et de la prison.',
    whatScammerWants: 'Vous extorquer un virement de plusieurs milliers d’euros (1 500 € à 5 000 €) pour prétendument « classer l’affaire sans suite ».',
    goldenRule: 'La Gendarmerie et la Justice ne convoquent JAMAIS de citoyens pour des délits par un simple courriel. C’est un faux grossier.',
    christopheAdvice: 'Les escrocs jouent sur la honte et la terreur pour vous paralyser. Retenez bien ceci : si la justice ou la police vous recherche, elle vous envoie un courrier recommandé ou vient sonner à votre porte avec une commission rogatoire, elle ne vous envoie jamais un e-mail avec une adresse bizarre. Supprimez sans répondre.',
    clues: [
      {
        id: 'clue-j1',
        label: 'Procédure pénale imaginaire par e-mail',
        hint: 'La gendarmerie prévient-elle d’une arrestation par simple courriel ?',
        explanation: 'Les forces de l’ordre ne préviennent jamais par e-mail avant de venir. C’est une escroquerie au chantage.',
        severity: 'high',
        targetType: 'sender'
      },
      {
        id: 'clue-j2',
        label: 'Adresse de réponse fantaisiste',
        hint: 'Regardez l’adresse de l’expéditeur.',
        explanation: 'L’adresse se termine par @gendarmerie-justice-police-fr.org ou une adresse gratuite Protonmail, impensable pour la police.',
        severity: 'high',
        targetType: 'link'
      }
    ],
    quizOptions: [
      {
        id: 'qj-police',
        text: 'La Justice et la Gendarmerie ne préviennent jamais d’un mandat d’arrêt par simple courriel',
        isAnomaly: true,
        explanation: 'Vrai ! Une convocation judiciaire se fait par acte d’huissier ou convocation papier officielle.'
      },
      {
        id: 'qj-domain',
        text: 'L’adresse se termine par un faux nom de domaine non officiel',
        isAnomaly: true,
        explanation: 'Vrai ! Les forces de l’ordre utilisent exclusivement des adresses ministérielles de l’État français.'
      },
      {
        id: 'qj-blackmail',
        text: 'Menace d’arrestation immédiate sous 72h si vous ne répondez pas',
        isAnomaly: true,
        explanation: 'Vrai ! Le chantage à la honte est la marque de cette tentative d’extorsion.'
      }
    ],
    dangerOnClick: {
      title: 'Piège de la fausse convocation judiciaire et tentative d’extorsion !',
      consequences: [
        'En répondant au mail, un faux « commissaire » vous demande un virement de plusieurs milliers d’euros pour « régler une transaction amiable ».',
        'Les escrocs maintiennent la pression psychologique en vous menaçant de divulguer l’affaire à vos voisins.',
        'La pièce jointe peut contenir un virus espion qui s’installe sur votre ordinateur.'
      ],
      financialRisk: 'Extorsion de fonds pouvant atteindre plusieurs milliers d’euros.',
      immediateReaction: 'Ne répondez jamais à ce message. Vous pouvez le signaler directement sur la plateforme officielle du ministère de l’Intérieur (internet-signalement.gouv.fr - Pharos).'
    }
  }
];
