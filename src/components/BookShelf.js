import React from 'react';
import Book from './Book';

const BookShelf = ({ name, books, handleShelf }) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title animated slideInLeft delay-1s">{name}</h2>
    <div className="bookshelf-books">
      <ul className="books-grid">
        {books.map(book => (
          <li key={book.id}>
            <Book title={book.title}
              authors={book.authors && book.authors.join(', ')}
              cover={book.imageLinks.thumbnail}
              id={book.id} shelf={book.shelf}
              shelfChanger={handleShelf}
              details={book.canonicalVolumeLink}
            />
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default BookShelf;