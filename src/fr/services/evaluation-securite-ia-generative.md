---
layout: base.njk
title: "Évaluation de préparation à la sécurité de l’IA générative — CODACON"
description: "Évaluation à portée fixe de la sécurité, de la vie privée et de la souveraineté de votre pile d’IA générative, conçue pour les organisations canadiennes réglementées."
permalink: /fr/services/evaluation-securite-ia-generative/
key: genai-readiness
---

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Évaluation de préparation à la sécurité de l’IA générative",
  "serviceType": "Évaluation de sécurité de l’IA générative",
  "description": "Évaluation de la sécurité, de la gouvernance, de la vie privée, de l’identité et de la souveraineté numérique des systèmes d’IA générative pour les organisations canadiennes réglementées.",
  "url": "https://codacon.ai/fr/services/evaluation-securite-ia-generative/",
  "inLanguage": "fr",
  "areaServed": {
    "@type": "Country",
    "name": "Canada"
  },
  "audience": {
    "@type": "Audience",
    "audienceType": "Organisations canadiennes réglementées qui adoptent l’IA générative"
  },
  "provider": {
    "@type": "Organization",
    "name": "CODACON inc.",
    "url": "https://codacon.ai/fr/",
    "email": "hello@codacon.ai"
  }
}
</script>

# Évaluation de préparation à la sécurité de l’IA générative

Pour les organisations canadiennes réglementées qui adoptent l’IA générative.

La plupart des programmes d’IA générative échouent leur première revue de sécurité non pas parce que le modèle est dangereux, mais parce que personne n’a cartographié ce que le système peut atteindre, au nom de qui il agit et où les données aboutissent. Cette évaluation le découvre avant la production.

## Résultat

Identifier et prioriser les risques de sécurité, de gouvernance, de vie privée, d’identité et de souveraineté avant que l’IA n’atteigne la production, chaque constat étant rattaché à un responsable, à une sévérité et à une mesure corrective concrète.

Vous repartez avec un registre de risques classé, une vue d’architecture de votre surface d’IA réelle (pas celle de la présentation) et un plan de remédiation séquencé pour que les éléments bloquants soient réglés avant votre date de mise en service.

## À qui s’adresse cette évaluation

- Institutions financières et assureurs soumis aux attentes du BSIF en matière de technologie, de cybersécurité et de risque de modèle
- Organisations des secteurs de la santé, de l’éducation et du secteur public qui traitent des renseignements personnels ou de niveau Protégé B
- Organisations québécoises assujetties à la Loi 25, y compris la divulgation des décisions automatisées et les évaluations des facteurs relatifs à la vie privée
- Toute organisation qui fait passer un projet pilote d’IA générative, un système RAG ou un agent de la preuve de concept à un environnement de production réglementé

## Ce que nous évaluons

### Architecture d’IA

Nous cartographions le système réel : modèles, orchestration, surfaces d’outils, flux de données, frontières de confiance et chaque chemin entre une entrée non fiable et une action privilégiée.

- Revue de bout en bout de l’architecture et des frontières de confiance
- Découverte de l’IA fantôme : modèles, extensions et clés d’API non autorisés en usage
- Modes de défaillance lorsqu’un modèle, un fournisseur ou un appel d’outil se comporte mal

### Exposition des données

Où vont vos données, qui peut les voir et ce qu’un fournisseur conserve.

- Classification des données d’entraînement, de réglage fin et d’inférence
- Conservation, journalisation et partage avec des tiers des requêtes et des réponses
- Secrets, renseignements personnels et données réglementées qui atteignent les requêtes, les plongements ou les caches

### Identité et permissions des agents

Les agents agissent avec des identifiants. La plupart en ont beaucoup trop.

- Modèle d’identité pour les principaux humains, de service et agents
- Revue du moindre privilège des portées, jetons et pouvoirs délégués des agents
- Chemins d’escalade de privilèges et de « député confus » par les appels d’outils
- Contrôles avec intervention humaine sur les actions irréversibles ou à forte valeur

### Injection de requêtes et abus d’outils

L’injection directe et indirecte n’a rien de théorique dès qu’un modèle peut appeler des outils.

- Tests d’injection sur les entrées utilisateur, les documents récupérés et les sorties d’outils
- Garde-fous d’invocation d’outils, listes d’autorisation et validation des arguments
- Traitement des sorties : rendu, exécution de code et confiance en aval
- Chemins d’exfiltration de données par le Markdown, les liens et les URL de rappel

### Sécurité du RAG

La récupération est un problème d’autorisation déguisé en interface de recherche.

- Contrôle d’accès par document appliqué au moment de la requête, pas à l’indexation
- Isolation des locataires et des rôles dans les bases vectorielles et les plongements
- Empoisonnement de l’index et contenu non fiable dans le corpus
- Inversion des plongements et fuite de métadonnées

### Sécurité du MCP

Les serveurs Model Context Protocol sont une nouvelle infrastructure privilégiée.

- Inventaire des serveurs, provenance et revue de la chaîne d’approvisionnement
- Transport, authentification et gestion des jetons entre client et serveur
- Empoisonnement des descriptions d’outils et des schémas
- Rayon d’impact d’un serveur MCP compromis ou malveillant

### Risque lié aux modèles et aux fournisseurs

- Posture de sécurité du fournisseur, engagements contractuels et sous-traitants
- Résidence des données, conservation et conditions d’utilisation pour l’entraînement
- Gestion des versions, retrait et gestion du changement des modèles
- Risque de repli et de concentration lorsqu’un fournisseur se dégrade ou se retire

### Souveraineté numérique

Pour les organisations canadiennes, c’est une question de conseil d’administration, pas une note de bas de page d’approvisionnement.

- Résidence des données et transferts transfrontaliers, y compris l’exposition à l’accès légal étranger
- Options d’hébergement canadien et souverain, avec les compromis énoncés clairement
- Contrôles contractuels et techniques qui résistent à un différend de juridiction
- Voies de sortie et de portabilité hors d’un fournisseur sous contrôle étranger

### Journalisation et surveillance

- Couverture d’audit des requêtes, des réponses, de la récupération et des appels d’outils
- Détection des tentatives d’injection, des abus et des comportements anormaux des agents
- Intégrité et conservation des journaux, et contraintes de vie privée sur ce que vous pouvez stocker
- Preuves suffisantes pour reconstituer une décision prise par l’IA après coup

### Réponse aux incidents d’IA

- Scénarios propres à l’IA dans votre plan de réponse : injection, fuite, compromission de modèle, mésusage d’agent
- Interrupteurs d’urgence, retour en arrière et révocation des identifiants des agents
- Escalade, avis réglementaires et déclencheurs de divulgation
- Exercice sur table contre un scénario réaliste dans votre environnement

### Gouvernance et garde-fous

- Utilisation acceptable, points d’approbation et parcours du pilote à la production
- Inventaire des modèles et des cas d’usage avec cotes de risque et responsables attitrés
- Emplacement des garde-fous : où l’application se fait réellement, par rapport à ce que la politique prétend
- Rôles, imputabilité et reddition de comptes aux comités de risque existants

## Déroulement du mandat

Quatre semaines, portée fixe, aucune découverte à durée indéterminée.

1. **Cadrage (semaine 1).** Systèmes visés, exigences réglementaires, parties prenantes, demandes de preuves.
2. **Découverte (semaines 1 à 2).** Présentations de l’architecture, revue de la configuration et du code, entrevues avec les équipes qui l’ont bâtie.
3. **Validation technique (semaines 2 à 3).** Tests pratiques de l’injection, de l’autorisation de récupération, des permissions des agents et des surfaces MCP dans votre environnement.
4. **Analyse et priorisation (semaine 3).** Constats cotés selon l’exploitabilité et l’impact réglementaire, puis séquencés selon votre plan de livraison.
5. **Restitution (semaine 4).** Séance de travail technique avec l’équipe de développement, plus une séance d’information exécutive adaptée à un comité de risque ou à un conseil d’administration.

## Ce que vous obtenez

- Registre de risques classé avec sévérité, exploitabilité, responsable et mesure corrective pour chaque constat
- Diagrammes d’architecture et de flux de données de la surface d’IA telle qu’elle existe réellement
- Feuille de route de remédiation répartie entre bloquants de mise en service, travaux à 90 jours et changements structurels
- Correspondance des contrôles avec les cadres que vos auditeurs et régulateurs utilisent
- Sommaire exécutif rédigé pour un public de gestion du risque non technique
- Restitution enregistrée et appel de suivi à 30 jours pour vérifier l’avancement de la remédiation

## Ce que ce n’est pas

Nous ne vendons pas de tableau de bord. Il n’y a ni niveau de maturité, ni cadran à codes de couleur, ni licence d’outil à la fin. Nous ne conditionnons pas non plus la remédiation à un second mandat : le rapport est rédigé pour que votre propre équipe puisse l’exécuter.

## Cadres de référence

Les constats sont mis en correspondance avec les références que vos auditeurs acceptent déjà : le cadre de gestion des risques liés à l’IA du NIST, les normes ISO/IEC 42001 et 27001, le Top 10 de l’OWASP pour les applications LLM, MITRE ATLAS, les orientations du CCC et les contrôles ITSG-33, les lignes directrices du BSIF sur la technologie, la cybersécurité et le risque de modèle, la LPRPDE et la Loi 25 du Québec. La législation fédérale sur l’IA demeure incertaine ; nous évaluons donc selon des attentes de contrôle durables plutôt que selon un projet de loi qui pourrait ne pas être adopté sous sa forme actuelle.

<div class="cta">
  <h2>Cadrer une évaluation</h2>
  <p><a href="https://calendar.app.google/imfdaTW4Y1iF9FqUA">Planifiez un appel de 30 minutes</a> pour passer en revue votre pile d’IA et confirmer la portée, ou <a href="mailto:hello@codacon.ai?subject=%C3%89valuation%20de%20s%C3%A9curit%C3%A9%20de%20l%E2%80%99IA%20g%C3%A9n%C3%A9rative">écrivez-nous</a>. Voir aussi : <a href="/fr/services/">l’ensemble de nos services</a>.</p>
</div>
