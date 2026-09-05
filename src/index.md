---
layout: base.njk
title: "CODACON — AI Security Consulting & Product Engineering"
description: "CODACON Inc. delivers AI-driven security consulting, incident response, secure SDLC, and board advisory for organizations building with AI."
key: home
signalField: full
---

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "CODACON Inc.",
  "url": "https://codacon.ai",
  "logo": "https://codacon.ai/img/logo.svg",
  "image": "https://codacon.ai/img/og-en.jpg",
  "description": "AI security consulting and product engineering firm specializing in incident response, secure SDLC, cloud security, board advisory, and executive coaching.",
  "foundingDate": "2024",
  "founder": {
    "@type": "Person",
    "name": "David Côté"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "email": "hello@codacon.ai",
    "contactType": "sales",
    "availableLanguage": ["en", "fr"]
  }
}
</script>

<section class="hero">
<div class="hero-copy">
<p class="eyebrow">AI security consulting</p>
<h1>AI security for leaders who have to answer for it.</h1>
<p class="lede">Incident response, secure SDLC, and board advisory from a practitioner who has done the work. Based in Quebec, working in English and French.</p>
<p class="actions"><a class="button" href="https://calendar.app.google/imfdaTW4Y1iF9FqUA">Book a 30-minute call</a> <a href="/services/">See services</a></p>
</div>
<figure class="portrait">
<img src="/img/david-cote-320.webp" srcset="/img/david-cote-320.webp 320w, /img/david-cote-640.webp 640w" sizes="(min-width: 640px) 168px, 120px" width="640" height="640" alt="David Côté, founder of CODACON" decoding="async" fetchpriority="high">
<figcaption>David Côté, founder</figcaption>
</figure>
</section>

<ul class="proof">
<li>15+ years architecting and building systems</li>
<li>Experience in regulated environments</li>
<li>Montreal area, on site or remote, EN / FR</li>
</ul>

## AI security, from architecture to the boardroom

CODACON operates at the intersection of AI and security. We help organizations detect threats faster, ship secure software, and make informed decisions about AI risk — from the engineering team to the board.

### What we do

**Incident response** — AI-assisted detection, triage, and response. We integrate AI tooling into your IR workflow so your team catches threats earlier and resolves them faster. Not a managed SOC — we build the capability inside your organization.

**Secure architectures & AI-driven SDLC** — We design and build secure systems for clients who ship software. That means threat modeling, secure-by-default cloud infrastructure on AWS, and an AI-augmented software development lifecycle that catches vulnerabilities before they reach production.

**Board advisory** — AI risk and security posture for leadership. We translate technical risk into business language and help boards set policy that reflects reality, not vendor slide decks.

**Executive coaching** — Private coaching for CTOs, VPs of Engineering and CISOs on leading secure software delivery in the age of AI. [About the program](/services/executive-coaching/).

**Talent** — Recruiting and vetting top practitioners in AI security. The market is thin and full of noise. We know who is real.

### How an engagement runs

1. **Call.** Thirty minutes. You describe the situation; we tell you honestly whether we can help.
2. **Scope.** A written scope with outcomes, timeline and price. No packages, no retainers you did not ask for.
3. **Work.** We work inside your team, with your tools, and leave capability behind.
4. **Handover.** Documentation, a briefing for your leadership, and a clear view of what comes next.

### Why work with us

We are practitioners, not a slide deck consultancy. Our team has shipped production security systems, led incident response at scale, and built AI tooling that works. We are direct, we scope tightly, and we deliver.

[Talk to us](mailto:hello@codacon.ai) about your security posture, AI strategy, or hiring needs.

### From the founder

I started CODACON after fifteen-plus years architecting and building systems, much of it in regulated environments. I watched security teams fall behind AI adoption inside their own companies, and I watched boards ask questions nobody in the room could answer. CODACON exists to close that gap, one organization at a time.

If you are building with AI and thinking about security, or thinking about AI and worried about security, we should talk.

<p class="signature">David Côté, Founder</p>

### From the blog

{% for post in collections.posts | reverse %}
- [{{ post.data.title }}]({{ post.url }}) — {{ post.data.description }}
{% endfor %}
