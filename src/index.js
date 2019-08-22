const fs = require('fs')
const fsPromises = fs.promises
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const deepFreezeLib = require('deep-freeze')
const safeStringify = require('fast-safe-stringify')
const baseX = require('base-x')

const numf = require('./numf')
const removeDiacritics = require('./remove-diacritics')
const decodeHTMLEntities = require('./decode-html-entities')

const base62 = baseX('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
const DEFAULT_SALT_ROUNDS = 12

function buildJwt (payload, secret, options) {
    if (!options || !options.expiresIn) throw new TypeError(`Missing "expiresIn" for ${buildJwt.name}()`)
    return jwt.sign(payload, secret, { expiresIn: options.expiresIn })
}

function requireEnvVar (name) {
    if (typeof name !== 'string') throw new TypeError(`Invalid name "${name}" for ${requireEnvVar.name}().`)
    const value = process.env[name]
    if (value) return value
    throw new Error(`Missing environment value for ${name}`)
}

function getEnvironment () {
    return process.env.NODE_ENV || 'development'
}

function genUuidv1 () {
    return uuid.v1()
}

function genUuidv4 () {
    return uuid.v4()
}

function genBase62Uuidv1 () {
    return base62.encode(uuid.v1(null, Buffer.alloc(16)))
}

function genBase62Uuidv4 () {
    return base62.encode(uuid.v4(null, Buffer.alloc(16)))
}

function deepFreeze (obj) {
    return deepFreezeLib(obj)
}

function stringify (obj, replacer, spaces) {
    return safeStringify(obj, replacer, spaces)
}

function hashPasswordSync (password, saltOrRounds = DEFAULT_SALT_ROUNDS) {
    return bcrypt.hashSync(password, saltOrRounds)
}

async function hashPassword (password, saltOrRounds = DEFAULT_SALT_ROUNDS) {
    return bcrypt.hash(password, saltOrRounds)
}

async function comparePassword (password, passwordHash) {
    return bcrypt.compare(password, passwordHash)
}

function matchPattern (str, regexp) {
    const regexpClone = new RegExp(
        regexp.source,
        regexp.flags ||
            (regexp.global ? 'g' : '') +
            (regexp.ignoreCase ? 'i' : '') +
            (regexp.multiline ? 'm' : '') +
            (regexp.dotAll ? 's' : '') +
            (regexp.unicode ? 'u' : '') +
            (regexp.sticky ? 'y' : '')
    )
    regexpClone.lastIndex = 0
    const matches = []
    let match
    if (regexpClone.global) {
        while ((match = regexpClone.exec(str))) {
            matches.push(match)
        }
    } else if ((match = regexpClone.exec(str))) {
        matches.push(match)
    }
    return matches
}

function parseNumber (str) {
    str = (str + '').replace(/[^\d,.-]/g, '') // just digits, separators and sign
    const sign = str.charAt(0) === '-' ? '-' : '+' // store sign
    const minor = str.match(/[.,](\d+)$/) // filter decimals
    str = str.replace(/[.,]\d*$/, '').replace(/\D/g, '') // remove decimals and any integer separator
    return Number(sign + str + (minor ? '.' + minor[1] : '')) // build number
}

async function writeFile (file, data, options) {
    return fsPromises.writeFile(file, data, options)
}

async function readFile (file, options) {
    return fsPromises.readFile(file, options)
}

function replaceHTMLTags (text) {
    return text
        ? text
            .replace(/<\s*br\s*\/?>/gim, '\n')
            .replace(/<([^>]+)>/gim, '')
        : text
}

function clamp (x, min, max) {
    return Math.min(Math.max(min, x), max)
}

function createCurrencyFormatter ({ decimal = null, lSymbol, rSymbol, thousandsSep = ',', decPoint = '.' }) {
    const defDecimal = decimal
    return (num, decimal = defDecimal) =>
        num || num === 0
            ? `${lSymbol || ''}${numf(num, decimal, decPoint, thousandsSep)}${rSymbol || ''}`
            : '-'
}

function kelvinToCelsius (kelvinTemp) {
    return kelvinTemp - 273.15
}

function metersToKmPerHour (ms) {
    return ms * 3.6
}

function fixedDecimal (n, val) {
    return Number(val.toFixed(n))
}

function randomInRange (min, max) {
    min = min ? parseInt(min, 10) : 1
    max = max ? parseInt(max, 10) : min

    return max > min
        ? Math.floor(Math.random() * (max - min + 1) + min)
        : min
}

function bufferFromDataURI (dataURI) {
    const [, mimeType, encoding, data] = dataURI.match(
        /^data:((?:[^,](?!,|;base64))*[^,])?(?:;(base64))?,(.+)/im
    )
    return {
        mimeType: mimeType,
        data: encoding
            ? Buffer.from(data, encoding)
            : data
    }
}

function randomBase62 (numDigits) {
    const base62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    let result = ''
    while (numDigits--) {
        result += base62[Math.random() * 61 >> 0]
    }
    return result
}

function toCharEntity (str, toHex) {
    if (str) {
        str = '' + str
        let codeCache
        let res = ''
        for (let i = 0, l = str.length; i < l;) {
            res += '&#'
            codeCache = str.charCodeAt(i++)
            res += toHex ? 'x' + codeCache.toString('16') : codeCache
            res += ';'
        }
        return res
    }
}

module.exports = {
    baseX,
    bufferFromDataURI,
    buildJwt,
    clamp,
    comparePassword,
    createCurrencyFormatter,
    decodeHTMLEntities,
    deepFreeze,
    fixedDecimal,
    genBase62Uuidv1,
    genBase62Uuidv4,
    genUuidv1,
    genUuidv4,
    getEnvironment,
    hashPassword,
    hashPasswordSync,
    kelvinToCelsius,
    matchPattern,
    metersToKmPerHour,
    numf,
    parseNumber,
    randomBase62,
    randomInRange,
    readFile,
    removeDiacritics,
    replaceHTMLTags,
    requireEnvVar,
    stringify,
    toCharEntity,
    writeFile
}
