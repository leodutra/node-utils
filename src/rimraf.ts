import rimrafLib from 'rimraf'

export default async function rimraf(dir: string, opts: any): Promise<void> {
    return new Promise((resolve, reject) => rimrafLib(dir, opts, (error: Error) => (error ? reject(error) : resolve())))
}
