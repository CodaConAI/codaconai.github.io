---
layout: base.njk
title: "Blog — CODACON"
description: "Practical writing on AI security, incident response, secure SDLC, and AI risk governance from the CODACON team."
permalink: /blog/
---

## Blog

{% for post in collections.posts | reverse %}
### [{{ post.data.title }}]({{ post.url }})

<time datetime="{{ post.date | dateISO }}">{{ post.date | dateDisplay }}</time>

{{ post.data.description }}

{% endfor %}
