module.exports = function(sequelize, DataTypes) {
  return sequelize.define('subjects', {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'subjects'
  });
};
