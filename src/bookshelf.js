import React, { Component } from 'react';
import PropTypes from 'prop-types'
import BooksGrid from './booksgrid'

class BookShelf extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    books: PropTypes.array,
    onMoveShelf: PropTypes.func.isRequired
  };

  render() {
    const { title, books, onMoveShelf } = this.props;
    return (
      <div className='bookshelf'>
        <h2 className='bookshelf-title'>{title}</h2>
        <div className='bookshelf-books'>
          <BooksGrid
            books={books}
            onMoveShelf={onMoveShelf}
          />
        </div>
      </div>
    );
  }
}

export default BookShelf;