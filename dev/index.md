---
layout: default
base_url: "./"
---

## getting started

<div id="intro"></div>

[Explore the Endpoints][Explore the Endpoints]
[Know our Modules][Know our Modules]
[Create new Modules][Create new Modules]

## Latest Announcements
{% for post in site.posts limit 5 %}
<article>
	<a href="{{ post.url }}">
	<time pubdate datetime="{{ post.date }}" class="one columns alpha"><span>{{post.date | date: "%d"}}</span><span>{{post.date | date: "%b"}}</span></time>
	<strong>{{ post.title }}</strong>
	<p>{{post.excerpt}}</p>
</a>
</article>
{% endfor %}

[Explore the Endpoints]: /dev/api/
[Know our Modules]: /dev/sub-projects/
[Create new Modules]: /dev/tutorials/create-your-own-application/