---
layout: default
breadcrumbs: [{ "text": "Tutorials", "url": "/dev/tutorials"}, { "text": "Install FenixEdu", "url": "/dev/tutorials/install-fenix-edu" }]
root: "../../"
---

### Install FenixEdu

This tutorial walks you through the necessary steps to install FenixEdu™ in a local machine. It is intended for those who want to locally create and deploy a FenixEdu installation from an empty database.

> <span>Attention</span>
> The steps contained in this tutorial are for development purposes only, and may not be adequate for other purposes, in particular for production environments.

### Table of Contents
* [Step 1 - Install the necessary software](#step-1---install-the-necessary-software)
* [Step 2 - Configure Java and Maven](#step-2---configure-java-and-maven)
* [Step 3 - Create an empty database](#step-3---create-an-empty-database)
* [Step 4 - Generate the FenixEdu software installation through the archetype](#step-4---generate-the-fenixedu-software-installation-through-the-archetype)
* [Step 5 - Bootstrap and Run your FenixEdu Application](#step-5---bootstrap-and-run-your-fenixedu-application)

### Step 1 - Install the necessary software
Before you can install FenixEdu locally, you must install some software packages in the hosting machine. The following commands, intended for debian-based operating systems, add a new repository that allows you to install Oracle's JDK via apt-get, and installs all the required software: 

{% highlight bash %}
sudo add-apt-repository ppa:webupd8team/java
sudo apt-get install maven git mysql-server mysql-client oracle-jdk8-installer
{% endhighlight %}

### Step 2 - Configure Java and Maven

FenixEdu is a big web application. That is why the default memory parameters are not enough to compile and run an instance of FenixEdu.

To circuvent this issue, you must export both the ```JAVA_OPTS``` and ```MAVEN_OPTS``` to your operationg system environment. To do this, you can add the following entries to your ```.bashrc```:

{% highlight bash %}
export JAVA_OPTS="-server -Xms256m -Xmx1024m"
export MAVEN_OPTS="$JAVA_OPTS"
{% endhighlight %}

After this, you should ```source``` your ```.bashrc``` file or simply restart your shell.


### Step 3 - Create an empty database

Assuming that your mysql user is ```root```, and that the database name where you will install FenixEdu is called ```fenixedu```, you must create such database. For that, you can execute the following one-liner:

{% highlight bash %}
mysql -uroot -e "create database fenixedu" -p
{% endhighlight %}

The command above will create an empty databased named ```fenixedu```.

> <span>Attention</span>
> The mysql user you will specify during the installation must have the necessary grants to write and create new tables.

### Step 4 - Generate the FenixEdu software installation through the archetype

{% highlight bash %}
mvn archetype:generate -DarchetypeGroupId=org.fenixedu -DarchetypeArtifactId=fenix-webapp-archetype -DarchetypeVersion=2.0.0 -DarchetypeRepository=https://fenix-ashes.ist.utl.pt/nexus/content/groups/fenix-ashes-maven-repository
{% endhighlight %}

When you execute the command above, you will need to provide some information concerning the artifact to be generated through an interactive prompt.
An example of this interactive prompt project generation using the archetype follows:

{% highlight bash %}
Define value for property 'groupId': : com.example
Define value for property 'artifactId': : fenix-webapp
Define value for property 'version':  1.0-SNAPSHOT: : 
Define value for property 'package':  com.example: : com.example.fenixedu
Define value for property 'databaseHost': : localhost
Define value for property 'databaseName': : fenixedu
Define value for property 'databasePassword': : pass
Define value for property 'databaseUsername': : root
Define value for property 'fenixVersion': : 3.2.1
[WARNING] Archetype is not fully configured
[INFO] Using property: groupId = com.example
[INFO] Using property: artifactId = fenix-webapp
[INFO] Using property: version = 1.0-SNAPSHOT
[INFO] Using property: package = com.example.fenixedu
[INFO] Using property: databaseHost = localhost
[INFO] Using property: databaseName = fenixedu
Define value for property 'databasePassword': : pass
[INFO] Using property: databaseUsername = root
[INFO] Using property: fenixVersion = 3.2.1
Confirm properties configuration:
groupId: com.example
artifactId: fenix-webapp
version: 1.0-SNAPSHOT
package: com.example.fenixedu
databaseHost: localhost
databaseName: fenixedu
databasePassword: pass
databaseUsername: root
fenixVersion: 3.2.1
 Y: : y
{% endhighlight %}

> <span>Attention</span>
> Due to a Maven limitation, the password for the database cannot be empty. Hence, you must provide a non-empty password like ```pass```, and later edit the file located at ```<artifactid>/src/main/resources/fenix-framework.properties```, delete the password and save the file.

By now, Maven should have created a folder in your current working directory with the name of the artifactId that you provided. In the example above, the folder name is ```fenix-webapp```.

### Step 5 - Bootstrap and Run your FenixEdu application

After Maven generates the installation code, you must bootstrap it. We made this step seamless, so you only have to start the application normally with

{% highlight bash %}
cd fenix-webapp
mvn tomcat7:run
{% endhighlight %}

After you run this command, FenixEdu will start, you will have to point your browser to the following URL:
\begin{center}
  \url{http://localhost:8080/fenix/}
\end{center}

Fill the form with the parameters for your institution. When you are finished, the application will start normally, login with the credentials that you just set on the previous step at the following URL:

[http://localhost:8080/fenix/loginPage.jsp](http://localhost:8080/fenix/loginPage.jsp)

