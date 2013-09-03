---
layout: page
root: "../../../"
---

### Create your own application - Bankai Front-End

In this tutorial, you will learn how to use Bankai to develop your application's front-end.
First, make sure you started by following the [create your own application tutorial][Create your own application], and that you know how to [expose your web services with a REST API][Expose your Web Services with a REST API]. This requirement is because Bankai-based applications assume that you expose your application services through a REST API.

#### Step 1 - Understand the essence of Bankai

Bankai is a consolidation of several Javascript libraries that aim to ease the development of User Interface (UI) client-side applications that communicate with a REST API.

With Bankai, you define the front-end logic in Javascript relying on the [Backbone][Backbone] library, extended with [Marionette.js][Marionette] library. In a nutshell, Backbone allows you to define your client-side Javascript application using the concepts of Collection, Model, View and Router.

Bankai also consolidates other utilitary Javascript libraries that ease templating, internalization, and human-timestamping concerns.

The main advantage of using Bankai, or any other Javascript client-side technologies, is that the application front-end code is downloaded once from the server, and further requests and responses save a lot of bandwith as they only need to transfer resource data (usually in JSON), instead of the whole HTML page.

#### Step 2 - Scaffold your project

To generate a Bankai application project from scratch, you just need to execute the following interactive Maven command:

	mvn archetype:generate
		-DarchetypeGroupId=pt.ist
		-DarchetypeArtifactId=bankai-project-archetype

After you run the above command, you will be prompted by a set of properties that are required to scaffold your Bankai project. When Maven finishes scaffolding your project, you will have a folder named after the artifactId that you choosed during the process.

#### Step 3 - Import the project to Eclipse

After the application is generated, you are ready to import it into Eclipse as a Maven project. To do so, you should right click the package explorer window, ```Import... > Maven > Existing Maven Project``` and select the folder that was generated in the previous step.

#### Step 4 - Define your routes

Backbone is essentially based on the MVC architectural pattern. The Controller aspect of this architectural pattern is provided through the means of the Router entity.

In the ```router.js``` file, you define both your application routes, i.e. URL patterns, and their respective controllers, i.e. the Javascript functions that will execute when the URL pattern of the route matches.

Bellow, there is a simple example of this ```router.js``` file, containing only one route:

	define(['backbone', 'marionette', 'app', 'views/Home'],
		function(Backbone, Marionette, App, HomeView) {

			return Backbone.Marionette.AppRouter.extend({
				appRoutes : {
					"home" : "showHome"
				},
				controller : {
					showHome : function() {
						App.page.show(new HomeView());
					}
				}
			});
		});

The ```router.js``` file exemplified above defines a single route that shows the Home view. This means that in a context where the fragment identifier #home is present in the URL, the Javascript function ```showHome``` is called. Additional routes and controllers should be added as needed. You can always use placeholders when defining routes and pass the matches as parameters into the controller functions. You can learn more about the router entitiy by reading [Backbone's documentation][Backbone].

#### Step 5 - Define your views

As you've seen in the previous step, after a URL matches a route pattern, a controller is called and usually there is a view being showed in a particular region of the page. These views are essentially a Javascript object that knows how to render one or more HTML templates.

All your views go into the ```webapp/<artifactId>/views/``` and 



#### Step 6 - Define your Models and Collections

Now that you learned how to trigger a particular behavior when a given URL is hit (routes), and how to display a particular view within a region of the page (views), you still need to request data from the server and display it to the user within those views.

Models manage the lifecycle of your application data, exposing CRUD operations of your application resources. 

A Collection is basically a set of Backbone models, to which you can add new models, or delete existing ones.

	define(['backbone'],
		function(Backbone) {
			return Backbone.Model.extend({
			
				urlRoot : "../api/banana/fruits"

			});
		});

The ```models/Fruit.js``` file above exemplifies a Backbone model that defines its URL root. URL root is essentially the path where models of the Fruit type are located.

#### Step 7 - Code Optimization

After you finish developing your Bankai application, you can enable the minification process to optimize your application code. This optimization analyzes all your Javascript file dependencies and consolidates mostly all your application Javascript sources into a single file, reducing the length of your variable names and removing unecessary whitespace.

To do this, you should go to your application ```pom.xml``` file and change the ```bankai.skip.js.optimization``` property to false:

	<properties>
		<bankai.skip.js.optimization>false</bankai.skip.js.optimization>
	</properties>


[Backbone]: http://backbonejs.com/
[Marionette]: http://marionettejs.com/
[Understand the DML]: /tutorials/understand-the-dml
[Create your own application]: /tutorials/create-your-own-application/
[Expose your Web Services with a REST API]: /tutorials/expose-your-web-services-with-a-rest-api/
[Renderers]: /technologies/front-end/renderers
[Vaadin]: /technologies/front-end/vaadin
[Bankai]: /technologies/front-end/bankai
[Bennu Development Team]: /teams/bennu