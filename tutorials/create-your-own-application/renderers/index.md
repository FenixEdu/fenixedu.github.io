---
layout: default
breadcrumbs: [{ "text": "Tutorials", "url": "/tutorials"}, { "text": "Create your own application", "url": "/tutorials/create-your-own-application" }, { "text": "Renderers", "url": "/tutorials/create-your-own-application/renderers" }]
root: "../../../"
---

### Create your own application - Renderers Front-End

In this tutorial, you will learn how to use the Renderers technology to develop your application's front-end.
First, make sure you started by following the [create your own application tutorial][Create your own application].

#### Step 1 - Understand the essence of Renderers

Renderers is essentially a in-house developed library that uses Struts Tag Libs to generate HTML.

Note that altought Renderers is widely used within our applications, it is a deprecated technology and we strongly advise you to not use it. If you're developing a new application, then you should take a look at other front-end technologies that we already integrated in our software development ecosystem.

#### Step 2 - Scaffold your project

To generate a Renderers application project from scratch, you just need to execute the following interactive Maven command:

	mvn archetype:generate
		-DarchetypeGroupId=pt.ist
		-DarchetypeArtifactId=renderers-project-archetype

After you run the above command, you will be prompted by a set of properties that are required to scaffold your Renderers project. When Maven finishes scaffolding your project, you will have a folder named after the artifactId that you choosed during the process.

#### Step 3 - Import the project to Eclipse

After the application is generated, you are ready to import it into Eclipse as a Maven project. To do so, you should right click the package explorer window, ```Import... > Maven > Existing Maven Project``` and select the folder that was generated in the previous step.

#### Step 4 - Define your entrypoints

As Renderers uses Struts, you must define Struct Actions as the entrypoints of your application.

#### Step 5 - Define you views

Renderers is essentially a library built upon Struts Tag Libs, hence, you will need to use JSP to define the views of your application.


[Backbone]: http://backbonejs.com/
[Marionette]: http://marionettejs.com/
[Understand the DML]: /tutorials/understand-the-dml
[Create your own application]: /tutorials/create-your-own-application/
[Expose your Web Services with a REST API]: /tutorials/expose-your-web-services-with-a-rest-api/
[Renderers]: /technologies/front-end/renderers
[Vaadin]: /technologies/front-end/vaadin
[Bankai]: /technologies/front-end/bankai
[Bennu Development Team]: /teams/bennu