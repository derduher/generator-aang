'use strict'

var path = require('path')
var fs = require('fs-extra')
var assert = require('yeoman-assert')
var helpers = require('yeoman-test')
var deps = [
  [helpers.createDummyGenerator(), 'aang:model-test']
]

describe('Aang:generators/model', function () {
  describe('yo fs name --module com.project', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/model'))
        .inTmpDir(function (dir) {
          fs.copySync(path.join(__dirname, '../templates/common'), dir)
        })
        .withGenerators(deps)
        .withArguments('name')
        .withPrompts({module: 'com.project'})
        .withOptions({ skipInstall: true, force: true })
        .on('end', done)
    })

    it('creates the model in the base module location', function () {
      assert.file([
        'app/assets/javascripts/models/name_model.js'
      ])
    })

    it('has file name, module filled out', function () {
      assert.fileContent('app/assets/javascripts/models/name_model.js', /angular\.module\('com\.project/)
      assert.fileContent('app/assets/javascripts/models/name_model.js', /factory\('NameModel/)
    })
  })
  describe('yo fs \'name model\' --module com.project.module', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/model'))
        .inTmpDir(function (dir) {
          fs.copySync(path.join(__dirname, '../templates/common'), dir)
        })
        .withGenerators(deps)
        .withArguments('NameModel')
        .withOptions({ module: 'com.project.module' })
        .on('end', done)
    })

    it('creates the file in a subfolder of the root', function () {
      assert.file([
        'app/assets/javascripts/module/models/name_model.js'
      ])
    })

    it('has file name, module filled out', function () {
      assert.fileContent('app/assets/javascripts/module/models/name_model.js', /angular\.module\('com\.project.module/)
      assert.fileContent('app/assets/javascripts/module/models/name_model.js', /factory\('NameModel/)
    })
  })
})
