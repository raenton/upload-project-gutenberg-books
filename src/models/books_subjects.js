module.exports = function(sequelize, DataTypes) {
  return sequelize.define('books_subjects', {
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'books',
        key: 'id'
      },
      primaryKey: true
    },
    subjectName: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'subjects',
        key: 'name'
      },
      primaryKey: true
    }
  }, {
    tableName: 'books_subjects'
  });
};
