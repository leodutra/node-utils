'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function(mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
const bcrypt_1 = __importDefault(require('bcrypt'))
const DEFAULT_SALT_ROUNDS = 12
function hashPassword(password, saltOrRounds = DEFAULT_SALT_ROUNDS) {
    return bcrypt_1.default.hash(password, saltOrRounds)
}
exports.default = hashPassword
