function decomposeDataURI(dataURI) {
    const [, mimeType = null, encoding = null, data] = dataURI.match(
        /^data:((?:[^,](?!,|;base64))*[^,])?(?:;(base64))?,(.+)/im
    )
    return { mimeType, encoding, data, dataURI }
}
