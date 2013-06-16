/**
 * MinnPost template: general
 */

'use strict';

// Basic template description.
exports.description = 'Creates a general template for a project.';

// Template-specific notes to be displayed before question prompts.
exports.notes = '_Project name_ should be the same as the name of the Github repository \n' +
  '\n' +
  '  * Use lowercase characters \n' +
  '  * Use hyphens instead of spaces or underscores \n' +
  '  * For projects that are very specific to a single story or group of stories, ' +
  'Prefix the repository with _minnpost-_. \n' +
  '  * For re-usable libraries, follow naming conventions that are most appropriate ' +
  'given the technologies used (language and distribution system), such as NPM and ' +
  'Node, Python and PIP. \n' +
  '\n' +
  'See: https://github.com/MinnPost/minnpost-template/wiki \n';

// Template-specific notes to be displayed after question prompts.
exports.after = 'You may need to do some install tasks now: \n' +
  '\n' +
  '  * Install NodeJS dependencies with _npm install_. \n' + 
  '  * Install Python dependencies with _pip install -r requirements.txt_. \n' + 
  '  * Install Ruby gems with _bundle install_. \n' +
  '  * Install Bower components with _bower install_. \n' + 
  '';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {
  // Some utility functions
  var handleNone = function(value) {
    return (value === 'none') ? '' : value;
  };
  var handleSplit = function(value) {
    value = handleNone(value.trim());
    return (value === '') ? [] : value.split(/\s+/);
  };

  // Add our own custom prompts, as the init.prompt() function
  // is limited
  grunt.util._.extend(init.prompts, {
    node_dependencies: {
      message: 'Node dependencies',
      default: 'none',
      warning: 'Must be zero or more space-separated dependencies with # to spearate ' +
        'package and version.  For instance, node-csv, or node-csv#~1.2',
      sanitize: function(value, data, done) { done(handleSplit(value)); }
    },
    node_devDependencies: {
      message: 'Node Dev dependencies',
      default: 'none',
      warning: 'Must be zero or more space-separated dependencies with # to spearate ' +
        'package and version.  For instance, node-csv, or node-csv#~1.2',
      sanitize: function(value, data, done) { done(handleSplit(value)); }
    },
    bower_components: {
      message: 'Bower components',
      default: 'underscore backbone jquery#1.9 jquery-jsonp',
      warning: 'Must be zero or more space-separated dependencies with # to spearate ' +
        'package and version.  For instance, underscore, or jquery#1.9',
      sanitize: function(value, data, done) { done(handleSplit(value)); }
    },
    python_dependencies: {
      message: 'Python dependencies',
      default: 'none',
      warning: 'Must be zero or more space-separated dependencies.  For instance, ' +
        'dateutils, dateutils==0.1.1, dateutils>=2.3, or ' +
        'git://git.myproject.org/MyProject.git#egg=MyProject',
      sanitize: function(value, data, done) { done(handleSplit(value)); }
    },
    ruby_gems: {
      message: 'Ruby Gems',
      default: 'none',
      warning: 'Must be zero or more space-separated dependencies with # to spearate ' +
        'package and version.  For instance, haml, or haml#1.2',
      sanitize: function(value, data, done) { done(handleSplit(value)); }
    }
  });

  // Prompts to get values
  var prompts = [
    init.prompt('name', 'minnpost-example'),
    init.prompt('title', 'MinnPost Example'),
    init.prompt('description', 'MinnPost example'),
    init.prompt('version', '0.0.1'),
    init.prompt('repository'),
    init.prompt('homepage'),
    init.prompt('bugs'),
    init.prompt('author_name'),
    init.prompt('author_email'),
    init.prompt('node_dependencies'),
    init.prompt('node_devDependencies'),
    init.prompt('bower_components'),
    init.prompt('python_dependencies'),
    init.prompt('ruby_gems')
  ];

  // Process prompts
  init.process({}, prompts, function(err, props) {
  
    // Create contributor object
    var contributors = [{
      name: props.author_name,
      email: props.author_email
    }];

    // Copy and process files, add in MIT license
    var files = init.filesToCopy(props);
    init.copyAndProcess(files, props);
    
    // Generate package.json file.  Grunt will process many things
    // automatically, but we need to customize it a bit
    props.licenses = null;
    delete props.author_name;
    delete props.author_email;
    
    props.dependencies = props.dependencies || {};
    props.node_dependencies.forEach(function(d) {
      props.dependencies[d.split('#')[0]] = (d.split('#')[1]) ? d.split('#')[1] : '*';
    }); 
    props.devDependencies = props.devDependencies || {};
    props.node_devDependencies.forEach(function(d) {
      props.devDependencies[d.split('#')[0]] = (d.split('#')[1]) ? d.split('#')[1] : '*';
    });
    
    init.writePackageJSON('package.json', props, function(pkg, props) {
      pkg.author = {
        name: 'MinnPost',
        email: 'support@minnpost.com'
      };
      pkg.licenses = [{
        type: 'MIT',
        url: 'https://github.com/MinnPost/' + props.name + '/blob/master/LICENSE.txt'
      }];
      pkg.contributors = contributors;
    
      return pkg;
    });
    
    // Since component file is just JSON, its easier to do here
    if (props.bower_components.length > 0) {
      init.writePackageJSON('component.json', {}, function(pkg) {
        pkg.name = props.name;
        pkg.version = props.version;
        pkg.main = 'index.html';
        pkg.ignore = [ '**/.*', 'node_modules', 'components' ];
        pkg.dependencies = pkg.dependencies || {};
        props.bower_components.forEach(function(c) {
          pkg.dependencies[c.split('#')[0]] = (c.split('#')[1]) ? c.split('#')[1] : '*';
        });
      
        return pkg;
      });
    }
    
    // All done!
    done();
  });
};