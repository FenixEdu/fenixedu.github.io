---
layout: page
root: "../../"
---

### Create your own application

In this tutorial, you will learn how easy and quick it is to develop new applications using our infrastructure.
First, make sure you have [setup your development environment][Setup your development environment].

When building an application, we consider a best practice to separate its domain and business logic from the User Interface (UI). To achieve this, you should create two Maven projects: 
* a project that contains the application's domain and business logic.
* a project that contains the application's User Interface logic.

This tutorial will guide you through the definition of the first project: the application's domain and business logic.

#### Step 1 - Scaffold your project

As you may already known, we use Maven to build our applications and deal with their library dependencies. Maven also provides archetypes
to scaffold a project with a particular configuration, and we prepared an archetype to ease this scaffolding task for you.

To generate an application you just need to execute the following interactive Maven command:

	mvn archetype:generate \
		-DarchetypeGroupId=pt.ist.bennu \
		-DarchetypeArtifactId=bennu-project-archetype

After you run the above command, you will be prompted by a set of properties that are required to scaffold your project. Most of these properties are Maven properties like the ```groupId```, ```artifactId``` and ```version``` of the artifact.

As said before, we consider a best practice to separate the domain and business logic from the front-end code. Hence, we strongly recommend you follow this guideline and create two separated projects. Since you're defining the domain and business logic project, you should name it and append the word core to it. For example, if we consider a project called banana, the ```artifactId``` should be banana-core).

#### Step 2 - Import the project to Eclipse

After the application is generated, you are ready to import it into Eclipse as a Maven project. To do so, you should right click the package explorer window, ```Import... > Maven > Existing Maven Project``` and select the folder that was generated in Step 1. 

#### Step 3 - Define your domain

To persist the entities of your application, you must use the Domain Modeling Language (DML). To do so, you must
edit the ```src/main/dml/domain.dml``` file and describe your application persistent entities along with their relations. If you don't known how to define such classes and relations, you should read [this tutorial][Understand the DML].

If you're creating a new module with a domain that is mostly independent of the other modules, we suggest you define a root object to which you can relate your module entities, with the objective of later ease their retrieval. To do this, you must define a class (singleton) to represent your module, and relate it to the FenixFramework DomainRoot singleton object. For instance, if your application is called Banana, the DML code to accomplish this task follows:

	class Banana;

	relation BennuBanana {
		.pt.ist.fenixframework.DomainRoot playsRole root {
			multiplicity 1..1;
		}
		Banana playsRole banana {
			multiplicity 0..1;
		}
	}

Then, in your Banana class, you should define the constructor as private, and define a static ```getInstance()``` method:

	private Banana() {
		setRoot(FenixFramework.getDomainRoot());
	}

	...

	public static Banana getInstance() {
		if(FenixFramework.getDomainRoot().getBanana() == null) {
			new Banana();
		}
		return FenixFramework.getDomainRoot().getBanana();
	}

Now, you should define the rest of your domain entities and their respective relations. After you completed such task, you can run a mojo of the FenixFramework Maven Plugin to generate the base classes:

	mvn ff:ff-generate-domain

Such base classes are generated into ```target/generated-sources/dml-maven-plugin```. You should go to Eclipse and right click this folder in your package explorer and select the option ```Build Path > Add as source folder``` in order to resolve any classpath errors related to the existance of these base classes.

#### Step 4 - Choose your User Interface (UI) technology

Now that you defined your application's rich domain model, you should choose one of the User Interface (UI) technologies that we already integrated into our software development ecosystem. Depending on your choice, you will have different development requirements, therefore, this step essentialy redirects you to one of the following front-end technologies tutorials:
* [Renderers][Renderers]
* [Vaadin][Vaadin]
* [Bankai][Bankai]

NOTE: Our infrastructure is designed to ease the introduction of new front-end technologies, so it's possible to use others than the
listed above. If you wish to do so, please contact the [Bennu Development Team][Bennu Development Team]

#### Step 5 - Build and Run the Project

Now, all you need to do is build and run the project. To do so, you must install both your application core and ui modules using the following Maven command:

	mvn clean package install

If everything runs smoothly, after you run this command you should have both JAR libraries installed in your local Maven repository. The idea is to have a webapp project that depends on both JAR libraries and run that project using the following Maven command:

	mvn clean package jetty:start

The above command will compile, build the WAR artifact, and finally run a Jetty Server with the resulting WAR deployed. After the Jetty Server starts, your application should be up and running at ```http://localhost:8080/```.

[Understand the DML]: /tutorials/understand-the-dml
[Setup your development environment]: /tutorials/setup-your-development-environment/
[Renderers]: /technologies/front-end/renderers
[Vaadin]: /technologies/front-end/vaadin
[Bankai]: /technologies/front-end/bankai
[Bennu Development Team]: /teams/bennu