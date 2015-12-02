var assert = require('assert');
var generateNS = require('./index').generateNS;
var generateJsFile = require('./index').generateJsFile;
var generateSassFile = require('./index').generateSassFile;

describe('generateNS', function() {
  it('should get the valid name', function () {
    var value = generateNS();
    console.log(value);
    assert.ok(/^ns-gen-0\.3\.0/.test(value));
  });

  it('should generate the valid file content', function() {
    var value = generateNS();
    var content = generateJsFile();
    assert.equal('module.exports = "' + value + '";', content);
  });

  it('should generate the valid sass file content', function() {
    var value = generateNS();
    var content = generateSassFile('test');
    console.log(content);
    assert.equal('$test: ' + value + ';', content);
  });
});
