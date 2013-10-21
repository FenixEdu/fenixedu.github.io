---
layout: default
breadcrumbs: [{ "text": "Tutorials", "url": "/tutorials"}, { "text": "Use FenixEdu API in your application", "url": "/tutorials/use-fenixedu-api-in-your-application" }]
root: "../../"
---

## Use FenixEdu API in your application

In this tutorial, you will learn how to register your third-party application to use the FenixEdu API, and how to use one of the SDKs that we developed to ease the API invocation. Note that you can still use any HTTP client to invoke the endpoints on your own, or perhaps, contribute with a SDK of your favorite language.

## Step 1 - Register your Application

The first thing you need to start using the FenixEdu API is to register your aplication within the system running the FenixEdu application server. To do so, you need two things:

![Create Application Form]({{site.url}}/assets/create-application-form.png)

### Ensure that you have the Developer role

When you have the developer role, you will be able to see the sub-menu entry ```Manage Applications``` under the Personal tab. If you don't, you must send us an email and ask for the developer role.

> <span>Note</span>
> In case you don't have the ```Personal > External Applications > Manage Applications``` menu, you must send us an email asking for the Developer role.

### Create a third-party application

When you have the developer role, you will be able to see the sub-menu entry ```Manage Applications``` under the Personal tab.

To register your third-party application, you'll need to provide the following information:
1. The application's name.
2. A brief description of the application.
3. The website URL of your application.
4. The private information scopes that your application will need to access.
5. A redirect URL that FenixEdu will invoke after the user authorization step.
6. An avatar that identifies your application (e.g. your application logo).

During the process of authorizing your application, the users will see part of this information, as exemplified in Figure 1.

### Step 1 - Update your Maven Dependencies

In order to ease the use of the FenixEdu API we developed a Java client that you can use in your project by specifying a Maven dependency
to the latest version:

	<dependency>
		<groupId>pt.ist</groupId>
		<artifactId>fenixedu-api</artifactId>
		<version>1.4</version>
	</dependency>

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

[Eclipse]: http://www.eclipse.org/downloads/
[Maven]: http://maven.apache.org/
[Java Oracle]: http://www.oracle.com/technetwork/java/javase/downloads/index.html