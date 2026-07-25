---
title: "AI governance that engineers can execute"
description: "Most AI governance frameworks are written for boards and filed in shared drives. The ones that work are written so engineers can implement them as testable controls."
date: 2025-07-25
tags:
  - ai-security
  - sdlc
draft: true
crosspost: true
---

AI governance has a credibility problem with engineering teams.

The typical governance framework arrives as a PDF — written by a consultancy, approved by a committee, filed in a shared drive. It describes principles, roles, and review processes in language that reads well in a board presentation and means almost nothing in a pull request.

Engineers look at it, note the absence of anything they can `grep` for in a codebase, and carry on shipping.

This is not an engineering culture problem. It is a governance design problem.

## What goes wrong

The failure mode is consistent:

1. An organization adopts an AI governance framework (internal or borrowed from a standard body)
2. The framework defines high-level policies — fairness, transparency, accountability, risk management
3. Nobody translates these policies into controls that apply to specific systems
4. The engineering team builds and deploys AI systems that may or may not comply with the stated policies
5. Compliance discovers the gap during an audit or, worse, after an incident

The root cause: the framework was designed to be read by reviewers, not executed by builders.

## Governance that executes

<!-- TODO: Expand each section with concrete examples, code samples, and patterns from practice. -->

### Policies as testable assertions

A governance policy is useful to an engineering team when it can be expressed as a testable assertion against a system. "AI systems must not process personal information without a documented legal basis" is a policy. "Every AI pipeline config must include a `data_classification` field that maps to an approved legal basis in the governance registry" is a control.

### Version-controlled governance artifacts

### Automated compliance checks in CI/CD

### Accountability as code — ownership, review, and escalation

### Bridging the board-to-build gap

## Getting started

The most practical starting point is not a new framework. It is taking your existing governance commitments — whatever they are — and asking: "Can an engineer implement this as a check that runs in CI?"

If the answer is no, the governance framework needs revision before the engineering team needs training.
