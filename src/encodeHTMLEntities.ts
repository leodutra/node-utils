const encodeTable: { [key: string]: string } = {
    '\n': '#10;',
    '\r': '#13;',
    '"': 'quot;',
    '&': 'amp;',
    "'": 'apos;',
    '<': 'lt;',
    '>': 'gt;',
}

const matcher = (match: string) => '&' + encodeTable[match]

export default function encodeHTMLEntities(html: any) {
    return typeof html === 'string'
        ? html.replace(/[<>&\r\n"']/gm, matcher)
        : ''
}
