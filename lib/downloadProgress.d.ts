export default function downloadProgress(specs: IDownloadSpec[]): Promise<string[]>;
interface IDownloadSpec {
    url: string;
    filePath?: string;
    dest?: string;
    progressUpdateInterval?: number;
}
export {};
