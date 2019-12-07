import { encodeHTMLEntities } from '../src/index'

describe('encodeHTMLEntities()', () => {
    test.each`
        chars      | result
        ${'\n'}    | ${'&#10;'}
        ${'\r'}    | ${'&#13;'}
        ${'"'}     | ${'&quot;'}
        ${'&'}     | ${'&amp;'}
        ${"'"}     | ${'&apos;'}
        ${'<'}     | ${'&lt;'}
        ${'>'}     | ${'&gt;'}
        ${'<div>'} | ${'&lt;div&gt;'}
    `('should return "$result" when "$chars" is inputted', ({ chars, result }): any => {
        expect(encodeHTMLEntities(chars)).toEqual(result)
    })

    it('should return empty string when input is not string', () => {
        expect(encodeHTMLEntities(undefined)).toBe('')
        expect(encodeHTMLEntities('')).toBe('')
    })
})
