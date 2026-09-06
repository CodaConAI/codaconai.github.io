---
layout: base.njk
title: "GenAI Security Readiness Assessment — CODACON"
description: "A fixed-scope security, privacy, and sovereignty assessment of your generative AI stack, built for regulated Canadian organizations."
permalink: /services/genai-security-readiness/
key: genai-readiness
---

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "GenAI Security Readiness Assessment",
  "serviceType": "Generative AI security assessment",
  "description": "Security, governance, privacy, identity, and digital sovereignty assessment of generative AI systems for regulated Canadian organizations.",
  "url": "https://codacon.ai/services/genai-security-readiness/",
  "inLanguage": "en",
  "areaServed": {
    "@type": "Country",
    "name": "Canada"
  },
  "audience": {
    "@type": "Audience",
    "audienceType": "Regulated Canadian organizations adopting generative AI"
  },
  "provider": {
    "@type": "Organization",
    "name": "CODACON Inc.",
    "url": "https://codacon.ai",
    "email": "hello@codacon.ai"
  }
}
</script>

# GenAI Security Readiness Assessment

For regulated Canadian organizations adopting generative AI.

Most GenAI programs fail their first security review not because the model is unsafe, but because nobody mapped what the system can reach, who it acts as, and where the data lands. This assessment finds that out before production does.

## Outcome

Identify and prioritize security, governance, privacy, identity, and sovereignty risks before AI reaches production, with each finding tied to an owner, a severity, and a concrete remediation.

You leave with a ranked risk register, an architecture view of your actual AI surface (not the one on the slide), and a remediation plan sequenced so the blocking items land before your go-live date.

## Who this is for

- Financial institutions and insurers under OSFI technology, cyber, and model risk expectations
- Health, education, and public sector organizations handling personal or Protected-B-class information
- Quebec-based organizations with Law 25 obligations, including automated decision disclosure and privacy impact assessments
- Any organization moving a GenAI pilot, RAG system, or agent from proof of concept into a regulated production environment

## What we assess

### AI architecture

We map the real system: models, orchestration, tool surfaces, data flows, trust boundaries, and every path between untrusted input and privileged action.

- End-to-end architecture and trust boundary review
- Shadow AI discovery: unsanctioned models, plugins, and API keys in use
- Failure modes when a model, provider, or tool call misbehaves

### Data exposure

Where your data goes, who can see it, and what a provider retains.

- Training, fine-tuning, and inference data classification
- Prompt and completion retention, logging, and third-party sharing
- Secrets, PII, and regulated data reaching prompts, embeddings, or caches

### Identity and agent permissions

Agents act with credentials. Most act with far too many.

- Identity model for human, service, and agent principals
- Least-privilege review of agent scopes, tokens, and delegated authority
- Confused-deputy and privilege-escalation paths through tool calls
- Human-in-the-loop controls on irreversible or high-value actions

### Prompt injection and tool abuse

Direct and indirect injection is not theoretical once a model can call tools.

- Injection testing across user input, retrieved documents, and tool output
- Tool-invocation guardrails, allow-lists, and argument validation
- Output handling: rendering, code execution, and downstream trust
- Data exfiltration paths via markdown, links, and callback URLs

### RAG security

Retrieval is an authorization problem wearing a search interface.

- Per-document access control enforced at query time, not index time
- Tenant and role isolation across vector stores and embeddings
- Index poisoning and untrusted content in the corpus
- Embedding inversion and metadata leakage

### MCP security

Model Context Protocol servers are new privileged infrastructure.

- Server inventory, provenance, and supply chain review
- Transport, authentication, and token handling between client and server
- Tool description and schema poisoning
- Blast radius of a compromised or malicious MCP server

### Model and provider risk

- Provider security posture, contractual commitments, and subprocessors
- Data residency, retention, and training-use terms
- Model versioning, deprecation, and change management
- Fallback and concentration risk when a provider degrades or exits

### Digital sovereignty

For Canadian organizations this is a board-level question, not a procurement footnote.

- Data residency and cross-border transfer, including lawful access exposure
- Canadian and sovereign hosting options, with the trade-offs stated plainly
- Contractual and technical controls that survive a jurisdictional dispute
- Exit and portability paths off a foreign-controlled provider

### Logging and monitoring

- Prompt, completion, retrieval, and tool-call audit coverage
- Detection for injection attempts, abuse, and anomalous agent behaviour
- Log integrity, retention, and privacy constraints on what you may store
- Evidence sufficient to reconstruct an AI-driven decision after the fact

### AI incident response

- AI-specific scenarios in your IR plan: injection, leakage, model compromise, agent misuse
- Kill switches, rollback, and credential revocation for agents
- Escalation, regulatory notification, and disclosure triggers
- Tabletop exercise against one realistic scenario in your environment

### Governance and guardrails

- Acceptable use, approval gates, and the path from pilot to production
- Model and use case inventory with assigned risk ratings and owners
- Guardrail placement: where enforcement actually sits versus where policy claims it does
- Roles, accountability, and reporting into existing risk committees

## How the engagement runs

Four weeks, fixed scope, no open-ended discovery.

1. **Scoping (week 1).** Systems in scope, regulatory drivers, stakeholders, evidence requests.
2. **Discovery (weeks 1 to 2).** Architecture walkthroughs, configuration and code review, interviews with the teams that built it.
3. **Technical validation (weeks 2 to 3).** Hands-on testing of injection, retrieval authorization, agent permissions, and MCP surfaces against your environment.
4. **Analysis and prioritization (week 3).** Findings rated on exploitability and regulatory impact, then sequenced against your delivery plan.
5. **Readout (week 4).** Technical working session with the build team, plus an executive briefing suitable for a risk committee or board.

## What you get

- Ranked risk register with severity, exploitability, owner, and remediation for every finding
- Architecture and data flow diagrams of the AI surface as it actually exists
- Remediation roadmap split into go-live blockers, 90-day work, and structural changes
- Control mapping against the frameworks your auditors and regulators use
- Executive summary written for a non-technical risk audience
- Recorded readout and a 30-day follow-up call to check remediation progress

## What this is not

We do not sell a scorecard. There is no maturity level, no colour-coded dashboard, and no tooling licence at the end. We also do not gate remediation behind a second engagement: the report is written so your own team can execute it.

## Frameworks we map to

Findings are mapped to the references your auditors already accept: NIST AI Risk Management Framework, ISO/IEC 42001 and 27001, OWASP Top 10 for LLM Applications, MITRE ATLAS, CCCS guidance and ITSG-33 controls, OSFI technology, cyber, and model risk guidance, PIPEDA, and Quebec's Law 25. Federal AI legislation remains unsettled, so we assess against durable control expectations rather than a bill that may not pass in its current form.

<div class="cta">
  <h2>Scope an assessment</h2>
  <p><a href="https://calendar.app.google/imfdaTW4Y1iF9FqUA">Book a 30-minute call</a> to walk through your AI stack and confirm scope, or <a href="mailto:hello@codacon.ai?subject=GenAI%20Security%20Readiness%20Assessment">email us</a>. Related: <a href="/services/">our full services</a>.</p>
</div>
