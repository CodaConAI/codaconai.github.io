---
title: "The AI pilot is not the product: what production readiness actually requires"
description: "Most AI pilots succeed. Most AI production deployments do not. The gap is not technology — it is everything around the technology that a pilot never tests."
date: 2025-07-25
tags:
  - ai-security
  - sdlc
draft: true
crosspost: true
---

Every week, another organization announces a successful AI pilot. A model that summarizes contracts faster than a paralegal. A pipeline that triages support tickets with high accuracy. A copilot that drafts compliance reports from raw audit data.

The pilot works. Leadership is enthusiastic. The project gets funded for production.

And then it stalls.

## The pilot-to-production gap

The gap between a working pilot and a production system is not primarily technical. The model that performed well in a controlled setting will often perform well enough in production, too. What fails is everything around it:

- **Data governance.** The pilot used a curated dataset. Production means live data — with PII, with stale records, with edge cases the pilot never saw. Who owns the data pipeline? What happens when input quality degrades?

- **Security posture.** The pilot ran in a sandbox. Production means network exposure, API keys in CI/CD, prompt injection vectors, and model outputs that touch downstream systems. Was the pilot threat-modeled? Almost never.

- **Operational ownership.** The pilot was run by a project team. Production needs an on-call rotation, runbooks, alerting thresholds, and a clear answer to "who gets paged when this breaks at 2 AM?"

- **Accountability structure.** The pilot had a sponsor. Production needs a decision framework: when does the system's output get overridden? Who approves changes to the model or its prompts? What is the rollback plan?

- **Compliance and audit.** The pilot was exempt from scrutiny. Production means demonstrating to auditors, regulators, or clients that the system does what you claim and nothing you have not authorized.

## What production readiness actually looks like

<!-- TODO: Expand each of these sections with concrete guidance and examples from practice. -->

### Architecture review against production constraints

### Threat model for the AI system specifically

### Data pipeline governance

### Operational readiness — monitoring, alerting, runbooks

### Accountability framework — human oversight and override

### Compliance mapping — what controls apply and how you demonstrate them

## The compounding problem

Organizations that skip these steps do not just risk one failed deployment. They establish a pattern: pilot, celebrate, stall, abandon. Each abandoned production attempt makes the next one harder to fund and harder to staff.

The alternative is slower but compounds: treat the pilot-to-production transition as its own workstream, staff it with people who have done it before, and build the operational scaffold before — not after — you commit to production.

The pilot is not the product. The production system is.
