const Aang = require('../../lib/aang/index')

module.exports = class ModelTest extends Aang {
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
