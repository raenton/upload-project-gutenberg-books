const {
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DBNAME,
  MYSQL_USER,
  MYSQL_PASS,
  BOOKS_DIRECTORY
} = require('./src/config');
const path = require('path');
const utils = require('./src/utils');
const fsHandler = require('./src/fsHandler');
const rdfHandler = require('./src/rdfHandler');
const { Sequelize, DataTypes } = require('sequelize');
const BookParser = require('./src/BookParser');
const BookService = require('./src/BookService');

const booksDir = path.resolve(process.cwd(), BOOKS_DIRECTORY);

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: MYSQL_HOST,
  port: MYSQL_PORT,
  database: MYSQL_DBNAME,
  username: MYSQL_USER,
  password: MYSQL_PASS,
  define: {
    timestamps: false,
    charset: 'utf8mb4' // allows accented characters
  },
  logging: false
});
require('./src/models')(sequelize, DataTypes);

const bookService = new BookService({ sequelize });
const bookParser = new BookParser({
  fsHandler,
  rdfHandler,
  utils
});

async function uploadBooks(rootFolder) {
  try {
    // verify the connection before we begin
    await sequelize.authenticate();

    const folderPaths = await fsHandler.readDir(rootFolder);
    const bookPaths = folderPaths
      .filter(p => !isNaN(Number(p)))
      .map(p => path.resolve(rootFolder, p, `pg${p}.rdf`));
    
    const processBooks = (bookPaths, offset, limit) => {
      const max = bookPaths.length - 1;
      const start = offset;
      let end = (offset + limit) - 1;
      if (end > max) {
        end = max;
      }

      console.log(`Parsing chunk: ${start + 1} to ${end + 1} of ${bookPaths.length}`);

      const chunk = bookPaths.slice(start, end);
      bookParser.parseBooks(chunk)
        .then(parsed => {
          bookService.bulkUpload(parsed).then(() => {
            if (end < max) {
              processBooks(bookPaths, end + 1, limit);
            }
          });
        });
    };
    processBooks(bookPaths, 0, 500);
  } catch (err) {
    console.error(err);
  }
}

console.time();
uploadBooks(booksDir);

process.on('exit', () => {
  console.timeEnd();
});