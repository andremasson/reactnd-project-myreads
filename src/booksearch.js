import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BooksGrid from './BooksGrid';
import SearchBar from './SearchBar';
import * as BooksAPI from './BooksAPI';

class BookSearch extends Component {
  static propTypes = {
    onMoveShelf: PropTypes.func.isRequired,
    onNavigationReturn: PropTypes.func.isRequired
  };

  state = {
    searchResult: []
  };

  updateResults = (query) => {
    let result = [];
    BooksAPI.search(query.trim()).then((books) => {
      (books && !books.error && (result = books));
      this.setState({searchResult: result});
    });
  }

  clearResults = () => {
    this.setState({searchResult: ''});
  }

  render() {
    return (
      <div className="search-books">
        <SearchBar 
          onUpdateQuery={this.updateResults}
          onClearQuery={this.clearResults}
          onNavigationReturn={this.props.onNavigationReturn}
        />
        <div className="search-books-results">
          <BooksGrid
            books={this.state.searchResult}
            onMoveShelf={this.props.onMoveShelf}
          />
        </div>
      </div>
    );
  }
}

export default BookSearch;