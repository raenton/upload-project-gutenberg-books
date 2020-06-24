module.exports = function(sequelize, DataTypes) {
  return sequelize.define('books_languages', {
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'books',
        key: 'id'
      },
      primaryKey: true
    },
    languageCode: {
      type: DataTypes.CHAR(2),
      allowNull: false,
      references: {
        model: 'languages',
        key: 'code'
      },
      primaryKey: true
    }
  }, {
    tableName: 'books_languages'
  });
};
