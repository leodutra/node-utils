'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
function parseNumber(str) {
    str = (str || '').replace(/[^\d,.-]/g, '') // just digits, separators and sign
    const sign = str.charAt(0) === '-' ? '-' : '+' // store sign
    const minor = str.match(/[.,](\d+)$/) // filter decimals
    str = str.replace(/[.,]\d*$/, '').replace(/\D/g, '') // remove decimals and any integer separator
    return Number(sign + str + (minor ? '.' + minor[1] : '')) // build number
}
exports.default = parseNumber
