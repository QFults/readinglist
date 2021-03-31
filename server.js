const { prompt } = require('inquirer')

const getBooks = () => {

}

const createBook = () => {

}

const updateBook = () => {

}

const deleteBook = () => {

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
        case 'Remove BOok from Reading List':
          deleteBook()
          break
      }
    })
}

mainMenu()
