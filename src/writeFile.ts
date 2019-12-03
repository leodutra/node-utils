import { PathLike, promises as fsPromises } from 'fs'

export default async function writeFile(
    path: PathLike | fsPromises.FileHandle,
    data: any,
    options?:
        | {
              encoding?: string | null
              mode?: string | number
              flag?: string | number
          }
        | string
        | null
): Promise<void> {
    return fsPromises.writeFile(path, data, options)
}
