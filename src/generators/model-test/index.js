'use strict'
import Aang from '../../lib/aang/index'

export default class ModelTest extends Aang {
  constructor (...args) {
    super(...args)

    this.suffix = 'Model'
  }

  prompting (...args) {
    return super.prompting(...args)
  }

  writing () {
    this._createTest('model.js.tmpl', 'models')
  }
}
