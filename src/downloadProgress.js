const _cliProgress = require('cli-progress')
const fs = require('fs')
const path = require('path')
const { DownloadWorker, utils } = require('rapid-downloader')

const progressBars = new _cliProgress.MultiBar({
    format: 'Downloading: {bar} {percentage}% | {filename} | ETA: {eta_formatted} | {value}/{total} kB | {speed} | {state}',
    stopOnComplete: true,
    clearOnComplete: false,
    hideCursor: true
}, _cliProgress.Presets.shades_grey)


module.exports = async function downloadProgress(urls, opts = {}) {
    opts = {
        dest: './',
        progressUpdateInterval: 50,
        ...opts
    }
    const downloads = []
    return Promise.all(
        urls.map(x =>
            new Promise((resolve, reject) => {
                const url = typeof x === 'object' ? x.url : x
                const filePath = uniqueFilePath(path.relative(opts.dest, x.filePath || filenameFromURL(url)))
                const downloadWorker = new DownloadWorker(url, filePath, opts)
                const downloadContext = { filePath, downloadWorker, progressBar: null }
                downloads.push(downloadContext)
                downloadWorker.on('progress', ({ totalBytes, downloadedBytes, bytesPerSecond, state }) => {
                    if (totalBytes && bytesPerSecond) {
                        const speed = utils.dynamicSpeedUnitDisplay(bytesPerSecond, 2)
                        if (downloadContext.progressBar) {
                            downloadContext.progressBar.update(
                                utils.byteToKb(downloadedBytes),
                                { speed, state }
                            )
                        } else {
                            downloadContext.progressBar = progressBars.create(
                                utils.byteToKb(totalBytes),
                                utils.byteToKb(downloadedBytes),
                                {
                                    filename: path.basename(filePath),
                                    speed,
                                    state
                                }
                            )
                        }
                    }
                })
                downloadWorker.on('end', () => {
                    if (downloadContext.progressBar) {
                        const { totalBytes, bytesPerSecond } = downloadWorker.getProgress()
                        const speed = utils.dynamicSpeedUnitDisplay(bytesPerSecond, 2)
                        downloadContext.progressBar.update(
                            utils.byteToKb(totalBytes),
                            { speed: '0 b/s', state: 'done' }
                        )
                    }
                    resolve()
                })
                downloadWorker.on('error', reject)
                downloadWorker.start()
            })
        )
    ).catch(async error => {
        await Promise.all(downloads.map(
            ({ filePath, downloadWorker, progressBar }) => {
                downloadWorker.stop()
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
