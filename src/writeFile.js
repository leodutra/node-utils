const fsPromises = require('fs').promises

module.exports = async function writeFile (file, data, options) {
    return fsPromises.writeFile(file, data, options)
}
