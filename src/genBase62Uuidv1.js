const uuid = require('uuid')
const baseX = require('./baseX')
const base62 = baseX('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')

module.exports = function genBase62Uuidv1 () {
    return base62.encode(uuid.v1(null, Buffer.alloc(16)))
}
