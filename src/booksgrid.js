import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BookActions from './bookactions';

class BooksGrid extends Component {
  static propTypes = {
    books: PropTypes.array,
    onMoveShelf: PropTypes.func.isRequired
  };

  render() {
    const { books, onMoveShelf } = this.props;
    return (
      <ol className='books-grid'>
        {books && books.map((book) => (
            <li key={book.id}>
              <div className='book'>
                <div className='book-top'>
                  <div className='book-cover' style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail})` }} />
                  <BookActions
                    book={book}
                    onMoveShelf={onMoveShelf}
                  />
                </div>
                <div className='book-title'>{book.title}</div>
                <div className='book-authors'>
                  {book.authors && book.authors.map((author, index) => (
                    <span key={index}>{author}<br/></span>
                  ))}
                </div>
              </div>
            </li>
        ))}
      </ol>
    );
  }
}

export default BooksGrid;