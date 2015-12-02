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

Install this package as your dependency.

```sh
npm install ns-gen
```

Then generate the unique namespace name.

```js
var generateNS = require('ns-gen');
var namespace = generateNS(rootPath);
```
