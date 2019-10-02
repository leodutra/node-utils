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
    return new Promise((resolve, reject) => {
        let {
            cliProgress = true,
            filePath = filenameFromURL(url)
        } = opts
        filePath = uniqueFilePath(filePath)
        const fileOutputStream = fs.createWriteStream(filePath, { flags: 'ax' })
        const dataInputStream = got.stream(url)
        if (cliProgress) {
            let progressBar
            dataInputStream.on('downloadProgress', progress => {
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
        const onError = error => {
            console.log('Download: error...')
            fs.unlink(filePath, (err) => {
                if (err) console.error(err)
                reject(error)
            })
        }
        dataInputStream
            .on('error', onError)
            .pipe(fileOutputStream)
            .on('error', onError)
            .on('finish', () => {
                downloadBars.update()
                fileOutputStream.close(resolve)
            })
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
