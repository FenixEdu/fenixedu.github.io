---
layout: default
slug: create-your-own-application
breadcrumbs: [{ "text": "Tutorials", "url": "/dev/tutorials"}, { "text": "Create your own application", "url": "/dev/tutorials/create-your-own-application" }]
name: "Create your own application"
root: "../../../"
---

## Create your own application

In this tutorial, you will learn how easy and quick it is to develop new applications using our infrastructure.
First, make sure you have [setup your development environment][Setup your development environment] and [understand how the DML works][Understand the DML].

### Table of Contents
* [Step 1 - Understand project separation](#toc_2)
* [Step 2 - Scaffold your project](#toc_3)
* [Step 3 - Import the project to Eclipse](#toc_4)
* [Step 4 - Define your domain](#toc_5)
* [Step 5 - Choose your User Interface (UI) technology](#toc_6)
* [Step 6 - Build and Run your Application](#toc_7)

### Step 1 - Understand Project Separation

When developing new applications, we follow the best practice of separating the application's domain and business logic from the User Interface (UI). This separation allows to easily develop and test new UIs for the same core functionalities without disrupting the existing codebase. To achieve this, you should create two Maven projects: 
* a project that contains the application's domain and business logic.
* a project that contains the application's User Interface logic.

Both these projects should produce a ```JAR```, so that they can be binded together through a webapp project that depends on both. If you're new to Maven, we recommend you to spend some minutes reading its [documentation][Maven].

### Step 2 - Scaffold your project

As you may already known, we use Maven to build many of our applications, and also to deal with their dependencies. Maven also provides archetypes
to scaffold a project with a particular configuration, and we prepared an archetype to ease the scaffolding of new projects with a configuration optimized for our project ecosystem.

To generate a new project, you just need to execute the following interactive Maven command:

{% highlight bash %}
mvn archetype:generate \
   -DarchetypeGroupId=org.fenixedu \
   -DarchetypeArtifactId=bennu-project-archetype \
   -DarchetypeVersion=3.0.1 \
   -DarchetypeRepository=https://fenix-ashes.ist.utl.pt/nexus/content/groups/fenix-ashes-maven-repository
{% endhighlight %}

After you run the above command, you will be prompted by a set of properties that are required to scaffold your new project. Most of these properties are Maven properties like the ```groupId```, ```artifactId``` and ```version``` of the artifact. 

As said before, we consider a best practice to separate the domain and business logic from the front-end code. Hence, we strongly recommend you follow this guideline and create two separated projects. Since you're defining the domain and business logic project, you should name it and append the word core to it. For example, if we consider a project called banana, the ```artifactId``` should be banana-core).

### Step 3 - Import the project to Eclipse

After the application is generated, you are ready to import it into Eclipse as a Maven project. To do so, you should right click the package explorer window, ```Import... > Maven > Existing Maven Project``` and select the folder that was generated in Step 2. 

Make sure you have the ```FenixCodeStyle``` active in your Java Formatter, and that your save actions are the ones highlighted in the [setup your development environment tutorial][Setup your development environment].

### Step 4 - Define your domain

To define and persist the domain entities of your application, you can use the FenixFramework and let the Domain Modeling Language (DML) ease that task for you. To do so, you must edit the ```src/main/dml/domain.dml``` file and describe your application persistent entities along with their relations. If you don't known how to define such classes and relations, you should read [the tutorial that teaches how to understand the DML][Understand the DML].

In case you're creating a new module with a domain that is mostly independent of the other applications' domains, we suggest you define a root object to which you can relate your module entities, with the objective of later ease their retrieval. To do this, you must define a singleton class to represent your module, and relate it to the FenixFramework DomainRoot singleton object. For instance, if your application is called Banana, the DML code to accomplish this task follows:

{% highlight java %}
class Banana;

relation BennuBanana {
  .pt.ist.fenixframework.DomainRoot playsRole root {
    multiplicity 1..1;
  }
  Banana playsRole banana {
    multiplicity 0..1;
  }
}
{% endhighlight %}


Then, in your Banana class, you should define the constructor as private, and define a static ```getInstance()``` method:

{% highlight java %}
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
{% endhighlight %}

Now, you should define the rest of your domain entities and their respective relations. After you completed such task, you can run the DML Maven Plugin mojo to generate the base classes:

{% highlight bash %}
mvn ff:ff-generate-domain
{% endhighlight %}

Such base classes are generated into ```target/generated-sources/dml-maven-plugin```. You should go to Eclipse and right click this folder in your package explorer and select the option ```Build Path > Add as source folder``` in order to resolve any classpath errors related to the existance of these base classes.

### Step 5 - Choose your User Interface (UI) technology

After you defined your application's domain, or part of it, you should choose one of the User Interface (UI) technologies that we already integrated into our software development ecosystem. Depending on your choice, you will have different development requirements, therefore, this step essentialy redirects you to one of the following front-end technologies tutorials:

* [Bankai][Bankai]
* [Spring MVC][Spring MVC]

NOTE: Our infrastructure is designed to ease the introduction of new front-end technologies, so it's possible to use others than the
listed above. If you wish to do so, please contact the [Bennu Development Team][Bennu Development Team]

### Step 6 - Build and Run your Application

Now, all you need to do is build and run the project. To do so, you must install both your application core and ui modules using the following Maven command:

{% highlight bash %}
mvn clean package install
{% endhighlight %}

If everything runs smoothly, after you run this command you should have both JAR libraries installed in your local Maven repository. As mentioned before, the idea is to have a webapp project that depends on both JAR libraries and run that project using the following Maven command:

{% highlight bash %}
mvn clean package jetty:start
{% endhighlight %}

The above command will compile, build the WAR artifact, and finally run a Jetty Server with the resulting WAR deployed. After the Jetty Server starts, your application should be up and running at ```http://localhost:8080/```.

[Understand the DML]: /dev/tutorials/understand-the-dml
[Setup your development environment]: /dev/tutorials/setup-your-development-environment/
[Renderers]: /dev/tutorials/create-your-own-application/renderers
[Spring MVC]: /dev/tutorials/create-your-own-application/spring-mvc
[Bankai]: /dev/tutorials/create-your-own-application/bankai
[Bennu Development Team]: /dev/teams/bennu
[Maven]: http://maven.apache.org/
