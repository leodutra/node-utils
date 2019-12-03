export default function randomInRange(min: number, max?: number) {
    return typeof max === 'number' && max > min ? Math.floor(Math.random() * (max - min + 1) + min) : min
}
