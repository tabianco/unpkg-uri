const {
  unpkg
} = require('../')

describe('unpkg', () => {
  test('works with valid name', () => {
    expect(unpkg('valid-name'))
      .toBe('https://unpkg.com/valid-name/dist/valid-name.js')
  })

  test('works with valid name and version', () => {
    expect(unpkg('valid-name@3.1.3-beta.5'))
      .toBe('https://unpkg.com/valid-name@3.1.3-beta.5/dist/valid-name.js')
  })

  test('works with valid name, version, and filename', () => {
    expect(unpkg('valid-name@3.1.3-beta.5|other-file.min.js'))
      .toBe('https://unpkg.com/valid-name@3.1.3-beta.5/dist/other-file.min.js')
  })

  test('works with valid name, version, and filepath', () => {
    expect(unpkg('valid-name@3.1.3-beta.5/some/dir/other-file.min.js'))
      .toBe('https://unpkg.com/valid-name@3.1.3-beta.5/some/dir/other-file.min.js')
  })

  test('works with valid name, version, and ext', () => {
    expect(unpkg('valid-name@3.1.3-beta.5[min.js]'))
      .toBe('https://unpkg.com/valid-name@3.1.3-beta.5/dist/valid-name.min.js')
  })

  test('works with valid prefix', () => {
    expect(unpkg('@prefix/valid-name'))
      .toBe('https://unpkg.com/@prefix/valid-name/dist/valid-name.js')
  })

  test('works with valid prefix and version', () => {
    expect(unpkg('@prefix/valid-name@3.1.3-beta.5'))
      .toBe('https://unpkg.com/@prefix/valid-name@3.1.3-beta.5/dist/valid-name.js')
  })

  test('works with valid prefix, version, and filename', () => {
    expect(unpkg('@prefix/valid-name@3.1.3-beta.5|other-file.min.js'))
      .toBe('https://unpkg.com/@prefix/valid-name@3.1.3-beta.5/dist/other-file.min.js')
  })

  test('works with valid prefix, version, and filepath', () => {
    expect(unpkg('@prefix/valid-name@3.1.3-beta.5/some/dir/other-file.min.js'))
      .toBe('https://unpkg.com/@prefix/valid-name@3.1.3-beta.5/some/dir/other-file.min.js')
  })

  test('works with valid prefix, version, and ext', () => {
    expect(unpkg('@prefix/valid-name@3.1.3-beta.5[min.js]'))
      .toBe('https://unpkg.com/@prefix/valid-name@3.1.3-beta.5/dist/valid-name.min.js')
  })

  test('works with invalid name', () => {
    expect(unpkg('http://example.com/some.url'))
      .toBe('https://unpkg.com/http://example.com/some.url')
  })

  test('works with `ext` option', () => {
    expect(unpkg('some-package', {
      ext: 'css'
    }))
      .toBe('https://unpkg.com/some-package/dist/some-package.css')
  })

  test('works with `filename` option', () => {
    expect(unpkg('some-package', {
      filename: 'other-file.min.js'
    }))
      .toBe('https://unpkg.com/some-package/dist/other-file.min.js')
  })

  test('works with `filepath` option', () => {
    expect(unpkg('some-package', {
      filepath: '/some/dir/other-file.min.js'
    }))
      .toBe('https://unpkg.com/some-package/some/dir/other-file.min.js')
  })

  test('works with `version` option', () => {
    expect(unpkg('some-package', {
      version: '2.3.4'
    }))
      .toBe('https://unpkg.com/some-package@2.3.4/dist/some-package.js')
  })

  const pkg = require('jest/package.json')

  test('reads local package version', () => {
    expect(unpkg('jest'))
      .toBe(`https://unpkg.com/jest@${pkg.version}/${pkg.main}`)
  })

  test('reads local package with custom ext', () => {
    const filename = pkg.main.replace(/\.js$/, '.css')

    expect(unpkg('jest[css]'))
      .toBe(`https://unpkg.com/jest@${pkg.version}/${filename}`)
  })

  test('reads local package with custom filename', () => {
    const filename = pkg.main.replace('jest.js', 'hoge.json')

    expect(unpkg('jest|hoge.json'))
      .toBe(`https://unpkg.com/jest@${pkg.version}/${filename}`)
  })

  test('reads local package with custom filepath', () => {
    const pkg = require('jest/package.json')

    expect(unpkg('jest/package.json'))
      .toBe(`https://unpkg.com/jest@${pkg.version}/package.json`)
  })

  test('reads local package with custom version', () => {
    expect(unpkg('jest@1.0.0'))
      .toBe(`https://unpkg.com/jest@1.0.0/${pkg.main}`)
  })
})
