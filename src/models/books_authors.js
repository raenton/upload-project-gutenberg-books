module.exports = function(sequelize, DataTypes) {
  return sequelize.define('books_authors', {
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'books',
        key: 'id'
      },
      primaryKey: true
    },
    authorName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: 'authors',
        key: 'name'
      },
      primaryKey: true
    }
  }, {
    tableName: 'books_authors'
  });
};
