module.exports = function(sequelize, DataTypes) {
  return sequelize.define('books_subjects', {
    bookId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'books',
        key: 'id'
      }
    },
    subjectName: {
      type: DataTypes.STRING(255),
      allowNull: false,
      references: {
        model: 'subjects',
        key: 'name'
      }
    }
  }, {
    tableName: 'books_subjects'
  })
}
