module.exports = (function(sequelize, DataTypes){
  return {
    authors: require('./authors')(sequelize, DataTypes),
    books: require('./books')(sequelize, DataTypes),
    languages: require('./languages')(sequelize, DataTypes),
    subjects: require('./subjects')(sequelize, DataTypes),
    books_authors: require('./books_authors')(sequelize, DataTypes),
    books_languages: require('./books_languages')(sequelize, DataTypes),
    books_subjects: require('./books_subjects')(sequelize, DataTypes)
  };
});
