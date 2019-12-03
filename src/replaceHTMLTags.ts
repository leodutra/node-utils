export default function replaceHTMLTags(str: any) {
    return typeof str === 'string' ? str.replace(/<\s*br\s*\/?>/gim, '\n').replace(/<([^>]+)>/gim, '') : ''
}
