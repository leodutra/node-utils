'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function(mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
const loadDotEnv_1 = __importDefault(require('./loadDotEnv'))
function getEnvironment() {
    loadDotEnv_1.default()
    return process.env.NODE_ENV || 'development'
}
exports.default = getEnvironment
