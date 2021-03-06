# Carrot Remover

Forces all versions in your package json to be static. Removing `^` and `~`'s.

### Install:

```shell
npm i -g carrot-remover
```

### Usage: 

Run this command in your directory to remove all carrots from the package json

```shell
remove-carrots
```

### Example:

Before:

```json
{
  "name": "carrot-remover",
  "version": "0.1.0",
  "description": "Removes the carrots from your package json",
  "main": "dist/index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "compile": "babel --presets es2015,stage-0 -d lib/ src/",
    "prepublish": "npm run compile"
  },
  "author": "Kevin Upton",
  "license": "ISC",
  "preferGlobal": true,
  "devDependencies": {
    "babel-cli": "^6.0.0",
    "babel-preset-es2015": "^6.0.0",
    "babel-preset-stage-0": "^6.0.0"
  },
  "dependencies": {
    "node-cmd": "^3.0.0",
    "progress": "^2.0.0",
    "write": "^1.0.0"
  },
  "bin": {
    "remove-carrots": "bin/remove-carrots.js"
  }
}
```

After:
```json
{
  "name": "carrot-remover",
  "version": "0.1.0",
  "description": "Removes the carrots from your package json",
  "main": "dist/index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "compile": "babel --presets es2015,stage-0 -d lib/ src/",
    "prepublish": "npm run compile"
  },
  "author": "Kevin Upton",
  "license": "ISC",
  "preferGlobal": true,
  "devDependencies": {
    "babel-cli": "6.26.0",
    "babel-preset-es2015": "6.24.1",
    "babel-preset-stage-0": "6.24.1"
  },
  "dependencies": {
    "node-cmd": "3.0.0",
    "progress": "2.0.0",
    "write": "1.0.3"
  },
  "bin": {
    "remove-carrots": "bin/remove-carrots.js"
  }
}
```