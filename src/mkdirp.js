const mkdirpLib = require('mkdirp')

module.exports = async function mkdirp (dir, opts) {
    return new Promise((resolve, reject) =>
        mkdirpLib(dir, opts, error => error ? reject(error) : resolve())
    )
}
