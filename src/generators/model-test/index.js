'use strict'
import Aang from '../../lib/aang/index'

export default class ModelTest extends Aang {
  constructor (...args) {
    super(...args)

    this._normalizeName('Model')
  }

  prompting (...args) {
    super.prompting(...args)
  }

  writing () {
    this._createTest('model.js.tmpl', 'models')
  }
}
