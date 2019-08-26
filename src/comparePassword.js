const bcrypt = require('bcrypt')

module.exports = async function comparePassword (password, passwordHash) {
    return bcrypt.compare(password, passwordHash)
}
