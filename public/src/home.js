function totalBooksCount(books) {
  return books.length;
}

function totalAccountsCount(accounts) {
  return accounts.length;
}

function booksBorrowedCount(books) {
  let count = 0;
  for (let book of books) {
    if (book.borrows[0].returned === false) {
      count += 1;
    }
  }
  return count;
}


function getMostCommonGenres(books) {
  let finalArray = [];
  let genreList = [];
  for (let book of books) {
    if (!genreList.includes(book.genre)) {
      genreList.push(book.genre);
    }
  }
  for (let genre of genreList) {
    let formattedGenre = {};
    formattedGenre = { "name": genre, "count" : 0};
    finalArray.push(formattedGenre);
  }
  for (let book of books) {
    for (let obj of finalArray) {
      if (book.genre === obj.name) {
        obj.count += 1;
      }
    }
  }
  finalArray.sort((genreA, genreB) => (genreA.count > genreB.count ? -1 : 1));
  let final = finalArray.slice(0, 5);
  return final;
}

function getMostPopularBooks(books) {
  let mostPopular = [];
  books.sort((bookA, bookB) => (bookA.borrows.length > bookB.borrows.length ? 1 : -1));
  let topFive = books.slice(4);
  for (let book of topFive) {
    let popularBook = {};
    let borrowCount = book.borrows.length;
    popularBook = { "name": book.title, "count" : borrowCount };
    mostPopular.push(popularBook);
  }
  mostPopular.sort((bookA, bookB) => (bookA.count > bookB.count ? -1 : 1));
  return mostPopular;
}

function getMostPopularAuthors(books, authors) {
  let finalArray = [];
  let authorList = [];
  for (let author of authors) {
    let authorEntry = {};
    let formatName = `${author.name.first} ${author.name.last}`  
    authorEntry = { "name": formatName, "count": 0, "id": author.id };
    authorList.push(authorEntry);
  }
  for (let book of books) {
    for (let authorEntry of authorList) {
      if (book.authorId === authorEntry.id) {
        let borrowCount = book.borrows.length;
        authorEntry.count += borrowCount;
      }
    }
  }
  for (let authorEntry of authorList) {
    let entry = { "name": authorEntry.name, "count": authorEntry.count};
    finalArray.push(entry);
  }
  finalArray.sort((authorA, authorB) => (authorA.count > authorB.count ? -1 : 1));
  let final = finalArray.slice(0, 5);
  return final;
}

module.exports = {
  totalBooksCount,
  totalAccountsCount,
  booksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
