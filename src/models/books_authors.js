module.exports = function(sequelize, DataTypes) {
  return sequelize.define('books_authors', {
    bookId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'books',
        key: 'id'
      }
    },
    authorId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'authors',
        key: 'id'
      }
    }
  }, {
    tableName: 'books_authors'
  })
}
