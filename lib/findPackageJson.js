'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function(mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
const fs_1 = __importDefault(require('fs'))
const path_1 = __importDefault(require('path'))
function findPackageJson(startDir) {
    let dir = path_1.default.resolve(startDir || process.cwd())
    do {
        const pkgfile = path_1.default.join(dir, 'package.json')
        if (fs_1.default.existsSync(pkgfile)) {
            return pkgfile
        } else {
            dir = path_1.default.join(dir, '..')
        }
    } while (dir !== path_1.default.resolve(dir, '..'))
    return null
}
exports.default = findPackageJson
