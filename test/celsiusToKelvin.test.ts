import { celsiusToKelvin } from '../src/index'

describe('celsiusToKelvin()', () => {
    it('should return correct converted value', () => {
        expect(celsiusToKelvin(0)).toBe(273.15)
    })
})
