function add (a_, b_) {
  if (typeof a_ !== 'string' || typeof b_ !== 'string') throw Error('Invalid format')

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

    const c = c_.length >= d_.length ? c_ : d_
    const d = c_.length >= d_.length ? d_ : c_

    decimal = add_decimal(c, d)

    return add(add_int(a, b), decimal.integer) + '.' + decimal.decimal
  }

  return add_int(a, b)
}

function add_int (a, b) {
  const result = []
  let takeover = 0

  for (let i = 0; i < a.length; i++) {
    const ai = a.length - 1 - i
    const bi = b.length - 1 - i
    if (b[bi] === undefined) {
      result.unshift(a[ai] + takeover)
      takeover = 0
    } else {
      const addition = a[ai] + b[bi] + takeover
      if (addition < 10) {
        result.unshift(addition)
        takeover = 0
      } else {
        result.unshift(addition % 10)
        takeover = 1
      }

      if (i === a.length - 1 && takeover) result.unshift(1)
    }
  }

  return result.map(e => e.toString()).join('')
}

function add_decimal (a, b) {
  const result = []
  let takeover = 0
  let integer = '0'

  // a must be allways longer or equal
  while (b.length !== a.length) {
    b.push(0)
  }

  for (let i = 0; i < a.length; i++) {
    const ai = a.length - 1 - i
    const bi = b.length - 1 - i
    if (b[bi] === undefined) {
      result.unshift(a[ai] + takeover)
      takeover = 0
    } else {
      const addition = a[ai] + b[bi] + takeover
      if (addition < 10) {
        result.unshift(addition)
        takeover = 0
      } else {
        result.unshift(addition % 10)
        takeover = 1
        if (i === a.length - 1) integer = '1'
      }
    }
  }

  return { decimal: result.map(e => e.toString()).join(''), integer }
}

module.exports = {
  add
}
