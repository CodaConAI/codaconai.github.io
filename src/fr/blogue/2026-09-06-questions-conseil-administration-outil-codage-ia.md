---
title: "Que devrait demander un conseil d’administration avant d’approuver le déploiement d’un outil de codage par IA ?"
description: "Sept questions que les administrateurs devraient poser avant d’approuver un outil de codage par IA : valeur démontrée, accès borné, imputabilité, arrêt."
date: 2026-09-06
key: post:board-questions-ai-coding-tool-rollout
tags:
  - board-advisory
  - ai-security
  - sdlc
---

Les démonstrations des fournisseurs montrent à quelle vitesse l’IA peut écrire du code. Le dossier présenté au conseil devrait montrer ce qui arrive quand ce code est erroné.

Avant d’approuver le déploiement d’un outil de codage par IA, les administrateurs ont besoin de plus qu’une promesse de productivité. Il leur faut des preuves de valeur, des limites claires sur les accès, et une personne imputable pour arrêter le déploiement si ces limites cèdent.

Voici les questions qui transforment une démonstration impressionnante en décision défendable.

## Où commence et où s’arrête le rôle du conseil

Un conseil n’approuve pas chaque outil de développement. Il gouverne l’exposition importante et l’autorité déléguée. Un outil de codage par IA franchit cette ligne dès qu’il peut lire le code source, détenir des secrets ou modifier des systèmes de production. La direction est responsable de la mise en œuvre. Le conseil est responsable des conditions pour aller de l’avant.

Nous formulons ces questions à partir du [cadre de gestion des risques liés à l’IA du NIST, AI RMF 1.0](https://www.nist.gov/itl/ai-risk-management-framework) (Govern, Map, Measure, Manage), de son [profil sur l’IA générative, NIST AI 600-1](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf), pour les risques propres à l’IA, et du [cadre de développement logiciel sécurisé, SP 800-218](https://csrc.nist.gov/pubs/sp/800/218/final), pour l’assurance logicielle. Le NIST décrit l’AI RMF comme volontaire. Ces questions sont notre application de cette orientation, et non une liste de contrôle du NIST, une certification ou une exigence légale.

## 1. Quel résultat d’affaires achetons-nous, et comment le prouverons-nous ?

**Pourquoi c’est important.** Le volume de code n’est pas un résultat d’affaires. Du code produit plus vite peut aussi signifier plus de revue, plus de défauts et plus de reprise. L’[étude randomisée de METR publiée en juillet 2025](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) a montré que 16 développeurs expérimentés en logiciel libre ont pris 19 % plus de temps sur 246 tâches lorsqu’ils pouvaient utiliser les outils d’IA du début de 2025, tout en croyant avoir été plus rapides. METR met en garde contre toute généralisation à d’autres équipes ou aux outils actuels, mais la leçon tient : la vitesse perçue n’est pas la vitesse mesurée.

**Preuves à demander.** Une mesure de référence prise avant le projet pilote et répétée après : délai de livraison, taux de défauts, temps de revue par changement, reprise et coût total. L’AI RMF demande aux organisations de documenter les bénéfices et les coûts attendus, y compris non monétaires ([MAP 3.1 et 3.2](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/)).

**Signal d’alerte.** Le dossier d’affaires repose sur le chiffre de productivité du fournisseur ou sur le « taux d’acceptation », soit la part des suggestions que les développeurs ont conservées.

## 2. Que peut lire, retenir, transmettre et modifier l’outil ?

**Pourquoi c’est important.** L’exposition dépend des permissions, pas du nom du produit. Suggérer du code dans un éditeur est une chose. Un agent qui exécute des commandes, modifie des dépôts et déclenche des déploiements en est une autre. Le NIST AI 600-1 (section 2.9) décrit l’injection indirecte d’instructions (prompt injection) : des consignes cachées dans du contenu que l’IA lit, comme un commentaire de code ou une page Web, qui peuvent l’amener à divulguer des données ou à exécuter du code malveillant. L’autonomie multiplie ce risque.

**Preuves à demander.** Une carte des données : quels codes sources, secrets et données clients l’outil peut lire, ce que le fournisseur conserve et pour combien de temps, si les entrées servent à entraîner des modèles, et quels sous-traitants ultérieurs interviennent. Une carte des permissions : ce que l’outil peut exécuter, valider dans un dépôt et déployer, et si un humain approuve chaque étape. Suggérer, exécuter et déployer devraient chacun avoir leurs propres conditions d’approbation.

**Signal d’alerte.** « Le fournisseur n’entraîne pas ses modèles avec nos données », sans confirmation que cette affirmation s’applique au palier et à la configuration réellement achetés.

## 3. Quelles preuves montrent que nos contrôles fonctionnent avec du code généré par l’IA ?

**Pourquoi c’est important.** Le SSDF décrit des pratiques pour réduire les vulnérabilités dans le logiciel livré, limiter leur impact et prévenir leur récurrence. Notre position : le code généré par l’IA doit passer par le même processus d’assurance que tout autre code. Le risque, c’est que le volume le submerge. Le NIST AI 600-1 nomme le biais d’automatisation, cette tendance à se fier à ce que produit la machine, comme un risque à part entière (section 2.7).

**Preuves à demander.** Des résultats de projet pilote tirés des dépôts et des flux de travail de l’entreprise, pas d’un bac à sable du fournisseur (MEASURE 2.3). La confirmation que la revue humaine, les tests de sécurité, les vérifications de dépendances et de licences, et la protection de la chaîne de compilation s’appliquent aux changements générés par l’IA. La capacité de revue : changements par réviseur par semaine, avant et après.

**Signal d’alerte.** Les délais d’approbation baissent pendant que le volume de changements monte. C’est de l’approbation automatique, pas de l’efficacité.

## 4. Qui est imputable quand quelque chose tourne mal ?

**Pourquoi c’est important.** L’AI RMF confie la responsabilité des décisions sur les risques liés à l’IA à la haute direction (GOVERN 2.3). Un déploiement dont « l’ingénierie » est propriétaire n’a personne à appeler quand l’outil pousse un identifiant dans un dépôt public.

**Preuves à demander.** Un dirigeant nommé comme commanditaire, avec une acceptation documentée du risque résiduel. Une matrice de responsabilités couvrant l’ingénierie, la sécurité, les affaires juridiques et l’approvisionnement. Un processus d’exception : qui peut accorder des accès élargis, et qui en est informé.

**Signal d’alerte.** L’imputabilité est partagée, ou repose sur le champion qui a choisi l’outil.

## 5. Quels risques contractuels et liés au fournisseur acceptons-nous ?

**Pourquoi c’est important.** L’outil est une dépendance de la chaîne d’approvisionnement. L’AI RMF demande des politiques sur les risques liés aux tiers, y compris la propriété intellectuelle, et des plans de contingence en cas de défaillance d’un tiers (GOVERN 6.1 et 6.2). Le NIST AI 600-1 note que le statut juridique du contenu généré qui ressemble à une œuvre protégée fait encore débat (section 2.10). Les clauses contractuelles sont la réponse pratique, et elles varient selon le palier.

**Preuves à demander.** Une évaluation du fournisseur couvrant la confidentialité, les protections de propriété intellectuelle et leurs limites, les délais de notification d’incident, le droit du fournisseur de changer de modèle ou de conditions, et les modalités de sortie, y compris la suppression des données. Un plan de continuité si le service est retiré. Le [SP 800-218A](https://csrc.nist.gov/pubs/sp/800/218/a/final), le profil du NIST pour la construction de modèles d’IA, s’applique à la diligence envers le fournisseur, pas aux développeurs de l’entreprise.

**Signal d’alerte.** Les affaires juridiques ont revu les conditions standard, mais personne n’a confirmé lesquelles s’appliquent à la configuration achetée.

## 6. Quels sont les critères de succès et les conditions d’arrêt du projet pilote ?

**Pourquoi c’est important.** L’AI RMF attend des mécanismes et des responsabilités assignées pour désengager ou désactiver un système dont le comportement s’écarte de l’usage prévu (MANAGE 2.4). Un projet pilote sans conditions d’arrêt est un déploiement avec des étapes en plus.

**Preuves à demander.** Un accès par phases, en commençant par des dépôts à faible risque et des environnements hors production. Des seuils d’acceptation fixés d’avance. Des déclencheurs d’incident qui suspendent le projet pilote : une exposition d’identifiant, un changement vulnérable qui atteint la production, une atteinte au traitement des données. Une révocation testée : quelqu’un a coupé l’accès et chronométré l’opération.

**Signal d’alerte.** Les critères de succès sont rédigés après le projet pilote, ou les objectifs de la personne qui détient l’autorité d’arrêt dépendent du déploiement.

## 7. Que verra le conseil après l’approbation ?

**Pourquoi c’est important.** L’approbation ouvre la surveillance. L’AI RMF demande un suivi après déploiement, une réponse aux incidents et une gestion des changements (MANAGE 4.1).

**Preuves à demander.** Un tableau de bord trimestriel d’une page : résultats par rapport à la référence, adoption par équipe, tendances des défauts et de la reprise, incidents de sécurité impliquant l’outil, exceptions de contrôle accordées, et changements d’exposition comme de nouvelles permissions, de nouvelles versions de modèle ou de nouveaux dépôts visés.

**Signal d’alerte.** Le premier rapport ne couvre que l’adoption et la satisfaction.

## Exemple hypothétique : les preuves changent la décision

*Scénario illustratif, et non un cas client.* Le chef de la technologie d’un manufacturier propose de déployer un agent de codage à l’échelle de l’entreprise, en citant une promesse du fournisseur de livrer 40 % plus vite. Le comité d’audit demande les preuves des questions 1 et 3. Un projet pilote de six semaines sur deux services internes montre un délai de livraison réduit de 11 %, un temps de revue par changement en hausse de 30 %, et deux dépendances vulnérables détectées seulement après la fusion. Le comité approuve le mode suggestion seulement pour toute l’ingénierie, garde les permissions d’exécution aux équipes pilotes pour un trimestre de plus, et exige la capacité de revue et la couverture des analyses dans le prochain rapport. Même outil, décision différente.

## Liste de contrôle pour l’approbation

- Mesures de référence et post-pilote des résultats et des coûts
- Carte des données et carte des permissions, avec des conditions distinctes pour suggérer, exécuter et déployer
- Preuves que la revue, les tests de sécurité et les contrôles de la chaîne couvrent le code généré par l’IA
- Dirigeant responsable nommé, matrice de responsabilités et processus d’exception
- Évaluation du fournisseur, clauses confirmées pour le palier acheté, plan de continuité
- Critères de succès écrits, déclencheurs d’incident et révocation testée
- Format du tableau de bord trimestriel convenu

## Trois décisions

**Approuver un projet pilote borné** quand le dossier de valeur est crédible mais non prouvé, et que le projet pilote reste dans des environnements à faible risque avec des conditions d’arrêt.

**Approuver l’expansion sous conditions** quand les preuves du projet pilote atteignent les seuils et que les écarts restants sont nommés, attribués et datés.

**Reporter en attendant des preuves** quand la direction ne peut pas encore répondre aux questions 1, 2 ou 6. Ce n’est pas un refus. C’est de la surveillance.

Pour un regard indépendant sur l’état de préparation d’un déploiement, notre [évaluation de la sécurité de l’IA générative](/fr/services/evaluation-securite-ia-generative/) couvre ce terrain.
