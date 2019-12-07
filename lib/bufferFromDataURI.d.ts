/// <reference types="node" />
export default function bufferFromDataURI(dataURI: any, decodeURIFirst?: boolean): {
    data: Buffer;
    mimeType: string | null;
} | null;
