import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BooksGrid from './BooksGrid';

/**
 * @class
 * @classdesc Componente que exibe todas as listas de leitura
 * @prop {array} books      - Lista de todos os livros
 * @prop {func} onMoveShelf - Ação executada ao mover de prateleira
 * @prop {array} shelves    - Lista com todas as prateleiras a serem exibidas
 */
class BooksShelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onMoveShelf: PropTypes.func.isRequired,
    shelves: PropTypes.array.isRequired
  };

  /**
   * @description Retorna os livros de uma prateleira
   * @param {string} shelf - Prateleira
   * @returns {array} Livros da prateleira selecionada
   */
  getBooksForShelf = (shelf) => {
    return this.props.books.filter((book) => book.shelf === shelf);
  }

  render() {
    const { onMoveShelf, shelves } = this.props;

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelves.map((shelf) => (
              <div key={shelf.id} className='bookshelf'>
                <h2 className='bookshelf-title'>{shelf.title}</h2>
                <div className='bookshelf-books'>
                  <BooksGrid
                    books={this.getBooksForShelf(shelf.id)}
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