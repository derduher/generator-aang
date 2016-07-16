'use strict'
const Aang = require('../../lib/aang/index')

module.exports = class ControllerTest extends Aang {
  constructor (...args) {
    super(...args)

    this.suffix = 'Controller'
  }

  prompting (...args) {
    return super.prompting(...args)
  }

  writing () {
    this._createTest('controller.js.tmpl', 'controllers')
  }
}
