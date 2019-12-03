const encodeTable: { [key: string]: string } = {
    '\n': '#10;',
    '\r': '#13;',
    '"': 'quot;',
    '&': 'amp;',
    "'": 'apos;',
    '<': 'lt;',
    '>': 'gt;',
}

const matcher = (match: string): string => '&' + encodeTable[match]

export default function encodeHTMLEntities(html: string = '') {
    return html.replace(/[<>&\r\n"']/gm, matcher)
}
