'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function(mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
const fs_1 = __importDefault(require('fs'))
const path_1 = __importDefault(require('path'))
const cliProgress = require('cli-progress')
const { DownloadWorker, utils } = require('rapid-downloader')
const progressBars = new cliProgress.MultiBar(
    {
        clearOnComplete: false,
        format:
            'Downloading: {bar} {percentage}% | {filename} | ETA: {eta_formatted} | {value}/{total} kB | {speed} | {state}',
        hideCursor: true,
        stopOnComplete: true,
    },
    cliProgress.Presets.shades_grey
)
async function downloadProgress(specs) {
    const downloads = []
    return Promise.all(
        specs.map(
            spec =>
                new Promise((resolve, reject) => {
                    const filePath = uniqueFilePath(
                        path_1.default.relative(spec.dest || './', spec.filePath || filenameFromURL(spec.url))
                    )
                    const progressUpdateInterval = spec.progressUpdateInterval || 50
                    const downloadWorker = new DownloadWorker(spec.url, filePath, { progressUpdateInterval })
                    const downloadContext = new DownloadContext(filePath, downloadWorker)
                    downloads.push(downloadContext)
                    downloadWorker.on('progress', ({ totalBytes, downloadedBytes, bytesPerSecond, state }) => {
                        if (totalBytes && bytesPerSecond) {
                            const speed = utils.dynamicSpeedUnitDisplay(bytesPerSecond, 2)
                            if (downloadContext.progressBar) {
                                downloadContext.progressBar.update(utils.byteToKb(downloadedBytes), {
                                    speed,
                                    state,
                                })
                            } else {
                                downloadContext.progressBar = progressBars.create(
                                    utils.byteToKb(totalBytes),
                                    utils.byteToKb(downloadedBytes),
                                    {
                                        filename: path_1.default.basename(filePath),
                                        speed,
                                        state,
                                    }
                                )
                            }
                        }
                    })
                    downloadWorker.on('end', () => {
                        if (downloadContext.progressBar) {
                            const { totalBytes, bytesPerSecond } = downloadWorker.getProgress()
                            const speed = utils.dynamicSpeedUnitDisplay(bytesPerSecond, 2)
                            downloadContext.progressBar.update(utils.byteToKb(totalBytes), {
                                speed: '0 b/s',
                                state: 'done',
                            })
                        }
                        resolve(filePath)
                    })
                    downloadWorker.on('error', reject)
                    downloadWorker.start()
                })
        )
    ).catch(async error => {
        await Promise.all(
            downloads.map(({ filePath, downloadWorker, progressBar }) => {
                downloadWorker.stop()
                if (progressBar) {
                    progressBars.remove(progressBar)
                }
                return (
                    fs_1.default.promises
                        .unlink(filePath)
                        // tslint:disable-next-line: no-console
                        .catch(console.error)
                )
            })
        )
        throw error
    })
}
exports.default = downloadProgress
class DownloadContext {
    constructor(filePath, downloadWorker, progressBar) {
        this.filePath = filePath
        this.downloadWorker = downloadWorker
        this.progressBar = progressBar
    }
}
function filenameFromURL(url) {
    return url
        .toString()
        .substr(url.lastIndexOf('/') + 1)
        .replace(/[\\/:*?"<>]+/gim, '-') // Windows reserved symbols
}
function uniqueFilePath(filePath) {
    const { name, ext, dir } = path_1.default.parse(filePath)
    let fileNumber = 0
    while (fs_1.default.existsSync(filePath)) {
        filePath = `${dir ? dir + path_1.default.sep : ''}${name} (${++fileNumber})${ext}`
    }
    return filePath
}
