const path = require('path')
const sinonTest = require('sinon-test')
const sinon = require('sinon')
const test = sinonTest(sinon)
const fixtures = require('./fixtures')
const { expect } = require('chai')
const {
  BookParser,
  BookParserEvents
} = require('../src/BookParser')

describe('[BookService]', () => {

  it('constructs with dependencies', function() {
    const dependencies = {
      fsHandler: {},
      rdfHandler: {},
      utils: {}
    }
    const bookParser = new BookParser(dependencies)
    expect(bookParser.fsHandler).to.deep.equal(dependencies.fsHandler)
    expect(bookParser.rdfHandler).to.deep.equal(dependencies.rdfHandler)
    expect(bookParser.utils).to.deep.equal(dependencies.utils)
  })

  describe('parseBooks', function() {

    it('calls _parseBook for each bookPath provided', test(function(done) {
      const dependencies = {
        fsHandler: {},
        rdfHandler: {},
        utils: {}
      }
      const bookPaths = ['foo', 'bar', 'baz']
      const bookParser = new BookParser(dependencies)
      this.stub(bookParser, '_parseBook').resolves({})
      

      bookParser.parseBooks(bookPaths)
        .then(() => {
          for (let path of bookPaths) {
            sinon.assert.calledWith(bookParser._parseBook, path)
          }
          done()
        })
    }))

    it('emits a PARSED_BATCH event when all books have been parsed', test(function(done) {
      const dependencies = {
        fsHandler: {},
        rdfHandler: {},
        utils: {}
      }
      const bookPaths = ['foo', 'bar', 'baz']
      const bookParser = new BookParser(dependencies)
      this.stub(bookParser, '_parseBook').resolves({})
      this.stub(bookParser, 'emit')
      

      bookParser.parseBooks(bookPaths)
        .then(() => {
          sinon.assert.calledOnceWithExactly(bookParser.emit,
            BookParserEvents.PARSED_BATCH,
            [{}, {}, {}]
          )
          done()
        })
    }))

    it('should emit a properly parsed book from PARSED_BATCH event', test(function(done) {
      const dependencies = {
        fsHandler: {
          readFile: this.stub()
        },
        rdfHandler: {
          parseRdf: this.stub().returns(fixtures.rdfJSON)
        },
        utils: {
          deepFlatten: this.stub().returns(['flattened'])
        }
      }
      const bookParser = new BookParser(dependencies)

      const evtListener = (books) => {
        expect(books).to.deep.equal([{
          bookId: '1',
          title: 'The Declaration of Independence of the United States of America',
          subjects: [ 'flattened' ],
          authors: [ 'flattened' ],
          publicationDate: '1971-12-01',
          publisher: 'Project Gutenberg',
          copyright: 'Public domain in the USA.',
          languages: [ 'flattened' ],
          license: 'https://creativecommons.org/publicdomain/zero/1.0/'
        }])
        done()
      }
      bookParser.addListener(BookParserEvents.PARSED_BATCH, evtListener)
      bookParser.parseBooks(['foo'])
    }))

  })

})