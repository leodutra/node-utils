export default function toImmutableProxy<T extends object>(proxyTarget: T): T | (T & Function);
