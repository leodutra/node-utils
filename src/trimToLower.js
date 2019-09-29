module.exports = function trimToLower (any) {
    return typeof any === 'string' ? any.trim().toLowerCase() : any
}
