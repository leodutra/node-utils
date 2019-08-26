const loadDotEnv = require('./loadDotEnv')

module.exports = function getEnvironment () {
    loadDotEnv()
    return process.env.NODE_ENV || 'development'
}
