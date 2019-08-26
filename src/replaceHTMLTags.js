module.exports = function replaceHTMLTags (text) {
    return text
        ? text
            .replace(/<\s*br\s*\/?>/gim, '\n')
            .replace(/<([^>]+)>/gim, '')
        : text
}
