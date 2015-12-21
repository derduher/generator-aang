'use strict'
var yeoman = require('yeoman-generator')
var changeCase = require('change-case')

module.exports = yeoman.generators.NamedBase.extend({
  _initConfig: function () {
    // pass defaults
    // TODO: what if not defined
    var pkgjson = this.fs.readJSON(this.destinationPath('package.json'))
    // TODO: what if not defined
    var defaults = pkgjson.config['generator-aang']
    this.config.defaults(defaults)
    this.config.save()
  },
  _normalizeName: function (suffix, instance) {
    var origArg = this.name

    if (instance) {
      this.name = this._toInstanceCase(this.name)
    } else {
      this.name = this._toClassCase(this.name)
    }

    this.name = this._ensureSuffix(this.name, suffix)

    if (origArg !== this.name) {
      this.log('Coerced to ' + this.name + '.')
    }
  },
  _toClassCase: function (name) {
    return changeCase.pascalCase(changeCase.sentenceCase(name))
  },
  _toInstanceCase: function (word) {
    return changeCase.camelCase(changeCase.sentenceCase(word))
  },
  _ensureSuffix: function (word, suffix) {
    let suffixPos = word.lastIndexOf(suffix)
    if (suffixPos === -1 || suffixPos !== word.length - suffix.length) {
      word += suffix
    }
    return word
  },
  _setModulePath: function () {
    if (!this.options.modulePath) {
      var deRooted
      if (this.options.module.indexOf(this.options.rootModule) === 0) {
        deRooted = this.options.module.slice(this.options.rootModule.length)
        if (deRooted.indexOf('.') === 0) {
          deRooted = deRooted.slice(1)
        }
      }

      this.options.modulePath = this.options.rootModulePath + '/' + deRooted.replace(/\./g, '/')
      this.options.testPath = this.options.rootTestPath + '/' + deRooted.replace(/\./g, '/')
    }

    if (this.options.modulePath[this.options.modulePath.length - 1] !== '/') {
      this.options.modulePath += '/'
    }

    if (this.options.testPath[this.options.testPath.length - 1] !== '/') {
      this.options.testPath += '/'
    }
  },
  constructor: function () {
    yeoman.generators.NamedBase.apply(this, arguments)
    this._initConfig()

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

    this.option('rootTestPath', {
      desc: 'path to tests',
      type: String,
      defaults: this.config.get('paths').specs
    })

    this.option('modulePath', {
      desc: 'override to module option\'s generated path',
      type: String
    })

    this.option('testPath', {
      desc: 'override to test option\'s generated path',
      type: String
    })
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
        this._setModulePath()
        done()
      }.bind(this))
    } else {
      this._setModulePath()
      done()
    }
  }
})
