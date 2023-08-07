const { equals, greater, less } = require('./compare.js')
const { multiply } = require('./multiply.js')
const { substract } = require('./substract.js')

function divide (a_, b_, precision = -1) {
  if (typeof a_ !== 'string' || typeof b_ !== 'string') throw Error('Invalid format')
  if (equals(b_, '0')) throw Error('division by 0')

  const a = a_.split('')

  const result = []

  let dividing = '0'
  while (true) {
    while (greater(b_, dividing)) {
      if (a.length) dividing = dividing + a.shift()
      if (less(dividing, b_)) result.push('0')
      if (a.length === 0 && less(dividing, b_) && precision === 0) return result.join('')
      if (a.length === 0 && less(dividing, b_) && precision !== 0) break
    }
    for (let i = 1; i < 10; i++) {
      if (less(substract(dividing, multiply(b_, i.toString())), b_)) {
        result.push(i.toString())
        dividing = substract(dividing, multiply(b_, i.toString()))
        break
      }
    }
    if (a.length === 0) break
  }

  if ((precision === -1 || precision > 0) && greater(dividing, '0')) {
    const decimal = []
    result.push('.')

    while (true) {
      while (less(dividing, b_)) {
        dividing += '0'
        if (less(dividing, b_)) decimal.push('0')
      }

      for (let i = 1; i < 10; i++) {
        if (less(substract(dividing, multiply(b_, i.toString())), b_)) {
          decimal.push(i.toString())
          dividing = substract(dividing, multiply(b_, i.toString()))
          break
        }
      }
      if (equals(dividing, '0') || (decimal.length >= precision && precision !== -1)) return result.concat(decimal).join('')
    }
  }

  return result.join('')
}

module.exports = {
  divide
}
