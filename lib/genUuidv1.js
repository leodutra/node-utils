'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function(mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
const uuid_1 = __importDefault(require('uuid'))
function genUuidv1() {
    return uuid_1.default.v1()
}
exports.default = genUuidv1
