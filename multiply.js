const { equals } = require('./compare.js')
const add = require('./add.js')

function multiply (a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') throw Error('Invalid format')

  if (equals(a, '0') || equals(b, '0')) return '0'

  let counter = '1'
  let result = a
  while (!(equals(counter, b))) {
    result = add(result, a)
    counter = add(counter, '1')
  }
  return result
}

module.exports = {
  multiply
}
