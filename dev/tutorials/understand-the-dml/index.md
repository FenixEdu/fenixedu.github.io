---
layout: default
breadcrumbs: [{ "text": "Tutorials", "url": "/dev/tutorials"}, { "text": "Understand the Domain Modeling Language (DML)", "url": "/dev/tutorials/understand-the-dml/" }]
root: "../../"
---

### Understand the Domain Modeling Language (DML)

This tutorial will teach you how to use the Domain Modeling Language (DML) to ease the definition of your application's rich domain model. The DML is essentially a Domain Specific Language (DSL) that empowers software developers to declare the entities and relationships of their application's domain, and generate the necessary source code to handle such relationships, abstracting the programmer from transactional and persistence concerns.

In this tutorial you will learn how to define the classes and relations of your application's rich domain using the DML.

### Table of Contents

* [Step 1 - Draw your domain model](#step_1__draw_your_domain_model)
* [Step 2 - Describe your domain model using the DML](#step_2__describe_your_domain_model_using_the_dml)
* [Step 3 - Generate the Source Code](#step_3__generate_the_source_code)

### Step 1 - Draw your domain model

The first thing to do is to draw your domain model, along with all their relations. The true difficulty lays in this Step, which enforces you to understand the problem and define which entities will support your application's business logic.

After you identified the domain model of your application, or at least part of it, you may use the Domain Modeling Language (DML) to describe it in a formal way that the FenixFramework will understand.

### Step 2 - Describe your domain model using the DML

Now that you identified some entities and relations you want to persist, you may define the respective DML declarations.

If we consider the example described in Step 1, it would translate to the following DML:

{% highlight java %}
package module.books.domain;

class Book {
  String title;
  String isbn;
}

class Requisition {
  DateTime requisitionTimestamp;
  DateTime returnTimestamp;
}

relation BooksHasRequisitions {
  Book playsRole book { multiplicity 1..1; }
  Requisition playsRole requisition { multiplicity 0..*; }
}
{% endhighlight %}


### Step 3 - Generate the Source Code

FenixFramework can parse the DML file created in Step 2 and generate the respective Java classes containing all the relational code while already considering transactional and persistence concerns. Hence, it is transparent to the developer how the entities of its application domain are persisted in a consistent state to the database.

However, it is important to understand how this code is generated. For each class defined in the DML file, the FenixFramework may generate two classes: base and non-base classes.

#### Base Classes   
Base classes are the ones that are always generated in the compilation process, and as such, the classes whose definition you should not edit directly since they are re-written everytime you re-compile your code. The source code of these classes is always generated into ```target/generated-sources/dml-maven-plugin```, so after you clean your project, they will be deleted because they can be derived from the DML file.

#### Non-base Classes   
Non-base classes are classes that FenixFramework will only generate if they do not exist yet. You should edit these classes to add business logic to your domain entities. Non-base classes inherit all the relational, persistence and transactional code from base classes, and as such, they should only contain business logic definitions.

> <span>Note</span>
> Properties must be declared in the DML file, and not directly in the non-base class. Declaring properties in the non-base class will not persist them and may result in error-prone actions that may lead to inconsistent states.

### Step 3 - Define Transactions

Although the relation and persistence behavior is transparent to the programmer, you still need to define where a given transaction begins and ends.
In our infrastructure, there is a Servlet filter that contextualizes all requests within a read-only transaction. If your service needs to make some write to the database, then you can redefine the strategy of the transaction by annotating the service method with ```@Atomic```.


[Semantic Versioning]: http://semver.org/