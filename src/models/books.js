module.exports = function(sequelize, DataTypes) {
  return sequelize.define('books', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    copyright: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    license: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    publication_date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  }, {
    tableName: 'books'
  })
}
