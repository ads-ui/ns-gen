var assert = require('assert');
var generateNS = require('./index');

describe('generateNS', function() {
  it('should get the valid name', function () {
    var value = generateNS();
    console.log(value);
    assert.ok(/^ns-gen-0\.1\.0/.test(value));
  });
});
