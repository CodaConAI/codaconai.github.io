---
layout: base.njk
title: "CODACON — Conseil en sécurité de l’IA et ingénierie de produits"
description: "CODACON inc. : accompagnement des conseils d’administration, SDLC sécurisé, réponse aux incidents et coaching exécutif en sécurité de l’IA."
permalink: /fr/
key: home
signalField: full
---

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "CODACON inc.",
  "url": "https://codacon.ai/fr/",
  "logo": "https://codacon.ai/img/logo.svg",
  "image": "https://codacon.ai/img/og-fr.jpg",
  "description": "Firme de conseil en sécurité de l’IA et d’ingénierie de produits : accompagnement des conseils d’administration, SDLC sécurisé, sécurité infonuagique, réponse aux incidents et coaching exécutif.",
  "foundingDate": "2024",
  "founder": {
    "@type": "Person",
    "name": "David Côté"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "hello@codacon.ai",
    "contactType": "sales",
    "availableLanguage": ["fr", "en"]
  }
}
</script>

<section class="hero">
<div class="hero-copy">
<p class="eyebrow">Conseil en sécurité de l’IA</p>
<h1>La sécurité de l’IA, pour les dirigeants qui doivent en répondre.</h1>
<p class="lede">Accompagnement de la direction, SDLC sécurisé et réponse aux incidents, par un praticien qui a fait le travail. Établi au Québec, en français et en anglais.</p>
<p class="actions"><a class="button" href="https://calendar.app.google/imfdaTW4Y1iF9FqUA">Planifier un appel de 30 minutes</a> <a href="/fr/services/">Voir les services</a></p>
</div>
<figure class="portrait">
<img src="/img/david-cote-320.webp" srcset="/img/david-cote-320.webp 320w, /img/david-cote-640.webp 640w" sizes="(min-width: 640px) 168px, 120px" width="640" height="640" alt="David Côté, fondateur de CODACON" decoding="async" fetchpriority="high">
<figcaption>David Côté, fondateur</figcaption>
</figure>
</section>

<ul class="proof">
<li>Plus de 15 ans à concevoir et à bâtir des systèmes</li>
<li>Expérience en environnements réglementés</li>
<li>Région de Montréal, sur place ou à distance, FR / EN</li>
</ul>

## La sécurité de l’IA, de l’architecture jusqu’au conseil d’administration

CODACON travaille à l’intersection de l’IA et de la sécurité. Nous aidons les organisations à détecter les menaces plus tôt, à livrer des logiciels sûrs et à prendre des décisions éclairées sur les risques liés à l’IA, de l’équipe d’ingénierie jusqu’au conseil d’administration.

### Ce que nous faisons

**Accompagnement des conseils d’administration** — Risque lié à l’IA et posture de sécurité pour la direction. Nous traduisons le risque technique en langage d’affaires et aidons les conseils à établir des politiques ancrées dans la réalité, pas dans les présentations des fournisseurs.

**Architectures sécurisées et SDLC propulsé par l’IA** — Nous concevons et bâtissons des systèmes sécurisés pour les clients qui livrent du logiciel. Cela veut dire de la modélisation des menaces, une infrastructure infonuagique sécurisée par défaut sur AWS et un cycle de développement augmenté par l’IA qui attrape les vulnérabilités avant la mise en production.

**Réponse aux incidents** — Détection, triage et réponse assistés par l’IA. Nous intégrons l’outillage IA à votre processus de réponse aux incidents pour que votre équipe repère les menaces plus tôt et les résolve plus vite. Ce n’est pas un SOC géré : nous bâtissons la capacité à l’intérieur de votre organisation.

**Coaching exécutif** — Accompagnement privé des CTO, VP ingénierie et RSSI qui doivent diriger la livraison de logiciels sécurisés à l’ère de l’IA. [Découvrir le programme](/fr/services/coaching-executif/).

**Talents** — Recrutement et évaluation des meilleurs praticiens en sécurité de l’IA. Le marché est mince et bruyant. Nous savons qui est réellement compétent.

### Comment se déroule un mandat

1. **Appel.** Trente minutes. Vous décrivez la situation ; nous vous disons franchement si nous pouvons aider.
2. **Cadrage.** Une proposition écrite avec les résultats attendus, l’échéancier et le prix. Pas de forfaits, pas de mandats récurrents que vous n’avez pas demandés.
3. **Travail.** Nous travaillons au sein de votre équipe, avec vos outils, et nous laissons la capacité en place.
4. **Transfert.** Documentation, séance d’information pour votre direction et vision claire de la suite.

### Pourquoi travailler avec nous

Nous sommes des praticiens, pas une firme de présentations. Notre équipe a livré des systèmes de sécurité en production, dirigé des réponses aux incidents à grande échelle et bâti des outils d’IA qui fonctionnent. Nous sommes directs, nous cadrons serré et nous livrons.

[Parlez-nous](mailto:hello@codacon.ai) de votre posture de sécurité, de votre stratégie IA ou de vos besoins en recrutement.

### Mot du fondateur

J’ai fondé CODACON après plus de quinze ans à concevoir et à bâtir des systèmes, en bonne partie dans des environnements réglementés. J’ai vu des équipes de sécurité se faire dépasser par l’adoption de l’IA dans leur propre entreprise, et des conseils d’administration poser des questions auxquelles personne dans la salle ne pouvait répondre. CODACON existe pour combler cet écart, une organisation à la fois.

Si vous bâtissez avec l’IA en pensant à la sécurité, ou si vous pensez à l’IA en vous inquiétant de la sécurité, nous devrions nous parler.

<p class="signature">David Côté, fondateur</p>

### Sur le blogue

{% for post in collections.postsFr | reverse %}
- [{{ post.data.title }}]({{ post.url }}) — {{ post.data.description }}
{% endfor %}
