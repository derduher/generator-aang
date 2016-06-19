'use strict'

var path = require('path')
var fs = require('fs-extra')
var assert = require('yeoman-assert')
var helpers = require('yeoman-test')

describe('Aang:generators/service-test', function () {
  describe('things', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/service-test'))
      .inTmpDir(function (dir) {
        fs.copySync(path.join(__dirname, '../templates/common'), dir)
      })
      .withArguments('name')
      .withPrompts({module: 'com.project'})
      .withOptions({ skipInstall: true, force: true })
      .on('end', done)
    })

    it('creates the service in the base module location', function () {
      assert.file([
        'spec/js/services/name_service.spec.js'
      ])
    })

    it('has file name, module filled out', function () {
      assert.fileContent('spec/js/services/name_service.spec.js', /angular\.mock\.module\('com\.project/)
      assert.fileContent('spec/js/services/name_service.spec.js', /nameService/)
    })
  })

  describe('yo fs \'name service\' --module com.project.module', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/service-test'))
      .inTmpDir(function (dir) {
        fs.copySync(path.join(__dirname, '../templates/common'), dir)
      })
      .withArguments('nameService')
      .withOptions({ module: 'com.project.module' })
      .on('end', done)
    })

    it('creates the file in a subfolder of the root', function () {
      assert.file([
        'spec/js/module/services/name_service.spec.js'
      ])
    })

    it('has module name filled out', function () {
      assert.fileContent('spec/js/module/services/name_service.spec.js', /angular\.mock\.module\('com\.project.module/)
    })
  })

  describe('yo aang:service \'name service\' --module com.project.module --factory', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/service-test'))
        .inTmpDir(function (dir) {
          fs.copySync(path.join(__dirname, '../templates/common'), dir)
        })
        .withArguments('NameService')
        .withOptions({module: 'com.project.module', factoryName: 'Fact'})
        .on('end', done)
    })

    it('has an instance of a Factory', function () {
      assert.fileContent('spec/js/module/services/name_service.spec.js', /instance\sof\sFact/)
    })
  })
})
