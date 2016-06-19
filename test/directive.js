'use strict'

var path = require('path')
var fs = require('fs-extra')
var assert = require('yeoman-assert')
var helpers = require('yeoman-test')
var deps = [
  [helpers.createDummyGenerator(), 'aang:directive-test']
]

describe('Aang:generators/directive', function () {
  describe('yo aang:directive Name --module com.project', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/directive'))
        .inTmpDir(function (dir) {
          fs.copySync(path.join(__dirname, '../templates/common'), dir)
        })
        .withGenerators(deps)
        .withArguments('Name')
        .withPrompts({module: 'com.project', instantiate: false})
        .withOptions({ skipInstall: true, force: true })
        .on('end', done)
    })

    it('creates the directive in the base module location', function () {
      assert.file([
        'app/assets/javascripts/directives/name.js'
      ])
    })

    it('has file name, tmpl path, module filled out', function () {
      var path = 'app/assets/javascripts/directives/name.js'
      assert.fileContent(path, /angular\.module\('com\.project/)
      assert.fileContent(path, /directive\('name/)
      assert.fileContent(path, /'name.html/)
    })
  })

  describe('yo aang:directive \'Name\' --module com.project.module', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/directive'))
        .inTmpDir(function (dir) {
          fs.copySync(path.join(__dirname, '../templates/common'), dir)
        })
        .withGenerators(deps)
        .withArguments('Name')
        .withOptions({ module: 'com.project.module', factory: false })
        .on('end', done)
    })

    it('creates the file in a subfolder of the root', function () {
      assert.file([
        'app/assets/javascripts/module/directives/name.js'
      ])
    })

    it('has file name, tmpl path, module filled out', function () {
      var path = 'app/assets/javascripts/module/directives/name.js'
      assert.fileContent(path, /angular\.module\('com\.project.module/)
      assert.fileContent(path, /directive\('name/)
      assert.fileContent(path, /'module\/templates\/name.html/)
    })
  })

  /*describe('yo aang:directive \'name\' --module com.project.module --controller', function () {
    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/directive'))
        .inTmpDir(function (dir) {
          fs.copySync(path.join(__dirname, '../templates/common'), dir)
        })
        .withGenerators(deps)
        .withArguments('Name')
        .withPrompts({instantiate: true, factoryName: 'Fact'})
        .withOptions({module: 'com.project.module'})
        .on('end', done)
    })

    it('has an instance of a Factory', function () {
      assert.fileContent('app/assets/javascripts/module/directives/name_directive.js', /new\sFact\(/)
    })
  })*/
})
