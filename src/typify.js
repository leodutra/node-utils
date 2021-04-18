const getClassName = require('./getClassName')

module.exports = function typify (any, { ownProperties = false, expandObj = true } = {}) {
  const t = getClassName(any)
  if (t === 'Object') {
      const result = {}
      for (const prop in any) {
          if (ownProperties && !Object.prototype.hasOwnProperty.call(any, prop)) {
              continue
          }
          const className = getClassName(any[prop])
          result[prop] = expandObj && className === 'Object'
            ? typify(any[prop], ownProperties)
            : className
      }
      return result
  }
  return t
}
