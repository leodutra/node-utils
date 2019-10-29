const download = require('download')
const _cliProgress = require('cli-progress')
const fs = require('fs')
const path = require('path')
const util = require('util')
const pipeline = util.promisify(require('stream').pipeline)

const progressBars = new _cliProgress.MultiBar({
    format: 'Downloading: {bar} {percentage}% | {filename} | ETA: {eta_formatted} | {value}/{total} bytes',
    stopOnComplete: true,
    clearOnComplete: false,
    hideCursor: true
}, _cliProgress.Presets.shades_grey)

module.exports = async function downloadProgress(urls, opts = {}) {
    const {
        dest = '.'
    } = opts
    const downloads = []
    return Promise.all(
        urls.map(x => {
            const url = typeof x === 'object' ? x.url : x
            const filePath = uniqueFilePath(path.relative(dest, x.filePath || filenameFromURL(url)))
            const fileStream = fs.createWriteStream(filePath)
            const downloadStream = download(url)
            const downloadData = { filePath, fileStream, downloadStream, progressBar: null }
            downloads.push(downloadData)
            downloadStream.on('downloadProgress', progress => {
                if (downloadData.progressBar) {
                    downloadData.progressBar.update(progress.transferred)
                } else {
                    downloadData.progressBar = progressBars.create(
                        progress.total,
                        progress.transferred,
                        {
                            filename: path.basename(filePath)
                        }
                    )
                }
            })
            return pipeline(
                downloadStream,
                fileStream
            )
        })
    ).catch(async error => {
        await Promise.all(downloads.map(
            ({ filePath, fileStream, downloadStream, progressBar }) => {
                downloadStream.destroy()
                fileStream.destroy()
                if (progressBar) {
                    progressBars.remove(progressBar)
                }
                return fs.promises.unlink(filePath)
                    .catch(console.error)
            })
        )
        throw error
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
