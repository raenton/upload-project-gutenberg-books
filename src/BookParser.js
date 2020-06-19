const { EventEmitter } = require('events')

const BookParserEvents = {
  PARSED_BATCH: 'PARSED_BATCH'
}

class BookParser extends EventEmitter {
  constructor({
    fsHandler,
    rdfHandler,
    utils
  }) {
    super()
    this.fsHandler = fsHandler
    this.rdfHandler = rdfHandler
    this.utils = utils
  }

  parseBooks(bookPaths) {
    return Promise.all(bookPaths.map(this._parseBook.bind(this)))
      .then(books => {
        this.emit(BookParserEvents.PARSED_BATCH, books)
      })
  }

  async _parseBook(bookPath) {
    const fileContent = await this.fsHandler.readFile(bookPath)
    const parsed = await this.rdfHandler.parseRdf(fileContent)
    return this._flattenRdfJSON(parsed)
  }

  _flattenRdfJSON(rdfJSON) {
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
      ? this.utils.deepFlatten(details['dcterms:subject'], 'rdf:Description.rdf:value')
      : []
    const authors = details['dcterms:creator']
      ? this.utils.deepFlatten(details['dcterms:creator'], 'pgterms:agent.pgterms:name')
      : []
    const languages = details['dcterms:language']
      ? this.utils.deepFlatten(details['dcterms:language'], 'rdf:Description.rdf:value._')
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
}

module.exports = {
  BookParser,
  BookParserEvents
}