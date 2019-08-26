module.exports = function bufferFromDataURI (dataURI) {
    const [, mimeType, encoding, data] = dataURI.match(
        /^data:((?:[^,](?!,|;base64))*[^,])?(?:;(base64))?,(.+)/im
    )
    return {
        mimeType: mimeType,
        data: encoding
            ? Buffer.from(data, encoding)
            : data
    }
}
