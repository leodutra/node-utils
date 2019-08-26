const jwt = require('jsonwebtoken')

module.exports = function buildJwt (payload, secret, options) {
    if (!options || !options.expiresIn) {
        throw new TypeError(`Missing "expiresIn" for ${buildJwt.name}()`)
    }
    return jwt.sign(payload, secret, { expiresIn: options.expiresIn })
}
