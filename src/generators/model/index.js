'use strict'

import Aang from '../../lib/aang/index'

export default class Model extends Aang {
  constructor (...args) {
    super(...args)

    this._normalizeName('Model')
  }

  prompting (...ang) {
    super.prompting(...ang)
  }

  writing () {
    this.fs.copyTpl(
      this.templatePath('model.es6'),
      this.destinationPath(`${this.options.modulePath}models/${this.name}.${this.options.sourceExtension}`),
      {moduleName: this.options.module, modelName: this.name}
    )

    this.composeWith('aang:model-test', this)
  }
}
