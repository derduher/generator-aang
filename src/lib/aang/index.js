'use strict'
const changeCase = require('change-case')
import { NamedBase } from 'yeoman-generator'

export default class Aang extends NamedBase {
  _normalizeName (suffix, casing) {
    var origArg = this.name

    this.name = this._toCase(this.name, casing || 'pascal')

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

  _toCase (name, casing) {
    return changeCase[casing + 'Case'](changeCase.sentenceCase(name))
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

  _createSrc (src, path, params) {
    const tmplParams = Object.assign({}, params, {
      moduleName: this.options.module,
      name: this.name
    })

    this.fs.copyTpl(
      this.templatePath(src),
      this.destinationPath(`${this.options.modulePath}${path}/${this.fileName}.${this.options.sourceExtension}`),
      tmplParams
    )
  }

  _createTest (test, path, params) {
    const tmplParams = Object.assign({}, params, {
      moduleName: this.options.module,
      name: this.name
    })

    this.fs.copyTpl(
      this.templatePath(test),
      this.destinationPath(`${this.options.testPath}${path}/${this.fileName}.${this.options.unitExtension}`),
      tmplParams
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
      desc: 'the case the file should be in',
      type: String
    })
  }

  prompting () {
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
        type: 'list',
        choices: [
          {
            name: 'camelCase',
            value: 'camelCase'
          },
          {
            name: 'PascalCase',
            value: 'pascalCase'
          },
          {
            name: 'snake_case',
            value: 'snakeCase'
          },
          {
            name: 'param-case',
            value: 'paramCase'
          }
        ],
        name: 'fileCase',
        message: 'What casing would you like your files',
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
      if (this.config.get(opt.name)) {
        if (!this.options[opt.name]) {
          this.options[opt.name] = this.config.get(opt.name)
        }
        return false
      }
      return true
    })

    let p
    if (prompts.length) {
      p = this.promptWithPromise(prompts).then(answers => {
        for (let opt in answers) {
          this.options[opt] = answers[opt]
        }
        this.config.set(answers)
      })
    } else {
      p = Promise.resolve()
    }

    p.then(() => {
      if (!this.options.module) {
        return this.promptWithPromise({
          type: 'input',
          name: 'module',
          message: 'What module should the *this* file be under?',
          store: true
        }).then(answers => {
          this.options.module = answers.module
        })
      }
    }).then(() => {
      this._normalizeName(this.suffix, this.case)
      this._setModulePath()
      done()
    })
  }

  promptWithPromise (prompts) {
    return new Promise(resolve => {
      this.prompt(prompts, answers => {
        resolve(answers)
      })
    })
  }
}
