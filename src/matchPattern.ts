export default function matchPattern(str: string, regexp: RegExp) {
    const regexpClone = new RegExp(
        regexp.source,
        regexp.flags ||
            (regexp.global ? 'g' : '') +
                (regexp.ignoreCase ? 'i' : '') +
                (regexp.multiline ? 'm' : '') +
                (regexp.dotAll ? 's' : '') +
                (regexp.unicode ? 'u' : '') +
                (regexp.sticky ? 'y' : '')
    )
    regexpClone.lastIndex = 0
    let match = regexpClone.exec(str)
    if (match) {
        if (regexpClone.global) {
            const matches = []
            do {
                matches.push(match)
                match = regexpClone.exec(str)
            } while (match)
            return matches
        } else {
            return [match]
        }
    } else {
        return []
    }
}
