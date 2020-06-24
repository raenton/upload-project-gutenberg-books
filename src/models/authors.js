module.exports = function(sequelize, DataTypes) {
  return sequelize.define('authors', {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      primaryKey: true
    }
  }, {
    tableName: 'authors'
  });
};
