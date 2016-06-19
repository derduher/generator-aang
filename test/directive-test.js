'use strict'

var path = require('path')
var fs = require('fs-extra')
var assert = require('yeoman-assert')
var helpers = require('yeoman-test')

describe('Aang:generators/directive-test', function () {
  describe('things', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/directive-test'))
      .inTmpDir(function (dir) {
        fs.copySync(path.join(__dirname, '../templates/common'), dir)
      })
      .withArguments('Name')
      .withPrompts({module: 'com.project'})
      .withOptions({ skipInstall: true, force: true })
      .on('end', done)
    })

    it('creates the directive in the base module location', function () {
      assert.file([
        'spec/js/directives/name.spec.js'
      ])
    })

    it('has file name, module filled out', function () {
      assert.fileContent('spec/js/directives/name.spec.js', /angular\.mock\.module\('com\.project/)
      assert.fileContent('spec/js/directives/name.spec.js', /<name/)
    })
  })

  describe('yo fs \'Name\' --module com.project.module', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/directive-test'))
      .inTmpDir(function (dir) {
        fs.copySync(path.join(__dirname, '../templates/common'), dir)
      })
      .withArguments('Name')
      .withOptions({ module: 'com.project.module' })
      .on('end', done)
    })

    it('creates the file in a subfolder of the root', function () {
      assert.file([
        'spec/js/module/directives/name.spec.js'
      ])
    })

    it('has module name filled out', function () {
      assert.fileContent('spec/js/module/directives/name.spec.js', /angular\.mock\.module\('com\.project.module/)
    })
  })
})
