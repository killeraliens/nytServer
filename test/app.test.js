const {expect} = require('chai')
const supertest = require('supertest')
const app = require('../app')

describe('GET /books', () => {
  it('return array of books in JSON format', () => {
    return supertest(app)
     .get('/books')
     .expect(200)
     .expect('Content-Type', /json/)
     .then(res => {
       expect(res.body).to.be.an('array')
       expect(res.body).to.have.lengthOf.at.least(1)
       const book = res.body[0]
       expect(book).to.include.all.keys("title", "description", "author", "published_date")
      })
  })

  it('returns 400 with bad sort query', () => {
    return supertest(app)
     .get('/books')
     .query({sort: 'notanoption' })
    .expect(400, 'sort by title or rank')
  })

  it('should sort by title', () => {
    return supertest(app)
      .get('/books')
      .query({sort: 'title'})
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array')
        let sorted = true;
        let i = 0
        while ( i < res.body.length - 1) {

          if(res.body[i].title > res.body[i + 1].title) {
            sorted = false
            break
          }
          i ++
        }
        expect(sorted).to.be.true;
      })
  })



})
