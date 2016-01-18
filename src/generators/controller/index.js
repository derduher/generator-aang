'use strict'
import Aang from '../../lib/aang/index'

export default class Controller extends Aang {
  constructor (args, options) {
    super(args, options)

    this._normalizeName('Controller')
  }

  prompting (...args) {
    super.prompting(...args)
  }

  writing () {
    this.fs.copyTpl(
      this.templatePath('controller.es6'),
      this.destinationPath(this.options.modulePath + 'controllers/' + this.name + '.es6'),
      {moduleName: this.options.module, controllerName: this.name}
    )
    this.composeWith('aang:controller-test', this)
  }
}
