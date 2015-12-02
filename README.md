This repository is the namespace generator.

## Why ns-gen

When I develop a web component like react component, I always find the problems:

- The different component's css name conflicts, so they cannot live together.

- When one component dependent on some versions of the same component, these different versions of component can't exist simultaneously.

So sadly!

So I think out a method that make the component's css all wrapped in the namespace that cannot
appear in the other web package, thus can make the web component consistent with other component.

Also, for different versions of the same package, I want to use the different namespace to make
the different versions of package exist simultaneously.

So, this package is created to generate the namespace!

## How to use


### Install

Install this package as your dependency.

```sh
npm install ns-gen
```

### Generate the namespace

Then generate the unique namespace name.

```js
var generateNS = require('ns-gen').generateNS;
var namespace = generateNS(rootPath);
```

### Generate the namespace file

You also can generate the js file that the other js can require it.

```js
var fs = require('fs');
var generateNSFile = require('ns-gen').generateNSFile;
fs.writeFileSync('ns.js', generateNSFile());
```

Also can use `gulp` to write to the destination file.

```js
var source = require('vinyl-source-stream');
var vinylBuffer = require('vinyl-buffer');
var generateNSFile = require('ns-gen').generateNSFile;

gulp.task('generate-ns', () => {
  var stream = source('ns.js');
  stream.write(generateNSFile());
  stream.end();
  return stream.pipe(vinylBuffer()).pipe(gulp.dest('dist/'));
});
```

The namespace file will generate in the `dist/ns.js`.

Run this task, the `ns.js` may contain what like this.

```js
module.exports = "package-name-version-hash";
```

Other js file that want to be wrapped in this namespace, can require it.

```js
var ns = require('ns.js');
React.createClass({
  render() {
    return <div className={ns} />
  }
});
```
