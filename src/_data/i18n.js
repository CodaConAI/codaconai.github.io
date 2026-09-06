// UI strings per language. Page copy lives in the page files; this is chrome only.
module.exports = {
  en: {
    locale: "en_CA",
    htmlLang: "en",
    nav: { home: "Home", services: "Services", blog: "Blog", rss: "RSS" },
    skip: "Skip to content",
    // The switch points to the other language, so its label is in that language.
    langSwitch: { label: "FR", aria: "Version française", hint: "Ce site est aussi offert en français.", hintLink: "Voir en français", dismiss: "Fermer" },
    theme: { label: "Theme", system: "Auto", light: "Light", dark: "Dark", aria: "Change colour theme" },
    footer: {
      rights: "CODACON Inc. All rights reserved.",
      license: 'Blog content licensed under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>. Code licensed under <a href="/LICENSE">MIT</a>.',
      trademark: "CODACON® is a registered trademark in Canada (TMA1357521).",
    },
    post: {
      license: 'This post is licensed under <a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>. You may share and adapt it with attribution and a link to',
      original: "the original",
      cta1Title: "Stay current on AI security",
      cta1Body: 'Subscribe to the <a href="/feed.xml">RSS feed</a> for new posts on AI risk governance, secure SDLC, and incident response.',
      cta2Title: "Work with us",
      cta2Body: '<a href="https://calendar.app.google/imfdaTW4Y1iF9FqUA">Book a call</a> to discuss your security posture, AI strategy, or hiring needs, or <a href="mailto:hello@codacon.ai">email us</a>.',
    },
    tags: {},
  },
  fr: {
    locale: "fr_CA",
    htmlLang: "fr",
    nav: { home: "Accueil", services: "Services", blog: "Blogue", rss: "RSS" },
    skip: "Aller au contenu",
    langSwitch: { label: "EN", aria: "English version", hint: "This site is also available in English.", hintLink: "View in English", dismiss: "Dismiss" },
    theme: { label: "Thème", system: "Auto", light: "Clair", dark: "Sombre", aria: "Changer le thème de couleurs" },
    footer: {
      rights: "CODACON inc. Tous droits réservés.",
      license: 'Contenu du blogue sous licence <a href="https://creativecommons.org/licenses/by/4.0/deed.fr">CC BY 4.0</a>. Code sous licence <a href="/LICENSE">MIT</a>.',
      trademark: "CODACON® est une marque de commerce déposée au Canada (LMC1357521).",
    },
    post: {
      license: 'Ce billet est publié sous licence <a href="https://creativecommons.org/licenses/by/4.0/deed.fr">CC BY 4.0</a>. Vous pouvez le partager et l’adapter à condition d’en citer la source et d’inclure un lien vers',
      original: "l’original",
      cta1Title: "Restez à jour en sécurité de l’IA",
      cta1Body: 'Abonnez-vous au <a href="/feed.xml">fil RSS</a> pour nos prochains billets sur la gouvernance du risque lié à l’IA, le SDLC sécurisé et la réponse aux incidents.',
      cta2Title: "Travaillons ensemble",
      cta2Body: '<a href="https://calendar.app.google/imfdaTW4Y1iF9FqUA">Planifiez un appel</a> pour discuter de votre posture de sécurité, de votre stratégie IA ou de vos besoins en recrutement, ou <a href="mailto:hello@codacon.ai">écrivez-nous</a>.',
    },
    tags: {
      "ai-security": "sécurité de l’IA",
      company: "entreprise",
      "incident-response": "réponse aux incidents",
      sdlc: "SDLC",
      "cloud-security": "sécurité infonuagique",
      "board-advisory": "conseil d’administration",
    },
  },
};
