const express = require('express')
const app = express()

const morgan = require('morgan')
const books = require('./books.js')
const cors = require('cors')

app.use(morgan('dev'))
app.use(cors())

app.get('/', (req, res) => {
  res.send('go to /books')
})

app.get('/books', (req, res) => {
  const { search = "", sort } = req.query;

  const sortOptions = ["title", "rank"];

  let searchResults = books.filter(book => {
    const searchTerm = search.toLowerCase()
    return book.title.toLowerCase().includes(searchTerm) || book.author.toLowerCase().includes(searchTerm)
  })


  if (sort) {
    if (!sortOptions.includes(sort)) {
      return res.status(400).send('sort by title or rank')
    }

    searchResults = searchResults.sort((a, b) => {
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    })
  }

  res.json(searchResults);
})

module.exports = app;

