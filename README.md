# node-dir-to-tree [![Build Status](https://travis-ci.org/sebastianseilund/node-dir-to-tree.svg?branch=master)](https://travis-ci.org/sebastianseilund/node-dir-to-tree)

Traverses a directory and returns a tree.

## Installation

```sh
npm install --save dir-to-tree
```


## Example

```js
var dirToTree = require('dir-to-tree');

dirToTreeSync.sync('some/dir');
```

Will return an object that looks like this:

```js
{
    relativePath: '',
    children: [
        {
            relativePath: 'app.js'
        },
        {
            relativePath: 'controllers',
            children: [
                {
                    relativePath: 'controllers/application.js'
                },
                {
                    relativePath: 'controllers/user.js'
                }
            ]
        },
        {
            relativePath: 'styles',
            children: [
                {
                    relativePath: 'styles/mixins',
                    children: [
                        {
                            relativePath: 'styles/mixins/_ellipsis.scss'
                        },
                        {
                            relativePath: 'styles/mixins/_rotate.scss'
                        }
                    ]
                },
                {
                    relativePath: 'styles/app.scss'
                }
            ]
        }
    ]
}
```

## Description

```js
dirToTree.sync(dirPath)
```

Returns a tree that represents `dirPath` and all it's descendants. All nodes
have a `relativePath` property which is the relative path of the node from
`dirPath`. The root's `relativePath` is an empty string.

Directories have a `children` array that contains all the files and directories
inside the directory. You can use this property to check whether a node is a
directory or not:

```js
if (node.children) {
    //Do thing with directory
} else {
    //Do thing with file
}
```


## Notes

* There intentionally isn't an asynchronous version. It's not clear that we
need or want one. Before sending a patch to add an async version, please share
your use case on the issue tracker.
