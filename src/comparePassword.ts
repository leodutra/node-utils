import bcrypt from 'bcrypt'

export default async function comparePassword(password: any, passwordHash: string): Promise<boolean> {
    return bcrypt.compare(password, passwordHash)
}
