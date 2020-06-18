module.exports = function(sequelize, DataTypes) {
  const model = sequelize.define('books_authors', {
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'books',
        key: 'id'
      },
      primaryKey: true
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'authors',
        key: 'id'
      },
      primaryKey: true
    }
  }, {
    tableName: 'books_authors'
  })

  return model
}
