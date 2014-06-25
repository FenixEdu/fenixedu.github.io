---
layout: default
breadcrumbs: [{ "text": "Methodology", "url": "/dev/methodology"}]
root: "../"
---

## Methodology

With a considerable team size, we adopt a set of methodologies to smooth and coordinate our software development.
Such methodologies spawn the software development process concerning issues about version control, branching model,
versioning of software artifacts, and contribution flows to such software artifacts.

### Branching Model

According to our best practices, all modifications to the code base must be associated with a Github issue. The origin of such Github
issue can be a Request Tracker (RT) ticket, a new request feature, an unreported bug or hot fix.

To handle such issues, we adopted [GitFlow][GitFlow], which help us to adapt, organize and manage our software development 
best practices from Git features. Although we follow Gitflow's branching model, we do not enforce the use of the Gitflow tool. We believe the
developers are accountable for their actions, and as such, they do not need tools to enforce the usage of certain
rules while using a particular version control system. Using the Git tool directly while using this branching model
approach demonstrates that the developer understands correctly the strategy, while having all the Git version control
system capabilities.

### Versioning
FenixEdu™ is composed by a large set of code libraries, which built on one another. Hence, we need to take versioning very seriously
or else, a simple code change might break the code.

To version our software, we consider the [Semantic Versioning][Semantic Versioning] approach.
The Semantic Versioning approach comprehends a version format composed by three numbers X.Y.Z, where each number
increment is associated to a set of rules. These rules allow us to quickly identify if we can upgrade a dependency
safely without breaking our code.

### Building

To build our software, we use [Maven][Maven]. Maven allow us to declare both the build and release lifecycles of our projects. To ease such configuration, we have pre-configure four parent pom projects from which your pom can inherit these configurations from.



### Contributions

As said before, FenixEdu™ is composed by a large set of projects that need to be properly managed.
As such, we assign a main team of developers to each project. Nevertheless, developers outside of
that main team can still contribute to the projects via the Github Pull Request feature.
While reviewing such pull requests, each main development team also acts as the quality assurance team for that
project. To contribute or request a change to a particular project, the developer must:

1. Explain the rationale for the contribution or change
2. If the contribution is accepted the developer must fork the project
3. The developer commits the discussed and agreed changes to his fork
4. The developer submits a pull-request to merge the respective modifications

[GitFlow]: http://nvie.com/posts/a-successful-git-branching-model/
[Maven]: http://maven.apache.org/
[Semantic Versioning]: http://semver.org/

### Code Conventions

Package names are always lowercase, invalid characters are simply stripped down. All project's java resources are locate in packages under: ```<organization>.<project>.<module>```, or ```<organization>.<project>``` for single module projects. For example, the core module of the bennu project, that is part of the fenixedu organization, has a base package name: ```org.fenixedu.bennu.core```.

Inside the base package, resources are organized as follows:

| Package | Resource Types | Depends on |
| ------------- | ------------- | ------------- |
| ```<base>``` | Configuration managers | - |
| ```<base>.domain``` | Domain entities and related objects | ```<base>``` |
| ```<base>.service``` | Services | ```<base>, <base>.domain``` |
| ```<base>.api``` | Rest APIs | ```<base>, <base>.domain, <base>.service``` |
| ```<base>.ui``` | Controllers, Portal Applications and Functionalities, and all other UI related resources | ```<base>, <base>.domain, <base>.service``` |
| ```<base>.servlet``` | Servlets, Initializers, Filters | ```<base>, <base>.domain, <base>.service``` |
| ```<base>.task``` | Scheduller Tasks | ```<base>, <base>.domain, <base>.service``` |
| ```<base>.bootstrap``` | Bennu Bootstrappers | ```<base>, <base>.domain, <base>.service``` |

If the result includes duplications, like ```org.fenixedu.sotis.ui.ui``` (because the project sotis has a submodule with only the UI parts), just collapse into: ```org.fenixedu.sotis.ui```.