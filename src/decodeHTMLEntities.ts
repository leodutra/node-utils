const decodeTable: { [key: string]: string } = {
    '#39': "'",
    '#47': '/',
    '#x27': "'",
    '#x2F': '/',
    'amp': '&',
    'apos': "'",
    'gt': '>',
    'lt': '<',
    'nbsp': '\u0020',
    'quot': '"',
}

const matcher = (match: string, entity: string) => decodeTable[entity] || match

export default function decodeHTMLEntities(str: any) {
    return typeof str === 'string' ? str.replace(/&([^;]+);/gm, matcher) : ''
}
