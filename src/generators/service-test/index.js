/* eslint-disable no-return-assign */
'use strict'

import Aang from '../../lib/aang/index'

export default class ServiceTest extends Aang {
  constructor (...args) {
    super(...args)

    this.suffix = 'Service'
    this.case = 'camel'
  }

  prompting (...ang) {
    return super.prompting(...ang)
  }

  writing () {
    this._createTest('service.js.tmpl', 'services', {Factory: this.options.factoryName})
  }
}
