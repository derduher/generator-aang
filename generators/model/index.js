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
      this.templatePath('model.es6'),
      this.destinationPath(this.options.modulePath + 'models/' + this.name + '.es6'),
      {moduleName: this.options.module, modelName: this.name}
    )

    this.composeWith('aang:model-test', this)
  }
})
