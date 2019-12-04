import { decodeHTMLEntities } from '../src/index'

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
`('decodeHTMLEntities should return "$result" when "$charEntity" is inputted', ({charEntity, result}): any => {
    expect(decodeHTMLEntities(charEntity)).toEqual(result);
})