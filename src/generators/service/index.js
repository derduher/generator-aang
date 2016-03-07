'use strict'

import Aang from '../../lib/aang/index'

export default class Service extends Aang {
  constructor (...args) {
    super(...args)

    this.suffix = 'Service'
    this.case = 'camel'
  }

  prompting (...ang) {
    super.prompting(...ang)
  }

  writing () {
    this._createSrc('service.es6', 'services', {Factory: 'f'})

    //this.composeWith('aang:service-test', this)
  }
}
