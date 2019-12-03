'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function(mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
const loadDotEnv_1 = __importDefault(require('./loadDotEnv'))
function requireEnvVar(name) {
    loadDotEnv_1.default()
    if (typeof name !== 'string') {
        throw new TypeError(`Invalid name "${name}" for ${requireEnvVar.name}().`)
    }
    const value = process.env[name]
    if (value) {
        return value
    }
    throw new Error(`Missing environment value for ${name}`)
}
exports.default = requireEnvVar
