const test = require('brittle')
const add = require('./add.js')
const { substract } = require('./substract.js')
const { multiply } = require('./multiply.js')
const { equals, greater, less } = require('./compare.js')

test('equals', (t) => {
  t.is(equals('1', '1'), true)
  t.is(equals('1.0', '1'), true)
  t.is(equals('1', '1.0'), true)
  t.is(equals('1.01', '1'), false)
  t.is(equals('1', '1.01'), false)
  t.is(equals('01', '1'), true)
  t.is(equals('001', '1'), true)
  t.is(equals('1', '001'), true)
  t.is(equals('101', '1'), false)
  t.is(equals('1', '101'), false)
  t.is(equals('1', '01'), true)
  t.is(equals('2', '1'), false)
  t.is(equals('1', '2'), false)
  t.is(equals('2', '01'), false)
  t.is(equals('01', '2'), false)
  t.is(equals('1.10', '1.1'), true)
  t.is(equals('1.1', '1.10'), true)
})

test('greater', (t) => {
  t.is(greater('1', '1'), false)
  t.is(greater('2', '1'), true)
  t.is(greater('0', '1'), false)
  t.is(greater('10', '1'), true)
  t.is(greater('1.1', '1'), true)
  t.is(greater('1.11', '1.10'), true)
  t.is(greater('1.10', '1.11'), false)
  t.is(greater('1.2', '1.10'), true)
  t.is(greater('2', '110'), false)
  t.is(greater('110', '2'), true)
})

test('less', (t) => {
  t.is(less('1', '1'), false)
  t.is(less('2', '1'), false)
  t.is(less('0', '1'), true)
  t.is(less('10', '1'), false)
  t.is(less('1.1', '1'), false)
  t.is(less('1.11', '1.10'), false)
  t.is(less('1.2', '1.10'), false)
  t.is(less('1.1', '1.20'), true)
})

test('add integer', t => {
  for (let i = 0; i < 10; i++) {
    const a = Math.floor(Math.random() * 100000000000000)
    const b = Math.floor(Math.random() * 100000000000000)
    const result = add(a.toString(), b.toString())
    t.is((a + b).toString(), result)
  }
})

test('add float', t => {
  {
    const result = add('1.1', '1.1')
    t.is(result, '2.2')
  }
  {
    const result = add('1.1', '1')
    t.is(result, '2.1')
  }
  {
    const result = add('1.9', '1.1')
    t.is(result, '3.0')
  }
  {
    const result = add('1.91', '1.1')
    t.is(result, '3.01')
  }
})

test('subtract integer', t => {
  for (let i = 0; i < 10; i++) {
    const a = Math.floor(Math.random() * 100000000000000)
    let diff = Math.floor(Math.random() * 100000000000000)
    while (diff >= a) {
      diff = Math.floor(Math.random() * 100000000000000)
    }
    const b = a - diff
    const result = substract(a.toString(), b.toString())
    t.ok(equals(diff.toString(), result))
  }
})

test('substract float', t => {
  {
    const result = substract('1.1', '1.1')
    t.ok(equals(result, '0.0'))
  }
  {
    const result = substract('1.1', '1')
    t.is(result, '0.1')
  }
  {
    const result = substract('1.9', '1.1')
    t.is(result, '0.8')
  }
  {
    const result = substract('1.91', '1.1')
    t.is(result, '0.81')
  }
  {
    const result = substract('1.9', '1.001')
    t.is(result, '0.899')
  }
})

test('fibbonacci', (t) => {
  let a = '1'
  let b = '1'

  const result = []

  while (less(a, '200')) {
    const next = add(a, b)
    b = a
    a = next
    result.push(next)
  }

  t.alike(result, ['2', '3', '5', '8', '13', '21', '34', '55', '89', '144', '233'])
})

test('multiply', (t) => {
  for (let i = 0; i < 10; i++) {
    const a = Math.floor(Math.random() * 1000)
    const b = Math.floor(Math.random() * 1000)
    const result = multiply(a.toString(), b.toString())
    t.is((a * b).toString(), result)
  }
})

