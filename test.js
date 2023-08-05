const test = require('brittle')
const add = require('./add.js')
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
  t.is(greater('1.2', '1.10'), true)
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
  for (let i = 0; i < 50; i++) {
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
