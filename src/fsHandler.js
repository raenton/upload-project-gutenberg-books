const fs = require('fs');
const gracefulFs = require('graceful-fs');
const util = require('util');

gracefulFs.gracefulify(fs);

/**
 * at the moment this module just promisifies native fs module
 * methods, but it could also act as a wrapper for other purposes.
 * (complex file ops and so on)
 */
const readFile = util.promisify(fs.readFile);
const readDir = util.promisify(fs.readdir);

module.exports = {
  readFile,
  readDir
};
