class BookParser {
  constructor({
    fsHandler,
    rdfHandler,
    utils
  }) {
    this.fsHandler = fsHandler;
    this.rdfHandler = rdfHandler;
    this.utils = utils;
  }

  parseBooks(bookPaths) {
    return Promise.all(bookPaths.map(this._parseBook.bind(this)))
      .then(this._handleParsed.bind(this));
  }

  async _parseBook(bookPath) {
    const fileContent = await this.fsHandler.readFile(bookPath);
    const parsed = await this.rdfHandler.parseRdf(fileContent);
    return parsed;
  }

  async _handleParsed(books) {
    const bulkData = {
      books: [],
      authors: [],
      subjects: [],
      languages: []
    };

    books.forEach(parsed => {
      const details = parsed['rdf:RDF']['pgterms:ebook'][0];

      const id = details['$']['rdf:about'].match(/\d+/)[0];

      bulkData.books.push({
        id: id,
        title: details['dcterms:title']
          ? details['dcterms:title'][0] || ''
          : '',
        publication_date: details['dcterms:issued'][0]['_'],
        publisher: details['dcterms:publisher'][0],
        copyright: details['dcterms:rights'][0],
        license: parsed['rdf:RDF']['cc:Work'][0]['cc:license'][0]['$']['rdf:resource']
      });

      if (details['dcterms:subject']) {
        bulkData.subjects = bulkData.subjects.concat(
          this.utils.deepFlatten(details['dcterms:subject'], 'rdf:Description.rdf:value')
            .map(subject => ({
              bookId: id,
              subjectName: subject
            }))
        );
      }

      if (details['dcterms:creator']) {
        bulkData.authors = bulkData.authors.concat(
          this.utils.deepFlatten(details['dcterms:creator'], 'pgterms:agent.pgterms:name')
            .map(author => ({
              bookId: id,
              authorName: author
            }))
        );
      }

      if (details['dcterms:language']) {
        bulkData.languages = bulkData.languages.concat(
          this.utils.deepFlatten(details['dcterms:language'], 'rdf:Description.rdf:value._')
            .map(language => ({
              bookId: id,
              languageCode: language
            }))
        );
      }
    });

    return bulkData;
  }
}

module.exports = BookParser;