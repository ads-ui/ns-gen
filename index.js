var path = require('path');
var fs = require('fs');
var crypto = require('crypto');

// replace all the character that isn't word or '-' to '-' character.
function convertName(name) {
  return name.replace(/[^\w-]+/g, '-');
}

function generateNS(packagePath) {
  if(!packagePath) packagePath = process.cwd();
  var jsonFilePath = path.resolve(packagePath, 'package.json');
  var content = fs.readFileSync(jsonFilePath, 'utf8');
  var shasum = crypto.createHash('sha256');
  shasum.update(content);
  var hashVal = shasum.digest('hex').slice(0, 6);
  var packageJson = JSON.parse(content);
  return convertName(packageJson.name + '-' + packageJson.version + '-' + hashVal);
}

function generateJsFile(packagePath) {
  var ns = generateNS(packagePath);
  return "module.exports = \"" + ns + "\";";
}

function generateSassFile(packagePath, nsVarName) {
  if(arguments.length === 1) {
    nsVarName = packagePath;
    packagePath = null;
  }
  if(!nsVarName) throw new Error('the nsVarName parameter isnot valid');
  var ns = generateNS(packagePath);
  return '$' + nsVarName + ': ' + ns + ';';
}

module.exports = {
  generateNS: generateNS,
  generateJsFile: generateJsFile,
  generateSassFile: generateSassFile
};
