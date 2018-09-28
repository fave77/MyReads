import React from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from '../BooksAPI';

class SearchPage extends React.Component {
  state = {
    query: '',
    searchedBooks: [],
    storedBooks: []
  }

  componentWillMount() {
    BooksAPI.getAll()
      .then(data => {
        this.setState({
          storedBooks: data
        });
      });
  }

  handleInput = event => {
    this.setState({
      query: event.target.value
    }, this.searchBooks);
  }

  searchBooks = () => {
    if(this.state.query) {
      const previousQuery = this.state.query;
      BooksAPI.search(this.state.query)
        .then(data => {
          const currentQuery = this.state.query;
          if(previousQuery === currentQuery)
            this.setState({
              searchedBooks: data || []
            });
        });
    } else {
      this.setState({
        searchedBooks: []
      });
    }
  }

  shelfChanger = (event, bookId) => {
    const shelf = event.target.value;
    BooksAPI.get(bookId)
      .then(book => BooksAPI.update(book, shelf));
  }

  render() {
    const searchedBooks = this.state.searchedBooks,
      storedBooks = this.state.storedBooks;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text"
              placeholder="Search by title or genre"
              value={this.state.query}
              onChange={this.handleInput}
            />
          </div>
        </div>
        <div className="search-books-results">
          { !('error' in searchedBooks) && (searchedBooks.length !== 0)
            ? <ul className="books-grid">
                {(searchedBooks.slice().map(searchedBook => {
                    for(let storedBook of storedBooks)
                      if(storedBook.id === searchedBook.id) {
                        searchedBook.shelf = storedBook.shelf;
                        break;
                      }
                    return searchedBook;
                  }).map(book => (
                    <li key={book.id}>
                      <Book title={book.title}
                        authors={book.authors && book.authors.join(', ')}
                        cover={book.imageLinks && book.imageLinks.thumbnail}
                        id={book.id} shelf={book.shelf || 'none'}
                        shelfChanger={this.shelfChanger}
                        details={book.canonicalVolumeLink}
                      />
                    </li>
                )))}
              </ul>
            : ((searchedBooks.length === 0)
              ? (<div className="search-icon animated rubberBand" />)
              : (<div className="not-found" />))
          }
        </div>
      </div>
    );
  }
}

export default SearchPage;