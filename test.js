const test = require('brittle')
const { add } = require('./index.js')

test('add', t => {
  for (let i = 0; i < 50; i++) {
    const a = Math.floor(Math.random() * 100000000000000)
    const b = Math.floor(Math.random() * 100000000000000)
    const result = add(a.toString(), b.toString())
    t.is((a + b).toString(), result)
  }
})

test('add', t => {
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
})
