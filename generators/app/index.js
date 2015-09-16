'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var slug = require('slug');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the divine ' + chalk.red('GulpUnderscore') + ' generator!'
    ));

    var prompts = [{
      type: 'input',
      name: 'theme_author',
      message: 'What\'s your name?',
      default: this.appname + ' author'
    },
    {
      type: 'input',
      name: 'theme_name',
      message: 'What\'s the name of your awesome theme?',
      default: this.appname,
    },
    {
      type: 'input',
      name: 'theme_slug',
      message: 'What slug should identify your app?',
      default: slug(this.appname, '_'),
    },
    {
      type: 'input',
      name: 'theme_uri',
      message: 'What\'s your URI?',
      default: '',
    },
    {
      type: 'input',
      name: 'theme_description',
      message: 'Theme description',
      default: '',
    },
    {
      type: 'confirm',
      name: 'bootstrap',
      message: 'Should we include bootstrap for you?',
      default: true
    },
    {
      type: 'confirm',
      name: 'SASS',
      message: 'Do you want to use SASS?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;
      this.props.slug = props.slug;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      /* jshint -W106 */
      this.fs.copyTpl(
        this.templatePath('_'),
        this.destinationPath('.'),
        this.props // All props can be used in template
      );

      this.fs.copy(
        this.templatePath('_package.json'),
        this.destinationPath('package.json')
      );
      this.fs.copy(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json')
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
      this.fs.copy(
        this.templatePath('Gulpfile.js'),
        this.destinationPath('Gulpfile.js')
      );
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );
    }
  },

  install: function () {
    // this.installDependencies();
  }
});
