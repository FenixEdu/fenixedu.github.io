---
layout: page
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

In what respects to versioning our software, we consider the [Semantic Versioning][Semantic Versioning] approach.
The Semantic Versioning approach compreehends a version format composed by three numbers X.Y.Z, where each number
increment is associated to a set of rules. These rules allow us to quickly identify if we can upgrade a dependency
safely without breaking the code.

#### Contributions

At DSI, we manage a considerable number of projects, and as such, we assign a main team of developers to each project.
Developers outside of that main team can still contribute to the project, nevertheless, they must provide that contribution
through a Github Pull Request feature. This way, each main development team also acts as the quality assurance team for that
project. Hence, in order to contribute or request a change to a particular project, the developer must:

1. Explain the rationale for the contribution or change
2. If the contribution is accepted the developer must fork the project
3. The developer commits the discussed and agreed changes to his fork
4. The developer submits a pull-request to merge the respective modifications

[Técnico Lisboa]: http://www.ist.utl.pt/
[DSI]: http://dsi.ist.utl.pt/
[GitFlow]: http://nvie.com/posts/a-successful-git-branching-model/
[Semantic Versioning]: http://semver.org/
