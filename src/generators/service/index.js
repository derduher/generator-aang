/* eslint-disable no-return-assign */
'use strict'

import Aang from '../../lib/aang/index'

export default class Service extends Aang {
  constructor (...args) {
    super(...args)

    this.suffix = 'Service'
    this.case = 'camel'
    this.option('factory', {
      desc: 'instantiate a factory?'
    })
  }

  prompting (...ang) {
    return super.prompting(...ang).then(() => {
      let p
      if (this.options.factory === undefined) {
        p = this.prompt({
          type: 'confirm',
          name: 'instantiate',
          message: 'instantiate a factory?',
          default: true
        })
      } else {
        p = Promise.resolve({instantiate: this.options.factory})
      }
      return p.then(({instantiate}) => {
        if (instantiate) {
          return this.prompt({
            type: 'input',
            name: 'factoryName',
            message: 'what is the name of the factory?'
          }).then(({factoryName}) => this.options.factoryName = factoryName)
        }
      })
    })
  }

  writing () {
    this._createSrc('service.es6', 'services', {Factory: this.options.factoryName})

    // this.composeWith('aang:service-test', this)
  }
}
