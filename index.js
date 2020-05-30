// module.exports = require('require-dir')()
module.exports = {
    ansiColor: require('./src/ansiColor'),
    baseX: require('./src/baseX'),
    bufferFromDataURI: require('./src/bufferFromDataURI'),
    buildJwt: require('./src/buildJwt'),
    bytesToStr: require('./src/bytesToStr'),
    celsiusToKelvin: require('./src/celsiusToKelvin'),
    clamp: require('./src/clamp'),
    comparePassword: require('./src/comparePassword'),
    createCurrencyFormatter: require('./src/createCurrencyFormatter'),
    decodeHTMLEntities: require('./src/decodeHTMLEntities'),
    decomposeDataURI: require('./src/decomposeDataURI'),
    deepFreeze: require('./src/deepFreeze'),
    download: require('./src/download'),
    downloadProgress: require('./src/downloadProgress'),
    encodeHTMLEntities: require('./src/encodeHTMLEntities'),
    fetchJSONP: require('./src/fetchJSONP'),
    findPackageJson: require('./src/findPackageJson'),
    fixedDecimal: require('./src/fixedDecimal'),
    genBase62Uuidv1: require('./src/genBase62Uuidv1'),
    genBase62Uuidv4: require('./src/genBase62Uuidv4'),
    genUuidv1: require('./src/genUuidv1'),
    genUuidv4: require('./src/genUuidv4'),
    getClassName: require('./src/getClassName'),
    getEnvironment: require('./src/getEnvironment'),
    hashPassword: require('./src/hashPassword'),
    hashPasswordSync: require('./src/hashPasswordSync'),
    kelvinToCelsius: require('./src/kelvinToCelsius'),
    kmToMetersPerSec: require('./src/kmToMetersPerSec'),
    lazyTemplate: require('./src/lazyTemplate'),
    limitStringBy: require('./src/limitStringBy'),
    loadDotEnv: require('./src/loadDotEnv'),
    matchPattern: require('./src/matchPattern'),
    metersToKmPerHour: require('./src/metersToKmPerHour'),
    mkdirp: require('./src/mkdirp'),
    numf: require('./src/numf'),
    parseNumber: require('./src/parseNumber'),
    randomBase62: require('./src/randomBase62'),
    randomInRange: require('./src/randomInRange'),
    readFile: require('./src/readFile'),
    removeDiacritics: require('./src/removeDiacritics'),
    replaceHTMLTags: require('./src/replaceHTMLTags'),
    requireEnvVar: require('./src/requireEnvVar'),
    rimraf: require('./src/rimraf'),
    stringify: require('./src/stringify'),
    toCharEntity: require('./src/toCharEntity'),
    toImmutableProxy: require('./src/toImmutableProxy'),
    toUnicode: require('./src/toUnicode'),
    trimToLower: require('./src/trimToLower'),
    typify: require('./src/typify'),
    urlExtension: require('./src/urlExtension'),
    writeFile: require('./src/writeFile'),
}
