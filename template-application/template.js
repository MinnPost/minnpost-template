/**
 * MinnPost template: general
 */

'use strict';

// Basic template description.
exports.description = 'Creates a general template for a project.';

// Template-specific notes to be displayed before question prompts.
exports.notes = '_Project name_ should be the same as the name of the Github repository \n' +
  '\n\n' +
  '  * Use lowercase characters \n' +
  '  * Use hyphens instead of spaces or underscores \n' +
  '  * For projects that are very specific to a single story or group of stories, ' +
  'Prefix the repository with _minnpost-_. \n' +
  '  * For re-usable libraries, follow naming conventions that are most appropriate ' +
  'given the technologies used (language and distribution system), such as NPM and ' +
  'Node, Python and PIP. \n' +
  '\n\n' +
  'See: https://github.com/MinnPost/minnpost-template/wiki \n';

// Template-specific notes to be displayed after question prompts.
exports.after = 'You may need to do some install tasks now: ' +
  '\n\n' +
  '  * Install NodeJS dependencies with _npm install_. \n' + 
  '  * Install Python dependencies with _pip install -r requirements.txt_. \n' + 
  '  * Install Ruby dependencies with _bundle install_. \n' +
  '';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {

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
    init.prompt('python_dependencies', 'y/N')
  ];

  // Process prompts
  init.process({}, prompts, function(err, props) {
    // Sanitize values coming in.  Check boolean type values
    ['python_dependencies'].forEach(function(p, i) {
      props[p] = (props[p] === 'y/N') ? false : props[p];
      props[p] = (props[p].toString().toLowerCase() === 'y' || props[p] === 1 || props[p] === true) ? true : false;
    });
  
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
    props.dependencies = props.dependencies || {};
    props.devDependencies = props.devDependencies || {};
    delete props.author_name;
    delete props.author_email;
    
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

    // All done!
    done();
  });
};