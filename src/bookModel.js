const mongoose = require('mongoose')

const BookSchema = mongoose.Schema({
  bookId: {
    type: String,
    unique: true,
    index: true
  },
  title: {
    type: String,
    index: true
  },
  subjects: [{
    type: String
  }],
  authors: [{
    type: String,
    index: true
  }],
  publicationDate: { type: Date },
  publisher: { type: String },
  copyright: { type: String },
  languages: [{ type: String }],
  license: { type: String }
})

const BookModel = mongoose.models.Book || mongoose.model('Book', BookSchema)

module.exports = BookModel
