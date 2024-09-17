---
layout: default
breadcrumbs: [{ "text": "Tutorials", "url": "/dev/tutorials"}, { "text": "Use FenixEdu API in your application", "url": "/dev/tutorials/use-fenixedu-api-in-your-application" }, { "text": "PHP SDK", "url": "/dev/tutorials/use-fenixedu-api-in-your-application/php-sdk" }]
root: "../../../"
---

## Use FenixEdu API in your application - PHP SDK

In this tutorial, you will learn how to use the FenixEdu™ PHP SDK to easily invoke the FenixEdu™ REST API. Make sure you started by following the tutorial that teaches you [how to use FenixEdu in your application][use-fenix-edu-in-your-application-tutorial].

### Table of Contents
* [Step 1 - Include the PHP SDK in your project](#step_1__include_the_php_sdk_in_your_project)
* [Step 2 - Define your Credentials](#step_2__define_your_credentials)
* [Step 3 - Use the Client](#step_3__use_the_client)

### Step 1 - Include the PHP SDK in your project

All you have to do is [download][FenixEduPHPSDK] the FenixEdu™ PHP SDK and extract it to your project root. On all examples from this point onward, we shall assume the folder containing the SDK files is named ```fenixedu-php-sdk```. Now you should be able to include the FenixEdu class in your PHP scripts:

{% highlight php %}
<?php
  require_once("fenixedu-php-sdk/FenixEdu.php");
{% endhighlight %}


### Step 2 - Define your credentials

To define your credentials, all you have to do is create an array with your FenixEdu™ application credentials and pass it as an argument when creating the ```FenixEdu``` instance, just like in the example below:

{% highlight php %}
<?php
  require_once("fenixedu-php-sdk/FenixEdu.php");

  $credentials = array(
    'access_key' => "1234567890123456",
    'secret_key' => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCdefGHIjklMNOpqrSTUwxyZabcDEFghi==",
    'callback_url' => "https://<your_application_callback_url>",
    'api_base_url' => "https://fenix.tecnico.ulisboa.pt");

  $fenixedu = new FenixEdu($credentials);
{% endhighlight %}

Both ```access_key``` and ```secret_key``` are provided in the FenixEdu™ installation where you registered your application. The ```callback_url``` is the endpoint in your application that will handle the callback after an authorization or non-authorization from the end-user. Finally, the ```api_base_url``` is the base endpoint where the API will be invoked.

> <span>Note</span>
> However the ```api_base_url``` is exemplified with Técnico Lisboa endpoint, FenixEdu™ is also used in other universities, and consequently they will have different base URLs. For this reason, the SDK expects this field to be configured.

### Step 3 - Use the Client

After instancing FenixEdu with your credentials, you can start using the SDK and make synchronous invocations to the FenixEdu™ API. However, before you can invoke any of the ```private``` endpoints of the API, you first need to ask the end-user to grant authorization to your application.

This will be done automatically if you use the provided domain classes. The following example will automatically trigger the authorization request and print the end-user's username afterwards:

{% highlight php %}
<?php
  require_once("fenixedu-php-sdk/FenixEdu.php");
  $credentials = ...
  $fenixedu = new FenixEdu($credentials);

  //authorization is automatically triggered in the getPerson() call.
  $person = $fenixedu->getPerson(); 

  $username = $person->getIstId();

  echo($username);
{% endhighlight %}

> <span>Note</span>
> When using the domain classes, it is not necessary to explicitly include them in your code. The SDK loads any domain class as soon as it is needed for the first time.

If you prefer to use the FenixEduServices interface to call the endpoints directly, instead of using the provided domain classes, you should do something like this:

{% highlight php %}
<?php
  require_once("fenixedu-php-sdk/FenixEdu.php");
  $credentials = ...
  $fenixedu = new FenixEdu($credentials);

  $services = $fenixedu->getServices();
  
  //the login() method explicitly triggers the authorization request
  $services->login();
  
  $person = $services->getPerson();
  $username = $person->username;
  
  echo($username);
?>
{% endhighlight %}

In case you just wish to force the user to login in order to use your application, you can simply call the ```login``` method from ```FenixEdu```, as shown:

{% highlight php %}
<?php
  require_once("fenixedu-php-sdk/FenixEdu.php");
  $credentials = ...
  $fenixedu = new FenixEdu($credentials);
  
  $fenixedu->login();
{% endhighlight %}

> <span>Note</span>
> Behind the curtains, all of the previous examples are actually calling the ```login``` method from the ```FenixEduServices``` class. This method handles all the authorization steps, including the API's callback.

In order to logout the user and clean all their session data, you may either call the ```logout``` method from ```FenixEdu``` or from ```FenixEduServices```.

Finally, we present a simple example of an application that shows the user a list of his final grades on completed courses:

{% highlight php %}
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
</head>
<body>
<div>

<?php
  require_once("fenixedu-php-sdk/FenixEdu.php");

  $credentials = array(
    'access_key' => "1234567890123456",
    'secret_key' => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzABCdefGHIjklMNOpqrSTUwxyZabcDEFghi==",
    'callback_url' => "https://<your_application_callback_url>",
    'api_base_url' => "https://fenix.tecnico.ulisboa.pt");

  $fenixedu = new FenixEdu($credentials);
  
  $person = $fenixedu->getPerson();
  
  foreach($person->getCurriculum() as $curriculum) {
    foreach($curriculum->getApprovedCourses() as $course) {
        $name = $course->getName();
        $credits = $course->getCredits();
        $grade = $course->getGrade();
        $html = "<div>" . $name . " (" . $credits . ") - " . $grade . "</div>";
        echo($html);
    }
  }
?>

</div>
</body>
</html>
{% endhighlight %}
[use-fenix-edu-in-your-application-tutorial]: /dev/tutorials/use-fenixedu-api-in-your-application
[RequestUserPermissionPage]: /dev/tutorials/use-fenixedu-api-in-your-application/#step_22__request_the_user_permission
[FenixEduPHPSDK]: http://github.com/ist-dsi/fenixedu-php-sdk
