import { PathLike, promises as fsPromises } from 'fs'

module.exports = async function readFile(
    path: PathLike | fsPromises.FileHandle,
    options?:
        | {
              encoding?: string | null | BufferEncoding
              flag?: string | number
          }
        | string
        | null
        | BufferEncoding
): Promise<string | Buffer> {
    return fsPromises.readFile(path, options)
}
