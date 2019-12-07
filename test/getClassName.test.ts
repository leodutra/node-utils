import { getClassName } from '../src/index'

describe('getClassName()', () => {
    it('should return "Number" for numbers', () => {
        expect(getClassName(1)).toBe('Number')
        expect(getClassName(Infinity)).toBe('Number')
    })

    it('should return "NaN" for NaN values', () => {
        expect(getClassName(NaN)).toBe('NaN')
    })

    it('should return "String" for strings', () => {
        expect(getClassName('')).toBe('String')
        expect(getClassName('string')).toBe('String')
    })

    it('should return "Boolean" for boolean values', () => {
        expect(getClassName(true)).toBe('Boolean')
        expect(getClassName(false)).toBe('Boolean')
    })

    it('should return "null" for null values', () => {
        expect(getClassName(null)).toBe('null')
    })

    it('should return "undefined" for undefined values', () => {
        expect(getClassName(undefined)).toBe('undefined')
    })

    it('should return "Function" for functions', () => {
        expect(getClassName(() => {})).toBe('Function')
        expect(getClassName(function foo() {})).toBe('Function')
    })

    it('should return "BigInt" for big integers', () => {
        expect(getClassName(BigInt(1))).toBe('BigInt')
    })

    it('should return class name for instances of custom classes', () => {
        // tslint:disable-next-line: max-classes-per-file
        class Foo {}
        // tslint:disable-next-line: max-classes-per-file
        class Bar extends Foo {}
        expect(getClassName(new Bar())).toBe(Bar.name)
    })
})
