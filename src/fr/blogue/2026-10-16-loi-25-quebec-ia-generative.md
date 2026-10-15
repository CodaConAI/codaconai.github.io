---
title: "Loi 25 et IA générative : ce qu’il faut régler avant la production"
description: "La Loi 25 s’applique à tout système d’IA qui traite des renseignements personnels. Sept obligations à régler avant la mise en production."
date: 2026-10-16
key: post:quebec-law-25-generative-ai
tags:
  - ai-security
  - board-advisory
  - incident-response
---

La Loi 25 n’a pas été rédigée en pensant aux grands modèles de langage. Elle s’y applique quand même.

Tout projet d’IA générative qui lit le courriel d’un client, résume un dossier ou répond à des questions à partir d’une base de connaissances RH traite des renseignements personnels. Au Québec, cela entraîne des obligations précises et un régime de sanctions bien réel. La plupart se jouent à la conception, pas après le lancement.

Voici où la Loi 25 et l’IA générative se rencontrent, ce que chaque obligation exige d’un système d’IA, et comment nous aidons les organisations québécoises à bien faire les choses.

## Ce qu’est la Loi 25

La Loi 25 est le nom usuel de la *Loi modernisant des dispositions législatives en matière de protection des renseignements personnels* (L.Q. 2021, c. 25). Elle a modifié la [loi sur la protection des renseignements personnels dans le secteur privé](https://www.legisquebec.gouv.qc.ca/fr/document/lc/P-39.1) ainsi que son équivalent pour le secteur public. Elle est entrée en vigueur en trois étapes, en septembre 2022, 2023 et 2024. Tout ce qui suit s’applique aujourd’hui.

L’organisme de surveillance est la [Commission d’accès à l’information](https://www.cai.gouv.qc.ca/) (CAI). Les sanctions administratives pécuniaires atteignent 10 millions de dollars ou 2 % du chiffre d’affaires mondial, selon le montant le plus élevé. Les amendes pénales atteignent 25 millions de dollars ou 4 %. Les personnes concernées peuvent aussi poursuivre, et des dommages-intérêts punitifs sont possibles en cas d’atteinte intentionnelle ou de faute lourde.

Les articles cités ci-dessous renvoient à la loi sur le secteur privé. Nous sommes des praticiens de la sécurité, pas des avocats. Ce billet explique comment les obligations se traduisent en architecture et en contrôles d’IA ; vos conseillers juridiques décident de la façon dont elles s’appliquent à vous.

## 1. Une évaluation des facteurs relatifs à la vie privée avant de construire

**Ce que dit la loi.** Tout projet d’acquisition, de développement ou de refonte d’un système d’information ou de prestation électronique de services qui implique des renseignements personnels exige une évaluation des facteurs relatifs à la vie privée, ou EFVP (article 3.3). La personne responsable de la protection des renseignements personnels doit être consultée dès le début du projet.

**Ce que cela signifie pour l’IA.** Un assistant RAG, un copilote branché sur votre CRM ou un agent qui accède à une boîte de courriel est exactement ce type de projet. L’évaluation doit couvrir ce que le modèle peut lire, pas seulement ce que les utilisateurs saisissent. Un index de recherche construit sur un lecteur partagé hérite de chaque renseignement personnel qui s’y trouve.

**Signal d’alerte.** L’EFVP est rédigée après le projet pilote, décrit la page produit du fournisseur et ne mentionne jamais les plongements (embeddings), les journaux ou l’accès aux outils.

## 2. Communiquer des renseignements personnels hors du Québec

**Ce que dit la loi.** Avant de communiquer des renseignements personnels à l’extérieur du Québec, une organisation doit évaluer s’ils bénéficieront d’une protection adéquate, en tenant compte de leur sensibilité, des finalités, des mesures de protection, y compris contractuelles, et du régime juridique de l’État de destination (article 17). La communication doit faire l’objet d’une entente écrite qui tient compte de cette évaluation.

**Ce que cela signifie pour l’IA.** La plupart des API de modèles hébergés traitent les requêtes hors du Québec, souvent hors du Canada. Chaque requête qui contient un renseignement personnel est une communication hors du Québec. Il en va de même d’une base de données vectorielle infonuagique dans une autre région, d’un service de journalisation géré ou d’un outil d’évaluation qui conserve des échantillons de conversations.

**Signal d’alerte.** Personne ne peut dire dans quelle région l’inférence est exécutée, ni si l’option de « résidence des données » couvre les requêtes, les réponses, les journaux et la surveillance des abus, ou seulement les données au repos.

## 3. Les décisions fondées sur un traitement automatisé

**Ce que dit la loi.** Une organisation qui rend une décision fondée exclusivement sur un traitement automatisé de renseignements personnels doit en informer la personne au plus tard au moment où elle l’informe de la décision (article 12.1). Sur demande, elle doit lui indiquer les renseignements utilisés, les raisons et les principaux facteurs ayant mené à la décision, ainsi que son droit de faire rectifier ces renseignements. La personne doit pouvoir présenter ses observations à un membre du personnel en mesure de réviser la décision.

**Ce que cela signifie pour l’IA.** Filtrer des candidatures, trier des réclamations d’assurance, coter un crédit ou signaler des comptes à fermer avec un modèle en font partie lorsqu’aucun humain n’examine réellement le résultat. Les « principaux facteurs » sont difficiles à reconstituer après coup à partir d’un LLM. Il faut les prévoir dès la conception : entrées journalisées, sources récupérées et un dossier de décision qu’un réviseur peut lire.

**Signal d’alerte.** L’humain dans la boucle approuve 99 % des recommandations du modèle en moins de dix secondes. C’est un traitement automatisé avec une signature.

## 4. Le profilage et la confidentialité par défaut

**Ce que dit la loi.** Une organisation qui recueille des renseignements au moyen d’une technologie comprenant des fonctions permettant d’identifier, de localiser ou d’effectuer un profilage doit en informer la personne au préalable et lui indiquer comment activer ces fonctions (article 8.1). Les produits et services technologiques offerts au public doivent assurer par défaut le plus haut niveau de confidentialité (article 9.1).

**Ce que cela signifie pour l’IA.** La personnalisation, l’analyse de sentiment et l’inférence comportementale intégrées à un assistant destiné à la clientèle constituent du profilage. La mémoire de conversation d’une session à l’autre est un paramètre de confidentialité. Les valeurs par défaut comptent : la fonction est livrée désactivée, et c’est l’utilisateur qui l’active.

**Signal d’alerte.** L’équipe produit présente la mémoire à long terme comme une « fonction qui fait plaisir », et personne n’a demandé si elle est activée par défaut.

## 5. L’utilisation secondaire et l’affinage

**Ce que dit la loi.** Un renseignement personnel ne peut être utilisé qu’aux fins pour lesquelles il a été recueilli, à moins que la personne n’y consente ou qu’une exception précise ne s’applique (article 12). Un renseignement sensible exige un consentement exprès.

**Ce que cela signifie pour l’IA.** Utiliser des transcriptions du service à la clientèle pour affiner un modèle, ou charger des dossiers clients dans un assistant de connaissances généraliste, constitue une nouvelle utilisation. Certaines exceptions peuvent s’appliquer, par exemple lorsque les renseignements sont dépersonnalisés et utilisés à des fins d’étude, de recherche ou de statistique internes. Cette analyse se fait avant l’entraînement, pas après.

**Signal d’alerte.** Le jeu de données d’entraînement a été constitué par un ingénieur qui avait un accès en lecture à la production et une échéance.

## 6. Les incidents de confidentialité

**Ce que dit la loi.** Lorsqu’une organisation a des motifs de croire qu’un incident de confidentialité s’est produit, elle doit prendre des mesures raisonnables pour diminuer les risques de préjudice. Si l’incident présente un risque de préjudice sérieux, elle doit aviser avec diligence la CAI et les personnes concernées (articles 3.5 à 3.8). Chaque incident est inscrit dans un registre, qu’il soit déclaré ou non.

**Ce que cela signifie pour l’IA.** L’IA générative crée de nouveaux chemins d’incident. Une injection d’instructions (prompt injection) qui amène un assistant à révéler le dossier d’un autre client est un incident de confidentialité. Il en va de même d’un système de récupération qui renvoie des documents que l’utilisateur n’a jamais été autorisé à voir, ou d’une clé d’API divulguée qui expose les journaux de conversation. Votre plan de réponse aux incidents doit les reconnaître, et vos journaux doivent montrer ce que le modèle a réellement renvoyé.

**Signal d’alerte.** Le système d’IA est exclu du plan de réponse aux incidents, ou ses journaux consignent la requête, mais pas les documents récupérés ni la réponse.

## 7. La conservation et la destruction

**Ce que dit la loi.** Lorsque les fins sont accomplies, les renseignements personnels doivent être détruits ou anonymisés (article 23), et les politiques de gouvernance de l’organisation doivent encadrer leur conservation et leur destruction (article 3.2).

**Ce que cela signifie pour l’IA.** Les renseignements personnels persistent à plus d’endroits dans une pile d’IA que dans une application classique : journaux de requêtes, dépôts de surveillance des abus du fournisseur, plongements, caches, jeux d’évaluation et poids de modèles affinés. On ne peut pas détruire ce qu’on n’a pas inventorié, et on ne retire pas facilement une personne d’un modèle affiné.

**Signal d’alerte.** Une demande de suppression est traitée dans le CRM, alors que les courriels du même client demeurent dans l’index vectoriel.

## L’imputabilité loge au sommet

Par défaut, la Loi 25 fait de la personne ayant la plus haute autorité au sein de l’organisation, généralement le PDG, la personne responsable de la protection des renseignements personnels (article 3.1). Cette fonction peut être déléguée par écrit, mais l’imputabilité ne disparaît pas. Le titre et les coordonnées de cette personne doivent être publiés sur le site Web de l’organisation.

C’est pourquoi la Loi 25 est un sujet de conseil d’administration, pas seulement de conformité. Les administrateurs devraient pouvoir voir quels systèmes d’IA traitent des renseignements personnels, lesquels ont une EFVP complétée et quels incidents ont été consignés. Notre billet sur les [questions qu’un conseil devrait poser avant d’approuver un outil de codage par IA](/fr/blogue/questions-conseil-administration-outil-codage-ia/) applique la même discipline à une autre décision.

## Exemple hypothétique : un assistant, quatre obligations

*Scénario illustratif, et non un cas client.* Un assureur montréalais lance un assistant de réclamations qui rédige des réponses aux assurés à l’aide d’un modèle hébergé. Le projet pilote fonctionne. Avant la mise en production, une revue relève quatre lacunes. L’inférence s’exécute dans une région américaine sans évaluation au titre de l’article 17 au dossier. L’assistant recommande des refus de réclamation que les experts en sinistre approuvent presque sans modification, ce qui exige les avis de l’article 12.1. Le fournisseur conserve par défaut les journaux de conversation indéfiniment. Et l’index de récupération contient des notes médicales de réclamations fermées auxquelles des experts affectés à d’autres dossiers peuvent accéder. Aucune de ces quatre lacunes n’exige un nouveau modèle. Toutes les quatre auraient coûté moins cher à corriger dès la conception.

## Comment nous aidons

Nous travaillons aux côtés de votre responsable de la protection des renseignements personnels et de vos conseillers juridiques. Ils interprètent la loi ; nous nous assurons que le système fait ce que l’EFVP dit qu’il fait.

- **[Évaluation de la sécurité de l’IA générative](/fr/services/evaluation-securite-ia-generative/).** Une revue de quatre semaines, à portée fixe, de votre architecture d’IA, de vos flux de données, de votre modèle d’identité et de vos fournisseurs. Les constats sont mis en correspondance avec la Loi 25 ainsi qu’avec les références du NIST, de l’ISO et de l’OWASP, chacun avec un responsable et une mesure corrective. Elle produit la preuve technique dont une EFVP au titre de l’article 3.3 et une évaluation au titre de l’article 17 ont besoin.
- **Architecture sécurisée et SDLC propulsé par l’IA.** Une modélisation des menaces dès la conception, pour que la résidence des données, la conservation, le contrôle d’accès à la récupération et la journalisation des décisions soient intégrés plutôt qu’ajoutés après coup. Voir [nos services](/fr/services/).
- **Réponse aux incidents.** Des guides d’intervention et des exercices sur table pour les incidents propres à l’IA, comme l’injection d’instructions, la fuite par récupération et les clés exposées, avec un chemin clair vers l’évaluation du « risque de préjudice sérieux » et l’avis à la CAI.
- **Conseil d’administration.** Des séances d’information pour les PDG et les administrateurs qui portent l’imputabilité de la Loi 25, et un format de reddition de comptes qui présente l’exposition de l’IA en matière de vie privée sur une seule page.

## Liste de contrôle avant la production

- EFVP complétée pour le système d’IA, couvrant les sources de récupération, les journaux et l’accès aux outils
- Évaluation au titre de l’article 17 et entente écrite pour chaque fournisseur qui traite des renseignements personnels hors du Québec
- Décisions automatisées repérées, avec avis, explications et voie de révision humaine
- Fonctions de profilage documentées, divulguées et désactivées par défaut
- Fondement juridique confirmé pour toute utilisation secondaire, y compris l’affinage
- Incidents liés à l’IA inclus dans le plan de réponse aux incidents et dans le registre des incidents
- Inventaire de conservation couvrant les requêtes, les plongements, les caches, les jeux d’évaluation et les dépôts des fournisseurs
