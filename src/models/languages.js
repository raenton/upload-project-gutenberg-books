module.exports = function(sequelize, DataTypes) {
  return sequelize.define('languages', {
    code: {
      type: DataTypes.CHAR(2),
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'languages'
  });
};
