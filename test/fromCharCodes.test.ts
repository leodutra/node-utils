import { fromCharCodes } from '../src/index'

describe('fromCharCodes()', () => {
    it('should return correct converted value', () => {
        expect(fromCharCodes([72, 101, 108, 108, 111, 44, 32, 119, 111, 114, 108, 100, 33])).toBe('Hello, world!')
    })
})