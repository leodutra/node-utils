import jwt from 'jsonwebtoken'

export default function buildJwt(payload: string | object | Buffer, secret: any, options: any): string {
    if (!options || !options.expiresIn) {
        throw new TypeError(`Missing "expiresIn" for ${buildJwt.name}()`)
    }
    return jwt.sign(payload, secret, { expiresIn: options.expiresIn })
}
