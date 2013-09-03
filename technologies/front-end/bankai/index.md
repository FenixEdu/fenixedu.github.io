---
layout: page
root: "../../../../"
---

### Bankai

Bankai is a consolidation of several Javascript libraries with the objective of ease the development of User Interface applications that communicate with REST-based API. Hence, if your application has a REST API, you can use Bankai to quickly develop a Javascript UI that communicates with that API. If your application doesn't have a REST API, you can learn how to create one by following [this tutorial][Expose your web services with a REST API].

#### Backbone

The main library that Bankai consolidates is the Backbone library. Backbone lets you define your client-side application in terms of models, views, and a router.

Models manage the lifecycle of your application data, and expose CRUD operations of your application domain resources. A collection is a set of models.

Views are objects that expose your user interface. They are responsible to render HTML templates based on a model or collection that you provide to the view.

The Router is the entity that translate URLs into the execution of a particular function, i.e. the controller of the application.

To better understand how Backbone works, you can quickly read their documentation [here][Backbone].

#### Project Folder Structure

To use Bankai, you should respect the following project folder structure:

	src/main/webapp/<applicationId>
	`-- js
	   |-- collections
	   |-- models
	   |-- nls
	   |  |-- pt-pt
	   |  |  `--messages.js
	   |  `-- messages.js
	   |-- views
	   `-- router.js

#### Code Optimization

After you finish developing your application, you can enable the minification process to optimize your application code. This optimization analyzes all Javascript library dependencies and consolidates all your application javascript sources into a single file, changing your variable names and removing unecessary whitespace.

To do this, you should go to your application ```pom.xml``` file and change the following property to true:

	<properties>
		<bankai.skip.js.optimization>false</bankai.skip.js.optimization>
	</properties>

[Expose your web services with a REST API]: /tutorials/expose-your-web-services-with-a-rest-api/
[Backbone]: http://backbonejs.org/
