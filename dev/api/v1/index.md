---
layout: default
breadcrumbs: [{ "text": "API", "url": "/dev/api/v1"}]
root: "../"
---

## V1 API Endpoints

This page essentially lists all the existing endpoints, as well as examples
when making invocations. While it is not the purpose of this page to describe 
the business entities exposed by this API, we will try to explain the meaning 
of each values whenever it is not self-evident. The current API exposes four
central concepts of the FenixEdu platform: people, spaces, degrees and courses.

Here, a space represents a resource such as a campus, a building, a building
level (floor) or a room. A degree represents a set of knowledge offered by a 
school or university, such that when a student completes the associated studies
he/she is eligible for a diploma and is often conferred a corresponding title.
A course is a concrete unit of teaching that typically lasts one academic term.

This documentation is applicable to all FenixEdu installations as of version 
1.2.0. Check your local installation to find out if the API is available. Be 
aware that some institutions may choose to restrict access to the API.


### Public Endpoints
* [GET /about](#toc_2) <i class="icon-lock-open"></i>
* [GET /courses/{id}](#toc_5) <i class="icon-lock-open"></i>
* [GET /courses/{id}/evaluations](#toc_8) <i class="icon-lock-open"></i>
* [GET /courses/{id}/groups](#toc_11) <i class="icon-lock-open"></i>
* [GET /courses/{id}/schedule](#toc_14) <i class="icon-lock-open"></i>
* [GET /courses/{id}/students](#toc_17) <i class="icon-lock-open"></i>
* [GET /degrees](#toc_20) <i class="icon-lock-open"></i>
* [GET /degrees/{id}](#toc_24) <i class="icon-lock-open"></i>
* [GET /degrees/{id}/courses](#toc_28) <i class="icon-lock-open"></i>
* [GET /person](#toc_32)  <i class="icon-lock"></i><i class="icon-user"></i>
* [GET /person/calendar/classes](#toc_35) <i class="icon-lock"></i><i class="icon-calendar"></i>
* [GET /person/calendar/evaluations](#toc_39) <i class="icon-lock"></i><i class="icon-calendar"></i>
* [GET /person/courses](#toc_43) <i class="icon-lock"></i><i class="icon-graduation-cap"></i>
* [GET /person/curriculum](#toc_47) <i class="icon-lock"></i><i class="icon-graduation-cap"></i>
* [GET /person/evaluations](#toc_50) <i class="icon-lock"></i><i class="icon-chart-area"></i>
* [PUT /person/evaluations/{id}](#toc_53) <i class="icon-lock"></i><i class="icon-chart-area"></i>
* [GET /person/payments](#toc_57) <i class="icon-lock"></i><i class="icon-basket"></i>
* [GET /spaces](#toc_60)  <i class="icon-lock-open"></i>
* [GET /spaces/{id}](#toc_63)  <i class="icon-lock-open"></i>


> <span>NOTE</span>
> <i class="icon-lock-open"></i> - Public Endpoint.      
> <i class="icon-lock"></i> - Private Endpoint that requires user authorization.      
> <i class="icon-user"></i> - Public personal information: name, emails, ist-id, photo and webpage.      
> <i class="icon-calendar"></i> - Information about the users's academic schedule and calendar.      
> <i class="icon-graduation-cap"></i> - Curricular information about both enrolling and teaching courses.      
> <i class="icon-chart-area"></i> - Curricular information about both enrolling and teaching courses.      
> <i class="icon-basket"></i> - Information about payments and debt.      



### GET /about

<i class="icon-lock-open"></i>

This endpoint returns some basic information about the institution where the 
application is deployed. It also returns a list of RSS feeds.

#### Example Request
```GET``` http://fenix.ist.utl.pt/api/fenix/v1/about

#### Example Response
{% highlight json %}
{
	"institutionName": "Técnico Lisboa",
	"institutionUrl": "http://tecnico.ulisboa.pt",
	"rssFeeds": [
		{
			"description": "News",
			"uri": "http://tecnico.ulisboa.pt/pt/noticias/rss"
		},
		{
			"description": "Events",
			"uri": "http://tecnico.ulisboa.pt/pt/eventos/rss"
		}
	]
}
{% endhighlight %}


### GET /courses/{id}

<i class="icon-lock-open"></i>

A course is a concrete unit of teaching that typically lasts one academic term.
This endpoint shows some information regarding a particular course. The same
course may be lectured simultaneously in multiple degrees during the same
academic term.

The "moreInfo" field holds curricular information for each set of degrees in
which the course is lectured. Usually this information is the same for all
the associated degrees.

#### Example Request
```GET``` http://fenix.ist.utl.pt/api/fenix/v1/courses/1610612925989

#### Example Response
{% highlight json %}
{
	"acronym": "FInd3",
	"name": "Frio Industrial",
	"academicTerm": "Semester 1 2013/2014",
	"evaluationMethod": "1 trabalho de grupo, com avaliação ...",
	"numberOfAttendingStudents": 123,
	"announcementLink": "https://fenix.ist.utl.pt/rss.do?boardId=123",
	"summaryLink": "https://fenix.ist.utl.pt/publico/rss.do?summaryId=123",
	"moreInfo": [
		{
			"program": "",
			"bibliographicReferences": [
				{
					"author": "Roriz L. et al",
					"reference": "Ed. Orion ",
					"title": "Climatização: concepção, e instalação",
					"year": "2006",
					"type": "MAIN",
					"url": null
				}
			],
			"degrees": [
				{
					"id": "2761663977513",
					"name": "Mestrado em Engenharia e Gestão da Energia",
					"acronym": "MEGE"
				}
			]
		}
	],
	"teachers": [ 
		{
			"name": "John Doe",
			"istId": "ist112345",
			"mails": [ "john.doe@ist.utl.pt" ],
			"urls": [ "http://web.ist.utl.pt/ist112345/" ]
		}
	]
}
{% endhighlight %}

### GET /courses/{id}/evaluations

<i class="icon-lock-open"></i>

An evaluation is a component of a course in which the teacher determines
the extent of the students understanding of the program. Current known
implementations of evaluations are: tests, exams, projects, online tests
and ad-hoc evaluations.

#### Example Request
```GET``` http://fenix.ist.utl.pt/api/fenix/v1/courses/1610612925989/evaluations

#### Example Response
{% highlight json %}
[
	{
		"type": "TEST",
		"name": "Teste 1º Teste",
		"day": "2013-10-26",
		"beginningTime": "09:00",
		"endTime": "11:00",
		"isInEnrolmentPeriod": false,
		"enrollmentPeriod": {
			"start": "2013-10-01 14:25:32",
			"end"  : "2013-10-24 17:52:44"
		},
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

<i class="icon-lock-open"></i>

Groups are used in courses for a wide range of purposes. The most typical are
for creating teams of students for laboratories or projects. Some groups are 
shared among different courses. The enrolment of student groups may be atomic
or individual, and may be restricted to an enrolment period.

#### Example Request
```GET``` http://fenix.ist.utl.pt/api/fenix/v1/courses/1610612925989/groups

#### Example Response
{% highlight json %}
[
	{
		"name": "Projeto de Avaliação de Projetos",
    	"description": "Cada grupo de trabalho tem como objetivo...",
    	"enrolmentPeriod": {
			"start": "2013-10-01 14:25:32",
			"end"  : "2013-10-24 17:52:44"
		},
		"enrolmentPolicy": "ATOMIC",
		"minimumCapacity": 1, "maximumCapacity": 3, "idealCapacity": 2,
		"associatedCourses": [
			{
				"name": "Matemática Computacional",
				"degrees": "MEIC, LERC, MEC",
				"id": "1132132564548"
			},
			{
				"name": "Mecânica Quantica",
				"degrees": "MA, DEIC",
				"id": "1132132564555"
			}
		]
	}
]
{% endhighlight %}


### GET /courses/{id}/schedule

<i class="icon-lock-open"></i>

Each course is lectured during a specific set of intervals. These intervals
make up the lesson period for that course. Each course also has a curricular
load that specifies the time each student will expend with the course. Each 
shift is the possible schedule in which a student should enrol.

#### Example Request
```GET``` http://fenix.ist.utl.pt/api/fenix/v1/courses/1610612925989/schedule

#### Example Response
{% highlight json %}
{
	"lessonPeriods": [
		{ "start": "2014-02-21 00:00:00", "end": "2014-04-12 00:00:00" },
		{ "start": "2014-04-18 00:00:00", "end": "2014-05-29 00:00:00" }
	],
	"courseLoads": [
		{ "type": "TEORICA", "totalQuantity": 42, "unitQuantity": 1.5 },
		{ "type": "LABORATORIAL", "totalQuantity": 30, "unitQuantity": 3 }
	],
	"shifts": [
		{
			"name": "AED2T01",
			"types": [ "TEORICA" ],
			"lessons": [
				{
					"start": "2014-02-21 10:00:00", "end": "2014-02-21 12:00:00",
					"room": { "name": "Ga1", "id": "132115446846" }
				},
				{
					"start": "2014-03-21 10:00:00", "end": "2014-03-21 12:00:00",
					"room": { "name": "Ga1", "id": "132115446846" }
				},
				{
					"start": "2014-05-21 10:00:00", "end": "2014-05-21 12:00:00",
					"room": { "name": "Ga3", "id": "132115446847" }
				}
		] },
		{
			"name": "AED2L03",
			"types": [ "LABORATORIAL" ],
			"lessons": [
				{
					"start": "2014-02-23 10:00:00", "end": "2014-02-23 13:00:00",
					"room": { "name": "F1", "id": "132115446844" }
				},
				{
					"start": "2014-03-23 10:00:00", "end": "2014-03-23 13:00:00",
					"room": { "name": "F2", "id": "132115446843" }
				},
				{
					"start": "2014-05-23 10:00:00", "end": "2014-05-23 13:00:00",
					"room": { "name": "F1", "id": "132115446844" }
				}
		] }
	]
}
{% endhighlight %}


### GET /courses/{id}/students

<i class="icon-lock-open"></i>

This endpoint lists all the students attending the specified course. For each
student it indicates the corresponding degree. The endpoint also returns the
number of students officially enroled in the course.

#### Example Request
```GET``` http://fenix.ist.utl.pt/api/fenix/v1/courses/1610612925989/students

#### Example Response
{% highlight json %}
{
	"enrolmentCount": 32,
	"attendingCount": 41,
	"students": [
		{ "username": "ist1234", "degree": "MEIC", "degreeId": "1312323155" },
		{ "username": "ist1235", "degree": "MEIC", "degreeId": "1312323155" },
		{ "username": "ist1236", "degree": "MA", "degreeId": "1312323153" },
		{ "username": "ist1237", "degree": "MEQ", "degreeId": "1312323152" },
		{ "username": "ist1238", "degree": "MEIC", "degreeId": "1312323155" }
	]
}
{% endhighlight %}


### GET /degrees

<i class="icon-lock-open"></i>

This endpoint returns the information for all degrees.

#### Query Parameters
**year** - "yyyy/yyyy"    

#### Example Request
```GET``` http://fenix.ist.utl.pt/api/fenix/v1/degrees?year=2013/2014

#### Example Response
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

<i class="icon-lock-open"></i>

This endpoint returns the information for the {id} degree.

#### Query Parameters
**year** - "yyyy/yyyy"    

#### Example Request
```GET``` http://fenix.ist.utl.pt/api/fenix/v1/degrees/2761663977513?year=2013/2014

#### Example Response
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

<i class="icon-lock-open"></i>

This endpoint returns the informations for a degree's courses.

#### Query Parameters
**year** - "yyyy/yyyy"    

#### Example Request
```GET``` http://fenix.ist.utl.pt/api/fenix/v1/degrees/2761663977513/courses?year=2013/2014

#### Example Response
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

<i class="icon-lock"></i><i class="icon-user"></i>

This endpoint allows to access the current person information.

#### Example Request
```GET``` http://fenix.ist.utl.pt/api/fenix/v1/person

#### Example Response
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

<i class="icon-lock"></i><i class="icon-schedule"></i>

This endpoint returns the user's class information. This information can be retrieved both in iCalendar and JSON formats.

#### Query Parameters

**format** - "calendar" or "json"

#### Example Request
```GET``` http://fenix.ist.utl.pt/api/fenix/v1/person/calendar/classes?format=json

#### Example Response
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

<i class="icon-lock"></i><i class="icon-graduation-cap"></i>

This endpoint returns the students's evaluations information. This information can be retrieved both in iCalendar and JSON formats.

#### Query Parameters

**format** - "calendar" or "json"

#### Example Request
```GET``` http://fenix.ist.utl.pt/api/fenix/v1/person/calendar/evaluations?format=json

#### Example Response
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

<i class="icon-lock"></i><i class="icon-graduation-cap"></i>

This endpoint returns the user's course information.

#### Query Parameters
**sem** - "1" or "2"

**year** - "yyyy/yyyy"

#### Example Request
```GET``` http://fenix.ist.utl.pt/api/fenix/v1/person/courses?sem=1&year=2013/2014

#### Example Response
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

### GET /person/curriculum

<i class="icon-lock"></i><i class="icon-graduation-cap"></i>

Complete curriculum (only for students)

#### Example Request
```GET``` http://fenix.ist.utl.pt/api/fenix/v1/person/curriculum

#### Example Response

{% highlight json %}
[
	{
	"id": "2761663971470",
	"name": "MEIC-A 2006",
	"degreeType": "BOLONHA_MASTER_DEGREE",
	"campus": "Alameda",
	"presentationName": "Mestrado Bolonha em Engenharia Informática e de Computadores - Alameda - MEIC-A 2006",
	"start": "19/07/2012",
	"end": null,
	"ects": 7.5,
	"average": 10.00,
	"calculatedAverage": 10,
	"isFinished": false,
	"approvedCourses": "1",
	"courseInfo": [
			{
				"name": "Unidade Curricular Aplicacional 1 (Língua Natural)",
				"grade": "10",
				"ects": 7.5,
				"id": "1610612905780",
				"semester": 1,
				"year": "2012/2013"
			}
		]
	}
]
{% endhighlight %}


### GET /person/evaluations

<i class="icon-lock"></i><i class="icon-graduation-cap"></i>

This endpoint returns the student's written evaluation information.

#### Example Request
```GET``` http://fenix.ist.utl.pt/api/fenix/v1/person/evaluations

#### Example Response
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

<i class="icon-lock"></i><i class="icon-graduation-cap"></i>

This endpoint allows the student to enroll or disenroll from a written evaluation.

#### Query Parameters

**enrol** - "yes" or "no"

#### Example Request
```PUT``` http://fenix.ist.utl.pt/api/fenix/v1/person/evaluations/2512556533022?enrol=yes

#### Example Response
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

<i class="icon-lock"></i><i class="icon-basket"></i>

This endpoint returns user's payments information.

#### Example Request
```GET``` http://fenix.ist.utl.pt/api/fenix/v1/person/payments

#### Example Response
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

<i class="icon-lock-open"></i>

This endpoint returns the information about the campi.
 
#### Example Request
```GET``` http://fenix.ist.utl.pt/api/fenix/v1/spaces

#### Example Response
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

<i class="icon-lock-open"></i>

This endpoint returns information about the space for a given {id}, its contained and parent spaces. The {id} can be for any of these types: "CAMPUS", "BUILDING", "FLOOR" or "ROOM".

#### Query Parameters

**day** - "dd/mm/yyyy"

#### Example Request
```GET``` http://fenix.ist.utl.pt/api/fenix/v1/spaces/2972117371186?day=22/05/2013

#### Example Response
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
