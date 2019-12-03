'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
function numf(num, decimals, decPoint = '.', thousandsSep = ',') {
    // discuss at: http://locutus.io/php/number_format/
    // original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    // improved by: Kevin van Zonneveld (http://kvz.io)
    // improved by: davook
    // improved by: Brett Zamir (http://brett-zamir.me)
    // improved by: Brett Zamir (http://brett-zamir.me)
    // improved by: Theriault (https://github.com/Theriault)
    // improved by: Kevin van Zonneveld (http://kvz.io)
    // bugfixed by: Michael White (http://getsprink.com)
    // bugfixed by: Benjamin Lupton
    // bugfixed by: Allan Jensen (http://www.winternet.no)
    // bugfixed by: Howard Yeend
    // bugfixed by: Diogo Resende
    // bugfixed by: Rival
    // bugfixed by: Brett Zamir (http://brett-zamir.me)
    //  revised by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
    //  revised by: Luke Smith (http://lucassmith.name)
    //    input by: Kheang Hok Chin (http://www.distantia.ca/)
    //    input by: Jay Klehr
    //    input by: Amir Habibi (http://www.residence-mixte.com/)
    //    input by: Amirouche
    //   example 1: number_format(1234.56)
    //   returns 1: '1,235'
    //   example 2: number_format(1234.56, 2, ',', ' ')
    //   returns 2: '1 234,56'
    //   example 3: number_format(1234.5678, 2, '.', '')
    //   returns 3: '1234.57'
    //   example 4: number_format(67, 2, ',', '.')
    //   returns 4: '67,00'
    //   example 5: number_format(1000)
    //   returns 5: '1,000'
    //   example 6: number_format(67.311, 2)
    //   returns 6: '67.31'
    //   example 7: number_format(1000.55, 1)
    //   returns 7: '1,000.6'
    //   example 8: number_format(67000, 5, ',', '.')
    //   returns 8: '67.000,00000'
    //   example 9: number_format(0.9, 0)
    //   returns 9: '1'
    //  example 10: number_format('1.20', 2)
    //  returns 10: '1.20'
    //  example 11: number_format('1.20', 4)
    //  returns 11: '1.2000'
    //  example 12: number_format('1.2000', 3)
    //  returns 12: '1.200'
    //  example 13: number_format('1 000,50', 2, '.', ' ')
    //  returns 13: '100 050.00'
    //  example 14: number_format(1e-8, 8, '.', '')
    //  returns 14: '0.00000001'
    num = (num + '').replace(/[^0-9+\-Ee.]/g, '')
    const n = isFinite(num) ? num : '0'
    let prec = 0
    let round
    if (typeof decimals === 'number' && isFinite(decimals)) {
        prec = Math.abs(decimals)
        if (n.indexOf('e') === -1) {
            round = '' + +(Math.round(+(n + 'e+' + prec)) + 'e-' + prec)
        } else {
            const arr = n.split('e')
            round = (+(
                Math.round(+(+arr[0] + 'e' + (+arr[1] + prec > 0 ? '+' : '') + (+arr[1] + prec))) +
                'e-' +
                prec
            )).toFixed(prec)
        }
    } else {
        round = n
    }
    // TODO: for IE parseFloat(0.55).toFixed(0) = 0;
    const s = round.split('.')
    if (s[0].length > 3) {
        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, thousandsSep)
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || ''
        s[1] += '0'.repeat(prec - s[1].length)
    }
    return s.join(decPoint)
}
exports.default = numf
