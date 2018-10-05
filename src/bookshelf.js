import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BooksGrid from './BooksGrid';

class BooksShelf extends Component {
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
            {shelves().map((shelf) => (
              <div key={shelf.id} className='bookshelf'>
                <h2 className='bookshelf-title'>{shelf.title}</h2>
                <div className='bookshelf-books'>
                  <BooksGrid
                    books={books[shelf.id]}
                    onMoveShelf={onMoveShelf}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    );
  }
}

export default BooksShelf;