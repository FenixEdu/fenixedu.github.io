---
layout: default
breadcrumbs: [{ "text": "Sub-Projects", "url": "/dev/sub-projects"}, { "text": "Expenditure Tracking", "url": "/dev/sub-projects/expenditureTrackingModule"}]
root: "../../"
---

## Expenditure Tracking Module

This modules allows institutions to track expenditures via specialized workflow
processes. These processes include acquisitions, refunds and missions. The 
tracked information pertains to fund allocation to suppliers, to the internal
units who will finance the expenditure and also to the necessary authorization
chains.

The module also provides an API through which external systems may either 
obtain information or register processes.

Common to most endpoints are two arguments, one to for the access token of 
the application invoking the endpoint, and another that indicates the end 
user responsible for the invocation. This will be reviewed when these web 
services will be coupled with the OAuth2 protocol.


### Available Endpoints
* [GET /suppliers](#toc_2)  <i class="icon-lock"></i>
* [POST /allocateFunds](#toc_3)  <i class="icon-lock"></i>
* [PUT /cancelFundAllocation](#toc_4)  <i class="icon-lock"></i>


> <span>NOTE</span>
> <i class="icon-lock"></i> - Private Endpoint that requires application authorization.      



### GET /suppliers

<i class="icon-lock"></i>

This endpoint lists all suppliers registered in the system. For each supplier
it specifies information regarding funds that have been allocated to the
supplier.

#### Query Parameters
 - **access_token** - private token of the application invoking the endpoint
 - **userID** - username of the user responsible for the invocation


#### Example Request
```GET``` http://dot.ist.utl.pt/api/expenditures-tracking/v1/suppliers?access_token=xpto&userID=abc123

#### Example Response
{% highlight json %}
[
	{
		"supplierID": "ABC123",
		"fiscalID": "111111112",
		"name": "ABC, SA",
		"shortName": "ABC",
		"limit": "75000€",
		"contacts": [
			{
				"address": {
					"line1": "Av. Rovisco Pais, 1",
					"line2": "1049-001 Lisboa",
					"country": "PTR"
				},
				"phone": "212111222",
				"fax": "212111223",
				"email": "email@internet.com"
			}
		],
		"totalAllocated": "10350€",
		"totalReserved": "15000€",
		"allocationsByCPV": [
			{
				"cpvCode": "12340000-0",
				"cpvDescription": "Bla bla bla",
				"totalAllocated": "350€",
				"totalReserved": "350€"				
			},
			{
				"cpvCode": "12350000-0",
				"cpvDescription": "Bla bla bla ble",
				"totalAllocated": "10000€",
				"totalReserved": "14650€"				
			}
		]
	}
]
{% endhighlight %}



### POST /allocateFunds

<i class="icon-lock"></i>

This endpoint allows external applications to allocate funds to a supplier.


#### Query Parameters
 - **access_token** - private token of the application invoking the endpoint
 - **userID** - username of the user responsible for the invocation
 - **supplierID** - internal identification of the supplier
 - **value** - value to allocate
 - **valueVat** - percentage value of VAT
 - **cpvCode** - Common Procurement Vocabulary code that classifies the good or service being provided
 - **goodsOrService** - Classification of the acquisition in one of two categories: "**GOODS**", "**SERVICES**"
 - **description** - Short description of the provided goods or services


#### Example Request
```POST``` http://dot.ist.utl.pt/api/expenditures-tracking/v1/allocateFunds?access_token=xpto&userID=abc123&supplierID=201863469433&value=10&valueVat=23&cpvCode=30192113-6&goodsOrService=GOODS&description=abc

#### Example Response
{% highlight json %}
{
	"processID": "IST/2014/0001"
}
{% endhighlight %}



### PUT /cancelFundAllocation

<i class="icon-lock"></i>

This endpoint allows external applications to allocate funds to a supplier.

#### Query Parameters
 - **access_token** - private token of the application invoking the endpoint
 - **userID** - username of the user responsible for the invocation
 - **processID** - process identification of the process to cancel

#### Example Request
```PUT``` http://dot.ist.utl.pt/api/expenditures-tracking/v1/cancelFundAllocation?access_token=xpto&userID=abc123&processID=IST/2014/0001

#### Example Response
{% highlight json %}
{
	"status": "OK"
}
{% endhighlight %}

