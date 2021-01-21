function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => (accountA.name.last > accountB.name.last ? 1 : -1));
}

function numberOfBorrows(account, books) {
  let count = 0;
  for (let book of books) {
    let bookBorrows = book.borrows;
    for (let borrow of bookBorrows) {
      if (borrow.id === account.id) {
        count += 1;
      }
    }
  }
  return count;
}

function getBooksPossessedByAccount(account, books, authors) {
  let currentlyBorrowed = [];
  for (let book of books) {
    let getAuthor = authors.find((author) => book.authorId === author.id);
    let bookBorrows = book.borrows;
    for (let borrow of bookBorrows) {
      let borrowTransaction = {};
      if (borrow.id === account.id && borrow.returned === false) {
        borrowTransaction = { ...book, "author" : getAuthor, "borrows" : borrow };
        currentlyBorrowed.push(borrowTransaction);
      }
    }
  }
  return currentlyBorrowed;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  numberOfBorrows,
  getBooksPossessedByAccount,
};
