function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  let finalArray = [];
  let notReturned = [];
  let returned = [];
  for (let book of books) {
    if (book.borrows[0].returned === false) {
      notReturned.push([book]);
    }
    if (book.borrows[0].returned === true) {
      returned.push(book);
    }
  }
  finalArray.push(notReturned);
  finalArray.push(returned);
  return finalArray;
}

function getBorrowersForBook(book, accounts) {
  let transactionArray = [];
  let borrowList = book.borrows;
  for (let borrow of borrowList) {
    let transaction = {};
    let returnedValue = borrow.returned;
    let foundUser = accounts.find((account) => borrow.id === account.id);
    transaction = { ...foundUser, "returned" : returnedValue };
    if (transactionArray.length < 10) {
      transactionArray.push(transaction);
    }
  }
  return transactionArray;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
