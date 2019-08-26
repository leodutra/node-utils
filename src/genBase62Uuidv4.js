const uuid = require('uuid')
const baseX = require('./baseX')
const base62 = baseX('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')

module.exports = function genBase62Uuidv4 () {
    return base62.encode(uuid.v4(null, Buffer.alloc(16)))
}
