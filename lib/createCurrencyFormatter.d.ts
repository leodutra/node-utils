export default function createCurrencyFormatter({ decimal, lSymbol, rSymbol, thousandsSep, decPoint, }: {
    decimal?: number;
    lSymbol?: string;
    rSymbol?: string;
    thousandsSep: string;
    decPoint: string;
}): (num: number, decimal?: number | undefined) => string;
