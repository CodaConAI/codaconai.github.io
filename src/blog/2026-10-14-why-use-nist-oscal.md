---
title: "Why Use NIST OSCAL? Compliance as Data, Not Documents"
description: "What NIST OSCAL is, why machine-readable controls beat Word and spreadsheet compliance, and how to adopt it without stalling your security program."
date: 2026-10-14
updated: 2026-10-15
tags:
  - cloud-security
  - sdlc
crosspost: true
---

## TL;DR

**What it is.** [OSCAL](https://pages.nist.gov/OSCAL/), the Open Security Controls Assessment Language, is an open standard from NIST. It expresses security controls, system security plans, assessments, and remediation plans as structured data in XML, JSON, or YAML. It is free, open source, and [developed in the open on GitHub](https://github.com/usnistgov/OSCAL). The latest release at time of writing is v1.2.3.

**Why use it.** Most compliance work still lives in Word documents and spreadsheets that are out of date the day they are signed. OSCAL turns that paperwork into data that tools can validate, compare, and update. Write a control implementation once and reuse it across frameworks. Hand assessors evidence they can process by machine. Move from an annual snapshot toward continuous assurance.

**Why now.** Regulators are publishing controls as data. US federal cloud authorization is moving toward machine-readable packages, Canada's control catalogues descend from the NIST controls OSCAL was built around, and Germany now publishes its national baseline natively in OSCAL. Meanwhile the number of frameworks you answer to only grows.

## The problem OSCAL solves

Ask a security team how many frameworks it reports against. SOC 2, ISO 27001, NIST SP 800-53, CIS, provincial privacy law, customer questionnaires, and now AI-specific frameworks. Each one gets its own document, its own spreadsheet, and its own late-night copy-and-paste session before the audit.

The underlying facts barely change between them. Multi-factor authentication is enforced the same way whether ISO or SOC 2 asks about it. Yet the same answer is rewritten for each framework, in prose no tool can check, by people who would rather be fixing things.

That model has three failures:

1. **Drift.** The document says one thing, the system does another, and nobody notices until an assessor or an attacker does.
2. **Duplication.** Every new framework multiplies the work instead of reusing what is already known.
3. **Opacity.** A 300-page PDF cannot be queried. "Which controls depend on this identity provider?" takes a week to answer.

## What OSCAL actually is

NIST [describes OSCAL](https://csrc.nist.gov/projects/open-security-controls-assessment-language) as a set of formats that give a standardized, machine-readable representation of control information, from catalogs to assessment results. The models fall into three layers:

- **Control layer.** *Catalogs* hold the control definitions, such as NIST SP 800-53. *Profiles* select and tailor controls into a baseline, such as Moderate or your own internal standard.
- **Implementation layer.** *Component definitions* describe how a product or service satisfies controls. A *system security plan* (SSP) describes how a specific system implements its baseline.
- **Assessment layer.** *Assessment plans*, *assessment results*, and *plans of action and milestones* (POA&M) record what was tested, what was found, and what is being fixed.

[![OSCAL layers: a profile imports a catalog; component definitions reference a profile; a system security plan imports a profile and reuses component definitions; the assessment plan and POA&M import the SSP; assessment results import the assessment plan.](/img/diagrams/oscal-layers.en.svg)](/img/diagrams/oscal-layers.en.svg)

Each layer references the one above it. An SSP points to a profile, which points to a catalog. An assessment result points to the SSP. That chain of references is the point: change a control, and you can trace every system and finding it touches.

## Why organizations should use it

### Write once, map many times

Describe how your platform enforces encryption at rest as a component definition. Reference it from every system that uses the platform. When a framework or a customer asks, the answer comes from the same source, not a fresh rewrite.

[![Shared components such as identity, logging, and encryption are described once, used by each system security plan, and mapped to each framework: NIST SP 800-53, ISO 27001, and SOC 2.](/img/diagrams/write-once.en.svg)](/img/diagrams/write-once.en.svg)

### Documentation that can be checked

OSCAL content validates against published schemas. A missing control, a broken reference, or a parameter left blank is caught by a tool, not by an assessor three weeks before your deadline. That changes compliance from a writing exercise into something closer to software, with versions, reviews, and automated checks.

### Vendor and supplier assurance at scale

If your cloud and SaaS providers publish component definitions, you inherit their control descriptions as data instead of re-reading their PDFs. The same applies in reverse: if you sell to regulated buyers, a clean OSCAL package shortens their review of you.

### Continuous assurance instead of annual theatre

Once controls, systems, and findings are linked as data, evidence from your pipelines and cloud configuration can feed assessment results directly. Status becomes a query, not a project. This is where OSCAL meets the rest of a modern [secure software development lifecycle](/blog/board-questions-ai-coding-tool-rollout/): compliance becomes another artifact the pipeline produces and checks.

[![Continuous assurance loop: a change is validated by the pipeline, automated checks collect evidence, assessment results update, the POA&M tracks open findings, and each finding is either fixed in the next change or granted an exception with an owner and deadline, which reopens the finding in the POA&M when the deadline arrives.](/img/diagrams/continuous-assurance.en.svg)](/img/diagrams/continuous-assurance.en.svg)

### Exceptions become data, too

Every program has controls it cannot meet as written: a legacy system that cannot take multi-factor authentication, a scanner finding that turns out to be a false positive, a risk the business decides to accept. In most organizations these exceptions live in email threads and a spreadsheet tab. They rarely have an expiry date, the approver has often moved on, and nobody looks at them again until an assessor asks.

OSCAL records exceptions inside the risk record, not beside it. A risk in a POA&M moves through statuses such as `open`, `remediating`, `deviation-requested`, `deviation-approved`, and `closed`. Its response is typed as avoid, mitigate, transfer, share, or accept. Properties flag a risk as a false positive, accepted, or risk-adjusted, and a risk log records each status change, who logged it, and when. Because the risk references the finding, the control, and the system, an exception never drifts away from what it excuses.

The payoff is the same as everywhere else in OSCAL: questions become queries. Which accepted risks reach their deadline this quarter? Which systems carry exceptions against the same control? Who approved this deviation, and on what evidence? Give every exception a deadline and the pipeline can flag it for review before it quietly becomes permanent.

### Regulatory direction of travel

Machine-readable assurance is no longer a US-only idea. Where you sit changes the details, not the direction.

**United States.** FedRAMP's [RFC-0024](https://www.fedramp.gov/rfcs/0024/) proposes that Rev5 cloud providers submit authorization packages in an approved machine-readable format, with OSCAL named as one, starting with new submissions on September 30, 2026. Check FedRAMP's final rules for the scope and dates that apply to you. NIST also publishes its own catalogs, including SP 800-53 and SP 800-171, as [OSCAL content](https://github.com/usnistgov/oscal-content).

**Canada.** The federal control catalogue, [ITSG-33](https://www.cyber.gc.ca/en/guidance/annex-3a-security-control-catalogue-itsg-33), is based on NIST SP 800-53, so it maps naturally onto OSCAL's catalog and profile model. The Canadian Centre for Cyber Security has not published an official OSCAL edition, but AWS has [encoded the CCCS Medium and Protected B High Value Assets cloud profiles in OSCAL](https://aws.amazon.com/blogs/security/using-oscal-to-express-canadian-cybersecurity-requirements-as-compliance-as-code/) as open samples. For defence suppliers, the [Canadian Program for Cyber Security Certification](https://www.canada.ca/en/public-services-procurement/news/2026/04/canadian-program-for-cyber-security-certification-level-1.html) (CPCSC) rests on a standard technically identical to NIST SP 800-171, which NIST already publishes in OSCAL. Level 1 self-assessments enter select defence contracts from summer 2026, and Level 2 third-party certification from spring 2027.

**Quebec.** Nothing in Quebec requires OSCAL today. But Quebec organizations already carry structured obligations that live badly in documents: public bodies answer to the [government's information security directive and framework](https://www.quebec.ca/gouvernement/ministeres-organismes/cybersecurite-numerique/publications/dispositions-securite-information), and Law 25 requires, among other things, privacy impact assessments for certain projects and a register of confidentiality incidents. OSCAL lets you model those obligations as your own catalog, alongside ISO 27001 or ITSG-33, and answer each from the same evidence.

**Europe.** NIS2 and DORA do not prescribe a data format, and the EU has not published official OSCAL catalogs for them. Germany has moved first: the BSI now publishes its security requirements, including Grundschutz++, the successor to IT-Grundschutz, as [OSCAL documents on GitHub](https://github.com/BSI-Bund/Stand-der-Technik-Bibliothek). The catalog was published in September 2025, with NIS2 implementation as a legal driver. If one of Europe's most influential baselines now ships as data, others will follow.

If none of these apply to you, the signal still matters: regulators and large buyers are tired of reading PDFs, and machine-readable assurance is where procurement is heading.

### No lock-in

OSCAL is an open standard with open-source tooling from NIST and the community. Your compliance data stays portable between GRC platforms, consultants, and assessors. That alone is worth something the next time a tool contract renews.

## Why adoption stalls

If OSCAL is this useful, why do so few organizations use it? In our experience, for three reasons:

- **The gap between the standard and the system.** The schemas are well documented. Mapping your actual architecture, inherited controls, and shared responsibilities into them is not.
- **The legacy pile.** Years of SSPs, spreadsheets, and policy documents do not convert themselves, and a naive conversion just produces machine-readable versions of the same drift.
- **Ownership.** OSCAL sits between security, compliance, engineering, and procurement. Without a clear owner and a narrow first scope, it becomes a side project that never ships.

None of these are technical blockers. They are scoping, sequencing, and change-management problems.

## Where to start

1. **Pick one system and one baseline.** Not the whole estate. One system that matters, assessed against the framework you already answer to most often.
2. **Model the shared components first.** Identity, logging, encryption, and your cloud platform carry most controls. Describe them once as component definitions.
3. **Build the SSP from references, not prose.** Let the system plan inherit from components instead of restating them.
4. **Validate in the pipeline.** Run schema and content checks on every change, the same way you test code.
5. **Connect one evidence source.** Feed one automated control check into assessment results, prove the loop works, then expand.

## How CODACON can help

The standard is free. The hard part is the translation: turning your real systems, inherited controls, and existing paperwork into an OSCAL model your teams will actually maintain, then embedding it in how you build and assess.

That is where we work. We help organizations scope a first OSCAL implementation, model their shared components, convert what is worth keeping from the legacy pile, and wire validation into their delivery pipeline so the model stays true after we leave.

We have already done this end to end for one organization. The engagement is confidential, so we cannot name the client or share their artifacts, but we can walk you through the approach, the pitfalls we hit, and what it would take in your environment. If you are weighing OSCAL, or have started and stalled, [let's talk](/services/).
