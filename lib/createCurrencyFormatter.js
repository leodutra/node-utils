'use strict'
var __importDefault =
    (this && this.__importDefault) ||
    function(mod) {
        return mod && mod.__esModule ? mod : { default: mod }
    }
Object.defineProperty(exports, '__esModule', { value: true })
const numf_1 = __importDefault(require('./numf'))
function createCurrencyFormatter({ decimal, lSymbol = '', rSymbol = '', thousandsSep = ',', decPoint = '.' }) {
    const defDecimal = decimal
    // tslint:disable-next-line: no-shadowed-variable
    return (num, decimal = defDecimal) =>
        num || num === 0 ? `${lSymbol}${numf_1.default(num, decimal, decPoint, thousandsSep)}${rSymbol}` : '-'
}
exports.default = createCurrencyFormatter
