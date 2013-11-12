---
layout: default
title: FenixEdu™ for Developers
base_url: "./"
---

## getting started

<div id="intro"></div>

[Explore the Endpoints][Endpoints]
[Explore the Modules][Endpoints]
[Create new Endpoints][Endpoints]

## Latest Announcements
{% for post in site.posts %}
<article>
	<a href="{{ post.url }}">
	<time pubdate datetime="{{ post.date }}" class="one columns alpha"><span>{{post.date | date: "%d"}}</span><span>{{post.date | date: "%b"}}</span></time>
	<strong>{{ post.title }}</strong>
	<p>We have the pleasure to announce that we are hosting the first edition of FenixEdu™ Ignition, an hackaton event where we will launch a new service to both user and developer communities. [...]</p>
</a>
</article>
{% endfor %}

[Endpoints]: http://git-scm.com/documentation