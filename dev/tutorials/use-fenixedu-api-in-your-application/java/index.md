---
layout: default
breadcrumbs: [{ "text": "Tutorials", "url": "/dev/tutorials"}, { "text": "Use FenixEdu API in your application", "url": "/dev/tutorials/use-fenixedu-api-in-your-application" }, { "text": "Java SDK", "url": "/dev/tutorials/use-fenixedu-api-in-your-application/java-sdk" }]
root: "../../../"
---

## Use FenixEdu API in your application - Java SDK

In this tutorial, you will learn how to use the Java SDK to easily invoke the FenixEdu REST API. Make sure you started by following the tutorial that teaches you [how to use FenixEdu in your application][use-fenix-edu-in-your-application-tutorial].


### Table of Contents
* [Step 1 - Include the Java SDK in your project libs](#step-1---include-the-java-sdk-in-your-project-libs)
* [Step 2 - Define your Credentials](#step-2---define-your-credentials)
* [Step 3 - Use the Client](#step-3---use-the-client)
  * [Step 3.1 - Use the Synchronous Client](#step-3.1---use-the-synchronous-client)
  * [Step 3.2 - Use the Asynchronous Client](#step-3.2---use-the-asynchronous-client)

### Step 1 - Include the [Java SDK](https://github.com/FenixEdu/fenixedu-java-sdk) in your project libs

In order to ease the use of the FenixEdu API, we developed a Java SDK that you can use in your project by including it in your project libraries.

If you are using Maven to build your Java project, you just need to add the following dependency to your ```pom.xml```file:

{% highlight xml %}
<dependency>
  <groupId>org.fenixedu</groupId>
  <artifactId>feaf4j-api</artifactId>
  <version>2.3.1</version>
</dependency>
<dependency>
  <groupId>org.fenixedu</groupId>
  <artifactId>feaf4j-okhttp</artifactId>
  <version>2.3.1</version>
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

The next step is to create a file named ```fenixedu.properties``` in ```src/main/resources``` and specify both your Consumer Key and Secret:

{% highlight properties %}
oauth.consumer.key=<your-consumer-key>
oauth.consumer.secret=<your-consumer-secret>
callback.url=<your-application-callback-url> //e.g. http://localhost:8080/authorization 
base.url=<fenixedu-installation-base-url> //e.g. https://fenix.tecnico.ulisboa.pt
{% endhighlight %}


The library that you included in the previous step will attempt to read this file and auto-config your credentials that will be used in every API call in order to authorize your requests.


### Step 3 - Use the Client

When using the client to invoke FenixEdu API endpoints, you should decide either you want to make synchronous invocations, where the invocation is blocked while waiting for the response from the server, or asynchronous, where the invocation returns void instantly and you receive the response through the means of a callback mechanism.

#### Step 3.1 - Use the Synchronous Client

After you configured your credentials, you can make synchronous invocations to the API like in the following example:

{% highlight java %}

// create the client from properties file
ApplicationConfiguration config = ApplicationConfiguration.fromPropertyFilename("/fenixedu.properties");
FenixEduClientImpl client = new FenixEduClientImpl(config);

//you can invoke public endpoints without any access token.
JsonObject about = client.getAbout();

//to access user's data, you must redirect the user to the URL provided by client.getAuthenticationUrl();
//if the user accepts it, the FenixEdu API will invoke the defined callback url passing a query param named code.
//e.g. http://localhost:8080/authorization?code=<authorization-code>

//get user's authorization data (access_token and refresh_token) client.
FenixEduUserDetails userDetails = client.getUserDetailsFromCode(code);

//when requesting user's private data, the authorization object must be passed along.
JsonObject person = client.getPerson(userDetails.getAuthorization());
{% endhighlight %}

The above example instantiates a new client and invokes a request to retrieve information about the user that gave authorization to your application.

#### Step 3.2 - Use the Asynchronous Client

If your working mobile (in this example we are using Android), you probably want to use the Asynchronous client. The first thing to do is change your Maven dependency:

{% highlight xml %}
<dependency>
  <groupId>org.fenixedu</groupId>
  <artifactId>feaf4j-api</artifactId>
  <version>2.3.1</version>
</dependency>
<dependency>
  <groupId>org.fenixedu</groupId>
  <artifactId>feaf4j-okhttp</artifactId>
  <version>2.3.1</version>
</dependency>
<dependency>
  <groupId>org.fenixedu</groupId>
  <artifactId>feaf4j-android</artifactId>
  <version>2.3.1</version>
</dependency>
{% endhighlight %}

Although the authorization part is similar to the synchronous client, the result of the invocation is obtained through the execute of an AsyncTask, which you must be created passing the client:

{% highlight java %}
FenixEduClientImpl client = new FenixEduClientImpl(ApplicationConfiguration.fromPropertyFilename("/fenixedu.properties"));

//you can invoke public endpoints without any access token.

GetAboutAsyncTask about = new GetAboutAsyncTask(client);
JsonObject jObj = about.execute().get();

//redirect the user to the URL provided by client.getAuthenticationUrl();
//if the user accepts it, the FenixEdu API will invoke the defined callback url passing a query param named code.
//e.g. my-mobile-schema://my-mobile-app/authorization?code=<authorization-code>

FenixEduUserDetails userDetails = client.getUserDetailsFromCode(code);

// Use the async task to preform the requests.
GetPersonAsyncTask personSync = new GetPersonAsyncTask(client,
                   userDetails.getAuthorization());

JsonObject person = personSync.execute().get();
{% endhighlight %}

> <span>Attention</span>
> The asynchronous invocation of the API is made within a new thread. If the main process finishes before the response arrives, the thread will also die before you can process the response. Be sure that the process where the invocation is made continues to live, either through the context of execution (e.g. Android application lifecyle) or through a lock mechanism.

[use-fenix-edu-in-your-application-tutorial]: /dev/tutorials/use-fenixedu-api-in-your-application
[Eclipse]: http://www.eclipse.org/downloads/
[Maven]: http://maven.apache.org/
[Java Oracle]: http://www.oracle.com/technetwork/java/javase/downloads/index.html
