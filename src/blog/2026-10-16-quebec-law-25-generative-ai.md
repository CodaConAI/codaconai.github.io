---
title: "Quebec Law 25 and Generative AI: What to Settle Before Production"
description: "Quebec Law 25 applies to every AI system that touches personal information. Seven obligations to settle before your GenAI project reaches production."
date: 2026-10-16
tags:
  - ai-security
  - board-advisory
  - incident-response
crosspost: true
---

Quebec's Law 25 was not written with large language models in mind. It applies to them anyway.

Every generative AI project that reads a customer email, summarizes a case file, or answers questions over an HR knowledge base is processing personal information. In Quebec, that brings a specific set of obligations, and an enforcement regime with real penalties. Most of them land at design time, not after launch.

Here is where Law 25 and generative AI meet, what each obligation asks of an AI system, and how we help Quebec organizations get it right.

## What Law 25 is

Law 25 is the common name for *An Act to modernize legislative provisions as regards the protection of personal information* (S.Q. 2021, c. 25). It amended Quebec's [private sector privacy act](https://www.legisquebec.gouv.qc.ca/en/document/cs/P-39.1) and its public sector equivalent. It came into force in three phases, in September 2022, 2023, and 2024. Everything below is in force today.

The regulator is the [Commission d'accès à l'information](https://www.cai.gouv.qc.ca/) (CAI). Administrative monetary penalties reach $10 million or 2% of worldwide turnover, whichever is greater. Penal fines reach $25 million or 4%. Individuals can also sue, with punitive damages available for intentional or grossly negligent breaches.

Section references below are to the private sector act. We are security practitioners, not lawyers. This post explains how the obligations translate into AI architecture and controls; your counsel decides how they apply to you.

## 1. A privacy impact assessment before you build

**What the law says.** Any project to acquire, develop, or overhaul an information system or electronic service delivery that involves personal information requires a privacy impact assessment (section 3.3). The person in charge of the protection of personal information must be consulted from the start of the project.

**What it means for AI.** A RAG assistant, a copilot connected to your CRM, or an agent with access to a mailbox is exactly that kind of project. The assessment has to cover what the model can read, not just what users type. A retrieval index built over a shared drive inherits every piece of personal information on that drive.

**Warning sign.** The PIA is drafted after the pilot, describes the vendor's product page, and never mentions embeddings, logs, or tool access.

## 2. Sending personal information outside Quebec

**What the law says.** Before communicating personal information outside Quebec, an organization must assess whether it will receive adequate protection, considering its sensitivity, the purposes, the protection measures including contractual ones, and the legal framework of the destination (section 17). The transfer needs a written agreement that reflects the assessment.

**What it means for AI.** Most hosted model APIs process prompts outside Quebec, often outside Canada. Every prompt carrying personal information is a communication outside Quebec. So is a cloud vector database in another region, a managed logging service, or an evaluation tool that stores conversation samples.

**Warning sign.** Nobody can say which region processes inference, or whether the "data residency" option covers prompts, completions, logs, and abuse monitoring, or only data at rest.

## 3. Decisions made by automated processing

**What the law says.** An organization that makes a decision based exclusively on automated processing of personal information must inform the person no later than when it informs them of the decision (section 12.1). On request, it must disclose the personal information used, the reasons and principal factors behind the decision, and the right to have the information corrected. The person must be able to submit observations to a staff member who can review the decision.

**What it means for AI.** Screening job applicants, triaging insurance claims, scoring credit, or flagging accounts for closure with a model all qualify when no human meaningfully reviews the outcome. "Principal factors" is hard to produce from an LLM after the fact. It has to be designed in: logged inputs, retrieved sources, and a decision record a reviewer can read.

**Warning sign.** The human in the loop approves 99% of model recommendations in under ten seconds. That is automated processing with a signature.

## 4. Profiling and privacy by default

**What the law says.** An organization that uses technology with functions to identify, locate, or profile a person must inform them beforehand and explain how to activate those functions (section 8.1). Technological products and services offered to the public must apply the highest level of confidentiality by default (section 9.1).

**What it means for AI.** Personalization, sentiment analysis, and behavioural inference built into a customer-facing assistant are profiling. Conversation memory across sessions is a privacy setting. Defaults matter: the feature ships off, and the user turns it on.

**Warning sign.** The product team describes long-term memory as a "delight feature" and nobody has asked whether it is on by default.

## 5. Secondary use and fine-tuning

**What the law says.** Personal information may be used only for the purposes for which it was collected, unless the person consents or a specific exception applies (section 12). Sensitive information requires express consent.

**What it means for AI.** Using support transcripts to fine-tune a model, or loading customer files into a general-purpose knowledge assistant, is a new use. Some exceptions may apply, for example when the information is de-identified and the use is for internal research or statistics. That analysis belongs before the training run, not after.

**Warning sign.** The training dataset was assembled by an engineer with production read access and a deadline.

## 6. Confidentiality incidents

**What the law says.** When an organization has reason to believe a confidentiality incident has occurred, it must take reasonable measures to reduce the risk of injury. If the incident presents a risk of serious injury, it must promptly notify the CAI and the affected individuals (sections 3.5 to 3.8). Every incident goes into a register, whether or not it is reported.

**What it means for AI.** Generative AI creates new incident paths. A prompt injection that makes an assistant reveal another customer's file is a confidentiality incident. So is a retrieval system that returns documents the user was never authorized to see, or a leaked API key that exposes conversation logs. Your incident response plan needs to recognize them, and your logs need to show what the model actually returned.

**Warning sign.** The AI system is out of scope for the incident response plan, or its logs record the prompt but not the retrieved documents and the output.

## 7. Retention and destruction

**What the law says.** When the purposes are achieved, personal information must be destroyed or anonymized (section 23), and the organization's governance policies must define retention and destruction (section 3.2).

**What it means for AI.** Personal information persists in more places in an AI stack than in a classic application: prompt logs, vendor abuse-monitoring stores, embeddings, caches, evaluation sets, and fine-tuned weights. You cannot destroy what you have not inventoried, and you cannot easily remove one person from a fine-tuned model.

**Warning sign.** A deletion request is honoured in the CRM while the same customer's emails remain in the vector index.

## Accountability sits at the top

Law 25 makes the person with the highest authority in the organization, usually the CEO, the person in charge of the protection of personal information by default (section 3.1). That role can be delegated in writing, but the accountability does not disappear. The title and contact information must be published on the organization's website.

That is why Law 25 is a board topic, not only a compliance one. Directors should expect to see where AI systems process personal information, which ones have a completed PIA, and what incidents were recorded. Our post on [questions a board should ask before an AI coding tool rollout](/blog/board-questions-ai-coding-tool-rollout/) applies the same discipline to a different decision.

## Hypothetical example: one assistant, four obligations

*Illustrative scenario, not a client case.* A Montreal insurer launches a claims assistant that drafts responses to policyholders using a hosted model. The pilot works. Before production, a review finds four gaps. Inference runs in a US region with no section 17 assessment on file. The assistant recommends claim denials that adjusters approve almost unchanged, so section 12.1 notices are needed. Conversation logs are kept indefinitely by default at the vendor. And the retrieval index includes medical notes from closed claims that adjusters on other files can reach. None of the four requires a new model. All four would have been cheaper to fix at design time.

## How we help

We work alongside your privacy officer and legal counsel. They interpret the law; we make sure the system does what the PIA says it does.

- **[GenAI Security Readiness Assessment](/services/genai-security-readiness/).** A four-week, fixed-scope review of your AI architecture, data flows, identity model, and providers. Findings are mapped to Law 25 alongside NIST, ISO, and OWASP references, with an owner and a remediation for each. It produces the technical evidence a section 3.3 PIA and a section 17 assessment need.
- **Secure architecture and AI-driven SDLC.** Threat modeling at design time, so data residency, retention, access control on retrieval, and decision logging are built in rather than retrofitted. See [our services](/services/).
- **Incident response.** Playbooks and tabletop exercises for AI-specific incidents such as prompt injection, retrieval leakage, and exposed keys, with a clear path to the "risk of serious injury" assessment and CAI notification.
- **Board advisory.** Briefings for CEOs and directors who carry Law 25 accountability, and a reporting format that shows AI privacy exposure in one page.

## Before production checklist

- PIA completed for the AI system, covering retrieval sources, logs, and tool access
- Section 17 assessment and written agreement for every provider that processes personal information outside Quebec
- Automated decisions identified, with notices, explanations, and a human review path
- Profiling features documented, disclosed, and off by default
- Legal basis confirmed for any secondary use, including fine-tuning
- AI incidents in scope for the incident response plan and the incident register
- Retention inventory across prompts, embeddings, caches, evaluation sets, and vendor stores
