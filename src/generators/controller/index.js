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
    this._createSrc('controller.es6', 'controllers')
    this.composeWith('aang:controller-test', this)
  }
}