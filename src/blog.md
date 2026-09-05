---
layout: base.njk
title: "Blog — CODACON"
description: "Practical writing on AI risk governance, secure SDLC, incident response, and AI security from the CODACON team."
permalink: /blog/
key: blog
---

## Blog

{% for post in collections.posts | reverse %}
### [{{ post.data.title }}]({{ post.url }})

<time datetime="{{ post.date | dateISO }}">{{ post.date | dateDisplay(lang) }}</time>

{{ post.data.description }}

{% endfor %}
