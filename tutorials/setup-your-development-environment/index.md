---
layout: default
breadcrumbs: [{ "text": "Tutorials", "url": "/tutorials"}, { "text": "Setup your development environment", "url": "/tutorials/setup-your-development-environment/" }]
root: "../../"
---
## Setup your development environment

This tutorial walks you through the system requirements necessary to develop applications within the FenixEdu™ software ecosystem. It is intended for developers that want to either contribute to the existing code base, or use the infrastrcture to develop new applications.

> <span>Attention</span>
> The suggestions highlighted in this tutorial are for development environments only. Be aware that they may not be adequate for other purposes, in particular for production environments. Also, since we love pinguins, most tweaks are mainly intended for GNU/Linux Operating Systems.

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

```ssh -A -X -L 8080:localhost:8080 <remoteUserName>@<remote.server.name>```

To securely access a remote MySQL server, without needing to logon to the remote server, you might use a command such as:

```ssh -A -fN -L <localport>:localhost:3306 <remoteUserName>@<remote.server.name>```

### Step 5 - Install you Software Development Kit

Here at DSI, we use Java as our main development language. Hence you should download the latest [Oracle's Java Development Kit (JDK)][Java Oracle] version and install it.

Then, you should use the [Eclipse IDE][Eclipse] as we have a codestyle configuration file to enforce seamless code formatting among our source code files.

### Step 6 - Install and Configure Maven

We mainly use [Apache Maven][Maven] to build our projects. Although the Eclipse IDE already has an embedded version of Maven, we are fond of CLI and we usually use the terminal to tell Maven to build our software.

Here are some useful macros that you can put in your ```~/.bash_profile```:

    alias mcp='mvn clean package';
    alias mcp='mvn clean install';
    alias mcpj='mvn clean package jetty:start';

### Step 7 - Install and Configure MySQL

Commonly, we use [FenixFramework][FenixFramework] to persist the data of our applications. Although FenixFramework allows for different database backends, we mainly use one that persists data in MySQL databases.

Hence, you should install the latest [MySQL Server Community Edition][MySQL] in your development machine.

[FenixFramework]: http://fenix-framework.github.io/
[Eclipse]: http://www.eclipse.org/downloads/
[Maven]: http://maven.apache.org/
[MySQL]: http://dev.mysql.com/downloads/
[Java Oracle]: http://www.oracle.com/technetwork/java/javase/downloads/index.html