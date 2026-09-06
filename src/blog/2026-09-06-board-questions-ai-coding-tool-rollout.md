---
title: "What Should a Board Ask Before Approving an AI Coding Tool Rollout?"
description: "Seven questions directors should ask before approving an AI coding tool rollout: evidence of value, bounded access, accountability, and stop conditions."
date: 2026-09-06
tags:
  - board-advisory
  - ai-security
  - sdlc
crosspost: true
---

Vendor demos show how fast AI can write code. The proposal in front of the board should show what happens when that code is wrong.

Before approving an AI coding tool rollout, directors need more than a productivity promise. They need evidence of value, clear limits on access, and someone accountable for stopping the rollout if those limits fail.

Here are the questions that turn an impressive demo into a defensible decision.

## Where the board's job starts and stops

A board does not approve every developer tool. It governs material exposure and delegated authority. An AI coding tool crosses that line when it can read source code, hold secrets, or change production systems. Management owns implementation. The board owns the conditions for proceeding.

We frame the questions using the [NIST AI Risk Management Framework 1.0](https://www.nist.gov/itl/ai-risk-management-framework) (Govern, Map, Measure, Manage), its [Generative AI Profile, NIST AI 600-1](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf), for AI-specific risks, and the [Secure Software Development Framework, SP 800-218](https://csrc.nist.gov/pubs/sp/800/218/final), for software assurance. NIST describes the AI RMF as voluntary. The questions are our application of that guidance, not a NIST checklist, a certification, or a legal requirement.

## 1. What business outcome are we buying, and how will we prove it?

**Why it matters.** Code volume is not a business outcome. Faster code can also mean more review, defects, and rework. METR's [July 2025 randomized study](https://metr.org/blog/2025-07-10-early-2025-ai-experienced-os-dev-study/) found that 16 experienced open-source developers took 19% longer on 246 tasks when allowed to use early-2025 AI tools, while believing they had been faster. METR cautions against generalizing to other teams or current tools, but the lesson holds: perceived speed is not measured speed.

**Evidence to request.** A baseline taken before the pilot and repeated after: delivery lead time, defect rate, review time per change, rework, and total cost. The AI RMF asks organizations to document expected benefits and costs, including non-monetary ones ([MAP 3.1 and 3.2](https://airc.nist.gov/airmf-resources/airmf/5-sec-core/)).

**Warning sign.** The business case rests on the vendor's productivity figure or on "acceptance rate," the share of suggestions developers kept.

## 2. What can the tool read, retain, transmit, and change?

**Why it matters.** Exposure depends on permissions, not product names. Suggesting code in an editor is one thing. An agent that runs commands, edits repositories, and triggers deployments is another. AI 600-1 (section 2.9) describes indirect prompt injection: instructions hidden in content the AI reads, such as a code comment or a web page, that can cause it to leak data or run malicious code. Autonomy multiplies that risk.

**Evidence to request.** A data map: what source code, secrets, and customer data the tool can access, what the vendor retains and for how long, whether inputs train models, and which subprocessors are involved. A permission map: what the tool can execute, commit, and deploy, and whether a human approves each step. Suggest, execute, and deploy should each carry their own approval conditions.

**Warning sign.** "The vendor doesn't train on our data," with no confirmation that the statement applies to the tier and settings actually purchased.

## 3. What evidence shows our controls work with AI-generated code?

**Why it matters.** The SSDF describes practices for reducing vulnerabilities in released software, limiting their impact, and preventing recurrence. Our position: AI-generated code must pass the same assurance process as any other code. The risk is that volume overwhelms it. AI 600-1 names automation bias, the tendency to defer to machine output, as a risk in its own right (section 2.7).

**Evidence to request.** Pilot results from the company's own repositories and workflows, not a vendor sandbox (MEASURE 2.3). Confirmation that human review, security testing, dependency and licence checks, and build pipeline protection apply to AI-generated changes. Reviewer capacity: changes per reviewer per week, before and after.

**Warning sign.** Approval times fall while change volume rises. That is rubber-stamping, not efficiency.

## 4. Who is accountable when something goes wrong?

**Why it matters.** The AI RMF places responsibility for AI risk decisions with executive leadership (GOVERN 2.3). A rollout owned by "engineering" has no one to call when the tool pushes a credential to a public repository.

**Evidence to request.** A named executive sponsor with documented acceptance of residual risk. A responsibility matrix spanning engineering, security, legal, and procurement. An exception process: who can grant broader access, and who is informed.

**Warning sign.** Accountability is shared, or sits with the champion who selected the tool.

## 5. What vendor and contractual risks are we accepting?

**Why it matters.** The tool is a supply-chain dependency. The AI RMF asks for third-party risk policies, including intellectual property, and contingency plans for third-party failures (GOVERN 6.1 and 6.2). AI 600-1 notes that the legal status of generated content resembling copyrighted work is still debated (section 2.10). Contract terms are the practical answer, and they vary by tier.

**Evidence to request.** A vendor assessment covering confidentiality, intellectual property protections and their limits, incident notification timelines, the vendor's right to change models or terms, and exit arrangements including data deletion. A continuity plan if the service is withdrawn. [SP 800-218A](https://csrc.nist.gov/pubs/sp/800/218/a/final), NIST's profile for building AI models, applies to vendor diligence, not to the company's developers.

**Warning sign.** Legal reviewed the standard terms, but nobody confirmed which apply to the purchased configuration.

## 6. What are the pilot's success criteria and stop conditions?

**Why it matters.** The AI RMF expects mechanisms and assigned responsibility to disengage or deactivate a system behaving inconsistently with its intended use (MANAGE 2.4). A pilot without stop conditions is a rollout with extra steps.

**Evidence to request.** Phased access starting with low-risk repositories and non-production environments. Acceptance thresholds set in advance. Incident triggers that pause the pilot: a credential exposure, a vulnerable change reaching production, a data-handling breach. A tested revocation: someone has turned off access and timed it.

**Warning sign.** Success criteria are written after the pilot, or the stop authority's objectives depend on the rollout.

## 7. What will the board see after approval?

**Why it matters.** Approval starts oversight. The AI RMF calls for post-deployment monitoring, incident response, and change management (MANAGE 4.1).

**Evidence to request.** A one-page quarterly dashboard: outcomes against baseline, adoption by team, defect and rework trends, security incidents involving the tool, control exceptions granted, and exposure changes such as new permissions, model versions, or repositories in scope.

**Warning sign.** The first report covers adoption and satisfaction only.

## Hypothetical example: evidence changes the decision

*Illustrative scenario, not a client case.* A manufacturer's CTO proposes a company-wide rollout of a coding agent, citing a vendor claim of 40% faster delivery. The audit committee asks for question 1 and 3 evidence. A six-week pilot on two internal services shows lead time down 11%, review time per change up 30%, and two vulnerable dependencies caught only after merge. The committee approves suggestion-only mode across engineering, keeps execute permissions with the pilot teams for one more quarter, and requires reviewer capacity and scan coverage in the next report. Same tool, different decision.

## Approval checklist

- Baseline and post-pilot measurements of outcomes and cost
- Data map and permission map, with separate conditions for suggest, execute, and deploy
- Evidence that review, security testing, and pipeline controls cover AI-generated code
- Named executive owner, responsibility matrix, and exception process
- Vendor assessment, contract terms confirmed for the purchased tier, continuity plan
- Written success criteria, incident triggers, and a tested revocation
- Quarterly dashboard format agreed

## Three decisions

**Approve a bounded pilot** when the value case is credible but unproven, and the pilot stays in low-risk environments with stop conditions.

**Approve expansion subject to conditions** when pilot evidence meets the thresholds and the remaining gaps are named, owned, and dated.

**Defer pending evidence** when management cannot yet answer questions 1, 2, or 6. That is not a rejection. It is oversight.

For an independent view on rollout readiness, our [GenAI security readiness assessment](/services/genai-security-readiness/) covers this ground.
