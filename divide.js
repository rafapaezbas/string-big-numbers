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
      dividing = dividing + a.shift()
      if (less(dividing, b_)) result.push('0')
      if (a.length === 0 && less(dividing, b_)) return result.join('')
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

  return result.join('')
}

module.exports = {
  divide
}
