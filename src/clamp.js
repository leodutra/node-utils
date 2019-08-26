module.exports = function clamp (x, min, max) {
    return Math.min(Math.max(min, x), max)
}
