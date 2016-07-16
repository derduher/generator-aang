const Aang = require('../../lib/aang/index')

module.exports = class DirectiveTest extends Aang {
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
