const decodeTable: { [key: string]: string } = {
    '#39': "'",
    '#47': '/',
    '#x27': "'",
    '#x2F': '/',
    'amp': '&',
    'apos': "'",
    'gt': '>',
    'lt': '<',
    'nbsp': ' ',
    'quot': '"',
}

const matcher = (match: string, entity: string): string => decodeTable[entity] || match

export default function decodeHTMLEntities(str: string = ''): string {
    return str.replace(/&([^;]+);/gm, matcher)
}
