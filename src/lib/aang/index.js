'use strict'
const changeCase = require('change-case')
import { NamedBase } from 'yeoman-generator'

export default class Aang extends NamedBase {
  _normalizeName (suffix, instance) {
    var origArg = this.name

    if (instance) {
      this.name = this._toInstanceCase(this.name)
    } else {
      this.name = this._toClassCase(this.name)
    }

    this.name = this._ensureSuffix(this.name, suffix)

    if (this.options.fileCase !== 'name' && changeCase[this.options.fileCase]) {
      this.fileName = changeCase[this.options.fileCase](this.name)
    } else {
      this.fileName = this.name
    }

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
      this.destinationPath(`${this.options.modulePath}${path}/${this.fileName}.${this.options.sourceExtension}`),
      {moduleName: this.options.module, name: this.name}
    )
  }

  _createTest (test, path) {
    this.fs.copyTpl(
      this.templatePath(test),
      this.destinationPath(`${this.options.testPath}${path}/${this.fileName}.${this.options.unitExtension}`),
      {moduleName: this.options.module, name: this.name}
    )
  }

  constructor (args, options) {
    super(args, options)

    this.option('module', {
      desc: 'angular module name. Will be used for folder too.',
      type: String,
      alias: 'm'
    })

    this.option('rootModule', {
      desc: 'default module that other modules namespace off of',
      type: String
    })

    this.option('rootModulePath', {
      desc: 'path to scripts',
      type: String
    })

    this.option('rootTestPath', {
      desc: 'path to tests',
      type: String
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
      type: String
    })

    this.option('unitExtension', {
      desc: 'override to package default extension for unit tests',
      type: String
    })

    this.option('e2eExtension', {
      desc: 'override to package default extension for e2e tests',
      type: String
    })

    this.option('fileCase', {
      desc: 'override to package default extension for e2e tests',
      type: String,
      defaults: this.config.get('fileCase')
    })
  }

  prompting () {
    console.log('promptinglib')
    const done = this.async()
    let prompts = [
      {
        type: 'input',
        name: 'rootModule',
        message: 'what is your application\'s main module',
        store: true
      },
      {
        type: 'input',
        name: 'rootModulePath',
        message: 'what is the path to the root of your angular src',
        store: true
      },
      {
        type: 'input',
        name: 'rootTestPath',
        message: 'what is the path to the root of your unit tests',
        store: true
      },
      {
        type: 'input',
        name: 'sourceExtension',
        message: 'what extension would you like to use for your javascript (eg. js)',
        store: true
      },
      {
        type: 'input',
        name: 'unitExtension',
        message: 'what extension would you like to use for your unit tests (eg. js)',
        store: true
      },
      {
        type: 'input',
        name: 'e2eExtension',
        message: 'what extension would you like to use for your e2e tests (eg. js)',
        store: true
      }
    ]

    prompts = prompts.filter(opt => {
      if (this.config.get(opt.name) && !this.options[opt.name]) {
        this.options[opt.name] = this.config.get(opt.name)
        return false
      }
      return true
    })

    if (prompts.length) {
      this.prompt(prompts, answers => {
        for (let opt in answers) {
          this.options[opt] = answers[opt]
        }
        this.config.set(answers)

        if (!this.options.module) {
          this.prompt({
            type: 'input',
            name: 'module',
            message: 'module you would like to install this under',
            store: true
          }, answers => {
            this.options.module = answers.module
            this._setModulePath()
            done()
          })
        } else {
          this._setModulePath()
          done()
        }
      })
    }
  }
}
