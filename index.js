var path = require('path');
var fs = require('fs');
var crypto = require('crypto');

function generateNS(packagePath) {
  if(!packagePath) packagePath = process.cwd();
  var jsonFilePath = path.resolve(packagePath, 'package.json');
  var content = fs.readFileSync(jsonFilePath, 'utf8');
  var shasum = crypto.createHash('sha256');
  shasum.update(content);
  var hashVal = shasum.digest('hex').slice(0, 6);
  var packageJson = JSON.parse(content);
  return packageJson.name + '-' + packageJson.version + '-' + hashVal;
}

module.exports = generateNS;
