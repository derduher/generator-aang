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
      /* if (this.options.controller) {
        this.controllerOptions = {}
        const controllerArgs = []
        Object.assign(options, this.options)
        this.composeWith('aang:controller', {options: options, args: this.args})
      } */
    })
  }

  writing () {
    let tmplPath = this.options.relativePath

    if (this.options.relativePath) {
      tmplPath += '/templates/'
    }

    this._createSrc('directive.es6', 'directives', {
      tmplPath: `${tmplPath}${this.fileName}.html`
    })

    this.composeWith('aang:directive-test', this)
  }
}
