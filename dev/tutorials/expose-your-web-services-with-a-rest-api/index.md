---
layout: default
breadcrumbs: [{ "text": "Tutorials", "url": "/tutorials"}, { "text": "Expose your web-services with a REST API", "url": "/tutorials/expose-your-web-services-with-a-rest-api/" }]
root: "../../"
---

### Expose your web-services with a REST API

If your software module has a user interface that needs to consume a REST API, you should expose web-services from your module with a REST API.

In this tutorial you will learn how to identify and implement a set of REST endpoints that expose your module features through web-services.

#### Step 1 - Identify your resources

The first thing to do when building a REST API is to identify which resources will be exposed by your module. Note that resources are not necessarily
domain entities, althought it may appear to be so.

Let's take for instance an application that manages a library. Examples of resources that you might want to expose are:

* books   
* requisitions   
* ...

These resources identify the data entities that your user interface will need to display to the user so that he can interact with the application and perform all the necessary use cases.

#### Step 2 - Define your endpoints and methods

Now that you identified all the necessary resources to expose, you need to identify their respective locations.

REST APIs are accessible through HTTP, therefore, it is necessary to identify the URIs and the respective methods where the resources they expose can be accessed. These URIs are essentially paths, and can be contextual, like for example listing all the requisitions of a particular book:
```/books/523523435/requisitions```

Then, you can associate a particular HTTP method to each one of these paths, where each method has a particular meaning:
The main four HTTP methods, and their meanings, are:
* ```GET``` - Reads an existing resource
* ```POST``` - Creates a new resource
* ```PUT``` - Updates an existing resource
* ```DELETE``` - Deletes an existing resource

For example, creating a new book, should be represented by:   
A ```POST``` on ```/books```.

And the parameters to pass on that ```POST``` invocation should be the following JSON:

{% highlight json %}
{
  "title": "The Hobbit",
  "isbn": 3423123421213
}
{% endhighlight %}

If successful, this invocation should provide the following JSON response, but it is optional:
	
{% highlight json %}
{
  "id": 1542341141,
  "title": "The Hobbit",
  "isbn": 3423123421213
}
{% endhighlight %}

Consequently, invoking a ```GET``` on ```/books/1542341141```, we should obtain a similar response, i.e. a JSON describing a possible representation of the book with object id 1542341141:

{% highlight javascript %}	
{
  "id": 1542341141,
  "title": "The Hobbit",
  "isbn": 3423123421213
}
{% endhighlight %}

#### Step 3 - Externalize your resources

A REST API normally operates with the exchange of resources that are externalized through a particular data notation. As you've seen in the previous steps, we are big fans of the JSON (JavaScript Object Notation). This is because our client-side front-end technologies are mainly Javascript-based, and it becomes easier to create and parse data in this JSON format.

Before you get to implement the endpoints that you identified in the previous step, you must provide externalizations of your application resources using an interchangeble notation like JSON. The Bennu infrastructure provides a library that eases that externalization through the implementation of three interfaces:
* JsonViewer - Given a particular domain object, creates a JsonElement that represents that domain object.
* JsonCreator - Given a particular JSON object, creates a new domain object.
* JsonUpdater - Given a particular JSON object, updates an existing domain object.
* JsonAdapter - This interface implements the above three interfaces.

An example of a BookAdapter that implements the JsonAdapter interface, i.e. all three JsonViewer, JsonCreator and JsonUpdater interfaces:

{% highlight java %}
@DefaultJsonAdapter(Book.class)
public class BookAdapter implements JsonAdapter<Book> {

  @Override
  public Book create(JsonElement jsonElement, JsonBuilder ctx) {
    final JsonObject json = jsonElement.asJsonObject();
    String name = json.get("title");
    String isbn = json.get("isbn");
    return BookManager.createBook(title, isbn);
  }


  @Override
  public Book update(JsonElement jsonElement, Book book, JsonBuilder ctx) {
    final JsonObject json = jsonElement.asJsonObject();
    String name = json.get("title");
    String isbn = json.get("isbn");
    return book.update(title, isbn);
  }
		
  @Override
  public JsonElement view(Book book, JsonBuilder ctx) {
    final JsonObject json = new JsonObject();
    json.addProperty("id", book.getExternalId());
    json.addProperty("title", book.getTitle());
    json.addProperty("isbn", book.getIsbn());
    return json;
  }
}
{% endhighlight %}

The annotation ```@DefaultJsonAdapter(Book.class)``` registers this Adapter class in the the JSON library, so it knowns what adapter to use when handling a object of the Book class.

#### Step 4 - Implement the identified endpoints

Now that you identified the necessary endpoints, you should implement them on the server side, consuming the domain information in order to produce JSON responses to invocations on those endpoints. The Bennu infrastructure uses a library that eases this task, which is the bennu-json library.

Then, to expose a particular endpoint, the Bennu infrastructure also provides another context class, from which you can extend you should create a new class that extends the ```BennuRestResource``` class, like in the example:

{% highlight java %}
public class OrderResource extends BennuRestResource {

  @POST
  @Path("/orders")
  @Produces(MediaType.APPLICATION_JSON)
  public String createOrder(JsonElement jsonElement) {
    accessControl("#users");
    return create(jsonElement);
  }

  ...

}
{% endhighlight %}

[Semantic Versioning]: http://semver.org/