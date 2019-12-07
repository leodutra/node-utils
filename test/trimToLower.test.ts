import { trimToLower } from '../src/index'

describe('trimToLower()', () => {
    it('should return trimmed lower case string', () => {
        expect(trimToLower(' SOME TEXT ')).toBe('some text')
    })

    it('should return empty string when the input is not a string', () => {
        expect(trimToLower(null)).toBe('')
        expect(trimToLower(10)).toBe('')
    })
})
