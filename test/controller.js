'use strict'

var path = require('path')
var fs = require('fs-extra')
var assert = require('yeoman-generator').assert
var helpers = require('yeoman-generator').test

describe('Aang:generators/controller', function () {
  describe('things', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/controller'))
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
        'app/assets/javascripts/controllers/NameController.es6'
      ])
    })

    it('has file name, module filled out', function () {
      assert.fileContent('app/assets/javascripts/controllers/NameController.es6', /angular\.module\('com\.project/)
      assert.fileContent('app/assets/javascripts/controllers/NameController.es6', /controller\('NameController/)
    })
  })
  describe('yo fs \'name controller\' --module com.project.module', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/controller'))
      .inTmpDir(function (dir) {
        fs.copySync(path.join(__dirname, '../templates/common'), dir)
        console.log(dir)
      })
      .withArguments('NameController')
      .withOptions({ module: 'com.project.module' })
      .on('end', done)
    })

    it('creates the file in a subfolder of the root', function () {
      assert.file([
        'app/assets/javascripts/module/controllers/NameController.es6'
      ])
    })

    it('has file name, module filled out', function () {
      assert.fileContent('app/assets/javascripts/module/controllers/NameController.es6', /angular\.module\('com\.project.module/)
      assert.fileContent('app/assets/javascripts/module/controllers/NameController.es6', /controller\('NameController/)
    })
  })
})
