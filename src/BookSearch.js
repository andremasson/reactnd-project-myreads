import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BooksGrid from './BooksGrid';
import SearchBar from './SearchBar';
import * as BooksAPI from './BooksAPI';

/**
 * @class
 * @classdesc Tela de busca de livros
 * @prop {func} onMoveShelf         - Ação executada ao mover de prateleira
 * @prop {func} onNavigationReturn  - Ação executada ao clicar botão de voltar
 */
class BookSearch extends Component {
  static propTypes = {
    onMoveShelf: PropTypes.func.isRequired,
    onNavigationReturn: PropTypes.func.isRequired,
    booksOnShelf: PropTypes.array.isRequired
  };

  state = {
    searchResult: []
  };

  /**
   * @description Atualiza o resultado da busca de acordo com o critério passado por parâmetro
   * @param {string} query - Critério de busca
   */
  updateResults = async (query) => {
    let result = [];
    const books = await BooksAPI.search(query.trim());
    (books && !books.error && (result = books));
    result.map((book) => {
      const bookFound = this.props.booksOnShelf.find(item => item.id === book.id);
      return (bookFound && (book.shelf = bookFound.shelf));
    });
    this.setState({searchResult: result});
  }

  render() {
    return (
      <div className="search-books">
        <SearchBar 
          onUpdateQuery={this.updateResults}
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