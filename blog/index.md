---
layout: default
breadcrumbs: [{ "text": "Blog", "url": "/blog" }]
root: "../"
title: Blog
---
{% for post in site.posts %}
## <a href="{{ post.url }}">{{ post.title }}</a>
{% endfor %}
