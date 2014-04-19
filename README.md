# Argot Browser [![Build Status](https://secure.travis-ci.org/argotsdk/argot-browser.png?branch=master)](http://travis-ci.org/danmidwood/argot-browser.js)

[Argot](https://github.com/danmidwood/argot.js) in the Browser.

## Getting Started

### Node

Like all good node packages, you can find [Argot Browser in NPM](https://www.npmjs.org/package/argot-browser).

Add Argot to your project with

`npm install argot-browser --save`

### Not Node

Argot-Browser is available through [Bower](http://bower.io/), add the following to your bower.json:

```json
"dependencies": {
  "argot-browser": "0.1.4"
}
```

## Usage

Argot Browser is an almost drop in replacement for Argot.js that Argot-enables your client side app.

See the Argot [README](http://github.com/danmidwood/argot.js) for detailed usage information and the [Java demo](https://github.com/argotsdk/argot-java-demo) and [Node demo](https://github.com/argotsdk/argot-demo) for examples.

## Development

### Release

This project is currently quite a hassle to release, to do so:

```shell
rm public/argot.js
# update version in README
emacs README.md
# update version in bower.json
emacs bower.json
# regenerate browserify file (for use in bower)
grunt browserify
# release!
grunt release-it
```

TODO: Streamline this ^

## License
Copyright (c) 2014 Live Media Pty Ltd
