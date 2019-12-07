export default function bufferFromDataURI(dataURI: any, decodeURIFirst = true) {
    if (typeof dataURI === 'string') {
        if (decodeURIFirst) {
            dataURI = decodeURIComponent(dataURI)
        }
        const match = dataURI.match(/^data:((?:[^,](?!,|;base64))*[^,])?(?:;(base64))?,(.+)/im)
        if (match) {
            const [, mimeType, encoding, data]: string[] = match
            return {
                data: encoding ? Buffer.from(data, encoding as BufferEncoding) : Buffer.from(data),
                mimeType: mimeType || null,
            }
        }
    }
    return null
}
