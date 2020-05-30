module.exports = function decomposeDataURI(dataURI) {
    const match = dataURI.match(
        /^data:((?:[^,](?!,|;base64))*[^,])?(?:;(base64))?,(.+)/im
    )
    if (match) {
        const [, mimeType = null, encoding = null, data] = match
        return { mimeType, encoding, data, dataURI }
    }
    return null
}
