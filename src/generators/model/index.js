'use strict'

import Aang from '../../lib/aang/index'

export default class Model extends Aang {
  constructor (...args) {
    super(...args)

    this.suffix = 'Model'
  }

  prompting (...ang) {
    super.prompting(...ang)
  }

  writing () {
    this._createSrc('model.es6', 'models')

    this.composeWith('aang:model-test', this)
  }
}
