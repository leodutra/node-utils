module.exports = function urlExtension(url) {
    const match = url.replace(/\r?\n|(?:[?#].+)?/im, '').match(/\.(\w+)$/im)
    return match
        ? match[1].trim()
        : null
}