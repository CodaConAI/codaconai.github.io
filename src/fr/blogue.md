---
layout: base.njk
title: "Blogue — CODACON"
description: "Textes pratiques sur la sécurité de l’IA, la réponse aux incidents, le SDLC sécurisé et la gouvernance du risque lié à l’IA, par l’équipe CODACON."
permalink: /fr/blogue/
key: blog
---

## Blogue

{% for post in collections.postsFr | reverse %}
### [{{ post.data.title }}]({{ post.url }})

<time datetime="{{ post.date | dateISO }}">{{ post.date | dateDisplay(lang) }}</time>

{{ post.data.description }}

{% endfor %}
