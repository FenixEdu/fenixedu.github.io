---
layout: page
---

### Overview

[Técnico Lisboa][Técnico Lisboa] is Portugal's most prestigious school of
engineering. [DSI][DSI] is the school's computer and network services. We have
been developing open source software, mainly directed at solving problems for
higher education institutions, since 2001. Every institution involved in higher
education is different and has its own needs and processes. However, this is
not incompatible with different institutions sharing ideas, resources and
solutions. Hoping our solutions may be useful to others, we share our software
with the community whenever possible. We develop a wide range of solutions,
from academic and administrative processes to general purpose software
libraries.

### Quickstart
To quickly get a Fenix instalation up and running on your computer, you should use Vagrant to run a virtual machine where we pre-configured all the environment for you. Once you have installed the Vagrant tool in your machine, you just have to run the following commands:

	vagrant box add fenixbox http://fenix-ashes.ist.utl.pt/fenix32.box
	vagrant init
	vagrant up

Yes, is that simple!

Now all you have to do is access your localhost:8080 and you have a Fenix installation running in the virtualbox that you just setup using Vagrant.

If you intend to develop, we recommend you to setup a development environment in your system instead of using this pre-configured virtual machine. For that, you should follow this tutorial.


### Explore the Sub-Projects

Feel free to browse some of our sub-projects and their respective documentation in the list
on the right side of this page.


### Create Your Own Application

You can easily create your own application using our  application development environment.
Our web applications are mainly Java based, and as so, we use Maven to manage our software projects.
Maven takes care of both the projects' lifecycle and their dependency resolution. Therefore, it is quite easy to
start developing a sub-project application of your own. To do so, you just need to follow this tutorial.

### Getting Involved

There are many ways to get involved in Project FénixEdu. This section describes
how to collaborate on this project.


#### Road-map Discussion

The projects core development team has a meeting to discuss the progress of
work currently under way and to update milestone predictions. Serious bugs and
urgent unpredicted features are put forward during these meetings.

About every six months the core development team will get together to discuss
major features and rewrites. It is during these discussions that new features
should be proposed. We usually don't publicise these meetings, however if you
wish to participate in these discussions either regarding the whole project or
a specific sub-project, let us know.   

Each sub-project has it's own road-map that is posted on the sub-projects' 
web-site.


#### Contributing

Contributing can be as easy as submitting a bug report or creating an issue. If
you want to contribute code, simply fork a repository and submit a pull. Check
the projects [methodology][methodology] for details on how to proceed.


#### Joining The Team

If you wish to participate further in the project, drop us an email with your
CV at: [dsi@ist.utl.pt][dsi@ist.utl.pt]. We're always looking to expand our
community.



[Técnico Lisboa]: http://www.ist.utl.pt/
[DSI]: http://dsi.ist.utl.pt/
[methodology]: methodology
[dsi@ist.utl.pt]: mailto:dsi@ist.utl.pt