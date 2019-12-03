import mkdirpLib from 'mkdirp'

export default async function mkdirp(dir: string, opts: string | number | object): Promise<string | null> {
    return new Promise((resolve, reject) =>
        mkdirpLib(dir, opts, (error: Error, made: string | null) => (error ? reject(error) : resolve(made)))
    )
}
