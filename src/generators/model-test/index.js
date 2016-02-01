'use strict'
import Aang from '../../lib/aang/index'

export default class ModelTest extends Aang {
  constructor (...args) {
    super(...args)

    this._normalizeName('Model')
  }

  prompting (...args) {
    super.prompting(...args)
  }

  writing () {
    this.fs.copyTpl(
      this.templatePath('model.js.tmpl'),
      this.destinationPath(`${this.options.testPath}models/${this.name}.${this.options.unitExtension}`),
      {moduleName: this.options.module, modelName: this.name}
    )
  }
}
