import bcrypt from 'bcrypt'

const DEFAULT_SALT_ROUNDS = 12

export default function hashPasswordSync(password: string, saltOrRounds = DEFAULT_SALT_ROUNDS) {
    return bcrypt.hashSync(password, saltOrRounds)
}
