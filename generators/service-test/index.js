const Aang = require('../../lib/aang/index')

module.exports = class ServiceTest extends Aang {
  constructor (...args) {
    super(...args)

    this.suffix = 'Service'
    this.case = 'camel'
  }

  prompting (...ang) {
    return super.prompting(...ang)
  }

  writing () {
    this._createTest('service.js.tmpl', 'services', {Factory: this.options.factoryName})
  }
}
