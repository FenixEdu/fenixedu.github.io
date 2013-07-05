---
layout: page
root: "../../"
---

## Setup your development environment

This tutorial walks you through the system requirements necessary for developing applications for Project FénixEDU. It also provides guidelines on how to setup an efficient development environment.
NOTE: This document should not be used as a reference for preparing a production environment

### Operating System

The applications developed in Project Fénix are all java-based, so they can run on any platform for which a Java Virtual Machine (JVM) is available. Our development team uses multiple OS's including Linux, Mac OsX and Windows. Usually operating systems and/or distributions are oriented towards a specific type of user. Note that the requirements for a normal desktop or media workstation differ from those requiring intensive video processing or data manipulation. The suggestions we make in this document are for development environments only. Be aware they may not be adequate for other purposes, in particular for production environments.

#### Tweaking the filesystem

Different File Systems (FSs) have very different behaviors, especially regarding performance. In a development environment we prefer data throughput performance over data consistency or integrity. Note that even in the case of a total system loss, setting up a new environment should not be an issue. This is safe to assume as long as each developer regularly backs up his/her code that has not yet been committed or pushed to a central repository.

If it is an option, XFS is a good choice for your FS. For this FS we recommend the following options be used in your /etc/fstab:

```noatime,nodiratime,nobarrier,logbufs=4,osyncisdsync```

#### Turn Off Unused/Unnecessary Services

If you're running a Linux distribution on a machine that won't be used by different users, then we also suggest disabling SELinux. To do this on Fedora edit your /etc/selinux/config file accordingly. Also remember to deactivate any unnecessary services.


#### Firewall

Always use a firewall! At most only open up your SSH port. Any other remote access you need to make to your machine you can achieve tunneling through your SSH port. Here's an example of how to login to a remote machine and locally access a running tomcat while still being able to launch any graphical app running on the remote server:

```ssh -A -X -L 8080:localhost:8080 <remoteUserName>@<remote.server.name>```

To securely access a remote MySQL server, without needing to logon to the remote server, you might use a command such as:

```ssh -A -fN -L <localport>:localhost:3306 <remoteUserName>@<remote.server.name>```

### Software

Here at DSI, we use Java as our main development language. Hence you should download the latest [Oracle's Java Development Kit (JDK)][Java Oracle] version and install it.


#### 2. Install and Configure Eclipse

Here at DSI we mainly use the [Eclipse IDE][Eclipse]. We mainy We also make use of some default configurations to ease the
development.

#### 3. Install and Configure Maven

To build our projects, we mainly use [Apache Maven][Maven]. Although Eclipse has an embedded version of Maven, we are command line guys and we like to have the tool in our terminal.

Here are some useful macros you can put in your ```~/.bash_profile```:

    alias mcp='mvn clean package';
    alias mcp='mvn clean install';
    alias mcpj='mvn clean package jetty:start';



[Eclipse]: http://www.eclipse.org/downloads/
[Maven]: http://maven.apache.org/
[Java Oracle]: http://www.oracle.com/technetwork/java/javase/downloads/index.html