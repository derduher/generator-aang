/* eslint-disable no-return-assign */
'use strict'

import Aang from '../../lib/aang/index'

export default class DirectiveTest extends Aang {
  constructor (...args) {
    super(...args)

    this.suffix = ''
    this.case = 'camel'
  }

  prompting (...ang) {
    return super.prompting(...ang)
  }

  writing () {
    this._createTest('directive.js.tmpl', 'directives')
  }
}
