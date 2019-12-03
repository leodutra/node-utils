'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function(mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
const rimraf_1 = __importDefault(require('rimraf'))
async function rimraf(dir, opts) {
    return new Promise((resolve, reject) => rimraf_1.default(dir, opts, error => (error ? reject(error) : resolve())))
}
exports.default = rimraf
