---
layout: page
root: "../../"
---

### Understand the Domain Modeling Language (DML)

The FenixFramework empowers developers to quickly define the rich domain of their applications using a Domain Specific Language (DSL) known as DML.

In this tutorial you will learn how to define the classes and relations of your rich domain using the DML.

#### Step 1 - Draw your domain model

The first thing to do is to draw your domain model, along with all their relations. The true difficulty lays in this Step, which enforces you to understand the problem and define which entities will support your application's business logic.

After you identified the domain model of your application, or at least part of it, you may use the Domain Modeling Language (DML) to describe it in a formal way that the FenixFramework will understand.

#### Step 2 - Describe your domain model using the DML

Now that you identified some entities and relations you want to persist, you may define the respective DML declarations.

If we consider the example described in Step 1, it would translate to the following DML:

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


#### Step 3 - Generate the Source Code

FenixFramework can parse the DML file created in Step 2 and generate the respective Java classes that contain all the relational code already considering transactional and persistence concerns. Hence, it is transparent to the developer how the entities of its application domain are persisted in a consistent state to the database.

However, it is important to understand how this code is generated. For each class defined in the DML file, the FenixFramework may generate two classes: base and non-base classes.

Base Classes   
Base classes are the ones that are always generated in the compilation process, and as such, the classes whose definition you should not edit since they are re-written everytime you compile your code.

Non-base Classes   
Non-base classes are the classes that FenixFramework will only generate if they do not exist yet. Hence, you should edit these classes to add business logic to your domain entities. Non-base classes inherit from base classes to inherit all the persistence and transactional code.





[Semantic Versioning]: http://semver.org/