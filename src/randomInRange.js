module.exports = function randomInRange (min, max) {
    min = min ? parseInt(min, 10) : 1
    max = max ? parseInt(max, 10) : min

    return max > min
        ? Math.floor(Math.random() * (max - min + 1) + min)
        : min
}
