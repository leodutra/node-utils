'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const fs_1 = require('fs')
module.exports = async function readFile(path, options) {
    return fs_1.promises.readFile(path, options)
}
