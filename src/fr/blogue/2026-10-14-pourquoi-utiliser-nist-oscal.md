---
title: "Pourquoi utiliser NIST OSCAL ? La conformité en données, pas en documents"
description: "Ce qu’est NIST OSCAL, pourquoi des contrôles lisibles par machine valent mieux que Word et Excel, et comment l’adopter sans freiner votre programme."
date: 2026-10-14
key: post:why-use-nist-oscal
tags:
  - cloud-security
  - sdlc
---

## En bref

**Ce que c’est.** [OSCAL](https://pages.nist.gov/OSCAL/) (Open Security Controls Assessment Language) est une norme ouverte du NIST. Elle exprime les contrôles de sécurité, les plans de sécurité des systèmes, les évaluations et les plans de correction sous forme de données structurées en XML, JSON ou YAML. Elle est gratuite, à code source ouvert et [développée publiquement sur GitHub](https://github.com/usnistgov/OSCAL). La version la plus récente au moment d’écrire ces lignes est la v1.2.3.

**Pourquoi l’utiliser.** La plupart des travaux de conformité vivent encore dans des documents Word et des chiffriers qui sont périmés le jour même de leur signature. OSCAL transforme cette paperasse en données que des outils peuvent valider, comparer et mettre à jour. Décrivez la mise en œuvre d’un contrôle une seule fois et réutilisez-la d’un cadre à l’autre. Remettez aux évaluateurs des preuves qu’ils peuvent traiter par machine. Passez d’un portrait annuel à une assurance continue.

**Pourquoi maintenant.** L’autorisation infonuagique fédérale américaine s’oriente vers des dossiers lisibles par machine, et OSCAL figure parmi les formats approuvés. Même hors de ce marché, le coût d’une conformité tenue à la main ne cesse d’augmenter, tandis que le nombre de cadres auxquels vous répondez ne fait que croître.

## Le problème que règle OSCAL

Demandez à une équipe de sécurité à combien de cadres elle rend des comptes. SOC 2, ISO 27001, NIST SP 800-53, CIS, la loi 25, les questionnaires clients, et maintenant les cadres propres à l’IA. Chacun a son document, son chiffrier et sa séance de copier-coller nocturne avant l’audit.

Les faits sous-jacents changent à peine de l’un à l’autre. L’authentification multifacteur est appliquée de la même façon, que ce soit ISO ou SOC 2 qui pose la question. Pourtant, la même réponse est réécrite pour chaque cadre, en prose qu’aucun outil ne peut vérifier, par des gens qui préféreraient corriger des choses.

Ce modèle échoue de trois façons :

1. **La dérive.** Le document dit une chose, le système en fait une autre, et personne ne s’en aperçoit avant un évaluateur ou un attaquant.
2. **La duplication.** Chaque nouveau cadre multiplie le travail au lieu de réutiliser ce qui est déjà connu.
3. **L’opacité.** On ne peut pas interroger un PDF de 300 pages. Répondre à « quels contrôles dépendent de ce fournisseur d’identité ? » prend une semaine.

## Ce qu’est réellement OSCAL

Le NIST [décrit OSCAL](https://csrc.nist.gov/projects/open-security-controls-assessment-language) comme un ensemble de formats offrant une représentation normalisée et lisible par machine de l’information sur les contrôles, des catalogues jusqu’aux résultats d’évaluation. Les modèles se répartissent en trois couches :

- **Couche des contrôles.** Les *catalogues* contiennent les définitions des contrôles, comme NIST SP 800-53. Les *profils* sélectionnent et adaptent des contrôles pour former une base de référence, comme le niveau Modéré ou votre propre norme interne.
- **Couche de mise en œuvre.** Les *définitions de composants* décrivent comment un produit ou un service satisfait des contrôles. Un *plan de sécurité du système* (SSP) décrit comment un système précis met en œuvre sa base de référence.
- **Couche d’évaluation.** Les *plans d’évaluation*, les *résultats d’évaluation* et les *plans d’action et jalons* (POA&M) consignent ce qui a été testé, ce qui a été trouvé et ce qui est en voie de correction.

[![Couches d’OSCAL : un profil importe un catalogue ; les définitions de composants font référence à un profil ; un plan de sécurité du système importe un profil et réutilise des définitions de composants ; le plan d’évaluation et le POA&M importent le SSP ; les résultats d’évaluation importent le plan d’évaluation.](/img/diagrams/oscal-layers.fr.svg)](/img/diagrams/oscal-layers.fr.svg)

Chaque couche fait référence à celle qui la précède. Un SSP pointe vers un profil, qui pointe vers un catalogue. Un résultat d’évaluation pointe vers le SSP. Cette chaîne de références est l’essentiel : modifiez un contrôle, et vous pouvez retracer chaque système et chaque constat qu’il touche.

## Pourquoi les organisations devraient l’utiliser

### Écrire une fois, faire correspondre plusieurs fois

Décrivez comment votre plateforme applique le chiffrement des données au repos dans une définition de composant. Faites-y référence depuis chaque système qui utilise la plateforme. Quand un cadre ou un client pose la question, la réponse vient de la même source, pas d’une nouvelle rédaction.

[![Les composants partagés, comme l’identité, la journalisation et le chiffrement, sont décrits une fois, utilisés par chaque plan de sécurité du système et associés à chaque cadre : NIST SP 800-53, ISO 27001 et SOC 2.](/img/diagrams/write-once.fr.svg)](/img/diagrams/write-once.fr.svg)

### Une documentation vérifiable

Le contenu OSCAL se valide contre des schémas publiés. Un contrôle manquant, une référence brisée ou un paramètre laissé vide est détecté par un outil, et non par un évaluateur trois semaines avant votre échéance. La conformité cesse d’être un exercice de rédaction et se rapproche du logiciel : versions, revues et vérifications automatisées.

### L’assurance des fournisseurs à grande échelle

Si vos fournisseurs infonuagiques et SaaS publient des définitions de composants, vous héritez de la description de leurs contrôles sous forme de données au lieu de relire leurs PDF. L’inverse est aussi vrai : si vous vendez à des acheteurs réglementés, un dossier OSCAL propre accélère leur examen de votre organisation.

### L’assurance continue plutôt que le théâtre annuel

Une fois les contrôles, les systèmes et les constats reliés sous forme de données, les preuves issues de vos pipelines et de votre configuration infonuagique peuvent alimenter directement les résultats d’évaluation. L’état de conformité devient une requête, pas un projet. C’est là qu’OSCAL rejoint le reste d’un [cycle de développement logiciel sécurisé](/fr/blogue/questions-conseil-administration-outil-codage-ia/) moderne : la conformité devient un livrable de plus que le pipeline produit et vérifie.

[![Boucle d’assurance continue : un changement est validé par le pipeline, des vérifications automatisées recueillent les preuves, les résultats d’évaluation sont mis à jour, le POA&M suit les constats ouverts, et chaque constat est soit corrigé au prochain changement, soit l’objet d’une exception approuvée, avec responsable et échéance, qui rouvre le constat au POA&M à l’échéance.](/img/diagrams/continuous-assurance.fr.svg)](/img/diagrams/continuous-assurance.fr.svg)

### Les exceptions deviennent des données, elles aussi

Tout programme compte des contrôles qu’il ne peut pas respecter tels quels : un système patrimonial incompatible avec l’authentification multifacteur, un constat d’analyse qui se révèle un faux positif, un risque que l’entreprise choisit d’accepter. Dans la plupart des organisations, ces exceptions vivent dans des fils de courriels et un onglet de chiffrier. Elles ont rarement une date d’échéance, la personne qui les a approuvées est souvent partie, et personne ne les revoit avant qu’un évaluateur pose la question.

OSCAL consigne les exceptions dans le dossier du risque lui-même, pas à côté. Un risque inscrit au POA&M passe par des statuts comme `open`, `remediating`, `deviation-requested`, `deviation-approved` et `closed`. Sa réponse est typée : éviter, atténuer, transférer, partager ou accepter. Des propriétés indiquent qu’un risque est un faux positif, accepté ou ajusté, et un journal du risque consigne chaque changement de statut, qui l’a inscrit et quand. Comme le risque fait référence au constat, au contrôle et au système, une exception ne s’éloigne jamais de ce qu’elle excuse.

Le bénéfice est le même que partout ailleurs dans OSCAL : les questions deviennent des requêtes. Quels risques acceptés arrivent à échéance ce trimestre ? Quels systèmes portent des exceptions sur le même contrôle ? Qui a approuvé cette dérogation, et sur la foi de quelles preuves ? Donnez une échéance à chaque exception, et le pipeline peut la signaler pour révision avant qu’elle devienne permanente sans que personne ne l’ait décidé.

### La direction que prend la réglementation

La [RFC-0024](https://www.fedramp.gov/rfcs/0024/) de FedRAMP propose que les fournisseurs infonuagiques Rev5 soumettent leurs dossiers d’autorisation dans un format lisible par machine approuvé, dont OSCAL, à compter du 30 septembre 2026 pour les nouvelles soumissions. Consultez les règles finales de FedRAMP pour connaître la portée et les dates qui s’appliquent à vous. Même si vous ne vendez pas au gouvernement américain, le signal compte : régulateurs et grands acheteurs sont las de lire des PDF, et l’assurance lisible par machine est la direction que prend l’approvisionnement.

### Aucune dépendance envers un fournisseur

OSCAL est une norme ouverte, avec des outils à code source ouvert offerts par le NIST et la communauté. Vos données de conformité restent portables entre plateformes GRC, consultants et évaluateurs. Cela seul a de la valeur au prochain renouvellement de contrat d’outil.

## Pourquoi l’adoption cale

Si OSCAL est si utile, pourquoi si peu d’organisations l’utilisent-elles ? D’après notre expérience, pour trois raisons :

- **L’écart entre la norme et le système.** Les schémas sont bien documentés. Y transposer votre architecture réelle, vos contrôles hérités et vos responsabilités partagées ne l’est pas.
- **L’héritage documentaire.** Des années de SSP, de chiffriers et de politiques ne se convertissent pas d’eux-mêmes, et une conversion naïve ne produit qu’une version lisible par machine de la même dérive.
- **La responsabilité.** OSCAL se situe entre la sécurité, la conformité, l’ingénierie et l’approvisionnement. Sans responsable clair et sans portée initiale restreinte, il devient un projet parallèle qui ne livre jamais.

Aucun de ces obstacles n’est technique. Ce sont des problèmes de portée, de séquence et de gestion du changement.

## Par où commencer

1. **Choisissez un système et une base de référence.** Pas tout le parc. Un système qui compte, évalué selon le cadre auquel vous répondez le plus souvent.
2. **Modélisez d’abord les composants partagés.** L’identité, la journalisation, le chiffrement et votre plateforme infonuagique portent la majorité des contrôles. Décrivez-les une fois sous forme de définitions de composants.
3. **Bâtissez le SSP à partir de références, pas de prose.** Laissez le plan du système hériter des composants au lieu de les répéter.
4. **Validez dans le pipeline.** Exécutez des vérifications de schéma et de contenu à chaque changement, comme vous testez le code.
5. **Branchez une source de preuves.** Alimentez les résultats d’évaluation avec une vérification de contrôle automatisée, démontrez que la boucle fonctionne, puis élargissez.

## Comment CODACON peut vous aider

La norme est gratuite. La partie difficile, c’est la traduction : transformer vos systèmes réels, vos contrôles hérités et votre documentation existante en un modèle OSCAL que vos équipes maintiendront vraiment, puis l’intégrer à votre façon de bâtir et d’évaluer.

C’est là que nous intervenons. Nous aidons les organisations à cadrer une première mise en œuvre d’OSCAL, à modéliser leurs composants partagés, à convertir ce qui mérite d’être conservé de leur héritage documentaire et à intégrer la validation à leur pipeline de livraison, pour que le modèle reste fidèle après notre départ.

Nous l’avons déjà fait de bout en bout pour une organisation. Le mandat est confidentiel : nous ne pouvons ni nommer le client ni partager ses livrables, mais nous pouvons vous présenter l’approche, les embûches rencontrées et ce qu’il faudrait dans votre environnement. Si vous envisagez OSCAL, ou si vous avez commencé et que le projet a calé, [parlons-en](/fr/services/).
