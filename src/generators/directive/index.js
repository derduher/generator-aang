/* eslint-disable no-return-assign */
'use strict'

import Aang from '../../lib/aang/index'

export default class Directive extends Aang {
  constructor (...args) {
    super(...args)

    this.suffix = ''
    this.case = 'camel'
    this.option('controller', {
      desc: 'generate a controller',
      type: Boolean
    })
  }

  prompting (...ang) {
    return super.prompting(...ang).then(() => {
      return this.prompt({
        type: 'confirm',
        when: this.options.controller === undefined,
        name: 'controller',
        message: 'generate a controller?',
        default: true
      }).then(({controller = this.options.controller}) => {
        this.options.controller = controller
      })
    }).then(() => {
      if (this.options.controller) {
        this.controllerOptions = {}
        Object.assign(this.controllerOptions, this.options)
        this.composeWith('aang:controller', {options: this.controllerOptions, args: this.args})
      }
    })
  }

  writing () {
    let tmplPath = this.options.relativePath

    if (this.options.relativePath) {
      tmplPath += '/templates/'
    }

    const directiveParams = {
      tmplPath: `${tmplPath}${this.fileName}.html`
    }

    if (this.options.controller) {
      directiveParams.controller = this.controllerOptions.name
    }

    this._createSrc('directive.es6', 'directives', directiveParams)

    this.composeWith('aang:directive-test', this)
  }
}
