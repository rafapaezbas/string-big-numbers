function equals (a_, b_) {
  if (typeof a_ !== 'string' || typeof b_ !== 'string') throw Error('Invalid format')

  if (a_ === b_) return true

  let c_ = a_.split('.')[1]
  let d_ = b_.split('.')[1]

  a_ = a_.split('.')[0]
  b_ = b_.split('.')[0]

  a_ = a_.split('').map(e => parseInt(e))
  b_ = b_.split('').map(e => parseInt(e))

  while (b_.length < a_.length) {
    b_.unshift(0)
  }

  while (a_.length < b_.length) {
    a_.unshift(0)
  }

  for (let i = 0; i < a_.length; i++) {
    if (a_[i] !== b_[i]) return false
  }

  if (!c_ && !d_) {
    return true
  } else {
    if (!c_) c_ = '0'
    if (!d_) d_ = '0'
    c_ = c_.split('').map(e => parseInt(e))
    d_ = d_.split('').map(e => parseInt(e))
    const c = c_.length >= d_.length ? c_ : d_
    const d = c_.length >= d_.length ? d_ : c_

    while (d.length < c.length) {
      d.push(0)
    }

    while (c.length < d.length) {
      c.push(0)
    }

    for (let i = 0; i < c.length; i++) {
      if (c[i] !== d[i]) return false
    }

    return true
  }
}

function greater (a_, b_) {
  if (typeof a_ !== 'string' || typeof b_ !== 'string') throw Error('Invalid format')

  let c_ = a_.split('.')[1]
  let d_ = b_.split('.')[1]

  a_ = a_.split('.')[0]
  b_ = b_.split('.')[0]

  a_ = a_.split('').map(e => parseInt(e))
  b_ = b_.split('').map(e => parseInt(e))

  while (b_.length < a_.length) {
    b_.unshift(0)
  }

  while (a_.length < b_.length) {
    a_.unshift(0)
  }

  for (let i = 0; i < a_.length; i++) {
    if (a_[i] > b_[i]) return true
    if (a_[i] < b_[i]) return false
  }

  if (!c_ && !d_) {
    return false
  } else {
    if (!c_) c_ = '0'
    if (!d_) d_ = '0'

    c_ = c_.split('').map(e => parseInt(e))
    d_ = d_.split('').map(e => parseInt(e))

    while (d_.length < c_.length) {
      d_.push(0)
    }
    while (c_.length < d_.length) {
      c_.push(0)
    }

    for (let i = 0; i < c_.length; i++) {
      if (c_[i] > d_[i]) return true
      if (c_[i] < d_[i]) return false
    }

    return false
  }
}

function less (a_, b_) {
  return !(greater(a_, b_) || equals(a_, b_))
}

module.exports = {
  greater,
  less,
  equals
}
