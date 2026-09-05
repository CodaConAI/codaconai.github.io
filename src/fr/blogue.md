---
layout: base.njk
title: "Blogue — CODACON"
description: "Textes pratiques sur la gouvernance du risque lié à l’IA, le SDLC sécurisé, la réponse aux incidents et la sécurité de l’IA, par l’équipe CODACON."
permalink: /fr/blogue/
key: blog
---

# Blogue

{% for post in collections.postsFr %}
## [{{ post.data.title }}]({{ post.url }})

<time datetime="{{ post.date | dateISO }}">{{ post.date | dateDisplay(lang) }}</time>

{{ post.data.description }}

{% endfor %}
