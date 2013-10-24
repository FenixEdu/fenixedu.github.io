---
layout: default
breadcrumbs: [{ "text": "Tutorials", "url": "/tutorials"}, { "text": "Use FenixEdu API in your application", "url": "/tutorials/use-fenixedu-api-in-your-application" }, { "text": "PHP SDK", "url": "/tutorials/use-fenixedu-api-in-your-application/php-sdk" }]
root: "../../../"
---

## Use FenixEdu API in your application - PHP SDK

In this tutorial, you will learn how to use the FenixEdu™ PHP SDK to easily invoke the FenixEdu™ REST API. Make sure you started by following the tutorial that teaches you [how to use FenixEdu in your application][use-fenix-edu-in-your-application-tutorial].

### Table of Contents
* [Step 1 - Include the PHP SDK in your project](#step_1__include_the_php_sdk_in_your_project)
* [Step 2 - Define your Credentials](#step_2__define_your_credentials)
* [Step 3 - Use the Client](#step_3__use_the_client)

### Step 1 - Include the PHP SDK in your project

All you have to do is [download][FenixEduPHPSDK] the FenixEdu™ PHP SDK and unzip it to your project root. In your project root, you should have something like ```fenixedu-sdk/FenixEdu.class.php```. Having this, you should be able to include the FenixEduClient class in your PHP scripts:

{% highlight php %}
<?php
  require_once("fenixedu-sdk/FenixEduClient.class.php")
?>
{% endhighlight %}


### Step 2 - Define your credentials

To define your credentials, all you have to do is create a ```fenix.edu.config.inc.php``` file in the ```fenixedu-sdk``` folder and set your FenixEdu™ application credentials, just like in the example below:

{% highlight php %}
<?php
  $_FENIX_EDU['access_key']   = "123524412";
  $_FENIX_EDU['secret_key']   = "HhU3BB3hJ9h3n2Bhsz";
  $_FENIX_EDU['callback_url'] = "http://<your_application_callback_url>";
  $_FENIX_EDU['api_base_url'] = "http://fenix.ist.utl.pt/api";
?>
{% endhighlight %}

Both ```access_key``` and ```secret_key``` are provided in the FenixEdu™ installation where you registered your application. The ```callback_url``` is the endpoint in your application that will handle the callback after an authorization or non-authorization from the end-user. Finally, the ```api_base_url``` is the base endpoint where the API will be invoked.

> <span>Note</span>
> However the ```api_base_url``` is exemplified with Técnico Lisboa endpoint, FenixEdu™ is also used in other universities, and consequently they will have different base URLs. For this reason, the SDK expects this field to be configured.

### Step 3 - Use the Client

After you defined the configuration file, you can start using the SDK and make synchronous invocations to the FenixEdu™ API. However, before you start obtaining information from the end-user, you first need to request authorization.

#### Step 3.1 - Redirect the User to Authorize your Application

Before you can invoke the API, you must ask the end-user to grant authorization to your application. 

To perform these steps while using the PHP SDK, you should do something like this:

{% highlight php %}
<?php
  require_once("fenixedu-sdk/FenixEduClient.class.php")

  $fenixEduClient = FenixEduClient::getSingleton();
  $authorizationUrl = $fenixEduClient->getAuthorizationURL();

  header(sprintf("Location: %s", authorizationUrl));
?>
{% endhighlight %}

> <span>Note</span>
> If you have experience with PHP programming, you already know that the script that redirects the end-user to the ```authorization_url``` must not write anything to the output, or the redirect will not work.

#### Step 3.2 - Handle FenixEdu™ Authorization Callback

If the end-user authorizes your application, FenixEdu™ will invoke your callback endpoint with a query param named ```code``` that you must use to issue an ```access_token``` and a ```refresh_token```. In case the end-user refuses to authorize your application, your callback enpoint will be invoked with two query params: ```error``` and ```error_description``` as explained [here][RequestUserPermissionPage].

When the end-user authorizes your application to access the requested information, you will receive a code in the query param that you must use provide to the SDK:

{% highlight php %}
<?php

  if(isset($_GET['error'])) {
    // The end-user refused to give your application authorization.
  } else if(isset($_GET['code'])) {
    $code = $_GET['code'];
    $fenixEduClient = FenixEduClient::getSingleton();
    $fenixEduClient->setCode($code);
    $accessToken = $fenixEduClient->getAccessToken();
    $refreshToken = $fenixEduClient->getRefreshToken();
  }

?>
{% endhighlight %}

The code snippet above exemplifies how you can obtain the ```access_token``` and ```refresh_token``` that allows your application to invoke the FenixEdu™ API and obtain information about the end-user that provided the authorization. Hence, you should store both the ```access_token``` and the ```refresh_token``` for future uses.

> <span>Note</span> 
> The ```access_token``` has a lifetime of 1 hour, and when it expires, you may issue another one using the respective ```refresh_token```.


[RequestUserPermissionPage]: /tutorials/use-fenixedu-api-in-your-application/#step_22__request_the_user_permission
[FenixEduPHPSDK]: http://github.com/ist-dsi/fenixedu-php-sdk