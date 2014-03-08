'use strict';

var argot = require('../lib/argot.js');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/


exports['Functions propogate through'] = {
  setUp: function(done) {
    done();
  },
  'no args': function(test) {
    test.expect(3);
    test.notEqual(argot.read, undefined, 'Read function required');
    test.notEqual(argot.loadDictionary, undefined, 'Load Dictionary function required');
    test.notEqual(argot.readMessage, undefined, 'Read Message function required');
    test.done();
  }
};
