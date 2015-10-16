var test = require('tap').test

test('json-preserve-indent', function (t) {
  ;[
    [0, false, ''],
    [2, false, ''],
    [4, false, '\n'],
    [1, true, '\n\n'],
    [2, true, '\n\n\n']
  ].forEach(test.apply.bind(scenario, t))

  t.end()
})

function scenario (amount, tabs, ending) {
  this.test(amount + ' x ' + (tabs ? 'tab' : 'space') + ', ' + ending.length + ' x newline', function (tt) {
    var indent = tabs ? Array(amount + 1).join('\t') : amount
    var input = {
      foo: 'bar',
      bar: {
        foo: 'bar'
      },
      baz: [1, 2, 3]
    }

    var data = require('.')(JSON.stringify(input, null, indent) + ending)

    tt.is(data.get('foo'), 'bar', '#get - retrieve property')
    tt.is(data.get('bar.foo'), 'bar', '#get - retrieve property from child object')
    tt.is(data.get('baz[0]'), 1, '#get - retrieve entry from child array')

    data.set('foo', 'abc')
    data.set('bar.foo', 'def')
    data.set('baz[0]', 10)

    tt.is(data.get('foo'), 'abc', '#set - change property')
    tt.is(data.get('bar.foo'), 'def', '#set - change property of child object')
    tt.is(data.get('baz[0]'), 10, '#set - change entry of child array')

    tt.equals(data.format(), JSON.stringify({
      foo: 'abc',
      bar: {
        foo: 'def'
      },
      baz: [10, 2, 3]
    }, null, indent) + ending, '#format - preserve indentation and file ending')

    tt.end()
  })
}
