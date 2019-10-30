// const download = require('download')
const _cliProgress = require('cli-progress')
const fs = require('fs')
const path = require('path')
const util = require('util')
const stream = require('stream')
const pipeline = util.promisify(stream.pipeline)
const request = require('request')

const progressBars = new _cliProgress.MultiBar({
    format: 'Downloading: {bar} {percentage}% | {filename} | ETA: {eta_formatted} | {value}/{total} bytes',
    stopOnComplete: true,
    clearOnComplete: false,
    hideCursor: true
}, _cliProgress.Presets.shades_grey)

module.exports = async function downloadProgress(urls, opts = {}) {
    const {
        dest = './'
    } = opts
    const downloads = []
    return Promise.all(
        urls.map(async x => {
            const url = typeof x === 'object' ? x.url : x
            const filePath = uniqueFilePath(path.relative(dest, x.filePath || filenameFromURL(url)))
            const fileStream = fs.createWriteStream(filePath)
            const downstream = await getStream(url)
            const downloadContext = { filePath, fileStream, downstream, progressBar: null }
            downloads.push(downloadContext)
            const downloadSize = downstream.headers['content-length']
            let downloadedBytes = 0
            const transform = new stream.Transform({
                transform(chunk, encoding, callback) {
                    process.nextTick(() => {
                        downloadedBytes += Buffer.byteLength(chunk)
                        if (downloadSize) {
                            if (downloadContext.progressBar) {
                                downloadContext.progressBar.update(downloadedBytes)
                            } else {
                                downloadContext.progressBar = progressBars.create(
                                    downloadSize,
                                    downloadedBytes,
                                    {
                                        filename: path.basename(filePath)
                                    }
                                )
                            }
                        }
                    })
                    callback()
                }
            })
            downstream.on('error', console.error)
            return pipeline(
                downstream,
                transform,
                fileStream
            )
        })
    ).catch(async error => {
        await Promise.all(downloads.map(
            ({ filePath, fileStream, downstream, progressBar }) => {
                if (!downstream.destroyed) {
                    downstream.destroy()
                }
                if (!fileStream.destroyed) {
                    fileStream.destroy()
                }
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

async function getStream(url) {
    return new Promise((resolve, reject) => 
        request(url)
            .on('response', resolve)
            .on('error', reject)
    )
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
