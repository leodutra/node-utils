import dotEnv from 'dotenv'

let dotEnvOutput: any

// Singleton
export default function loadDotEnv(): any {
    if (dotEnvOutput) {
        return dotEnvOutput
    }
    dotEnvOutput = dotEnv.config({ debug: !!process.env.DEBUG })
    if (dotEnvOutput.error) {
        throw dotEnvOutput.error
    }
    return dotEnvOutput
}
