---
layout: page
root: "../../"
---

### Make a release

Whenever you have intense software development and maintenance cycles, it is necessary to release those improved versions of your software.
If you make part of a team that is responsible for a module, and you want to release a new version of that module to the world, this tutorial gives you a good starting point.

In this tutorial you will learn how to release a new version of your module, while following a particular set of best practices.

#### Step 1 - Prepare your release candidate

To make a release of your software, you must prepare the necessary artifacts beforehand. First thing, you need to create a release candidate, which in the Git language means creating a ```release``` branch from a considered stable state of the project from the ```develop``` branch. This new branch is where you will fix some minor glitches before releasing the software as a final version.

After you identified the commit hash from which you want to release your software, you can create your release branch using the following Git command:   
	
	git checkout -b releases/<release-version> <commit-hash>

If you have some scripts or any binary files that are required, or you just want to associate them to that release, you should group them inside a folder not to be commited to the Git repository.

#### Step 2 - Write down you change log

The users of your module would like to known what changed in the new version before they upgrade to it. To ease the reading of that change set, you should generally describe the main changes that happened since the last released version. In this change log, you should define changes by this order:
1. New Features
2. Enhancements
3. Bug Fixes
4. API changes

This order and structure allows users to quickly understand the changes and quickly decide if they can migrate to the new version without major modifications or consequences to their code set.

#### Step 3 -  Github release

We follow the convention of many Git projects to perform a release: a release is strongly tied to a tag. As such, the tag should be named after the version of the release. If you don't known how the version number is defined, we remind you that we use [Semantic Versioning][Semantic Versioning] for that purpose.
Hence, after you known what version corresponds to the new release, you should use [GitFlow][GitFlow] strategy to perform your release, and push the resulting tag to Github using the following Git command:

	git push --tags <name-of-the-tag>

After you push the commit and its respective release tag, you can go to the Github interface (like explained in this [link][Github Releases]) and edit that tag to associate the artifacts gathered in Step 1, and the change log wrote in Step 2.

[Semantic Versioning]: http://semver.org/
[GitFlow]: http://nvie.com/posts/a-successful-git-branching-model/
[Github Releases]: https://github.com/blog/1547-release-your-software