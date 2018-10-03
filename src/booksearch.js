import React, { Component } from 'react';
import PropTypes from 'prop-types'
import BooksGrid from './booksgrid'

class BookSearch extends Component {
  static propTypes = {
    books: PropTypes.array,
    onMoveShelf: PropTypes.func.isRequired
  };

  render() {
    const { books, onMoveShelf } = this.props;
    
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text" placeholder="Search by title or author"/>

          </div>
        </div>
        <div className="search-books-results">
          <BooksGrid
            books={books}
            onMoveShelf={onMoveShelf}
          />
        </div>
      </div>
    );
  }
}

export default BookSearch;