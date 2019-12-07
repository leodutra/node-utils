import { decodeHTMLEntities } from '../src/index'

describe('decodeHTMLEntities()', () => {
    test.each`  
        charEntity    | result
        ${ '&#39;'  } | ${ "'" }
        ${ '&#47;'  } | ${ "/" }
        ${ '&#x27;' } | ${ "'" }
        ${ '&#x2F;' } | ${ "/" }
        ${ '&amp;'  } | ${ "&" }
        ${ '&apos;' } | ${ "'" }
        ${ '&gt;'   } | ${ ">" }
        ${ '&lt;'   } | ${ "<" }
        ${ '&quot;' } | ${ '"' }
        ${ '&nbsp;' } | ${ "\u0020" }
    `('should return "$result" when "$charEntity" is inputted', ({charEntity, result}): any => {
        expect(decodeHTMLEntities(charEntity)).toEqual(result)
    })

    it('should return empty string when input is not string', () => {
        expect(decodeHTMLEntities(undefined)).toBe('')
        expect(decodeHTMLEntities()).toBe('')
    })
})
