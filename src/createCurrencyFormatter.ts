import numf from './numf'

export default function createCurrencyFormatter({
    decimal,
    lSymbol = '',
    rSymbol = '',
    thousandsSep = ',',
    decPoint = '.',
}: {
    decimal?: number
    lSymbol?: string
    rSymbol?: string
    thousandsSep: string
    decPoint: string
}) {
    const defDecimal = decimal
    // tslint:disable-next-line: no-shadowed-variable
    return (num: number, decimal = defDecimal) =>
        num || num === 0
            ? `${lSymbol}${numf(num, decimal, decPoint, thousandsSep)}${rSymbol}`
            : '-'
}
