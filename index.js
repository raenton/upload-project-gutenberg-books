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

    const folderPaths = await fsHandler.readDir(rootFolder)
    const bookPaths = folderPaths
      .filter(p => !isNaN(Number(p)))
      .map(p => path.resolve(rootFolder, p, `pg${p}.rdf`))
    
    // books are process one at a time so as not to flood memory.
    // in place of this, a mechanism could be set up so as to responsibly
    // incur more promises.
    for (let bookPath of bookPaths) {
      const book = await bookService.readBook(bookPath)
      
    }
  } catch (err) {
    console.error('Something really bad happened', err)
  }
}

console.time()
uploadBooks(booksDir).then(() => {
  console.timeEnd()
  process.stdout.write('[*** Done ***] You should now have around 60k records in your database\n')
})