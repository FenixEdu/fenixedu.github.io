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
* [Step 1 - Install the necessary software](#toc_2)
* [Step 2 - Configure Java and Maven](#toc_3)
* [Step 3 - Create an empty database](#toc_4)
* [Step 4 - Generate the FenixEdu software installation through the archetype](#toc_5)
* [Step 5 - Bootstrap FenixEdu](#toc_6)
* [Step 6 - Run your FenixEdu Application](#toc_7)

### Step 1 - Install the necessary software
Before you can install FenixEdu locally, you must install some software packages in the hosting machine. The following commands, intended for debian-based operating systems, add a new repository that allows you to install Oracle's JDK via apt-get, and installs all the required software: 

{% highlight bash %}
sudo add-apt-repository ppa:webupd8team/java
sudo apt-get install maven git mysql-server mysql-client oracle-jdk7-installer
{% endhighlight %}

### Step 2 - Configure Java and Maven

FenixEdu is a big web application. That is why the default memory parameters are not enough to compile and run an instance of FenixEdu.

To circuvent this issue, you must export both the ```JAVA_OPTS``` and ```MAVEN_OPTS``` to your operationg system environment. To do this, you can add the following entries to your ```.bashrc```:

{% highlight bash %}
export JAVA_OPTS="-server -Xms256m -Xmx1024m -XX:PermSize=384m"
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
mvn archetype:generate -DarchetypeGroupId=org.fenixedu -DarchetypeArtifactId=fenix-webapp-archetype -DarchetypeVersion=1.0.0 -DarchetypeRepository=https://fenix-ashes.ist.utl.pt/nexus/content/groups/fenix-ashes-maven-repository
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
Define value for property 'fenixVersion': : 2.0.5
[WARNING] Archetype is not fully configured
[INFO] Using property: groupId = com.example
[INFO] Using property: artifactId = fenix-webapp
[INFO] Using property: version = 1.0-SNAPSHOT
[INFO] Using property: package = com.example.fenixedu
[INFO] Using property: databaseHost = localhost
[INFO] Using property: databaseName = fenixedu
Define value for property 'databasePassword': : pass
[INFO] Using property: databaseUsername = root
[INFO] Using property: fenixVersion = 2.0.5
Confirm properties configuration:
groupId: com.example
artifactId: fenix-webapp
version: 1.0-SNAPSHOT
package: com.example.fenixedu
databaseHost: localhost
databaseName: fenixedu
databasePassword: pass
databaseUsername: root
fenixVersion: 2.0.5
 Y: : y
{% endhighlight %}

> <span>Attention</span>
> Due to a Maven limitation, the password for the database cannot be empty. Hence, you must provide a non-empty password like ```pass```, and later edit the file located at ```<artifactid>/src/main/resources/fenix-framework.properties```, delete the password and save the file.

By now, Maven should have created a folder in your current working directory with the name of the artifactId that you provided. In the example above, the folder name is ```fenix-webapp```.

### Step 5 - Bootstrap FenixEdu

After Maven generates the installation code, you must bootstrap it. By bootstraping, we mean running a Maven plugin that will prompt you a set of parameters that will populate necessary information in the configured database. To run such Maven task, you must enter the generated directory, and run the ```install``` profile through the following commands:

{% highlight bash %}
cd fenix-webapp
mvn prepare-package -P install
{% endhighlight %}

After you run this command, FenixEdu will compile and run an interactive prompt application that will ask you a set of parameters needed to bootstrap your installation. An example of the parameters that will be prompt follows:

{% highlight bash %}
##############################################################################
                                                                              
                   XXXXXXX                                                    
                  + XXXXX +                                                   
                +++++ X +++++                                                 
               +++++++ +++++++                                                
              . +++++ . +++++ .            FenixEdu™                          
            ..... + ..... + .....          Installation                       
           ....... ....... .......                                            
            .....   .....   .....                                             
              .       .       .                                               
                                                                              
##############################################################################

This process will guide you in installing FenixEdu in your School.
First in what country are you at?
Country (Three Letter ISO 3166-1) [USA]: 
Using United States         

Let's setup your school. You need to set up your university and school name.
University Name [Example University]: 
University Acronym [EU]: 
School Name [Example Engineering School]: 
School Acronym [EES]: 

Next we need to setup the domain information about your applicatinos.
School Domain [ees.example.edu]: 
School URL [http://ees.example.edu]: 
School Email Domain [ees.example.edu]: 
Installation Name [EES FenixEdu]: 
Installation Domain [fenixedu.ees.example.edu]: 

Now we need to create an administrator account.
Username [redox]: 
Name [FenixEdu Administrator]: 
Email [redox@ees.example.edu]: 
Password: 
Error: Empty password not allowed.

Password: 
Password (again): 

Starting install process...
Installation Complete.
{% endhighlight %}

### Step 6 - Run your FenixEdu Application

After bootstraping your FenixEdu installation, you are ready to run it. To do so, you must execute the following Maven command that will run a Tomcat Servlet Container with your FenixEdu installation:

{% highlight bash %}
mvn tomcat7:run
{% endhighlight %}

After the startup is finished, you can login into your FenixEdu installation by providing the Administrator account credentials you entered in the bootstrap step at the following URL:

[http://localhost:8080/fenix/loginPage.jsp](http://localhost:8080/fenix/loginPage.jsp)

