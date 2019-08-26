const fs = require('fs')
const path = require('path')

module.exports = function findPackageJson (startDir) {
    let dir = path.resolve(startDir || process.cwd())
    do {
        const pkgfile = path.join(dir, 'package.json')
        if (fs.existsSync(pkgfile)) {
            return pkgfile
        } else {
            dir = path.join(dir, '..')
        }
    } while (dir !== path.resolve(dir, '..'))
    return null
}
