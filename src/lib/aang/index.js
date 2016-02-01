'use strict'
const changeCase = require('change-case')
import { NamedBase } from 'yeoman-generator'

export default class Aang extends NamedBase {
  _initConfig () {
    // pass defaults
    // TODO: what if not defined
    var pkgjson = this.fs.readJSON(this.destinationPath('package.json'))
    // TODO: what if not defined
    var defaults = pkgjson.config['generator-aang']
    this.config.defaults(defaults)
    this.config.save()
  }
  _normalizeName (suffix, instance) {
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
  }
  _toClassCase (name) {
    return changeCase.pascalCase(changeCase.sentenceCase(name))
  }
  _toInstanceCase (word) {
    return changeCase.camelCase(changeCase.sentenceCase(word))
  }
  _ensureSuffix (word, suffix) {
    let suffixPos = word.lastIndexOf(suffix)
    if (suffixPos === -1 || suffixPos !== word.length - suffix.length) {
      word += suffix
    }
    return word
  }
  _setModulePath () {
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
  }

  _createSrc (src, path) {
    this.fs.copyTpl(
      this.templatePath(src),
      this.destinationPath(`${this.options.modulePath}${path}/${this.name}.${this.options.sourceExtension}`),
      {moduleName: this.options.module, name: this.name}
    )
  }

  _createTest (test, path) {
    this.fs.copyTpl(
      this.templatePath(test),
      this.destinationPath(`${this.options.testPath}${path}/${this.name}.${this.options.unitExtension}`),
      {moduleName: this.options.module, name: this.name}
    )
  }

  constructor (args, options) {
    super(args, options)
    // Configure Lodash templating so it ignores interpolation markers in
    // ES6 template strings.
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

    this.option('sourceExtension', {
      desc: 'override to package default extension for source',
      type: String,
      defaults: this.config.get('extensions').source
    })

    this.option('unitExtension', {
      desc: 'override to package default extension for unit tests',
      type: String,
      defaults: this.config.get('extensions').unit
    })

    this.option('e2eExtension', {
      desc: 'override to package default extension for e2e tests',
      type: String,
      defaults: this.config.get('extensions').e2e
    })
  }

  prompting () {
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
}
