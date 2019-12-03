'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function(mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
const dotenv_1 = __importDefault(require('dotenv'))
let dotEnvOutput
// Singleton
function loadDotEnv() {
    if (dotEnvOutput) {
        return dotEnvOutput
    }
    dotEnvOutput = dotenv_1.default.config({ debug: !!process.env.DEBUG })
    if (dotEnvOutput.error) {
        throw dotEnvOutput.error
    }
    return dotEnvOutput
}
exports.default = loadDotEnv
