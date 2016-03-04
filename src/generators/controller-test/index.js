'use strict'
import Aang from '../../lib/aang/index'

export default class ControllerTest extends Aang {
  constructor (...args) {
    super(...args)

    this.suffix = 'Controller'
  }

  prompting (...args) {
    super.prompting(...args)
  }

  writing () {
    this._createTest('controller.js.tmpl', 'controllers')
  }
}
