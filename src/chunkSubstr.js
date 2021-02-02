module.exports = function chunkSubstr(str, size) {
    const numChunks = Math.ceil(str.length / size)
    const chunks = new Array(numChunks)

    for (let i = 0, k = 0; i < numChunks; k += size) {
        chunks[i++] = str.substr(k, size)
    }
    return chunks
}
