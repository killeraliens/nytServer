const express = require('express')
const app = express()
const morgan = require('morgan')
const books = require('./books.js')

app.use(morgan('dev'))

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
      console.log("A:", a)
      console.log("B:", b)
      return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
    })
  }

  res.json(searchResults);

})

app.listen(8000, () => {
  console.log('nytServer listening on port 8000')
})
