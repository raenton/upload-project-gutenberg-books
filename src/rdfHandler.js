const util = require('util');
const { parseString } = require('xml2js');

const parseRdf = util.promisify(parseString);

module.exports = {
  parseRdf
};