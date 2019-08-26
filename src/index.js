const baseX = require('base-x')
const bcrypt = require('bcrypt')
const deepFreezeLib = require('deep-freeze')
const dotEnv = require('dotenv')
const fs = require('fs')
const fsPromises = fs.promises
const jwt = require('jsonwebtoken')
const path = require('path')
const safeStringify = require('fast-safe-stringify')
const uuid = require('uuid')

const numf = require('./numf')
const removeDiacritics = require('./remove-diacritics')
const { decodeHTMLEntities, encodeHTMLEntities } = require('./encode-decode-html')

const DEFAULT_SALT_ROUNDS = 12
const base62 = baseX('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')

let dotEnvOutput
let ansiColor

module.exports = {
    ansiColor,
    baseX,
    bufferFromDataURI,
    buildJwt,
    bytesToStr,
    clamp,
    comparePassword,
    createCurrencyFormatter,
    decodeHTMLEntities,
    deepFreeze,
    encodeHTMLEntities,
    findPackageJson,
    fixedDecimal,
    genBase62Uuidv1,
    genBase62Uuidv4,
    genUuidv1,
    genUuidv4,
    getClassName,
    getEnvironment,
    hashPassword,
    hashPasswordSync,
    kelvinToCelsius,
    limitStringBy,
    loadDotEnv,
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
    toImmutableProxy,
    toUnicode,
    typify,
    writeFile
}

function loadDotEnv () {
    if (dotEnvOutput) return dotEnvOutput
    dotEnvOutput = dotEnv.config({ debug: process.env.DEBUG })
    if (dotEnvOutput.error) {
        throw dotEnvOutput.error
    }
    return dotEnvOutput
}

function buildJwt (payload, secret, options) {
    if (!options || !options.expiresIn) {
        throw new TypeError(`Missing "expiresIn" for ${buildJwt.name}()`)
    }
    return jwt.sign(payload, secret, { expiresIn: options.expiresIn })
}

function requireEnvVar (name) {
    loadDotEnv()
    if (typeof name !== 'string') {
        throw new TypeError(`Invalid name "${name}" for ${requireEnvVar.name}().`)
    }
    const value = process.env[name]
    if (value) return value
    throw new Error(`Missing environment value for ${name}`)
}

function getEnvironment () {
    loadDotEnv()
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

function metersToKmPerHour (metersPerSecond) {
    return metersPerSecond * 3.6
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
    let result = ''
    for (let i = 0, l = str.length; i < l;) {
        result += `&#${toHex ? 'x' + str.charCodeAt(i++).toString('16') : str.charCodeAt(i++)};`
    }
    return result
}

function findPackageJson (startDir) {
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

function getClassName (any) {
    switch (typeof any) {
    case 'number':
        return isNaN(any) ? 'NaN' : 'Number'
    case 'undefined':
        return void 0
    case 'string':
    case 'function':
    case 'boolean':
    case 'bigint':
    case 'symbol':
    default:
    case 'object':
        return any == null
            ? null
            : Object.getPrototypeOf(any).constructor.name
    }
}

function typify (any, ownProperties) {
    const t = getClassName(any)
    if (t === 'Object') {
        const result = {}
        for (const prop in any) {
            if (ownProperties && !Object.prototype.hasOwnProperty.call(any, prop)) {
                continue
            }
            result[prop] = getClassName(any[prop])
        }
        return result
    }
    return t
}

function limitStringBy (num, str, complement) {
    if (str.length > num) {
        const k = str.substr(0, num).lastIndexOf('\u0020')
        return str.substr(0, k !== -1 ? k : num) + (complement || '...')
    }
    return str
}

function toUnicode (str) {
    let result = ''
    let i = str.length
    while (i--) {
        result += '\\u' + ('000' + str.charCodeAt(i).toString(16)).substr(-4)
    }
    return result
}

function toImmutableProxy (any) {
    switch (typeof any) {
    case 'object':
    case 'function':
    case 'xml':
        return new Proxy(any, {
            set: function immutableProxySet (target, prop) {
                throw new Error('Cannot set property "' + prop + '", this object is immutable.')
            },

            get: function immutableProxyGet (target, prop) {
                return toImmutableProxy(target[prop])
            }
        })
    }
    return any
}

function bytesToStr (bytes) {
    let str = ''
    for (let i = 0, l = bytes.length; i < l;) {
        str += String.fromCharCode(bytes[i++])
    }
    return str
}

ansiColor = {
    black: genAnsiColor([0, 0]),
    red: genAnsiColor([31, 39]),
    green: genAnsiColor([32, 39]),
    yellow: genAnsiColor([33, 39]),
    blue: genAnsiColor([34, 39]),
    magenta: genAnsiColor([35, 39]),
    cyan: genAnsiColor([36, 39]),
    white: genAnsiColor([37, 39]),
    gray: genAnsiColor([90, 39]),
    grey: genAnsiColor([90, 39]),
    bgBlack: genAnsiColor([40, 49]),
    bgRed: genAnsiColor([41, 49]),
    bgGreen: genAnsiColor([42, 49]),
    bgYellow: genAnsiColor([43, 49]),
    bgBlue: genAnsiColor([44, 49]),
    bgMagenta: genAnsiColor([45, 49]),
    bgCyan: genAnsiColor([46, 49]),
    bgWhite: genAnsiColor([47, 49]),
    blackBright: genAnsiColor([90, 39]),
    redBright: genAnsiColor([91, 39]),
    greenBright: genAnsiColor([92, 39]),
    yellowBright: genAnsiColor([93, 39]),
    blueBright: genAnsiColor([94, 39]),
    magentaBright: genAnsiColor([95, 39]),
    cyanBright: genAnsiColor([96, 39]),
    whiteBright: genAnsiColor([97, 39]),
    bgBlackBright: genAnsiColor([100, 49]),
    bgRedBright: genAnsiColor([101, 49]),
    bgGreenBright: genAnsiColor([102, 49]),
    bgYellowBright: genAnsiColor([103, 49]),
    bgBlueBright: genAnsiColor([104, 49]),
    bgMagentaBright: genAnsiColor([105, 49]),
    bgCyanBright: genAnsiColor([106, 49]),
    bgWhiteBright: genAnsiColor([107, 49])
}

function genAnsiColor (codes) {
    const open = `\u001b[${codes[0]}m`
    const close = `\u001b[${codes[1]}m`
    return input => open + input + close
}
