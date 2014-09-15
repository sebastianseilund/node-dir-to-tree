var rimraf = require('rimraf'),
    fs = require('fs'),
    path = require('path'),
    mkdirp = require('mkdirp'),
    dirToTree = require('../index'),
    assert = require('assert')

describe('dirToTree.sync', function() {
    var subject

    describe('with empty directory', function() {
        before(function() {
            mkdirp.sync('tmp');

            subject = dirToTree.sync('tmp')
        })

        after(function() {
            rimraf.sync('tmp');
        })

        it('returns a single object', function() {
            assert.equal(subject.relativePath, '')
            assert.deepEqual(subject.children, [])
        })
    })

    describe('with nested directories', function() {
        before(function() {
            writeFile('tmp/index.js')
            writeFile('tmp/app/app.js')
            writeFile('tmp/app/controllers/application.js')
            writeFile('tmp/app/controllers/user.js')
            writeFile('tmp/app/styles/mixins/_rotate.scss')
            writeFile('tmp/app/styles/mixins/_ellipsis.scss')
            writeFile('tmp/app/styles/app.scss')

            subject = dirToTree.sync('tmp')
        })

        after(function() {
            rimraf.sync('tmp');
        })

        it('returns tree', function() {
            var expected = {
                relativePath: '',
                children: [
                    {
                        relativePath: 'app',
                        children: [
                            {
                                relativePath: 'app/app.js'
                            },
                            {
                                relativePath: 'app/controllers',
                                children: [
                                    {
                                        relativePath: 'app/controllers/application.js'
                                    },
                                    {
                                        relativePath: 'app/controllers/user.js'
                                    }
                                ]
                            },
                            {
                                relativePath: 'app/styles',
                                children: [
                                    {
                                        relativePath: 'app/styles/app.scss'
                                    },
                                    {
                                        relativePath: 'app/styles/mixins',
                                        children: [
                                            {
                                                relativePath: 'app/styles/mixins/_ellipsis.scss'
                                            },
                                            {
                                                relativePath: 'app/styles/mixins/_rotate.scss'
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        relativePath: 'index.js'
                    }
                ]
            }
            assert.deepEqual(subject, expected)
        })
    })
})

function writeFile(file) {
    mkdirp.sync(path.dirname(file))
    fs.writeFile(file, '...')
}
