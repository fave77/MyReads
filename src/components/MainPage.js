import React from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';
import * as BooksAPI from '../BooksAPI';

class MainPage extends React.Component {
  state = {
    books: []
  }

  componentWillMount() {
    BooksAPI.getAll()
      .then(data => {
        this.setState({
          books: data
        });
      });
  }

  shelfChanger = (event, bookId) => {
    const shelf = event.target.value;
    BooksAPI.get(bookId)
      .then(book => {
        BooksAPI.update(book, shelf)
          .then(() => {
            const books = this.state.books.slice();
            this.setState({
              books: books.map(item => {
                if(item.id === bookId) item.shelf = shelf;
                return item;
              })
            })
          });
      });
  }

  render() {
    const books = this.state.books;
    return (
      <div className="list-books">
        <header className="list-books-title">
          <h1>MyReads</h1>
        </header>
        <div className="list-books-content">
          <BookShelf name={'Continue'} books={books.filter(book => (
              book.shelf === 'currentlyReading'
            ))} handleShelf={this.shelfChanger}
          />
          <BookShelf name={'Wishlist'} books={books.filter(book => (
              book.shelf === 'wantToRead'
            ))} handleShelf={this.shelfChanger}
          />
          <BookShelf name={'Finished'} books={books.filter(book => (
              book.shelf === 'read'
            ))} handleShelf={this.shelfChanger}
          />
        </div>
        <div className="open-search tooltip">
        <span className="tooltiptext">get a new book</span>
          <Link to="/search" className=" animated pulse infinite">
            Add a book
          </Link>
        </div>
      </div>
    );
  }
}

export default MainPage;