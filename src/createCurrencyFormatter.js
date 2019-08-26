const numf = require('./numf')

function createCurrencyFormatter ({
    decimal = null,
    lSymbol,
    rSymbol,
    thousandsSep = ',',
    decPoint = '.'
}) {
    const defDecimal = decimal
    return (num, decimal = defDecimal) =>
        num || num === 0
            ? `${lSymbol || ''}${
                numf(num, decimal, decPoint, thousandsSep)}${rSymbol || ''
            }`
            : '-'
}

module.exports = createCurrencyFormatter
