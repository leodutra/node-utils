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

module.exports = async function downloadFile (url, opts = {}) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
        let {
            cliProgress = true,
            filePath = filenameFromURL(url)
        } = opts
        filePath = uniqueFilePath(filePath)
        let file
        try {
            file = fs.createWriteStream(filePath, { flags: 'ax' })
        } catch (error) {
            return reject(error)
        }
        const gotPromise = got(url, { stream: true })
        let progressBar
        if (cliProgress) {
            gotPromise.on('downloadProgress', progress => {
                if (progressBar) {
                    progressBar.update(progress.transferred)
                } else {
                    progressBar = downloadBars.create(
                        progress.total,
                        progress.transferred,
                        {
                            filename: path.basename(filePath)
                        }
                    )
                }
            })
        }
        const onError = async error => {
            await fs.promises.unlink(filePath)
            reject(error)
        }
        gotPromise.on('error', onError)
        const stream = await gotPromise
        stream.pipe(file)
            .on('finish', () => {
                downloadBars.update()
                file.close(resolve)
            })
            .on('error', onError)
    })
}

function filenameFromURL (url) {
    return url.toString().substr(url.lastIndexOf('/') + 1)
        .replace(/[\\/:*?"<>]+/gim, '-') // Windows reserved symbols
}

function uniqueFilePath (filePath) {
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
