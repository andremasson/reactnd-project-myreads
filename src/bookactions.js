import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';

/**
 * @class
 * @classdesc Componente que muda estante de um livro
 * @prop {object} book       - Livro ao qual esse componente pertence
 * @prop {func} onMoveShelf  - Ação executada ao mover de prateleira
 */
class BookActions extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    onMoveShelf: PropTypes.func.isRequired
  };

  state = {
    shelf: ''
  };

  /**
   * @description Metodo chamado para trocar o livro de prateleira. Atualiza o estado neste componente e o livro no componente pai.
   * @param {object} bookToMove   - Livro a ser alterado
   * @param {string} targetShelf  - Prateleira para onde mudar o livro
   */
  moveShelf = (book, targetShelf) => {
    this.props.onMoveShelf(book, targetShelf);
    this.setState({shelf: targetShelf});
  }
  
  componentDidMount = () => {

    /**
     * Usa a API para buscar informação da prateleira (shelf).
     * Informação não vem pelo metodo search da API.
     */
    (!this.props.book.shelf && BooksAPI.get(this.props.book.id).then((fetchedBook) => {
      this.setState({shelf: fetchedBook.shelf});
    }));
  }

  render() {
    const { book } = this.props;

    /**
     * @description Ações disponíveis para seleção.
     * @member {string} value - Valor da prateleira como armazenada no BD
     * @member {string} label - Nome de exibição
     * @member {bool} enabled - Habilitado para seleção
     */
    const actions = [
      {value: 'move', label: 'Move to...', enabled: false},
      {value: 'currentlyReading', label: 'Currently Reading', enabled: true},
      {value: 'wantToRead', label: 'Want to Read', enabled: true},
      {value: 'read', label: 'Read', enabled: true},
      {value: 'none', label: 'None', enabled: true}
    ];

    /**
     * Componente será visivel somente quando tiver a informação da prateleira.
     */
    return (
      <div className='book-shelf-changer' style={{visibility: (!this.state.shelf && !book.shelf) ? 'hidden' : ''}} >
        <select
          value={this.state.shelf || book.shelf || ('none')}
          onChange={(e) => this.moveShelf(book, e.target.value)}
          >
            {actions.map((action) => (
              <option
                key={action.value}
                value={action.value}
                disabled={!action.enabled}
              >{action.label}</option>
            ))}
        </select>
      </div>
    );
  }
}

export default BookActions;