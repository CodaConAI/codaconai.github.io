---
layout: base.njk
metaTitle: "Security Policy — CODACON"
title: "Security"
description: "CODACON security practices and responsible disclosure policy. How to report security vulnerabilities."
permalink: /security/
narrowLayout: true
---

<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://codacon.ai"},
    {"@type": "ListItem", "position": 2, "name": "Security", "item": "https://codacon.ai/security/"}
  ]
}
</script>

## Security

CODACON is a security consultancy. We hold ourselves to the same standards we apply to client work.

### Our practices

**This website** is a static site hosted on GitHub Pages. It contains no server-side code, no databases, no user authentication, and no client-side JavaScript. The attack surface is minimal by design.

**Client engagements** are governed by engagement-specific security controls, including access management, data handling procedures, and incident response protocols defined in each engagement agreement.

**Source code** for this website is publicly available on [GitHub](https://github.com/CodaConAI/codaconai.github.io). We welcome review.

### Responsible Disclosure

If you discover a security vulnerability in any CODACON system, website, or open-source project, we ask that you report it responsibly.

**How to report:**

1. Email [security@codacon.net](mailto:security@codacon.net) with a description of the vulnerability
2. Include steps to reproduce, if possible
3. Do not publicly disclose the vulnerability until we have had a reasonable opportunity to address it

<!-- TODO: Set up security@codacon.net as an alias or distribution. Confirm PGP key
     for encrypted submissions, and update security.txt accordingly. -->

**What to expect:**

- We will acknowledge your report within 3 business days
- We will provide an initial assessment within 10 business days
- We will keep you informed of remediation progress
- We will credit reporters in our advisory (unless you prefer anonymity)

**Scope:**

- codacon.ai and all subdomains
- Open-source projects under the [CodaConAI GitHub organization](https://github.com/CodaConAI)
- Any CODACON-operated service or infrastructure

**Out of scope:**

- Social engineering or phishing attacks against CODACON personnel
- Denial of service attacks
- Vulnerabilities in third-party services we use but do not operate

### security.txt

Our [security.txt](/.well-known/security.txt) file follows the [RFC 9116](https://www.rfc-editor.org/rfc/rfc9116) standard and is available at `/.well-known/security.txt`.

### Contact

For security matters: [security@codacon.net](mailto:security@codacon.net)
For general inquiries: [contact@codacon.net](mailto:contact@codacon.net)
