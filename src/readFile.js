const fsPromises = require('fs').promises

module.exports = async function readFile (file, options) {
    return fsPromises.readFile(file, options)
}
