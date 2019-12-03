'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const fs_1 = require('fs')
async function writeFile(path, data, options) {
    return fs_1.promises.writeFile(path, data, options)
}
exports.default = writeFile
