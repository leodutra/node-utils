'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function(mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
const uuid_1 = __importDefault(require('uuid'))
function genUuidv4() {
    return uuid_1.default.v4()
}
exports.default = genUuidv4
