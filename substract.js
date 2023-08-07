const { equals } = require('./compare.js')

function substract (a_, b_) {
  if (typeof a_ !== 'string' || typeof b_ !== 'string') throw Error('Invalid format')

  if (equals(a_, b_)) return '0'

  let c_ = a_.split('.')[1]
  let d_ = b_.split('.')[1]

  a_ = a_.split('.')[0]
  b_ = b_.split('.')[0]

  a_ = a_.split('').map(e => parseInt(e))
  b_ = b_.split('').map(e => parseInt(e))

  const a = a_.length >= b_.length ? a_ : b_
  const b = a_.length >= b_.length ? b_ : a_

  let decimal
  if (c_ || d_) {
    if (!c_) c_ = '0'
    if (!d_) d_ = '0'
    c_ = c_.split('').map(e => parseInt(e))
    d_ = d_.split('').map(e => parseInt(e))

    decimal = substract_decimal(c_, d_)

    return substract(substract_int(a, b), decimal.integer) + '.' + decimal.decimal
  }

  return substract_int(a, b)
}

function substract_int (a, b) {
  const result = []
  let takeover = 0

  while (a.length < b.length) {
    a.unshift(0)
  }

  while (b.length < a.length) {
    b.unshift(0)
  }

  for (let i = 0; i < a.length; i++) {
    const ai = a.length - 1 - i
    const bi = b.length - 1 - i
    if (b[bi] === undefined) {
      result.unshift(a[ai] - takeover)
      takeover = 0
    } else {
      if (a[ai] < b[bi]) {
        result.unshift(a[ai] + 10 - b[bi] - takeover)
        takeover = 1
      } else if (a[ai] === b[bi] && takeover === 1) {
        result.unshift(9)
        takeover = 1
      } else {
        result.unshift(a[ai] - b[bi] - takeover)
        takeover = 0
      }
    }
  }

  return result.map(e => e.toString()).join('')
}

function substract_decimal (a, b) {
  const result = []
  let takeover = 0

  while (a.length < b.length) {
    a.push(0)
  }

  while (b.length < a.length) {
    b.push(0)
  }

  for (let i = 0; i < a.length; i++) {
    const ai = a.length - 1 - i
    const bi = b.length - 1 - i
    if (b[bi] === undefined) {
      result.unshift(a[ai] - takeover)
      takeover = 0
    } else {
      if (a[ai] < b[bi]) {
        result.unshift(a[ai] + 10 - b[bi] - takeover)
        takeover = 1
      } else if (a[ai] === b[bi] && takeover === 1) {
        result.unshift(9)
        takeover = 1
      } else {
        result.unshift(a[ai] - b[bi] - takeover)
        takeover = 0
      }
    }
  }

  return { decimal: result.map(e => e.toString()).join(''), integer: takeover.toString() }
}

module.exports = {
  substract
}
