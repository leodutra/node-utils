'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function(mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
const jsonwebtoken_1 = __importDefault(require('jsonwebtoken'))
function buildJwt(payload, secret, options) {
    if (!options || !options.expiresIn) {
        throw new TypeError(`Missing "expiresIn" for ${buildJwt.name}()`)
    }
    return jsonwebtoken_1.default.sign(payload, secret, { expiresIn: options.expiresIn })
}
exports.default = buildJwt
