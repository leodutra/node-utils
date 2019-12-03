import uuid from 'uuid'
import baseX from './baseX'

const base62 = baseX('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')

export default function genBase62Uuidv1() {
    return base62.encode(uuid.v1(null, Buffer.alloc(16)))
}
