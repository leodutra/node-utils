const simpleflakes = require('simpleflakes')
const jsonp = require('jsonp-client')

export default async function fetchJSONP(url: string): Promise<any> {
    return new Promise((resolve, reject) =>
        jsonp(addCallback(url), (error: Error, data: any) => (error ? reject(error) : resolve(data)))
    )
}

function addCallback(url: string): string {
    return url.match(/callback=[a-z]/i)
        ? url // The URL already has a callback
        : url + '?callback=cb' + simpleflakes.simpleflake()
}
