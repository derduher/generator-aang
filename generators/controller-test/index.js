'use strict'
var Aang = require('../../lib/aang/index')

module.exports = Aang.extend({
  constructor: function () {
    Aang.apply(this, arguments)

    this._normalizeName('Controller')
  },

  prompting: function () {
    Aang.prototype.prompting.apply(this, arguments)
  },

  writing: function () {
    console.log(this.options.testPath)
    this.fs.copyTpl(
      this.templatePath('controller.js'),
      this.destinationPath(this.options.testPath + 'controllers/' + this.name + '.spec.js'),
      {moduleName: this.options.module, controllerName: this.name}
    )
  }
})
