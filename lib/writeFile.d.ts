/// <reference types="node" />
import { PathLike, promises as fsPromises } from 'fs';
export default function writeFile(path: PathLike | fsPromises.FileHandle, data: any, options?: {
    encoding?: string | null;
    mode?: string | number;
    flag?: string | number;
} | string | null): Promise<void>;
