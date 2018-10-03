import React, { Component } from 'react';
import PropTypes from 'prop-types'
import BookShelf from './bookshelf'

class BooksList extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onMoveShelf: PropTypes.func.isRequired,
    shelves: PropTypes.func.isRequired
  };

  render() {
    const { books, onMoveShelf, shelves } = this.props;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelves().filter((shelf) => shelf.mainPage === true).map((shelf) => (
              <BookShelf key={shelf.id}
                title={shelf.title}
                books={books[shelf.id]}
                onMoveShelf={onMoveShelf}
              />
            ))}
          </div>
        </div>
        <div className="open-search">
          <a >Add a book</a>
        </div>
      </div>
    );
  }
}

export default BooksList;