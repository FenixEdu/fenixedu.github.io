---
layout: default
breadcrumbs: [{ "text": "Blog", "url": "/blog" }]
root: "../"
title: Blog
---

## Blog Entries

{% for post in site.posts %}
<article>
	<a href="{{ post.url }}">
	<time pubdate datetime="{{ post.date }}" class="one columns alpha"><span>{{post.date | date: "%d"}}</span><span>{{post.date | date: "%b"}}</span></time>
	<strong>{{ post.title }}</strong>
	<p>{{post.excerpt}}</p>
</a>
</article>
{% endfor %}