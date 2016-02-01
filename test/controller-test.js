'use strict'

var path = require('path')
var fs = require('fs-extra')
var assert = require('yeoman-generator').assert
var helpers = require('yeoman-generator').test

describe('Aang:generators/controller-test', function () {
  describe('things', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/controller-test'))
      .inTmpDir(function (dir) {
        fs.copySync(path.join(__dirname, '../templates/common'), dir)
      })
      .withArguments('name')
      .withPrompts({module: 'com.project'})
      .withOptions({ skipInstall: true, force: true })
      .on('end', done)
    })

    it('creates the controller in the base module location', function () {
      assert.file([
        'spec/js/controllers/NameController.spec.js'
      ])
    })

    it('has file name, module filled out', function () {
      assert.fileContent('spec/js/controllers/NameController.spec.js', /angular\.mock\.module\('com\.project/)
      assert.fileContent('spec/js/controllers/NameController.spec.js', /NameController/)
    })
  })
  describe('yo fs \'name controller\' --module com.project.module', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/controller-test'))
      .inTmpDir(function (dir) {
        fs.copySync(path.join(__dirname, '../templates/common'), dir)
      })
      .withArguments('NameController')
      .withOptions({ module: 'com.project.module' })
      .on('end', done)
    })

    it('creates the file in a subfolder of the root', function () {
      assert.file([
        'spec/js/module/controllers/NameController.spec.js'
      ])
    })

    it('has module name filled out', function () {
      assert.fileContent('spec/js/module/controllers/NameController.spec.js', /angular\.mock\.module\('com\.project.module/)
    })
  })
})
