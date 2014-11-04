---
layout: default
title: Announcing the release of FenixEdu Academic 4.0
breadcrumbs: [{ "text": "Blog", "url": "/blog" }, { "text": "Announcing the release of FenixEdu Academic 4.0", "url": "/blog/2014/11/04/fenix-edu-4"}]
root: "../../../../../"
excerpt: "FenixEdu Project is pleased to announce the release of FenixEdu Academic 4.0."
---

## Announcing the release of FenixEdu Academic 4.0

Hello everyone

FenixEdu Project is pleased to announce the release of FenixEdu Academic 4.0. 

FenixEdu as a standalone software project ceases to exist today. Over the last 4 months we've been refactoring, removing, adapting and retooling the old source code base into a family of products that delivers to schools the tools they need to improve and optimized themselves. This is by far the biggest and most important release that we as a project have made.

FenixEdu Academic is the first of our new product family to be released. FenixEdu Academic is a new Student Information System solution, that manages all the school administrative back office information, including students, teachers, degrees, courses, grades, spaces and schedules. In order to do this, we had to put the old FenixEdu into a diet a remove a lot of unnecessary features, moving them into institution specific or moving them into other products if they don’t matter in a core Student Information System.

In previous versions of  FenixEdu this comprises most of the features that require login to access them. If you are migrating from previous versions there are lots of updates for you:

### Removing CMS and LMS code

We’ve remove all the source code related to course, degree and research center homepages. We also removed online tests code. We have more information about this later this week, so stay tunned.

### New report system

FenixEdu came with the support for generating documents, based on system information. This was useful for things like issuing diplomas or certificates. However this was quite complex to be adapted to other schools. It used a very old version of JasperReports. It was a headache each time we had to change some document 

With the introduction of OddJet early this year we now are able to change a document template just using OpenOffice. Also, with FenixEdu Academic 4 we are now introduce new way to change document templates in runtime so you don’t have to code anything if you want to add some string or change some image. 

### Moving OAuth to Bennu

FenixEdu Academic 4 uses Bennu 3.4, so we have OAuth support right on the Web Framework. So, we are moving the application management interfaces into that architecture and removing the old managment system. 

These are architectural change, so if you are a Third Party Developer against the FenixEdu API, this doesn’t change anything for you.

### Removing Roles

FenixEdu used a Role based system for authentication and access control purposes. Over the years this system gave us more problems than it should. If the universe was strongly typed (a student has access to student stuff, a teacher has access to teacher stuff), everything would be a lot easier.

The problem is that organizations don’t work like that. There are always exceptions (a student that teaches some classes, or a teacher that is taking some courses), and a role base system doesn’t scale on this very well.

That is why we are now moving to Bennu’s Groups, and deprecating the Roles. Right now the data structures still exist but, their uses are considered deprecated and you should use Groups instead.

### Bennu Renderers 5

Bennu Renderers is a legacy presentation engine that parts of FenixEdu Academic still use. Renderers now generates bootstrap code, so although rendering and parsing is still managed by legacy code, the look and feel for users is from this side of the century. Also, with the introduction of Bennu Toolkit in Bennu v3.4 we are moving some old compontents into the standard Toolkit inputs. 

### Package Rebranding 

We are moving the source code from the old package "net.sourceforge.fenixedu" into the new naming scheme "org.fenixedu.academic". You can learn more about our source code organization in our <a href="https://confluence.fenixedu.org/display/FENIXEDU/Methodology">documentation site</a>.

### Removed modules

In order to have a core Student Information System that can be extensible for other schools we had to move some of the core code into the institution installation, or remove it all together. The new core FenixEdu Academic comes without the following modules:

* Pre-bolonha code
* Archaic academic administrative office printing system
* Quality Assurance Questionnaires
* Delegates
* Teacher Evaluation
* Teacher Credits
* Contract Information
* Tutorships

If you work, at Técnico Lisboa, the place where we develop FenixEdu, don’t worry everything should work as before. 


