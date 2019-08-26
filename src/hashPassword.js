const bcrypt = require('bcrypt')

const DEFAULT_SALT_ROUNDS = 12

module.exports = async function hashPassword (password, saltOrRounds = DEFAULT_SALT_ROUNDS) {
    return bcrypt.hash(password, saltOrRounds)
}
