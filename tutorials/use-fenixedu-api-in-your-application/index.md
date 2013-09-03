---
layout: page
root: "../../"
---

### Use FénixEDU API in your application

In this tutorial, you will learn how to use our Java SDK to invoke our REST-based API. Although you can use a HTTP client to invoke the endpoints on your own, we developed a SDK that eases the invocation of our webservices and builds Data Transfer Objects (DTOs) so that you can easily retrieve its data.

#### Step 1 - Update your Maven Dependencies

In order to ease the use of the FénixEDU API we developed a Java client that you can use in your project by specifying a Maven dependency
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