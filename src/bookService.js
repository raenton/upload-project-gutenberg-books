
class BookService {

  constructor({ sequelize }) {
    this.sql = sequelize;
  }

  async bulkUpload(books) {
    const models = this.sql.models;
    const t = await this.sql.transaction();
    try {
      // mimics `INSERT IGNORE ...` (no errors for duplicates)
      const createOpts = {
        ignoreDuplicates: true
      };

      await models.books.bulkCreate(books.books, createOpts);

      await models.authors.bulkCreate(books.authors.map(a => ({
        name: a.authorName
      })), createOpts);
      
      await models.subjects.bulkCreate(books.subjects.map(s => ({
        name: s.subjectName
      })), createOpts);
      
      await models.languages.bulkCreate(books.languages.map(l => ({
        code: l.languageCode
      })), createOpts);

      // update relation tables
      await models.books_subjects.bulkCreate(books.subjects, createOpts);
      await models.books_languages.bulkCreate(books.languages, createOpts);
      await models.books_authors.bulkCreate(books.authors, createOpts);

      return t.commit();
    } catch (err) {
      console.error('[BookService] a problem occurred during upload. Rolling back.', err);
      return t.rollback();
    }
  }
}

module.exports = BookService;