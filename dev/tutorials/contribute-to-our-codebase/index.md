---
layout: default
breadcrumbs: [{ "text": "Tutorials", "url": "/dev/tutorials"}, { "text": "Contribute to our code base", "url": "/dev/tutorials/contribute-to-our-codebase" }]
root: "../../"
---

## Contribute to our code base

This tutorials will guide you through the list of steps necessary to contribute to our code base. It is intended for developers that wish to contribute any of the FenixEdu™ projects.

### Step 1 - Fork the Git repository

You already may know that we elected Git to be our Version Control System (VCS), and that all FenixEdu™ projects are hosted in [Github][Github]. If you're new to Git, we suggest you take a look at its [documentation page][Github Documentation].

Git is a Distributed VCS (DVCS), and consequently, every repository compreends the entire codebase, i.e. every repository is a clone. Github is a Git repository hosting service with a set of cool features. One of those features is known as pull request, which essentialy consists on notifying the original repository owners that there is a new source code changeset to be considered, i.e. a new contribution waiting to be merged into the main codebase.

To be able to make pull requests, you must fork the original repository, i.e. tell Github that you want a repository that is a clone of the original repository. For that, you should go to the project page on Github, and click on the button that says ```Fork```.

After you fork the project, you'll have that project under your Github account. Now, you must clone the forked project to your workspace using something like this in your command line:

{% highlight bash %}
git clone --origin fork git@github.com:<your-github-username>/<project-name>.git
{% endhighlight %}

> <span>Note</span>
> The ```--origin fork``` parametrization is to name your remote fork instead of origin. This ensures that your upstream remote is in fact your fork instead of the main repository where you may don't have push priviledges.

### Step 2 - Keep your fork codebase up-to-date

As other commits get into the main repository, you must keep your fork codebase up-to-date. To do this, you should pull new commits from the ```origin``` remote and the push them to your ```fork``` remote.

To pull new commits from the main repository, i.e. changes made in the ```origin``` remote, you should hit the following command in your command line:

{% highlight bash %}
git pull --rebase origin master
{% endhighlight %}

The ```--rebase``` option will ensure that your commits will be rewritten on top of the last commit considered in the master branch. This keeps the commit history clean and easy to read, avoiding a bunch of merge commits that will be hard to understand. 

### Step 3 - Push your commits to Github

After you resolve any possible conflicts, you should push your changes to your Github forked repository, i.e. the remote named ```fork```. Pushing such changes can be achieved through the following changes:

{% highlight bash %}
git push fork master
{% endhighlight %}

After you have your changes on Github, you can go and create the pull request.

### Step 4 - Create a pull request

Go to your Github page of the project under your name, something like ```http://github.com/<your-username>/<project-name>```. Then, you should click on the button that says ```Pull Requests```. Then you can create the pull request and wait for someone of the main team to accept the pull request or comment on some issue before it gets accepted.

> <span>Note</span>
> Pull requests are accepted if the source code contained in such pull requests respects our codestyle and
> is aligned with the project roadmap.


[Github]: http://github.com/FenixEdu
[Github Documentation]: http://git-scm.com/documentation