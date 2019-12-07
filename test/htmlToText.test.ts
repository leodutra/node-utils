import { htmlToText } from '../src/index'

describe('htmlToText()', () => {
    it('should return text without HTML tags', () => {
        expect(htmlToText('<h1>Title</h1><br><p>Paragraph<br>with<br>breaks</p>')).toBe(
            'Title\nParagraph\nwith\nbreaks'
        )
    })

    it('should return empty string when the input is not a string', () => {
        expect(htmlToText(null)).toBe('')
        expect(htmlToText(0)).toBe('')
        expect(htmlToText('')).toBe('')
    })
})
