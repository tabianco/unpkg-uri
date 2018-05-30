# unpkg-uri
[![Build Status](https://travis-ci.org/tabianco/unpkg-uri.svg?branch=master)](https://travis-ci.org/tabianco/unpkg-uri)
[![NPM version](https://img.shields.io/npm/v/unpkg-uri.svg)](https://www.npmjs.com/package/unpkg-uri)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

> Generates unpkg.com URI from given npm package name.

`unpkg-uri` generates unpkg's `https://unpkg.com/@:prefix/:package@:version/:file` uri from given package name.

## Install

```
$ npm install --save unpkg-uri
```

## Usage

```js
const { unpkg } = require('unpkg-uri')

unpkg('unpkg-uri')
//=> 'https://unpkg.com/unpkg-uri@0.1.0/lib/index.js'

unpkg('unpkg-uri[min.js]')
//=> 'https://unpkg.com/unpkg-uri@0.1.0/lib/index.min.js'

unpkg('unpkg-uri|file.json')
//=> 'https://unpkg.com/unpkg-uri@0.1.0/lib/file.json'

unpkg('unpkg-uri/package.json')
//=> 'https://unpkg.com/unpkg-uri@0.1.0/package.json'

unpkg('unpkg-uri@1.2.3')
//=> 'https://unpkg.com/unpkg-uri@1.2.3/lib/index.js'

unpkg('@prefix/unpkg-uri')
//=> 'https://unpkg.com/@prefix/unpkg-uri@0.1.0/lib/index.js'
```

*Note: `unpkg-uri` does not include UMD builds. Examples above work but fail to run on browsers.*

## API

### unpkg(name[, options])

`unpkg` makes unpkg.com URI from `name`.
If installed npm package is found in `node_modules` of working directory, `unpkg` reads `${name}/package.json` and uses `version`, `unpkg`, and `main` field to determine exact unpkg.com URI.

#### name

Type: `string`

`name` can be one of bellow patterns:

* `:package`
* `:package`[`:ext`]
* `:package`|`:filename`
* `:package`/`:filepath`

* `:package`@`:version`
* `:package`@`:version`[`:ext`]
* `:package`@`:version`|`:filename`
* `:package`@`:version`/`:filepath`

* @`:prefix`/`:package`
* @`:prefix`/`:package`[`:ext`]
* @`:prefix`/`:package`|`:filename`
* @`:prefix`/`:package`/`:filepath`

* @`:prefix`/`:package`@`:version`
* @`:prefix`/`:package`@`:version`[`:ext`]
* @`:prefix`/`:package`@`:version`|`:filename`
* @`:prefix`/`:package`@`:version`/`:filepath`

If `:ext` is specified, `unpkg` replaces the `unpkg` or `main` field with given extension.<br>
If `:filename` is specified, `unpkg` replaces the `unpkg` or `main` field with given filename.<br>
If `:filepath` is specified, `unpkg` does not use `unpkg` or `main` field.
If `:version` is not specified, `unpkg` uses the `version` field in `package.json`.<br>

#### options

Type: `Object`

You can pass `:ext`, `:filename`, `:filepath`, `:version` by `options` argument.
`options` values will be overwritten if the same parameter is specified in `name` argument.

##### options.ext

Type: `string`<br>
Default: `'js'`

##### options.filename

Type: `string`

##### options.filepath

Type: `string`

##### options.version

Type: `string`

## License

MIT © [Tabian Co.](http://tabian.co)
