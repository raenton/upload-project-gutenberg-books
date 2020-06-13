const mongoose = require('mongoose')
const bookModel = require('./src/bookModel')
const path = require('path')
const fsHandler = require('./src/fsHandler')
const bookService = require('./src/bookService')

const booksDir = path.resolve(process.cwd(), 'cache/epub')
/**
 * NOTE: I would have had the function request and
 * unzip the books directly from Project Gutenberg, but for time-saving
 * reasons, it will work based off of the 'cache' folder from extraction
 * having been dragged into the root of the project.
 */

async function uploadBooks(rootFolder) {
  try {
    await mongoose.connect('mongodb://127.0.0.1:8080/default', {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    const folderPaths = await fsHandler.readDir(rootFolder)
    const bookPaths = folderPaths
      .filter(p => !isNaN(Number(p)))
      .map(p => path.resolve(rootFolder, p, `pg${p}.rdf`))
    
    for (let bookPath of bookPaths) {
      const book = await bookService.readBook(bookPath)
      const exists = await bookModel.exists({
        bookId: book.bookId
      })

      if (!exists) {
        await bookModel.create(book)
      }
    }
    mongoose.disconnect()
  } catch (err) {
    console.error(err)
  }
}

uploadBooks(booksDir)