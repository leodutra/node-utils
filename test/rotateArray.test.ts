import { rotateArray } from '../src/index'

describe('rotateArray()', () => {
    it('should keep array as is when offset is zero', () => {
        expect(rotateArray(0,[1,2,3])).toEqual([1,2,3])
        expect(rotateArray(0,[])).toEqual([])
    })

    it('should rotate array to the right when offset is positive', () => {
        expect(rotateArray(1,[1,2,3])).toEqual([3,1,2])
        expect(rotateArray(3,[1,2,3])).toEqual([1,2,3])
        expect(rotateArray(3,[])).toEqual([])
    })

    it('should rotate array to the right when offset is negative', () => {
        expect(rotateArray(-1,[1,2,3])).toEqual([2,3,1])
        expect(rotateArray(-3,[1,2,3])).toEqual([1,2,3])
        expect(rotateArray(-3,[])).toEqual([])
    })
})