export default function fixedDecimal(decimals: number, value: number): number {
    return Number(value.toFixed(decimals))
}
