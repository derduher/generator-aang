'use strict'

var path = require('path')
var fs = require('fs-extra')
var assert = require('yeoman-assert')
var helpers = require('yeoman-test')
var deps = [
  [helpers.createDummyGenerator(), 'aang:service-test']
]

describe('Aang:generators/service', function () {
  describe('yo aang:service name --module com.project', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/service'))
        .inTmpDir(function (dir) {
          fs.copySync(path.join(__dirname, '../templates/common'), dir)
        })
        .withGenerators(deps)
        .withArguments('name')
        .withPrompts({module: 'com.project', instantiate: false})
        .withOptions({ skipInstall: true, force: true })
        .on('end', done)
    })

    it('creates the service in the base module location', function () {
      assert.file([
        'app/assets/javascripts/services/name_service.js'
      ])
    })

    it('has file name, module filled out', function () {
      assert.fileContent('app/assets/javascripts/services/name_service.js', /angular\.module\('com\.project/)
      assert.fileContent('app/assets/javascripts/services/name_service.js', /service\('nameService/)
    })
  })

  describe('yo aang:service \'name service\' --module com.project.module', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/service'))
        .inTmpDir(function (dir) {
          fs.copySync(path.join(__dirname, '../templates/common'), dir)
        })
        .withGenerators(deps)
        .withArguments('NameService')
        .withOptions({ module: 'com.project.module', factory: false })
        .on('end', done)
    })

    it('creates the file in a subfolder of the root', function () {
      assert.file([
        'app/assets/javascripts/module/services/name_service.js'
      ])
    })

    it('has file name, module filled out', function () {
      assert.fileContent('app/assets/javascripts/module/services/name_service.js', /angular\.module\('com\.project.module/)
      assert.fileContent('app/assets/javascripts/module/services/name_service.js', /service\('nameService/)
    })
  })

  describe('yo aang:service \'name service\' --module com.project.module --factory', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/service'))
        .inTmpDir(function (dir) {
          fs.copySync(path.join(__dirname, '../templates/common'), dir)
        })
        .withGenerators(deps)
        .withArguments('NameService')
        .withPrompts({instantiate: true, factoryName: 'Fact'})
        .withOptions({module: 'com.project.module'})
        .on('end', done)
    })

    it('has an instance of a Factory', function () {
      assert.fileContent('app/assets/javascripts/module/services/name_service.js', /new\sFact\(/)
    })
  })
})
