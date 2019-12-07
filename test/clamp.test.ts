import { clamp } from '../src/index'

describe('clamp()', () => {
    it('should return clamped value', () => {
        expect(clamp(10, 0, 5)).toBe(5)
        expect(clamp(10, 0, Infinity)).toBe(10)
        expect(clamp(-10, -5, 5)).toBe(-5)
        expect(clamp(-10, 0, 0)).toBe(0)
    })
})
