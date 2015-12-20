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
    this.fs.copyTpl(
      this.templatePath('controller.es6'),
      this.destinationPath(this.options.modulePath + 'controllers/' + this.name + '.es6'),
      {moduleName: this.options.module, controllerName: this.name}
    )
  }
})
