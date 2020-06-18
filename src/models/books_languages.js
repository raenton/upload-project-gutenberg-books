module.exports = function(sequelize, DataTypes) {
  return sequelize.define('books_languages', {
    bookId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'books',
        key: 'id'
      }
    },
    languageCode: {
      type: DataTypes.CHAR(2),
      allowNull: false,
      references: {
        model: 'languages',
        key: 'code'
      }
    }
  }, {
    tableName: 'books_languages'
  })
}
