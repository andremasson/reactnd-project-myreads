import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SearchBar extends Component {
  static propTypes = {
    onNavigationReturn: PropTypes.func.isRequired,
    onUpdateQuery: PropTypes.func.isRequired,
    onClearQuery: PropTypes.func.isRequired
  };

  render() {
    return (
      <div className="search-books-bar">
        <a className="close-search" onClick={this.props.onNavigationReturn}>Close</a>
        <div className="search-books-input-wrapper">
          <input
            autoFocus
            type="text"
            placeholder="Search by title or author"
            onChange={(event) => this.props.onUpdateQuery(event.target.value)}
          />
        </div>
      </div>
    );
  }
}

export default SearchBar;
