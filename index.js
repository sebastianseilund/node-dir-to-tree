var fs = require('fs')

module.exports = dirToTree
function dirToTree() {
    throw new Error("This function does not exist. Use require('dir-to-tree').sync")
}

module.exports.sync = dirToTreeSync
function dirToTreeSync(baseDir, relativePath) {
    // Inside this function, prefer string concatenation to the slower path.join
    // https://github.com/joyent/node/pull/6929
    if (relativePath == null) {
        relativePath = ''
    }

    var node = {
        relativePath: relativePath,
        children: []
    }
    var entries = fs.readdirSync(baseDir + '/' + relativePath).sort()
    for (var i = 0; i < entries.length; i++) {
        var entryRelativePath = (relativePath ? relativePath + '/' : '') + entries[i]
        var stats = getStat(baseDir + '/' + entryRelativePath)

        if (stats && stats.isDirectory()) {
            node.children.push(dirToTreeSync(baseDir, entryRelativePath))
        } else {
            node.children.push({
                relativePath: entryRelativePath
            })
        }
    }
    return node
}

function getStat(path) {
    try {
        return fs.statSync(path)
    } catch(error) {
        if (error.code !== 'ENOENT') {
            throw error
        }
        return null
    }
}
