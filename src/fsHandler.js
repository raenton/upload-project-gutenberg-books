const fs = require('fs')
const util = require('util')

/**
 * at the moment this module just promisifies native fs module
 * methods, but it could also act as a wrapper for other purposes.
 * (complex file ops and so on)
 */
const readFile = util.promisify(fs.readFile)
const readDir = util.promisify(fs.readdir)

module.exports = {
  readFile,
  readDir
}
