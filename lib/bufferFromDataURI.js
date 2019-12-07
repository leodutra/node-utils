'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
function bufferFromDataURI(dataURI, decodeURIFirst = true) {
    if (typeof dataURI === 'string') {
        if (decodeURIFirst) {
            dataURI = decodeURIComponent(dataURI)
        }
        const match = dataURI.match(/^data:((?:[^,](?!,|;base64))*[^,])?(?:;(base64))?,(.+)/im)
        if (match) {
            const [, mimeType, encoding, data] = match
            return {
                data: encoding ? Buffer.from(data, encoding) : Buffer.from(data),
                mimeType: mimeType || null,
            }
        }
    }
    return null
}
exports.default = bufferFromDataURI
