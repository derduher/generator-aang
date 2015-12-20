'use strict'
/* global beforeEach */

var path = require('path')
var fs = require('fs-extra')
var assert = require('yeoman-generator').assert
var helpers = require('yeoman-generator').test
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

  it('defaults testPath to the config value', function () {
    assert.equal(options.testPath, 'spec/js')
  })

  describe('_normalizeName', function () {
    it('Class cases generator.name by default and appends the passed suffix', function () {
      generator.name = 'bar'
      generator._normalizeName('Foo')
      assert.equal(generator.name, 'BarFoo')
    })

    it('Instance cases generator.name when passed true as its second arg', function () {
      generator.name = 'Bar'
      generator._normalizeName('Foo', true)
      assert.equal(generator.name, 'barFoo')
    })
  })

  describe('_toClassCase', function () {
    it('does nothing if already in class case', function () {
      assert.equal(generator._toClassCase('ClassCase'), 'ClassCase')
    })

    it('converts instanceCase', function () {
      assert.equal(generator._toClassCase('classCase'), 'ClassCase')
    })

    it('converts hyphenated', function () {
      assert.equal(generator._toClassCase('class-case'), 'ClassCase')
    })

    it('converts underscored', function () {
      assert.equal(generator._toClassCase('class_case'), 'ClassCase')
    })
  })

  describe('_toInstanceCase', function () {
    it('does nothing when already in instance case', function () {
      assert.equal(generator._toInstanceCase('instanceCase'), 'instanceCase')
    })

    it('converts class case', function () {
      assert.equal(generator._toInstanceCase('InstanceCase'), 'instanceCase')
    })

    it('converts hyphenated case', function () {
      assert.equal(generator._toInstanceCase('instance-Case'), 'instanceCase')
    })

    it('converts snake case', function () {
      assert.equal(generator._toInstanceCase('instance_case'), 'instanceCase')
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

  describe('_initConfig', function () {
    it('creates a .yorc if one does not exist', function () {
    })

    it('sets up generator default settings if not found', function () {
    })
  })
})
