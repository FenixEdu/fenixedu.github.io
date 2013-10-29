---
layout: default
breadcrumbs: [{ "text": "Tutorials", "url": "/tutorials"}, { "text": "Setup your development environment", "url": "/tutorials/setup-your-development-environment/" }]
root: "../../"
---
## Setup your development environment

This tutorial walks you through the system requirements necessary to develop applications within the FenixEdu™ software ecosystem. It is intended for developers that want to either contribute to the existing code base, or use the infrastructure to develop new applications.

> <span>Attention</span>
> The suggestions highlighted in this tutorial are for development environments only. Be aware that they may not be adequate for other purposes, in particular for production environments. Also, since we love pinguins, most tweaks are mainly intended for GNU/Linux Operating Systems.

### Table of Contents
* [Step 1 - Choose your Operating System](#toc_2)
* [Step 2 - Tweak your Filesystem](#toc_3)
* [Step 3 - Turn Off Unused and Unnecessary Services](#toc_4)
* [Step 4 - Setup your Firewall](#toc_5)
* [Step 5 - Install your Software Development Kit](#toc_6)
	* [Step 5.1 - Oracle's JDK 7](#toc_7)
	* [Step 5.2 - Apache Maven](#toc_8)
	* [Step 5.3 - Git](#toc_9)
	* [Step 5.3 - MySQL](#toc_10)
	* [Step 5.3 - Eclipse IDE](#toc_11)
* [Step 6 - Install and Configure MySQL](#toc_12)
* [Troubleshooting](#toc_13)


### Step 1 - Choose your Operating System

The applications within the FenixEdu™ ecosystem are mainly developed using the Java programming language, hence, they can run on any platform for which a Java Virtual Machine (JVM) is available. Our development team uses multiple operating systems including Linux, Mac OS X and Windows. Usually operating systems and/or distributions are oriented towards a specific type of user. Note that the requirements for a normal desktop or media workstation differ from those requiring intensive video processing or data manipulation.

### Step 2 - Tweak your Filesystem

Different file systems have very different behaviors, especially regarding performance. In a development environment we prefer data throughput performance over data consistency or integrity. Note that even in the case of a total system loss, setting up a new environment should not be an issue. This is safe to assume as long as each developer regularly backs up code that has not yet been committed and pushed to a code repository.

If it is an option, XFS is a good choice for your FS. For the XFS file system we recommend you include the following options in your ```/etc/fstab```:

	noatime,nodiratime,nobarrier,logbufs=4,osyncisdsync

### Step 3 - Turn Off Unused and Unnecessary Services

If you're running a Linux distribution on a machine that won't be used by different users, then we also suggest disabling SELinux. To do this on Fedora edit your /etc/selinux/config file accordingly. Also remember to deactivate any unnecessary services.


### Step 4 - Setup your Firewall

Always use a firewall! At most, you should only open up your SSH port. Any other remote access you need to make to your machine can be achieved by tunneling through your SSH port. Here's an example of how to login to a remote machine and locally access a running Tomcat while still being able to launch any graphical app running on the remote server:

{% highlight bash %}
ssh -A -X -L 8080:localhost:8080 <remoteUserName>@<remote.server.name>```
{% endhighlight %}

To securely access a remote MySQL server, without needing to logon to the remote server, you might use a command such as:

{% highlight bash %}
ssh -A -fN -L <localport>:localhost:3306 <remoteUserName>@<remote.server.name>
{% endhighlight %}

### Step 5 - Install you Software Development Kit

Here at DSI, we use Java as our main development language. Hence you should download the latest [Oracle's Java Development Kit (JDK)][Java Oracle] version and install it.

Pillow is a project that attempts to ease the setup of the development environment. Pillow is essentially a *bash-script-puppet-manifest-to-be* that automates the installation and configuration of a generic development environment. For now, Pillow should only be runned in Debian-based GNU/Linux distributions, i.e. those who allow you to ```apt-get install``` stuff.

#### Step 5.1 - Oracle's JDK 7

Although the FenixEdu™ project would theoretically work with any JVM implementation, we <u>strongly advise</u> you use the Oracle's Java Development Kit (JKD) 7.

#### Step 5.2 - Apache Maven

We mainly use [Apache Maven][Maven] to build our projects. Although the Eclipse IDE already has an embedded version of Maven, we are fond of CLI and we usually use the terminal to tell Maven to build our software.

Here are some useful macros that you can put in your ```~/.bash_profile```:

{% highlight bash %}
alias mcp='mvn clean package';
alias mcp='mvn clean install';
alias mcpj='mvn clean package jetty:start';
{% endhighlight %}


#### Step 5.3 - Git

To version control our code base, we use Git. You can learn more about our branching model and contributions in the [methodology page][Methodology].

{% highlight bash %}
git apt-get install git
{% endhighlight %}


Also, we advise you to edit your ```$PS1``` environment variable so that your Command Line Interface (CLI) will provide additional information about the state of your Git repository.

{% highlight bash %}
PS1='\h:\W`__git_ps1` \u\$ '
{% endhighlight %}

#### Step 5.4 - MySQL

Commonly, we use [FenixFramework][FenixFramework] to persist the data of our applications. Although FenixFramework allows for different database backends, we mainly use one that persists data in MySQL databases.

Hence, you should install the latest [MySQL Server Community Edition][MySQL] in your development machine.

#### Step 5.5 - Eclipse IDE for Java Developers

After you have Oracle's JDK 7, Maven and Git, up and running, we recommend you to use the [Eclipse IDE for Java Developers][Eclipse] as we have a codestyle configuration file and a set of automatic save actions to enforce seamless code formatting among our team.

##### Configure Eclipse IDE

1. [Download][EclipseFenixCodeStyleFile] and copy EclipseFenixCodeStyle.xml to your Eclipse installation folder.
2. While in Eclipse, go to ```Window > Preferences > Java > Code Style > Formatter```, press ```Import...``` and choose the file you copied in the previous step.
3. While still in the Preferences menu, in ```Java > Editor > Save Actions```, please check the following options:




We recommend you to use the Eclipse IDE for Java Developers because Maven is already bundled in that version, and most of our projects are built using Maven.

### Troubleshooting

Troubleshooting goes here.


[EclipseFenixCodeStyleFile]: https://raw.github.com/FenixEdu/fenix/master/EclipseFenixCodeSyle.xml
[FenixFramework]: http://fenix-framework.github.io/
[Eclipse]: http://www.eclipse.org/downloads/
[Methodology]: /dev/methodology
[Maven]: http://maven.apache.org/
[MySQL]: http://dev.mysql.com/downloads/
[Java Oracle]: http://www.oracle.com/technetwork/java/javase/downloads/index.html