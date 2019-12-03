import loadDotEnv from './loadDotEnv'

export default function getEnvironment(): string {
    loadDotEnv()
    return process.env.NODE_ENV || 'development'
}
