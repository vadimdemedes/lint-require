# lint-require [![Circle CI](https://circleci.com/gh/vdemedes/lint-require.svg?style=svg)](https://circleci.com/gh/vdemedes/lint-require)

Report unused or missing dependencies, by scanning `require()` calls recursively.


### Installation

If you want to use just CLI:

```
$ npm install -g lint-require
```

If you want to use API:

```
$ npm install lint-require --save-dev
```


### CLI Usage

Specify path to a package.json as an argument.
If empty, lint-require assumes it's in a current directory.

```
$ lint-require

$ lint-require path/to/package.json
```


### API Usage

```javascript
const lint = require('lint-require');

let deps = lint('path/to/package.json');

/*
deps = {
  missing: ['koa', 'express'],
  unused: ['request']
}
*/
```


### Tests

[![Circle CI](https://circleci.com/gh/vdemedes/lint-require.svg?style=svg)](https://circleci.com/gh/vdemedes/lint-require)

```
$ make test
```


### License

lint-require is released under the MIT license.
