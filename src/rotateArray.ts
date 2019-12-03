export default function rotateArray(offset: number, array: any[]) {
    offset = -(offset % array.length)
    return array.slice(offset).concat(array.slice(0, offset))
}
