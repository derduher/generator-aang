'use strict'
/* global beforeEach */

var path = require('path')
var fs = require('fs-extra')
var assert = require('yeoman-assert')
var helpers = require('yeoman-test')
var runContext
var generator
var options

describe('Aang:lib/aang', function () {
  beforeEach(function (done) {
    runContext = helpers.run(path.join(__dirname, '../lib/aang'))
      .inTmpDir(function (dir) {
        fs.copySync(path.join(__dirname, '../templates/common'), dir)
      })
      .withArguments('name')
      .withPrompts({module: 'com.project'})
      .on('end', function () {
        generator = runContext.generator
        options = generator.options
        done()
      })
  })

  it('sets module path to rootModulePath when the module passed is the rootModule', function () {
    assert.equal(options.modulePath, 'app/assets/javascripts/')
  })

  it('sets test path to rootTestPath when the module passed is the rootModule', function () {
    assert.equal(options.testPath, 'spec/js/')
  })

  it('sets module path to a sub dir of rootPath when passed a module', function () {
    options.modulePath = ''
    options.module = 'com.project.sub.module'
    generator._setModulePath()
    assert.equal(options.modulePath, 'app/assets/javascripts/sub/module/')
  })

  it('defaults rootModule to the config value', function () {
    assert.equal(options.rootModule, 'com.project')
  })

  it('defaults rootModulePath to the config value', function () {
    assert.equal(options.rootModulePath, 'app/assets/javascripts')
  })

  it('defaults rootTestPath to the config value', function () {
    assert.equal(options.rootTestPath, 'spec/js')
  })

  it('defaults sourceExtension to the config value', function () {
    assert.equal(options.sourceExtension, 'js')
  })

  it('defaults unitExtension to the config value', function () {
    assert.equal(options.unitExtension, 'spec.js')
  })

  it('defaults e2eExtension to the config value', function () {
    assert.equal(options.e2eExtension, 'spec.js')
  })

  describe('_normalizeName', function () {
    it('Class cases generator.name by default and appends the passed suffix', function () {
      generator.name = 'bar'
      generator._normalizeName('Foo')
      assert.equal(generator.name, 'BarFoo')
    })

    it('Instance cases generator.name when passed true as its second arg', function () {
      generator.name = 'Bar'
      generator._normalizeName('Foo', 'camel')
      assert.equal(generator.name, 'barFoo')
    })

    it('transforms the file name if asked', function () {
      generator.options.fileCase = 'paramCase'
      generator.name = 'Bar'
      generator._normalizeName('Foo', 'camel')
      assert.equal(generator.fileName, 'bar-foo')
    })
  })

  describe('_toCase', function () {
    it('does nothing if already in case', function () {
      assert.equal(generator._toCase('ClassCase', 'pascal'), 'ClassCase')
      assert.equal(generator._toCase('classCase', 'camel'), 'classCase')
      assert.equal(generator._toCase('class_case', 'snake'), 'class_case')
      assert.equal(generator._toCase('class-case', 'param'), 'class-case')
    })

    it('converts instanceCase', function () {
      assert.equal(generator._toCase('classCase', 'pascal'), 'ClassCase')
      assert.equal(generator._toCase('classCase', 'param'), 'class-case')
      assert.equal(generator._toCase('classCase', 'snake'), 'class_case')
    })

    it('converts hyphenated', function () {
      assert.equal(generator._toCase('class-case', 'pascal'), 'ClassCase')
      assert.equal(generator._toCase('class-case', 'camel'), 'classCase')
      assert.equal(generator._toCase('class-case', 'snake'), 'class_case')
    })

    it('converts underscored', function () {
      assert.equal(generator._toCase('class_case', 'pascal'), 'ClassCase')
      assert.equal(generator._toCase('class_case', 'camel'), 'classCase')
      assert.equal(generator._toCase('class_case', 'param'), 'class-case')
    })
  })

  describe('_ensureSuffix', function () {
    it('does nothing if the suffix is already appended', function () {
      assert.equal(generator._ensureSuffix('hasSuffix', 'Suffix'), 'hasSuffix')
    })

    it('appends a suffix if one is not found ', function () {
      assert.equal(generator._ensureSuffix('has', 'Suffix'), 'hasSuffix')
    })

    it('appends a suffix if not at the end', function () {
      assert.equal(generator._ensureSuffix('SuffixClass', 'Suffix'), 'SuffixClassSuffix')
    })
  })

  // TODO Port over from integration tests
  describe('_createSrc', function () {
    it('creates the files at src with correct path, name, module', function (done) {
      generator.name = 'foo'
      generator.fileName = generator.name
      options.modulePath = 'app/fizz/'
      options.sourceExtension = 'js'

      generator._createSrc('../../../generators/controller/templates/controller.es6', 'controllers')
      generator.env.runLoop.on('end', function () {
        assert.fileContent('app/fizz/controllers/foo.js', /angular\.module\('com\.project/)
        assert.fileContent('app/fizz/controllers/foo.js', /controller\('foo/)
        done()
      })
    })

    it('uses fileCase option to transform the file prior to writing', function (done) {
      generator.name = 'fooBar'
      generator.fileName = 'foo-bar'
      options.modulePath = 'app/fizz/'
      options.sourceExtension = 'js'

      generator._createSrc('../../../generators/controller/templates/controller.es6', 'controllers')
      generator.env.runLoop.on('end', function () {
        assert.fileContent('app/fizz/controllers/foo-bar.js', /angular\.module\('com\.project/)
        assert.fileContent('app/fizz/controllers/foo-bar.js', /controller\('foo/)
        done()
      })
    })
  })

  // TODO
  describe('_createTest', function () {
    it('creates the files at spec with correct path, name, module', function (done) {
      generator.name = 'foo'
      generator.fileName = 'foo'
      options.testPath = 'spec/app/fizz/'
      options.unitExtension = 'js'

      generator._createTest('../../../generators/controller-test/templates/controller.js.tmpl', 'controllers')

      generator.env.runLoop.on('end', function () {
        assert.fileContent('spec/app/fizz/controllers/foo.js', /angular\.mock\.module\('com\.project/)
        assert.fileContent('spec/app/fizz/controllers/foo.js', /foo/)
        done()
      })
    })

    it('uses fileCase option to transform the file prior to writing', function (done) {
      generator.name = 'fooBar'
      generator.fileName = 'foo-bar'
      options.testPath = 'spec/app/fizz/'
      options.unitExtension = 'js'

      generator._createTest('../../../generators/controller-test/templates/controller.js.tmpl', 'controllers')

      generator.env.runLoop.on('end', function () {
        assert.fileContent('spec/app/fizz/controllers/foo-bar.js', /angular\.mock\.module\('com\.project/)
        assert.fileContent('spec/app/fizz/controllers/foo-bar.js', /foo/)
        done()
      })
    })
  })

  describe('_initConfig', function () {
    it('creates a .yorc if one does not exist', function () {
    })

    it('sets up generator default settings if not found', function () {
    })
  })
})
