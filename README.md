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

### Generate the namespace javascript file

You also can generate the js file that the other js can require it.

```js
var fs = require('fs');
var generateJsFile = require('ns-gen').generateJsFile;
fs.writeFileSync('ns.js', generateJsFile());
```

Also can use `gulp` to write to the destination file.

```js
var source = require('vinyl-source-stream');
var vinylBuffer = require('vinyl-buffer');
var generateJsFile = require('ns-gen').generateJsFile;

gulp.task('generate-ns', () => {
  var stream = source('ns.js');
  stream.write(generateJsFile());
  stream.end();
  return stream.pipe(vinylBuffer()).pipe(gulp.dest('dist/'));
});
```

The namespace file will be generated in the `dist/ns.js`.

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

Now the package's component will live in the unique namespace.

### Generate the sass file

The process of scss file generation is like the js file.

You can use the simple nodejs script to generate it.

```js
var fs = require('fs');
var generateSassFile = require('ns-gen').generateSassFile;
fs.writeFileSync('ns.sass', generateJsFile('css-ns'));
```

Or use the gulp task to generate it.

```js
gulp.task('generate-sass', () => {
  var generateSassFile = require('ns-gen').generateSassFile;
  var stream = source('ns.scss');
  stream.write(generateSassFile('css-ns'));
  stream.end();
  return stream.pipe(vinylBuffer()).pipe(gulp.dest('dist/'));
});
```

Then the generated sass file is like this:

```css
$css-ns: package-name-version-hash;
```

The sass file want to use the namespace can import it like this.

```css
@import "ns";
```

Now the component's style will wrap in this namespace to prevent the future conflict.

Awesome!
