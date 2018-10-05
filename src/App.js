import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BooksShelf from './BookShelf';
import BookSearch from './BookSearch';
import './App.css';

/**
 * @class
 * @classdesc Componente principal da aplicação
 */
class BooksApp extends Component {
  state = {
    books: []
  };

  /**
   * @description Prateleiras que serão exibidas na tela principal
   * @member {string} id    - Valor como armazenado no BD
   * @member {string} title - Valor de exibição
   */
  shelves = [
      {id: 'currentlyReading', title: 'Currently Reading'},
      {id: 'wantToRead', title: 'Want to Read'},
      {id: 'read', title: 'Read'}
  ];

  /**
   * @description Busca livros pela API
   */
  updateBookShelf = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books });
    });
  }
    
  componentDidMount = () => {
    this.updateBookShelf();
  }

  /**
   * @description Metodo chamado para trocar o livro de prateleira
   * @param {object} bookToMove   - Livro a ser alterado
   * @param {string} targetShelf  - Prateleira para onde mudar o livro
   */
  moveToShelf = (bookToMove, targetShelf) => {
    bookToMove.shelf = targetShelf;
    
    let books = this.state.books.filter((book) => book.id !== bookToMove.id);
    (targetShelf !== 'none' && (books = books.concat([bookToMove])));

    this.setState({books: books});
    BooksAPI.update(bookToMove, targetShelf);
  }

  render() {
    return (
      <div className="app">
        <Route path="/" exact render={() => (
          <BooksShelf
            books={this.state.books}
            onMoveShelf={this.moveToShelf}
            shelves={this.shelves}
          />
        )}/>
        <Route path="/search" render={({history}) => (
          <BookSearch
            onMoveShelf={this.moveToShelf}
            onNavigationReturn={() => history.push('/')}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp;
