const { deepFlatten } = require('./utils')
const fsHandler = require('./fsHandler')
const rdfHandler = require('./rdfHandler')
  
exports.readBook = async function(filePath) {
  const fileContent = await fsHandler.readFile(filePath)
  const parsed = await rdfHandler.parseRdf(fileContent)
  const mapped = this._flattenRdfJSON(parsed)
  return mapped
}

exports._flattenRdfJSON = function(rdfJSON) {
  const details = rdfJSON['rdf:RDF']['pgterms:ebook'][0]

  const bookId = details['$']['rdf:about'].match(/\d+/)[0]
  const title = details['dcterms:title']
    ? details['dcterms:title'][0] || ''
    : ''
  /**
   * are there multiple publication dates for multiple issues?
   * have to inspect the data to know if it is worth mapping
   */
  const publicationDate = details['dcterms:issued'][0]['_']
  // *should* always be Project Gutenberg
  const publisher = details['dcterms:publisher'][0]
  const copyright = details['dcterms:rights'][0]
  // there does not appear to be multiple licenses, they are all Creative Commons
  const license = rdfJSON['rdf:RDF']['cc:Work'][0]['cc:license'][0]['$']['rdf:resource']
  /**
   * some of the subject names are a little arbitrary.
   * the bookshelf section is more precise, but it is not
   * the literal 'subject' matter. rather it is an
   * alternate form of grouping.
   */
  const subjects = details['dcterms:subject']
    ? deepFlatten(details['dcterms:subject'], 'rdf:Description.rdf:value')
    : []
  const authors = details['dcterms:creator']
    ? deepFlatten(details['dcterms:creator'], 'pgterms:agent.pgterms:name')
    : []
  const languages = details['dcterms:language']
    ? deepFlatten(details['dcterms:language'], 'rdf:Description.rdf:value._')
    : []

  return {
    bookId,
    title,
    subjects,
    authors,
    publicationDate,
    publisher,
    copyright,
    languages,
    license
  }
}
