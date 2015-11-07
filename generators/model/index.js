'use strict'
var yeoman = require('yeoman-generator')
var changeCase = require('change-case')

module.exports = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments)
    // pass defaults
    // TODO: what if not defined
    var pkgjson = this.fs.readJSON(this.destinationPath('package.json'))
    // TODO: what if not defined
    var defaults = pkgjson.config['generator-aang']
    this.config.defaults(defaults)
    this.config.save()
    this.argument('name', {
      required: true,
      type: String,
      desc: 'The subgenerator name'
    })

    this.option('module', {
      desc: 'angular module name. Will be used for folder too.',
      type: String,
      alias: 'm'
    })

    this.option('rootModule', {
      desc: 'default module that other modules namespace off of',
      type: String,
      defaults: this.config.get('rootModule')
    })

    this.option('rootModulePath', {
      desc: 'path to scripts',
      type: String,
      defaults: this.config.get('paths').scripts
    })

    this.option('testPath', {
      desc: 'path to tests',
      type: String,
      defaults: this.config.get('paths').specs
    })

    this.option('modulePath', {
      desc: 'override to module option\'s generated path',
      type: String
    })

    var origArg = this.name
    this.log('You called the Aang subgenerator with the argument ' + this.name + '.')
    this.name = changeCase.pascalCase(changeCase.sentenceCase(this.name))

    var suffix = 'Model'
    let modelPos = this.name.lastIndexOf(suffix)
    if (modelPos === -1 || modelPos !== this.name.length - suffix.length) {
      this.name += suffix
    }

    if (origArg !== this.name) {
      this.log('Coerced to ' + this.name + '.')
    }

    this.setModulePath = function () {
      if (!this.options.modulePath) {
        var deRooted
        if (this.options.module.indexOf(this.options.rootModule) === 0) {
          deRooted = this.options.module.slice(this.options.rootModule.length)
          if (deRooted.indexOf('.') === 0) {
            deRooted = deRooted.slice(1)
          }
        }

        this.log(this.options.module, this.options.rootModule, deRooted)
        this.options.modulePath = this.options.rootModulePath + '/' + deRooted.replace(/\./g, '/')
        this.log(this.options.modulePath)
      }
    }
  },

  prompting: function () {
    var done = this.async()
    if (!this.options.module) {
      this.prompt({
        type: 'input',
        name: 'module',
        message: 'module you would like to install this under',
        store: true
      }, function (answers) {
        this.options.module = answers.module
        this.setModulePath()
        done()
      }.bind(this))
    } else {
      this.setModulePath()
      done()
    }
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('model.es6'),
      this.destinationPath(this.options.modulePath + '/models/' + this.name + '.es6'),
      {moduleName: this.options.module, modelName: this.name}
    )
  }
})
