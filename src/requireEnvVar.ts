import loadDotEnv from './loadDotEnv'

export default function requireEnvVar(name: string) {
    loadDotEnv()
    if (typeof name !== 'string') {
        throw new TypeError(`Invalid name "${name}" for ${requireEnvVar.name}().`)
    }
    const value = process.env[name]
    if (value) {
        return value
    }
    throw new Error(`Missing environment value for ${name}`)
}
