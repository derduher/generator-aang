/* eslint-disable no-return-assign */
'use strict'

import Aang from '../../lib/aang/index'

export default class Service extends Aang {
  constructor (...args) {
    super(...args)

    this.suffix = 'Service'
    this.case = 'camel'
    this.option('factory', {
      desc: 'instantiate a factory?',
      type: Boolean
    })
  }

  prompting (...ang) {
    return super.prompting(...ang).then(() => {
      return this.prompt({
        type: 'confirm',
        when: this.options.factory === undefined,
        name: 'instantiate',
        message: 'instantiate a factory?',
        default: true
      }).then(({instantiate = this.options.factory}) => {
        return this.prompt({
          when: instantiate,
          type: 'input',
          name: 'factoryName',
          message: 'what is the name of the factory?'
        }).then(({factoryName = instantiate}) => this.options.factoryName = factoryName)
      })
    })
  }

  writing () {
    this._createSrc('service.es6', 'services', {Factory: this.options.factoryName})

    this.composeWith('aang:service-test', this)
  }
}
