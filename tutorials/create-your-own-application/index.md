---
layout: page
root: "../../"
---

### Create your own module

In this tutorial, you are going to learn how easy and quick it is to develop new applications using our infrastructure.
First, make sure you have [setup your development environment][Setup your development environment].

When building a module, we separate its domain and business logic from the User Interface (UI). To achieve this, you should create two
Maven projects: 
* a project that contains the module's domain and business logic
* a project that contains the module's User Interface.

To develop the User Interface (UI) of your module, you may follow one of the following tutorials that teach you how to use
these already integrated front-end technologies:
* [Renderers][Renderers]
* [Vaadin][Vaadin]
* [Bankai][Bankai]
* [Knockout][Knockout]

NOTE: Our infrastructure is designed to ease the introduction of new front-end technologies, so it's possible to use others than the
listed above.

However, this tutorial walks you through the project where the module's domain and business logic is defined.

#### Step 1 - Scaffold your project

As you may already known, we use Maven to build our applications and deal with their library dependencies. Maven also provides archetypes
to scaffold a project with a particular configuration, and we prepared an archetype to ease this scaffolding task for you.

To generate an application you just need to execute the following interactive Maven command:

	mvn archetype:generate -DarchetypeGroupId=pt.ist.bennu -DarchetypeArtifactId=bennu-project-archetype

After you run the above command, you will be prompted by a set of properties that are required to scaffold your project. Most of these properties are Maven properties like the ```groupId```, ```artifactId``` and ```version``` of the artifact.

#### Step 2 - Import the project to Eclipse

After the application is generated, you are ready to import it into Eclipse as a Maven project. To do so, you should right click the package explorer window, ```Import... > Maven > Existing Maven Project``` and select the folder that was generated in Step 1. 

#### Step 3 - Define your domain

You must use the Domain Modeling Language (DML) to define the persistent entities of your application. To do so, you should
edit the ```src/main/dml/domain.dml``` file and describe your application persistent entities along with their relations. If you don't known how to define such classes and relations, you should read [this tutorial][Understand the DML].

#### Step 4 -  


[Understand the DML]: /tutorials/understand-the-dml
[Setup your development environment]: /tutorials/setup-your-development-environment/
[Renderers]: /technologies/front-end/renderers
[Vaadin]: /technologies/front-end/vaadin
[Bankai]: /technologies/front-end/bankai
[Knockout]: /technologies/front-end/knockout

