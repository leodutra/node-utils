const dotEnv = require('dotenv')

let dotEnvOutput

module.exports = function loadDotEnv () {
    if (dotEnvOutput) return dotEnvOutput
    dotEnvOutput = dotEnv.config({ debug: process.env.DEBUG })
    if (dotEnvOutput.error) {
        throw dotEnvOutput.error
    }
    return dotEnvOutput
}
