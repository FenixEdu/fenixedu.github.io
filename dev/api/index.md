---
layout: default
breadcrumbs: [{ "text": "API", "url": "/dev/api"}]
root: "../"
---

## API Endpoints

This page essentially lists all the existing endpoints, as well as examples when making invocations.

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
* [PUT /person/evaluations/{id}](#toc_16)
* [GET /person/payments](#toc_17)
* [GET /spaces](#toc_18)
* [GET /spaces/{id}](#toc_19)


### GET /about

This endpoint returns the RSS links to retrieve information about the university where the FenixEdu system is deployed.

{% highlight json %}
{
	"newsRss": "http://www.ist.utl.pt/pt/noticias/rss",
	"eventsRss": "http://www.ist.utl.pt/pt/eventos/rss"
}
{% endhighlight %}


### GET /courses/{id}

This endpoint shows detailed information about the course.

{% highlight json %}
{
	"acronym": "FInd3",
	"name": "Frio Industrial",
	"evaluation": "1 trabalho de grupo, com avaliação individual por etapas (intermédia e final) ",
	"year": "2013/2014",
	"semester": 1,
	"numberOfStudents": 123,
	"announcementLink": "https://fenix.ist.utl.pt/external/announcementsRSS.do?announcementBoardId=399433518324",
	"summaryLink": "https://fenix.ist.utl.pt/publico/summariesRSS.do?id=1610612925565",
	"moreInfo": [
		{
			"program": "",
			"bibliographicReferences": [
				{
					"author": "Roriz L. et al",
					"reference": "Ed. Orion ",
					"title": "Climatização: concepção, instalação e condução de sistemas",
					"year": "2006",
					"type": "MAIN",
					"url": null
				}
			],
			"degrees": [
				{
					"id": "2761663977513",
					"name": "Mestrado Bolonha em Engenharia e Gestão da Energia",
					"acronym": "FInd"
				}
			]
		}
	],
	"teachers": [ 
		{
			"name": "John Doe",
			"istId": "ist112345",
			"mails": [
				"john.doe@ist.utl.pt"
			],
			"urls": [
				"http://web.ist.utl.pt/ist112345/"
			]
		}
	]
}
{% endhighlight %}

### GET /courses/{id}/evaluations

This endpoint returns the information about the written evaluation.

{% highlight json %}
[
	{
		"type": "TEST",
		"name": "Teste 1º Teste",
		"day": "26/10/2013",
		"beginningTime": "09:00",
		"endTime": "11:00",
		"isEnrolmentPeriod": false,
		"enrollmentBeginDay": null,
		"enrollmentBeginTime": null,
		"enrollmentEndDay": null,
		"enrollmentEndTime": null,
		"rooms": [
			{
				"id": "2448131362251",
				"name": "C01 - sala de aula",
				"description": "C01 - Pavilhão Central (Alameda) [80,84]"
			},
			{
				"id": "2448131362449",
				"name": "C11 - Sala aula",
				"description": "C11 - Pavilhão Central (Alameda) [58,29]"
			}
		]
	}
]

{% endhighlight %}


### GET /courses/{id}/groups

This endpoint returns course groups' information. 

{% highlight json %}
{% endhighlight %}


### GET /courses/{id}/schedule

This endpoint returns a course schedule's information.

{% highlight json %}
{
	"name": "Fundamentos da Programação",
	"year": "2013/2014",
	"semester": 1,
	"periods": [
		{
			"start": "16/09/2013",
			"end": "20/12/2013"
		}
	],
	"lessons": [
		{
			"weekDay": "MONDAY",
			"lessonType": "PB",
			"start": "12:30",
			"end": "14:00",
			"room": {
				"id": "2448131363640",
				"name": "F8 - Sala aula",
				"description": "F8 - Pavilhão de Informática III (Alameda) [54,27]"
			}
		}
	]
}
{% endhighlight %}


### GET /courses/{id}/students

This endpoint returns the course student's information.

{% highlight json %}
{
	"enrolmentNumber": 123,
	"name": "Fundamentos da Programação",
	"semester": 1,
	"year": "1ºSemestre",
	"students": [
		{
			"number": 12345,
			"name": "John Doe",
			"degree": "LEIC-A 2006",
			"degreeId": "2761663971474",
			"evaluations": [ ]
		}
	]
}
{% endhighlight %}


### GET /degrees

This endpoint returns the information for all degrees.

{% highlight json %}
[
	{
		"year": "2013/2014",
		"id": "2761663977513",
		"name": "Mestrado Bolonha em Engenharia e Gestão da Energia",
		"type": "BOLONHA_MASTER_DEGREE",
		"acronym": "MEGE",
		"typeName": "Mestrado",
		"campus": [
			"Alameda"
		],
		"info": {
			"description": "",
			"objectives": "",
			"designFor": "",
			"requisites": "",
			"profissionalExits": "",
			"history": "",
			"operationRegime": "",
			"gratuity": "",
			"links": ""
		},
		"teachers": [
			{
				"name": "John Doe",
				"istId": "ist11234",
				"mails": [
					"foo@ist.utl.pt",
					"bar@ist.utl.pt"
				],
				"urls": [
	 
				]
			}
		]	
	}
]
{% endhighlight %}

### GET /degrees/{id}

This endpoint returns the information for the {id} degree.

{% highlight json %}
{
	"year": "2013/2014",
	"id": "2761663977513",
	"name": "Mestrado Bolonha em Engenharia e Gestão da Energia",
	"type": "BOLONHA_MASTER_DEGREE",
	"acronym": "MEGE",
	"typeName": "Mestrado",
	"campus": [
		"Alameda"
	],
	"info": {
		"description": "",
		"objectives": "",
		"designFor": "",
		"requisites": "",
		"profissionalExits": "",
		"history": "",
		"operationRegime": "",
		"gratuity": "",
		"links": ""
	},
	"teachers": [
		{
			"name": "John Doe",
			"istId": "ist11234",
			"mails": [
				"foo@ist.utl.pt",
				"bar@ist.utl.pt"
			],
			"urls": [

			]
		}
	]	
}

{% endhighlight %}

### GET /degrees/{id}/courses

This endpoint returns the informations for a degree's courses.

{% highlight json %}
[
	{
		"acronym": "FInd3",
		"credits": "4.5",
		"name": "Frio Industrial",
		"id": "1610612925565",
		"ecYear": "2013/2014",
		"sem": "1ºSemestre"
	},
	{
		"acronym": "MFC3",
		"credits": "6.0",
		"name": "Mecânica de Fluídos Computacional",
		"id": "1610612925545",
		"ecYear": "2013/2014",
		"sem": "1ºSemestre"
	}
]
{% endhighlight %}
### GET /person

This endpoint allows to access the current person information.

{% highlight json %}
{
	"campus": "Alameda",
	"roles": [
		{
			"type": "TEACHER",
			"department": "Departamento de Engenharia Informática (DEI)"
		},
		{
			"type": "STUDENT",
			"degrees": [
				"Mestrado Bolonha em Engenharia Informática e de Computadores - Alameda"
			]
		},
		{
			"type": "ALUMNI"
		}
	],
	"photo": null,
	"name": "John Doe",
	"istId": "ist112345",
	"email": "john.doe@ist.utl.pt",
	"personalEmails": [
		"john.doe@ist.utl.pt"
	],
	"workEmails": [ ],
	"webAddresses": [ 
		"http://web.ist.utl.pt/ist112345/"		
	],
	"workWebAddresses": [
		"http://web.ist.utl.pt/ist112345/"	
	]
}
{% endhighlight %}


### GET /person/calendar/classes

This endpoint returns the user's class information. To retrieve this information in iCalendar format, the URL must contain "?format=calendar". Eg: "http://fenix.ist.utl.pt/api/fenix/v1/person/calendar/classes?format=calendar"

{% highlight json %}
{
	"year": "2013/2014",
	"events": [
		{
			"startDay": "18/09/2013",
			"endDay": "18/09/2013",
			"startTime": "17:30",
			"endTime": "19:00",
			"location": "F4",
			"title": "Gestão : Problemas",
			"url": "https://fenix.ist.utl.pt/disciplinas/ges5/2013-2014/1-semestre",
			"note": null,
			"isAllDay": false
		},
		{
			"startDay": "28/10/2013",
			"endDay": "28/10/2013",
			"startTime": "14:30",
			"endTime": "15:30",
			"location": "QA02.4",
			"title": "Análise Complexa e Equações Diferenciais : Teórica",
			"url": "https://fenix.ist.utl.pt/disciplinas/aced42/2013-2014/1-semestre",
			"note": null,
			"isAllDay": false
		}
	]
}
{% endhighlight %}

### GET /person/calendar/evaluations

This endpoint returns the students's evaluations information. To retrieve this information in iCalendar format, the URL must contain "?format=calendar". Eg: "http://fenix.ist.utl.pt/api/fenix/v1/person/calendar/evaluations?format=calendar"

{% highlight json %}
{
	"year": "2013/2014",
	"events": [
		{
			"startDay": "04/10/2013",
			"endDay": "04/10/2013",
			"startTime": "00:57",
			"endTime": "01:57",
			"location": "Sistema Fénix",
			"title": "Inicio das inscrições para 2º Teste : Análise Complexa e Equações Diferenciais",
			"url": "https://fenix.ist.utl.pt/privado",
			"note": null,
			"isAllDay": false
		},
		{
			"startDay": "06/11/2013",
			"endDay": "06/11/2013",
			"startTime": "19:00",
			"endTime": "21:00",
			"location": "C01; C9; GA1; GA3; C13; C12; C11; C10; GA4; GA5",
			"title": "1º Teste : Gestão",
			"url": "https://fenix.ist.utl.pt/disciplinas/ges5/2013-2014/1-semestre",
			"note": null,
			"isAllDay": false
		}
	]
}
{% endhighlight %}

### GET /person/courses

This endpoint returns the user's course information.

{% highlight json %}
{
	"year": "2013/2014",
	"semester": 1,
	"enrolments": [
		{
			"id": "1610612926309",
			"acronym": "IAC4",
			"name": "Introdução à Arquitetura de Computadores",
			"grade": null
		},
		{
			"id": "1610612925989",
			"acronym": "Ges5",
			"name": "Gestão",
			"grade": null
		}
	],
	"teaching": [
		{
			"id": "1610612926363",
			"acronym": "SE2",
			"name": "Sistemas Entre-Pares e Redes Sobrepostas"
		}
	]
}
{% endhighlight %}

### GET /person/evaluations

This endpoint returns the student's written evaluation information.

{% highlight json %}
[
	{
		"name": "Teste 2º Teste",
		"type": "Teste",
		"id": "2512556533022",
		"isEnrollmentPeriod": true,
		"day": "21/12/2013",
		"startHour": "11:00",
		"endHour": "12:30",
		"rooms": "Q01 C01 C9 C13 C12 C11 QA02.1 QA02.2 QA02.3 QA02.4 QA ",
		"enrollmentBeginDay": "04/10/2013",
		"enrollmentEndDay": "21/12/2013",
		"isEnrolled": false,
		"course": "Análise Complexa e Equações Diferenciais"
	},
	{
		"name": "Teste 1º Teste",
		"type": "Teste",
		"id": "2512556532840",
		"isEnrollmentPeriod": false,
		"day": "02/11/2013",
		"startHour": "11:00",
		"endHour": "12:30",
		"rooms": "Q01 C01 C9 C13 C12 C11 QA02.1 QA02.2 QA02.3 QA02.4 QA ",
		"enrollmentBeginDay": "19/09/2013",
		"enrollmentEndDay": "01/11/2013",
		"isEnrolled": false,
		"course": "Análise Complexa e Equações Diferenciais"
	}
]
{% endhighlight %}

### PUT /person/evaluations/{id}

This endpoint allows the student to enroll or disenroll from a written evaluation. Eg: "http://fenix.ist.utl.pt/api/fenix/v1/person/evaluations/2512556533022?enrol=yes", enrolls the student and returns the written evaluations.
{% highlight json %}
[
	{
		"name": "Teste 2º Teste",
		"type": "Teste",
		"id": "2512556533022",
		"isEnrollmentPeriod": true,
		"day": "21/12/2013",
		"startHour": "11:00",
		"endHour": "12:30",
		"rooms": "Q01 C01 C9 C13 C12 C11 QA02.1 QA02.2 QA02.3 QA02.4 QA ",
		"enrollmentBeginDay": "04/10/2013",
		"enrollmentEndDay": "21/12/2013",
		"isEnrolled": true,
		"course": "Análise Complexa e Equações Diferenciais"
	},
	{
		"name": "Teste 1º Teste",
		"type": "Teste",
		"id": "2512556532840",
		"isEnrollmentPeriod": false,
		"day": "02/11/2013",
		"startHour": "11:00",
		"endHour": "12:30",
		"rooms": "Q01 C01 C9 C13 C12 C11 QA02.1 QA02.2 QA02.3 QA02.4 QA ",
		"enrollmentBeginDay": "19/09/2013",
		"enrollmentEndDay": "01/11/2013",
		"isEnrolled": false,
		"course": "Análise Complexa e Equações Diferenciais"
	}
]
{% endhighlight %}

### GET /person/payments

This endpoint returns user's payments information.

{% highlight json %}
{
	"payed": [
		{
			"amount": "12.34",
			"name": "CASH",
			"description": "Taxa de Secretaria e Seguro - 2012/2013",
			"date": "30/12/2002"
		}
	],
	"notPayed": [
		{
			"description": "Propina",
			"startDate": "13/09/2013",
			"endDate": "31/12/2013",
			"entity": "12345",
			"reference": "111 222 333",
			"amount": "1234.56"
		}
	]
}
{% endhighlight %}

### GET /spaces

This endpoint returns the information about the campi.
 
{% highlight json %}
[
	{
		"id": "2465311230082",
		"name": "Taguspark",
		"type": "CAMPUS"
	},
	{
		"id": "2465311230081",
		"name": "Alameda",
		"type": "CAMPUS"
	}
]
{% endhighlight %}


### GET /spaces/{id}

This endpoint returns information about the space for a given {id}, its contained and parent spaces. The {id} can be for any of these types: "CAMPUS", "BUILDING", "FLOOR" or "ROOM".

{% highlight json %}
{
	"id": "2972117371186",
	"name": "Torre Sul",
	"type": "BUILDING",
	"containedSpaces": [
		{
			"id": "2723009268034",
			"name": "12",
			"type": "FLOOR"
		},
		{
			"id": "2723009268033",
			"name": "11",
			"type": "FLOOR"
		}
	],
	"parentSpace": {
		"id": "2465311230081",
		"name": "Alameda",
		"type": "CAMPUS"
	}
}
{% endhighlight %}
