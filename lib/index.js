const path = require('path')

const packageSafeChars = 'a-z0-9-'
const packageNameRegExp = (s => {
  return new RegExp(`^(@[${s}][._${s}]*?/)?([${s}][._${s}]*?)(?:@([._${s}]+))?(?:(/.+?)|(?:\\|(.+?))|\\[([^\\]]+)\\])?$`)
})(packageSafeChars)

function unpkg (name, { ext = 'js', filename, filepath = '', version } = {}) {
  if (packageNameRegExp.test(name)) {
    const matched = name.match(packageNameRegExp)

    const prefix = matched[1] || ''
    const pureName = matched[2]

    name = `${prefix}${pureName}`
    version = matched[3] || version
    filepath = matched[4] || filepath
    filename = matched[5] || filename
    ext = matched[6] || ext

    let pkgInfo = {}
    try {
      pkgInfo = require(`${name}/package.json`)
    } catch (e) {
      // Just ignore
    }

    const mainFile = pkgInfo.unpkg || pkgInfo.main

    if (!filepath && mainFile) {
      filepath = path.join('/', mainFile)

      if (filename) {
        filepath = path.join(path.dirname(filepath), filename)
      } else if (ext) {
        filepath = path.join(path.dirname(filepath), path.basename(filepath, path.extname(filepath)) + `.${ext}`)
      }
    } else {
      if (!filename) {
        filename = `${pureName}.${ext}`
      }

      if (!filepath) {
        filepath = `/dist/${filename}`
      }
    }

    if (!version) {
      version = pkgInfo.version
    }
  }

  return `https://unpkg.com/${name}${version ? '@' + version : ''}${filepath}`
}

exports.packageNameRegExp = packageNameRegExp
exports.unpkg = unpkg
