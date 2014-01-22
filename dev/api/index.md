---
layout: default
breadcrumbs: [{ "text": "API", "url": "/dev/api"}]
root: "../"
---

## API Endpoints

This page essentially lists all the existing endpoints, as well as examples
when making invocations. While it is not the purpose of this page to describe 
the business entities exposed by this API, we will try to explain the meaning 
of each values whengrever it is not self-evident. The current API exposes four
central concepts of the FenixEdu platform: people, spaces, degrees and courses.

Here, a space represents a resource such as a campus, a building, a building
level (floor) or a room. A degree represents a set of knowledge offered by a 
school or university, such that when a student completes the associated studies
he/she is eligible for a diploma and is often conferred a corresponding title.
A course is a concrete unit of teaching that typically lasts one academic term.

This documentation is applicable to all FenixEdu installations as of version 
1.2.0. Check your local installation to find out if the API is available. Be 
aware that some institutions may choose to restrict access to the API.

### Language Support

The API supports localized invocations.
In each endpoint if a `lang` parameter is present and its' value is an available language, the returned information is localized in the specified language. Otherwise the default language is used.

The list of available languages is returned by [/about](#toc_2).

#### Example request with specified language

http://fenix.ist.utl.pt/api/fenix/v1/courses/1610612925989?lang=en-US



### Public Endpoints
* [GET /about](#toc_2) <i class="icon-lock-open"></i>
* [GET /academicterms](#toc_5) <i class="icon-lock-open"></i>
* [GET /courses/{id}](#toc_8) <i class="icon-lock-open"></i>
* [GET /courses/{id}/evaluations](#toc_11) <i class="icon-lock-open"></i>
* [GET /courses/{id}/groups](#toc_14) <i class="icon-lock-open"></i>
* [GET /courses/{id}/schedule](#toc_17) <i class="icon-lock-open"></i>
* [GET /courses/{id}/students](#toc_20) <i class="icon-lock-open"></i>
* [GET /degrees](#toc_23) <i class="icon-lock-open"></i>
* [GET /degrees/{id}](#toc_27) <i class="icon-lock-open"></i>
* [GET /degrees/{id}/courses](#toc_31) <i class="icon-lock-open"></i>
* [GET /person](#toc_35)  <i class="icon-lock"></i><i class="icon-user"></i>
* [GET /person/calendar/classes](#toc_38) <i class="icon-lock"></i><i class="icon-calendar"></i>
* [GET /person/calendar/evaluations](#toc_42) <i class="icon-lock"></i><i class="icon-calendar"></i>
* [GET /person/courses](#toc_46) <i class="icon-lock"></i><i class="icon-graduation-cap"></i>
* [GET /person/curriculum](#toc_50) <i class="icon-lock"></i><i class="icon-graduation-cap"></i>
* [GET /person/evaluations](#toc_53) <i class="icon-lock"></i><i class="icon-chart-area"></i>
* [PUT /person/evaluations/{id}](#toc_56) <i class="icon-lock"></i><i class="icon-chart-area"></i>
* [GET /person/payments](#toc_60) <i class="icon-lock"></i><i class="icon-basket"></i>
* [GET /spaces](#toc_63)  <i class="icon-lock-open"></i>
* [GET /spaces/{id}](#toc_66)  <i class="icon-lock-open"></i>
* [GET /spaces/{id}/blueprint](#toc_70)  <i class="icon-lock-open"></i>


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
application is deployed. It also returns a list of RSS feeds, the current academic term, available languages and default language.

#### Example Request
```GET``` http://fenix.ist.utl.pt/api/fenix/v1/about

#### Example Response
{% highlight json %}
{
  "institutionName" : "Instituto Superior Técnico",
  "institutionUrl" : "",
  "rssFeeds" : [ {
    "description" : "News",
    "url" : ""
  }, {
    "description" : "Events",
    "url" : ""
  } ],
  "currentAcademicTerm" : "1ºSemestre 2013/2014",
  "languages" : [ "en-US", "pt-PT" ],
  "language" : "pt-PT"
}
{% endhighlight %}

### GET /academicterms

<i class="icon-lock-open"></i>

This endpoint returns all the academic terms available to be used in other endpoints as academicTerm query parameter.
The returned object keys are not ordered in any particular way.

#### Example Request
```GET``` http://fenix.ist.utl.pt/api/fenix/v1/academicterms

#### Example Response
{% highlight json %}
{
  "2013/2014": [
    "2º Semestre 2013/2014",
    "1ºSemestre 2013/2014"
  ],
  "2012/2013": [
    "2 Semestre 2012/2013",
    "1 Semestre 2012/2013"
  ],
  "2011/2012": [
    "2 Semestre 2011/2012",
    "1 Semestre 2011/2012"
  ],
  "2010/2011": [
    "2 Semestre 2010/2011",
    "1 Semestre 2010/2011"
  ],
  "2009/2010": [
    "2 Semestre 2009/2010",
    "1 Semestre 2009/2010"
  ]
}
{% endhighlight %}


### GET /courses/{id}

<i class="icon-lock-open"></i>

A course is a concrete unit of teaching that typically lasts one academic term.
This endpoint shows some information regarding a particular course. The same
course may be lectured simultaneously in multiple degrees during the same
academic term.

The "competences" field holds curricular information for each set of degrees in
which the course is lectured. Usually this information is the same for all
the associated degrees.

#### Example Request
```GET``` http://fenix.ist.utl.pt/api/fenix/v1/courses/1610612925989

#### Example Response
{% highlight json %}
{
	"acronym": "FInd3",
	"name": "Frio Industrial",
	"academicTerm": "1ºSemestre 2013/2014",
	"evaluationMethod": "1 trabalho de grupo, com avaliação ...",
	"numberOfAttendingStudents": 123,
	"announcementLink": "https://fenix.ist.utl.pt/rss.do?boardId=123",
	"summaryLink": "https://fenix.ist.utl.pt/publico/rss.do?summaryId=123",
	"url": "https://fenix.ist.utl.pt/disciplinas/FInd3",
	"competences": [
		{
			"id" : "1313123123232",			
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
```GET``` http://fenix.ist.utl.pt/api/fenix/v1/courses/1610612926005/evaluations

#### Example Response
{% highlight json %}
[
	{
		"type": "TEST",
		"name": "Teste 1º Teste",
		"evaluationPeriod": {
			"start": "2013-10-26 09:00",
			"end"  : "2013-10-26 11:00"
		},
		"enrollmentPeriod": {
			"start": "2013-10-01 14:25:32",
			"end"  : "2013-10-24 17:52:44"
		},
		"isInEnrolmentPeriod": false,
		"rooms": [
			{
				"type": "ROOM",
				"id": "2448131362251",
				"name": "C01 - sala de aula",
				"description": "C01 - Pavilhão Central (Alameda)",
				"capacity" : { "examCapacity" : 56, "normalCapacity" : 24}
			},
			{
				"type": "ROOM",
				"id": "2448131362449",
				"name": "C11 - Sala aula",
				"description": "C11 - Pavilhão Central (Alameda)",
				"capacity" : { "examCapacity" : 87, "normalCapacity" : 12}
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
```GET``` http://fenix.ist.utl.pt/api/fenix/v1/courses/1610612926005/groups

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
				"id": "1132132564548",
				"degrees": [ 
								{	"name": "Licenciatura Bolonha em Engenharia de Telecomunicações e Informática", 
									"acronym":"LERC", 
									"id": "2761663971586"
								},
								{	"name": "Mestrado Bolonha em Engenharia Informática e de Computadores - Alameda", 
									"acronym":"MEIC-A", 
									"id": "2761663977513"
								},
								{	"name": "Mestrado Integrado em Engenharia Civil", 
									"acronym":"MEC", 
									"id": "2761663971466"
								}
						    ]
			},
			{
				"name": "Mecânica Quantica",
				"id": "1132132564555",
				"degrees": [ 
								{	"name": "Mestrado Integrado em Arquitectura", 
									"acronym":"MA", 
									"id": "2761663971465"
								},
								{	"name": "Diploma de Estudos Avançados em Engenharia Informática e de Computadores", 
									"acronym":"DEIC", 
									"id": "2761663971783"
								}
						    ]
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
			"occupation" : {
				  "current" : 120,
				  "max" : 120
			},
			"lessons": [
				{
					"start": "2014-02-21 10:00:00", "end": "2014-02-21 12:00:00",
					"room": { "type": "ROOM", "name": "Ga1", "id": "132115446846" }
				},
				{
					"start": "2014-03-21 10:00:00", "end": "2014-03-21 12:00:00",
					"room": { "type": "ROOM", "name": "Ga1", "id": "132115446846" }
				},
				{
					"start": "2014-05-21 10:00:00", "end": "2014-05-21 12:00:00",
					"room": { "type": "ROOM", "name": "Ga3", "id": "132115446847" }
				}
			],
			"rooms": [
				{
					"type": "ROOM",
					"id": "2448131362317",
					"name": "C9 - S. aula",
					"description": "C9 - Pavilhão Central (Alameda)",
					"capacity": {
						"normal": 80,
						"exam": 40
					}
				}
			] 
		},
		{
			"name": "AED2L03",
			"types": [ "LABORATORIAL" ],
			"occupation" : {
				  "current" : 79,
				  "max" : 95
			},
			"lessons": [
				{
					"start": "2014-02-23 10:00:00", "end": "2014-02-23 13:00:00",
					"room": { "type": "ROOM", "name": "F1", "id": "132115446844" }
				},
				{
					"start": "2014-03-23 10:00:00", "end": "2014-03-23 13:00:00",
					"room": { "type": "ROOM", "name": "F2", "id": "132115446843" }
				},
				{
					"start": "2014-05-23 10:00:00", "end": "2014-05-23 13:00:00",
					"room": { "type": "ROOM", "name": "F1", "id": "132115446844" }
				}
			],
			"rooms": [
				{
					"type": "ROOM",
					"id": "2448131361685",
					"name": "V1.32 - Sala de aula",
					"description": "V1.32 - Pavilhão de Civil (Alameda)",
					"capacity": {
						"normal": 60,
						"exam": 30
					}
				}
			]
		 }
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
		{ "username": "ist1234", 
		  "degree": { 
		  	"name": "Mestrado Bolonha em Engenharia Informática e de Computadores - Alameda",
		  	"acronym": "MEIC-A",
		  	"id": "2761663971475"
		  }
		},
		{ "username": "ist1236", 
		  "degree": { 
		  	"name": "Mestrado Integrado em Arquitectura",
		  	"acronym": "MA",
		  	"id": "2761663971465"
		  }
		}
	]
}
{% endhighlight %}


### GET /degrees

<i class="icon-lock-open"></i>

This endpoint returns the information for all degrees.
If no academicTerm is defined it returns the current degree information.

#### Query Parameters
**academicTerm** - XXXXXX

#### Example Request
```GET``` http://fenix.ist.utl.pt/api/fenix/v1/degrees?academicTerm=2013/2014

#### Example Response
{% highlight json %}
[
	{
		"id": "2761663977513",
		"name": "Engenharia e Gestão da Energia",
		"acronym": "MEGE",
		"academicTerms": [
			"2013/2014",
			"2012/2013"
		],
		"currentAcademicTerm": "2013/2014",
		"type": "BOLONHA_MASTER_DEGREE",
		"typeName": "Master Degree (MSc)",
		"url": "https://fenix.ist.utl.pt/cursos/mege",
		"campus": [
			{
				"type": "CAMPUS",
				"id":"2465311230081",
				"name":"Alameda"
			}
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
If no academicTerm is defined it returns the current degree information.

#### Query Parameters
**academicTerm** - XXXXXX

#### Example Request
```GET``` http://fenix.ist.utl.pt/api/fenix/v1/degrees/2761663977513?academicTerm=2013/2014

#### Example Response
{% highlight json %}
{
	"id": "2761663977513",
	"name": "Engenharia e Gestão da Energia",
	"acronym": "MEGE",
	"academicTerms": [
		"2013/2014",
		"2012/2013"
	],
	"currentAcademicTerm": "2013/2014",
	"type": "BOLONHA_MASTER_DEGREE",
	"typeName": "Master Degree (MSc)",
	"url": "https://fenix.ist.utl.pt/cursos/mege",
	"campus": [
		{
			"type": "CAMPUS",
			"id":"2465311230081",
			"name":"Alameda"
		}
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
If no academicTerm is defined it returns the current degree information.

#### Query Parameters
**academicTerm** - XXXXXX   

#### Example Request
```GET``` http://fenix.ist.utl.pt/api/fenix/v1/degrees/2761663977513/courses?academicTerm=2013/2014

#### Example Response
{% highlight json %}
[
	{
		"acronym": "FInd3",
		"credits": "4.5",
		"name": "Frio Industrial",
		"id": "1610612925565",
		"academicTerm": "1ºSemestre 2013/2014"
	},
	{
		"acronym": "MFC3",
		"credits": "6.0",
		"name": "Mecânica de Fluídos Computacional",
		"id": "1610612925545",
		"academicTerm": "1ºSemestre 2013/2014"
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
	"roles": [
		{
			"type": "TEACHER",
			"department": 
				{ 
					"name" : "Departamento de Engenharia Informática",
					"acronym" : "DEI"
				  }
		},
		{
			"type": "STUDENT",
			"registrations": [
				{ 
					"name": "Mestrado Bolonha em Engenharia Informática e de Computadores - Alameda",
  					"acronym": "MEIC-A",
  					"id": "2761663971475",
  					"academicTerms":[
						"1ºSemestre 2013/2014", 
						"2º Semestre 2013/2014"
					]
				}
			]
		},
		{
			"type": "ALUMNI",
			"concludedRegistrations": [
				{
					"name": "Licenciatura Bolonha em Engenharia Informática e de Computadores - Alameda",
					"acronym": "LEIC-A",
					"id": "2761663971474",
					"academicTerms":[
						"1 Semestre 2010/2011", 
						"2 Semestre 2010/2011",
						"1 Semestre 2011/2012",
						"1 Semestre 2012/2013",
						"2 Semestre 2012/2013"
					]
				}
			]
		}
	],
	"photo": null,
	"name": "John Doe",
	"username": "ist112345",
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

**format** - "calendar" (iCal format) or "json"

#### Example Request
```GET``` http://fenix.ist.utl.pt/api/fenix/v1/person/calendar/classes?format=json

#### Example Response
{% highlight json %}
{
    "academicTerm": "2013/2014",
    "events": [
        {
            "classPeriod": {
                "start": "18/09/2013 17:30",
                "end": "18/09/2013 19:00"
            },
            "location": [
                {
                    "type": "ROOM",
                    "name": "F4",
                    "id": "2448131363674"
                }
            ],
            "title": "Gestão : Problemas",
            "course": {
                "acronym": "Ges5",
                "name": "Gestão",
                "academicTerm": "1ºSemestre 2013/2014",
                "url": "https://fenix.ist.utl.pt/disciplinas/ges5/",
                "id": "1610612925989"
            }
        },
        {
            "classPeriod": {
                "start": "28/10/2013 14:30",
                "end": "28/10/2013 15:30"
            },
            "location": [
                {
                    "type": "ROOM",
                    "name": "QA02.4",
                    "id": "2448131363664"
                }
            ],
            "title": "Análise Complexa e Equações Diferenciais : Teórica",
            "course": {
                "acronym": "aced42",
                "name": "Análise Complexa e Equações Diferenciais",
                "academicTerm": "1º Semester 2013/2014",
                "url": "https://fenix.ist.utl.pt/disciplinas/aced42/",
                "id": "1610612925691"
            }
        }
    ]
}
{% endhighlight %}

### GET /person/calendar/evaluations

<i class="icon-lock"></i><i class="icon-graduation-cap"></i>

This endpoint returns the students's evaluations information. This information can be retrieved both in iCalendar and JSON formats.

#### Query Parameters

**format** - "calendar" (iCal format) or "json"

#### Example Request
```GET``` http://fenix.ist.utl.pt/api/fenix/v1/person/calendar/evaluations?format=json

#### Example Response
{% highlight json %}
{
    "academicTerm": "2013/2014",
    "events": [
        {
            "evaluationPeriod": {
                "start": "04/10/2013 00:57",
                "end": "04/10/2013 01:57"
            },
            "location": [],
            "title": "Inicio das inscrições para 2º Teste : Análise Complexa e Equações Diferenciais",
            "course": {
                "acronym": "aced42",
                "name": "Análise Complexa e Equações Diferenciais",
                "academicTerm": "1ºSemestre 2013/2014",
                "url": "https://fenix.ist.utl.pt/disciplinas/aced42/",
                "id": "1610612925691"
            }
        },
        {
            "evaluationPeriod": {
                "start": "06/11/2013 19:00",
                "end": "04/10/2013 21:00"
            },
            "location": [
                {
                    "type": "ROOM",
                    "name": "F2",
                    "id": "2448131363664"
                }
            ],
            "title": "1º Teste : Gestão",
            "courses": [
                {
                    "acronym": "Ges5",
                    "name": "Gestão",
                    "academicTerm": "1ºSemestre 2013/2014",
                    "url": "https://fenix.ist.utl.pt/disciplinas/ges5/",
                    "id": "1610612925989"
                }
            ]
        }
    ]
}
{% endhighlight %}

### GET /person/courses

<i class="icon-lock"></i><i class="icon-graduation-cap"></i>

This endpoint returns the user's course information.

#### Query Parameters
**academicTerm** - XXXXXXX
If no academicTerm is defined it returns the current information.

#### Example Request
```GET``` http://fenix.ist.utl.pt/api/fenix/v1/person/courses?academicTerm=2013/2014

#### Example Response
{% highlight json %}
{
	"enrolments": [
		{
			"id": "1610612926309",
			"acronym": "IAC4",
			"name": "Introdução à Arquitetura de Computadores",
			"academicTerm": "1ºSemestre 2013/2014",
			"url": "https://fenix.tecnico.ulisboa.pt/disciplinas/iac4/2013-2014/1-semestre",
			"grade": null
		},
		{
			"id": "1610612925989",
			"acronym": "Ges5",
			"name": "Gestão",
			"academicTerm": "1ºSemestre 2013/2014",
			"url": "https://fenix.tecnico.ulisboa.pt/disciplinas/ges5/2013-2014/1-semestre",
			"grade": null
		}
	],
	"teaching": [
		{
			"id": "1610612926363",
			"acronym": "SE2",
			"name": "Sistemas Entre-Pares e Redes Sobrepostas",
			"academicTerm": "1ºSemestre 2013/2014",
			"url": "https://fenix.tecnico.ulisboa.pt/disciplinas/SE2/2013-2014/1-semestre"
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
		"degree" : { 
			"name": "Mestrado Bolonha em Engenharia Informática e de Computadores - Alameda",
		  	"acronym": "MEIC-A",
		  	"id": "2761663971475"
		},
		"start": "19/07/2012",
		"end": null,
		"credits": 7.5,
		"average": 10.00,
		"calculatedAverage": 10,
		"isFinished": false,
		"numberOfApprovedCourses": 1,
		"approvedCourses": [
			{
				"course" : { 
					"name": "Unidade Curricular Aplicacional 1 (Língua Natural)",
					"id": "1610612905780",
					"acronym": "LN-2",
					"academicTerm": "1ºSemestre 2013/2014",
					"url": "https://fenix.ist.utl.pt/disciplinas/ln-2/2012-2013/1-semestre" 
				},
				"grade": "10",
				"credits": 7.5
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
	"id": "2512556536123",
	"type": "TEST",
	"name": "Teste 1º Teste",
	"evaluationPeriod": {
	    "start": "15/11/2013 18:00",
	    "end": "15/11/2013 21:00"
	},
	"isInEnrolmentPeriod": false,
	"enrollmentPeriod": {
	    "start": "2013-11-07 15:00:25",
	    "end": "2013-11-12 13:00:25"
	},
	"isEnrolled": true,
	"courses": [
	    {
		"id": "1610612926408",
		"acronym": "GPI4",
		"name": "Gestão de Projectos Informáticos",
		"academicTerm": "1ºSemestre 2013/2014",
		"url": "https://fenix.ist.utl.pt/disciplinas/gpi4/2013-2014/1-semestre"
	    }
	],
	"rooms": [
	    {
		"type": "ROOM",
		"id": "2448131363664",
		"name": "F2 - Sala de Aula"
	    },
	    {
		"type": "ROOM",
		"id": "2448131363667",
		"name": "FA1 - Anfiteatro"
	    }
	],
	"assignedRoom": {
	    "type": "ROOM",
	    "id": "2448131363674",
	    "name": "F4 - Sala de Aula"
	}
	},
	{
	"id": "2512556536124",
	"type": "EXAM",
	"name": "Exame 1º Época",
	"evaluationPeriod": {
	    "start": "10/01/2014 08:00",
	    "end": "10/01/2014 11:00"
	},
	"isInEnrolmentPeriod": false,
	"enrollmentPeriod": {
	    "start": "2013-12-20 17:00:22",
	    "end": "2014-01-07 12:00:22"
	},
	"isEnrolled": false,
	"courses": [
	    {
		"id": "1610612926115",
		"acronym": "ASof22",
		"name": "Arquitecturas de Software",
		"academicTerm": "1ºSemestre 2013/2014",
		"url": "https://fenix.ist.utl.pt/disciplinas\/asof22/2013-2014/1-semestre"
	    }
	],
	"rooms": [],
	"assignedRoom": null
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

returns the same as the endpoint above.

### GET /person/payments

<i class="icon-lock"></i><i class="icon-basket"></i>

This endpoint returns user's payments information.

#### Example Request
```GET``` http://fenix.ist.utl.pt/api/fenix/v1/person/payments

#### Example Response
{% highlight json %}
{
    "completed": [
        {
            "amount": "12.34",
            "type": "CASH",
            "description": "Taxa de Secretaria e Seguro - 2012/2013",
            "date": "30/12/2002"
        }
    ],
    "pending": [
        {
            "description": "Propina",
            "paymentPeriod": {
                "start": "13/09/2013 00:00",
                "end": "31/12/2013 23:59"
            },
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

### GET /spaces/{id}/blueprint

<i class="icon-lock-open"></i>

This endpoint returns the space's blueprint in the required format

#### Query Parameters

**format** - "jpeg" or "dwg"

#### Example Request
```GET``` https://fenix.ist.utl.pt/api/fenix/v1/spaces/2465311230082/blueprint

#### Example Response
response content-type : "application/dwg" or "image/jpg"
response content: raw image data
