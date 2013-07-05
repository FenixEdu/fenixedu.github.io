---
layout: page
root: "../../"
---

## Authentication

Bennu offers two mechanisms to authenticate users: username-password credentials or through the single-sign-on CAS protocol.

### Username-Password Credentials
In order to authenticate a user using username-password credentials, the following static method is invoked by Bennu login handler.


	UserSession Authenticate.login(HttpSession session, String username, String password, boolean checkPassword)


### CAS Authentication

For example, you can disable CAS authentication for localhost by specifying the following property in the ```src/main/resources/configuration.properties``` file of your web-application project:

	localhost.cas.enable=false
