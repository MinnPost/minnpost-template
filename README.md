# MinnPost Templates

This is a set of templates for interactive projects.  Given the workflow of how MinnPost uses its CMS, the publishing process of interactive pieces is usually just embedding HTML/CSS/JS into the content of an article.  This is flexible but can create some issues.

These templates use the [Grunt Project Scaffolding](http://gruntjs.com/project-scaffolding) (`grunt-init`) to create projects from templates.

See (the wiki for more in-depth on how code at MinnPost)[https://github.com/MinnPost/minnpost-template/wiki].

## Issues with interactive embedding

* Creating a development environment can be difficult, as we want the same exact HTML/CSS/JS page environment as the site.
* Code separation can be difficult and thus make it hard to structure code that is easy to read and efficient.

## Prerequisites

1. Install [Git](http://git-scm.com/).
1. Install [NodeJS](http://nodejs.org/).
1. Intall grunt-init: `npm install -g grunt-init`

## Install

1. Check out this code with [Git](http://git-scm.com/): `git clone git@github.com:MinnPost/minnpost-template.git`
1. Go into the template directory: `cd minnpost-template`
1. Install packages: `npm install`

## Templates

* `template-application`: This is a template for pieces that are full applications (which is subjective).

## Creating a project from a template

1. Create a new project on Github, see [naming guidelines](https://github.com/MinnPost/minnpost-template/wiki#repository-naming).  For instance: `minnpost-example`.
   * (Start in the open or with the intention that it will be later)[https://github.com/MinnPost/minnpost-template/wiki].
1. Checkout the code locally: `git clone git@github.com:MinnPost/minnpost-example.git`
1. Go into the directory: `cd minnpost-example`
1. Install template, for instance: `grunt-init /path/to/minnpost-template-dir/template-application`
1. Answer the questions.
1. Run install commands (if any).

### Linking templates

Grunt-init will read templates that are in a `~/.grunt-init/` folder.  It does not read recursively, so you'll have to link each one.  For instance.

`ln -s /path/to/this/repo/template-application ~/.grunt-init/template-application`

This would allow you to run this command to create templates, which will save you some keystrokes.

`grunt-init template-application`