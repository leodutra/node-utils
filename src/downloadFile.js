const got = require('got')
const _cliProgress = require('cli-progress')
const fs = require('fs')
const path = require('path')

const downloadBars = new _cliProgress.MultiBar({
    format: 'Downloading: {bar} {percentage}% | {filename} | ETA: {eta_formatted} | {value}/{total} bytes',
    stopOnComplete: true,
    clearOnComplete: false,
    hideCursor: true
}, _cliProgress.Presets.shades_grey)

module.exports = async function downloadFile(url, opts = {}) {
    return new Promise((resolve, reject) => {
        let {
            cliProgress = true,
            filePath = filenameFromURL(url)
        } = opts
        filePath = uniqueFilePath(filePath)
        const fileWritableStream = fs.createWriteStream(filePath)
        const dataReadableStream = got.stream(url)
        if (cliProgress) {
            let progressBar
            dataReadableStream.on('downloadProgress', progress => {
                if (progressBar) {
                    progressBar.update(progress.transferred | 0)
                } else {
                    progressBar = downloadBars.create(
                        progress.total | 0,
                        progress.transferred | 0,
                        {
                            filename: path.basename(filePath)
                        }
                    )
                }
            })
        }
        dataReadableStream
            .once('error', error => {
                // if the Readable stream emits an error during processing, the Writable destination is not closed automatically
                // https://nodejs.org/api/stream.html#stream_readable_pipe_destination_options
                fileWritableStream.close()
                fs.unlink(filePath, err => {
                    if (err) console.error(err)
                    reject(error)
                })
            })
            .pipe(fileWritableStream)
            .once('finish', () => {
                if (cliProgress) {
                    downloadBars.update()
                } else {
                    console.log(`Downloaded file: ${filePath}\n\tfrom: ${url}`)
                }
                resolve()
            })

    })
}

function filenameFromURL(url) {
    return url.toString().substr(url.lastIndexOf('/') + 1)
        .replace(/[\\/:*?"<>]+/gim, '-') // Windows reserved symbols
}

function uniqueFilePath(filePath) {
    const {
        name,
        ext,
        dir
    } = path.parse(filePath)
    let fileNumber = 0
    while (fs.existsSync(filePath)) {
        filePath = `${dir ? dir + path.sep : ''}${name} (${++fileNumber})${ext}`
    }
    return filePath
}
