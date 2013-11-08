---
layout: default
slug: api
breadcrumbs: [{ "text": "API", "url": "/api"}]
root: "../"
---

## API Endpoints

This page essentially lists all the existing endpoints, as well examples when making invocations.

### Enpoints
* [GET /about](#toc_2)
* [GET /courses/{id}](#toc_3)
* [GET /courses/{id}/evaluations](#toc_4)
* [GET /courses/{id}/groups](#toc_5)
* [GET /courses/{id}/schedule](#toc_6)
* [GET /courses/{id}/students](#toc_7)
* [GET /degrees](#toc_8)
* [GET /degrees/{id}](#toc_9)
* [GET /degrees/{id}/courses](#toc_10)
* [GET /person](#toc_11)
* [GET /person/calendar/classes](#toc_12)
* [GET /person/calendar/evaluations](#toc_13)
* [GET /person/courses](#toc_14)
* [GET /person/evaluations](#toc_15)
* [GET /person/payments](#toc_16)
* [GET /spaces](#toc_17)
* [GET /spaces/{id}](#toc_18)


### GET /about

This endpoint returns generic information about the university where the FenixEdu system is deployed.

{% highlight json %}
{
	"acronym": "MEIC",
	"name": "Mestrado em Engenharia Informática e de Computadores",
	"announcementLink": "http://link",
	"year": "2012",
	"summaryLink": "blah",
	"numberOfStudents": 1412,
	"moreInfo": [
		{
			"program": "",
			"degrees": [
				{
					"id": "234123424",
					"acronym": "efadgdsf",
					"name": "Mestrado"
				}
			]
		}
	]
}
{% endhighlight %}




### GET /courses/{id}

Show detailed information about the course

{% highlight json %}
{
	"acronym": "MEIC",
	"name": "Mestrado em Engenharia Informática e de Computadores",
	"announcementLink": "http://link",
	"year": "2012",
	"summaryLink": "blah",
	"numberOfStudents": 1412,
	"moreInfo": [
		{
			"program": "",
			"degrees": [
				{
					"id": "234123424",
					"acronym": "efadgdsf",
					"name": "Mestrado"
				}
			]
		}
	]
}
{% endhighlight %}



### GET /courses/{id}/evaluations


### GET /courses/{id}/groups



### GET /courses/{id}/schedule


### GET /courses/{id}/students



### GET /degrees




### GET /degrees/{id}


### GET /degrees/{id}/courses



### GET /person

This endpoint allows to access the current person information.

{% highlight json %}
{
	"name": "John Doe",
	"email": "john@doe.com",
	"website": "http://fenixedu.org"
}
{% endhighlight %}


### GET /person/calendar/classes



### GET /person/calendar/evaluations



### GET /person/courses


### GET /person/evaluations



### GET /person/payments



### GET /spaces



### GET /spaces/{id}

