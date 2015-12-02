var assert = require('assert');
var generateNS = require('./index').generateNS;
var generateNSFile = require('./index').generateNSFile;

describe('generateNS', function() {
  it('should get the valid name', function () {
    var value = generateNS();
    console.log(value);
    assert.ok(/^ns-gen-0\.1\.0/.test(value));
  });

  it('should generate the valid file content', function() {
    var value = generateNS();
    var content = generateNSFile();
    assert.equal('module.exports = "' + value + '";', content);
  });
});
