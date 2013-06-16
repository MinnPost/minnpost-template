# {%= title || name %}

{%= description || '*Description goes here*' %}

## Data

*Describe the data sources here.  Use links and URLs to show where the data came from.  But small sized originals or modified data sources in the ```data``` folder*

*For larger data sources that may need to be processed, provide instructions on how to download.  For instance:  ```cd data && wget blah.txt```.  Also, make sure to put an entry in the ```.gitignore```.*

## Data Processing

The following describes how the data was processed and is not necessarily needed to run or install the application, but more included for reference, transparency, and development.

*Describe data processing here, include commands.  Put data processing scripts or configurations in the ```data-processing``` folder.*

## Prerequisites

1. Install [Git](http://git-scm.com/).
1. Install [NodeJS](http://nodejs.org/).
1. Optionally, for development, install [Grunt](http://gruntjs.com/): `npm install -g grunt-cli`
{% if (python_dependencies) { %}1. Install [Python](http://www.python.org/getit/) (probably already installed on your system).
1. Install [pip](https://pypi.python.org/pypi/pip): `easy_install pip`
1. Optional, use [virtualenv](http://www.virtualenv.org/en/latest/), where ENV is an arbitrary environment name.
    1. `easy_install virtualenv`
    1. `virtualenv ENV`
    1. `cd ENV && source bin/activiate; cd -;` {% } %}

## Install

1. Check out this code with [Git](http://git-scm.com/): `git clone git@github.com:MinnPost/{%= name %}.git`
1. Go into the template directory: `cd {%= name %}`
1. Install NodeJS packages: `npm install`
{% if (python_dependencies) { %}1. Install python packages: `pip install -r requirements.txt` {% } %}
1. View `index.html` in your browser.

## Build

1. Run: `grunt`

## Deploy

1. Run: `grunt mp-deploy`


