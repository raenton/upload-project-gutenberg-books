const bookService = require('../src/bookService')
const fsHandler = require('../src/fsHandler')
const rdfHandler = require('../src/rdfHandler')
const sinonTest = require('sinon-test')
const sinon = require('sinon')
const test = sinonTest(sinon)
const fixtures = require('./fixtures')
const { expect } = require('chai')

describe('[bookService]', () => {
  
  describe('readBook', () => {
    
    it('reads a book from the filePath argument', test(function(done) {
      this.stub(fsHandler, 'readFile')
      this.stub(rdfHandler, 'parseRdf')
      this.stub(bookService, '_flattenRdfJSON')

      bookService.readBook('file_path').then(() => {
        sinon.assert.calledOnceWithExactly(fsHandler.readFile, 'file_path')
        done()
      })
    }))

    it('parses rdf as a result of the file read', test(function(done) {
      this.stub(fsHandler, 'readFile').returns('arg')
      this.stub(rdfHandler, 'parseRdf')
      this.stub(bookService, '_flattenRdfJSON')

      bookService.readBook('file_path').then(() => {
        sinon.assert.calledOnceWithExactly(rdfHandler.parseRdf, 'arg')
        done()
      })
    }))

    it('flattens the rdf result', test(function(done) {
      this.stub(fsHandler, 'readFile')
      this.stub(rdfHandler, 'parseRdf').returns('arg')
      this.stub(bookService, '_flattenRdfJSON')
  
      bookService.readBook('file_path').then(() => {
        sinon.assert.calledOnceWithExactly(bookService._flattenRdfJSON, 'arg')
        done()
      })
    }))

    it('returns flattened rdf fields into acceptable book json', test(function(done) {
      this.stub(fsHandler, 'readFile')
      this.stub(rdfHandler, 'parseRdf').returns(fixtures.rdfJSON)
  
      bookService.readBook('file_path').then((result) => {
        expect(result).to.deep.equal({
          bookId: '1',
          title: 'The Declaration of Independence of the United States of America',
          subjects: [
            'JK',
            'United States. Declaration of Independence',
            'United States -- History -- Revolution, 1775-1783 -- Sources',
            'E201'
          ],
          authors: [ 'Jefferson, Thomas' ],
          publicationDate: '1971-12-01',
          publisher: 'Project Gutenberg',
          copyright: 'Public domain in the USA.',
          languages: [ 'en' ],
          license: 'https://creativecommons.org/publicdomain/zero/1.0/'
        })
        done()
      })
    }))

  })

  // describe('_flattenRdfJSON', test(function(done) {

  //   it('maps rdf fields into acceptable book json'. test(function(done) {
  //     bookService._flattenRdfJSON
  //     done()
  //   }))

  // }))

})