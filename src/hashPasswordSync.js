const bcrypt = require('bcrypt')

const DEFAULT_SALT_ROUNDS = 12

module.exports = function hashPasswordSync (password, saltOrRounds = DEFAULT_SALT_ROUNDS) {
    return bcrypt.hashSync(password, saltOrRounds)
}
