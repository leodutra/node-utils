export default function urlExtension(url: any) {
    if (typeof url === 'string') {
        const match = url.replace(/\r?\n|(?:[?#].+)?/im, '').match(/\.(\w+)$/im)
        return match ? match[1].trim() : null
    } else {
        return ''
    }
}
