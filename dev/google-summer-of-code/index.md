---
layout: default
breadcrumbs: [{ "text": "Overview", "url": "/dev/google-summer-of-code"}]
root: "../"
---

## Google Summer Of Code 2014

These are the project ideas we propose to mentor for the 2014 Google Summer of Code


### FenixEdu Dashboard

The purpose of this task is the development of an highly configurable and modular application for selecting, processing and analysing data, obtained from the FenixEdu RESTful API. This application should enable the users to easily generate graphical data representations from a set of predefined templates. The main objective of this application is to enable instructors to generate meaningful reports about student performance in their courses and school managers and board members to perform effective drilling on the available data.


### Optimize Memory Management Algorithms for the [FenixFramework][FenixFramework]

The applications build by the FenixEdu project (such as academic management systems, LMS's, ...) are all constructed atop the [FenixFramework][FenixFramework]. This framework provides developers with a transparent transactional programming model based on Software Transactional Memory. Within this context, we propose the determine the optimum configuration for managing memory in applications based on the FenixFramework, via code analysis and collected statistic information during application execution. We also propose to explore the possibility of implementing an alternative cache that would be aware of how the application uses its domain objects. Additionally the transactional system should also communicate with the Garbage Collection algorithms, firing events, resizing the memory space or changing the execution thresholds of the algorithm.




### Automated Software Test Generation

The purpose of this task is the implementation of an automated test generation infrastructure for the FenixEdu project. Exhaustive testing is an highly desirable feature in any software development methodology, since it may enable early detection of complex bugs. However, manual test generation is a complex and slow task. Therefore, most often the number of implemented test cases is rather small and test coverage is well above what it should be. In the past, several automated software test generation methodologies have been researched and several interesting tools have been developed. The code of the FenixEdu project follows a particular set of coding rules and patterns and provides a significant amount of meta-information. Therefore, we envision that the application of automated test generation techniques should be fairly easy. Even if only simple technique are used, this will represent a tremendous advantage over the present situation where all tests are coded manually.


[FenixFramework]: http://fenix-framework.github.io/
