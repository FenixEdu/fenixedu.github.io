---
layout: page
root: "../"
---

### Bennu Framework

The Bennu Framework is our infrastructure for building modular web-applications. It stacks over the Fenix Framework, adding core concepts necessary for a web-application to function. The Bennu Framework has a modular architecture, all features reside in standalone inter-dependent java projects, glued together by a maven based compile system.

#### Libraries and Applications

There are two kinds of projects in Bennu: libraries and applications. Libraries are projects that contribute with a set of functionalities that can be included in an application, they produce a .jar package. Applications are projects that produce a .war bundled package, they do not provide any functionality, they just bundles a set of them by depending on projects that do provide them.


If you wish to create a new library please follow the following tutorial:



If you wish to create a new web application, please follow this guide instead.


##### Bennu Core Features

__Authentication__  
Bennu lets you choose your preferred authentication mechanism as it supports username-password credentials or easy integration with the single-sign-on protocol CAS.

__Virtual Hosts__  
Bennu allows several configurations to a different server domain, such as the name, theme and other virtualhost aware application entities.

__Application Menu__  
Each Bennu library contributes with a set of functionalities Runtime configuration of an application menu linking to the provided functionalities;

__Access Groups__  
Bennu provides entities that allow to create and manage groups of users with different semantics, such as the ones defined by set theory (intersections, unions, negations, etc...).


__Content Management__  
Bennu has a content manageent module which provides basic Content Management System (CMS) features. 

__Task Scheduling__  
Cron-like tasks at the Bennu core are provided by this scheduling module.

__File Storage__  
Because most web-applications require to handle files, Bennu has a file storage management module.

__Email Dispatching__  
If the webapplication requires email sending functionalities, Bennu provides them through this email dispatching module.

__Lucene Indexing__  
If you require text-search over your application domain  Lucene based indexation infrastructure, allows transparent domain indexation and search;

__Workflow__  
Case handling based workflow;

__Dashboard__  
Bashboard abstraction;

__Digital Signature__  
Digital signature implementation;

__Themes__  
Theming

__WebServiceUtils__  
Add Jersey REST Client


###### Bennu Infrastructural Domains

* Organization: Organization domain based on Martin Fowler's Organization Pattern;
* Contacts: Contacts (email, phone, etc) domain;
* Personal Information: Personal details domain;
* Contract: Contract information domain;
* Geography: Geography domain
