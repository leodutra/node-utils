const simpleflakes = require('simpleflakes')
const jsonp = require('jsonp-client')

module.exports = async function fetchJSONP (url) {
    return new Promise((resolve, reject) =>
        jsonp(
            addCallback(url),
            (error, data) => error ? reject(error) : resolve(data)
        )
    )
}

function addCallback (url) {
    return url.match(/callback=[a-z]/i)
        ? url // The URL already has a callback
        : url + '?callback=cb' + simpleflakes.simpleflake()
}
