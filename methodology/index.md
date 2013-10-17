---
layout: default
slug: methodology
name: "Methodology"
root: "../"
---

### Methodology

In [DSI][DSI] we adopt a set of methodologies to smooth and coordinate our software development.
Such methodologies spawn the software development concerning the version control system branching model,
the versioning of software artifacts, and how to contribute to those software artifacts.

#### Branching Model

We adopted the [GitFlow][GitFlow] workflow, which help us to smoothly manage
the branching model of our Git repositories.


Within this branching model adoption, we do not enforce the use
of the Gitflow tool, which enforces the use of such workflow of version control system usage. We believe the
developers are accountable for their actions, and as such, they do not need tools to enforce the usage of certain
rules while using a particular version control system. Using the Git tool directly while using this branching model
approach demonstrates that the developer understands correctly the strategy, while having all the Git version control
system capabilities.

#### Versioning
To version our software, we consider the [Semantic Versioning][Semantic Versioning] approach.
The Semantic Versioning approach comprehends a version format composed by three numbers X.Y.Z, where each number
increment is associated to a set of rules. These rules allow us to quickly identify if we can upgrade a dependency
safely without breaking our code.

#### Building

To build our software, we use [Maven][Maven]. Maven allow us to declare both the build and release lifecycles of our projects. To ease such configuration, we have pre-configure four parent pom projects from which your pom can inherit these configurations from.

##### IST DSI Project
The ```ist-dsi-project``` is the pom project that you should inherit from if you wish your project's build and release lifecycle to
be configured according to all our projects. In such build lifecycle, both javadoc and source jars are created and deployed into our
Nexus server. Additionally, the release plugin is configured to auto-increment the submodules with the module version number.

	<parent>
		<groupId>pt.ist</groupId>
		<artifactId>ist-dsi-project</artifactId>
		<version>1.1.0-SNAPSHOT</version>
	</parent>

##### Web Library Project   
The ```web-library-project``` is the pom project that you should inherit from if you're developing a project that needs to be initialized
in a Servlet 3.0 container. If you're developing a FenixFramework module, you should inherit from the ```fenix-framework-project``` instead. Nevertheless, if you still want to define a module that does not use FenixFramework, you should define your parent pom with the following parent pom declaration:

	<parent>
		<groupId>pt.ist</groupId>
		<artifactId>web-library-project</artifactId>
		<version>1.1.0-SNAPSHOT</version>
	</parent>

##### FenixFramework Project   
The ```fenix-framework-project``` is the pom project that is most commonly inherited, since it provides all the FenixFramework build lifecycle
that almost all our modules are based on. To inherit this lifecycle configuration, you should define your parent pom as follows:

	<parent>
		<groupId>pt.ist</groupId>
		<artifactId>fenix-framework-project</artifactId>
		<version>1.1.0-SNAPSHOT</version>
	</parent>


##### Web Application Project
The ```web-app-project``` is essentially the pom project that you should inherit from if your project needs to generate a Servlet 3.0 WAR application, along with a FenixFramework lifecycle. So, to inherit this lifecycle configuration, you should define your parent pom project as follows:

	<parent>
		<groupId>pt.ist</groupId>
		<artifactId>web-app-project</artifactId>
		<version>1.1.0-SNAPSHOT</version>
	</parent>


#### Contributions

At DSI, we manage a considerable number of projects, and as such, we assign a main team of developers to each project.
Developers outside of that main team can still contribute to the projects, nevertheless, they must provide that contribution
through a Github Pull Request feature. This way, each main development team also acts as the quality assurance team for that
project. Hence, in order to contribute or request a change to a particular project, the developer must:

1. Explain the rationale for the contribution or change
2. If the contribution is accepted the developer must fork the project
3. The developer commits the discussed and agreeed changes to his fork
4. The developer submits a pull-request to merge the respective modifications

[Técnico Lisboa]: http://www.ist.utl.pt/
[DSI]: http://dsi.ist.utl.pt/
[GitFlow]: http://nvie.com/posts/a-successful-git-branching-model/
[Maven]: http://maven.apache.org/
[Semantic Versioning]: http://semver.org/
