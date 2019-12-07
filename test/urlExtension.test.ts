import { urlExtension } from '../src/index'

describe('urlExtension()', () => {
    it('should return url extension when present', () => {
        expect(urlExtension('https://www.fake.com/fakefile.json?fake_param=x&another_fake=y')).toBe('json')
    })

    it('should return empty string when the url does not have an extension', () => {
        expect(urlExtension('https://www.fake.com/fakePathWithoutExt')).toBe('')
    })

    it('should return empty string when input is not a string', () => {
        expect(urlExtension(null)).toBe('')
    })
})
