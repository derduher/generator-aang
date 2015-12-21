'use strict'

describe('<%= controllerName %>', function () {
  beforeEach(angular.mock.module('<%= moduleName %>'))
  beforeEach(inject($injector => {
    this.$controller = $injector.get('$controller')
    this.controller = this.$controller(
      '<%= controllerName %>',
      {'$scope': {}},
      // for attaching properties normally bound by the directive bindToController
      {foo: 'foo', watching: 'bar'}
    )
  }))

  it('writes tests', () => {
    expect(false).toBe(true)
  })

  describe('methodName', () => {
    it('does the thing', () => {
      expect(false).toBe(true)
    })
  })
})
