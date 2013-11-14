---
layout: default
breadcrumbs: [{ "text": "Tutorials", "url": "/dev/tutorials"}, { "text": "Create your own application", "url": "/dev/tutorials/create-your-own-application" }, { "text": "Spring MVC", "url": "/dev/tutorials/create-your-own-application/spring-mvc" }]
root: "../../../"
---

## Create your own application - Spring MVC

In this tutorial, you will learn how to use Spring MVC to develop your application's front-end.
First, make sure you started by following the [create your own application tutorial][Create your own application]. 

### Table of Contents

* [Step 1 - Identify your application routes](#step_1__identify_your_application_routers)
* [Step 2 - Define your Controllers](#step_2__define_your_application_controllers)
* [Step 3 - Define your Views](#step_3__define_your_application_views)

### Step 1 - Identify your application routes

The first thing to do before developing your application is to think about which User Interfaces will exist, sketch some mockups for those interfaces, and identify the URLs where they will be displayed. Such URLs are the routes of your application.

* ```GET /bananas``` - List all the existing Bananas
* ```GET /bananas/{id}``` - Shows a detailed view for a Banana with the given ```{id}```
* ```POST /bananas/create``` - Shows a form to create a new Banana
* ```POST /bananas``` - Action that the form will call to provide input data about the new Banana

These are three simple routes that will allow the list, detailed view and creation of new Bananas. The next thing to do is define the controllers that will handle such routes.

### Step 2 - Define your Controllers

To define a new controller, you should create a new class, for example ```BananaController```, annotate it with ```@Controller``` and inherit from the ```AbstractController```:

{% highlight java %}
@Controller
public class BananaController extends AbstractController {
	
  @RequestMapping(value = "/bananas", method = RequestMethod.GET)
  public String listBananas(Model model) {
    User user = userLogin();
    List<Banana> bananas = ...
    model.addAttribute("bananas", bananas);
    return "bananas/list";
  }

  ...
}
{% endhighlight %}

The code snippet described above defines a new controller class that can handle several request mappings. In the example, we defined a request mapping that handles URLs like ```http://domain.com/bananas```. This means that whenever there is a web browser accessing this URL, the ```listBananas``` method will handle such request.

### Step 3 - Define your Views

The final step of this development workflow is to define the view that will be displayed to the end-user of your application. As said before, these views will have access to the objects injected to the ```Model``` in the controller defined in the previous step.

An excerpt of the ```bananas/list.jsp``` could be:

{% highlight jsp %}
...
<div class="banana-list">
  <c:forEach var="banana" items="${bananas}">
    ${banana.name}<br/>
  </c:forEach>
</div>
...
{% endhighlight %}

[Create your own application]: /dev/tutorials/create-your-own-application/

