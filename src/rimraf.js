const rimrafLib = require('rimraf')

module.exports = async function rimraf (dir, opts) {
    return new Promise((resolve, reject) =>
        rimrafLib(dir, opts, error => error ? reject(error) : resolve())
    )
}
