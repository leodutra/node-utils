import { kelvinToCelsius } from '../src/index'

describe('kelvinToCelsius()', () => {
    it('should return correct converted value', () => {
        expect(kelvinToCelsius(0)).toBe(-273.15)
    })
})
