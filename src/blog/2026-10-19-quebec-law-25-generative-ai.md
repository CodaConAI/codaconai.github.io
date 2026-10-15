---
title: "Quebec Law 25 and Generative AI: What to Settle Before Production"
description: "Quebec Law 25 applies to every AI system that handles personal information. Seven obligations, and the CAI decisions that show how they are enforced."
date: 2026-10-19
tags:
  - ai-security
  - board-advisory
  - incident-response
crosspost: true
---

Quebec's Law 25 was not written with large language models in mind. It applies to them anyway, and the regulator has already said so in writing.

Every generative AI project that reads a customer email, summarizes a case file, or answers questions over an HR knowledge base is processing personal information. In Quebec, that brings a specific set of obligations and an enforcement regime with real penalties. Most of them land at design time, not after launch.

Here is where Law 25 and generative AI meet, what each obligation asks of an AI system, what the Commission d'accès à l'information has actually decided, and how we help Quebec organizations get it right.

## What Law 25 is

Law 25 is the common name for *An Act to modernize legislative provisions as regards the protection of personal information* (S.Q. 2021, c. 25). It amended Quebec's [private sector privacy act](https://www.legisquebec.gouv.qc.ca/en/document/cs/P-39.1) and its public sector equivalent. It was phased in mainly between September 2022 and September 2024. Everything below is in force today.

The regulator is the [Commission d'accès à l'information](https://www.cai.gouv.qc.ca/) (CAI). Administrative monetary penalties reach $10 million or 2% of worldwide turnover, whichever is greater (section 90.12). Penal fines reach $25 million or 4%, doubled for a subsequent offence (sections 91 and 92.1). Individuals can also sue: where an unlawful infringement is intentional or results from gross fault, the court must award punitive damages of at least $1,000 (section 93.1).

Section references below are to the private sector act. We are security practitioners, not lawyers. This post explains how the obligations translate into AI architecture and controls; your counsel decides how they apply to you.

## What the record shows so far

We reviewed the CAI's published decisions, its annual and five-year reports, and the joint investigations it conducts with the federal Privacy Commissioner. As of October 2026:

- **No published administrative monetary penalty.** The CAI has had the power since September 2023. Its decisions page and annual reports show orders, not fines. Be wary of blog posts listing "real" Law 25 fines: the ones we traced were composites.
- **No decision interpreting section 12.1**, the automated decision rule. The CAI has issued guidance and law reform recommendations, not rulings.
- **Plenty of orders on AI and biometrics.** The CAI has ordered organizations to stop systems, destroy data, notify people, and report on algorithmic bias. Several of those decisions are cited below.
- **Volume is real.** The CAI received 514 confidentiality incident notices in 2024–2025, 80% from the private sector ([annual report 2024–2025](https://www.cai.gouv.qc.ca/uploads/pdfs/CAI_RAAG-2024-2025.pdf)).

The absence of fines is not a reason to wait. Orders to shut down a system after it is built are expensive, and class actions do not need a CAI decision to proceed.

## 1. A privacy impact assessment before you build

**What the law says.** Any project to acquire, develop, or overhaul an information system or electronic service delivery system involving personal information requires a privacy impact assessment (section 3.3). The person in charge of the protection of personal information must be consulted from the outset of the project.

**What it means for AI.** A RAG assistant, a copilot connected to your CRM, or an agent with access to a mailbox is exactly that kind of project. The assessment has to cover what the model can read, not just what users type. A retrieval index built over a shared drive inherits every piece of personal information on that drive.

**On the record.** In [*Centre de services scolaire du Val-des-Cerfs*](https://www.cai.gouv.qc.ca/uploads/pdfs/decisions-en-surveillance/1020040-S_decision-cai-centre-services-scolaire-val-cerfs-2022-11-09.pdf) (November 2022), a school service centre built a machine learning tool to predict grade 6 dropout risk. The CAI held that the predictions were new personal information, so producing them was a *collection*, and that a privacy impact assessment should have been done before deployment. In its [2026 five-year report](https://www.cai.gouv.qc.ca/uploads/pdfs/CAI_RQ_2026.pdf), the CAI recommends that assessments of AI systems making decisions about people include an algorithmic impact analysis. The [CAI's PIA guide](https://www.cai.gouv.qc.ca/uploads/pdfs/CAI_GU_EFVP.pdf) is the starting template.

**Warning sign.** The PIA is drafted after the pilot, describes the vendor's product page, and never mentions embeddings, logs, model outputs, or tool access.

## 2. Sending personal information outside Quebec

**What the law says.** Before communicating personal information outside Quebec, an organization must conduct a privacy impact assessment covering the information's sensitivity, the purposes, the protection measures including contractual ones, and the legal framework of the destination (section 17). The information may go only if it would receive adequate protection, and the transfer needs a written agreement that reflects the assessment. The same applies when you entrust a provider outside Quebec with collecting, using, communicating, or keeping the information on your behalf.

**What it means for AI.** Most hosted model APIs process prompts outside Quebec, often outside Canada. Every prompt carrying personal information is a communication outside Quebec. So is a cloud vector database in another region, a managed logging service, or an evaluation tool that stores conversation samples.

**On the record.** The reach runs both ways. In the [joint investigation of OpenAI](https://www.priv.gc.ca/en/opc-actions-and-decisions/investigations/investigations-into-businesses/2026/pipeda-2026-002/) (May 2026), the CAI found that Quebec's act applied to OpenAI even though it had no establishment or employees in Quebec. In [*Clearview AI*](https://www.cai.gouv.qc.ca/uploads/pdfs/decisions-en-surveillance/1023158-S_decision-cai-clearview-ai-inc-2021-12-14.pdf) (December 2021), it ordered a US company to stop collecting Quebecers' facial images. Your foreign provider is within the CAI's reach. So are you, for choosing it. We found no decision yet that turns on section 17 itself.

**Warning sign.** Nobody can say which region processes inference, or whether the "data residency" option covers prompts, completions, logs, and abuse monitoring, or only data at rest.

## 3. Decisions made by automated processing

**What the law says.** An organization that uses personal information to render a decision based exclusively on automated processing must inform the person no later than when it informs them of the decision (section 12.1). On request, it must disclose the personal information used, the reasons and the principal factors and parameters that led to the decision, and the right to have the information corrected. The person must be able to submit observations to a staff member in a position to review the decision.

**What it means for AI.** Screening job applicants, triaging insurance claims, scoring credit, or flagging accounts for closure with a model all qualify when no human meaningfully reviews the outcome. The [CAI's guidance](https://cai.gouv.qc.ca/protection-renseignements-personnels/information-entreprises-privees/utilisation-communication-renseignements-personnels) gives credit decisions, financial aid assessments, and prioritizing a request as examples. "Principal factors and parameters" is hard to produce from an LLM after the fact. It has to be designed in: logged inputs, retrieved sources, and a decision record a reviewer can read.

**On the record.** No decision interprets section 12.1 yet, but the CAI has shown what algorithmic accountability looks like to it. In its [April 2026 *Metro* decision](https://www.cai.gouv.qc.ca/uploads/pdfs/decisions-en-surveillance/1037199-S_decision-cai-metro-inc-2026-04-01.pdf) on facial recognition in grocery and pharmacy stores, it ordered the company to report every six months for two years on the systems' effectiveness, false positives, and algorithmic bias. Expect the same questions about any model that decides things about people.

**Warning sign.** The human in the loop approves 99% of model recommendations in under ten seconds. That is automated processing with a signature.

## 4. Profiling and privacy by default

**What the law says.** An organization that collects personal information using technology with functions to identify, locate, or profile a person must inform them beforehand and explain how to activate those functions (section 8.1). Technological products and services offered to the public must apply the highest level of confidentiality by default, without any action by the user (section 9.1). Browser cookies are excluded.

**What it means for AI.** Personalization, sentiment analysis, and behavioural inference built into a customer-facing assistant are profiling. Training on user conversations, and conversation memory across sessions, are privacy settings. The feature ships off, and the user turns it on.

**On the record.** This is where the CAI has been most direct about AI. In the OpenAI investigation, it found that training models on ChatGPT conversations by default breached section 9.1, despite the information OpenAI gave users. In the [joint TikTok investigation](https://www.priv.gc.ca/en/opc-actions-and-decisions/investigations/investigations-into-businesses/2025/pipeda-2025-003/) (September 2025), it found that profiling functions were not off by default, in breach of sections 8.1 and 9.1. It rejected TikTok's argument that settings designed for the European GDPR satisfied section 9.1: the Quebec rule is worded differently.

**Warning sign.** The product team describes long-term memory or "help improve the model" as an opt-out, and nobody has asked whether it is on by default.

## 5. Secondary use and training data

**What the law says.** Personal information may be used only for the purposes for which it was collected, unless the person consents or a specific exception applies (section 12). Sensitive information requires express consent. One exception covers study, research, or statistics using de-identified information.

**What it means for AI.** Using support transcripts to fine-tune a model, or loading customer files into a general-purpose knowledge assistant, is a new use. That analysis belongs before the training run, not after.

**On the record.** In the OpenAI investigation, the CAI accepted that training a language model can be a legitimate purpose, but found the collection overbroad. It also held that information published on the web is not "public" under the act just because it can be scraped. In *Val-des-Cerfs*, student records collected for schooling were reused to train a prediction tool without consent or notice, and the CAI ordered the school service centre to inform parents.

**Warning sign.** The training dataset was assembled by an engineer with production read access and a deadline.

## 6. Confidentiality incidents

**What the law says.** When an organization has reason to believe a confidentiality incident has occurred, it must take reasonable measures to reduce the risk of injury and prevent new incidents. If the incident presents a risk of serious injury, it must promptly notify the CAI and the affected individuals (section 3.5). Section 3.6 defines an incident, section 3.7 sets how to assess the risk, and section 3.8 requires a register of every incident, reported or not.

**What it means for AI.** Generative AI creates new incident paths. A prompt injection that makes an assistant reveal another customer's file is unauthorized communication of personal information. So is a retrieval system that returns documents the user was never authorized to see, or a leaked API key that exposes conversation logs. Your incident response plan needs to recognize them, and your logs need to show what the model actually returned.

**On the record.** 514 incident notices reached the CAI in a single year. The regulator is used to them. What it will ask about an AI incident is what you can reconstruct: which documents were retrieved, what was returned, and to whom.

**Warning sign.** The AI system is out of scope for the incident response plan, or its logs record the prompt but not the retrieved documents and the output.

## 7. Retention and destruction

**What the law says.** When the purposes are achieved, personal information must be destroyed or anonymized according to the anonymization regulation in force since May 2024 (section 23). The organization's governance policies must frame retention and destruction (section 3.2).

**What it means for AI.** Personal information persists in more places in an AI stack than in a classic application: prompt logs, vendor abuse monitoring stores, embeddings, caches, evaluation sets, and fine-tuned weights. You cannot destroy what you have not inventoried, and you cannot easily remove one person from a fine-tuned model.

**On the record.** Destruction is the CAI's standard remedy. It ordered Clearview AI to destroy the images and biometric vectors it held on Quebecers within 90 days, and ordered [Transcontinental](https://www.cai.gouv.qc.ca/uploads/pdfs/decisions-en-surveillance/1024350-S_decision-cai-societe-imprimeries-transcontinental-inc-2024-09-04.pdf) (September 2024) to shut down an employee facial recognition system and destroy the templates. An order to destroy is cheap to comply with only if you know where every copy lives.

**Warning sign.** A deletion request is honoured in the CRM while the same customer's emails remain in the vector index.

## The courts are moving too

Class actions do not wait for the CAI. In *Badji c. Zenleads inc.* (2026 QCCS 5), the Superior Court authorized a class action against the data broker behind Apollo.io, including claims for punitive damages under section 93.1. It found that loss of control over personal data and algorithmic profiling were plausible harms ([Osler summary](https://www.osler.com/en/insights/blogs/classactions/privacy-class-actions-the-professional-information-exception-under-scrutiny-in-quebec/)). The Court of Appeal granted leave to appeal, with a hearing scheduled for November 2026. In *Doan c. Clearview AI inc.* (2024 QCCS 3968), the Superior Court authorized a Quebec class action over scraped facial images ([Osler review](https://www.osler.com/fr/articles/rapports/revue-de-la-jurisprudence-sur-la-protection-de-la-vie-privee-dosler-quatrieme-edition-2025/donnees-biometriques/)). Neither has been decided on the merits.

## Accountability sits at the top

Law 25 makes the person with the highest authority in the organization, usually the CEO, the person in charge of the protection of personal information by default (section 3.1). That role can be delegated in writing, but the accountability does not disappear. The title and contact information must be published on the organization's website.

That is why Law 25 is a board topic, not only a compliance one. Directors should expect to see where AI systems process personal information, which ones have a completed PIA, and what incidents were recorded. Our post on [questions a board should ask before an AI coding tool rollout](/blog/board-questions-ai-coding-tool-rollout/) applies the same discipline to a different decision.

## How we help

We work alongside your privacy officer and legal counsel. They interpret the law; we make sure the system does what the PIA says it does.

- **[GenAI Security Readiness Assessment](/services/genai-security-readiness/).** A four-week, fixed-scope review of your AI architecture, data flows, identity model, and providers. Findings are mapped to Law 25 alongside NIST, ISO, and OWASP references, with an owner and a remediation for each. It produces the technical evidence a section 3.3 PIA and a section 17 assessment need.
- **Secure architecture and AI-driven SDLC.** Threat modeling at design time, so data residency, retention, access control on retrieval, privacy-protective defaults, and decision logging are built in rather than retrofitted. See [our services](/services/).
- **Incident response.** Playbooks and tabletop exercises for AI-specific incidents such as prompt injection, retrieval leakage, and exposed keys, with a clear path to the "risk of serious injury" assessment and CAI notification.
- **Board advisory.** Briefings for CEOs and directors who carry Law 25 accountability, and a reporting format that shows AI privacy exposure in one page.

## Before production checklist

- PIA completed for the AI system, covering retrieval sources, model outputs, logs, and tool access
- Section 17 assessment and written agreement for every provider that processes personal information outside Quebec
- Automated decisions identified, with notices, explanations, a human review path, and bias monitoring
- Profiling and training on user data documented, disclosed, and off by default
- Legal basis confirmed for any secondary use, including fine-tuning
- AI incidents in scope for the incident response plan and the incident register
- Retention inventory across prompts, embeddings, caches, evaluation sets, and vendor stores
