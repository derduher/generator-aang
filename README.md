# generator-aang [![Build Status](https://secure.travis-ci.org/derduher/generator-aang.png?branch=master)](https://travis-ci.org/derduher/generator-aang)

> [Yeoman](http://yeoman.io) generator


## Getting Started

### What is Yeoman?

Trick question. It's not a thing. It's this guy:

![](http://i.imgur.com/JHaAlBJ.png)

Basically, he wears a top hat, lives in your computer, and waits for you to tell him what kind of application you wish to create.

Not every new computer comes with a Yeoman pre-installed. He lives in the [npm](https://npmjs.org) package repository. You only have to ask for him once, then he packs up and moves into your hard drive. *Make sure you clean up, he likes new and shiny things.*

```bash
npm install -g yo
```

### Yeoman Generators

Yeoman travels light. He didn't pack any generators when he moved in. You can think of a generator like a plug-in. You get to choose what type of application you wish to create, such as a Backbone application or even a Chrome extension.

To install generator-aang from npm, run:

```bash
npm install -g generator-aang
```

### Yeoman Aang

Yeoman Aang is the last avatar and the bender of all things angular. Aang doesn't currently tell you 
how you should do things he just asks you what way you do things and makes you and
your team be more consistent.

#### Getting Started

Aang has some default configs but maybe your team has some patterns in place you'd like to continue following
```json
  "config": {
    "generator-aang": {
      "rootModule": "com.project",
      "fileCase": "name",
      "separators": {
        "pre": "#==",
        "post": "#/="
      },
      "paths": {
        "scripts": "app/assets/javascripts",
        "styles": "app/assets/stylesheets",
        "specs": "spec/js",
        "e2e": "spec/e2e"
      },
      "extensions": {
        "source": "js",
        "e2e": "spec.js",
        "unit": "spec.js"
      }
    }
  }
```
 - **rootModule** Your applications main module, you should fill this out - aang will assume that new controllers for instance should go directly in the path defined by scripts so aang:controller Foo will generate in app/assets/javascripts/controllers/Foo.js. This module can be overriden in the command line so that modules such as com.project.video go as a subfolder of app/assets/javascripts/video
 - **fileCase** By default all files use the same name as their component name. eg. FooController will be FooController.js. However macs have case insensitive file structure so this can sometimes cause problems when renaming things. fileCase is provided as a way of specifying the preferred file casing eg. paramCase to get foo-controller.js. To see a list of all available options see the methods provided by [change-case](https://github.com/blakeembrey/change-case#usage)
 - **separators** Not currently used
 - **paths.scripts** Where should generated javascript go for the rootModule?
 - **paths.styles** Where should generated stylesheets go?
 - **paths.specs** Where should unit tests go for the root module?
 - **paths.e2e** Where should e2e tests go?
 - **extensions.source** do javascript files in js or es6 or .es6.js
 - **extensions.e2e** do e2e tests have the file extension js or spec.js
 - **extensions.unit** do unit tests have the file extension spec.js, js or .es6

### Components

Aang comes with a list of components you can generate

1. [controllers](#controllers)
1. [models](#models)

#### Controllers

`yo aang:controller myController` - generates MyController at rootpath/controllers/MyController.js along with an associated unit test in rootTestPath/controllers/MyConroller.spec.js

#### Models

`yo aang:model`

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## License

MIT
