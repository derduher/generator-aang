'use strict'

var path = require('path')
var fs = require('fs-extra')
var assert = require('yeoman-generator').assert
var helpers = require('yeoman-generator').test

describe('Aang:generators/model-test', function () {
  describe('things', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/model-test'))
      .inTmpDir(function (dir) {
        fs.copySync(path.join(__dirname, '../templates/common'), dir)
      })
      .withArguments('name')
      .withPrompts({module: 'com.project'})
      .withOptions({ skipInstall: true, force: true })
      .on('end', done)
    })

    it('creates the model in the base module location', function () {
      assert.file([
        'spec/js/models/NameModel.spec.js'
      ])
    })

    it('has file name, module filled out', function () {
      assert.fileContent('spec/js/models/NameModel.spec.js', /angular\.mock\.module\('com\.project/)
      assert.fileContent('spec/js/models/NameModel.spec.js', /NameModel/)
    })
  })
  describe('yo fs \'name model\' --module com.project.module', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/model-test'))
      .inTmpDir(function (dir) {
        fs.copySync(path.join(__dirname, '../templates/common'), dir)
        console.log(dir)
      })
      .withArguments('NameModel')
      .withOptions({ module: 'com.project.module' })
      .on('end', done)
    })

    it('creates the file in a subfolder of the root', function () {
      assert.file([
        'spec/js/module/models/NameModel.spec.js'
      ])
    })

    it('has module name filled out', function () {
      assert.fileContent('spec/js/module/models/NameModel.spec.js', /angular\.mock\.module\('com\.project.module/)
    })
  })
})
