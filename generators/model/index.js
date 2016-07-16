const Aang = require('../../lib/aang/index')

module.exports = class Model extends Aang {
  constructor (...args) {
    super(...args)

    this.suffix = 'Model'
  }

  prompting (...ang) {
    return super.prompting(...ang)
  }

  writing () {
    this._createSrc('model.es6', 'models')

    this.composeWith('aang:model-test', this)
  }
}
