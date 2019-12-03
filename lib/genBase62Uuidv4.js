'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function(mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
const uuid_1 = __importDefault(require('uuid'))
const baseX_1 = __importDefault(require('./baseX'))
const base62 = baseX_1.default('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
function genBase62Uuidv4() {
    return base62.encode(uuid_1.default.v4(null, Buffer.alloc(16)))
}
exports.default = genBase62Uuidv4
