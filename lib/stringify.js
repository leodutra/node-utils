'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function(mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
const fast_safe_stringify_1 = __importDefault(require('fast-safe-stringify'))
function stringify(value, replacer, space) {
    return fast_safe_stringify_1.default(value, replacer, space)
}
exports.default = stringify
