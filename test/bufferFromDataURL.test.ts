import { bufferFromDataURI } from '../src/index'

describe('bufferFromDataURI()', () => {
    it('should decode URI first and return structured data', () => {
        const given = bufferFromDataURI('data:,Hello%2C%20World!')
        expect(given!.data).toEqual(Buffer.from('Hello, World!'))
    })

    it('should return null mime type when mime type is not defined', () => {
        const given = bufferFromDataURI('data:,Hello%2C%20World!')
        expect(given!.mimeType).toEqual(null)
    })

    it('should return mime type and data buffer with base64 encoding', () => {
        const given = bufferFromDataURI('data:text/plain;base64,SGVsbG8sIFdvcmxkIQ')
        expect(given!.data).toEqual(Buffer.from('SGVsbG8sIFdvcmxkIQ', 'base64'))
        expect(given!.mimeType).toEqual('text/plain')
    })

    it('should return null when input is invalid', () => {
        expect(bufferFromDataURI(null)).toBe(null)
        expect(bufferFromDataURI('shall not match')).toBe(null)
    })
})
