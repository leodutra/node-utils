function ansiColor (codes, input) {
    return '\u001b[' + codes[0] + 'm' +
        input +
        '\u001b[' + codes[1] + 'm'
}

module.exports = ansiColor

ansiColor.black = curryAnsiColor([0, 0])
ansiColor.red = curryAnsiColor([31, 39])
ansiColor.green = curryAnsiColor([32, 39])
ansiColor.yellow = curryAnsiColor([33, 39])
ansiColor.blue = curryAnsiColor([34, 39])
ansiColor.magenta = curryAnsiColor([35, 39])
ansiColor.cyan = curryAnsiColor([36, 39])
ansiColor.white = curryAnsiColor([37, 39])
ansiColor.gray = curryAnsiColor([90, 39])
ansiColor.grey = curryAnsiColor([90, 39])
ansiColor.bgBlack = curryAnsiColor([40, 49])
ansiColor.bgRed = curryAnsiColor([41, 49])
ansiColor.bgGreen = curryAnsiColor([42, 49])
ansiColor.bgYellow = curryAnsiColor([43, 49])
ansiColor.bgBlue = curryAnsiColor([44, 49])
ansiColor.bgMagenta = curryAnsiColor([45, 49])
ansiColor.bgCyan = curryAnsiColor([46, 49])
ansiColor.bgWhite = curryAnsiColor([47, 49])
ansiColor.blackBright = curryAnsiColor([90, 39])
ansiColor.redBright = curryAnsiColor([91, 39])
ansiColor.greenBright = curryAnsiColor([92, 39])
ansiColor.yellowBright = curryAnsiColor([93, 39])
ansiColor.blueBright = curryAnsiColor([94, 39])
ansiColor.magentaBright = curryAnsiColor([95, 39])
ansiColor.cyanBright = curryAnsiColor([96, 39])
ansiColor.whiteBright = curryAnsiColor([97, 39])
ansiColor.bgBlackBright = curryAnsiColor([100, 49])
ansiColor.bgRedBright = curryAnsiColor([101, 49])
ansiColor.bgGreenBright = curryAnsiColor([102, 49])
ansiColor.bgYellowBright = curryAnsiColor([103, 49])
ansiColor.bgBlueBright = curryAnsiColor([104, 49])
ansiColor.bgMagentaBright = curryAnsiColor([105, 49])
ansiColor.bgCyanBright = curryAnsiColor([106, 49])
ansiColor.bgWhiteBright = curryAnsiColor([107, 49])

function curryAnsiColor (codes) {
    return input => ansiColor(codes, input)
}
