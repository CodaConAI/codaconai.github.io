---
title: "From Fragmented IAM to Auditable Identity Governance"
description: "Converting fragmented AWS Identity Center configuration into auditable, policy-driven infrastructure using infrastructure as code and automated compliance checks."
date: 2025-07-20
tags:
  - identity-governance
  - cloud-security
draft: true
context: "A mid-size organization managing multiple AWS accounts through AWS Identity Center (SSO). Permission sets and account assignments had accumulated through manual console operations over two years."
stakes: "Upcoming SOC 2 audit required demonstrable access governance. The organization could not produce a clear answer to 'who has access to what, and why' across their AWS environment."
constraints: "No dedicated platform engineering team. Changes had to be non-disruptive to active workloads. The existing permission structure contained undocumented exceptions that business units depended on."
---

## Intervention

We began with a complete extraction of the existing AWS Identity Center configuration — every permission set, account assignment, and inline policy — into structured data. This produced the first accurate map of actual access across the organization.

The extraction revealed several patterns:

- Permission sets created for specific projects that had since ended, still assigned to active users
- Duplicate permission sets with nearly identical policies, assigned to overlapping groups
- Inline policy exceptions that had been applied to work around missing managed policies, undocumented

We designed a Terraform-based management layer that codified the entire Identity Center configuration as infrastructure as code. Each permission set became a versioned, reviewable resource. Account assignments moved from console click-ops to pull request workflows.

The migration was staged: we ran the new Terraform state in parallel with the existing configuration, validating that the codified version produced identical access grants before cutting over. Each migration batch was scoped to a business unit, with explicit sign-off from the unit's technical lead.

We implemented automated policy checks that run on every proposed change:

- No permission set can grant `*:*` without an explicit, documented exception
- Account assignments require a linked business justification (tracked as a Terraform variable with a comment field)
- Changes to high-privilege permission sets trigger a secondary approval workflow
- Drift detection runs daily and alerts on any manual console changes

## Result

The organization entered their SOC 2 audit with a complete, version-controlled record of identity governance. Every access grant was traceable to a pull request with a reviewer, a timestamp, and a stated business reason.

Manual access changes — the primary source of access sprawl — became immediately visible through drift detection rather than discovered during periodic reviews.

The permission set count was reduced through consolidation of duplicates and removal of stale project-specific sets. The remaining sets each had a defined owner and review cadence.

## What became reusable

The Terraform module structure we built — extraction scripts, permission set templates, automated policy checks, drift detection — was designed for reuse. The organization applied the same approach to a second AWS Organization they administered, completing the migration in a fraction of the original time because the patterns and tooling were already proven.

The policy check framework extended beyond Identity Center: the same PR-based review and automated validation pattern was adopted for their broader infrastructure-as-code workflow.
