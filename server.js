const { prompt } = require('inquirer')
const db = require('mongojs')('booksdb')
const ObjectId = require('mongojs').ObjectId
require('console.table')

const getBooks = () => {
  db.books.find({}, (err, books) => {
    if (err) { console.log(err) }
    books = books.map(({ title, date, page }) => ({ title, date, page }))
    console.table(books)
    mainMenu()
  })
}

const createBook = () => {
  prompt([
    {
      type: 'input',
      name: 'title',
      message: 'What is the title of the book?'
    },
    {
      type: 'input',
      name: 'date',
      message: 'What is the date you started reading the book? (MM-DD-YYYY)'
    },
    {
      type: 'number',
      name: 'page',
      message: 'What page are you currently on?'
    }
  ])
    .then(book => {
      db.books.insert(book, err => {
        if (err) { console.log(err) }
        console.log('Book Added!')
        mainMenu()
      })
    })
    .catch(err => console.log(err))
}

const updateBook = () => {
  db.books.find({}, (err, books) => {
    if (err) { console.log(err) }
    prompt([
      {
        type: 'list',
        name: '_id',
        message: 'Select a book',
        choices: books.map(({ _id, title }) => ({
          name: title,
          value: _id
        }))
      },
      {
        type: 'number',
        name: 'page',
        message: 'What page are you on?'
      }
    ])
      .then(({ _id, page }) => {
        db.books.update({ _id: ObjectId(_id) }, { $set: { page } }, err => {
          if (err) { console.log(err) }
          console.log('Book Updated!')
          mainMenu()
        })
      })
      .catch(err => console.log(err))
  })
}

const deleteBook = () => {
  db.books.find({}, (err, books) => {
    if (err) { console.log(err) }
    prompt([
      {
        type: 'list',
        name: '_id',
        message: 'Select a book',
        choices: books.map(({ _id, title }) => ({
          name: title,
          value: _id
        }))
      }
    ])
      .then(({ _id }) => {
        db.books.remove({ _id: ObjectId(_id) }, err => {
          if (err) { console.log(err) }
          console.log('Book Removed!')
          mainMenu()
        })
      })
      .catch(err => console.log(err))
  })
}

const mainMenu = () => {
  prompt({
    type: 'list',
    name: 'choice',
    message: 'What would you like to do?',
    choices: ['View Reading List', 'Add Book to Reading List', 'Update Current Page', 'Remove Book from Reading List']
  })
    .then(({ choice }) => {
      switch (choice) {
        case 'View Reading List':
          getBooks()
          break
        case 'Add Book to Reading List':
          createBook()
          break
        case 'Update Current Page':
          updateBook()
          break
        case 'Remove Book from Reading List':
          deleteBook()
          break
      }
    })
    .catch(err => console.log(err))
}

mainMenu()
