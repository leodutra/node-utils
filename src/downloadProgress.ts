import fs from 'fs'
import path from 'path'

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

export default async function downloadProgress(specs: IDownloadSpec[]) {
    const downloads: DownloadContext[] = []
    return Promise.all(
        specs.map(
            (spec: IDownloadSpec): Promise<string> =>
                new Promise((resolve, reject) => {
                    const filePath = uniqueFilePath(
                        path.relative(spec.dest || './', spec.filePath || filenameFromURL(spec.url))
                    )
                    const progressUpdateInterval = spec.progressUpdateInterval || 50
                    const downloadWorker = new DownloadWorker(spec.url, filePath, { progressUpdateInterval })
                    const downloadContext = new DownloadContext(filePath, downloadWorker)
                    downloads.push(downloadContext)
                    downloadWorker.on(
                        'progress',
                        ({ totalBytes, downloadedBytes, bytesPerSecond, state }: IProgressData) => {
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
                                            filename: path.basename(filePath),
                                            speed,
                                            state,
                                        }
                                    )
                                }
                            }
                        }
                    )
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
    ).catch(async (error: Error) => {
        await Promise.all(
            downloads.map(({ filePath, downloadWorker, progressBar }) => {
                downloadWorker.stop()
                if (progressBar) {
                    progressBars.remove(progressBar)
                }
                return (
                    fs.promises
                        .unlink(filePath)
                        // tslint:disable-next-line: no-console
                        .catch(console.error)
                )
            })
        )
        throw error
    })
}

class DownloadContext {
    constructor(public filePath: string, public downloadWorker: any, public progressBar?: any) {}
}

interface IProgressData {
    bytesPerSecond: number
    downloadedBytes: number
    state: string
    totalBytes: number
}

interface IDownloadSpec {
    url: string
    filePath?: string
    dest?: string
    progressUpdateInterval?: number
}

function filenameFromURL(url: string) {
    return url
        .toString()
        .substr(url.lastIndexOf('/') + 1)
        .replace(/[\\/:*?"<>]+/gim, '-') // Windows reserved symbols
}

function uniqueFilePath(filePath: string) {
    const { name, ext, dir } = path.parse(filePath)
    let fileNumber = 0
    while (fs.existsSync(filePath)) {
        filePath = `${dir ? dir + path.sep : ''}${name} (${++fileNumber})${ext}`
    }
    return filePath
}
