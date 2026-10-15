---
title: "Loi 25 et IA générative : ce qu’il faut régler avant la production"
description: "La Loi 25 s’applique à tout système d’IA qui traite des renseignements personnels. Sept obligations, et les décisions de la CAI qui les appliquent."
date: 2026-10-19
key: post:quebec-law-25-generative-ai
tags:
  - ai-security
  - board-advisory
  - incident-response
---

La Loi 25 n’a pas été rédigée en pensant aux grands modèles de langage. Elle s’y applique quand même, et l’organisme de surveillance l’a déjà écrit noir sur blanc.

Tout projet d’IA générative qui lit le courriel d’un client, résume un dossier ou répond à des questions à partir d’une base de connaissances RH traite des renseignements personnels. Au Québec, cela entraîne des obligations précises et un régime de sanctions bien réel. La plupart se jouent à la conception, pas après le lancement.

Voici où la Loi 25 et l’IA générative se rencontrent, ce que chaque obligation exige d’un système d’IA, ce que la Commission d’accès à l’information a réellement décidé, et comment nous aidons les organisations québécoises à bien faire les choses.

## Ce qu’est la Loi 25

La Loi 25 est le nom usuel de la *Loi modernisant des dispositions législatives en matière de protection des renseignements personnels* (L.Q. 2021, c. 25). Elle a modifié la [loi sur la protection des renseignements personnels dans le secteur privé](https://www.legisquebec.gouv.qc.ca/fr/document/lc/P-39.1) ainsi que son équivalent pour le secteur public. Elle est entrée en vigueur par étapes, principalement entre septembre 2022 et septembre 2024. Tout ce qui suit s’applique aujourd’hui.

L’organisme de surveillance est la [Commission d’accès à l’information](https://www.cai.gouv.qc.ca/) (CAI). Les sanctions administratives pécuniaires atteignent 10 millions de dollars ou 2 % du chiffre d’affaires mondial, selon le montant le plus élevé (article 90.12). Les amendes pénales atteignent 25 millions de dollars ou 4 %, et doublent en cas de récidive (articles 91 et 92.1). Les personnes concernées peuvent aussi poursuivre : lorsqu’une atteinte illicite est intentionnelle ou résulte d’une faute lourde, le tribunal accorde des dommages-intérêts punitifs d’au moins 1 000 $ (article 93.1).

Les articles cités ci-dessous renvoient à la loi sur le secteur privé. Nous sommes des praticiens de la sécurité, pas des avocats. Ce billet explique comment les obligations se traduisent en architecture et en contrôles d’IA ; vos conseillers juridiques décident de la façon dont elles s’appliquent à vous.

## Ce que montre le dossier jusqu’ici

Nous avons passé en revue les décisions publiées de la CAI, ses rapports annuels et quinquennal, et les enquêtes conjointes qu’elle mène avec le Commissariat à la protection de la vie privée du Canada. En date d’octobre 2026 :

- **Aucune sanction administrative pécuniaire publiée.** La CAI détient ce pouvoir depuis septembre 2023. Sa page de décisions et ses rapports annuels font état d’ordonnances, pas d’amendes. Méfiez-vous des billets qui énumèrent de « vraies » amendes au titre de la Loi 25 : celles que nous avons retracées étaient des exemples composites.
- **Aucune décision n’interprète l’article 12.1**, la règle sur les décisions automatisées. La CAI a publié des orientations et des recommandations de réforme, pas de décisions.
- **De nombreuses ordonnances sur l’IA et la biométrie.** La CAI a ordonné à des organisations d’arrêter des systèmes, de détruire des données, d’informer des personnes et de rendre compte des biais algorithmiques. Plusieurs de ces décisions sont citées ci-dessous.
- **Le volume est réel.** La CAI a reçu 514 avis d’incidents de confidentialité en 2024-2025, dont 80 % provenaient du secteur privé ([rapport annuel 2024-2025](https://www.cai.gouv.qc.ca/uploads/pdfs/CAI_RAAG-2024-2025.pdf)).

L’absence d’amendes n’est pas une raison d’attendre. Une ordonnance d’arrêter un système déjà construit coûte cher, et les actions collectives n’ont pas besoin d’une décision de la CAI pour aller de l’avant.

## 1. Une évaluation des facteurs relatifs à la vie privée avant de construire

**Ce que dit la loi.** Tout projet d’acquisition, de développement et de refonte de système d’information ou de prestation électronique de services impliquant des renseignements personnels exige une évaluation des facteurs relatifs à la vie privée, ou EFVP (article 3.3). La personne responsable de la protection des renseignements personnels doit être consultée dès le début du projet.

**Ce que cela signifie pour l’IA.** Un assistant RAG, un copilote branché sur votre CRM ou un agent qui accède à une boîte de courriel est exactement ce type de projet. L’évaluation doit couvrir ce que le modèle peut lire, pas seulement ce que les utilisateurs saisissent. Un index de recherche construit sur un lecteur partagé hérite de chaque renseignement personnel qui s’y trouve.

**Au dossier.** Dans [*Centre de services scolaire du Val-des-Cerfs*](https://www.cai.gouv.qc.ca/uploads/pdfs/decisions-en-surveillance/1020040-S_decision-cai-centre-services-scolaire-val-cerfs-2022-11-09.pdf) (novembre 2022), un centre de services scolaire avait conçu un outil d’apprentissage automatique pour prédire le risque de décrochage en 6e année. La CAI a conclu que les prédictions constituaient de nouveaux renseignements personnels, que leur production était donc une *collecte*, et qu’une EFVP aurait dû être réalisée avant le déploiement. Dans son [rapport quinquennal 2026](https://www.cai.gouv.qc.ca/uploads/pdfs/CAI_RQ_2026.pdf), la CAI recommande que l’EFVP d’un système d’IA qui prend des décisions à l’égard de personnes s’accompagne d’une analyse d’impact algorithmique. Le [guide de la CAI sur l’EFVP](https://www.cai.gouv.qc.ca/uploads/pdfs/CAI_GU_EFVP.pdf) est le gabarit de départ.

**Signal d’alerte.** L’EFVP est rédigée après le projet pilote, décrit la page produit du fournisseur et ne mentionne jamais les plongements (embeddings), les journaux, les sorties du modèle ou l’accès aux outils.

## 2. Communiquer des renseignements personnels hors du Québec

**Ce que dit la loi.** Avant de communiquer un renseignement personnel à l’extérieur du Québec, une organisation doit procéder à une EFVP qui tient compte de sa sensibilité, de la finalité de son utilisation, des mesures de protection, y compris contractuelles, et du régime juridique de l’État de destination (article 17). La communication ne peut s’effectuer que si le renseignement bénéficierait d’une protection adéquate, et elle doit faire l’objet d’une entente écrite qui tient compte de cette évaluation. Il en est de même lorsque vous confiez à un fournisseur à l’extérieur du Québec la tâche de recueillir, d’utiliser, de communiquer ou de conserver ces renseignements pour votre compte.

**Ce que cela signifie pour l’IA.** La plupart des API de modèles hébergés traitent les requêtes hors du Québec, souvent hors du Canada. Chaque requête qui contient un renseignement personnel est une communication hors du Québec. Il en va de même d’une base de données vectorielle infonuagique dans une autre région, d’un service de journalisation géré ou d’un outil d’évaluation qui conserve des échantillons de conversations.

**Au dossier.** La portée joue dans les deux sens. Dans l’[enquête conjointe sur OpenAI](https://www.priv.gc.ca/fr/mesures-et-decisions-prises-par-le-commissariat/enquetes/enquetes-visant-les-entreprises/2026/lprpde-2026-002/) (mai 2026), la CAI a conclu que la loi québécoise s’appliquait à OpenAI même si l’entreprise n’avait ni établissement ni employé au Québec. Dans [*Clearview AI*](https://www.cai.gouv.qc.ca/uploads/pdfs/decisions-en-surveillance/1023158-S_decision-cai-clearview-ai-inc-2021-12-14.pdf) (décembre 2021), elle a ordonné à une entreprise américaine de cesser de recueillir des images faciales de Québécois. Votre fournisseur étranger est à la portée de la CAI. Vous l’êtes aussi, pour l’avoir choisi. Nous n’avons trouvé aucune décision qui repose sur l’article 17 lui-même.

**Signal d’alerte.** Personne ne peut dire dans quelle région l’inférence est exécutée, ni si l’option de « résidence des données » couvre les requêtes, les réponses, les journaux et la surveillance des abus, ou seulement les données au repos.

## 3. Les décisions fondées sur un traitement automatisé

**Ce que dit la loi.** Une organisation qui utilise des renseignements personnels afin que soit rendue une décision fondée exclusivement sur un traitement automatisé doit en informer la personne au plus tard au moment où elle l’informe de la décision (article 12.1). Sur demande, elle doit lui indiquer les renseignements utilisés, les raisons ainsi que les principaux facteurs et paramètres ayant mené à la décision, et son droit de faire rectifier ces renseignements. La personne doit pouvoir présenter ses observations à un membre du personnel en mesure de réviser la décision.

**Ce que cela signifie pour l’IA.** Filtrer des candidatures, trier des réclamations d’assurance, coter un crédit ou signaler des comptes à fermer avec un modèle en font partie lorsqu’aucun humain n’examine réellement le résultat. Les [orientations de la CAI](https://cai.gouv.qc.ca/protection-renseignements-personnels/information-entreprises-privees/utilisation-communication-renseignements-personnels) citent en exemple l’octroi de crédit, l’évaluation d’une aide financière et la priorisation d’une demande. Les « principaux facteurs et paramètres » sont difficiles à reconstituer après coup à partir d’un LLM. Il faut les prévoir dès la conception : entrées journalisées, sources récupérées et un dossier de décision qu’un réviseur peut lire.

**Au dossier.** Aucune décision n’interprète encore l’article 12.1, mais la CAI a montré à quoi ressemble, pour elle, la reddition de comptes algorithmique. Dans sa [décision *Metro* d’avril 2026](https://www.cai.gouv.qc.ca/uploads/pdfs/decisions-en-surveillance/1037199-S_decision-cai-metro-inc-2026-04-01.pdf) sur la reconnaissance faciale en épicerie et en pharmacie, elle a ordonné à l’entreprise de rendre compte tous les six mois, pendant deux ans, de l’efficacité des systèmes, des faux positifs et des biais algorithmiques. Attendez-vous aux mêmes questions pour tout modèle qui décide à l’égard de personnes.

**Signal d’alerte.** L’humain dans la boucle approuve 99 % des recommandations du modèle en moins de dix secondes. C’est un traitement automatisé avec une signature.

## 4. Le profilage et la confidentialité par défaut

**Ce que dit la loi.** Une organisation qui recueille des renseignements au moyen d’une technologie comprenant des fonctions permettant d’identifier, de localiser ou d’effectuer un profilage doit en informer la personne au préalable et lui indiquer comment activer ces fonctions (article 8.1). Les produits et services technologiques offerts au public doivent assurer par défaut le plus haut niveau de confidentialité, sans aucune intervention de la personne concernée (article 9.1). Les témoins de connexion sont exclus.

**Ce que cela signifie pour l’IA.** La personnalisation, l’analyse de sentiment et l’inférence comportementale intégrées à un assistant destiné à la clientèle constituent du profilage. L’entraînement sur les conversations des utilisateurs et la mémoire d’une session à l’autre sont des paramètres de confidentialité. La fonction est livrée désactivée, et c’est l’utilisateur qui l’active.

**Au dossier.** C’est sur ce point que la CAI s’est montrée la plus directe à l’égard de l’IA. Dans l’enquête sur OpenAI, elle a conclu que l’entraînement des modèles sur les conversations ChatGPT par défaut contrevenait à l’article 9.1, malgré l’information transmise aux utilisateurs. Dans l’[enquête conjointe sur TikTok](https://www.priv.gc.ca/fr/mesures-et-decisions-prises-par-le-commissariat/enquetes/enquetes-visant-les-entreprises/2025/lprpde-2025-003/) (septembre 2025), elle a conclu que les fonctions de profilage n’étaient pas désactivées par défaut, en contravention des articles 8.1 et 9.1. Elle a rejeté l’argument de TikTok selon lequel des paramètres conçus pour le RGPD européen satisfaisaient à l’article 9.1 : la règle québécoise est formulée différemment.

**Signal d’alerte.** L’équipe produit présente la mémoire à long terme ou l’option « aider à améliorer le modèle » comme un choix de retrait, et personne n’a demandé si elle est activée par défaut.

## 5. L’utilisation secondaire et les données d’entraînement

**Ce que dit la loi.** Un renseignement personnel ne peut être utilisé qu’aux fins pour lesquelles il a été recueilli, à moins que la personne n’y consente ou qu’une exception précise ne s’applique (article 12). Un renseignement sensible exige un consentement exprès. Une exception vise l’utilisation de renseignements dépersonnalisés à des fins d’étude, de recherche ou de production de statistiques.

**Ce que cela signifie pour l’IA.** Utiliser des transcriptions du service à la clientèle pour affiner un modèle, ou charger des dossiers clients dans un assistant de connaissances généraliste, constitue une nouvelle utilisation. Cette analyse se fait avant l’entraînement, pas après.

**Au dossier.** Dans l’enquête sur OpenAI, la CAI a reconnu que l’entraînement d’un modèle de langage peut constituer une fin légitime, mais a jugé la collecte trop large. Elle a aussi conclu qu’un renseignement publié sur le Web n’est pas « public » au sens de la loi du seul fait qu’on peut le moissonner. Dans *Val-des-Cerfs*, des dossiers d’élèves recueillis pour la scolarisation avaient servi à entraîner un outil de prédiction sans consentement ni information, et la CAI a ordonné au centre de services scolaire d’en informer les parents.

**Signal d’alerte.** Le jeu de données d’entraînement a été constitué par un ingénieur qui avait un accès en lecture à la production et une échéance.

## 6. Les incidents de confidentialité

**Ce que dit la loi.** Lorsqu’une organisation a des motifs de croire qu’un incident de confidentialité s’est produit, elle doit prendre des mesures raisonnables pour diminuer les risques de préjudice et éviter que de nouveaux incidents de même nature se produisent. Si l’incident présente un risque de préjudice sérieux, elle doit aviser avec diligence la CAI et les personnes concernées (article 3.5). L’article 3.6 définit l’incident, l’article 3.7 encadre l’évaluation du risque, et l’article 3.8 exige un registre de tous les incidents, déclarés ou non.

**Ce que cela signifie pour l’IA.** L’IA générative crée de nouveaux chemins d’incident. Une injection d’instructions (prompt injection) qui amène un assistant à révéler le dossier d’un autre client est une communication non autorisée de renseignements personnels. Il en va de même d’un système de récupération qui renvoie des documents que l’utilisateur n’a jamais été autorisé à voir, ou d’une clé d’API divulguée qui expose les journaux de conversation. Votre plan de réponse aux incidents doit les reconnaître, et vos journaux doivent montrer ce que le modèle a réellement renvoyé.

**Au dossier.** 514 avis d’incidents sont parvenus à la CAI en une seule année. L’organisme y est habitué. Ce qu’il vous demandera à propos d’un incident lié à l’IA, c’est ce que vous pouvez reconstituer : quels documents ont été récupérés, ce qui a été renvoyé, et à qui.

**Signal d’alerte.** Le système d’IA est exclu du plan de réponse aux incidents, ou ses journaux consignent la requête, mais pas les documents récupérés ni la réponse.

## 7. La conservation et la destruction

**Ce que dit la loi.** Lorsque les fins sont accomplies, les renseignements personnels doivent être détruits ou anonymisés selon le règlement sur l’anonymisation en vigueur depuis mai 2024 (article 23). Les politiques de gouvernance de l’organisation doivent encadrer leur conservation et leur destruction (article 3.2).

**Ce que cela signifie pour l’IA.** Les renseignements personnels persistent à plus d’endroits dans une pile d’IA que dans une application classique : journaux de requêtes, dépôts de surveillance des abus du fournisseur, plongements, caches, jeux d’évaluation et poids de modèles affinés. On ne peut pas détruire ce qu’on n’a pas inventorié, et on ne retire pas facilement une personne d’un modèle affiné.

**Au dossier.** La destruction est le remède habituel de la CAI. Elle a ordonné à Clearview AI de détruire dans les 90 jours les images et les vecteurs biométriques qu’elle détenait sur des Québécois, et à [Transcontinental](https://www.cai.gouv.qc.ca/uploads/pdfs/decisions-en-surveillance/1024350-S_decision-cai-societe-imprimeries-transcontinental-inc-2024-09-04.pdf) (septembre 2024) de mettre fin à un système de reconnaissance faciale des employés et d’en détruire les gabarits. Une ordonnance de destruction ne coûte pas cher à respecter seulement si vous savez où se trouve chaque copie.

**Signal d’alerte.** Une demande de suppression est traitée dans le CRM, alors que les courriels du même client demeurent dans l’index vectoriel.

## Les tribunaux bougent aussi

Les actions collectives n’attendent pas la CAI. Dans *Badji c. Zenleads inc.* (2026 QCCS 5), la Cour supérieure a autorisé une action collective contre le courtier de données derrière Apollo.io, y compris des réclamations en dommages-intérêts punitifs fondées sur l’article 93.1. Elle a jugé plausibles les préjudices liés à la perte de contrôle sur les données personnelles et au profilage algorithmique ([résumé d’Osler, en anglais](https://www.osler.com/en/insights/blogs/classactions/privacy-class-actions-the-professional-information-exception-under-scrutiny-in-quebec/)). La Cour d’appel a accordé la permission d’en appeler, et l’audience est prévue en novembre 2026. Dans *Doan c. Clearview AI inc.* (2024 QCCS 3968), la Cour supérieure a autorisé une action collective québécoise visant des images faciales moissonnées ([revue d’Osler](https://www.osler.com/fr/articles/rapports/revue-de-la-jurisprudence-sur-la-protection-de-la-vie-privee-dosler-quatrieme-edition-2025/donnees-biometriques/)). Aucune des deux n’a encore été tranchée sur le fond.

## L’imputabilité loge au sommet

Par défaut, la Loi 25 fait de la personne ayant la plus haute autorité au sein de l’organisation, généralement le PDG, la personne responsable de la protection des renseignements personnels (article 3.1). Cette fonction peut être déléguée par écrit, mais l’imputabilité ne disparaît pas. Le titre et les coordonnées de cette personne doivent être publiés sur le site Web de l’organisation.

C’est pourquoi la Loi 25 est un sujet de conseil d’administration, pas seulement de conformité. Les administrateurs devraient pouvoir voir quels systèmes d’IA traitent des renseignements personnels, lesquels ont une EFVP complétée et quels incidents ont été consignés. Notre billet sur les [questions qu’un conseil devrait poser avant d’approuver un outil de codage par IA](/fr/blogue/questions-conseil-administration-outil-codage-ia/) applique la même discipline à une autre décision.

## Comment nous aidons

Nous travaillons aux côtés de votre responsable de la protection des renseignements personnels et de vos conseillers juridiques. Ils interprètent la loi ; nous nous assurons que le système fait ce que l’EFVP dit qu’il fait.

- **[Évaluation de la sécurité de l’IA générative](/fr/services/evaluation-securite-ia-generative/).** Une revue de quatre semaines, à portée fixe, de votre architecture d’IA, de vos flux de données, de votre modèle d’identité et de vos fournisseurs. Les constats sont mis en correspondance avec la Loi 25 ainsi qu’avec les références du NIST, de l’ISO et de l’OWASP, chacun avec un responsable et une mesure corrective. Elle produit la preuve technique dont une EFVP au titre de l’article 3.3 et une évaluation au titre de l’article 17 ont besoin.
- **Architecture sécurisée et SDLC propulsé par l’IA.** Une modélisation des menaces dès la conception, pour que la résidence des données, la conservation, le contrôle d’accès à la récupération, la confidentialité par défaut et la journalisation des décisions soient intégrés plutôt qu’ajoutés après coup. Voir [nos services](/fr/services/).
- **Réponse aux incidents.** Des guides d’intervention et des exercices sur table pour les incidents propres à l’IA, comme l’injection d’instructions, la fuite par récupération et les clés exposées, avec un chemin clair vers l’évaluation du « risque de préjudice sérieux » et l’avis à la CAI.
- **Conseil d’administration.** Des séances d’information pour les PDG et les administrateurs qui portent l’imputabilité de la Loi 25, et un format de reddition de comptes qui présente l’exposition de l’IA en matière de vie privée sur une seule page.

## Liste de contrôle avant la production

- EFVP complétée pour le système d’IA, couvrant les sources de récupération, les sorties du modèle, les journaux et l’accès aux outils
- Évaluation au titre de l’article 17 et entente écrite pour chaque fournisseur qui traite des renseignements personnels hors du Québec
- Décisions automatisées repérées, avec avis, explications, voie de révision humaine et suivi des biais
- Profilage et entraînement sur les données des utilisateurs documentés, divulgués et désactivés par défaut
- Fondement juridique confirmé pour toute utilisation secondaire, y compris l’affinage
- Incidents liés à l’IA inclus dans le plan de réponse aux incidents et dans le registre des incidents
- Inventaire de conservation couvrant les requêtes, les plongements, les caches, les jeux d’évaluation et les dépôts des fournisseurs
