'use strict'
import Aang from '../../lib/aang/index'

export default class ControllerTest extends Aang {
  constructor (...args) {
    super(...args)

    this._normalizeName('Controller')
  }

  prompting (...args) {
    super.prompting(...args)
  }

  writing () {
    this.fs.copyTpl(
      this.templatePath('controller.js.tmpl'),
      this.destinationPath(`${this.options.testPath}controllers/${this.name}.${this.options.unitExtension}`),
      {moduleName: this.options.module, controllerName: this.name}
    )
  }
}
