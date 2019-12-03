'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const simpleflakes = require('simpleflakes')
const jsonp = require('jsonp-client')
async function fetchJSONP(url) {
    return new Promise((resolve, reject) =>
        jsonp(addCallback(url), (error, data) => (error ? reject(error) : resolve(data)))
    )
}
exports.default = fetchJSONP
function addCallback(url) {
    return url.match(/callback=[a-z]/i)
        ? url // The URL already has a callback
        : url + '?callback=cb' + simpleflakes.simpleflake()
}
