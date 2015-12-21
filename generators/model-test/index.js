'use strict'
var Aang = require('../../lib/aang/index')

module.exports = Aang.extend({
  constructor: function () {
    Aang.apply(this, arguments)

    this._normalizeName('Model')
  },

  prompting: function () {
    Aang.prototype.prompting.apply(this, arguments)
  },

  writing: function () {
    this.fs.copyTpl(
      this.templatePath('model.js'),
      this.destinationPath(this.options.testPath + 'models/' + this.name + '.spec.js'),
      {moduleName: this.options.module, modelName: this.name}
    )
  }
})
