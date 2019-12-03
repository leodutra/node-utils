'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function(mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
const getClassName_1 = __importDefault(require('./getClassName'))
function typify(target, ownProperties) {
    const className = getClassName_1.default(target)
    if (className === 'Object') {
        const result = {}
        for (const prop in target) {
            if (ownProperties && !Object.prototype.hasOwnProperty.call(target, prop)) {
                continue
            }
            result[prop] = getClassName_1.default(target[prop])
        }
        return result
    }
    return className
}
exports.default = typify
