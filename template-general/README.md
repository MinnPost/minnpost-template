# MinnPost Template *Update Title*

A template to help with making projects to embed in the MinnPost site.  Use this template by cloning, but don't fork with Github. *Update project description here*

## Data

*Describe the data sources here.  Use links and URLs to show where the data came from.  But small sized originals or modified data sources in the ```data``` folder*

*For larger data sources that may need to be processed, provide instructions on how to download.  For instance:  ```cd data && wget blah.txt```.  Also, make sure to put an entry in the ```.gitignore```.*

## Data Processing

*Describe data processing here, include commands.  Put data processing scripts or configurations in the ```data-processing``` folder.*

## Application or Visualization

*Describe how to view the visualization or applications here.  Usually this will just mean going to ```applications/index.html``` in your browser.```*

## Installation

*Describe any installation steps here.  This may not be necessary for your project.  Remove if not using.*

### Node.js or Grunt projects

Use a ```package.json``` file to describe project and dependencies.

1. Install ```node.js```.  On a Mac, use [Homebrew]() with: ```brew install node```
2. ```npm install```

### Python projects

Use a ```requirements.txt``` file that list packages needed.  Suggest using [virtualenv](http://pypi.python.org/pypi/virtualenv);

1. ```easy_install pip```
2. ```easy_install virtualenv```
3. ```virtualenv ENV```
4. ```cd ENV && source bin/activiate; cd -;```
5. ```pip install -r requirements.txt```

## Building

*Describe any building steps here.  This may not be necessary for your project.  Remove if not using.*

[Grunt.js](http://gruntjs.com/) can be used to combine JS or CSS files if needed.  Edit the ```grunt.js``` and ```package.json``` (used to help build with Grunt) as needed.

## Deployment

*Describe any deployment steps here*

Given that putting projects into the MinnPost site is simply embedding HTML/CSS/JS, things like images need to be hosted somewhere.  [Grunt.js](http://gruntjs.com/) can be used to push images and data to our AWS account.  Edit the ```grunt.js``` file if needed.

