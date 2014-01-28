---
layout: default
breadcrumbs: [{ "text": "Tutorials", "url": "/dev/tutorials"}, { "text": "Use FenixEdu API in your application", "url": "/dev/tutorials/use-fenixedu-api-in-your-application" }, { "text": "Java SDK", "url": "/dev/tutorials/use-fenixedu-api-in-your-application/java-sdk" }]
root: "../../../"
---

## Use FenixEdu API in your application - Java SDK

In this tutorial, you will learn how to use the Java SDK to easily invoke the FenixEdu REST API. Make sure you started by following the tutorial that teaches you [how to use FenixEdu in your application][use-fenix-edu-in-your-application-tutorial].


### Table of Contents
* [Step 1 - Include the Java SDK in your project libs](#step_1__include_the_php_sdk_in_your_project)
* [Step 2 - Define your Credentials](#step_2__define_your_credentials)
* [Step 3 - Use the Client](#step_3__use_the_client)

### Step 1 - Include the Java SDK in your project libs

In order to ease the use of the FenixEdu API, we developed a Java SDK that you can use in your project by including it in your project libraries.

If you are using Maven to build your Java project, you just need to add the following dependency to your ```pom.xml```file:

{% highlight xml %}
<dependency>
  <groupId>org.fenixedu</groupId>
  <artifactId>fenixedu-sdk-core</artifactId>
  <version>2.0.0</version>
</dependency>
{% endhighlight %}

In order for Maven to know where to get this dependency from, you will also need to include our Maven repository in the repositories element of your ```pom.xml``` file:

{% highlight xml %}
<repository>
  <id>fenix-ashes-maven-repository</id>
  <url>https://fenix-ashes.ist.utl.pt/nexus/content/groups/fenix-ashes-maven-repository</url>
</repository>
{% endhighlight %}	

### Step 2 - Define your Credentials

The next step is to create a file named ```configuration.properties``` and specify both your Consumer Key and Secret:

{% highlight properties %}
fenixedu.oauth.consumer.key=<your-consumer-key>
fenixedu.oauth.consumer.secret=<your-consumer-secret>
fenixedu.callback.url=<your-application-callback-url> //e.g. http://localhost:8080/authorization 
fenixedu.base.url=<fenixedu-installation-base-url> //e.g. https://fenix.tecnico.ulisboa.pt
{% endhighlight %}


The library that you included in the previous step will attempt to read this file and auto-config your credentials that will be used in every API call in order to authorize your requests.


### Step 3 - Use the Cient

#### Step 3.1 - Use the Synchronous Client

After you configured your credentials, you can make synchronous invocations to the API like in the following example:

{% highlight java %}
FenixEduClient client = new FenixEduClientFactory.getSingleton();
//redirect the user to the URL provided by client.getAuthorizationUrl();
//if the user accepts it, the FenixEdu API will invoke the defined callback url passing a query param named code.
//e.g. http://localhost:8080/authorization?code=<authorization-code>
//set the received code in the query with client.setCode(code);
JsonObject personObject = client.getPerson();
{% endhighlight %}

The above example instantiates a new client and invokes a request to retrieve information about the user that gave authorization to your application.

#### Step 3.2 - Use the Asynchronous Client

If your working mobile, you probably want to use the Asynchronous client. The first thing to do is change your Maven dependency:

{% highlight xml %}
<dependency>
  <groupId>org.fenixedu</groupId>
  <artifactId>fenixedu-sdk-async</artifactId>
  <version>2.0.0</version>
</dependency>
{% endhighlight %}

You won't be needing to depend on the fenixedu-sdk-core since it is a transitive dependency through the async library.

Although the authorization part is similar to the synchronous client, the result of the invocation is obtained through a listener, which you must add to the client:

{% highlight java %}
AsyncFenixEduClient client = new AsyncFenixEduClientFactory.getSingleton();
//redirect the user to the URL provided by client.getAuthorizationUrl();
//if the user accepts it, the FenixEdu API will invoke the defined callback url passing a query param named code.
//e.g. http://localhost:8080/authorization?code=<authorization-code>
//set the received code in the query with client.setCode(code);
client.addListener(new FenixEduClientAdapter() {
	
	@Override
    public void gotPerson(JsonObject person) {
        System.out.println(person.toString());
    }
});
client.getPerson();
{% endhighlight %}

> <span>Attention</span>
> The asynchronous invocation of the API is made within a new thread. If the main process finishes before the response arrives, the thread will also die before you can process the response. Be sure that the process where the invocation is made continues to live, either through the context of execution (e.g. Android application lifecyle) or through a lock mechanism.

[use-fenix-edu-in-your-application-tutorial]: /dev/tutorials/use-fenixedu-api-in-your-application
[Eclipse]: http://www.eclipse.org/downloads/
[Maven]: http://maven.apache.org/
[Java Oracle]: http://www.oracle.com/technetwork/java/javase/downloads/index.html