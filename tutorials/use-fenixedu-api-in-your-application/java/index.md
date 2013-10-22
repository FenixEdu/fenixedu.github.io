---
layout: default
breadcrumbs: [{ "text": "Tutorials", "url": "/tutorials"}, { "text": "Use FenixEdu API in your application", "url": "/tutorials/use-fenixedu-api-in-your-application" }, { "text": "Java SDK", "url": "/tutorials/use-fenixedu-api-in-your-application/java-sdk" }]
root: "../../../"
---

## Use FenixEdu API in your application - Java

In this tutorial, you will learn how to use the Java SDK to easily invoke the FenixEdu REST API. Make sure you started by following the tutorial that teaches you [how to use FenixEdu in your application][use-fenix-edu-in-your-application-tutorial].

### Step 1 - Include the Java SDK in your project libs

In order to ease the use of the FenixEdu API, we developed a Java SDK that you can use in your project by including it in your project libraries.

If you are using Maven to build your Java project, you just need to add the following dependency to your ```pom.xml```file:

	<dependency>
		<groupId>pt.ist</groupId>
		<artifactId>fenixedu-api</artifactId>
		<version>1.4</version>
	</dependency>

In order for Maven to know where to get this dependency from, you will also need to include our Maven repository in the repositories element of your ```pom.xml``` file:

	<repository>
		<id>fenix-ashes-maven-repository</id>
		<url>https://fenix-ashes.ist.utl.pt/nexus/content/groups/fenix-ashes-maven-repository</url>
	</repository>

#### Step 2 - Define your Credentials

The next step is to create a file named ```fenixedu.credentials``` and specify both your Application Access and Secret Keys:

	fenixedu.access.key=123524412
	fenixedu.secret.key=HhU3BB3hJ9h3n2Bhsz 

The library that you included in the previous step will attempt to read this file and auto-config your credentials that will be used in every API call in order to authorize your requests.

#### Step 3 - Use the Client

After you configured your credentials, you can make asynchronous invocations like in the following example:

	FenixEduClient client = new FenixEduClient();
	FERequest req = new FEGetUserRequest("ist155371", new FEGetUserCallback() {
		public void handleResponse(FEGetUserResponse response) {
			String name = response.getUser().getName();
			System.out.println("The user's name is " + name);
		}
		public void handleException(FEException exception) {
			System.err.println("Ups...could not retrieve the user");
		}
	});
	client.sendRequest(req);

The above example instantiates a new client and invokes a request to retrieve information about a particular user. Two methods must be defined within the callback interface: one that handles a successful response, and another that handles either a local or remote exception.

[use-fenix-edu-in-your-application-tutorial]: /tutorials/use-fenixedu-api-in-your-application
[Eclipse]: http://www.eclipse.org/downloads/
[Maven]: http://maven.apache.org/
[Java Oracle]: http://www.oracle.com/technetwork/java/javase/downloads/index.html